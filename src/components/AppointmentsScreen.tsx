import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, MapPin, Plus, ExternalLink, CalendarPlus, Receipt, Sparkles, AlertCircle } from 'lucide-react';
import { ActiveAppointmentRequest, ConfirmedAppointment, ScreenId } from '../types';

interface AppointmentsScreenProps {
  requests: ActiveAppointmentRequest[];
  confirmedList: ConfirmedAppointment[];
  onNavigate: (screen: ScreenId) => void;
  onOpenChat: (artistName: string, avatar: string, project: string) => void;
  onOpenCareGuide: () => void;
  onOpenDirections: () => void;
  onOpenReceipt: (appointment: ConfirmedAppointment) => void;
  onAddReferenceToRequest: (requestId: string) => void;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  requests,
  confirmedList,
  onNavigate,
  onOpenChat,
  onOpenCareGuide,
  onOpenDirections,
  onOpenReceipt,
  onAddReferenceToRequest
}) => {
  const [activeTab, setActiveTab] = useState<'activas' | 'historial'>('activas');
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(true);
  const [activeMoodboardIdx, setActiveMoodboardIdx] = useState<number | null>(null);

  const activeCount = requests.length + confirmedList.length;

  const handleDownloadCalendar = (appointment: ConfirmedAppointment) => {
    // Generate .ics calendar file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Botanical Atelier//Cita Tatuaje//ES
BEGIN:VEVENT
SUMMARY:Cita Tatuaje Botánico - ${appointment.project} (${appointment.artistName})
DESCRIPTION:Sesión en Botanical Atelier (${appointment.cabin} • ${appointment.room}). Instrucciones y guía de hidratación activa.
LOCATION:${appointment.studioAddress}
DTSTART:20261112T100000Z
DTEND:20261112T123000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Botanical_Atelier_${appointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Header section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-[#1c241d] tracking-tight">
            Mis Citas & Solicitudes
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f4ebd9] rounded-full text-[11px] font-semibold text-[#8b6528]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]" />
            <span>1 en curso • {confirmedList.length} confirmada</span>
          </div>
        </div>
        <p className="text-xs text-[#5e6b5d] leading-relaxed">
          Santuario botánico y seguimiento artesanal de tus proyectos
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 bg-[#edeae1] rounded-xl border border-[#ded8cc]">
        <button
          onClick={() => setActiveTab('activas')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'activas'
              ? 'bg-white text-[#1c241d] shadow-2xs'
              : 'text-[#6e7b6d] hover:text-[#1c241d]'
          }`}
        >
          Activas ({activeCount})
        </button>
        <button
          onClick={() => setActiveTab('historial')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'historial'
              ? 'bg-white text-[#1c241d] shadow-2xs'
              : 'text-[#6e7b6d] hover:text-[#1c241d]'
          }`}
        >
          Historial (1)
        </button>
      </div>

      {activeTab === 'activas' ? (
        <div className="space-y-5">
          {/* Active Requests */}
          {requests.map(req => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-[#e5e1d5] shadow-xs overflow-hidden space-y-3.5 p-4 sm:p-5"
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#738272]">
                    Solicitud en Curso
                  </span>
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#1c241d] mt-0.5 leading-snug">
                    {req.title}
                  </h2>
                  <p className="text-[11px] text-[#717d70] mt-0.5">
                    {req.code} • Enviada el {req.sentDate}
                  </p>
                </div>

                <span className="text-[10px] font-semibold text-[#2d4030] bg-[#eef3ee] px-2.5 py-1 rounded-full border border-[#d2dfd2] flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d4030]" />
                  <span>En revisión</span>
                </span>
              </div>

              {/* Artist row */}
              <div className="p-3 bg-[#faf8f4] rounded-xl border border-[#ede7dc] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d4030] text-white flex items-center justify-center font-serif text-xs font-bold">
                    {req.artist.avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-[#1c241d]">{req.artist.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <span className="text-[11px] text-[#637162]">{req.artist.role} • {req.artist.specialty}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenChat(req.artist.name, req.artist.avatarText, req.title)}
                  className="p-2 text-[#2d4030] hover:bg-[#eef3ee] rounded-full border border-[#ded8cb] transition-colors"
                  aria-label="Mensaje a la artista"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              {/* Current Stage Box */}
              <div className="p-3.5 bg-[#fbf9f4] rounded-xl border border-[#ded8cb] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2d4030]">
                  <span className="w-2 h-2 rounded-full bg-[#2d4030]" />
                  <span>Etapa actual: {req.currentStage}</span>
                </div>
                <p className="text-xs text-[#526051] leading-relaxed">
                  {req.stageNote}
                </p>

                {req.status === 'propuesta_lista' && (
                  <div className="pt-2 mt-2 border-t border-[#eee8dc] flex items-center justify-between">
                    <span className="text-[11px] text-[#2d4030] font-medium">Propuesta y fechas listas</span>
                    <button
                      onClick={() => onNavigate('detalle')}
                      className="px-3 py-1.5 bg-[#2d4030] hover:bg-[#202e22] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Ver propuesta & calendario</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Stepper / Timeline: Progreso de la Cita */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#738272]">
                    Progreso de la cita
                  </span>
                  <span className="text-xs font-semibold text-[#2d4030]">Paso 2 de 5</span>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-[#d5ded5] relative">
                  {/* Step 1 */}
                  <div className="relative pl-4">
                    <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#2d4030] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <div className="text-xs font-semibold text-[#1c241d]">1. Solicitud enviada</div>
                    <p className="text-[11px] text-[#6d796c]">Detalles, medidas y referencias recibidos con éxito.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-4">
                    <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#d4a359] text-[#1c241d] font-bold flex items-center justify-center text-[10px] animate-pulse">
                      2
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1c241d]">2. Revisión de Artista & Presupuesto</span>
                      <span className="text-[9px] uppercase font-bold bg-[#f6ebd6] text-[#93661b] px-1.5 py-0.5 rounded">Activo</span>
                    </div>
                    <p className="text-[11px] text-[#6d796c]">Calibración de tiempo de aguja y trazo.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-4 opacity-60">
                    <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#e8e4da] text-[#788577] font-semibold flex items-center justify-center text-[10px]">
                      3
                    </div>
                    <div className="text-xs font-medium text-[#1c241d]">3. Aprobación & Selección de Fecha</div>
                    <p className="text-[11px] text-[#788577]">Elegirás franja horaria matutina o vespertina.</p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative pl-4 opacity-60">
                    <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#e8e4da] text-[#788577] font-semibold flex items-center justify-center text-[10px]">
                      4
                    </div>
                    <div className="text-xs font-medium text-[#1c241d]">4. Depósito de Bloqueo</div>
                    <p className="text-[11px] text-[#788577]">Garantía de esterilización y reserva de cabina.</p>
                  </div>

                  {/* Step 5 */}
                  <div className="relative pl-4 opacity-60">
                    <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#e8e4da] text-[#788577] font-semibold flex items-center justify-center text-[10px]">
                      5
                    </div>
                    <div className="text-xs font-medium text-[#1c241d]">5. Cita Confirmada & Guía Botánica</div>
                    <p className="text-[11px] text-[#788577]">Cuidado dérmico previo e instrucciones de acceso.</p>
                  </div>
                </div>
              </div>

              {/* Especificaciones de tu Proyecto (Accordion) */}
              <div className="pt-2 border-t border-[#f0ece3]">
                <button
                  type="button"
                  onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#1c241d] py-1"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#2d4030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                    <span>Especificaciones de tu Proyecto</span>
                  </div>
                  {isSpecsOpen ? <ChevronUp className="w-4 h-4 text-[#788577]" /> : <ChevronDown className="w-4 h-4 text-[#788577]" />}
                </button>

                {isSpecsOpen && (
                  <div className="pt-3 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 p-3 bg-[#fbf9f4] rounded-xl border border-[#ede7dc]">
                      <div>
                        <span className="text-[10px] text-[#788577]">Zona Anatómica</span>
                        <div className="font-semibold text-[#1c241d] mt-0.5">{req.bodyZone}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#788577]">Escala estimada</span>
                        <div className="font-semibold text-[#1c241d] mt-0.5">{req.scaleEstimate}</div>
                      </div>
                    </div>

                    {/* Referencias adjuntadas */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#647263]">Referencias adjuntadas ({req.references.length})</span>
                        <span className="text-[#2d4030] font-medium cursor-pointer hover:underline">Ver moodboard</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {req.references.map((refImg, i) => (
                          <div
                            key={i}
                            onClick={() => setActiveMoodboardIdx(i)}
                            className="h-20 rounded-xl overflow-hidden border border-[#ded8cb] cursor-pointer group relative bg-stone-100"
                          >
                            <img
                              src={refImg}
                              alt="Referencia"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              🔍
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Buttons: Añadir referencias & Mensaje */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onAddReferenceToRequest(req.id)}
                        className="py-2.5 px-3 bg-[#f2efe6] hover:bg-[#e6e1d5] text-[#2d4030] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir referencias</span>
                      </button>

                      <button
                        onClick={() => onOpenChat(req.artist.name, req.artist.avatarText, req.title)}
                        className="py-2.5 px-3 bg-[#2d4030] hover:bg-[#202e22] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Mensaje al Atelier</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Confirmed Appointments Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1c241d]">
                Cita Confirmada Próxima
              </h2>
              <span className="text-xs text-[#2d4030] font-medium">Turno reservado</span>
            </div>

            {confirmedList.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#e5e1d5] shadow-xs overflow-hidden space-y-4"
              >
                {/* Cabin Photo Banner */}
                <div className="relative h-44 w-full bg-stone-900">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top countdown badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>Faltan {item.daysRemaining} días</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="font-semibold text-sm">
                      {item.cabin} • {item.room}
                    </div>
                    <div className="text-stone-300 text-xs">
                      Proyecto: {item.project}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-4 pt-0">
                  {/* Date & Time block */}
                  <div className="p-3.5 bg-[#fbf9f4] rounded-xl border border-[#ded8cb] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#ded8cb] flex flex-col items-center justify-center text-center shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-[#717d70]">{item.monthShort}</span>
                        <span className="text-lg font-serif font-bold text-[#2d4030] leading-none">{item.dayNumber}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1c241d]">{item.dateStr}</div>
                        <div className="text-[11px] text-[#5e6b5d]">{item.timeSlot} • Sesión estimada ({item.duration})</div>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Location block */}
                  <div className="flex items-start gap-2.5 text-xs text-[#3b473a] px-1">
                    <MapPin className="w-4 h-4 text-[#2d4030] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c241d] block">{item.studioName}</strong>
                      <span className="text-[#647163]">{item.studioAddress}</span>
                    </div>
                  </div>

                  {/* 2 Quick action tiles: Hidratación & Cómo llegar */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={onOpenCareGuide}
                      className="p-3 bg-[#f4f1ea] hover:bg-[#eae5db] rounded-xl border border-[#ded8cb] text-left transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2d4030]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
                        </svg>
                        <span>Hidratación</span>
                      </div>
                      <span className="text-[10px] text-[#6d7b6c] mt-1">Guía 48h antes de sesión</span>
                    </button>

                    <button
                      onClick={onOpenDirections}
                      className="p-3 bg-[#f4f1ea] hover:bg-[#eae5db] rounded-xl border border-[#ded8cb] text-left transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2d4030]">
                        <MapPin className="w-4 h-4" />
                        <span>Cómo llegar</span>
                      </div>
                      <span className="text-[10px] text-[#6d7b6c] mt-1">{item.metroInfo}</span>
                    </button>
                  </div>

                  {/* Actions: Añadir a Calendario & Ver Recibo */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleDownloadCalendar(item)}
                      className="flex-1 py-2.5 bg-[#eae5db] hover:bg-[#ded8cc] text-[#2d4030] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>Añadir a Calendario</span>
                    </button>

                    <button
                      onClick={() => onOpenReceipt(item)}
                      className="px-3.5 py-2.5 bg-[#eae5db] hover:bg-[#ded8cc] text-[#2d4030] rounded-xl transition-colors"
                      title="Ver Comprobante de Reserva"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vegan & Sterile Guarantee Footer Card */}
          <div className="p-4 bg-[#eef3ee] rounded-2xl border border-[#d2dfd2] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d4030]/15 text-[#2d4030] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#3b4c3a] leading-relaxed">
              <strong className="text-[#1c241d] block">Compromiso 100% Vegano & Estéril</strong>
              <span>
                Tintas minerales orgánicas libres de crueldad y atmósfera purificada con plantas vivas.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Historial Tab */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e5e1d5] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#717d70]">Sesión Finalizada</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">Completado & Curado</span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#ded8cb] bg-stone-100 shrink-0">
                <img
                  src="/src/assets/images/tattoo_fineline_organic_1793464044346.jpg"
                  alt="Helecho Silvestre"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1c241d]">Helecho Silvestre & Micro-Ramificación</h3>
                <p className="text-xs text-[#5e6b5d]">Sesión realizada el 15 Mayo 2026 • Marc Soler</p>
                <p className="text-[11px] text-[#788577] mt-1">Calibre 1RL • Zona Antebrazo • Pigmento orgánico vegetal</p>
              </div>
            </div>

            <div className="p-3 bg-[#faf8f4] rounded-xl border border-[#ede7dc] flex items-center justify-between text-xs">
              <span className="text-[#647163]">Revisión gratuita anual de trazo</span>
              <button
                onClick={() => onOpenChat('Marc Soler', 'MS', 'Revisión Anual Helecho')}
                className="text-[#2d4030] font-semibold hover:underline"
              >
                Solicitar retoque
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Moodboard preview modal */}
      {activeMoodboardIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[#1c241d]">Referencia del proyecto</span>
              <button onClick={() => setActiveMoodboardIdx(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>
            <div className="h-64 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={requests[0]?.references[activeMoodboardIdx]}
                alt="Referencia ampliada"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#596658]">Diseño botánico aprobado como guía de trazo y densidad.</p>
          </div>
        </div>
      )}
    </div>
  );
};
