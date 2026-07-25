import { useEffect, useState, useMemo } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

interface Player {
  id: string;
  name: string;
  mobile: string;
  paymentStatus: string;
  generatedId?: string;
  state: string;
  city: string;
  loginPassword?: string;
  photo?: string;
  transactionId?: string;
  paymentReceipt?: string;
  category?: number | string; 
  age?: number;
  approvedByAdmin?: boolean;
  createdAt: any;
  email?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  dob?: string;
  feePaid?: number;
  referredBy?: string;
  totalReferrals?: number;
  currentCycleReferrals?: number;
}

export default function AdminPanel() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  const fetchPlayers = async () => {
    const q = query(collection(db, "players"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const playerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Player[];
    setPlayers(playerList);
  };

  useEffect(() => { if (isLoggedIn) fetchPlayers(); }, [isLoggedIn]);

  const deletePlayer = async (id: string) => { 
    if (confirm("Delete this player?")) { 
      await deleteDoc(doc(db, "players", id)); 
      fetchPlayers(); 
    } 
  };

  // 📊 सारे खिलाड़ियों की एक्सेल शीट डाउनलोड करने का फंक्शन
  const exportToExcel = () => {
    try {
      if (players.length === 0) {
        alert("डाटाबेस में कोई खिलाड़ी नहीं मिला!");
        return;
      }

      const dataList = players.map(p => {
        // उस प्लेयर के कोड से कितने लोगों ने रजिस्टर किया है उनकी लिस्ट निकालना
        const referredList = players.filter(ref => ref.referredBy && p.generatedId && ref.referredBy.toLowerCase().trim() === p.generatedId.toLowerCase().trim());
        
        return {
          "Registration ID": p.generatedId || "N/A",
          "Player Name": p.name || "N/A",
          "Mobile": p.mobile || "N/A",
          "Category": p.category || (p.age && p.age < 18 ? 'Junior' : 'Senior'),
          "State": p.state || "N/A",
          "City": p.city || "N/A",
          "Role": p.role || "N/A",
          "Fee Paid": p.feePaid || 999,
          "Transaction ID": p.transactionId || "N/A",
          "Payment Status": p.paymentStatus || "N/A",
          "Referred By": p.referredBy || "Direct",
          "Total Referrals Count": referredList.length,
          "Referred Players Names": referredList.map(r => r.name).join(', ') || "None",
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(dataList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "STPL Players List");

      XLSX.writeFile(workbook, "STPL_Players_Data.xlsx");
    } catch (error) {
      console.error("Error exporting to excel:", error);
      alert("फाइल डाउनलोड करने में समस्या आई है।");
    }
  };

  // WhatsApp भेजने का मुख्य फंक्शन
  const sendWhatsAppMessage = (player: Player) => {
    if (!player.generatedId || !player.loginPassword) {
      alert("Error: Player ID and Password not found!");
      return;
    }

    const paidAmount = player.feePaid || 999;
    const referralCode = player.generatedId;

    const message = `Hello ${player.name}, 🎉 Congratulations! Your payment of ₹${paidAmount} for STPL T10 League has been approved by Admin.\n\nYour Login Credentials:\n🆔 Reg ID: ${player.generatedId}\n🔑 Password: ${player.loginPassword}\n\n🎁 Your Referral Code: ${referralCode}\n(Share this code with your friends when they register!)\n\nYou can now login and download your Golden Ticket from https://stplt10.in !`;
    
    const whatsappUrl = `https://wa.me/91${player.mobile}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // एडमिन अप्रूव करने पर आईडी-पासवर्ड जनरेट होगा
  const approvePlayer = async (player: Player) => {
    const newId = `STPL-${player.name.slice(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
    const randomPassword = Math.random().toString(36).slice(-6); 

    await updateDoc(doc(db, "players", player.id), {
      generatedId: newId,
      loginPassword: randomPassword,
      paymentStatus: 'Paid',
      approvedByAdmin: true
    });

    fetchPlayers();

    const updatedPlayer: Player = { ...player, generatedId: newId, loginPassword: randomPassword };
    sendWhatsAppMessage(updatedPlayer);
  };

  const viewReceipt = (base64Image?: string) => {
    if (!base64Image) {
      alert("No receipt uploaded by the player.");
      return;
    }
    const win = window.open();
    win?.document.write(`<iframe src="${base64Image}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`);
  };

  const pendingPlayers = useMemo(() => {
    return players.filter(p => !p.approvedByAdmin || p.paymentStatus === 'Pending' || p.paymentStatus === 'pending');
  }, [players]);

  const approvedPlayers = useMemo(() => {
    return players.filter(p => p.approvedByAdmin === true && (p.paymentStatus === 'Paid' || p.paymentStatus === 'paid'));
  }, [players]);

  const categoryPlayers = useMemo(() => {
    if (!selectedCategory) return [];
    return approvedPlayers.filter(p => {
      const cat = p.category || (p.age && p.age < 18 ? 'Junior' : 'Senior');
      return String(cat).toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [approvedPlayers, selectedCategory]);

  const states = useMemo(() => Array.from(new Set(categoryPlayers.map(p => p.state))).filter(Boolean), [categoryPlayers]);

  const stateCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    categoryPlayers.forEach(p => { if (p.state) counts[p.state] = (counts[p.state] || 0) + 1; });
    return counts;
  }, [categoryPlayers]);

  const cityCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    categoryPlayers
      .filter(p => p.state === selectedState)
      .forEach(p => {
        const cityKey = p.city || "Other / Unspecified";
        counts[cityKey] = (counts[cityKey] || 0) + 1;
      });
    return counts;
  }, [categoryPlayers, selectedState]);

  const filteredPlayers = useMemo(() => {
    return categoryPlayers
      .filter(p => p.state === selectedState)
      .filter(p => (p.city || "Other / Unspecified") === selectedCity)
      .filter(p => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const nameMatch = p.name.toLowerCase().includes(query);
        const idMatch = p.generatedId && p.generatedId.toLowerCase().includes(query);
        const referralMatch = p.referredBy && p.referredBy.toLowerCase().includes(query);

        return nameMatch || idMatch || referralMatch;
      });
  }, [categoryPlayers, selectedState, selectedCity, searchQuery]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4">
        <input type="password" placeholder="ADMIN PASSWORD" onChange={(e) => setPassword(e.target.value)} className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4 text-white text-center outline-none focus:border-yellow-500"/>
        <button onClick={() => password === "SVPSTPLt10@" && setIsLoggedIn(true)} className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black cursor-pointer">LOGIN</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-4 md:px-10 relative z-0">
      
      {/* शीर्ष पर एक्सेल डाउनलोड बटन */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
        <div>
          <h3 className="font-bold text-yellow-500">📥 Data Management</h3>
          <p className="text-xs text-gray-400">Download complete player database with referrals in Excel.</p>
        </div>
        <button 
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-500 text-white font-black px-6 py-3 rounded-xl transition cursor-pointer shadow-lg flex items-center gap-2 text-sm"
        >
          📊 Download Excel Sheet
        </button>
      </div>

      {/* टॉप टैब: अप्रूव्ड प्लेयर्स vs पेंडिंग अप्रूवल */}
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-3 rounded-2xl font-black cursor-pointer transition ${activeTab === 'approved' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white border border-white/10'}`}
        >
          🏆 Approved Players ({approvedPlayers.length})
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 rounded-2xl font-black cursor-pointer transition relative ${activeTab === 'pending' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white border border-white/10'}`}
        >
          ⏳ Pending Approvals ({pendingPlayers.length})
          {pendingPlayers.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">!</span>}
        </button>
      </div>

      {activeTab === 'pending' ? (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-yellow-500 mb-6 uppercase">Pending Payment Verifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingPlayers.length > 0 ? (
              pendingPlayers.map((p) => (
                <div key={p.id} className="bg-white/[0.03] p-6 rounded-3xl border border-yellow-500/30 shadow-xl space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <p className="text-xs text-gray-400">City: <span className="text-yellow-400">{p.city}, {p.state}</span></p>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl text-xs space-y-1 font-mono">
                    <p className="text-gray-400">Mobile: <span className="text-white">{p.mobile}</span></p>
                    <p className="text-gray-400">Role: <span className="text-white">{p.role}</span></p>
                    <p className="text-gray-400">Fee Paid: <strong className="text-green-400">₹{p.feePaid || 999}</strong></p>
                    <p className="text-gray-400">UTR / Txn ID: <strong className="text-yellow-400">{p.transactionId || "Not Provided"}</strong></p>
                    <p className="text-gray-400">Referred By: <span className="text-yellow-400 font-bold">{p.referredBy || "Direct"}</span></p>
                  </div>
                  
                  {p.paymentReceipt && (
                    <button 
                      onClick={() => viewReceipt(p.paymentReceipt)}
                      className="w-full py-2 bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      👁️ View Payment Receipt
                    </button>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => approvePlayer(p)} 
                      className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl transition cursor-pointer text-sm"
                    >
                      ✅ APPROVE & SEND WHATSAPP
                    </button>
                    <button 
                      onClick={() => deletePlayer(p.id)} 
                      className="px-4 py-3 bg-white/5 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition cursor-pointer text-sm"
                    >
                      REJECT
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 font-bold">
                No pending approval requests right now.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {!selectedCategory && (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-black text-yellow-500 mb-10 text-center uppercase tracking-wider">SELECT PLAYER CATEGORY</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button 
                  onClick={() => { setSelectedCategory('Junior'); setSelectedState(null); setSelectedCity(null); }}
                  className="p-8 bg-white/5 border-2 border-yellow-500 rounded-3xl text-center hover:bg-yellow-500 hover:text-black transition-all group shadow-xl cursor-pointer"
                >
                  <div className="text-2xl font-black uppercase mb-2">🟢 JUNIOR CATEGORY</div>
                  <div className="text-sm text-yellow-400 group-hover:text-black font-mono font-bold">
                    {approvedPlayers.filter(p => String(p.category || (p.age && p.age < 18 ? 'Junior' : 'Senior')).toLowerCase() === 'junior').length} Players Approved
                  </div>
                </button>

                <button 
                  onClick={() => { setSelectedCategory('Senior'); setSelectedState(null); setSelectedCity(null); }}
                  className="p-8 bg-white/5 border-2 border-blue-500 rounded-3xl text-center hover:bg-blue-600 hover:text-white transition-all group shadow-xl cursor-pointer"
                >
                  <div className="text-2xl font-black uppercase mb-2">🔵 SENIOR CATEGORY</div>
                  <div className="text-sm text-blue-400 group-hover:text-white font-mono font-bold">
                    {approvedPlayers.filter(p => String(p.category || (p.age && p.age < 18 ? 'Junior' : 'Senior')).toLowerCase() === 'senior').length} Players Approved
                  </div>
                </button>
              </div>
            </div>
          )}

          {selectedCategory && !selectedState && (
            <div>
              <button onClick={() => setSelectedCategory(null)} className="text-yellow-500 mb-6 font-bold hover:underline cursor-pointer">← BACK TO CATEGORIES</button>
              <h1 className="text-3xl font-black text-yellow-500 mb-10 text-center uppercase">SELECT STATE FOR {selectedCategory} ({categoryPlayers.length} Total)</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {states.length > 0 ? (
                  states.map(s => (
                    <button 
                      key={s} 
                      onClick={() => { setSelectedState(s); setSelectedCity(null); setSearchQuery(""); }} 
                      className="p-6 bg-white/5 border border-yellow-500 rounded-2xl text-left hover:bg-yellow-500 hover:text-black transition-all group cursor-pointer"
                    >
                      <div className="text-xl font-bold uppercase">{s}</div>
                      <div className="text-sm text-yellow-400 group-hover:text-black mt-2 font-mono">
                        {stateCounts[s] || 0} Registrations
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-gray-500 py-10 text-center">No states found in this category yet.</div>
                )}
              </div>
            </div>
          )}

          {selectedCategory && selectedState && !selectedCity && (
            <div>
              <button onClick={() => setSelectedState(null)} className="text-yellow-500 mb-6 font-bold hover:underline cursor-pointer">← BACK TO STATES</button>
              <h1 className="text-3xl font-black text-yellow-500 mb-10 uppercase">SELECT TRIAL CITY IN {selectedState.toUpperCase()}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(cityCounts).length > 0 ? (
                  Object.keys(cityCounts).map(city => (
                    <button 
                      key={city} 
                      onClick={() => { setSelectedCity(city); setSearchQuery(""); }} 
                      className="p-6 bg-white/5 border border-blue-500 rounded-2xl text-left hover:bg-blue-600 hover:text-white transition-all group cursor-pointer"
                    >
                      <div className="text-xl font-bold uppercase">{city}</div>
                      <div className="text-sm text-blue-400 group-hover:text-white mt-2 font-mono">
                        {cityCounts[city]} Players
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-gray-500 py-10">No trial cities found for this state yet.</div>
                )}
              </div>
            </div>
          )}

          {selectedCategory && selectedState && selectedCity && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <button onClick={() => setSelectedCity(null)} className="text-yellow-500 mb-2 font-bold hover:underline cursor-pointer">← BACK TO CITIES</button>
                  <h1 className="text-3xl font-black text-yellow-500 uppercase">{selectedCity} ({filteredPlayers.length} Players)</h1>
                </div>
                
                <div className="w-full md:w-96">
                  <input 
                    type="text" 
                    placeholder="Search by Name, ID or Referral Code..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 bg-white/5 border border-yellow-500/40 rounded-2xl text-white outline-none focus:border-yellow-500 transition text-sm"
                  />
                  <p className="text-[10px] text-gray-400 mt-1 pl-2">💡 Tip: Type a player's Reg ID to see who they referred.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((p) => {
                    // 🔍 इस खिलाड़ी के Reg ID से किन-किन लोगों ने रजिस्टर किया है, उनकी सूची निकालना
                    const playerReferrals = players.filter(ref => 
                      ref.referredBy && p.generatedId && 
                      ref.referredBy.toLowerCase().trim() === p.generatedId.toLowerCase().trim()
                    );

                    return (
                      <div key={p.id} className="bg-white/[0.03] p-6 rounded-3xl border border-white/10 hover:border-yellow-500 transition-all shadow-xl space-y-4">
                        <div className="flex items-center gap-4">
                          <img src={p.photo || "https://ui-avatars.com/api/?name=" + p.name} className="w-16 h-16 rounded-2xl object-cover border border-yellow-500/50" />
                          <div>
                            <h3 className="text-lg font-black">{p.name}</h3>
                            <p className="text-blue-400 font-mono text-xs">{p.generatedId}</p>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-400 font-mono">
                          <p>📱 <span className="text-white ml-2">{p.mobile}</span></p>
                          <p>🔑 <span className="text-white ml-2">{p.loginPassword}</span></p>
                          <p>💳 <span className="text-white ml-2">{p.transactionId || "N/A"}</span></p>
                          <p>💰 <span className="text-green-400 ml-2 font-bold">₹{p.feePaid || 999}</span></p>
                          <p>🎁 <span className="text-yellow-400 ml-2 font-bold">Referred By: {p.referredBy || "Direct"}</span></p>
                        </div>

                        {/* 👥 यहाँ प्लेयर कार्ड पर सीधा रेफरल नंबर और उनके नाम दिखेंगे */}
                        <div className="bg-black/30 p-3 rounded-2xl border border-white/5 space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-gray-400">👥 Total Referrals:</span>
                            <span className="text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full font-mono">
                              {playerReferrals.length} Players
                            </span>
                          </div>
                          {playerReferrals.length > 0 ? (
                            <div className="text-[11px] text-gray-300 mt-2 max-h-20 overflow-y-auto space-y-1 font-mono">
                              {playerReferrals.map((ref, idx) => (
                                <div key={idx} className="bg-white/5 px-2 py-1 rounded flex justify-between">
                                  <span>{idx + 1}. {ref.name}</span>
                                  <span className="text-green-400">{ref.generatedId || "Joined"}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-gray-500 italic mt-1">No referrals yet.</p>
                          )}
                        </div>

                        <button 
                          onClick={() => sendWhatsAppMessage(p)}
                          className="w-full py-2 bg-green-600/20 text-green-400 border border-green-500/50 hover:bg-green-600 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
                        >
                          💬 Send WhatsApp Details Again
                        </button>

                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 py-2 rounded-xl font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 text-xs">
                            APPROVED
                          </button>
                          <button onClick={() => deletePlayer(p.id)} className="px-4 py-2 bg-white/5 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs">DELETE</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500 font-bold text-lg">
                    No approved players found matching your search.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}