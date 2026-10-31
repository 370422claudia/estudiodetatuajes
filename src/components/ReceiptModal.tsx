import React from 'react';
import { X, CheckCircle, Download, Printer, ShieldCheck, QrCode } from 'lucide-react';
import { ConfirmedAppointment } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: ConfirmedAppointment;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  appointment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fcfbf9] border border-[#dcd7cb] rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Receipt Header */}
        <div className="p-5 border-b border-[#e6e1d5] flex items-center justify-between bg-[#2d4030] text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-tight">Comprobante de Reserva</h3>
              <p className="text-xs text-white/70">Depósito Blindado Oficial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper receipt styling */}
        <div className="p-6 space-y-5 bg-[#faf8f4] text-xs sm:text-sm text-[#222]">
          <div className="text-center pb-2 border-b border-dashed border-[#dcd6c8]">
            <p className="font-serif text-xl font-bold tracking-tight text-[#2d4030]">Botanical Atelier</p>
            <p className="text-[11px] uppercase tracking-wider text-[#738072] mt-0.5">Santuario Privado & Tatuaje Fino</p>
            <p className="text-[10px] text-[#939f92] mt-1 font-mono">RECIBO #{appointment.id.toUpperCase()}-2026</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-[#eeeae0]">
              <span className="text-[#657364]">Proyecto:</span>
              <span className="font-medium text-[#1c241d]">{appointment.project}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eeeae0]">
              <span className="text-[#657364]">Artista Asignada:</span>
              <span className="font-medium text-[#1c241d]">{appointment.artistName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eeeae0]">
              <span className="text-[#657364]">Fecha y Turno:</span>
              <span className="font-medium text-[#1c241d]">{appointment.dateStr} • {appointment.timeSlot}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eeeae0]">
              <span className="text-[#657364]">Cabina:</span>
              <span className="font-medium text-[#1c241d]">{appointment.cabin} • {appointment.room}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eeeae0]">
              <span className="text-[#657364]">Ubicación:</span>
              <span className="font-medium text-[#1c241d] text-right max-w-[200px] truncate">{appointment.studioAddress}</span>
            </div>
          </div>

          {/* Money balance */}
          <div className="p-3.5 bg-white rounded-xl border border-[#ded8cb] space-y-1.5">
            <div className="flex justify-between font-semibold text-sm text-[#2d4030]">
              <span>Anticipo Abonado:</span>
              <span>{appointment.depositPaid},00 €</span>
            </div>
            <div className="flex justify-between text-xs text-[#6e7d6d]">
              <span>Saldo a liquidar tras la sesión:</span>
              <span>~{appointment.remainingDue},00 €</span>
            </div>
            <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantía de esterilización de cabina y materiales incluida.</span>
            </div>
          </div>

          {/* QR code representation */}
          <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-[#ded8cb]">
            <div className="text-center space-y-1">
              <div className="w-24 h-24 mx-auto bg-stone-100 rounded-lg p-2 border border-stone-200 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-stone-900 rounded">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${i % 3 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-[#738272] uppercase tracking-wider font-mono">Presentar código al acceder</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-[#2d4030] text-white hover:bg-[#202e22] rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-[#eae5db] text-[#2d4030] hover:bg-[#ded8cc] rounded-xl font-medium text-xs sm:text-sm transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
