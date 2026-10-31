import React, { useState } from 'react';
import { X, Send, Paperclip, CheckCheck, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artistAvatar: string;
  projectTitle: string;
}

interface Message {
  id: string;
  sender: 'client' | 'artist';
  text: string;
  time: string;
  attachments?: string[];
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  artistName,
  artistAvatar,
  projectTitle
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'artist',
      text: '¡Hola! He estado revisando tus referencias botánicas. La rama de olivo para el antebrazo tiene una curvatura hermosa que acompañará muy bien el movimiento muscular.',
      time: '11:20 AM'
    },
    {
      id: '2',
      sender: 'artist',
      text: 'Te preparé una propuesta con trazo 1RL ultra-fino y un sombreado microscópico muy etéreo. ¿Te gustaría añadir algún detalle floral adicional?',
      time: '11:22 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'client',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // Simulate thoughtful artist response after 1 second
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'artist',
          text: 'Perfecto, tomo nota de esta preferencia para integrarla en la matriz del diseño. ¡Cualquier otra duda estoy aquí!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fcfbf9] border border-[#dcd7cb] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col h-[560px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#2d4030] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3d5542] border border-white/20 flex items-center justify-center font-serif text-sm font-semibold tracking-wider">
              {artistAvatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-base font-semibold leading-none">{artistName}</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-white/75 mt-0.5">{projectTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f5f3ed]">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#7a8578] font-medium bg-[#eae6dc] px-2.5 py-1 rounded-full">
              Canal privado de consulta artística
            </span>
          </div>

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'client'
                    ? 'bg-[#2d4030] text-white rounded-br-xs'
                    : 'bg-white text-[#1c241d] border border-[#e2ddd0] rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[#869285] mt-1 px-1 flex items-center gap-1">
                {msg.time}
                {msg.sender === 'client' && <CheckCheck className="w-3 h-3 text-[#2d4030]" />}
              </span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-[#e5e0d3] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje a la artista..."
            className="flex-1 bg-[#f7f5ef] border border-[#d8d2c4] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2d4030]"
          />
          <button
            onClick={handleSend}
            disabled={!inputVal.trim()}
            className="p-2.5 bg-[#2d4030] text-white rounded-xl hover:bg-[#223124] disabled:opacity-40 transition-all active:scale-95"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
