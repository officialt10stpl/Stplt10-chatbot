import { useState, useEffect } from 'react';
import { db } from '../lib/firebase.ts';
import { collection, addDoc, serverTimestamp, query, where, getDocs, getCountFromServer, updateDoc, doc } from 'firebase/firestore';
import SuccessPage from './SuccessPage';
import qrCode799Img from '../assets/qr-code-799.jpeg';
import qrCode899Img from '../assets/qr-code-899.jpeg';
import qrCodeDefaultImg from '../assets/qr-code.jpeg';

const locationData: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur"],
  "Delhi": ["New Delhi", "South Delhi", "North Delhi"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Goa": ["Panaji", "Margao"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala"],
  "Jammu&Kashmir ": ["Jammu", "Srinagar"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Bahraich", "Kanpur", "Varanasi", "Gorakhpur", "Allahabad"],
  "Uttarakhand": ["Dehradun", "Haridwar"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur"]
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', aadhaar: '', dob: '', state: '', trialCity: '', role: '', battingStyle: '', bowlingStyle: '', transactionId: '',
    parentName: '', parentMobile: '', referredBy: ''
  });
  
  const [hasReferralCode, setHasReferralCode] = useState<boolean>(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [parentConsent, setParentConsent] = useState<boolean>(false);
  const [paymentInitiated, setPaymentInitiated] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successSubmitted, setSuccessSubmitted] = useState<boolean>(false);

  const [bahraichCount, setBahraichCount] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setFormData(prev => ({ ...prev, referredBy: refCode.trim().toUpperCase() }));
      setHasReferralCode(true);
    }

    async function fetchBahraichCount() {
      try {
        const q = query(collection(db, "players"), where("city", "==", "Bahraich"));
        const snapshot = await getCountFromServer(q);
        setBahraichCount(snapshot.data().count);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
    fetchBahraichCount();
  }, []);

  const getDynamicPricing = () => {
    if (formData.trialCity === "Bahraich") {
      if (bahraichCount < 100) {
        return {
          fee: 799,
          discountText: "₹200 OFF (प्रथम 100 खिलाड़ी)",
          upiLink: "upi://pay?pa=6307469520@nyes&pn=STPL&am=799&cu=INR",
          qrImage: qrCode799Img
        };
      } else {
        return {
          fee: 899,
          discountText: "₹100 OFF (अगले 100 खिलाड़ी)",
          upiLink: "upi://pay?pa=6307469520@nyes&pn=Pramod%20Maurya%20(STPL)&am=899&cu=INR",
          qrImage: qrCode899Img
        };
      }
    }
    return {
      fee: 999,
      discountText: "Standard Registration Fee",
      upiLink: "upi://pay?pa=6307469520@nyes&pn=STPL%20T10&am=999&cu=INR",
      qrImage: qrCodeDefaultImg
    };
  };

  const pricing = getDynamicPricing();

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobValue = e.target.value;
    setFormData({ ...formData, dob: dobValue });

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setCalculatedAge(age);
      setCategory(age < 18 ? 'Junior' : 'Senior');
    } else {
      setCalculatedAge(null);
      setCategory('');
    }
  };

  const validateFormBeforePay = () => {
    if (!acceptedTerms) {
      alert("कृपया आगे बढ़ने से पहले 'Terms & Conditions' के चेकबॉक्स पर टिक करें!");
      return false;
    }

    if (calculatedAge !== null && calculatedAge < 18) {
      if (!parentConsent || !formData.parentName || !formData.parentMobile) {
        alert("चूँकि खिलाड़ी की उम्र 18 वर्ष से कम है, इसलिए पेरेंट/गार्डियन का नाम, मोबाइल नंबर और सहमति चेकबॉक्स भरना अनिवार्य है!");
        return false;
      }
    }

    if (!formData.name || !formData.email || !formData.mobile || !formData.aadhaar || !formData.dob || !formData.state || !formData.trialCity || !formData.role) {
      alert("कृपया सभी अनिवार्य (*) फील्ड्स सही से भरें!");
      return false;
    }

    if (!formData.email.includes('@')) {
      alert("अमान्य ईमेल एड्रेस! कृपया '@' का उपयोग करें।");
      return false;
    }

    if (formData.mobile.length !== 10 || isNaN(Number(formData.mobile))) {
      alert("मोबाइल नंबर ठीक 10 अंकों का होना चाहिए!");
      return false;
    }

    if (formData.aadhaar.length !== 12 || isNaN(Number(formData.aadhaar))) {
      alert("आधार नंबर ठीक 12 अंकों का होना चाहिए!");
      return false;
    }
    return true;
  };

  const handleRedirectToApp = () => {
    if (!validateFormBeforePay()) return;
    window.location.href = pricing.upiLink;
    setPaymentInitiated(true);
  };

  const handleOpenQrModal = () => {
    if (!validateFormBeforePay()) return;
    setShowQrModal(true);
    setPaymentInitiated(true);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 🎁 रेफरर का काउंटर अपडेट करने का फंक्शन
  const updateReferrerStats = async (refCode: string) => {
    try {
      const refQuery = query(collection(db, "players"), where("generatedId", "==", refCode));
      const refSnapshot = await getDocs(refQuery);

      if (!refSnapshot.empty) {
        const referrerDoc = refSnapshot.docs[0];
        const referrerData = referrerDoc.data();
        const referrerRef = doc(db, "players", referrerDoc.id);

        let currentCycle = (referrerData.currentCycleReferrals || 0) + 1;
        let totalRefs = (referrerData.totalReferrals || 0) + 1;

        await updateDoc(referrerRef, {
          totalReferrals: totalRefs,
          currentCycleReferrals: currentCycle
        });
      }
    } catch (err) {
      console.error("Error updating referral count:", err);
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || successSubmitted) return;

    if (!formData.transactionId) {
      alert("कृपया अपनी UPI Transaction ID / UTR नंबर दर्ज करें!");
      return;
    }

    setIsSubmitting(true);

    try {
      const mobileQuery = query(collection(db, "players"), where("mobile", "==", formData.mobile));
      const mobileSnapshot = await getDocs(mobileQuery);

      if (!mobileSnapshot.empty) {
        alert("इस मोबाइल नंबर से पहले ही रजिस्ट्रेशन किया जा चुका है!");
        setIsSubmitting(false);
        return;
      }

      let finalReferral = "Direct";
      if (hasReferralCode && formData.referredBy.trim() !== "") {
        const cleanRefCode = formData.referredBy.trim().toUpperCase();
        const refQuery = query(collection(db, "players"), where("generatedId", "==", cleanRefCode));
        const refSnapshot = await getDocs(refQuery);

        if (refSnapshot.empty) {
          alert("❌ Invalid Referral Code! कृपया सही रेफरल कोड दर्ज करें या बॉक्स खाली छोड़ दें।");
          setIsSubmitting(false);
          return;
        }
        finalReferral = cleanRefCode;
      }

      let receiptBase64 = '';
      if (paymentProofFile) {
        receiptBase64 = await convertFileToBase64(paymentProofFile);
      }

      // नए खिलाड़ी के लिए यूनिक रेफरल आईडी जनरेट करना
      const generatedId = "STPL" + Math.floor(1000 + Math.random() * 9000);

      await addDoc(collection(db, "players"), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        aadhaar: "[Aadhaar Redacted]",
        dob: formData.dob,
        age: calculatedAge !== null ? calculatedAge : 0,
        category: category || 'Senior',
        state: formData.state,
        city: formData.trialCity,
        role: formData.role,
        battingStyle: formData.battingStyle || 'N/A',
        bowlingStyle: formData.bowlingStyle || 'N/A',
        parentName: calculatedAge !== null && calculatedAge < 18 ? formData.parentName : 'N/A',
        parentMobile: calculatedAge !== null && calculatedAge < 18 ? formData.parentMobile : 'N/A',
        transactionId: formData.transactionId,
        paymentReceipt: receiptBase64,
        paymentStatus: 'Pending',
        approvedByAdmin: false,
        feePaid: pricing.fee,
        referredBy: finalReferral,
        generatedId: generatedId,
        totalReferrals: 0,
        currentCycleReferrals: 0,
        claimedTiers: [],
        createdAt: serverTimestamp()
      });

      if (finalReferral !== "Direct") {
        await updateReferrerStats(finalReferral);
      }

      setSuccessSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error("Registration error:", error);
      alert("Error submitting details: " + (error.message || "Please try again."));
      setIsSubmitting(false);
    }
  };

  if (successSubmitted) {
    return (
      <div className="mt-24 min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans flex items-center justify-center">
        <SuccessPage />
      </div>
    );
  }

  return (
    <div className="mt-24 min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white/[0.03] p-8 rounded-3xl border border-white/10">
            <h2 className="text-3xl font-black text-yellow-500 mb-2">PLAYER REGISTRATION</h2>
            <p className="text-xs text-gray-400 mb-8">जिन फील्ड्स के आगे <span className="text-red-500 font-bold">*</span> लगा है, उन्हें भरना अनिवार्य है।</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-400 block mb-1">FULL NAME <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-white" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">EMAIL ADDRESS <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="example@gmail.com" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">WHATSAPP NUMBER (10 Digits) <span className="text-red-500">*</span></label>
                  <input type="text" maxLength={10} placeholder="9876543210" onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">AADHAAR NUMBER (12 Digits) <span className="text-red-500">*</span></label>
                  <input type="text" maxLength={12} placeholder="1234 5678 9012" onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">DATE OF BIRTH <span className="text-red-500">*</span></label>
                  <input type="date" onChange={handleDobChange} className="w-full bg-black/40 p-3.5 rounded-xl border border-white/10 text-white" />
                </div>
              </div>

              {calculatedAge !== null && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex justify-between items-center text-sm">
                  <span>Calculated Age: <strong className="text-yellow-400">{calculatedAge} Years</strong></span>
                  <span>Category: <strong className="text-yellow-400 uppercase">{category}</strong></span>
                </div>
              )}

              {calculatedAge !== null && calculatedAge < 18 && (
                <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide">Parent / Guardian Consent (Under 18 Player)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">PARENT / GUARDIAN NAME <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter Parent Name" onChange={(e) => setFormData({...formData, parentName: e.target.value})} className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-white text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">PARENT MOBILE NUMBER <span className="text-red-500">*</span></label>
                      <input type="text" maxLength={10} placeholder="Parent Mobile" onChange={(e) => setFormData({...formData, parentMobile: e.target.value})} className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="parentConsent"
                      checked={parentConsent}
                      onChange={(e) => setParentConsent(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 rounded cursor-pointer mt-0.5"
                    />
                    <label htmlFor="parentConsent" className="text-xs text-gray-300 select-none cursor-pointer">
                      As a parent/guardian, I grant full permission for my child to participate in STPL T10 trials and agree to all safety and liability terms. <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">STATE <span className="text-red-500">*</span></label>
                  <select onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-gray-300">
                    <option value="">SELECT STATE</option>
                    {Object.keys(locationData).sort().map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">TRIAL CITY <span className="text-red-500">*</span></label>
                  <select disabled={!formData.state} onChange={(e) => setFormData({...formData, trialCity: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-gray-300">
                    <option value="">{formData.state ? "SELECT TRIAL CITY" : "SELECT STATE FIRST"}</option>
                    {formData.state && locationData[formData.state].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {formData.trialCity === "Bahraich" && (
                <div className="p-4 rounded-xl flex justify-between items-center border-2 bg-green-500/10 border-green-500">
                  <div>
                    <p className="text-xs font-bold uppercase text-green-400">🎉 Bahraich Special Offer</p>
                    <p className="text-lg font-black text-white">{pricing.discountText}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm mr-2">₹999</span>
                    <span className="text-2xl font-black text-green-400">₹{pricing.fee}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">PLAYING ROLE <span className="text-red-500">*</span></label>
                  <select onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-gray-300">
                    <option value="">PLAYING ROLE</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicket-Keeper">Wicket-Keeper</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">BATTING STYLE</label>
                  <select onChange={(e) => setFormData({...formData, battingStyle: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-gray-300">
                    <option value="">BATTING STYLE</option>
                    <option value="Right-hand bat">Right-hand bat</option>
                    <option value="Left-hand bat">Left-hand bat</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">BOWLING STYLE</label>
                  <select onChange={(e) => setFormData({...formData, bowlingStyle: e.target.value})} className="w-full bg-black/40 p-4 rounded-xl border border-white/10 text-gray-300">
                    <option value="">BOWLING STYLE</option>
                    <option value="Right-arm fast">Right-arm fast</option>
                    <option value="Right-arm medium">Right-arm medium</option>
                    <option value="Left-arm fast">Left-arm fast</option>
                    <option value="Leg-break">Leg-break</option>
                    <option value="Off-break">Off-break</option>
                    <option value="Slow left-arm orthodox">Slow left-arm orthodox</option>
                  </select>
                </div>
              </div>

              <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="hasRefCheckbox"
                    checked={hasReferralCode}
                    onChange={(e) => setHasReferralCode(e.target.checked)}
                    className="w-5 h-5 accent-yellow-500 rounded cursor-pointer"
                  />
                  <label htmlFor="hasRefCheckbox" className="text-sm font-bold text-gray-200 select-none cursor-pointer">
                    I have a Referral Code
                  </label>
                </div>

                {hasReferralCode && (
                  <div className="pt-2">
                    <label className="text-xs text-gray-400 block mb-1">REFERRAL CODE</label>
                    <input 
                      type="text" 
                      placeholder="Enter Friend's Referral Code" 
                      value={formData.referredBy}
                      onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                      className="w-full bg-black/60 p-4 rounded-xl border border-yellow-500/50 text-white font-mono uppercase" 
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 accent-yellow-500 rounded cursor-pointer mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-gray-300 select-none cursor-pointer">
                  I agree to the <a href="/stpl-book" target="_blank" className="text-yellow-500 underline font-bold hover:text-yellow-400">STPL Book & Terms</a>, City Trial Policy, and Privacy Policy. <span className="text-red-500">*</span>
                </label>
              </div>

              {!paymentInitiated ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleRedirectToApp} 
                    className="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-base rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    🚀 REDIRECT TO UPI APP
                  </button>
                  <button 
                    type="button"
                    onClick={handleOpenQrModal} 
                    className="w-full py-5 bg-black border-2 border-yellow-500 text-yellow-400 font-black text-base rounded-2xl hover:bg-yellow-500/10 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    📷 SCAN QR CODE
                  </button>
                </div>
              ) : (
                <div className="mt-6 p-6 bg-yellow-500/10 border-2 border-yellow-500 rounded-2xl space-y-4">
                  <p className="text-sm text-yellow-300 font-bold text-center">पेमेंट पूर्ण करने के बाद अपनी UPI Transaction ID और स्क्रीनशॉट नीचे दर्ज करें:</p>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={handleRedirectToApp}
                      className="flex-1 py-3 bg-yellow-500 text-black font-bold text-xs rounded-xl hover:bg-yellow-400 transition uppercase"
                    >
                      📲 ओपन यूपीआई ऐप
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      className="flex-1 py-3 bg-black border border-yellow-500 text-yellow-400 font-bold text-xs rounded-xl hover:bg-yellow-500/10 transition uppercase"
                    >
                      📷 व्यू क्यूआर कोड
                    </button>
                  </div>

                  <form onSubmit={handleSubmitProof} className="space-y-4 pt-4 border-t border-yellow-500/30">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">UPI TRANSACTION ID / UTR NUMBER <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Enter 12-digit UTR / Transaction ID" 
                        value={formData.transactionId}
                        onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                        className="w-full bg-black p-4 rounded-xl border border-yellow-500/50 text-white text-center font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block mb-1">UPLOAD PAYMENT RECEIPT / SCREENSHOT</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPaymentProofFile(e.target.files[0]);
                          }
                        }}
                        className="w-full bg-black p-3 rounded-xl border border-yellow-500/50 text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full py-4 text-white font-black text-base rounded-xl transition shadow-lg ${
                        isSubmitting ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-500 cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? 'SUBMITTING...' : `✅ SUBMIT PAYMENT PROOF`}
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setPaymentInitiated(false); setShowQrModal(false); }}
                      className="text-xs text-gray-400 hover:underline block mx-auto cursor-pointer"
                    >
                      वापस जाएं
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-yellow-500/30 rounded-[2rem] p-6 bg-black shadow-2xl">
              <h3 className="text-center font-black text-yellow-500 mb-6 uppercase tracking-wider">Live Preview</h3>
              
              <div className="w-28 h-28 mx-auto mb-4 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500/20 to-black border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <span className="text-2xl font-black tracking-tighter text-yellow-500">STPL</span>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest mt-0.5">T10 LEAGUE</span>
              </div>
              
              <p className="text-center font-bold text-xl uppercase truncate">{formData.name || "PLAYER NAME"}</p>
              <p className="text-center text-yellow-500 font-mono text-sm mb-4">ID: PENDING APPROVAL</p>
              
              <div className="bg-white/5 p-4 rounded-xl text-xs space-y-2 border border-white/10 text-gray-300">
                <p><span className="text-gray-500">Category:</span> <span className="font-bold text-yellow-400 uppercase">{category || "---"}</span></p>
                <p><span className="text-gray-500">Role:</span> <span className="font-bold text-white">{formData.role || "---"}</span></p>
                <p><span className="text-gray-500">City:</span> <span className="font-bold text-white">{formData.trialCity || "---"}</span></p>
                <p><span className="text-gray-500">Mobile:</span> <span className="font-bold text-white">{formData.mobile || "---"}</span></p>
              </div>
            </div>
          </div>

        </div>

        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="max-w-md w-full bg-[#121212] border-2 border-yellow-500 rounded-3xl p-6 text-center shadow-[0_0_100px_rgba(234,179,8,0.6)] space-y-4 relative">
              <div className="flex justify-between items-center border-b border-yellow-500/30 pb-3">
                <h3 className="text-lg font-black text-yellow-500">SCAN & PAY</h3>
                <button 
                  onClick={() => setShowQrModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-500 font-bold flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-300">अपने PhonePe, Google Pay या Paytm से नीचे दिए गए QR कोड को स्कैन करें:</p>

              <div className="bg-black p-3 rounded-2xl border border-yellow-500/50 shadow-inner">
                <img src={pricing.qrImage} alt="STPL T10 QR Code" className="w-full rounded-xl object-contain" />
              </div>

              <button 
                onClick={() => setShowQrModal(false)}
                className="w-full py-3 bg-yellow-500 text-black font-black text-sm rounded-xl hover:bg-yellow-400 transition shadow-lg cursor-pointer uppercase"
              >
                DONE / CLOSE
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}