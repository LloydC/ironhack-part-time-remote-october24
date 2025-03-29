require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/place-details', async (req, res) => {
    const { place_id } = req.query;
    if (!place_id) return res.status(400).json({ error: 'place_id is required' });

    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;
        // const response = await axios.get(url);
        const url = `https://places.googleapis.com/v1/places/${place_id}`
        const response = await axios.get(url, {
            headers: {
                'X-Goog-Api-Key': apiKey, 
                'Content-Type': 'application/json', 
                "X-Goog-FieldMask": "displayName,formattedAddress"
            }
        });
        if (response.status !== 200) {
            return res.status(response.status).json({ error: 'Failed to fetch place details' });
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));