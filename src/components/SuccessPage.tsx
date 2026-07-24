export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#121212] border-2 border-yellow-500 rounded-3xl p-10 text-center shadow-[0_0_80px_rgba(234,179,8,0.5)] space-y-6">
        <div className="w-20 h-20 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-lg">
          🎉
        </div>
        <h2 className="text-3xl font-black text-yellow-500 tracking-tight">REGISTRATION SUBMITTED!</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          आपका रजिस्ट्रेशन और पेमेंट रसीद एडमिन के पास सफलतापूर्वक भेज दी गई है। अप्रूव होने के बाद आपकी **Login ID और Golden Ticket** आपके WhatsApp नंबर पर भेज दिया जाएगा।
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full py-4 bg-yellow-500 text-black font-black text-base rounded-xl hover:bg-yellow-400 transition shadow-lg cursor-pointer uppercase tracking-wider"
        >
          GO BACK TO HOME
        </button>
      </div>
    </div>
  );
}