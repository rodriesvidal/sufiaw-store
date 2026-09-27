# Sufiaw Store

Producción: [sufiaw-store.vercel.app](https://sufiaw-store.vercel.app)

Tienda de computadores, accesorios y servicios tecnológicos con panel de administración para **Sufiaw Store**, construida con Next.js 16, React 19, TypeScript, Tailwind CSS y shadcn/ui.

## Estado actual

- Escaparate editorial responsive
- Catálogo y fichas de producto
- Cotización directa por WhatsApp y enlaces a Mercado Libre
- Checkout visual preparado para Webpay Plus y Mercado Pago
- Panel CRUD de productos en `/admin`
- Estados publicado, agotado visible y borrador privado
- Asignación local de administradores
- Imágenes y productos de muestra claramente identificados
- SEO base, sitemap, robots y metadatos sociales
- Auditoría WCAG sin infracciones automáticas detectadas

El panel usa `localStorage` durante esta primera etapa. Esto permite validar el flujo sin exponer credenciales ni contratar servicios antes de aprobar el catálogo. Los cambios sólo se ven en el navegador que los creó.

## Preparación de pagos

La ruta `/checkout` ya presenta Webpay Plus y Mercado Pago sin simular cobros. El panel permite guardar un enlace de Mercado Pago por producto; cuando exista, se habilitará para una compra directa de una unidad.

Para activar cobros completos se implementarán estos flujos sobre un catálogo persistente:

1. Webpay: crear la transacción en servidor, redirigir con `token_ws`, confirmar el retorno y registrar el resultado.
2. Mercado Pago: crear una preferencia de Checkout Pro, redirigir al `init_point` y actualizar la orden mediante webhook validado.
3. Verificar precio y stock desde la base de datos antes de crear cualquier pago.
4. Descontar inventario sólo después de confirmar el pago.

Las credenciales previstas están en `.env.example` y nunca deben exponerse al navegador.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. El panel está disponible en `http://localhost:3000/admin`.

## Validación

```bash
npm run lint
npm run build
```

## Paso a producción del panel

La interfaz ya separa las piezas que luego se conectarán a servicios persistentes:

1. Clerk para inicio de sesión y lista segura de administradores.
2. Base de datos administrada para productos, inventario y pedidos.
3. Vercel Blob para fotografías de producto.
4. Mercado Pago para checkout, webhooks y estado de pago.
5. Dominio propio una vez comprado.

Las variables previstas están documentadas en `.env.example`; no se deben guardar secretos en Git.

## Recursos visuales

Las imágenes iniciales son referencias generadas para definir la dirección visual y están marcadas como “Imagen referencial” en la tienda. Deben reemplazarse por fotografías reales desde el panel antes de habilitar pagos directos.
