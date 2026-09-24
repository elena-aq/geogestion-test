# GeoGestión – Prueba E2E del formulario de demo de GDW Health

Automatización E2E con **Playwright Test + TypeScript** del flujo de solicitud de demostración de
GoDoWorks.

## Descripción del ejercicio

El test recorre el siguiente flujo y verifica que el formulario rechace una solicitud incompleta:

1. Abrir `https://www.godoworks.com/soluciones/`.
2. Hacer click en la opción **GDW Health**.
3. Hacer click en el botón **Solicita una Demo**.
4. Verificar que la página baja hasta el formulario de contacto.
5. Completar el formulario dejando vacío el campo **Nombre de la empresa**.
6. Hacer click en **Enviar consulta**.
7. Verificar el mensaje de error **"Faltan datos. Revisá los campos marcados"** y que el campo
   Empresa quede marcado como inválido.

Cada paso es un `test.step()` y al final del paso 7 se adjunta una captura de pantalla como evidencia
(`evidencia-mensaje-error` en el reporte HTML).

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- Google Chrome instalado (el proyecto usa `channel: 'chrome'`)

## Instalación

```bash
npm install
```

Si no tenés Google Chrome instalado, podés instalarlo con Playwright:

```bash
npx playwright install chrome
```

## Ejecución

Modo headless (por defecto):

```bash
npm test
```

Modo headed (con el navegador visible):

```bash
npm run test:headed
```

## Reporte

Después de ejecutar, abrí el reporte HTML con:

```bash
npm run report
```

El reporte incluye los pasos, la captura de evidencia del paso 7 y, en caso de fallo, captura,
video y contexto del error. El trace se genera en el primer reintento (`trace: 'on-first-retry'`).

## Estructura del proyecto

```
├── data/
│   └── test-data.ts           # Datos de prueba y textos esperados
├── pages/
│   ├── SolucionesPage.ts      # Page Object de /soluciones/
│   └── GdwHealthPage.ts       # Page Object de /gdw-health/ y su formulario de contacto
├── tests/
│   └── solicitar-demo.spec.ts # Test del flujo completo (7 pasos)
├── playwright.config.ts
└── package.json
```

## Decisiones y limitaciones

### Captcha (hCaptcha)

El campo "Soy humano" es un **hCaptcha**, un servicio anti-bot de terceros. No es un checkbox propio
del formulario, por lo que **no se automatiza ni se intenta evadir**. El test solo verifica que el
captcha esté presente y lo deja sin marcar. Esto no afecta el objetivo del test: la validación de
campos obligatorios ocurre antes que la del captcha, así que el mensaje "Faltan datos..." se muestra
igual.

### Defecto encontrado: el formulario no queda en pantalla (paso 4)

Al hacer click en "Solicita una Demo", la página baja hasta el formulario, pero unos 300 ms después
contenido que se carga tarde agrega ~750 px **por encima** del formulario. Como el scroll no se
compensa, la vista termina en la sección "¿Qué novedades tenemos?" y el formulario queda fuera de
pantalla. Se reproduce de forma consistente en Chrome a 1280×720 con caché vacía.

Por este motivo el paso 4 verifica que la URL navegue a `#contacto` y que el formulario sea visible,
pero no que quede dentro de la pantalla (`toBeInViewport()`), ya que esa verificación falla siempre
por este defecto.

### Idioma del navegador

Con el navegador en inglés el sitio muestra un banner fijo "View this page in English". El proyecto
configura `locale: 'es-UY'` para simular a un usuario de Uruguay y evitar el banner.
