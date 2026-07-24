import { useState, useEffect } from 'react';
import { db } from '../lib/firebase.ts';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import GoldenTicket from './GoldenTicket';

interface PlayerDashboardProps {
  playerId: string;
}

export default function PlayerDashboard({ playerId }: PlayerDashboardProps) {
  const [playerData, setPlayerData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPlayerData() {
      if (!playerId) return;
      try {
        const docRef = doc(db, "players", playerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlayerData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayerData();
  }, [playerId]);

  // 🎁 कैशबैक क्लेम करने और फ्रेश काउंट रीसेट करने का फंक्शन
  const handleClaimReward = async () => {
    if (!playerId || !playerData) return;

    const currentCycle = playerData.currentCycleReferrals || 0;
    const claimedTiers = playerData.claimedTiers || [];
    const userRef = doc(db, "players", playerId);

    try {
      if (currentCycle >= 10 && !claimedTiers.includes(10)) {
        await updateDoc(userRef, {
          claimedTiers: [...claimedTiers, 10],
          currentCycleReferrals: 0 // रीसेट
        });
        alert("🎉 बधाई हो! आपका Full Refund अप्रूव कर दिया गया है।");
      } 
      else if (currentCycle >= 5 && !claimedTiers.includes(5)) {
        await updateDoc(userRef, {
          claimedTiers: [...claimedTiers, 5],
          currentCycleReferrals: 0 // रीसेट
        });
        alert("🔥 शानदार! ₹400 कैशबैक क्लेम हो गया है। अगला रिवॉर्ड पाने के लिए फिर से नए रेफरल शुरू करें!");
      } 
      else if (currentCycle >= 3 && !claimedTiers.includes(3)) {
        await updateDoc(userRef, {
          claimedTiers: [...claimedTiers, 3],
          currentCycleReferrals: 0 // रीसेट
        });
        alert("✨ ₹200 कैशबैक क्लेम हो गया है! अब ₹400 या फुल रिफंड के लिए नई शुरुआत करें।");
      } else {
        alert("❌ अभी आप किसी रिवॉर्ड के लिए एलिजिबल नहीं हैं या यह टियर पहले ही क्लेम किया जा चुका है।");
        return;
      }

      // अपडेट होने के बाद डेटा रिफ्रेश करें
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setPlayerData(updatedSnap.data());
      }
    } catch (err) {
      console.error("Error claiming reward:", err);
      alert("Error processing claim. Please try again.");
    }
  };

  if (loading) return <div className="text-white text-center p-10 font-sans">Loading Dashboard...</div>;
  if (!playerData) return <div className="text-red-500 text-center p-10 font-sans">Player data not found!</div>;

  // 🔍 यहाँ से रेफरल की वैल्यू सुरक्षित रूप से निकाली जा रही है
  const totalRefs = playerData.totalReferrals || 0;
  const currentCycle = playerData.currentCycleReferrals || 0;
  
  let target = currentCycle < 3 ? 3 : (currentCycle < 5 ? 5 : 10);
  let remaining = Math.max(0, target - currentCycle);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 📊 रेफरल डैशबोर्ड सेक्शन (अब सबसे ऊपर साफ़ दिखेगा) */}
        <div className="bg-black text-white p-6 rounded-3xl border border-yellow-500/30 max-w-md mx-auto shadow-2xl">
          <h2 className="text-xl font-black text-yellow-500 mb-4 uppercase text-center">🎁 Referral Dashboard</h2>
          
          <div className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10 text-center">
            <p className="text-xs text-gray-400">Your Referral ID / Code</p>
            <p className="text-lg font-mono font-bold text-yellow-400">{playerData.generatedId || "N/A"}</p>
          </div>

          <div className="space-y-3 mb-6 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-400">Total Referrals:</span> 
              <span className="font-bold text-white">{totalRefs}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Current Cycle Progress:</span> 
              <span className="font-bold text-yellow-400">{currentCycle} / {target}</span>
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-xs text-yellow-300 font-medium text-center mb-4">
            {currentCycle >= 3 && currentCycle < 5 && !playerData.claimedTiers?.includes(3) 
              ? "✨ You are eligible for ₹200 cashback!"
              : currentCycle >= 5 && currentCycle < 10 && !playerData.claimedTiers?.includes(5)
              ? "🔥 You are eligible for ₹400 cashback!"
              : currentCycle >= 10 && !playerData.claimedTiers?.includes(10)
              ? "🎉 You are eligible for a Full Refund!"
              : `📌 Refer ${remaining} more friend(s) in this cycle to unlock your next reward.`}
          </div>

          <button 
            onClick={handleClaimReward}
            className="w-full py-3 bg-yellow-500 text-black font-black text-sm rounded-xl hover:bg-yellow-400 transition uppercase cursor-pointer shadow-lg"
          >
            Claim Reward
          </button>
        </div>

        {/* 🎫 गोल्डेन टिकट सेक्शन (इसके नीचे) */}
        <div>
          <h2 className="text-center font-black text-yellow-500 mb-4 uppercase tracking-wider text-xl">✨ Your Golden Ticket</h2>
          <GoldenTicket 
            playerData={{
              name: playerData.name,
              regId: playerData.generatedId || "STPL-PENDING",
              state: playerData.state,
              city: playerData.city,
              category: playerData.category
            }} 
            autoDownload={false} 
          />
        </div>

      </div>
    </div>
  );
}