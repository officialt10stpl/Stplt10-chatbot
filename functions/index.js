const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.handleRazorpayWebhook = onRequest(async (req, res) => {
    // Razorpay से आने वाला डेटा
    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
        try {
            await db.collection('players').add({
                name: payload.notes.name,
                email: payload.email,
                state: payload.notes.state,
                phone: payload.contact,
                paymentStatus: 'paid',
                transactionId: payload.id,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            return res.status(200).send('Success');
        } catch (error) {
            console.error("Error writing to Firestore:", error);
            return res.status(500).send('Error');
        }
    }
    res.status(200).send('Event ignored');
});