import { useState } from 'react';

const locationData: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Chandigarh": ["Chandigarh"],
  "Delhi": ["New Delhi", "South Delhi", "East Delhi"],
  "Goa": ["Panaji", "Margao"],
  "Gujarat": ["Ahmedabad", "Surat", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Dharamshala"],
  "Jammu&Kashmir": ["Jammu", "Srinagar",],
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
  "Telangana": ["Hyderabad", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Gorakhpur", "Agra", "Meerut"],
  "Uttarakhand": ["Dehradun", "Haridwar"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur"]
};

export default function TrialCities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredStates = Object.keys(locationData).filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    locationData[state].some(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mt-32 min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-black mb-6">PAN-INDIA <span className="text-yellow-500">TRIALS</span></h2>
        <input 
          type="text" 
          placeholder="Search state or city..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-white/[0.05] border border-white/10 p-4 rounded-xl focus:border-yellow-500 outline-none text-center"
        />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredStates.map(state => (
          <button 
            key={state}
            onClick={() => setSelectedState(state)}
            className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-yellow-500 hover:bg-yellow-500/10 transition-all font-bold text-lg"
          >
            {state}
          </button>
        ))}
      </div>

      {/* Pop-up Modal */}
      {selectedState && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-[#111] border border-yellow-500/50 p-8 rounded-3xl w-full max-w-sm">
            <h3 className="text-2xl font-black text-yellow-500 mb-6">{selectedState}</h3>
            <ul className="space-y-3 mb-8">
              {locationData[selectedState].map(city => (
                <li key={city} className="text-gray-300 border-b border-white/5 pb-2">{city}</li>
              ))}
            </ul>
            <button 
              onClick={() => setSelectedState(null)} 
              className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}