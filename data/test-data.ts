export interface DatosSolicitudDemo {
  nombreCompleto: string;
  correo: string;
  telefono: string;
  empresa: string;
  cargo: string;
  ciudadPais: string;
}

export const solicitudDemoIncompleta: DatosSolicitudDemo = {
  nombreCompleto: 'John Smith Prueba',
  correo: 'info@godoworks.com',
  telefono: '59895654785',
  empresa: '', // Se deja vacío a propósito para provocar el error de validación
  cargo: 'Analista QA + IA',
  ciudadPais: 'Uruguay',
};

export const textos = {
  tituloFormulario: 'Contáctanos y obtén más información sobre nuestras soluciones',
  errorFaltanDatos: 'Faltan datos. Revisá los campos marcados',
};
