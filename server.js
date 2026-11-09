import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.post("/api/chat", async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        error: "Tekoälyä ei ole vielä yhdistetty. Lisää OPENAI_API_KEY .env-tiedostoon."
      });
    }

    const messages = req.body.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
      return res.status(400).json({ error: "Viestihistoria ei kelpaa." });
    }

    const safeMessages = messages
      .filter(m => ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));

    const response = await openai.responses.create({
      model: "gpt-6-astra",
      instructions: "Olet ystävällinen, hyödyllinen ja selkeä suomenkielinen tekoälyavustaja. Vastaa käyttäjän kielellä.",
      input: safeMessages
    });

    res.json({ reply: response.output_text || "En saanut muodostettua vastausta." });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Vastauksen hakeminen epäonnistui. Yritä hetken päästä uudelleen." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Sivusto käynnissä: http://localhost:${port}`));
