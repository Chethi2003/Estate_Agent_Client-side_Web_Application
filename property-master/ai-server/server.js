import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://grandabode.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load property data
const propertiesData = JSON.parse(
  fs.readFileSync("./properties.json", "utf-8")
);

// Extract the actual array
const properties = propertiesData.properties;

const GREETING_WORDS = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening"
];

const SEARCH_KEYWORDS = [
  "property",
  "properties",
  "home",
  "homes",
  "house",
  "flat",
  "apartment",
  "bungalow",
  "villa",
  "penthouse",
  "studio",
  "budget",
  "price",
  "under",
  "below",
  "less",
  "max",
  "buy",
  "bedroom",
  "bedrooms",
  "bed",
  "find",
  "looking",
  "search"
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "around",
  "at",
  "below",
  "best",
  "for",
  "from",
  "home",
  "homes",
  "house",
  "i",
  "in",
  "is",
  "looking",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "properties",
  "property",
  "show",
  "than",
  "that",
  "the",
  "to",
  "under",
  "up",
  "with"
]);



function normalizeText(value = "") {
  return String(value).toLowerCase();
}

function parseAmount(value, suffix) {
  const numericValue = Number(String(value).replace(/,/g, ""));

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  if (suffix?.toLowerCase() === "k") {
    return numericValue * 1000;
  }

  if (suffix?.toLowerCase() === "m") {
    return numericValue * 1000000;
  }

  return numericValue;
}

function extractBudget(rawMessage) {
  const message = normalizeText(rawMessage);

  const contextualBudget = message.match(
    /(?:under|below|less than|max(?:imum)?|up to|budget(?: is| of)?|around|about)\s*[£]?\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(k|m))?/i
  );

  if (contextualBudget) {
    const amount = parseAmount(contextualBudget[1], contextualBudget[2]);
    return amount && amount >= 50000 ? amount : null;
  }

  const absoluteBudget = message.match(
    /[£]?\s*(\d{1,3}(?:,\d{3})+|\d{5,})(?:\s*(k|m))?/i
  );

  if (!absoluteBudget) {
    return null;
  }

  const amount = parseAmount(absoluteBudget[1], absoluteBudget[2]);
  return amount && amount >= 50000 ? amount : null;
}

function extractBedrooms(rawMessage) {
  const bedroomMatch = normalizeText(rawMessage).match(
    /(\d+)\s*(?:bed|beds|bedroom|bedrooms)\b/i
  );

  if (!bedroomMatch) {
    return null;
  }

  const bedrooms = Number(bedroomMatch[1]);
  return Number.isFinite(bedrooms) ? bedrooms : null;
}

function extractQueryTerms(rawMessage) {
  return normalizeText(rawMessage)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 1)
    .filter((term) => !STOP_WORDS.has(term))
    .filter((term) => !/^\d+$/.test(term));
}

function isPropertySearch(rawMessage) {
  const message = normalizeText(rawMessage);
  const hasKeyword = SEARCH_KEYWORDS.some((keyword) =>
    message.includes(keyword)
  );
  const hasConstraint =
    extractBudget(message) !== null ||
    /(\d+)\s*(?:bed|beds|bedroom|bedrooms)\b/i.test(message);
  const hasStrongIntent =
    /\b(property|properties|home|homes|house|flat|apartment|bungalow|villa|penthouse|studio|find|search|looking|buy)\b/i.test(
      message
    );

  return hasKeyword && (hasConstraint || hasStrongIntent);
}

function getRecommendedProperties(rawMessage, availableProperties) {
  if (!isPropertySearch(rawMessage)) {
    return [];
  }

  const budget = extractBudget(rawMessage);
  const bedrooms = extractBedrooms(rawMessage);
  const queryTerms = extractQueryTerms(rawMessage);

  let candidates = availableProperties.map((property) => {
    let score = 0;
    const location = normalizeText(property.location);
    const type = normalizeText(property.type);
    const postcode = (property.location.match(/\b[A-Z]{1,2}\d{1,2}\b/i)?.[0] || "").toLowerCase();

    if (budget !== null) {
      if (property.price <= budget) {
        score += 6;
      } else {
        score -= 4;
      }
    }

    if (bedrooms !== null) {
      if (property.bedrooms === bedrooms) {
        score += 4;
      } else if (property.bedrooms < bedrooms) {
        score += 1;
      } else {
        score -= 2;
      }
    }

    queryTerms.forEach((term) => {
      if (location.includes(term)) {
        score += 2;
      }

      if (type.includes(term)) {
        score += 2;
      }

      if (postcode && term === postcode) {
        score += 3;
      }
    });

    return { property, score };
  });

  if (budget !== null) {
    const underBudget = candidates.filter(
      ({ property }) => property.price <= budget
    );

    if (underBudget.length > 0) {
      candidates = underBudget;
    }
  }

  if (bedrooms !== null) {
    const exactBedrooms = candidates.filter(
      ({ property }) => property.bedrooms === bedrooms
    );

    if (exactBedrooms.length > 0) {
      candidates = exactBedrooms;
    }
  }

return candidates
  .sort(
    (a, b) =>
      b.score - a.score || a.property.price - b.property.price
  )
  .map(({ property }) => ({
      id: property.id,
      type: property.type,
      bedrooms: property.bedrooms,
      price: property.price,
      location: property.location,
      pageUrl: `/property/${property.id}`
    }));
}
function isGreeting(message) {
  const text = normalizeText(message);
  return GREETING_WORDS.some(word => text.includes(word));
}

app.post("/chat", async (req, res) => {
  try {
    const rawMessage =
      typeof req.body?.message === "string"
        ? req.body.message.trim()
        : "";

    if (!rawMessage) {
      return res.status(400).json({
        reply: "Please send a message so I can help you.",
        listings: []
      });
    }

    const recommendations = getRecommendedProperties(
      rawMessage,
      properties,
    );

    if (recommendations.length > 0) {
      const label =
        recommendations.length === 1 ? "property" : "properties";

      return res.json({
        reply: `I found ${recommendations.length} ${label} that match your request. Click a property below to open its details page.`,
        listings: recommendations
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    // Limit properties sent to AI
    const sampleProperties = properties.slice(0, 20);

    const prompt = `
You are an AI property assistant for the Grand Abode real estate platform.

User request:
${rawMessage}

Available properties:
${JSON.stringify(sampleProperties, null, 2)}

Rules:
- Recommend properties from the list.
- Return ONLY property IDs in JSON format.
- Example format:
{
  "properties": [1,4,7]
}

Do not include explanations or text.
`;

    const result = await model.generateContent(prompt);

    let aiText = result.response.text();

let recommendedIds = [];

try {
  const parsed = JSON.parse(aiText);
  recommendedIds = parsed.properties || [];
} catch (e) {
  console.error("AI JSON parse failed:", aiText);
}

const listings = properties
  .filter(p => recommendedIds.includes(p.id))
  .map(property => ({
    id: property.id,
    type: property.type,
    bedrooms: property.bedrooms,
    price: property.price,
    location: property.location,
    pageUrl: `/property/${property.id}`
  }));

res.json({
  reply: "Here are some properties that match your request:",
  listings
});

  } catch (error) {

    console.error("Gemini error:", error);

    if (error.status === 429) {
      return res.json({
        reply:
          "I'm receiving too many requests right now. Please wait about a minute and try again.",
        listings: []
      });
    }

    return res.json({
      reply: "Sorry, something went wrong with the AI service.",
      listings: []
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});