import { useState, useEffect } from 'react';

// 1. src/assets फोल्डर से इमेजेज इम्पोर्ट करना
import surendraImg from '../assets/surendra.jpeg';
import vivekImg from '../assets/vivek.jpeg';
import pramodImg from '../assets/pramod.jpeg';

// 2. 1000+ अलग-अलग शहरों और नामों की बड़ी डेटा लिस्ट (लाइव टोस्ट के लिए)
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
  { name: "पंकज कुमार", city: "बाराबंकी", time: "2 मिनट पहले" },
  { name: "ऋषभ शुक्ला", city: "उन्नाव", time: "अभी-अभी" },
  { name: "आकाश सोनी", city: "कानपुर देहात", time: "4 मिनट पहले" },
  { name: "धीरज सिंह", city: "फतेहपुर", time: "अभी-अभी" },
  { name: "अमित पाल", city: "बांदा", time: "1 मिनट पहले" },
  { name: "संदीप गौतम", city: "चित्रकूट", time: "अभी-अभी" },
  { name: "सुनील कुमार", city: "हमीरपुर", time: "3 मिनट पहले" },
  { name: "अजय निषाद", city: "जालौन", time: "अभी-अभी" },
  { name: "विजय वर्मा", city: "झांसी", time: "2 मिनट पहले" },
  { name: "रोहित यादव", city: "ललितपुर", time: "अभी-अभी" },
  { name: "मोहित गुप्ता", city: "महोबा", time: "5 मिनट पहले" },
  { name: "शशांक शेखर", city: "इटावा", time: "अभी-अभी" },
  { name: "अमित चौहान", city: "औरैया", time: "1 मिनट पहले" },
  { name: "सौरभ सिंह", city: "फर्रुखाबाद", time: "अभी-अभी" },
  { name: "विपिन कुमार", city: "कन्नौज", time: "3 मिनट पहले" },
  { name: "सचिन यादव", city: "मैनपुरी", time: "अभी-अभी" },
  { name: "अमित वर्मा", city: "हरदोई", time: "2 मिनट पहले" },
  { name: "राहुल सिंह", city: "शाहजहांपुर", time: "अभी-अभी" },
  { name: "नितिन रस्तोगी", city: "पीलीभीत", time: "4 मिनट पहले" },
  { name: "आशीष अग्रवाल", city: "मुरादाबाद", time: "अभी-अभी" },
  { name: "मयंक सैनी", city: "बिजनौर", time: "1 मिनट पहले" },
  { name: "प्रदीप कुमार", city: "रामपुर", time: "अभी-अभी" },
  { name: "तरुण शर्मा", city: "अमरोहा", time: "3 मिनट पहले" },
  { name: "इमरान खान", city: "संभल", time: "अभी-अभी" },
  { name: "सुमित सैनी", city: "सहारनपुर", time: "2 मिनट पहले" },
  { name: "गौरव राणा", city: "मुजफ्फरनगर", time: "अभी-अभी" },
  { name: "विनीत पुंडीर", city: "शामली", time: "5 मिनट पहले" },
  { name: "अक्षय त्यागी", city: "गाजियाबाद", time: "अभी-अभी" },
  { name: "सचिन नागर", city: "गौतम बुद्ध नगर", time: "1 मिनट पहले" },
  { name: "राहुल भाटी", city: "बुंदेलखंड", time: "अभी-अभी" },
  { name: "अंकित कसाना", city: "हापुड़", time: "3 मिनट पहले" },
  { name: "दीपक तोमर", city: "बागपत", time: "अभी-अभी" },
  { name: "प्रशांत शर्मा", city: "बुलंदशहर", time: "2 मिनट पहले" },
  { name: "अमित डागर", city: "अलीगढ़", time: "अभी-अभी" },
  { name: "सोनू वार्ष्णेय", city: "हाथरस", time: "4 मिनट पहले" },
  { name: "विष्णु बघेल", city: "एटा", time: "अभी-अभी" },
  { name: "गोविंद ठाकुर", city: "कासगंज", time: "1 मिनट पहले" },
  { name: "मनीष पोरवाल", city: "मथुरा", time: "अभी-अभी" },
  { name: "योगेश चौधरी", city: "फिरोजाबाद", time: "3 मिनट पहले" },
  { name: "अनुराग दुबे", city: "मऊ", time: "अभी-अभी" },
  { name: "शशिकांत सिंह", city: "बलिया", time: "2 मिनट पहले" },
  { name: "अभिषेक राय", city: "गाजीपुर", time: "अभी-अभी" },
  { name: "चंदन चौबे", city: "चंदौली", time: "5 मिनट पहले" },
  { name: "विशाल सोनकर", city: "भदोही", time: "अभी-अभी" },
  { name: "दीपक विश्वकर्मा", city: "मिर्ज़ापुर", time: "1 मिनट पहले" },
  { name: "राजेश कोल", city: "सोंभद्र", time: "अभी-अभी" },
  { name: "संतोष सिंह", city: "कुशीनगर", time: "3 मिनट पहले" },
  { name: "राजेश गोंड", city: "देवरिया", time: "अभी-अभी" },
  { name: "अमरजीत यादव", city: "महराजगंज", time: "2 मिनट पहले" },
  { name: "रविन्द्र नाथ", city: "सिद्धार्थनगर", time: "अभी-अभी" },
  { name: "संतोष कुमार", city: "संत कबीर नगर", time: "4 मिनट पहले" },
  { name: "मनोज तिवारी", city: "अंबेडकर नगर", time: "अभी-अभी" },
  { name: "दिनेश यादव", city: "अमेठी", time: "1 मिनट पहले" },
  { name: "राकेश मौर्या", city: "प्रतापगढ़", time: "अभी-अभी" },
  { name: "संतोष वर्मा", city: "कौशाम्बी", time: "3 मिनट पहले" },
  { name: "रमेश पटेल", city: "फतेहपुर", time: "अभी-अभी" },
  { name: "सुरेश यादव", city: "सीतापुर", time: "2 मिनट पहले" },
  { name: "महेश कुमार", city: "उन्नाव", time: "अभी-अभी" },
  { name: "धर्मेन्द्र सिंह", city: "लखीमपुर", time: "5 मिनट पहले" },
  { name: "राजेश वर्मा", city: "हरदोई", time: "अभी-अभी" },
  { name: "सुशील कुमार", city: "दिल्ली", time: "1 मिनट पहले" },
  { name: "अमित सिंह", city: "मुंबई", time: "अभी-अभी" },
  { name: "विक्रम राठौड़", city: "जयपुर", time: "3 मिनट पहले" },
  { name: "कुलदीप सिंह", city: "चंडीगढ़", time: "अभी-अभी" },
  { name: "हरविंदर सिंह", city: "लुधियाना", time: "2 मिनट पहले" },
  { name: "गुरप्रीत सिंह", city: "अमृतसर", time: "अभी-अभी" },
  { name: "मनप्रीत सिंह", city: "जालंधर", time: "4 मिनट पहले" },
  { name: "रोहित शर्मा", city: "पटना", time: "अभी-अभी" },
  { name: "मनीष कुमार", city: "मुजफ्फरपुर", time: "1 मिनट पहले" },
  { name: "अंडू पासवान", city: "भागलपुर", time: "अभी-अभी" },
  { name: "विकास झा", city: "दरभंगा", time: "3 मिनट पहले" },
  { name: "सूरज कुमार", city: "पूर्णिया", time: "अभी-अभी" },
  { name: "सत्यजीत रे", city: "कोलकाता", time: "2 मिनट पहले" },
  { name: "अमित बनर्जी", city: "हावड़ा", time: "अभी-अभी" },
  { name: "सौम्य दास", city: "दुर्गापुर", time: "5 मिनट पहले" },
  { name: "राहुल सेन", city: "सिलिगुड़ी", time: "अभी-अभी" },
  { name: "सचिन रेड्डी", city: "हैदराबाद", time: "1 मिनट पहले" },
  { name: "किरण राव", city: "वारंगल", time: "अभी-अभी" },
  { name: "वेंकटेश प्रसाद", city: "विशाखापत्तनम", time: "3 मिनट पहले" },
  { name: "रमेश बाबू", city: "विजयवाड़ा", time: "अभी-अभी" },
  { name: "सुरेश कुमार", city: "चेन्नई", time: "2 मिनट पहले" },
  { name: "कार्थिक राजन", city: "कोयंबटूर", time: "अभी-अभी" },
  { name: "अश्विन कुमार", city: "मुरैना", time: "4 मिनट पहले" },
  { name: "दिनेश कार्तिक", city: "मदुरै", time: "अभी-अभी" },
  { name: "संजू सैमसन", city: "कोच्चि", time: "1 मिनट पहले" },
  { name: "राहुल नायर", city: "तिरुवनंतपुरम", time: "अभी-अभी" },
  { name: "विराट कोहली", city: "बेंगलुरु", time: "3 मिनट पहले" },
  { name: "केएल राहुल", city: "मैसूर", time: "अभी-अभी" },
  { name: "मयंक अग्रवाल", city: "हुबली", time: "2 मिनट पहले" },
  { name: "हार्दिक पंड्या", city: "अहमदाबाद", time: "अभी-अभी" },
  { name: "जसप्रीत बुमराह", city: "सूरत", time: "5 मिनट पहले" },
  { name: "सूर्यकुमार यादव", city: "वडोदरा", time: "अभी-अभी" },
  { name: "रवींद्र जडेजा", city: "राजकोट", time: "1 मिनट पहले" },
  { name: "ऋषभ पंत", city: "देहरादून", time: "अभी-अभी" },
  { name: "सुरेश रैना", city: "हरिद्वार", time: "3 मिनट पहले" },
  { name: "मनीष पांडे", city: "नैनीताल", time: "अभी-अभी" },
  { name: "कुलदीप यादव", city: "कानपुर", time: "2 मिनट पहले" },
  { name: "इशांत शर्मा", city: "दिल्ली", time: "अभी-अभी" },
  { name: "शिखर धवन", city: "दिल्ली", time: "4 मिनट पहले" },
  { name: "भुवनेश्वर कुमार", city: "मेरठ", time: "अभी-अभी" },
  { name: "प्रवीण कुमार", city: "मेरठ", time: "1 मिनट पहले" },
  { name: "पीयूष चावला", city: "मुरादाबाद", time: "अभी-अभी" },
  { name: "आरपी सिंह", city: "रायबरेली", time: "3 मिनट पहले" },
  { name: "मोहम्मद कैफ", city: "इलाहाबाद", time: "अभी-अभी" },
  { name: "आकाशदीप सिंह", city: "भोपाल", time: "2 मिनट पहले" },
  { name: "राजेंद्र सिंह", city: "इंदौर", time: "अभी-अभी" },
  { name: "नितिन गडकरी", city: "नागपुर", time: "4 मिनट पहले" },
  { name: "संजय राउत", city: "पुणे", time: "अभी-अभी" },
  { name: "प्रकाश पाटिल", city: "नाशिक", time: "1 मिनट पहले" },
  { name: "विजय पाटिल", city: "कोल्हापुर", time: "अभी-अभी" },
  { name: "महेश राव", city: "अमरावती", time: "3 मिनट पहले" },
  { name: "अनिल कुलकर्णी", city: "सोलापूर", time: "अभी-अभी" },
  { name: "संतोष जोशी", city: "उज्जैन", time: "2 मिनट पहले" },
  { name: "दिलीप मेवाड़ा", city: "ग्वालियर", time: "अभी-अभी" },
  { name: "संदीप परमार", city: "जबलपुर", time: "5 मिनट पहले" },
  { name: "मनोज वर्मा", city: "सागर", time: "अभी-अभी" },
  { name: "कमल जैन", city: "रतलाम", time: "1 मिनट पहले" },
  { name: "राजेश अहिरवार", city: "खजुराहो", time: "अभी-अभी" },
  { name: "अमित बाफना", city: "उदयपुर", time: "3 मिनट पहले" },
  { name: "सुनील शर्मा", city: "जोधपुर", time: "अभी-अभी" },
  { name: "नवीन गहलोत", city: "कोटा", time: "2 मिनट पहले" },
  { name: "राकेश व्यास", city: "बीकानेर", time: "अभी-अभी" },
  { name: "महेंद्र सिंह", city: "अजमेर", time: "4 मिनट पहले" },
  { name: "गणेश पुरोहित", city: "बाड़मेर", time: "अभी-अभी" },
  { name: "भेरू सिंह", city: "पाली", time: "1 मिनट पहले" },
  { name: "किशन प्रजापति", city: "भीलवाड़ा", time: "अभी-अभी" },
  { name: "सुरेश गुर्जर", city: "अलवर", time: "3 मिनट पहले" },
  { name: "धर्मेन्द्र सैनी", city: "सीकर", time: "अभी-अभी" },
  { name: "राजेंद्र जाट", city: "झुंझुनू", time: "2 मिनट पहले" },
  { name: "विकास खटीक", city: "भरतपुर", time: "अभी-अभी" },
  { name: "सत्यनारायण शर्मा", city: "धौलपुर", time: "5 मिनट पहले" },
  { name: "अशोक कुमार", city: "चुरु", time: "अभी-अभी" },
  { name: "रमेश नायक", city: "श्रीगंगानगर", time: "1 मिनट पहले" },
  { name: "प्रताप सिंह", city: "हनुमानगढ़", time: "अभी-अभी" },
  { name: "हरिओम गुप्ता", city: "मथुरा", time: "3 मिनट पहले" },
  { name: "योगेश शर्मा", city: "अलीगढ़", time: "अभी-अभी" },
  { name: "विनीत चौहान", city: "हाथरस", time: "2 मिनट पहले" },
  { name: "संजय वार्ष्णेय", city: "इटावा", time: "अभी-अभी" },
  { name: "अतुल पोरवाल", city: "औरैया", time: "4 मिनट पहले" }
];

// 3. लीडरशिप टीम डेटा
const managementTeam = [
  { 
    name: "Surendra Maurya", 
    role: "Founder & CEO", 
    image: surendraImg,
    opinion: "STPL T10 के संस्थापक के रूप में मेरा दृढ़ संकल्प है कि देश के गली-मोहल्लों और ग्रामीण अंचलों में छुपी हुई कच्ची खेल प्रतिभाओं को एक ऐसा भव्य और सुरक्षित राष्ट्रीय मंच प्रदान किया जाए, जहाँ वे अपनी अद्वितीय काबिलियत को दुनिया के सामने प्रदर्शित कर सकें। हमारा यह मंच केवल एक खेल प्रतियोगिता नहीं है, बल्कि यह उन हज़ारों महत्वाकांक्षी युवाओं के सपनों को एक नई उड़ान देने का माध्यम है जो अपनी मेहनत के दम पर सीधे ऑक्शन तक पहुँचकर एक पेशेवर और स्वर्णिम क्रिकेट करियर का निर्माण करना चाहते हैं।"
  },
  { 
    name: "Vivek Maurya", 
    role: "Head of Technology & Operations", 
    image: vivekImg,
    opinion: "हमने इस लीग के डिजिटल और तकनीकी ढांचे को इस प्रकार से डिजाइन किया है कि खिलाड़ियों के शुरुआती रजिस्ट्रेशन से लेकर उनकी लाइव ट्रैकिंग और डेटा वेरिफिकेशन तक की हर प्रक्रिया पूरी तरह से पारदर्शी, सुरक्षित और निर्बाध बनी रहे। आज के इस डिजिटल युग में हमारा यह प्रयास है कि प्रत्येक खिलाड़ी को एक वर्ल्ड-क्लास यूजर एक्सपीरियंस मिले, ताकि किसी भी युवा को तकनीकी कठिनाइयों का सामना न करना पड़े और पूरा मैनेजमेंट सिस्टम पूरी तरह से ऑटोमेटेड और आधुनिक तरीके से कार्य कर सके।"
  },
  { 
    name: "Pramod Maurya", 
    role: "Director", 
    image: pramodImg,
    opinion: "हमारा संपूर्ण प्रबंधन इस बात पर पूरी तरह केंद्रित है कि मैदान पर होने वाले हर एक ट्रायल और फ्रेंचाइजी मैचों के दौरान अनुशासन, निष्पक्षता और उच्च कोटि के ग्राउंड ऑपरेशंस को सुनिश्चित किया जाए। सभी 10 बड़ी फ्रेंचाइजी टीमों के रणनीतिक विकास और खिलाड़ियों के बेहतर मार्गदर्शन के लिए हम एक ऐसा मजबूत ढांचा तैयार कर रहे हैं जो आने वाले समय में टेनिस-बॉल क्रिकेट के इतिहास में एक नया मील का पत्थर साबित होगा और हर मैच को रोमांचक बनाएगा।"
  }
];

// 4. Live Toast Popup Component
function LiveToast() {
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

// 5. Hero Component
function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-20"> 
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0B0B0B]"></div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
          <span className="text-yellow-400 tracking-[0.3em] font-extrabold uppercase text-xs md:text-sm">STPL T10 Season 1 • Official Trials</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-2xl">
          FROM STREETS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">TO SPOTLIGHT</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-semibold tracking-[0.2em] uppercase text-gray-300">
          <span className="text-yellow-400">Dream</span> <span className="text-yellow-500/50 mx-3">•</span> 
          <span className="text-yellow-400">Perform</span> <span className="text-yellow-500/50 mx-3">•</span> 
          <span className="text-yellow-400">Get Auctioned</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <button className="px-9 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold rounded-full hover:scale-105 transition-all shadow-[0_0_35px_rgba(234,179,8,0.5)] uppercase text-sm" onClick={() => window.open('/register', '_blank')}>🏏 Register For Trials</button>
          <button className="px-9 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase text-sm shadow-xl" onClick={() => window.open('/sponsors?openForm=true', '_blank')}>🤝 Become a Sponsor</button>
        </div>
      </div>
    </section>
  );
}

// 6. Leadership Marquee Section (बड़ी फोटोज के साथ)
function LeadershipMarquee() {
  const extendedTeam = [...managementTeam, ...managementTeam, ...managementTeam];

  return (
    <section className="py-24 px-6 bg-[#0B0B0B] overflow-hidden">
      <div className="text-center mb-16">
        <span className="bg-yellow-500/10 text-yellow-400 text-xs font-black px-4 py-1.5 rounded-full border border-yellow-500/30 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(234,179,8,0.2)]">Executive Board & Vision</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">
          Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">In Motion</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-medium">The visionary minds steering STPL T10 toward unprecedented success.</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {extendedTeam.map((leader, i) => (
            <div key={i} className="w-[380px] md:w-[420px] group bg-[#121212] border border-white/10 rounded-[2.5rem] p-8 hover:border-yellow-500/55 transition-all duration-500 flex flex-col justify-between shadow-xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all"></div>
              <div>
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-yellow-500 blur-md opacity-40 group-hover:opacity-80 transition duration-500"></div>
                  <img src={leader.image} alt={leader.name} className="relative w-32 h-32 mx-auto rounded-full object-cover border-4 border-yellow-500 shadow-2xl bg-black" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black text-white tracking-wide">{leader.name}</h3>
                  <p className="text-xs text-yellow-400 font-mono tracking-widest uppercase mt-1 font-bold">{leader.role}</p>
                </div>
                <div className="relative bg-black/40 border border-white/5 rounded-2xl p-5 text-gray-300 text-xs md:text-sm font-medium leading-relaxed italic">
                  <span className="text-yellow-400 text-2xl font-serif absolute -top-2 left-3">“</span>{leader.opinion}<span className="text-yellow-400 text-2xl font-serif absolute -bottom-4 right-3">”</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <span className="text-[10px] text-gray-500 tracking-widest uppercase font-bold">STPL T10 Official Executive</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Snake-Style Player Journey Component (सांप जैसी लहराती हुई जिग-जैग डिजाइन)
function SnakePlayerJourney() {
  const journeySteps = [
    { n: "01", t: "Online Registration", d: "Fill form & secure your slot" },
    { n: "02", t: "Trials in 50+ Cities", d: "Showcase skills in front of experts" },
    { n: "03", t: "Second Chance Trial", d: "An extra chance if you missed out" },
    { n: "04", t: "Selected Shortlist", d: "Official merit list announcement" },
    { n: "05", t: "Live Player Auction", d: "Franchise owners bid for your talent" },
    { n: "06", t: "10 Franchise Teams", d: "Join squad camps & get custom kit" },
    { n: "07", t: "STPL T10 Season 1", d: "The grand tournament begins" },
    { n: "08", t: "Championship Final", d: "Lift the trophy & claim glory" },
  ];

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto overflow-hidden relative">
      <div className="text-center mb-20 px-6">
        <div className="inline-block px-8 py-2 mb-6 border border-yellow-500/30 rounded-full bg-yellow-500/5 backdrop-blur-md">
          <span className="text-yellow-400 font-black tracking-[0.5em] uppercase text-xs md:text-sm">The Path To Glory</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6">
          Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Journey</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-medium">
          Follow the winding snake-like trail from a local street cricketer to a national champion.
        </p>
      </div>

      <div className="relative flex flex-col gap-12">
        {journeySteps.map((item, i) => {
          const isLeft = i % 2 === 0;
          const snakeAlign = isLeft ? "md:translate-x-0" : "md:translate-x-32";

          return (
            <div 
              key={i} 
              className={`relative w-full md:w-[60%] group transition-all duration-700 hover:scale-105 ${snakeAlign}`}
            >
              <div className="relative bg-[#121212] border border-white/10 rounded-[2.5rem] p-8 hover:border-yellow-500/60 transition-all duration-500 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all"></div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-400 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] shrink-0">
                    {item.n}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-wide group-hover:text-yellow-400 transition-colors">{item.t}</h4>
                    <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed mt-1">{item.d}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 8. Trial Registration Banner Component
function TrialRegistrationBanner() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-75 transition duration-1000"></div>
        
        <div className="relative bg-[#0F0F0F] border border-yellow-500/30 p-10 md:p-16 rounded-[2.5rem] text-center overflow-hidden shadow-2xl">
          <h3 className="text-yellow-400 font-black tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Official Announcement</h3>
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
            Player Registration For Trials <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Are Now OPEN</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 max-w-lg mx-auto font-medium leading-relaxed">
            Secure your slot for trials in 50+ cities across India. Limited spots available — first come, first served.
          </p>

          <button 
            onClick={() => window.open('/register', '_blank')} 
            className="px-11 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black rounded-full text-base hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.5)] cursor-pointer tracking-wider uppercase"
          >
            🚀 Register Now
          </button>
        </div>
      </div>
    </section>
  );
}

// 9. Main Home Page
export default function Home() {
  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen selection:bg-yellow-500 selection:text-black relative">
      <Hero />
      
      {/* Mentor Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto mb-20 px-4">
          <div className="text-center mb-8">
            <span className="bg-yellow-500/10 text-yellow-400 text-xs font-black px-4 py-1.5 rounded-full border border-yellow-500/30 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(234,179,8,0.2)]">STPL Legend Mentor</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-3 uppercase tracking-wide">
              हमारे ऑफिशियल <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">मेंटर</span>
            </h3>
          </div>

          <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-b from-yellow-500/50 via-transparent to-yellow-500/20 hover:from-yellow-400 transition-all duration-500 shadow-2xl">
            <div className="bg-[#121212] p-8 rounded-[2.4rem] text-center relative z-10">
              <div className="relative w-32 h-32 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-yellow-500 blur-md opacity-40 group-hover:opacity-80 transition duration-500"></div>
                <img src="/mentor.png" alt="Dilshan Munaweera" className="relative w-32 h-32 mx-auto rounded-full object-cover border-4 border-yellow-500 shadow-2xl" />
              </div>
              <h4 className="text-2xl font-black text-white tracking-wide">Dilshan Munaweera</h4>
              <p className="text-sm text-yellow-400 font-mono mt-1 font-bold tracking-widest uppercase">Chief Mentor</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Former Sri Lankan Cricketer</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-yellow-400 font-bold tracking-[0.4em] uppercase mb-3 text-xs md:text-sm">The League Advantages</h3>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Built For Champions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "50+ Trial Cities", d: "Pan-India massive presence", icon: "📍" },
            { t: "10 Franchise Teams", d: "Professional national squads", icon: "🏆" },
            { t: "Professional Trials", d: "Evaluated by expert coaches", icon: "⚡" },
            { t: "Second Chance", d: "Extra opportunity to shine", icon: "🔄" },
            { t: "Player Auction", d: "Live televised bidding event", icon: "💰" },
            { t: "OTT Streaming", d: "Nationwide digital broadcast", icon: "📺" },
            { t: "2L+ Audience", d: "Massive online & offline reach", icon: "👥" },
            { t: "T10 Format", d: "Fast, explosive cricket action", icon: "🏏" },
          ].map((item, i) => (
            <div key={i} className="group relative p-8 bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-yellow-500/60 hover:bg-yellow-500/[0.03] transition-all duration-500 hover:-translate-y-2 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-all"></div>
              <div className="text-4xl mb-6 p-4 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-yellow-500/40 transition-colors">{item.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2 tracking-wide">{item.t}</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Marquee Section */}
      <LeadershipMarquee />

      {/* Snake-Style Player Journey */}
      <SnakePlayerJourney />

      {/* Trial Registration Banner Section */}
      <TrialRegistrationBanner />

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-3">Support Hub</h3>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Who can register for STPL T10?", a: "Any Indian player aged 16+ with a passion for tennis ball cricket. Registration is open across all 50+ trial cities." },
            { q: "Is there a registration fee?", a: "Yes, there is a nominal processing fee of ₹999 which includes your official trial pass (Golden Ticket), jersey, and ground infrastructure costs." },
            { q: "What is the Second Chance Trial?", a: "An exclusive extra opportunity provided for players who missed initial selection or want another shot to impress selectors." },
            { q: "How does the player auction work?", a: "Selected top players enter the final auction pool where 10 franchise team owners bid live for them based on performance metrics." },
          ].map((faq, i) => (
            <div key={i} className="group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all shadow-lg">
              <details className="p-6 cursor-pointer">
                <summary className="text-base md:text-lg font-bold text-white flex justify-between items-center outline-none select-none">
                  {faq.q}
                  <span className="text-yellow-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 font-medium">{faq.a}</p>
              </details>
            </div>
          ))}
        </div>
      </section>

      <LiveToast />
    </div>
  );
}