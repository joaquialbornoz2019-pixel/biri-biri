# Contexto del proyecto

Prototipo de carta digital para el restaurante biribiri (Madrid), pensado como ejemplo para presentaciones a clientes. Sitio estático: HTML + CSS + JS, sin build.

## Decisiones de diseño ya tomadas
- Apertura: foto de velas oscurecida, luz sobre las llamas que parpadean, se pueden soplar al tocarlas. Logo "biribiri" y "fuerte al medio" tipeado. Las animaciones del inicio NO se apagan con "reducir movimiento" (solo el parallax y el rebote de la flecha).
- Mucho biri: lista tal cual la carta impresa; al tocar un plato se abre una polaroid (hoy con marcador de foto).
- Poco biri: lista con aire, un garabato por plato dibujado en bordo (`--bordo`), sin fondo. El título tacha "mucho" y escribe "poco".
- Bebidas: fondo de líquido (canvas + filtro SVG "goo"); el pingüino sirve al llegar; se revuelve con puntero y scroll; tocar un trago tiñe el líquido.
- Filtro veggie / sin gluten: DEMO con etiquetas inventadas, no son datos reales de alérgenos.

## Pendientes
- Logo real: hoy es la tipografía Caveat Brush de reemplazo. Reemplazar por el SVG/PNG oficial que entregue el restaurante (no calcarlo).
- Fotos reales de platos para las polaroids de mucho biri.
- Etiquetas reales de alérgenos si se quiere dejar el filtro.
- Idea guardada: "armá tu mesa" (lista de platos elegidos para mostrar al mozo).
- Mostrar con permiso del restaurante si el link se vuelve público.
