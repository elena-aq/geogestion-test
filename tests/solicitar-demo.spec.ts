import { test, expect } from '@playwright/test';
import { SolucionesPage } from '../pages/SolucionesPage';
import { GdwHealthPage } from '../pages/GdwHealthPage';
import { solicitudDemoIncompleta, textos } from '../data/test-data';

test('Solicitud de demo de GDW Health con datos incompletos muestra error de validación', async ({ page }, testInfo) => {
  const soluciones = new SolucionesPage(page);
  const gdwHealth = new GdwHealthPage(page);

  await test.step('1. Abrir la página de Soluciones', async () => {
    await soluciones.abrir();
    await expect(page).toHaveURL(/\/soluciones\/$/);
    await expect(soluciones.linkGdwHealth).toBeVisible();
  });

  await test.step('2. Hacer click en la opción "GDW Health"', async () => {
    await soluciones.irAGdwHealth();
    await expect(page).toHaveURL(/\/gdw-health\/$/);
  });

  await test.step('3. Hacer click en el botón "Solicita una Demo"', async () => {
    await gdwHealth.solicitarDemo();
  });

  await test.step('4. Verificar que la página baja hasta el formulario de contacto', async () => {
    await expect(page).toHaveURL(/\/gdw-health\/#contacto$/);
    await expect(gdwHealth.tituloFormulario).toBeVisible();
    await expect(gdwHealth.botonEnviarConsulta).toBeVisible();
  });

  await test.step('5. Completar el formulario dejando vacío el campo Empresa', async () => {
    await gdwHealth.completarFormulario(solicitudDemoIncompleta);
    await expect(gdwHealth.inputEmpresa).toBeEmpty();
    // El captcha es un hCaptcha (anti-bot de terceros): se verifica que esté presente, pero no se marca.
    await expect(gdwHealth.checkboxCaptcha).toBeVisible();
  });

  await test.step('6. Hacer click en el botón "Enviar consulta"', async () => {
    await gdwHealth.enviarConsulta();
  });

  await test.step('7. Verificar el mensaje de error "Faltan datos. Revisá los campos marcados"', async () => {
    await expect(gdwHealth.mensajeAviso).toBeVisible();
    await expect(gdwHealth.mensajeAviso).toContainText(textos.errorFaltanDatos);
    await expect(gdwHealth.inputEmpresa).toHaveAttribute('aria-invalid', 'true');
    await expect(gdwHealth.inputNombreCompleto).not.toHaveAttribute('aria-invalid');

    await testInfo.attach('evidencia-mensaje-error', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
});
