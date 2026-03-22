import { Dose, Appointment, Supply } from './types';

// Use static ISO strings for all dates to prevent hydration errors.
const staticBaseDate = '2024-08-15T09:00:00.000Z';

// Mock Dose History - Historial de adherencia simulado
export const doseHistory: Dose[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(staticBaseDate);
  date.setUTCDate(date.getUTCDate() - (i + 1));
  
  const statusValue = i % 20; 
  let status: 'taken' | 'missed' | 'pending' = 'taken';
  if (statusValue === 0) {
    status = 'missed';
  }
  
  return { date: date.toISOString(), status };
});

// Mock Appointments - Adaptado al contexto de Colombia (Documento de Identidad Original)
export const appointments: Appointment[] = [
  {
    id: '1',
    date: '2024-08-29T14:00:00.000Z',
    type: 'Control trimestral',
    location: 'Clínica del Sol',
    notes: '¡Importante! Es obligatorio presentar tu documento de identidad original para ser atendido. Trae tus últimos resultados de laboratorio.',
  },
  {
    id: '2',
    date: '2024-09-29T14:00:00.000Z',
    type: 'Exámenes de sangre',
    location: 'Laboratorio Central',
    notes: 'Recuerda que el ingreso al laboratorio requiere la validación de tu documento de identidad original.',
  },
  {
    id: '3',
    date: '2024-08-20T14:00:00.000Z',
    type: 'Solicitud de Entrega',
    location: 'Farmacia EPS',
    notes: 'Fecha límite para radicar tu fórmula. Debes presentar tu documento de identidad original para el registro del suministro.',
  },
];

// Mock Supply - Estado actual del suministro
export const supply: Supply = {
  pills: 23,
  pillsPerBottle: 30,
  lastRefill: '2024-08-08T09:00:00.000Z',
};