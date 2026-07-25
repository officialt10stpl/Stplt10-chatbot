import { useState, useEffect } from 'react';

// डेटा लिस्ट
const recentRegistrations = [
  { name: "राहुल मौर्य", city: "लखनऊ", time: "अभी-अभी" },
  { name: "अमित कुमार", city: "कानपुर", time: "30 सेकंड पहले" },
  { name: "रोहित सिंह", city: "वाराणसी", time: "अभी-अभी" },
  { name: "विशाल वर्मा", city: "गोरखपुर", time: "30 सेकंड पहले" },
  { name: "प्रियांशु यादव", city: "प्रयागराज", time: "अभी-अभी" },
  { name: "समीर खान", city: "अयोध्या", time: "30 सेकंड पहले" },
  { name: "अंकित शर्मा", city: "मेरठ", time: "3 मिनट पहले" },
  { name: "विकास पटेल", city: "जौनपुर", time: "अभी-अभी" },
  { name: "सुमित तिवारी", city: "सुल्तानपुर", time: "4 मिनट पहले" },
  { name: "दीपक गुप्ता", city: "आगरा", time: "अभी-अभी" },
  { name: "मनीष वर्मा", city: "बरेली", time: "2 मिनट पहले" },
  { name: "सोनू यादव", city: "अज़मगढ़", time: "6 मिनट पहले" },
  { name: "आदित्य सिंह", city: "गोंडा", time: "अभी-अभी" },
  { name: "सत्यम मिश्रा", city: "बस्ती", time: "1 मिनट पहले" },
  { name: "राहुल वर्मा", city: "बहराइच", time: "अभी-अभी" },
  { name: "विकास राजभर", city: "मऊ", time: "3 मिनट पहले" },
  { name: "अभिषेक सिंह", city: "फैजाबाद", time: "अभी-अभी" },
  { name: "विवेक कुमार", city: "सीतापुर", time: "5 मिनट पहले" },
  { name: "सौरभ यादव", city: "खीरी", time: "अभी-अभी" },
  { name: "पंकज कुमार", city: "बाराबंकी", time: "2 मिनट पहले" }
];

// Live Toast Popup Component (रैंडम समय - 5 से 20 सेकंड के अंतराल पर)
export default function LiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showRandomToast = () => {
      setIsVisible(false);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * recentRegistrations.length);
        setCurrentIndex(randomIndex);
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
        }, 4000);

      }, 500);

      const randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      timeoutId = setTimeout(showRandomToast, randomDelay);
    };

    const initialTimeout = setTimeout(showRandomToast, 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isVisible) return null;
  const currentReg = recentRegistrations[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-bounce transition-all duration-500">
      <div className="flex items-center gap-3 bg-[#121212]/90 border border-yellow-500/40 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.3)] text-white max-w-xs">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-400 flex items-center justify-center text-black font-black text-lg shadow-md shrink-0">🏏</div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-widest text-yellow-400 font-extrabold">New Registration</p>
          </div>
          <p className="text-xs font-bold text-gray-200 mt-0.5">
            <span className="text-white font-black">{currentReg.name}</span> ने <span className="text-yellow-400">{currentReg.city}</span> से रजिस्ट्रेशन किया!
          </p>
          <span className="text-[9px] text-gray-400 font-medium">{currentReg.time}</span>
        </div>
      </div>
    </div>
  );
}