import React, { useState } from 'react';
import { Sparkles, Upload, Check, Info, Shield, Plus, X, ArrowRight, UserCheck } from 'lucide-react';
import { ARTISTS, STYLES, BODY_ZONES, SIZES, QUICK_IDEAS } from '../data/initialData';
import { ActiveAppointmentRequest, ScreenId } from '../types';

interface RequestScreenProps {
  initialArtistId?: string;
  onNavigate: (screen: ScreenId) => void;
  onSubmitRequest: (newReq: ActiveAppointmentRequest) => void;
}

export const RequestScreen: React.FC<RequestScreenProps> = ({
  initialArtistId = 'any',
  onNavigate,
  onSubmitRequest
}) => {
  const [selectedArtist, setSelectedArtist] = useState<string>(initialArtistId);
  const [selectedStyle, setSelectedStyle] = useState<string>('Botánico Ilustrado');
  const [concept, setConcept] = useState<string>('Ramo de lavanda silvestre y hojas de olivo entrelazados con trazo muy fino en aguja 1RL');
  const [selectedZone, setSelectedZone] = useState<string>('Antebrazo');
  const [selectedSize, setSelectedSize] = useState<'mini' | 'medio' | 'pieza-mayor'>('medio');
  const [selectedShift, setSelectedShift] = useState<'mananas' | 'tardes' | 'sabados'>('mananas');

  // Preloaded sample references matching screenshots
  const [references, setReferences] = useState<string[]>([
    '/src/assets/images/botanical_sketch_olive_1793464043861.jpg',
    '/src/assets/images/tattoo_fineline_organic_1793464044346.jpg'
  ]);

  const activeZoneObj = BODY_ZONES.find(z => z.id === selectedZone) || BODY_ZONES[0];
  const activeSizeObj = SIZES.find(s => s.id === selectedSize) || SIZES[1];

  const handleAddIdea = (idea: string) => {
    if (concept.includes(idea)) return;
    const separator = concept.trim() ? ', ' : '';
    setConcept(prev => (prev + separator + idea).slice(0, 400));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && references.length < 3) {
      const url = URL.createObjectURL(file);
      setReferences(prev => [...prev, url]);
    }
  };

  const handleRemoveRef = (idx: number) => {
    setReferences(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const artistObj = ARTISTS.find(a => a.id === selectedArtist) || ARTISTS[0];

    const newRequest: ActiveAppointmentRequest = {
      id: `req-${Date.now()}`,
      code: `#BA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: concept.slice(0, 36) || 'Pieza Botánica Personalizada',
      sentDate: 'Hoy',
      status: 'propuesta_lista',
      artist: {
        name: artistObj.name,
        role: artistObj.role,
        specialty: artistObj.specialty,
        avatarText: artistObj.avatarText
      },
      currentStage: 'Revisión y Bocetaje por la Artista',
      stageNote: `${artistObj.name} ha validado las dimensiones para ${selectedZone}. Cotización y disponibilidad preparadas.`,
      timeRemainingEstimate: '< 6 horas',
      step: 2,
      bodyZone: `${selectedZone} interior`,
      scaleEstimate: `${activeSizeObj.measure} (${selectedStyle})`,
      references: references.length > 0 ? references : ['/src/assets/images/botanical_sketch_olive_1793464043861.jpg'],
      quotedPrice: selectedSize === 'mini' ? 120 : selectedSize === 'medio' ? 180 : 260,
      depositRequired: 50,
      selectedDate: 'Viernes 6 de Noviembre',
      selectedTimeSlot: selectedShift === 'mananas' ? '10:30 AM' : selectedShift === 'tardes' ? '17:00 PM' : '11:00 AM'
    };

    onSubmitRequest(newRequest);
    onNavigate('detalle');
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#2d4030] text-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Agenda abierta • Temporada Botánica</span>
          </div>
          <div className="px-2.5 py-0.5 bg-[#d4a359] text-[#1c241d] rounded-full text-[11px] font-semibold">
            Respuesta &lt; 24h
          </div>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="space-y-1.5">
        <span className="text-[11px] uppercase tracking-wider font-bold text-[#6a7569]">
          Paso 1 de 4
        </span>
        <h1 className="font-serif text-2xl font-semibold text-[#1c241d]">
          Nueva Solicitud de Cita
        </h1>
        <p className="text-xs text-[#596658] leading-relaxed">
          Cuéntanos tu visión. Diseñamos cada pieza con atención orgánica, intimista y personalizada.
        </p>

        {/* Stepper bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] font-medium text-[#798578] mb-1.5">
            <span className="text-[#2d4030] font-semibold">1. Idea & Detalles</span>
            <span>2. Valoración</span>
            <span>3. Turno</span>
            <span>4. Depósito</span>
          </div>
          <div className="w-full h-1.5 bg-[#e4ded2] rounded-full overflow-hidden">
            <div className="h-full bg-[#2d4030] rounded-full w-1/4 transition-all duration-300" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Elección de Artista */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#2d4030]" />
              <span>Elección de Artista</span>
            </label>
            <span className="text-[11px] text-[#717d70]">Especialistas botánicos</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedArtist('any')}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                selectedArtist === 'any'
                  ? 'border-[#2d4030] bg-[#eef3ee] ring-1 ring-[#2d4030]'
                  : 'border-[#e0dacf] hover:bg-[#faf9f6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <Sparkles className="w-4 h-4 text-[#2d4030]" />
                {selectedArtist === 'any' && (
                  <Check className="w-4 h-4 text-[#2d4030]" />
                )}
              </div>
              <div className="mt-2">
                <p className="text-xs font-semibold text-[#1c241d]">Primer Artista</p>
                <p className="text-[10px] text-[#5e6b5d]">Mayor disponibilidad</p>
              </div>
            </button>

            {ARTISTS.map(artist => (
              <button
                key={artist.id}
                type="button"
                onClick={() => setSelectedArtist(artist.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  selectedArtist === artist.id
                    ? 'border-[#2d4030] bg-[#eef3ee] ring-1 ring-[#2d4030]'
                    : 'border-[#e0dacf] hover:bg-[#faf9f6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-5 h-5 rounded-full bg-[#2d4030]/10 text-[10px] font-bold text-[#2d4030] flex items-center justify-center">
                    {artist.avatarText}
                  </div>
                  {selectedArtist === artist.id && (
                    <Check className="w-4 h-4 text-[#2d4030]" />
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-[#1c241d] truncate">{artist.name}</p>
                  <p className="text-[10px] text-[#5e6b5d] truncate">{artist.specialty}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Estilo Principal */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m18 2 4 4-14 14H4v-4L18 2z" />
            </svg>
            <span>Estilo Principal</span>
          </label>

          <div className="flex flex-wrap gap-2">
            {STYLES.map(style => (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedStyle === style
                    ? 'bg-[#2d4030] text-white shadow-2xs'
                    : 'bg-[#f4f1ea] text-[#3e4a3d] hover:bg-[#eae5db]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Concepto del Tatuaje */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
              </svg>
              <span>Concepto del Tatuaje</span>
            </label>
            <span className="text-[10px] text-[#788577] font-mono">{concept.length} / 400</span>
          </div>

          <p className="text-[11px] text-[#5e6b5d]">
            Describe elementos botánicos, flores favoritas, siluetas o simbolismo especial.
          </p>

          <textarea
            value={concept}
            onChange={e => setConcept(e.target.value.slice(0, 400))}
            rows={3}
            placeholder="Ej: Ramo de lavanda silvestre y eucalipto entrelazados con trazo muy fino..."
            className="w-full p-3 rounded-xl border border-[#d8d2c4] bg-[#faf8f4] text-xs sm:text-sm text-[#1c241d] focus:outline-none focus:ring-1 focus:ring-[#2d4030] resize-none"
          />

          <div className="flex items-center flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-[#738072] font-medium mr-1">Ideas:</span>
            {QUICK_IDEAS.map(idea => (
              <button
                key={idea}
                type="button"
                onClick={() => handleAddIdea(idea)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#f2eee5] hover:bg-[#e6e0d4] text-[#2d4030] font-medium transition-colors"
              >
                + {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Zona Corporal */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="3" />
                <path d="M12 8v8" />
                <path d="m8 12 4-2 4 2" />
                <path d="m9 20 3-4 3 4" />
              </svg>
              <span>Zona Corporal</span>
            </label>
            <span className="text-xs text-[#2d4030] font-semibold">{selectedZone}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {BODY_ZONES.map(zone => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZone(zone.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedZone === zone.id
                    ? 'bg-[#eef3ee] text-[#2d4030] border border-[#2d4030] font-semibold'
                    : 'bg-[#f4f1ea] text-[#4a5549] border border-transparent hover:bg-[#eae5db]'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Pain indicator box */}
          <div className="p-2.5 bg-[#fbf9f4] rounded-xl border border-[#e8e4da] flex items-center justify-between">
            <span className="text-[11px] text-[#5e6b5d]">
              Nivel de molestia estimado en {selectedZone}:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3.5 h-2 rounded-xs ${
                    level <= activeZoneObj.painLevel ? 'bg-[#2d4030]' : 'bg-[#ded7c8]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tamaño Estimado */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span>Tamaño Estimado</span>
            </label>
            <span className="text-xs font-semibold text-[#2d4030]">{activeSizeObj.measure}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SIZES.map(size => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size.id as any)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedSize === size.id
                    ? 'border-[#2d4030] bg-[#eef3ee] text-[#2d4030]'
                    : 'border-[#e0dacf] hover:bg-[#faf9f6] text-[#445043]'
                }`}
              >
                <div className="w-5 h-5 mx-auto rounded border border-[#2d4030]/30 text-[10px] font-bold flex items-center justify-center mb-1">
                  {size.id === 'mini' ? '1' : size.id === 'medio' ? '2' : '3'}
                </div>
                <p className="text-xs font-semibold">{size.label}</p>
                <p className="text-[10px] text-[#637162]">{size.measure}</p>
              </button>
            ))}
          </div>

          <div className="p-2.5 bg-[#f4f1ea] rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs text-[#525f51]">
            <span>Rango orientativo: <strong>{activeSizeObj.priceRange}</strong></span>
            <span className="text-[10px] text-[#717d70]">(depósito habitual 30%)</span>
          </div>
        </div>

        {/* Referencias o Bocetos */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#2d4030]" />
              <span>Referencias o Bocetos</span>
            </label>
            <span className="text-[11px] text-[#717d70]">Hasta 3 imágenes</span>
          </div>

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed border-[#d5cfbf] hover:border-[#2d4030] p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer bg-[#faf8f4] hover:bg-[#f3f0e8] transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#2d4030]/10 text-[#2d4030] flex items-center justify-center mb-1.5">
              <Upload className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-[#1c241d]">Toca para adjuntar fotos o capturas</p>
            <p className="text-[10px] text-[#788577] mt-0.5">Formatos JPG, PNG o HEIC (máx 10MB)</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Thumbnails */}
          {references.length > 0 && (
            <div className="grid grid-cols-3 gap-2 pt-1">
              {references.map((refUrl, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#ded8cb] h-20 bg-stone-100">
                  <img
                    src={refUrl}
                    alt={`Referencia ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRef(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[9px] px-1 rounded">
                    Ref {idx + 1}
                  </span>
                </div>
              ))}

              {references.length < 3 && (
                <label className="h-20 rounded-lg border-2 border-dashed border-[#ded8cb] hover:border-[#2d4030] flex flex-col items-center justify-center text-center cursor-pointer bg-[#faf8f4]">
                  <Plus className="w-4 h-4 text-[#637162]" />
                  <span className="text-[10px] text-[#637162] mt-0.5">Añadir</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Preferencia de Turno */}
        <div className="bg-white p-4 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
          <label className="text-xs font-semibold text-[#1c241d] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Preferencia de Turno</span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'mananas', label: 'Mañanas (10-14h)' },
              { id: 'tardes', label: 'Tardes (15-20h)' },
              { id: 'sabados', label: 'Sábados' }
            ].map(shift => (
              <button
                key={shift.id}
                type="button"
                onClick={() => setSelectedShift(shift.id as any)}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium text-center transition-all ${
                  selectedShift === shift.id
                    ? 'bg-[#eef3ee] text-[#2d4030] border border-[#2d4030] font-semibold'
                    : 'bg-[#f4f1ea] text-[#485347] border border-transparent hover:bg-[#eae5db]'
                }`}
              >
                {shift.label}
              </button>
            ))}
          </div>
        </div>

        {/* Atelier Transparent Process Card */}
        <div className="p-4 bg-[#eef3ee] rounded-2xl border border-[#d2dfd2] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2d4030]">
            <Shield className="w-4 h-4 text-[#2d4030]" />
            <span>Proceso Transparente Atelier</span>
          </div>
          <p className="text-xs text-[#445343] leading-relaxed">
            Revisamos tu propuesta meticulosamente y te enviaremos una valoración artística con presupuesto cerrado y calendario de citas en menos de <strong>24 horas laborables</strong>.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-[#556954] pt-1 border-t border-[#dce8dc]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2d4030]" />
            <span>Basado en el pipeline oficial de confirmación del estudio</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-2 pt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#2d4030] hover:bg-[#202e22] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <span>Enviar solicitud para valoración</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[11px] text-[#788577] flex items-center justify-center gap-1">
            <svg className="w-3 h-3 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Sin cobros hasta confirmar propuesta y fecha</span>
          </p>
        </div>
      </form>
    </div>
  );
};
