# Mini Mercado Livre — PWA & GitHub Pages

Este pacote adiciona **PWA** (manifest + service worker) e dá o passo-a-passo para publicar no **GitHub Pages**.

## 1) Copie estes arquivos para a RAIZ do seu projeto
- `manifest.json`
- `service-worker.js`
- `robots.txt`
- `icons/icon-192.png`
- `icons/icon-512.png`

Seu projeto deve ter `index.html` na raiz.

## 2) Edite o `index.html` (adicione as linhas abaixo)
Dentro de `<head>...</head>`:
```html
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#111111">
<link rel="icon" href="./icons/icon-192.png" type="image/png">
```

Antes de `</body>`:
```html
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js");
    });
  }
</script>
```

> Dica: liste também seus arquivos CSS/JS no array `ASSETS` do `service-worker.js` para cache offline.

## 3) Teste localmente (localhost é permitido para SW)
Com Python 3 instalado:
```bash
python -m http.server 5173
# ou
py -m http.server 5173
```
Abra: http://127.0.0.1:5173/

**Modo App no Edge (Windows):**
```powershell
start msedge --app="http://127.0.0.1:5173" --window-size=430,820
```

## 4) Publicando no GitHub Pages (grátis)
1. Crie um repositório no GitHub com o conteúdo do seu projeto.
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/root` (ou `/docs` se preferir).
5. Clique **Save**. Sua URL ficará algo como: `https://seu-usuario.github.io/seu-repo/`.

> Se você usar uma subpasta (por exemplo `/docs`), mova todos os arquivos (incluindo `index.html`, `manifest.json`, `service-worker.js` e `icons/`) para dentro de `docs/` e configure o GitHub Pages para apontar para `/docs`.

## 5) Tornar instalável no celular
- **Android (Chrome/Edge/Brave)**: acesse a URL, toque no menu e escolha **Adicionar à tela inicial**.
- **iPhone (Safari)**: toque em **Compartilhar → Adicionar à Tela de Início** (o PWA funciona sem push).

## 6) Atualizações do PWA
Sempre que mudar arquivos estáticos, atualize a constante `CACHE_NAME` no `service-worker.js` (ex.: `v2`, `v3`...), faça deploy e recarregue a página.

## 7) Abertura como App (atalho local no Windows)
Crie um `.bat` com:
```bat
@echo off
set URL=http://127.0.0.1:5173/
start msedge --app="%URL%" --window-size=430,820
```

---

**Suporte rápido:** Se quiser, posso aplicar essas edições diretamente no seu ZIP e devolver pronto para subir ao GitHub.
