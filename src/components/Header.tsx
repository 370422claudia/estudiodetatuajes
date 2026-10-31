import React from 'react';
import { ChevronLeft, Bell, User, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onBack?: () => void;
  isDesktopFrame: boolean;
  onToggleFrame: () => void;
  activeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  isDesktopFrame,
  onToggleFrame,
  activeCount
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'inicio':
        return { main: 'Botanical Atelier', sub: 'Inicio' };
      case 'solicitar':
        return { main: 'Botanical Atelier', sub: 'Solicitar Cita' };
      case 'detalle':
        return { main: 'Detalle De Cita', sub: 'Botanical Atelier' };
      case 'pasarela':
        return { main: 'Pasarela De Anticipo', sub: 'Botanical Atelier' };
      case 'mis-citas':
        return { main: 'Botanical Atelier', sub: 'Mis Citas Botanical Atelier' };
      case 'contacto':
        return { main: 'Santuario Botánico', sub: 'Contacto & Atelier' };
      default:
        return { main: 'Botanical Atelier', sub: 'Boutique' };
    }
  };

  const { main, sub } = getScreenTitle();
  const showBack = currentScreen === 'detalle' || currentScreen === 'pasarela' || (currentScreen === 'solicitar' && onBack);

  return (
    <header className="sticky top-0 z-30 bg-[#f7f6f2]/95 backdrop-blur-md border-b border-[#e6e2d8] px-4 py-3 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or Logo mark */}
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={onBack || (() => onNavigate('inicio'))}
              className="p-1.5 -ml-1 text-[#2d4030] hover:bg-[#eae6dc] rounded-full transition-colors active:scale-95"
              aria-label="Volver"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('inicio')}
              className="w-8 h-8 rounded-full bg-[#2d4030]/10 border border-[#2d4030]/20 flex items-center justify-center text-[#2d4030] hover:bg-[#2d4030]/15 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
                <path d="M12 2v18" strokeDasharray="2 2" />
                <path d="M12 9c2 1 4 2 5 4" />
                <path d="M12 13c-2 1-4 2-5 4" />
              </svg>
            </button>
          )}

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-[#1c241d] leading-tight">
                {main}
              </span>
              {currentScreen === 'inicio' || currentScreen === 'solicitar' || currentScreen === 'mis-citas' ? (
                <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#2d4030]/10 text-[#2d4030] border border-[#2d4030]/15">
                  Boutique
                </span>
              ) : null}
            </div>
            <span className="text-[11px] text-[#6e786d] font-normal leading-tight">
              {sub}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop/Mobile frame preview toggle */}
          <button
            onClick={onToggleFrame}
            className="hidden md:flex items-center gap-1 text-[11px] font-medium text-[#576356] hover:text-[#1c241d] bg-[#ece8de] hover:bg-[#e2ded3] px-2.5 py-1.5 rounded-full transition-colors"
            title="Alternar entre vista de dispositivo y vista completa"
          >
            {isDesktopFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Vista Web</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Vista Móvil</span>
              </>
            )}
          </button>

          {/* Quick Notification Bell */}
          <button
            onClick={() => onNavigate('mis-citas')}
            className="relative p-2 text-[#465345] hover:text-[#1c241d] hover:bg-[#ece8de] rounded-full transition-colors"
            aria-label="Mis Citas y Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {activeCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d4a359]" />
            )}
          </button>

          {/* User profile avatar */}
          <button
            onClick={() => onNavigate('mis-citas')}
            className="w-8 h-8 rounded-full bg-[#2d4030] text-white flex items-center justify-center text-xs font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all"
            aria-label="Perfil de usuario"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
