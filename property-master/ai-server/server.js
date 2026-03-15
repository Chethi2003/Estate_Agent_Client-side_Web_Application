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

// Load property data
const propertiesData = JSON.parse(
  fs.readFileSync("./properties.json", "utf-8")
);

// Extract the actual array
const properties = propertiesData.properties;

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    // Limit properties sent to AI
    const sampleProperties = properties.slice(0, 20);

    const prompt = `
You are an AI property assistant for the Grand Abode real estate platform.

A user is looking for a property.

User request:
${message}

Here are the available properties in the system:
${JSON.stringify(sampleProperties, null, 2)}

Your task:
- Recommend up to 3 properties that best match the user's request.
- Include the property type, bedrooms, price, location and URL.
- Only recommend properties from the provided list.
- Do NOT ask unnecessary questions.
- Be concise and helpful.
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {

    console.error("Gemini error:", error);

    if (error.status === 429) {
      return res.json({
        reply:
          "I'm receiving too many requests right now. Please wait about a minute and try again."
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