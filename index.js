const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;

// --- IMPORTANT --- 
// 1. Initialize Firebase Admin SDK
// You need to create a service account in your Firebase project and download the JSON key.
// Go to Project Settings > Service accounts > Generate new private key.
// Save the downloaded JSON file in your project (e.g., as 'serviceAccountKey.json')
// and make sure to add it to your .gitignore file to keep it private!

const serviceAccount = require('./serviceAccountKey.json'); // Replace with your file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- API Endpoints ---

// Endpoint to get all products from Firestore
app.get('/api/products', async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Endpoint to get a single product by ID from Firestore
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productDoc = await db.collection('products').doc(productId).get();

    if (!productDoc.exists) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.json({ id: productDoc.id, ...productDoc.data() });
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// --- One-Time Seed Endpoint ---
// Call this once to populate your database with initial data.
app.get('/api/seed-database', async (req, res) => {
  const initialProducts = [
    { name: 'Laptop', price: 5000 },
    { name: 'Smartphone', price: 2500 },
    { name: 'Headphones', price: 300 },
  ];

  try {
    const batch = db.batch();
    initialProducts.forEach(product => {
      const docRef = db.collection('products').doc(); // Auto-generates an ID
      batch.set(docRef, product);
    });
    await batch.commit();
    res.status(200).send('Database seeded successfully!');
  } catch (error) {
    console.error("Error seeding database: ", error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
