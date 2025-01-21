import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const router = express.Router();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;  // Hugging Face API key stored in .env

// Utility function to convert Blob to Base64
const blobToBase64 = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
};

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from dalle routes' });
});

// In your backend (dalle.routes.js)
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Query the Hugging Face model
        const response = await fetch("https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage", {
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            throw new Error('Hugging Face API request failed');
        }

        const result = await response.blob();  // Get the image as a blob

        // Convert the blob to a base64 string
        const base64Image = await blobToBase64(result);

        // Return the base64 string of the image
        res.status(200).json({ photo: `data:image/png;base64,${base64Image}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
