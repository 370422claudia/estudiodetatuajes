import { Artist, TattooSpecialty, ActiveAppointmentRequest, ConfirmedAppointment } from '../types';

export const ARTISTS: Artist[] = [
  {
    id: 'elena-vega',
    name: 'Elena Vega',
    role: 'Directora Creativa',
    specialty: 'Fine Line Botánico',
    experience: '8 años exp.',
    avatarText: 'EV',
    description: 'Especialista en trazos ultra-finos (1RL), ramas medicinales, helechos y micro-composiciones anatómicas en calma.',
    availableDays: [4, 5, 6, 11, 12, 13, 18, 19, 20]
  },
  {
    id: 'marc-soler',
    name: 'Marc Soler',
    role: 'Artista Residente',
    specialty: 'Ilustración Botánica Clásica & Flora Silvestre',
    experience: '6 años exp.',
    avatarText: 'MS',
    description: 'Inspirado en los grabados de historia natural del siglo XIX, con sombreado punteado minucioso y flores mediterráneas.',
    availableDays: [3, 4, 10, 11, 17, 18, 24, 25]
  },
  {
    id: 'aina-bosch',
    name: 'Aina Bosch',
    role: 'Artista Residente',
    specialty: 'Micro-realismo Vegetal & Geometría Sagrada',
    experience: '5 años exp.',
    avatarText: 'AB',
    description: 'Combina aves, insectos polinizadores y proporciones áureas con texturas suaves que envejecen con elegancia.',
    availableDays: [5, 6, 7, 12, 13, 14, 19, 20, 21]
  }
];

export const SPECIALTIES: TattooSpecialty[] = [
  {
    id: 'fine-line',
    title: 'Fine Line Orgánico',
    description: 'Líneas de 1 a 3 agujas, sutiles y de cicatrización impecable y duradera.',
    image: '/src/assets/images/tattoo_fineline_organic_1793464044346.jpg',
    needleType: '1RL / 3RL Ultra-fino',
    healingDays: '7 - 10 días'
  },
  {
    id: 'ilustracion-botanica',
    title: 'Ilustración Botánica',
    description: 'Fiel al grabado clásico botánico con sombras delicadas de punto.',
    image: '/src/assets/images/tattoo_botanical_illustration_1793464044741.jpg',
    needleType: '3RL Dotwork sombreado',
    healingDays: '10 - 14 días'
  },
  {
    id: 'micro-realismo',
    title: 'Micro-Realismo',
    description: 'Detalles hiperprecisos a escala reducida y degradados botánicos sedosos.',
    image: '/src/assets/images/tattoo_micro_realism_1793464045511.jpg',
    needleType: 'Single Needle Micro',
    healingDays: '8 - 12 días'
  },
  {
    id: 'geometria-sagrada',
    title: 'Geometría Sagrada',
    description: 'Proporciones áureas combinadas con hojas y arquitectura de la naturaleza.',
    image: '/src/assets/images/botanical_sketch_olive_1793464043861.jpg',
    needleType: 'Alineación geométrica fina',
    healingDays: '10 - 12 días'
  }
];

export const INITIAL_REQUESTS: ActiveAppointmentRequest[] = [
  {
    id: 'req-olive-01',
    code: '#BA-2026-8492',
    title: 'Ramo de Olivo & Flora Silvestre',
    sentDate: '28 Octubre',
    status: 'propuesta_lista',
    artist: {
      name: 'Elena Vega',
      role: 'Artista Residente',
      specialty: 'Fine Line Botánico',
      avatarText: 'EV'
    },
    currentStage: 'Revisión y Bocetaje por la Artista',
    stageNote: 'Elena está adaptando las ramificaciones botánicas a la curvatura anatómica. Presupuesto estimado disponible en < 6 horas.',
    timeRemainingEstimate: '< 6 horas',
    step: 2,
    bodyZone: 'Antebrazo interior (D)',
    scaleEstimate: '8 - 12 cm (Fine line)',
    references: [
      '/src/assets/images/botanical_sketch_olive_1793464043861.jpg',
      '/src/assets/images/tattoo_fineline_organic_1793464044346.jpg',
      '/src/assets/images/tattoo_botanical_illustration_1793464044741.jpg'
    ],
    quotedPrice: 180,
    depositRequired: 50,
    selectedDate: 'Viernes 6 de Noviembre',
    selectedTimeSlot: '10:30 AM'
  }
];

export const INITIAL_CONFIRMED: ConfirmedAppointment[] = [
  {
    id: 'conf-fern-01',
    title: 'Pieza Botánica Fine-Line',
    cabin: 'Cabina 01',
    room: 'Sala Verde',
    project: 'Helecho & Caligrafía',
    daysRemaining: 14,
    dateStr: 'Jueves, 12 de Noviembre',
    monthShort: 'NOV',
    dayNumber: 12,
    timeSlot: '11:00 AM',
    duration: '2.5h',
    studioName: 'Botanical Atelier Studio',
    studioAddress: 'Calle del León 14, Barrio de las Letras, Madrid',
    metroInfo: 'Metro Antón Martín (L1)',
    coverImage: '/src/assets/images/hero_atelier_studio_1793464043441.jpg',
    artistName: 'Elena Vega',
    depositPaid: 50,
    remainingDue: 130
  }
];

export const BODY_ZONES = [
  { id: 'Antebrazo', label: 'Antebrazo', painLevel: 2, painText: 'Bajo a moderado (cómodo para sesiones largas)' },
  { id: 'Muñeca', label: 'Muñeca', painLevel: 3, painText: 'Moderado (sensibilidad cercana a articulación)' },
  { id: 'Costillas', label: 'Costillas', painLevel: 4, painText: 'Alto (zona sensible con respiración rítmica)' },
  { id: 'Clavicula', label: 'Clavícula', painLevel: 3, painText: 'Moderado (proximidad ósea con vibración leve)' },
  { id: 'Tobillo', label: 'Tobillo', painLevel: 3, painText: 'Moderado (piel fina y relieve maleolar)' },
  { id: 'Espalda', label: 'Espalda', painLevel: 2, painText: 'Bajo a moderado (superficie anatómica amplia)' }
];

export const SIZES = [
  { id: 'mini', label: 'Mini', measure: '< 5 cm', priceRange: '€70 - €90', deposit: '€30' },
  { id: 'medio', label: 'Medio', measure: '5 - 12 cm', priceRange: '€90 - €160', deposit: '€50' },
  { id: 'pieza-mayor', label: 'Pieza Mayor', measure: '> 12 cm', priceRange: '€180 - €320', deposit: '€70' }
];

export const STYLES = [
  'Botánico Ilustrado',
  'Micro Fine Line',
  'Blackwork Orgánico',
  'Sombreado Dotwork'
];

export const QUICK_IDEAS = [
  'Hojas de olivo',
  'Helecho',
  'Peonía & Luna',
  'Lavanda silvestre',
  'Eucalipto plateado',
  'Ginkgo biloba'
];
