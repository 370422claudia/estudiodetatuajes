import React from 'react';
import { X, MapPin, Navigation, Clock, Shield, KeyRound, ExternalLink } from 'lucide-react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studioAddress: string;
  metroInfo: string;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
  studioAddress,
  metroInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fcfbf9] border border-[#dcd7cb] rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#e6e1d5] flex items-center justify-between bg-[#2d4030] text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d4a359]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-tight">Acceso Privado al Atelier</h3>
              <p className="text-xs text-white/75">Instrucciones de llegada y código de entrada</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs sm:text-sm text-[#2c362d]">
          {/* Address card */}
          <div className="p-3.5 bg-white rounded-xl border border-[#e5e0d3] space-y-2">
            <div className="flex items-center gap-2 text-[#2d4030] font-semibold">
              <Navigation className="w-4 h-4 text-[#2d4030]" />
              <span>Dirección Confirmada</span>
            </div>
            <p className="text-[#1c241d] font-medium">{studioAddress}</p>
            <p className="text-xs text-[#627061]">{metroInfo}</p>
          </div>

          {/* Access protocol */}
          <div className="p-3.5 bg-[#f4f1ea] rounded-xl border border-[#ded8cb] space-y-2.5">
            <div className="flex items-center gap-2 text-[#2d4030] font-semibold">
              <KeyRound className="w-4 h-4 text-[#2d4030]" />
              <span>Acceso Discreto a Puerta Cerrada</span>
            </div>
            <p className="text-xs text-[#525f51] leading-relaxed">
              El timbre exterior indica discretamente <strong>"Botanical Sanctuary"</strong> (Piso 1, Puerta B).
            </p>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-[#e0dacf]">
              <span className="text-xs text-[#6e7d6d]">Código portero inteligente:</span>
              <span className="font-mono font-bold text-sm text-[#2d4030] tracking-wider">#4891*</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6d796c] p-2 bg-[#f9f8f4] rounded-lg">
            <Clock className="w-4 h-4 text-[#8a9988] shrink-0" />
            <span>Por favor acude 5 a 10 minutos antes para degustar la infusión y preparar la sesión con calma.</span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`, '_blank');
              }}
              className="flex-1 py-2.5 bg-[#2d4030] hover:bg-[#202e22] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-[#eae5db] hover:bg-[#ded8cc] text-[#2d4030] rounded-xl font-medium text-xs sm:text-sm transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
