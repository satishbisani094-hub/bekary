import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route: AI Chef critiques the custom cake specifications
  app.post('/api/ai/consult-cake', async (req, res) => {
    try {
      const { sponge, frosting, tiers, toppings, message, size } = req.body;

      if (!sponge || !frosting) {
        return res.status(400).json({
          error: 'Missing parameters. Sponge and frosting types are essential.'
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback mock Chef Pierre response if API key is not supplied
        console.warn('GEMINI_API_KEY is not defined. Responding with pre-formulated Chef Pierre critique.');
        return res.json({
          critique: `Bonjour! I am Chef Pierre. Ah, your choice of ${sponge} sponge layered with beautiful ${frosting} frosting is absolutely delightful! Topped with ${toppings && toppings.length > 0 ? toppings.join(', ') : 'minimalist sugar curls'} on a ${size} tier layout, it shows a charming palate. My expert Parisian advice: add a whisper of dark orange liqueur to the sponge, and perhaps a dusting of raw Madagascar vanilla powder to elevate the notes. Truly, a masterpiece in the making! Bon appétit!`
        });
      }

      // Initialize real Google Gen AI client following SKILL.md guidelines
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const userPrompt = `
        A customer wants to order a custom cake with these exact parameters:
        - Sponge flavor: ${sponge}
        - Frosting type: ${frosting}
        - Cake Tiers: ${tiers}
        - Layer Weight: ${size}
        - Included Toppings: ${toppings && toppings.length > 0 ? toppings.join(', ') : 'none'}
        - Custom Icing message written on top: "${message || 'none'}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: 'You are Chef Pierre, the Head Parisian Master Baker at L\'Étoile Boulangerie. You are critically reviewing a custom cake idea submitted by a customer. Give a detailed, polite, humorous, Parisian-style expert critique of their choice of sponge, frosting, toppings, and overall design. Recommend custom gourmet additions (e.g., a splash of Grand Marnier, real gold leaf, or crystallized marigold petals) that would make the cake absolute Michelin quality. Keep your feedback under 160 words, warm, elegant and exceptionally professional. Wrap your critique with a "Chef Pierre Evaluation Score" out of 10.'
        }
      });

      const critiqueText = response.text || 'Chef Pierre is speechless at your magnificent creation!';
      return res.json({ critique: critiqueText });

    } catch (err: any) {
      console.error('Gemini Chef Pierre API Error:', err);
      return res.status(500).json({
        error: 'Chef Pierre got dust in his flour and is coughing! Please retry in a moment.',
        details: err.message
      });
    }
  });

  // Client static assets & dev/prod runtime handler
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server initiated. Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
