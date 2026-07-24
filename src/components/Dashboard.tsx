import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

export default function Dashboard() {
  const [player, setPlayer] = useState<any>(null);
  const navigate = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedInPlayerDocId");
    if (!loggedInId) {
      navigate("/login");
      return;
    }

    const fetchPlayerData = async () => {
      const docRef = doc(db, "players", loggedInId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlayer({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchPlayerData();
  }, [navigate]);

  // 🎁 कैशबैक क्लेम करने का फंक्शन (जैसे ही क्लेम करेगा, काउंटर जीरो हो जाएगा)
  const handleClaimReward = async () => {
    if (!player) return;

    const currentCycle = player.currentCycleReferrals || 0;
    const userRef = doc(db, "players", player.id);

    try {
      if (currentCycle >= 10) {
        await updateDoc(userRef, {
          currentCycleReferrals: 0 // काउंटर रीसेट
        });
        alert("🎉 बधाई हो! आपका Full Refund क्लेम हो गया है। नई काउंटिंग शुरू हो चुकी है!");
      } 
      else if (currentCycle >= 5) {
        await updateDoc(userRef, {
          currentCycleReferrals: 0 // काउंटर रीसेट
        });
        alert("🔥 शानदार! ₹400 कैशबैक क्लेम हो गया है। अगली बार के लिए काउंटिंग फिर से शून्य से शुरू हो गई है!");
      } 
      else if (currentCycle >= 3) {
        await updateDoc(userRef, {
          currentCycleReferrals: 0 // काउंटर रीसेट
        });
        alert("✨ ₹200 कैशबैक क्लेम हो गया है! अगली शुरुआत के लिए काउंटर जीरो कर दिया गया है।");
      } else {
        alert("❌ अभी आपके कम से कम 3 रेफरल पूरे नहीं हुए हैं, इसलिए आप क्लेम नहीं कर सकते।");
        return;
      }

      // डेटा अपडेट होने के बाद लोकल स्टेट रिफ्रेश करें
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setPlayer({ id: updatedSnap.id, ...updatedSnap.data() });
      }
    } catch (err) {
      console.error("Error claiming reward:", err);
      alert("Error processing claim. Please try again.");
    }
  };

  const downloadGoldenTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `STPL-Golden-Ticket-${player?.generatedId || 'Player'}.png`;
      link.click();
    }
  };

  if (!player) return <div className="text-center mt-32 text-white font-sans">Loading Profile...</div>;

  const currentCycle = player.currentCycleReferrals || 0;
  const totalRefs = player.totalReferrals || 0;
  
  // डायनेमिक मैसेज लॉजिक
  let rewardMessage = "";
  let target = 3;

  if (currentCycle < 3) {
    target = 3;
    let needed = 3 - currentCycle;
    rewardMessage = `📌 ₹200 का कैशबैक पाने के लिए ${needed} और दोस्त(ओं) को जोड़िए!`;
  } else if (currentCycle >= 3 && currentCycle < 5) {
    target = 5;
    let needed = 5 - currentCycle;
    rewardMessage = `✨ आपने 3 पूरे कर लिए हैं! आप ₹200 क्लेम कर सकते हैं, या ₹400 के लिए ${needed} और जोड़िए!`;
  } else if (currentCycle >= 5 && currentCycle < 10) {
    target = 10;
    let needed = 10 - currentCycle;
    rewardMessage = `🔥 शानदार! आप ₹400 क्लेम कर सकते हैं या फुल रिफंड के लिए ${needed} और जोड़िए!`;
  } else {
    target = 10;
    rewardMessage = `🎉 आप फुल रिफंड क्लेम करने के लिए एलिजिबल हैं!`;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pt-32 pb-16 flex flex-col items-center font-sans">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        
        <h2 className="text-2xl font-black text-yellow-500 uppercase tracking-wider text-center">Player Dashboard</h2>

        {/* 📊 रेफरल डैशबोर्ड और काउंटर सेक्शन */}
        <div className="w-full bg-black text-white p-6 rounded-3xl border border-yellow-500/30 shadow-2xl">
          <h2 className="text-lg font-black text-yellow-500 mb-4 uppercase text-center">🎁 Referral Status</h2>
          
          <div className="bg-white/5 p-3 rounded-xl mb-4 border border-white/10 text-center">
            <p className="text-xs text-gray-400">Your Referral ID / Code</p>
            <p className="text-lg font-mono font-bold text-yellow-400">{player.generatedId || "N/A"}</p>
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-400">Total Referrals:</span> 
              <span className="font-bold text-white">{totalRefs}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Current Cycle Progress:</span> 
              <span className="font-bold text-yellow-400">{currentCycle} / {target}</span>
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl text-xs text-yellow-300 font-medium text-center mb-4 leading-relaxed">
            {rewardMessage}
          </div>

          <button 
            onClick={handleClaimReward}
            className="w-full py-3 bg-yellow-500 text-black font-black text-sm rounded-xl hover:bg-yellow-400 transition uppercase cursor-pointer shadow-lg"
          >
            Claim Reward
          </button>
        </div>

        {/* --- Golden Ticket Preview UI --- */}
        <div 
          ref={ticketRef}
          className="w-[360px] bg-gradient-to-b from-[#dfb15b] via-[#c9933b] to-[#a47021] p-6 rounded-2xl shadow-[0_0_40px_rgba(217,173,91,0.25)] border-4 border-[#ffe599] text-black font-sans relative overflow-hidden my-2"
        >
          {/* Ticket Edge Notches */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full"></div>

          {/* Logo Section */}
          <div className="text-center mb-3">
            <div className="inline-block bg-black px-4 py-1.5 rounded-xl border border-yellow-500/50 shadow-md">
              <h2 className="text-yellow-400 font-black tracking-wider text-lg">STPL T10</h2>
              <p className="text-[9px] text-gray-300 tracking-widest uppercase">Street Talent Premier League</p>
            </div>
          </div>

          {/* Golden Ticket Title */}
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
              value={`STPL T10 Player Details:\nName: ${player.name}\nID: ${player.generatedId}\nState: ${player.state}\nCity: ${player.city}`} 
              size={100} 
            />
          </div>

          {/* Registration ID Section */}
          <div className="text-center my-3">
            <p className="text-[10px] font-bold tracking-widest text-black/80 uppercase mb-1">Registration ID</p>
            <div className="bg-black text-yellow-400 font-mono font-bold py-1.5 px-3 rounded-lg tracking-wider text-base inline-block shadow-md border border-yellow-500/40">
              ★ {player.generatedId} ★
            </div>
          </div>

          {/* Player State Box */}
          <div className="bg-black/15 border border-black/30 rounded-xl p-2.5 text-center my-3">
            <p className="text-[9px] font-bold tracking-widest text-black/80 uppercase">Player State</p>
            <p className="text-sm font-extrabold text-black uppercase tracking-wide mt-0.5">
              {player.state} ({player.city})
            </p>
          </div>

          {/* Footer Tagline */}
          <div className="text-center mt-4 pt-2 border-t border-black/20">
            <p className="text-[9px] font-black tracking-widest text-black/90 uppercase">
              PLAY. PERFORM. MAKE IT HAPPEN.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <button 
          onClick={downloadGoldenTicket}
          className="w-full py-4 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:scale-105 cursor-pointer"
        >
          📥 DOWNLOAD GOLDEN TICKET
        </button>

      </div>
    </div>
  );
}