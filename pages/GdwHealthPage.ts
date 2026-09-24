import { type FrameLocator, type Locator, type Page } from '@playwright/test';
import { type DatosSolicitudDemo, textos } from '../data/test-data';

export class GdwHealthPage {
  readonly page: Page;
  // El header tiene otro link "Solicita una demo"; se acota al contenido principal.
  readonly botonSolicitarDemo: Locator;
  readonly tituloFormulario: Locator;
  readonly inputNombreCompleto: Locator;
  readonly inputCorreo: Locator;
  readonly inputTelefono: Locator;
  readonly inputEmpresa: Locator;
  readonly inputCargo: Locator;
  readonly inputCiudadPais: Locator;
  readonly frameCaptcha: FrameLocator;
  readonly checkboxCaptcha: Locator;
  readonly botonEnviarConsulta: Locator;
  readonly mensajeAviso: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botonSolicitarDemo = page.getByRole('main').getByRole('link', { name: 'Solicita una Demo' });
    this.tituloFormulario = page.getByRole('heading', { name: textos.tituloFormulario });
    this.inputNombreCompleto = page.getByRole('textbox', { name: 'Nombre completo' });
    this.inputCorreo = page.getByRole('textbox', { name: 'Correo electrónico corporativo' });
    this.inputTelefono = page.getByRole('textbox', { name: 'Telefono de contacto' });
    this.inputEmpresa = page.getByRole('textbox', { name: 'Nombre de la empresa' });
    this.inputCargo = page.getByRole('textbox', { name: 'Cargo o posición' });
    this.inputCiudadPais = page.getByRole('textbox', { name: 'Ciudad/País' });
    this.frameCaptcha = page.frameLocator('iframe[title*="casilla de verificación"]');
    this.checkboxCaptcha = this.frameCaptcha.getByRole('checkbox', { name: /Soy humano/ });
    this.botonEnviarConsulta = page.getByRole('button', { name: 'Enviar consulta' });
    this.mensajeAviso = page.getByRole('status').filter({ hasText: textos.errorFaltanDatos });
  }

  async solicitarDemo() {
    await this.botonSolicitarDemo.click();
  }

  async completarFormulario(datos: DatosSolicitudDemo) {
    await this.inputNombreCompleto.fill(datos.nombreCompleto);
    await this.inputCorreo.fill(datos.correo);
    await this.inputTelefono.fill(datos.telefono);
    await this.inputEmpresa.fill(datos.empresa);
    await this.inputCargo.fill(datos.cargo);
    await this.inputCiudadPais.fill(datos.ciudadPais);
  }

  async enviarConsulta() {
    await this.botonEnviarConsulta.click();
  }
}
