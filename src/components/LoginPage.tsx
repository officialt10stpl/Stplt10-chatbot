import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlayerLogin = async () => {
    if (!loginId || !password) {
      alert("कृपया अपनी ID और Password दर्ज करें!");
      return;
    }

    setLoading(true);
    try {
      // फायरबेस में आईडी और पासवर्ड चेक करें (इनपुट को कैपिटल कर रहे हैं ताकि गलती न हो)
      const cleanId = loginId.trim().toUpperCase();
      const q = query(
        collection(db, "players"), 
        where("generatedId", "==", cleanId),
        where("loginPassword", "==", password)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // लॉगिन सफल होने पर प्लेयर की डॉक्यूमेंट ID निकालें
        const userDoc = querySnapshot.docs[0];
        
        // स्टेटस और डॉक्यूमेंट ID सेव करें
        localStorage.setItem("isPlayerLoggedIn", "true");
        localStorage.setItem("loggedInPlayerDocId", userDoc.id);
        
        // 🚀 यहाँ सही डायनेमिक पाथ पर रिडायरेक्ट किया गया है
        navigate(`/dashboard/${userDoc.id}`);
        window.location.reload(); 
      } else {
        alert("Invalid ID or Password!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4 pt-20">
      <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/10 shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-black text-yellow-500 mb-8 text-center">PLAYER LOGIN</h2>
        
        <input 
          type="text" 
          placeholder="ENTER REGISTRATION ID" 
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-500 outline-none uppercase font-mono"
        />
        
        <input 
          type="password" 
          placeholder="ENTER PASSWORD" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-8 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-500 outline-none"
        />
        
        <button 
          type="button"
          onClick={handlePlayerLogin}
          disabled={loading}
          className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black hover:bg-yellow-400 transition-all active:scale-95 cursor-pointer"
        >
          {loading ? "VERIFYING..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
}