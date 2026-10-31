import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ChevronDown, ChevronUp, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface ContactScreenProps {
  onOpenDirections: () => void;
  onOpenChat: (artistName: string, avatar: string, project: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  onOpenDirections,
  onOpenChat
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [directMsg, setDirectMsg] = useState('');
  const [sentToast, setSentToast] = useState(false);

  const faqs = [
    {
      q: '¿Cómo funciona la cita previa y el diseño del boceto?',
      a: 'Cada proyecto es personalizado. Una vez enviada tu solicitud, la artista residente dibuja una propuesta adaptada a tu anatomía y escala. Tras aprobar el diseño y elegir tu turno, el depósito del 30% bloquea la cabina en exclusiva.'
    },
    {
      q: '¿Por qué nuestras tintas y materiales son 100% veganos?',
      a: 'Utilizamos pigmentos minerales y carbónicos de alta pureza libres de subproductos animales o metales pesados. Nuestras agujas de fabricación suiza garantizan micro-traumatismo mínimo en la piel.'
    },
    {
      q: '¿Qué cuidados requiere un tatuaje Fine-Line orgánico?',
      a: 'Al salir de la cabina te entregamos un parche dermoprotector permeable que llevarás 48h. A partir del tercer día, hidratarás con nuestra emulsión botánica durante 10 días para preservar la delicadeza de la aguja 1RL.'
    },
    {
      q: '¿Puedo solicitar cambios en el boceto antes de la sesión?',
      a: 'Por supuesto. Tienes hasta 2 revisiones detalladas incluidas en el proceso antes de la cita, directamente por el chat privado con tu artista asignada.'
    }
  ];

  const handleSendDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMsg.trim()) return;
    setSentToast(true);
    setDirectMsg('');
    setTimeout(() => setSentToast(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#2d4030] text-white p-5 rounded-2xl space-y-2 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs text-[#d4be95] font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Atención Intimista & Reservas</span>
        </div>
        <h1 className="font-serif text-2xl font-bold leading-tight">
          Contacto & Santuario
        </h1>
        <p className="text-xs text-stone-300 leading-relaxed font-light">
          Para garantizar la máxima concentración y calma en cabina, las visitas son exclusivamente con cita previa confirmada.
        </p>
      </div>

      {/* Locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-[#e5e1d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2d4030] bg-[#eef3ee] px-2 py-0.5 rounded">
              Sede Barcelona
            </span>
            <span className="text-[10px] text-[#788577]">Gràcia</span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#1c241d]">Atelier Verdi</h3>
          <p className="text-xs text-[#5e6b5d] leading-relaxed">
            Carrer de Verdi / Metro Fontana (L3) y Diagonal.
          </p>
          <div className="text-[11px] text-[#2d4030] pt-1">
            Mar - Sáb: 10:30 - 19:30
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#e5e1d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2d4030] bg-[#eef3ee] px-2 py-0.5 rounded">
              Sede Madrid
            </span>
            <span className="text-[10px] text-[#788577]">Las Letras</span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#1c241d]">Atelier San Agustín</h3>
          <p className="text-xs text-[#5e6b5d] leading-relaxed">
            Calle del León 14 / Metro Antón Martín (L1).
          </p>
          <div className="text-[11px] text-[#2d4030] pt-1">
            Mar - Sáb: 10:30 - 19:30
          </div>
        </div>
      </div>

      {/* Direct Contact Form */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
        <h2 className="font-serif text-base font-bold text-[#1c241d]">
          Mensaje Directo al Equipo del Atelier
        </h2>
        <p className="text-xs text-[#5e6b5d]">
          ¿Dudas sobre curación, fechas especiales o bocetos botánicos? Escríbenos directamente:
        </p>

        {sentToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mensaje enviado con éxito. Te responderemos en menos de 24 horas.</span>
          </div>
        )}

        <form onSubmit={handleSendDirect} className="space-y-2.5">
          <textarea
            value={directMsg}
            onChange={e => setDirectMsg(e.target.value)}
            rows={3}
            placeholder="Escribe tu consulta aquí..."
            className="w-full p-3 rounded-xl border border-[#d8d2c4] bg-[#faf8f4] text-xs sm:text-sm text-[#1c241d] focus:outline-none focus:ring-1 focus:ring-[#2d4030] resize-none"
          />
          <button
            type="submit"
            disabled={!directMsg.trim()}
            className="w-full py-2.5 bg-[#2d4030] hover:bg-[#202e22] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Enviar consulta</span>
          </button>
        </form>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
        <h2 className="font-serif text-base font-bold text-[#1c241d]">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-[#ded8cb] rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3 text-left font-medium text-xs sm:text-sm text-[#1c241d] flex items-center justify-between gap-2 hover:bg-[#faf9f5]"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#788577] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#788577] shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="p-3 pt-0 text-xs text-[#526051] leading-relaxed bg-[#faf8f4] border-t border-[#eee8dc]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
