import React, { useState } from 'react';
import { Lock, ShieldCheck, Check, Calendar, CreditCard, Smartphone, CheckCircle, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConfirmedAppointment, ScreenId } from '../types';

interface PaymentScreenProps {
  selectedDate?: string;
  selectedSlot?: string;
  artistName?: string;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess: (confirmed: ConfirmedAppointment) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  selectedDate = 'Jueves, 12 de Noviembre',
  selectedSlot = '11:00 AM',
  artistName = 'Elena Vega',
  onNavigate,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'apple_pay' | 'card' | 'bizum'>('apple_pay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('849');
  const [bizumPhone, setBizumPhone] = useState('654 987 321');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDepositInfo, setShowDepositInfo] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger joyful celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2d4030', '#d4a359', '#7e9a82', '#f4f1ea']
        });
      } catch (err) {
        // Fallback gracefully
      }

      const newConfirmed: ConfirmedAppointment = {
        id: `conf-${Date.now()}`,
        title: 'Pieza Botánica Fine-Line',
        cabin: 'Cabina 01',
        room: 'Sala Verde',
        project: 'Rama de Olivo & Flora Silvestre',
        daysRemaining: 12,
        dateStr: selectedDate,
        monthShort: 'NOV',
        dayNumber: 12,
        timeSlot: selectedSlot,
        duration: '2.5h',
        studioName: 'Botanical Atelier Studio',
        studioAddress: 'Barrio de Gràcia, Barcelona (Carrer de Verdi)',
        metroInfo: 'Metro Fontana (L3) y Diagonal',
        coverImage: '/src/assets/images/hero_atelier_studio_1793464043441.jpg',
        artistName: artistName,
        depositPaid: 50,
        remainingDue: 130
      };

      onPaymentSuccess(newConfirmed);
      onNavigate('mis-citas');
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Step Badge */}
      <div className="p-3.5 bg-white rounded-2xl border border-[#e5e1d5] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#2d4030]/10 text-[#2d4030] flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1c241d]">Paso 3 de 3</div>
            <div className="text-xs text-[#5f6d5e]">Depósito y Reserva en Firme</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#2d4030] bg-[#eef3ee] px-2.5 py-1 rounded-full border border-[#d2dfd2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2d4030]" />
          <span>Enlace activo</span>
        </div>
      </div>

      {/* Sesión Reservada Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#788577]">
              Sesión Reservada
            </span>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#1c241d] mt-0.5">
              Pieza Botánica Fine-Line
            </h1>
          </div>
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#ded8cb] shrink-0 bg-stone-100">
            <img
              src="/src/assets/images/botanical_sketch_olive_1793464043861.jpg"
              alt="Boceto"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-2.5 text-xs text-[#2c362b] p-3 bg-[#fbf9f5] rounded-xl border border-[#ece7dc]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#2d4030] shrink-0" />
            <span className="font-medium">{selectedDate} • {selectedSlot}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#2d4030] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            </svg>
            <span>Artista: <strong>{artistName}</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#2d4030] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
            </svg>
            <span>Botanical Atelier Studio (Cabina 01 • Sala Verde)</span>
          </div>
        </div>

        {/* Total & Deposit Numbers */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[11px] text-[#788577]">Estimación total de la pieza</span>
            <div className="text-base sm:text-lg font-serif font-bold text-[#1c241d] mt-0.5">
              180,00 € – 220,00 €
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-[11px] text-[#788577]">
              <span>Anticipo de confirmación</span>
              <button
                type="button"
                onClick={() => setShowDepositInfo(!showDepositInfo)}
                className="text-[#647263] hover:text-[#1c241d]"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-lg sm:text-xl font-serif font-bold text-[#2d4030] mt-0.5">
              50,00 €
            </div>
          </div>
        </div>

        {showDepositInfo && (
          <div className="p-3 bg-stone-100 rounded-xl text-xs text-[#525f51] leading-relaxed">
            El depósito se deduce íntegramente del precio total final tras completar el tatuaje el día de la cita.
          </div>
        )}

        {/* Deposit purpose note */}
        <div className="p-3 bg-[#eef3ee] rounded-xl border border-[#d2dfd2] flex items-start gap-2.5 text-xs text-[#3b4c3a] leading-relaxed">
          <svg className="w-4 h-4 text-[#2d4030] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
          </svg>
          <span>
            Este depósito asegura los materiales esterilizados y el diseño exclusivo. Se descuenta del total al finalizar la sesión.
          </span>
        </div>
      </div>

      {/* Atmosphere Preview Banner */}
      <div className="rounded-2xl overflow-hidden border border-[#ded8cb] bg-white shadow-xs">
        <div className="relative h-36 w-full">
          <img
            src="/src/assets/images/hero_atelier_studio_1793464043441.jpg"
            alt="Espacio seguro y esterilizado"
            className="w-full h-full object-cover filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs font-medium">
            <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
              💡
            </div>
            <span>Espacio seguro, esterilizado y relajante</span>
          </div>
        </div>

        <div className="p-3 flex items-center justify-between text-xs text-[#546253]">
          <div>
            <span>Tiempo estimado de sesión: <strong>2h 30m</strong></span>
          </div>
          <span className="px-2 py-0.5 bg-[#eef3ee] text-[#2d4030] font-medium rounded-full text-[11px]">
            Cabina Climatizada
          </span>
        </div>
      </div>

      {/* Selecciona Método de Pago */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3.5">
        <div>
          <h2 className="font-serif text-base font-semibold text-[#1c241d]">
            Selecciona Método de Pago
          </h2>
          <p className="text-[11px] text-[#717e70]">
            Transacción encriptada directa con el estudio.
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Apple Pay / Google Pay */}
          <label
            onClick={() => setSelectedMethod('apple_pay')}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedMethod === 'apple_pay'
                ? 'border-[#2d4030] bg-[#eef3ee] ring-1 ring-[#2d4030]'
                : 'border-[#ded8cc] hover:bg-[#faf9f5]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedMethod === 'apple_pay' ? 'border-[#2d4030]' : 'border-stone-400'
              }`}>
                {selectedMethod === 'apple_pay' && <div className="w-2 h-2 rounded-full bg-[#2d4030]" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1c241d]">Apple Pay / Google Pay</p>
                <p className="text-[10px] text-[#637162]">Pago instantáneo en 1 toque</p>
              </div>
            </div>
            <Smartphone className="w-5 h-5 text-[#2d4030]" />
          </label>

          {/* Tarjeta Bancaria */}
          <label
            onClick={() => setSelectedMethod('card')}
            className={`p-3.5 rounded-xl border flex flex-col cursor-pointer transition-all ${
              selectedMethod === 'card'
                ? 'border-[#2d4030] bg-[#eef3ee] ring-1 ring-[#2d4030]'
                : 'border-[#ded8cc] hover:bg-[#faf9f5]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'card' ? 'border-[#2d4030]' : 'border-stone-400'
                }`}>
                  {selectedMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#2d4030]" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1c241d]">Tarjeta Bancaria</p>
                  <p className="text-[10px] text-[#637162]">Visa, Mastercard, Amex</p>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-[#2d4030]" />
            </div>

            {selectedMethod === 'card' && (
              <div className="mt-3 pt-3 border-t border-[#d8e4d8] space-y-2 text-xs">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="Número de tarjeta"
                  className="w-full p-2 bg-white rounded-lg border border-[#cfd9ce] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#2d4030]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM/AA"
                    className="p-2 bg-white rounded-lg border border-[#cfd9ce] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#2d4030]"
                  />
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    placeholder="CVC"
                    className="p-2 bg-white rounded-lg border border-[#cfd9ce] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#2d4030]"
                  />
                </div>
              </div>
            )}
          </label>

          {/* Bizum */}
          <label
            onClick={() => setSelectedMethod('bizum')}
            className={`p-3.5 rounded-xl border flex flex-col cursor-pointer transition-all ${
              selectedMethod === 'bizum'
                ? 'border-[#2d4030] bg-[#eef3ee] ring-1 ring-[#2d4030]'
                : 'border-[#ded8cc] hover:bg-[#faf9f5]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'bizum' ? 'border-[#2d4030]' : 'border-stone-400'
                }`}>
                  {selectedMethod === 'bizum' && <div className="w-2 h-2 rounded-full bg-[#2d4030]" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1c241d]">Bizum / Transferencia Rápida</p>
                  <p className="text-[10px] text-[#637162]">Confirmación automática por SMS</p>
                </div>
              </div>
              <span className="font-bold text-xs text-[#00a896] bg-teal-50 px-2 py-0.5 rounded">
                Bizum
              </span>
            </div>

            {selectedMethod === 'bizum' && (
              <div className="mt-3 pt-3 border-t border-[#d8e4d8] text-xs space-y-1">
                <label className="text-[10px] text-[#556353]">Número de teléfono Bizum:</label>
                <input
                  type="text"
                  value={bizumPhone}
                  onChange={e => setBizumPhone(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-[#cfd9ce] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#2d4030]"
                />
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Primary Pay Action */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#2d4030] hover:bg-[#202e22] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-60"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Conectando con pasarela segura...</span>
            </div>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Abonar Depósito de 50,00 €</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-[#717e70] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2d4030]" />
          <span>Cancelación gratuita hasta 48h antes</span>
        </p>
      </div>
    </div>
  );
};
