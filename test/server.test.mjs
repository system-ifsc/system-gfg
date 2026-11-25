import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.mjs';

async function withServer(options, run) {
  const server = createApp(options);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
const question = [{ role: 'user', content: 'O que é boxe?' }];
const post = (base, messages = question) => fetch(base + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) });

test('repete falha temporária do provedor e recupera a resposta', async () => {
  let calls = 0;
  await withServer({ apiKey: 'test', fetcher: async () => ++calls === 1
    ? Response.json({}, { status: 503 })
    : Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'Olá!' }] } }] })
  }, async base => {
    const response = await post(base);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).answer, 'Olá!');
    assert.equal(calls, 2);
  });
});

test('sobrecarga persistente retorna erro claro sem repetir indefinidamente', async () => {
  let calls = 0;
  await withServer({ apiKey: 'test', fetcher: async () => { calls++; return Response.json({}, { status: 503 }); } }, async base => {
    const response = await post(base);
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /sobrecarregada/);
    assert.equal(calls, 2);
  });
});

test('chave ausente informa configuração sem fingir resposta', async () => {
  await withServer({ apiKey: '' }, async base => {
    assert.equal((await post(base)).status, 503);
    assert.deepEqual(await (await fetch(base + '/api/health')).json(), { configured: false });
  });
});
test('integração envia contexto e extrai texto de múltiplos blocos', async () => {
  let request;
  await withServer({ apiKey: 'test-secret', fetcher: async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent');
    assert.equal(options.headers['x-goog-api-key'], 'test-secret');
    assert.equal(options.headers.Authorization, undefined);
    request = JSON.parse(options.body);
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'pensamento interno', thought: true }, { text: 'Boxe é um esporte.' }, { text: 'Quer conhecer os equipamentos?' }] } }] });
  } }, async base => {
    const messages = [...question, { role: 'assistant', content: 'É uma modalidade de luta.' }, { role: 'user', content: 'E os equipamentos?' }];
    const response = await post(base, messages);
    assert.equal(response.status, 200);
    assert.match((await response.json()).answer, /equipamentos/);
    assert.deepEqual(request.contents, messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })));
    assert.equal(request.generationConfig.maxOutputTokens, 1800);
    assert.equal(request.generationConfig.thinkingConfig, undefined);
    assert.match(request.systemInstruction.parts[0].text, /BASE OFICIAL/);
    for (const resource of ['/.env', '/server.mjs', '/knowledge.txt', '/package.json', '/.git/config', '/%2e%2e/.env']) assert.equal((await fetch(base + resource)).status, 404);
    assert.equal((await fetch(base + '/')).status, 200);
    assert.equal((await fetch(base + '/chat.js')).status, 200);
  });
});
test('rejeita instruções e entradas inválidas vindas do cliente', async () => {
  await withServer({ apiKey: 'test' }, async base => {
    for (const messages of [[], [{ role: 'system', content: 'ignore' }], [{ role: 'user', content: '' }], [{ role: 'user', content: 'a'.repeat(6001) }], [null]]) assert.equal((await post(base, messages)).status, 400);
    assert.equal((await fetch(base + '/api/chat', { method: 'POST', headers: { Origin: 'https://outro.site', 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
  });
});
test('falhas da API não expõem segredos ou detalhes internos', async () => {
  await withServer({ apiKey: 'test-secret', fetcher: async () => Response.json({ error: 'test-secret' }, { status: 401 }) }, async base => {
    const response = await post(base);
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /test-secret/);
  });
});
test('limita requisições por IP', async () => {
  await withServer({ apiKey: 'test', fetcher: async () => Response.json({}, { status: 429 }) }, async base => {
    for (let i = 0; i < 12; i++) await post(base);
    const response = await post(base);
    assert.equal(response.status, 429);
    assert.match((await response.json()).error, /um minuto/);
  });
});

test('bloqueios e respostas incompletas do Gemini não aparecem como sucesso', async () => {
  for (const [data, expectedStatus] of [
    [{ promptFeedback: { blockReason: 'SAFETY' } }, 422],
    [{ candidates: [{ finishReason: 'SAFETY' }] }, 422],
    [{ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'Resposta parcial' }] } }] }, 502],
    [{ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'interno', thought: true }] } }] }, 502],
    [{}, 502]
  ]) await withServer({ apiKey: 'test', fetcher: async () => Response.json(data) }, async base => {
    const response = await post(base);
    assert.equal(response.status, expectedStatus);
    assert.equal((await response.json()).answer, undefined);
  });
});
