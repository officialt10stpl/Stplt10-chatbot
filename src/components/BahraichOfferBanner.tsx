import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';

export default function BahraichOfferBanner() {
  const [bahraichCount, setBahraichCount] = useState<number>(0);

  useEffect(() => {
    async function fetchBahraichCount() {
      try {
        // 'players' कलेक्शन से सिर्फ बहराइच (Bahraich) शहर के रजिस्ट्रेशन गिनेंगे
        const q = query(collection(db, "players"), where("city", "==", "Bahraich"));
        const snapshot = await getCountFromServer(q);
        setBahraichCount(snapshot.data().count);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
    fetchBahraichCount();
  }, []);

  // ऑफर का हिसाब लगाने का लॉजिक
  const getOfferDetails = (count: number) => {
    if (count < 100) {
      return {
        discount: "₹200 OFF",
        slotsLeft: 100 - count,
        message: "पहले 100 खिलाड़ियों के लिए ₹200 की विशेष छूट!"
      };
    } else if (count < 200) {
      return {
        discount: "₹100 OFF",
        slotsLeft: 200 - count,
        message: "अगले 100 खिलाड़ियों के लिए ₹100 की छूट जारी है!"
      };
    } else {
      return {
        discount: "Regular Price",
        slotsLeft: 0,
        message: "Opening offer समाप्त हो चुका है।"
      };
    }
  };

  const offer = getOfferDetails(bahraichCount);

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 via-black to-yellow-500/20 border-2 border-yellow-500 p-6 rounded-3xl text-center my-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
      <span className="bg-yellow-500 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        🔥 BAHRAICH TRIAL OPENING OFFER 🔥
      </span>
      
      <h3 className="text-2xl md:text-3xl font-black text-white mt-4">
        {offer.message}
      </h3>
      
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="bg-black/60 border border-yellow-500/40 px-6 py-3 rounded-2xl">
          <p className="text-xs text-gray-400">बहराइच कुल रजिस्ट्रेशन</p>
          <p className="text-3xl font-black text-yellow-400">{bahraichCount}</p>
        </div>
        
        <div className="bg-black/60 border border-yellow-500/40 px-6 py-3 rounded-2xl">
          <p className="text-xs text-gray-400">वर्तमान छूट (Discount)</p>
          <p className="text-3xl font-black text-green-400">{offer.discount}</p>
        </div>
      </div>

      {offer.slotsLeft > 0 && (
        <p className="text-xs text-yellow-300 font-bold mt-4 animate-pulse">
          ⚡ केवल {offer.slotsLeft} सीटें बची हैं इस ऑफर के लिए! जल्दी करें।
        </p>
      )}
    </div>
  );
}