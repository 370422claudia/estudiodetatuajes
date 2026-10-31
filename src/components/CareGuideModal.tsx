import React from 'react';
import { X, Droplets, Sun, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fcfbf9] border border-[#dcd7cb] rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#e6e1d5] flex items-center justify-between bg-[#2d4030] text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d4a359]">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-tight">Guía de Hidratación Cutánea</h3>
              <p className="text-xs text-white/75">Protocolo 48 horas previas a tu sesión botánica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-[#2c362d]">
          <div className="bg-[#f2efe6] p-3.5 rounded-xl border border-[#ded8cb]">
            <p className="font-medium text-[#2d4030] mb-1">¿Por qué es crucial para el Fine-Line?</p>
            <p className="text-[#596658] leading-relaxed text-xs">
              La técnica de aguja única (1RL) requiere una dermis turgente y elástica. Una piel bien hidratada absorbe la tinta con suavidad milimétrica y cicatriza en tiempo récord sin engrosar el trazo.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e5e0d3]">
              <CheckCircle2 className="w-4 h-4 text-[#2d4030] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1c241d]">Hidratación interna intensiva</p>
                <p className="text-[#647263] text-xs mt-0.5">Bebe al menos 2 a 2.5 litros de agua diarios durante los 2 días previos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e5e0d3]">
              <CheckCircle2 className="w-4 h-4 text-[#2d4030] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1c241d]">Emoliente botánico neutro</p>
                <p className="text-[#647263] text-xs mt-0.5">Aplica crema hidratante sin perfumes (como manteca de karité o loción con ceramidas) dos veces al día en la zona del antebrazo.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e5e0d3]">
              <AlertCircle className="w-4 h-4 text-[#b97a3a] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1c241d]">Evitar 24h antes</p>
                <p className="text-[#647263] text-xs mt-0.5">No consumir alcohol, aspirinas ni exceso de cafeína que puedan diluir la sangre. Evita la exposición solar directa.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#eef3ee] rounded-xl border border-[#ccdacc] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#2d4030] shrink-0" />
            <span className="text-[11px] text-[#2d4030] leading-snug">
              Al llegar al estudio recibirás tu set de curación dermoprotector estéril y tu infusión orgánica de bienvenida.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#2d4030] hover:bg-[#202e22] text-white rounded-xl font-medium text-xs sm:text-sm transition-colors"
          >
            Entendido y guardado
          </button>
        </div>
      </div>
    </div>
  );
};
