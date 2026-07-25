const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

exports.handleRazorpayWebhook = onRequest(async (req, res) => {
    try {
        const event = req.body.event;
        const paymentEntity = req.body.payload?.payment?.entity;

        if (!paymentEntity) {
            return res.status(400).send('Invalid payload');
        }

        if (event === 'payment.captured') {
            const notes = paymentEntity.notes || {};
            
            // एक यूनिक प्लेयर आईडी जनरेट करना (जैसे STPL20261234)
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const generatedId = `STPL2026${randomNum}`;

            // Firestore में डेटा सेव करना (चैटबॉट के साथ पूरी तरह मैच खाता हुआ)
            await db.collection('players').add({
                name: notes.name || 'Unknown',
                email: paymentEntity.email || '',
                mobile: paymentEntity.contact || '', // 'phone' की जगह 'mobile' किया ताकि चैटबॉट से मैच हो
                state: notes.state || '',
                city: notes.city || '',
                category: notes.category || '', // Junior या Senior
                referredBy: notes.referredBy || 'Direct', // किसने रेफर किया
                generatedId: generatedId, // खिलाड़ी की खुद की Reg ID
                referralCount: 0, // शुरुआती रेफरल काउंट
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