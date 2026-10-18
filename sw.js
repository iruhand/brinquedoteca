/* Service worker da Brinquedoteca do Papai (montado por montar_app.py; não edite o sw.js publicado).
   - Guarda o app inteiro no aparelho (página, vozes gravadas, fontes, ícones): depois da primeira visita, funciona sem internet.
   - Versão nova = este arquivo muda (a lista abaixo traz a impressão digital de cada arquivo). O navegador confere este
     arquivo quando o app abre e quando o app pede (de hora em hora e ao voltar para ele). A versão nova é baixada por trás,
     sem atrapalhar; a página mostra "Nova versão" e só troca quando o pai tocar em Atualizar (ou quando o app for fechado
     e aberto de novo).
   - Na troca, arquivos que não mudaram são copiados da versão anterior (só baixa o que mudou). Cada arquivo baixado é
     conferido pela impressão digital; se vier errado (servidor ainda com a versão velha), a versão nova não entra e a
     atual continua funcionando. */
const VERSAO = "2026.10.18.1";
const NOVIDADES = "Primeira versão do app: tela cheia e funciona sem internet.";
const ARQUIVOS = [["index.html", "a9c4a990492637b8"], ["manifest.webmanifest", "49906a87a6267f91"], ["vozes/capita-base.mp3", "9e19724c40ce658b"], ["vozes/capita-cade-o-gatinho.mp3", "bd04fe29e3ceeb8d"], ["vozes/capita-caminho-do-castelo.mp3", "e89b397748513ef2"], ["vozes/capita-casa.mp3", "d657498464a14c90"], ["vozes/capita-como-a-luna-se-sente.mp3", "007e373b4c6c5830"], ["vozes/capita-contagem.mp3", "23cf15972ad5cf11"], ["vozes/capita-cores-do-quintal.mp3", "939f4b225bc3ee60"], ["vozes/capita-de-quem-e-a-sombra.mp3", "7a6e2f117e18729f"], ["vozes/capita-dentes.mp3", "e2bf0288c9536887"], ["vozes/capita-dia-da-capita.mp3", "2332aaf87889be18"], ["vozes/capita-estatua-musical.mp3", "df76b5d07a34d7df"], ["vozes/capita-formas-e-tamanhos.mp3", "e9ba1128696a9c16"], ["vozes/capita-hora-de-cuidar.mp3", "7dfe1d2ed437c000"], ["vozes/capita-letras.mp3", "b6024cf6f97c319f"], ["vozes/capita-livro-de-colorir.mp3", "296e717c53854adf"], ["vozes/capita-numeros.mp3", "f7de9111328d1c78"], ["vozes/capita-o-que-vem-depois.mp3", "292c52951d9d7eb9"], ["vozes/capita-peca-que-falta.mp3", "4b50730c5efa1d41"], ["vozes/capita-quebra-cabeca.mp3", "52dec3e97cddce07"], ["vozes/capita-t-acao.mp3", "b273fefdd3625738"], ["vozes/capita-t-caminho.mp3", "ca6c42cca62dede6"], ["vozes/capita-t-cesta.mp3", "d8c29e94ed246dc6"], ["vozes/capita-t-escolha.mp3", "6fee3b2addbe4e0e"], ["vozes/capita-t-estatua.mp3", "9bd69c3c8053b6bf"], ["vozes/capita-t-limpar.mp3", "4606d6d1ca13d0b0"], ["vozes/capita-t-pintar.mp3", "7fc757a5d5c13417"], ["vozes/capita-t-puzzle.mp3", "821ec1e468d188c9"], ["vozes/capita-t-sequencia.mp3", "e806b503435b404a"], ["vozes/capita-t-sumiu.mp3", "cbbcba0124de4637"], ["vozes/capita-tudo-ao-contrario.mp3", "ed9f5d2f75de2e53"], ["vozes/luna-base.mp3", "0fa1b2d419a0b2d3"], ["vozes/luna-casa.mp3", "057f1c1b7a5308b1"], ["vozes/luna-como-a-luna-se-sente.mp3", "7616a5d1b07096c3"], ["vozes/luna-comum.mp3", "85a9be41308baddb"], ["vozes/luna-contagem.mp3", "576135c1228d9674"], ["vozes/luna-de-quem-e-a-sombra.mp3", "26315fdb374a94cd"], ["vozes/luna-dentes.mp3", "b13678678ec179ee"], ["vozes/luna-dia-da-capita.mp3", "436f907ebb3f47aa"], ["vozes/luna-feira-da-capita.mp3", "bfe6f015a97da144"], ["vozes/luna-formas-e-tamanhos.mp3", "20c1d59c67a1551b"], ["vozes/luna-jogo-da-memoria.mp3", "4900510cda9f847d"], ["vozes/luna-letras.mp3", "4a77a6132d2c1ca9"], ["vozes/luna-livro-de-colorir.mp3", "e605dc7e758b8296"], ["vozes/luna-numeros.mp3", "72552d94d7d2b044"], ["vozes/luna-palavras-de-ca-e-de-la.mp3", "e09d1e179577c7b5"], ["vozes/luna-peca-que-falta.mp3", "74f7a74648a4faa9"], ["vozes/luna-qual-nao-combina.mp3", "7019cd8dc76d04b9"], ["vozes/luna-quantos-soninhos.mp3", "c5759389bd3bfe21"], ["vozes/luna-quebra-cabeca.mp3", "727efb0edc26c366"], ["vozes/luna-t-acao.mp3", "ed8e9dbc008af803"], ["vozes/luna-t-cesta.mp3", "2023d78662efaec0"], ["vozes/luna-t-escolha.mp3", "14aeab97e1f05e09"], ["vozes/luna-t-limpar.mp3", "f855a17ceca22489"], ["vozes/luna-t-nome.mp3", "8953046495dbd20d"], ["vozes/luna-t-palavras.mp3", "461c90a5c84f2354"], ["vozes/luna-t-pares.mp3", "dc943764047ad784"], ["vozes/luna-t-pintar.mp3", "fe40760a0a98aa4b"], ["vozes/luna-t-puzzle.mp3", "56c17a672741c63f"], ["vozes/luna-t-sequencia.mp3", "6a95d1c58e43ad2c"], ["vozes/luna-t-soninhos.mp3", "42b83c238d8a0c03"], ["vozes/luna-t-sumiu.mp3", "d50bb483004f9aa5"], ["vozes/serena-base.mp3", "3f2a4fa283d3ff4b"], ["vozes/serena-casa.mp3", "d81b8b75f9e9fe0e"], ["vozes/serena-comum.mp3", "f6552147e835830d"], ["vozes/serena-contagem.mp3", "552230153c0cc8fe"], ["vozes/serena-cores-do-mar.mp3", "74e612b7a8a5f48f"], ["vozes/serena-danca-do-mar.mp3", "693a5c5e7bd2c68f"], ["vozes/serena-diferentes-do-mar.mp3", "28a0fb0d9213caa3"], ["vozes/serena-memoria-do-mar.mp3", "26900a072ddf59fd"], ["vozes/serena-quem-mora-no-mar.mp3", "c22575fc28c265c6"], ["vozes/serena-t-acao.mp3", "888c461bb5771580"], ["vozes/serena-t-cesta.mp3", "25a843e6f2c9cf42"], ["vozes/serena-t-escolha.mp3", "bfdd749c477a8542"], ["vozes/serena-t-estatua.mp3", "3528e3130bec0738"], ["vozes/serena-t-pares.mp3", "b2ae2cb5fe1eb872"], ["vozes/serena-t-pintar.mp3", "e0b49329f94d7955"], ["vozes/serena-t-sumiu.mp3", "968adb363d68bbed"], ["vozes/serena-tesouro-da-serena.mp3", "e46d9c818a60d9b7"], ["fontes/baloo-2-latin-600-normal.woff2", "ffc22b431dcb0137"], ["fontes/baloo-2-latin-800-normal.woff2", "3e36c57e37bda5b5"], ["fontes/nunito-latin-600-normal.woff2", "45f437de32ff5973"], ["fontes/nunito-latin-700-normal.woff2", "fa89300b9bbb3bd0"], ["fontes/nunito-latin-800-normal.woff2", "2363d3ed037283eb"], ["fontes/fontes.css", "29aa334913d8aede"], ["icones/apple-touch-icon.png", "d3b58fd62e5dc839"], ["icones/favicon-32.png", "262a9e59664c6cc3"], ["icones/favicon-48.png", "6c3f78812403da79"], ["icones/icone-192.png", "a06caca3060a474d"], ["icones/icone-512.png", "c670a0ce8a0a77f3"], ["icones/icone-maskable-192.png", "2acf3641dc584be8"], ["icones/icone-maskable-512.png", "898e935ed154cc3b"]];        // [caminho relativo, impressão digital (sha-256, 16 primeiros hex)]
const PREFIXO = "brinquedoteca-";
const CACHE = PREFIXO + VERSAO;
const BASE = self.registration.scope;
const url = (c) => new URL(c, BASE).href;
const chave = (c, imp) => url(c) + "?v=" + imp;
const MAPA = new Map(ARQUIVOS.map(([c, imp]) => [url(c), chave(c, imp)]));
const PAGINA = MAPA.get(url("index.html"));

async function impressao(buf) {
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", buf));
  return Array.from(h.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function baixar(c, imp) {
  for (const extra of ["", "&t=" + Date.now()]) {
    const r = await fetch(chave(c, imp) + extra, { cache: "reload" });
    if (!r.ok) throw new Error("não baixou " + c + " (" + r.status + ")");
    const buf = await r.arrayBuffer();
    if (await impressao(buf) === imp) return new Response(buf, { status: 200, headers: r.headers });
  }
  throw new Error("o servidor ainda não tem a versão nova de " + c);
}
let avisado = 0;
async function avisar(m, sempre) {
  const agora = Date.now();
  if (!sempre && agora - avisado < 400) return;
  avisado = agora;
  for (const c of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) c.postMessage(m);
}
self.addEventListener("install", (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const fila = ARQUIVOS.slice();
    let feitos = 0, baixados = 0;
    const trabalhar = async () => {
      while (fila.length) {
        const [c, imp] = fila.shift(), k = chave(c, imp);
        if (!(await cache.match(k))) {
          const velho = await caches.match(k);      // a versão anterior já tem este arquivo igualzinho
          if (velho) await cache.put(k, velho);
          else { await cache.put(k, await baixar(c, imp)); baixados++; }
        }
        feitos++;
        avisar({ tipo: "progresso", versao: VERSAO, feitos, total: ARQUIVOS.length });
      }
    };
    await Promise.all(Array.from({ length: 4 }, trabalhar));
    await avisar({ tipo: "guardado", versao: VERSAO, novidades: NOVIDADES, total: ARQUIVOS.length, baixados }, true);
  })());
});
self.addEventListener("activate", (ev) => {
  ev.waitUntil((async () => {
    for (const n of await caches.keys()) if (n.startsWith(PREFIXO) && n !== CACHE) await caches.delete(n);
    await self.clients.claim();
  })());
});
self.addEventListener("message", (ev) => {
  const m = ev.data || {};
  if (m.tipo === "atualizar") self.skipWaiting();
  else if (m.tipo === "versao" && ev.source) {
    ev.waitUntil((async () => {
      const cache = await caches.open(CACHE);
      let guardados = 0;
      for (const k of MAPA.values()) if (await cache.match(k)) guardados++;
      ev.source.postMessage({ tipo: "versao", versao: VERSAO, novidades: NOVIDADES, guardados, total: ARQUIVOS.length });
    })());
  }
});
self.addEventListener("fetch", (ev) => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin !== self.location.origin) return;                 // fora do app (links externos): rede normal
  let k = MAPA.get(u.origin + u.pathname);
  if (!k && req.mode === "navigate" && u.pathname.endsWith("/")) k = PAGINA;   // o endereço do app sem "index.html"
  if (!k) return;                                                 // fora da lista: rede normal
  ev.respondWith((async () => {
    const r = (await caches.open(CACHE).then((c) => c.match(k))) || (await caches.match(k));
    return r || fetch(req);
  })());
});
