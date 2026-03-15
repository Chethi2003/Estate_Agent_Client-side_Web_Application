import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const properties = JSON.parse(
  fs.readFileSync("./properties.json", "utf-8")
);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
  console.error("Gemini error:", error);

  if (error.status === 429) {
    return res.json({
      reply: "I'm receiving too many requests right now. Please wait about a minute and try again."
    });
  }

  return res.json({
    reply: "Sorry, something went wrong with the AI service."
  });
}
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});