import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

interface GoldenTicketProps {
  playerData: {
    name: string;
    regId: string;
    state: string;
    city?: string;
    category?: string; // Junior या Senior दिखाने के लिए
  };
  autoDownload?: boolean; 
}

export default function GoldenTicket({ playerData, autoDownload = false }: GoldenTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `STPL-Golden-Ticket-${playerData.regId}.png`;
      link.click();
    }
  };

  useEffect(() => {
    if (autoDownload) {
      const timer = setTimeout(() => {
        downloadTicket();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoDownload]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Ticket UI */}
      <div 
        ref={ticketRef}
        className="w-[360px] bg-gradient-to-b from-[#dfb15b] via-[#c9933b] to-[#a47021] p-6 rounded-2xl shadow-2xl border-4 border-[#ffe599] text-black font-sans relative overflow-hidden"
      >
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full"></div>

        <div className="text-center mb-3 flex justify-between items-center px-2">
          <div className="inline-block bg-black px-3 py-1 rounded-xl border border-yellow-500/50 shadow-md">
            <h2 className="text-yellow-400 font-black tracking-wider text-base">STPL T10</h2>
            <p className="text-[8px] text-gray-300 tracking-widest uppercase">Street Talent Premier League</p>
          </div>
          {/* कैटेगरी बैज (Junior / Senior) */}
          {playerData.category && (
            <div className="bg-black text-yellow-400 font-black px-3 py-1 rounded-xl text-xs uppercase border border-yellow-500/50 tracking-wider shadow-md">
              {playerData.category}
            </div>
          )}
        </div>

        <div className="text-center my-4">
          <h1 className="text-2xl font-black tracking-widest text-black uppercase">
            GOLDEN TICKET
          </h1>
          <div className="w-10 h-0.5 bg-black mx-auto my-1.5"></div>
          <p className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
            Your Journey Starts Here
          </p>
        </div>

        {/* QR Code Section */}
        <div className="bg-white p-2 rounded-xl w-28 h-28 mx-auto flex items-center justify-center shadow-inner border border-black/10 my-3">
          <QRCodeCanvas 
            value={`STPL T10 Player Verified:\nName: ${playerData.name}\nID: ${playerData.regId}\nCategory: ${playerData.category || 'N/A'}\nState: ${playerData.state}`} 
            size={100} 
          />
        </div>

        <div className="text-center my-3">
          <p className="text-[10px] font-bold tracking-widest text-black/80 uppercase mb-1">Registration ID</p>
          <div className="bg-black text-yellow-400 font-mono font-bold py-1.5 px-3 rounded-lg tracking-wider text-base inline-block shadow-md border border-yellow-500/40">
            ★ {playerData.regId} ★
          </div>
        </div>

        <div className="bg-black/15 border border-black/30 rounded-xl p-2.5 text-center my-3">
          <p className="text-[9px] font-bold tracking-widest text-black/80 uppercase">Player Location</p>
          <p className="text-sm font-extrabold text-black uppercase tracking-wide mt-0.5">
            {playerData.state} {playerData.city ? `(${playerData.city})` : ''}
          </p>
        </div>

        <div className="text-center mt-4 pt-2 border-t border-black/20">
          <p className="text-[9px] font-black tracking-widest text-black/90 uppercase">
            PLAY. PERFORM. MAKE IT HAPPEN.
          </p>
        </div>
      </div>

      {/* Manual Download Button */}
      <button
        onClick={downloadTicket}
        className="mt-6 px-6 py-2.5 rounded-xl bg-yellow-500 text-black font-extrabold text-xs hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:scale-105 cursor-pointer"
      >
        📥 Download Ticket Again
      </button>
    </div>
  );
}