const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { GoogleGenAI } = require('@google/genai');

initializeApp();
const db = getFirestore();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  try {
    const { message, mobileNumber } = req.body;
    const userMsg = message ? message.trim() : "";
    const lowerMsg = userMsg.toLowerCase();

    // 0. सुरक्षा फिल्टर
    if (lowerMsg.includes("आधार") || lowerMsg.includes("aadhaar") || lowerMsg.includes("adhar") || lowerMsg.includes("rrn") || lowerMsg.includes("mynumber")) {
      return res.json({ 
        reply: "भाई, अपनी संवेदनशील आईडी चैट में कभी भी सीधे टाइप मत करो! अपनी जानकारी पूरी तरह सुरक्षित रखो।" 
      });
    }

    // 1. पासवर्ड रिकवरी
    if (lowerMsg.includes("पासवर्ड") || lowerMsg.includes("password")) {
      return res.json({ 
        reply: "🔑 पासवर्ड के दो रास्ते हैं:\n1. अपनी सही डिटेल मुझे यहीं बताकर पासवर्ड ले लो।\n2. वेबसाइट के WhatsApp नंबर पर एडमिन से संपर्क कर लो।" 
      });
    }

    // 2. रेफरल स्टेटस चेक
    if (lowerMsg.includes("रेफरल") || lowerMsg.includes("referral") || lowerMsg.includes("cashback") || lowerMsg.includes("कैशबैक")) {
      if (!mobileNumber) {
        return res.json({ reply: "भाई, अपना रजिस्टर्ड मोबाइल नंबर या Reg ID बताओ, तभी तो चेक करके बता पाऊंगा!" });
      }
      const playerRef = await db.collection('players').where('mobile', '==', mobileNumber).get();
      if (!playerRef.empty) {
        const pData = playerRef.docs[0].data();
        return res.json({ reply: `🎯 भाई, आपके कुल सफल रेफरल ${pData.referralCount || 0} हैं। टारगेट पूरा होते ही कैशबैक मिल जाएगा!` });
      } else {
        return res.json({ reply: "❌ भाई, इस नंबर से कोई रजिस्ट्रेशन नहीं मिला। सही नंबर या Reg ID बताओ।" });
      }
    }

    // 3. 100% Direct Gemini AI with Complete Conversational Freedom
    try {
      const systemPrompt = `
      तुम STPL T10 (Street Talent Premier League T10) क्रिकेट लीग के आधिकारिक, सुपर-इंटेलिजेंट, जिंदादिल और दोस्ताना AI सहायक हो। तुम्हारा बात करने का अंदाज़ बिल्कुल Google Gemini या ChatGPT जैसा नेचुरल, हिंग्लिश/हिंदी में "भाई" वाले जोशीले और दोस्ताना टोन में होना चाहिए।
      
      STPL T10 की संपूर्ण मास्टर जानकारी (जो तुम्हें हमेशा याद रखनी है):
      - परिचय: STPL T10 छोटे शहरों, गाँवों और गली के क्रिकेटर्स को नेशनल मंच और लाइव ऑक्शन का मौका देने वाली सबसे बड़ी लीग है।
      - ट्रायल्स की तारीख: ट्रायल्स August 2026 से शुरू होंगे।
      - लोकेशन: भारत के विभिन्न राज्यों में 50+ शहरों के चुनिंदा ग्राउंड्स पर ट्रायल्स हो रहे हैं।
      - रजिस्ट्रेशन फीस: मात्र ₹999 है, जिसमें ट्रायल, गोल्डेन टिकट और STPL की आधिकारिक जर्सी मिलती है। मैदान पर ट्रायल देने के लिए कोई एक्स्ट्रा फीस नहीं लगती।
      - आयु वर्ग (Categories): Junior Category (18 साल से कम) और Senior Category (18 साल से अधिक)।
      - खेल के नियम (Challenges): बैट्समैन (1 ओवर में 16 रन), बॉलर (1 ओवर में 14 रन डिफेंड), ऑलराउंडर (किसी एक में क्वालीफाई)।
      - ऑक्शन और इनाम: Final राउंड के टॉप खिलाड़ियों का 10 फ्रेंचाइजी टीमों के बीच लाइव ऑक्शन होगा (अधिकतम ₹2 लाख तक की बोली)।
      - कैशबैक / ऑफर (Referral Cashback): 
        * 3 रेफरल पर ₹200 कैशबैक!
        * 5 रेफरल पर ₹400 कैशबैक!
        * 10 रेफरल पर ₹999 यानी पूरी फीस का फुल रिफंड!
      - आधिकारिक वेबसाइट: stplt10.in
      
      नियम:
      - कभी भी रोबोट की तरह यह मत कहो कि "वेबसाइट चेक करो और खतम"। हमेशा पूरी जानकारी प्यार और जोश के साथ समझाओ, और जरूरत पड़ने पर वेबसाइट (stplt10.in) या WhatsApp सपोर्ट का दोस्ताना तरीके से सुझाव दो।
      
      यूजर का संदेश: "${userMsg}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: systemPrompt,
      });

      const aiReply = response.text ? response.text.trim() : "अरे भाई, एकदम गजब सवाल पूछा! बताओ, इसमें और क्या जानना है?";
      return res.json({ reply: aiReply });

    } catch (aiError) {
      console.error("Gemini API Error:", aiError);
      return res.json({ 
        reply: `🏏 भाई, ${userMsg} के बारे में पूरी जानकारी के लिए हमारी वेबसाइट (stplt10.in) चेक करो या WhatsApp सपोर्ट से जुड़ जाओ!` 
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "कुछ गड़बड़ हो गई भाई, दोबारा ट्राई करो!" });
  }
});

app.get('/', (req, res) => {
  res.send('STPL T10 Master AI Bot Server running on port 5000 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`STPL T10 Bot Server running on port ${PORT}`);
});