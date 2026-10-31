import React, { useState, useEffect } from 'react';
import { ScreenId, ActiveAppointmentRequest, ConfirmedAppointment } from './types';
import { INITIAL_REQUESTS, INITIAL_CONFIRMED } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { RequestScreen } from './components/RequestScreen';
import { ProposalScreen } from './components/ProposalScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { ContactScreen } from './components/ContactScreen';
import { ChatModal } from './components/ChatModal';
import { CareGuideModal } from './components/CareGuideModal';
import { DirectionsModal } from './components/DirectionsModal';
import { ReceiptModal } from './components/ReceiptModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');
  const [isDesktopFrame, setIsDesktopFrame] = useState<boolean>(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string>('any');

  // Persistence with localStorage
  const [requests, setRequests] = useState<ActiveAppointmentRequest[]>(() => {
    try {
      const saved = localStorage.getItem('botanical_atelier_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [confirmedList, setConfirmedList] = useState<ConfirmedAppointment[]>(() => {
    try {
      const saved = localStorage.getItem('botanical_atelier_confirmed');
      return saved ? JSON.parse(saved) : INITIAL_CONFIRMED;
    } catch {
      return INITIAL_CONFIRMED;
    }
  });

  // Selected booking parameters in proposal/payment flow
  const [activeDate, setActiveDate] = useState<string>('Viernes 6 de Noviembre');
  const [activeSlot, setActiveSlot] = useState<string>('10:30 AM');

  // Modals state
  const [chatModal, setChatModal] = useState<{
    isOpen: boolean;
    artistName: string;
    avatar: string;
    project: string;
  }>({
    isOpen: false,
    artistName: 'Elena Vega',
    avatar: 'EV',
    project: 'Ramo de Olivo & Flora Silvestre'
  });

  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [receiptAppointment, setReceiptAppointment] = useState<ConfirmedAppointment | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('botanical_atelier_requests', JSON.stringify(requests));
    } catch (e) {
      console.error(e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem('botanical_atelier_confirmed', JSON.stringify(confirmedList));
    } catch (e) {
      console.error(e);
    }
  }, [confirmedList]);

  // Handlers
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
  };

  const handleNewRequest = (newReq: ActiveAppointmentRequest) => {
    setRequests(prev => [newReq, ...prev]);
  };

  const handleProceedToPayment = (date: string, slot: string) => {
    setActiveDate(date);
    setActiveSlot(slot);
    setCurrentScreen('pasarela');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (confirmed: ConfirmedAppointment) => {
    setConfirmedList(prev => [confirmed, ...prev]);
    // update status of current request
    setRequests(prev =>
      prev.map(r => ({
        ...r,
        status: 'confirmada',
        step: 5,
        stageNote: '¡Cita confirmada y asegurada con éxito!'
      }))
    );
  };

  const handleAddReference = (requestId: string) => {
    // Add reference image to request
    setRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? {
              ...r,
              references: [
                ...r.references,
                '/src/assets/images/tattoo_botanical_illustration_1793464044741.jpg'
              ]
            }
          : r
      )
    );
  };

  const activeCount = requests.length + confirmedList.length;

  return (
    <div className="min-h-screen bg-[#ece7de] text-[#1c241d] flex flex-col items-center justify-start sm:py-6 selection:bg-[#2d4030] selection:text-white">
      {/* Container wrapper: switches between realistic mobile phone bezel and wider desktop container */}
      <div
        className={`w-full transition-all duration-300 ${
          isDesktopFrame
            ? 'max-w-4xl bg-[#f7f6f2] sm:rounded-3xl shadow-xl sm:border border-[#ded8cb] overflow-hidden'
            : 'max-w-md bg-[#f7f6f2] sm:rounded-3xl shadow-2xl sm:border sm:border-[#dcd6c8] overflow-hidden'
        } min-h-screen sm:min-h-[840px] flex flex-col relative`}
      >
        {/* Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onBack={
            currentScreen === 'detalle'
              ? () => handleNavigate('mis-citas')
              : currentScreen === 'pasarela'
              ? () => handleNavigate('detalle')
              : undefined
          }
          isDesktopFrame={isDesktopFrame}
          onToggleFrame={() => setIsDesktopFrame(prev => !prev)}
          activeCount={activeCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-5 pt-4">
          {currentScreen === 'inicio' && (
            <HomeScreen
              onNavigate={handleNavigate}
              onSelectArtist={handleSelectArtist}
              onOpenDirections={() => setIsDirectionsOpen(true)}
            />
          )}

          {currentScreen === 'solicitar' && (
            <RequestScreen
              initialArtistId={selectedArtistId}
              onNavigate={handleNavigate}
              onSubmitRequest={handleNewRequest}
            />
          )}

          {currentScreen === 'detalle' && (
            <ProposalScreen
              request={requests[0] || INITIAL_REQUESTS[0]}
              onNavigate={handleNavigate}
              onProceedToPayment={handleProceedToPayment}
              onOpenChat={() =>
                setChatModal({
                  isOpen: true,
                  artistName: requests[0]?.artist.name || 'Elena Vega',
                  avatar: requests[0]?.artist.avatarText || 'EV',
                  project: requests[0]?.title || 'Ramo de Olivo & Flora Silvestre'
                })
              }
            />
          )}

          {currentScreen === 'pasarela' && (
            <PaymentScreen
              selectedDate={activeDate}
              selectedSlot={activeSlot}
              artistName={requests[0]?.artist.name || 'Elena Vega'}
              onNavigate={handleNavigate}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {currentScreen === 'mis-citas' && (
            <AppointmentsScreen
              requests={requests}
              confirmedList={confirmedList}
              onNavigate={handleNavigate}
              onOpenChat={(artistName, avatar, project) =>
                setChatModal({
                  isOpen: true,
                  artistName,
                  avatar,
                  project
                })
              }
              onOpenCareGuide={() => setIsCareGuideOpen(true)}
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenReceipt={appointment => setReceiptAppointment(appointment)}
              onAddReferenceToRequest={handleAddReference}
            />
          )}

          {currentScreen === 'contacto' && (
            <ContactScreen
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenChat={(artistName, avatar, project) =>
                setChatModal({
                  isOpen: true,
                  artistName,
                  avatar,
                  project
                })
              }
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          activeCount={activeCount}
        />
      </div>

      {/* Global Modals */}
      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal(prev => ({ ...prev, isOpen: false }))}
        artistName={chatModal.artistName}
        artistAvatar={chatModal.avatar}
        projectTitle={chatModal.project}
      />

      <CareGuideModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
        studioAddress="Calle del León 14, Barrio de las Letras, Madrid / Carrer de Verdi, Gràcia Barcelona"
        metroInfo="Metro Antón Martín (L1) / Metro Fontana (L3)"
      />

      {receiptAppointment && (
        <ReceiptModal
          isOpen={!!receiptAppointment}
          onClose={() => setReceiptAppointment(null)}
          appointment={receiptAppointment}
        />
      )}
    </div>
  );
}
