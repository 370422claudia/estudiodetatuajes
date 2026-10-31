export type ScreenId = 'inicio' | 'solicitar' | 'detalle' | 'pasarela' | 'mis-citas' | 'contacto';

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  avatarText: string;
  photoUrl?: string;
  description: string;
  availableDays: number[];
}

export interface TattooSpecialty {
  id: string;
  title: string;
  description: string;
  image: string;
  needleType: string;
  healingDays: string;
}

export interface BookingRequestForm {
  artistId: string;
  style: string;
  concept: string;
  bodyZone: string;
  estimatedSize: 'mini' | 'medio' | 'pieza-mayor';
  references: string[];
  shiftPreference: 'mananas' | 'tardes' | 'sabados';
}

export interface ActiveAppointmentRequest {
  id: string;
  code: string;
  title: string;
  sentDate: string;
  status: 'en_revision' | 'propuesta_lista' | 'confirmada';
  artist: {
    name: string;
    role: string;
    specialty: string;
    avatarText: string;
  };
  currentStage: string;
  stageNote: string;
  timeRemainingEstimate: string;
  step: number; // 1 to 5
  bodyZone: string;
  scaleEstimate: string;
  references: string[];
  quotedPrice?: number;
  depositRequired?: number;
  selectedDate?: string;
  selectedTimeSlot?: string;
}

export interface ConfirmedAppointment {
  id: string;
  title: string;
  cabin: string;
  room: string;
  project: string;
  daysRemaining: number;
  dateStr: string;
  monthShort: string;
  dayNumber: number;
  timeSlot: string;
  duration: string;
  studioName: string;
  studioAddress: string;
  metroInfo: string;
  coverImage: string;
  artistName: string;
  depositPaid: number;
  remainingDue: number;
}
