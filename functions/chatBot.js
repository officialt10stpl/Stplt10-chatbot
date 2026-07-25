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

// सुपर-स्मार्ट और व्यापक FAQ डिक्शनरी (छोटे-छोटे की-वर्ड्स और गपशप के साथ)
const staticFAQs = {
  // कैजुअल बातचीत
  "kaise ho": "अरे भाई, मैं एकदम मस्त हूँ! बताओ, STPL T10 में क्या मदद करूँ?",
  "kya haal hai": "सब बढ़िया भाई! आप बताओ, ट्रायल की तैयारी कैसी चल रही है?",
  "hello": "अरे हेलो भाई! स्वागत है STPL T10 में। ट्रायल या रजिस्ट्रेशन के बारे में क्या जानना चाहते हो?",
  "hi": "अरे भाई! बोलिए, क्या हाल-चाल और क्या मदद चाहिए?",
  "thanks": "अरे भाई, शुक्रिया किस बात का! बस मैदान पर आग लगा दो! 🔥",
  "thank you": "अरे भाई, शुक्रिया किस बात का! बस मैदान पर आग लगा दो! 🔥",

  // बैटिंग / बॉलिंग / ऑलराउंडर
  "bating": "🏏 बैट्समैन के लिए: 1 ओवर में 16 रन बनाने हैं। सफल होने पर सीधा Final Round में चयन!",
  "batting": "🏏 बैट्समैन के लिए: 1 ओवर में 16 रन बनाने हैं। सफल होने पर सीधा Final Round में चयन!",
  "run": "🏏 बैट्समैन को 1 ओवर में 16 रन बनाने हैं, और बॉलर को 14 रन डिफेंड करने हैं!",
  "bowling": "⚡ बॉलर के लिए: 1 ओवर में 14 रन डिफेंड करने हैं। सफल होने पर सीधा Final Round में चयन!",
  "boling": "⚡ बॉलर के लिए: 1 ओवर में 14 रन डिफेंड करने हैं। सफल होने पर सीधा Final Round में चयन!",
  "allrounder": "🌟 ऑलराउंडर के लिए: बैटिंग (16 रन) या बॉलिंग (14 रन डिफेंड) में से किसी एक में क्वालीफाई करना होगा।",

  // फीस और पेमेंट
  "fees": "💰 रजिस्ट्रेशन फीस मात्र ₹999 है, जिसमें ट्रायल, गोल्डेन टिकट और शानदार जर्सी मिलती है!",
  "fiis": "💰 रजिस्ट्रेशन फीस मात्र ₹999 है, जिसमें ट्रायल, गोल्डेन टिकट और शानदार जर्सी मिलती है!",
  "paisa": "💰 रजिस्ट्रेशन फीस ₹999 है। मैदान पर ट्रायल देने के लिए कोई एक्स्ट्रा फीस नहीं लगती।",
  "fee": "💰 रजिस्ट्रेशन फीस ₹999 है, जिसमें ट्रायल, गोल्डेन टिकट और जर्सी मिलती है!",

  // डेट और टाइम
  "date": "📅 ट्रायल्स August 2026 से शुरू होने वाले हैं। तैयारी पक्की रखो!",
  "kab": "📅 ट्रायल्स August 2026 से शुरू होने वाले हैं। तैयारी पक्की रखो!",
  "time": "⏰ ट्रायल्स सुबह से शुरू होंगे। सही समय आपके गोल्डेन टिकट पर लिखा होगा!",
  "start": "🚀 ट्रायल्स August 2026 से शुरू होंगे। stplt10.in पर जाकर जल्दी रजिस्टर करो!",

  // लोकेशन और शहर
  "kahan": "📍 ट्रायल्स भारत के विभिन्न राज्यों में 50+ शहरों के चुनिंदा ग्राउंड्स पर हो रहे हैं।",
  "city": "📍 ट्रायल्स 50+ शहरों में हो रहे हैं। अपना शहर या राज्य का नाम लिखकर पूछो!",
  "sher": "📍 ट्रायल्स 50+ शहरों में हो रहे हैं। अपना शहर या राज्य का नाम लिखकर पूछो!",
  "bahraich": "🏏 बहराइच में भी STPL T10 के ट्रायल्स की पूरी तैयारी है। अपनी सीट पक्की रखो!",

  // टिकट, जर्सी और किट
  "ticket": "🎫 गोल्डेन टिकट आपका ऑफिशियल ट्रायल पास है जिसे आप डैशबोर्ड से डाउनलोड कर सकते हैं!",
  "jersey": "👕 ट्रायल के दौरान आपको STPL की आधिकारिक जर्सी बिल्कुल फ्री दी जाएगी।",
  "kit": "🎒 खिलाड़ी अपनी व्यक्तिगत क्रिकेट किट (बैट, पैड आदि) साथ लेकर आएं। बॉल STPL की तरफ से मिलेगी!",

  // उम्र और आयु
  "age": "👦 Junior Category 18 साल से कम और 👨 Senior Category 18 साल से अधिक उम्र के खिलाड़ियों के लिए है।",
  "umar": "👦 Junior Category 18 साल से कम और 👨 Senior Category 18 साल से अधिक उम्र के खिलाड़ियों के लिए है।",

  // ऑक्शन और इनाम
  "auction": "🏆 Final राउंड के टॉप खिलाड़ियों का 10 फ्रेंचाइजी टीमों के बीच लाइव ऑक्शन होगा, जिसमें अधिकतम ₹2 लाख तक की बोली लग सकती है!",
  "prize": "🏆 ऑक्शन में खिलाड़ियों पर अधिकतम ₹2 लाख तक की बोली लग सकती है!",
  "teams": "👥 लीग में कुल 10 धमाकेदार फ्रेंचाइजी टीमें खेलेंगी!",

  // कैशबैक और रेफरल
  "cashback": "🎁 3 रेफरल पर ₹200, 5 पर ₹400 और 10 रेफरल पर ₹999 फुल रिफंड मिलता है!",
  "referral": "🔗 अपना रेफरल कोड दोस्तों के साथ शेयर करें, वे उसी से रजिस्टर करेंगे तो आपका कैशबैक बढ़ेगा।",

  // कंपनी परिचय
  "stpl": "🔥 STPL T10 छोटे शहरों और गालियों के क्रिकेटर्स को नेशनल मंच और ऑक्शन का मौका देने वाली सबसे बड़ी लीग है!"
};

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

    // 3. सुपर-स्मार्ट की-वर्ड मैचिंग (एक छोटा शब्द भी मैच होगा)
    for (let key in staticFAQs) {
      if (lowerMsg.includes(key.toLowerCase())) {
        return res.json({ reply: staticFAQs[key] });
      }
    }

    // 4. प्रो-लेवल जेमिनी AI फॉलबैक (जो कभी फेल नहीं होगा)
    try {
      const geminiPrompt = `
      तुम STPL T10 क्रिकेट लीग के आधिकारिक, बेहद जोशीले, स्मार्ट और दोस्ताना AI सहायक हो। 
      नियम:
      1. यूजर के सवाल का जवाब बिल्कुल छोटे, सटीक और हिंग्लिश/हिंदी के दोस्ताना अंदाज ("भाई" वाले टोन में, क्रिकेट के जोश के साथ) दो।
      2. कभी भी रोबोट की तरह लंबे पैराग्राफ या औपचारिकता मत लिखो।
      3. ट्रायल्स August 2026 से शुरू होंगे, बैट्समैन का चैलेंज 1 ओवर में 16 रन और बॉलर का 14 रन डिफेंड करना है। फीस ₹999 है। 
      4. अगर कोई आम बातचीत करे, तो एकदम मस्त और जीवंत जवाब दो।
      
      यूजर का सवाल या बात: "${userMsg}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: geminiPrompt,
      });

      const aiReply = response.text ? response.text.trim() : "अरे भाई, एकदम गजब सवाल पूछा! stplt10.in पर विजिट करो या WhatsApp सपोर्ट से जुड़ जाओ, सारी डिटेल मिल जाएगी!";
      return res.json({ reply: aiReply });

    } catch (aiError) {
      console.error("Gemini API Error:", aiError);
      return res.json({ 
        reply: `🏏 भाई, ${userMsg} के बारे में पूरी जानकारी के लिए वेबसाइट (stplt10.in) चेक करो या सपोर्ट टीम से बात करो!` 
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "कुछ गड़बड़ हो गई भाई, दोबारा ट्राई करो!" });
  }
});

app.get('/', (req, res) => {
  res.send('STPL T10 Bot Server running on port 5000 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`STPL T10 Bot Server running on port ${PORT}`);
});