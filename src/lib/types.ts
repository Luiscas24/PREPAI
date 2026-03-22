export type Dose = {
  date: string | Date;
  status: 'taken' | 'missed' | 'pending';
  confirmedAt?: Date;
};

export type Appointment = {
  id: string;
  date: string | Date;
  type: 'Control trimestral' | 'Exámenes de sangre' | 'Solicitud de Entrega';
  location: string;
  notes?: string;
};

export type Supply = {
  pills: number;
  pillsPerBottle: number;
  lastRefill: string | Date;
};
