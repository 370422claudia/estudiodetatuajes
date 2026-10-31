import React from 'react';
import { Sparkles, Calendar, CalendarCheck, MessageSquare, Flower2 } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  activeCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  activeCount
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#f7f6f2]/95 backdrop-blur-md border-t border-[#e2ddd0] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            currentScreen === 'inicio'
              ? 'text-[#2d4030] font-semibold'
              : 'text-[#7e8a7d] hover:text-[#2d4030]'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform ${currentScreen === 'inicio' ? 'scale-110' : ''}`}
              viewBox="0 0 24 24"
              fill={currentScreen === 'inicio' ? '#2d4030' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
              <path d="M12 2v18" strokeDasharray="2 2" stroke={currentScreen === 'inicio' ? '#f7f6f2' : 'currentColor'} />
            </svg>
          </div>
          <span className="text-[11px] tracking-tight">Inicio</span>
        </button>

        {/* Solicitar Cita */}
        <button
          onClick={() => onNavigate('solicitar')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            currentScreen === 'solicitar'
              ? 'text-[#2d4030] font-semibold'
              : 'text-[#7e8a7d] hover:text-[#2d4030]'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform ${currentScreen === 'solicitar' ? 'scale-110' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M12 14v4" />
              <path d="M10 16h4" />
            </svg>
          </div>
          <span className="text-[11px] tracking-tight">Solicitar Cita</span>
        </button>

        {/* Mis Citas */}
        <button
          onClick={() => onNavigate('mis-citas')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            currentScreen === 'mis-citas' || currentScreen === 'detalle' || currentScreen === 'pasarela'
              ? 'text-[#2d4030] font-semibold'
              : 'text-[#7e8a7d] hover:text-[#2d4030]'
          }`}
        >
          <div className="relative">
            <CalendarCheck className={`w-5 h-5 transition-transform ${currentScreen === 'mis-citas' ? 'scale-110' : ''}`} />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#2d4030] text-white text-[9px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight">Mis Citas</span>
        </button>

        {/* Contacto */}
        <button
          onClick={() => onNavigate('contacto')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            currentScreen === 'contacto'
              ? 'text-[#2d4030] font-semibold'
              : 'text-[#7e8a7d] hover:text-[#2d4030]'
          }`}
        >
          <Flower2 className={`w-5 h-5 transition-transform ${currentScreen === 'contacto' ? 'scale-110' : ''}`} />
          <span className="text-[11px] tracking-tight">Contacto</span>
        </button>
      </div>
    </nav>
  );
};
