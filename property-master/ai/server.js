import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});