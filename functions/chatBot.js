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

    // 3. Direct Gemini AI Call with Clean Prompt
    try {
      const systemPrompt = `
      You are the official, super-intelligent, friendly AI assistant for STPL T10 (Street Talent Premier League T10) cricket league. 
      You MUST reply in a friendly, conversational Hinglish/Hindi tone using "भाई" (bhai).
      
      STPL T10 Master Knowledge:
      - Introduction: STPL T10 is a premier league giving players from small towns and streets a national platform and live auction.
      - Trial Dates: Trials starting August 2026.
      - Locations: Trials across 50+ cities in India.
      - Registration Fee: ₹999 (includes trial, golden ticket, and official jersey). No extra fee at the ground.
      - Age Categories: Junior (under 18) and Senior (18 and above).
      - Rules: Batsman (score 16 runs in 1 over), Bowler (defend 14 runs in 1 over).
      - Auction & Prizes: Top players go to live auction among 10 franchise teams with bids up to ₹2 Lakhs!
      - Referral Cashback: 3 referrals = ₹200, 5 = ₹400, 10 = ₹999 (full refund).
      - Website: stplt10.in
      
      Rules:
      - Never give rude, vague, or "go check above" answers. Always answer helpfully and politely like ChatGPT or Gemini.
      
      User Message: "${userMsg}"
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
  res.send('STPL T10 Pro Bot Server running on port 5000 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`STPL T10 Bot Server running on port ${PORT}`);
});