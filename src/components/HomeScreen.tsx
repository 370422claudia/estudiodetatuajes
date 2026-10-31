import React, { useState } from 'react';
import { Calendar, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, MapPin, Star, Clock, Check, ChevronRight, Info } from 'lucide-react';
import { ARTISTS, SPECIALTIES } from '../data/initialData';
import { Artist, TattooSpecialty, ScreenId } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectArtist: (artistId: string) => void;
  onOpenDirections: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectArtist,
  onOpenDirections
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<TattooSpecialty | null>(null);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#364939]/30 bg-[#1e2d21] text-white">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/hero_atelier_studio_1793464043441.jpg"
            alt="Botanical Atelier Studio Interior"
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-102 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141f16] via-[#141f16]/60 to-transparent" />

          {/* Agenda open tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#f5f2ea]/90 text-[#2d4030] px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d4030]" />
            <span>Agenda Abierta • Temporada 2026</span>
          </div>
        </div>

        {/* Hero text content */}
        <div className="p-5 sm:p-7 relative -mt-16 sm:-mt-20 z-10 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#d4be95] font-semibold tracking-wider uppercase">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
            </svg>
            <span>Santuario Botánico • Privado</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-white max-w-xl">
            Donde el arte botánico y el tatuaje fino florecen
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg font-light">
            Atelier privado y exclusivo en un entorno sereno y vegetal. Calma consciente, trazos microscópicos y diseño de autor.
          </p>

          {/* Real-time availability strip */}
          <div className="pt-3">
            <div className="bg-[#fcfbf9] text-[#1c241d] p-3.5 rounded-xl border border-[#ded8cb] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#2d4030]/10 flex items-center justify-center text-[#2d4030] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#6d7b6c] uppercase tracking-wider font-semibold">
                    Disponibilidad en tiempo real
                  </div>
                  <div className="text-sm font-semibold text-[#1c241d]">
                    3 cupos restantes para este mes
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('solicitar')}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#2d4030] hover:bg-[#213023] text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <span>Solicitar cita previa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-[#e8e4da] shadow-xs space-y-2 hover:border-[#2d4030]/40 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#2d4030]/10 text-[#2d4030] flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
              <path d="M12 8c2 1 3 2 4 4" />
            </svg>
          </div>
          <h2 className="font-serif text-base font-semibold text-[#1c241d]">Espacio Libre de Estrés</h2>
          <p className="text-xs text-[#5e6b5d] leading-relaxed">
            Luz indirecta, aromaterapia botánica y música envolvente pensada para tu relajación total.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#e8e4da] shadow-xs space-y-2 hover:border-[#2d4030]/40 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#d4a359]/15 text-[#9a7031] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="font-serif text-base font-semibold text-[#1c241d]">Grado Clínico Hospitalario</h2>
          <p className="text-xs text-[#5e6b5d] leading-relaxed">
            Higiene rigurosa con materiales 100% esterilizados, veganos y eco-amigables certificados.
          </p>
        </div>
      </div>

      {/* Guided Experience / 5 Steps */}
      <div className="bg-[#edeae1] p-5 sm:p-6 rounded-2xl border border-[#ded8cc] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#717d70]">Experiencia Guiada</span>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#1c241d]">Tu reserva en 5 sencillos pasos</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[#2d4030]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            { step: '1', title: 'Idea & Dimensiones', desc: 'Detallas la zona anatómica, medidas en cm y adjuntas referencias visuales.' },
            { step: '2', title: 'Presupuesto Transparente', desc: 'Recibes la estimación exacta de tiempo y valor sin costos ocultos.' },
            { step: '3', title: 'Selección de Turno', desc: 'Eliges el día y bloque horario (mañana o tarde) que mejor se adapte a ti.' },
            { step: '4-5', title: 'Anticipo Seguro & Confirmación', desc: 'Aseguras tu fecha con depósito blindado y recibes la guía previa de hidratación cutánea.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-white/60 hover:bg-white transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#2d4030]/15 text-[#2d4030] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#1c241d]">{item.title}</h4>
                <p className="text-[11px] sm:text-xs text-[#596658] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties Section */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#717d70]">Trazos de Autor</span>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#1c241d]">Especialidades del Atelier</h2>
          </div>
          <button
            onClick={() => onNavigate('solicitar')}
            className="text-xs font-medium text-[#2d4030] hover:underline"
          >
            Ver catálogo
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec)}
              className="group bg-white rounded-xl overflow-hidden border border-[#e5e1d5] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="h-32 sm:h-40 w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={spec.image}
                  alt={spec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] rounded font-medium">
                  {spec.needleType}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1c241d] leading-snug">
                    {spec.title}
                  </h3>
                  <p className="text-[11px] text-[#5e6b5d] line-clamp-2 mt-1 leading-snug">
                    {spec.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[10px] text-[#2d4030] font-medium border-t border-[#f0ece3] mt-2">
                  <span>Cicatrización: {spec.healingDays}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resident Artists */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#717d70]">Equipo del Atelier</span>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#1c241d]">Artistas Residentes</h2>
          </div>
          <span className="text-xs text-[#717d70]">3 residentes</span>
        </div>

        <div className="space-y-2.5">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="p-3.5 bg-white rounded-xl border border-[#e6e2d7] shadow-xs flex items-start gap-3 hover:border-[#2d4030]/50 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#2d4030]/10 border border-[#2d4030]/20 text-[#2d4030] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                {artist.avatarText}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1c241d] truncate">
                    {artist.name}
                  </h3>
                  <span className="text-[10px] text-[#637162] bg-[#f2efe6] px-2 py-0.5 rounded-full font-medium shrink-0">
                    {artist.experience}
                  </span>
                </div>
                <p className="text-xs text-[#2d4030] font-medium mt-0.5">
                  {artist.role} • {artist.specialty}
                </p>
                <p className="text-[11px] text-[#637162] mt-1 leading-relaxed line-clamp-2">
                  {artist.description}
                </p>

                <div className="pt-2 mt-2 border-t border-[#f2eee5] flex items-center justify-end">
                  <button
                    onClick={() => {
                      onSelectArtist(artist.id);
                      onNavigate('solicitar');
                    }}
                    className="text-xs text-[#2d4030] hover:text-[#1c241d] font-semibold flex items-center gap-1"
                  >
                    <span>Pedir cita con {artist.name.split(' ')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atelier Commitment Card */}
      <div className="bg-[#2d4030] text-white p-5 sm:p-6 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#d4be95] text-xs uppercase tracking-wider font-semibold">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
          </svg>
          <span>Compromiso Atelier</span>
        </div>

        <h2 className="font-serif text-lg sm:text-xl font-medium leading-tight">
          Tatuajes sin prisas, en paz absoluta
        </h2>

        <p className="text-xs text-white/80 leading-relaxed font-light">
          Sesiones individuales a puerta cerrada. Nunca compartes tu momento con otros clientes: el espacio es 100% tuyo durante tu cita.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-200">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tintas veganas</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-200">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Agujas suizas de precisión</span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#717d70]">Testimonios</span>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#1c241d]">Experiencias en el Atelier</h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#1c241d]">
            <Star className="w-3.5 h-3.5 fill-[#d4a359] text-[#d4a359]" />
            <span>5.0 (120+ reseñas)</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            {
              initials: 'CM',
              name: 'Clara Morales',
              tattoo: 'Rama de Olivo • Fine Line',
              text: 'El estudio transmite tanta serenidad que apenas sentí la aguja. Las plantas, la música suave y la meticulosidad de cada trazo hicieron de mi primer tatuaje un ritual hermoso.'
            },
            {
              initials: 'AR',
              name: 'Alejandro Rivas',
              tattoo: 'Micro-realismo Botánico',
              text: 'Proceso de reserva impecable. La cotización fue clarísima desde el primer día y el estudio supera cualquier estándar de higiene que haya visto antes.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-[#e6e2d7] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f4f1ea] text-[#2d4030] font-semibold text-xs flex items-center justify-center">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#1c241d]">{item.name}</h4>
                    <p className="text-[10px] text-[#717d70]">{item.tattoo}</p>
                  </div>
                </div>
                <div className="flex text-[#d4a359]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#525f51] italic leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Private Location Section */}
      <div className="p-4 bg-white rounded-xl border border-[#e5e1d5] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#2d4030] font-semibold text-sm">
          <MapPin className="w-4 h-4 text-[#2d4030]" />
          <span>Ubicación Privada</span>
        </div>

        <p className="text-xs text-[#5a6859] leading-relaxed">
          Barrio de Gràcia, Barcelona (Carrer de Verdi / Metro Fontana L3 y Diagonal). Dirección exacta revelada tras la confirmación de la reserva para preservar la intimidad y exclusividad del espacio.
        </p>

        {/* Map placeholder with photo preview */}
        <div
          onClick={onOpenDirections}
          className="relative h-32 rounded-lg overflow-hidden bg-stone-200 cursor-pointer border border-[#ded8cc] group"
        >
          <img
            src="/src/assets/images/hero_atelier_studio_1793464043441.jpg"
            alt="Ubicación Atelier"
            className="w-full h-full object-cover filter blur-[2px] brightness-75 group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
            <div className="w-9 h-9 rounded-full bg-[#2d4030]/80 backdrop-blur-xs flex items-center justify-center mb-1 shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold drop-shadow">Ver mapa privado e instrucciones</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#637162] pt-1">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Mar - Sáb: 10:30 - 19:30</span>
          </div>
          <button
            onClick={onOpenDirections}
            className="text-[#2d4030] hover:underline font-medium"
          >
            Cómo llegar ↗
          </button>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-4 sm:p-5 bg-[#edeae1] rounded-2xl border border-[#ded8cb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1c241d]">
            ¿Tienes una idea en mente?
          </h3>
          <p className="text-xs text-[#596658]">
            Te asesoramos con el boceto inicial y dimensiones recomendadas.
          </p>
        </div>
        <button
          onClick={() => onNavigate('solicitar')}
          className="px-4 py-2.5 bg-[#d4a359] hover:bg-[#c59448] text-[#1c241d] font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs shrink-0"
        >
          Iniciar Solicitud
        </button>
      </div>

      {/* Specialty Lightbox Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="h-56 relative">
              <img
                src={selectedSpecialty.image}
                alt={selectedSpecialty.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#1c241d]">{selectedSpecialty.title}</h3>
              <p className="text-xs text-[#5c695b] leading-relaxed">{selectedSpecialty.description}</p>
              <div className="p-2.5 bg-[#f7f5ef] rounded-lg text-xs space-y-1">
                <div><strong>Calibre de aguja:</strong> {selectedSpecialty.needleType}</div>
                <div><strong>Tiempo de cicatrización:</strong> {selectedSpecialty.healingDays}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedSpecialty(null);
                  onNavigate('solicitar');
                }}
                className="w-full py-2 bg-[#2d4030] text-white rounded-xl text-xs font-semibold"
              >
                Solicitar pieza en este estilo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
