# Carta Biribiri (prototipo)

Carta digital interactiva, sitio estático sin build. Se abre `index.html` y listo.

## Estructura
- `index.html`: marcado de las 4 partes (apertura, mucho/poco biri, bebidas)
- `css/styles.css`: estilos y tokens de color/tipografía (arriba de todo)
- `js/app.js`: datos de la carta (`MUCHO`, `POCO`, `DRINKS`), filtro, garabatos y simulación de líquido
- `assets/candles-wide.jpg`: foto de las velas con la pared extendida a los costados

## Probar en local
    npx serve .

## Publicar en Cloudflare Pages
    npx wrangler login
    npx wrangler pages deploy . --project-name=biribiri-carta

Después, en Cloudflare: Workers & Pages > biribiri-carta > Custom domains.
