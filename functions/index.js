const express = require('express');
const cors = require('cors');
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// ==========================================
// 1. ADVANCED ALL-ROUNDER SEARCH & CHAT API
// ==========================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, mobileNumber } = req.body;
    const userMsg = message ? message.trim() : "";
    const lowerMsg = userMsg.toLowerCase();

    // सुरक्षा फिल्टर
    if (lowerMsg.includes("आधार") || lowerMsg.includes("aadhaar") || lowerMsg.includes("adhar") || lowerMsg.includes("rrn") || lowerMsg.includes("mynumber")) {
      return res.json({ 
        reply: "भाई, अपनी संवेदनशील आईडी चैट में कभी भी सीधे टाइप मत करो! अपनी जानकारी पूरी तरह सुरक्षित रखो।" 
      });
    }

    // पासवर्ड रिकवरी
    if (lowerMsg.includes("पासवर्ड") || lowerMsg.includes("password")) {
      return res.json({ 
        reply: "🔑 पासवर्ड के दो रास्ते हैं:\n1. अपनी सही डिटेल यहीं बताकर पासवर्ड ले लो।\n2. वेबसाइट के WhatsApp नंबर पर एडमिन से संपर्क कर लो।" 
      });
    }

    // =========================================================================
    // 🎯 SMART REFERRAL & REG ID LOOKUP
    // =========================================================================
    const isReferralQuery = lowerMsg.includes("रेफरल") || lowerMsg.includes("referral") || lowerMsg.includes("cashback") || lowerMsg.includes("कैशबैक") || userMsg.startsWith("STPL") || userMsg.includes("stpl-");

    if (isReferralQuery) {
      let targetId = mobileNumber;
      const stplMatch = userMsg.match(/stpl-[a-z0-9]+/i) || userMsg.match(/stpl[a-z0-9]+/i);
      if (stplMatch) {
        targetId = stplMatch[0].toUpperCase();
      }

      if (!targetId) {
        return res.json({ reply: "भाई, अपना रजिस्टर्ड मोबाइल नंबर या अपनी Reg ID (जैसे STPL-XXXXXX) यहाँ लिखकर भेजो, तभी तो डेटाबेस से चेक कर पाऊंगा!" });
      }

      let playerDoc = null;
      const queryByGenId = await db.collection('players').where('generatedId', '==', targetId).get();
      if (!queryByGenId.empty) {
        playerDoc = queryByGenId.docs[0].data();
      } else {
        const queryByMobile = await db.collection('players').where('mobile', '==', targetId).get();
        if (!queryByMobile.empty) {
          playerDoc = queryByMobile.docs[0].data();
        }
      }

      if (playerDoc) {
        const referralsSnapshot = await db.collection('players')
          .where('referredBy', '==', playerDoc.generatedId)
          .get();

        let referredNames = [];
        referralsSnapshot.forEach(doc => {
          referredNames.push(doc.data().name);
        });

        return res.json({ 
          reply: `🎯 भाई ${playerDoc.name}!\n🆔 Reg ID: ${playerDoc.generatedId}\n👥 कुल सफल रेफरल: ${referralsSnapshot.size} (${referredNames.length > 0 ? referredNames.join(', ') : 'अभी कोई नहीं'})` 
        });
      } else {
        return res.json({ reply: `❌ भाई, "${targetId}" से हमारे डेटाबेस में कोई रजिस्ट्रेशन नहीं मिला। कृपया अपनी सही Reg ID या मोबाइल नंबर दर्ज करें।` });
      }
    }

    // =========================================================================
    // 2. ULTIMATE GEMINI AI SEARCH & REASONING (कसम से कभी ये नहीं कहेगा कि वेबसाइट पर जाओ)
    // =========================================================================
    try {
      const systemPrompt = `
      You are an elite, world-class, super-intelligent AI assistant for STPL T10, acting just like ChatGPT or Google Gemini. 
      You have deep knowledge of everything in the universe—science, history, studies, current affairs, tech, sports, coding, and general knowledge.
      
      STPL T10 Core Facts:
      - Trials start August 2026 across 50+ cities.
      - Registration fee: ₹999 (includes trial, golden ticket, and official jersey).
      - Rules: Batsman (16 runs in 1 over), Bowler (defend 14 runs in 1 over).
      - Auction: Top players get picked by 10 franchise teams with bids up to ₹2 Lakhs!
      - Referral Cashback: 3 referrals = ₹200, 5 = ₹400, 10 = ₹999 (full refund).
      - Website: stplt10.in
      
      CRITICAL INSTRUCTIONS:
      1. NEVER tell the user to "go check the website" or give lazy/rude answers. You are the AI, so YOU must provide the complete information right here in the chat.
      2. If a user asks about anything in the world (even outside STPL), use your vast intelligence to give a brilliant, detailed, and accurate answer.
      3. Maintain a friendly, conversational, energetic Hinglish/Hindi tone using "भाई" (bhai).
      
      User Message: "${userMsg}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: systemPrompt,
      });

      const aiReply = response.text ? response.text.trim() : "अरे भाई, सवाल गजब है! पर लग रहा है दिमाग पर जोर ज्यादा पड़ गया, जरा दोबारा पूछो!";
      return res.json({ reply: aiReply });

    } catch (aiError) {
      console.error("Gemini API Error:", aiError);
      return res.json({ 
        reply: `भाई, ${userMsg} का जवाब ढूंढने में नेटवर्क का चक्कर आ गया था। एक बार फिर से पूछो, पूरी डिटेल बताता हूँ!` 
      });
    }

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "कुछ गड़बड़ हो गई भाई, दोबारा ट्राई करो!" });
  }
});

// ==========================================
// 3. ADMIN API: PLAYER DETAILS & REFERRAL HISTORY
// ==========================================
app.post('/api/admin/player-details', async (req, res) => {
  try {
    const { adminSecret, playerId } = req.body;
    
    if (adminSecret !== "STPL_ADMIN_2026") {
      return res.status(403).json({ error: "Unauthorized access!" });
    }

    const playerDoc = await db.collection('players').doc(playerId).get();
    if (!playerDoc.exists) {
      return res.status(404).json({ error: "Player not found!" });
    }
    const playerData = playerDoc.data();

    const referralsSnapshot = await db.collection('players')
      .where('referredBy', '==', playerData.generatedId)
      .get();

    let referredList = [];
    referralsSnapshot.forEach(doc => {
      const refData = doc.data();
      referredList.push({
        name: refData.name,
        mobile: refData.mobile,
        generatedId: refData.generatedId,
        paymentStatus: refData.paymentStatus || 'Pending'
      });
    });

    return res.json({
      success: true,
      player: playerData,
      referrals: referredList,
      totalReferrals: referredList.length
    });

  } catch (error) {
    console.error("Admin API Error:", error);
    res.status(500).json({ error: "Server error!" });
  }
});

// ==========================================
// 4. RAZORPAY WEBHOOK
// ==========================================
exports.handleRazorpayWebhook = onRequest(async (req, res) => {
    try {
        const event = req.body.event;
        const paymentEntity = req.body.payload?.payment?.entity;

        if (!paymentEntity) {
            return res.status(400).send('Invalid payload');
        }

        if (event === 'payment.captured') {
            const notes = paymentEntity.notes || {};
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const generatedId = `STPL2026${randomNum}`;

            await db.collection('players').add({
                name: notes.name || 'Unknown',
                email: paymentEntity.email || '',
                mobile: paymentEntity.contact || '',
                state: notes.state || '',
                city: notes.city || '',
                category: notes.category || '',
                referredBy: notes.referredBy || 'Direct',
                generatedId: generatedId,
                referralCount: 0,
                paymentStatus: 'paid',
                transactionId: paymentEntity.id,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log(`Player saved successfully with ID: ${generatedId}`);
            return res.status(200).send('Success');
        }

        return res.status(200).send('Event ignored');
    } catch (error) {
        console.error("Error in Razorpay Webhook:", error);
        return res.status(500).send('Internal Server Error');
    }
});

exports.api = onRequest(app);