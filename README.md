# Sufiaw Store

Producción: [sufiaw-store.vercel.app](https://sufiaw-store.vercel.app)

Tienda de computadores, accesorios y servicios tecnológicos con panel de administración para **Sufiaw Store**, construida con Next.js 16, React 19, TypeScript, Tailwind CSS y shadcn/ui.

## Estado actual

- Escaparate editorial responsive
- Catálogo y fichas de producto
- Cotización directa por WhatsApp y enlaces a Mercado Libre
- Panel CRUD de productos en `/admin`
- Asignación local de administradores
- Imágenes y productos de muestra claramente identificados
- SEO base, sitemap, robots y metadatos sociales
- Auditoría WCAG sin infracciones automáticas detectadas

El panel usa `localStorage` durante esta primera etapa. Esto permite validar el flujo sin exponer credenciales ni contratar servicios antes de aprobar el catálogo. Los cambios sólo se ven en el navegador que los creó.

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
