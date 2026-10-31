import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, Lock, ArrowRight, ShieldCheck, MessageCircle, Sparkles, Eye } from 'lucide-react';
import { ActiveAppointmentRequest, ScreenId } from '../types';

interface ProposalScreenProps {
  request: ActiveAppointmentRequest;
  onNavigate: (screen: ScreenId) => void;
  onProceedToPayment: (selectedDate: string, selectedSlot: string) => void;
  onOpenChat: () => void;
}

export const ProposalScreen: React.FC<ProposalScreenProps> = ({
  request,
  onNavigate,
  onProceedToPayment,
  onOpenChat
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(6); // Default 6 Nov as in screenshot
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [showCabinModal, setShowCabinModal] = useState<boolean>(false);

  // Calendar dates for Nov 2026
  // Days of week: L, M, X, J, V, S, D
  const days = [
    { day: 2, enabled: false },
    { day: 3, enabled: false },
    { day: 4, enabled: true },
    { day: 5, enabled: true },
    { day: 6, enabled: true }, // Screenshot active
    { day: 7, enabled: true },
    { day: 8, enabled: false },
    { day: 9, enabled: true },
    { day: 10, enabled: true },
    { day: 11, enabled: true },
    { day: 12, enabled: true },
    { day: 13, enabled: true },
    { day: 14, enabled: true },
    { day: 15, enabled: false },
  ];

  const getDayName = (day: number) => {
    switch (day) {
      case 4: return 'Miércoles 4 de Noviembre';
      case 5: return 'Jueves 5 de Noviembre';
      case 6: return 'Viernes 6 de Noviembre';
      case 7: return 'Sábado 7 de Noviembre';
      case 9: return 'Lunes 9 de Noviembre';
      case 10: return 'Martes 10 de Noviembre';
      case 11: return 'Miércoles 11 de Noviembre';
      case 12: return 'Jueves 12 de Noviembre';
      case 13: return 'Viernes 13 de Noviembre';
      case 14: return 'Sábado 14 de Noviembre';
      default: return `Día ${day} de Noviembre`;
    }
  };

  const handleProceed = () => {
    const formattedDate = getDayName(selectedDay);
    onProceedToPayment(formattedDate, selectedSlot);
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Top Approval Alert */}
      <div className="p-4 bg-[#eef3ee] rounded-2xl border border-[#d2dfd2] flex items-start gap-3 shadow-2xs">
        <div className="w-10 h-10 rounded-full bg-[#2d4030] text-white flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
          </svg>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-[#2d4030]">
            Etapa 2 / 4 • Aprobado
          </div>
          <h1 className="font-serif text-lg font-semibold text-[#1c241d] leading-snug">
            Propuesta de Cita & Agenda
          </h1>
          <p className="text-xs text-[#526352] leading-relaxed">
            ¡Tu cotización ha sido aprobada por <strong>{request.artist.name}</strong> ({request.artist.role})!
          </p>
        </div>
      </div>

      {/* Cabin Banner Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#ded8cc] bg-stone-900 text-white">
        <div className="relative h-44 w-full">
          <img
            src="/src/assets/images/hero_atelier_studio_1793464043441.jpg"
            alt="Elena Vega Studio Atelier"
            className="w-full h-full object-cover filter brightness-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-medium text-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{request.artist.name} Studio Atelier • Cabina 01</span>
            </div>
            <button
              onClick={() => setShowCabinModal(true)}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver flujo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detalle de la Propuesta */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f4f1ea] flex items-center justify-center text-[#2d4030]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-serif text-base font-semibold text-[#1c241d]">
              Detalle de la Propuesta
            </h2>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2d4030] bg-[#eef3ee] px-2.5 py-0.5 rounded-full border border-[#d2dfd2]">
            Boceto Validado
          </span>
        </div>

        {/* Proposal Artwork & Specs */}
        <div className="flex items-start gap-3.5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-[#ded8cb] shrink-0 bg-stone-100">
            <img
              src="/src/assets/images/botanical_sketch_olive_1793464043861.jpg"
              alt="Boceto Rama de olivo botánica"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c241d] leading-snug">
              Rama de olivo botánica
            </h3>
            <p className="text-xs text-[#5e6b5d]">
              Sombra suave y micro-línea
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-[#445043]">
              <span className="bg-[#f4f1ea] px-2 py-0.5 rounded-md font-medium">
                📏 8 cm
              </span>
              <span className="bg-[#f4f1ea] px-2 py-0.5 rounded-md font-medium">
                🦴 Antebrazo
              </span>
              <span className="bg-[#f4f1ea] px-2 py-0.5 rounded-md font-medium">
                ⏱ 2.5 h aprox.
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Split */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#fbf9f5] rounded-xl border border-[#eae5da]">
          <div>
            <span className="text-[11px] text-[#788577]">Presupuesto Cerrado</span>
            <div className="text-lg font-serif font-bold text-[#1c241d] mt-0.5">
              {request.quotedPrice || 180} €
            </div>
          </div>
          <div className="border-l border-[#ded8cb] pl-3.5">
            <span className="text-[11px] text-[#788577]">Anticipo Requerido</span>
            <div className="text-lg font-serif font-bold text-[#2d4030] mt-0.5">
              {request.depositRequired || 50} €
            </div>
          </div>
        </div>
      </div>

      {/* Disponibilidad en Estudio - Calendar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#2d4030]" />
            <h2 className="font-serif text-base font-semibold text-[#1c241d]">
              Disponibilidad en Estudio
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#2d4030]">Noviembre 2026</span>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#7e8b7d] pb-1">
          <div>L</div>
          <div>M</div>
          <div>X</div>
          <div>J</div>
          <div>V</div>
          <div>S</div>
          <div>D</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {days.map((item, idx) => {
            const isSelected = selectedDay === item.day;
            const isAvailable = item.enabled;

            return (
              <button
                key={idx}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedDay(item.day)}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#2d4030] text-white shadow-xs scale-105'
                    : isAvailable
                    ? 'bg-[#f4f1ea] text-[#2c362c] hover:bg-[#eae5db] hover:border-[#2d4030]'
                    : 'bg-[#faf9f6] text-[#c2bcaf] cursor-not-allowed opacity-50'
                }`}
              >
                {item.day}
              </button>
            );
          })}
        </div>

        {/* Selected date feedback */}
        <div className="text-xs text-[#445043] flex items-center gap-1.5 font-medium pt-1">
          <span className="w-2 h-2 rounded-full bg-[#2d4030]" />
          <span>Día seleccionado: <strong>{getDayName(selectedDay)}</strong></span>
        </div>

        {/* Franjas sugeridas */}
        <div className="space-y-2 pt-2 border-t border-[#f0ece3]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#738272]">
            Franjas sugeridas por el atelier
          </span>

          <div className="grid grid-cols-3 gap-2">
            {[
              { slot: '10:30 AM', period: 'Mañana' },
              { slot: '14:00 PM', period: 'Mediodía' },
              { slot: '17:00 PM', period: 'Tarde' }
            ].map((f, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSlot(f.slot)}
                className={`py-2 px-1 rounded-xl text-center transition-all ${
                  selectedSlot === f.slot
                    ? 'bg-[#2d4030] text-white font-semibold shadow-xs'
                    : 'bg-[#f4f1ea] text-[#445043] hover:bg-[#eae5db]'
                }`}
              >
                <div className="text-xs">{f.slot}</div>
                <div className="text-[10px] opacity-80">{f.period}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vegan & Sterile Guarantee Card */}
      <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#e8e4da] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#d4a359]/20 text-[#a37932] flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
          </svg>
        </div>
        <div className="text-xs leading-relaxed">
          <strong className="text-[#1c241d] block">Material 100% vegano & esterilizado</strong>
          <span className="text-[#5f6c5e]">
            Tu cita incluye infusión botánica de bienvenida y set de curación dermoprotector.
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleProceed}
          className="w-full py-3.5 bg-[#2d4030] hover:bg-[#202e22] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
        >
          <Lock className="w-4 h-4" />
          <span>Aceptar fecha y proceder a reserva</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

        <button
          type="button"
          onClick={onOpenChat}
          className="w-full py-2 text-xs font-semibold text-[#546253] hover:text-[#1c241d] flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Solicitar cambios o más información</span>
        </button>
      </div>

      {/* Cabin Flow Modal */}
      {showCabinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-[#1c241d]">
                Protocolo de Cabina 01 (Sala Verde)
              </h3>
              <button
                onClick={() => setShowCabinModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-[#526051] space-y-2.5 leading-relaxed">
              <p>• <strong>Sesión privada exclusiva:</strong> Cabina individual con purificación de aire HEPA y aromaterapia de cedro y eucalipto.</p>
              <p>• <strong>Prueba de calco en piel:</strong> Elena transferirá el esténcil a escala 1:1 para verificar la caída anatómica con luz de día natural.</p>
              <p>• <strong>Trazo milimétrico:</strong> Aplicación suave con máquina rotativa suiza de vibración casi imperceptible.</p>
            </div>
            <button
              onClick={() => setShowCabinModal(false)}
              className="w-full py-2.5 bg-[#2d4030] text-white text-xs font-semibold rounded-xl"
            >
              Comprendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
