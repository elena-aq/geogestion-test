import { type Locator, type Page } from '@playwright/test';

export class SolucionesPage {
  readonly page: Page;
  // "GDW Health" aparece también dos veces en el menú del header; se acota al contenido principal.
  readonly linkGdwHealth: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkGdwHealth = page.getByRole('main').getByRole('link', { name: 'GDW Health', exact: true });
  }

  async abrir() {
    await this.page.goto('/soluciones/');
  }

  async irAGdwHealth() {
    await this.linkGdwHealth.click();
  }
}
