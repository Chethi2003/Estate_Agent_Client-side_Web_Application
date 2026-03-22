import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://grandabode.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ---------------- PROPERTY DATA ---------------- */

const propertiesData = JSON.parse(
  fs.readFileSync("./properties.json", "utf-8")
);

const properties = propertiesData.properties;

/* ---------------- WORD LISTS ---------------- */

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

const PROPERTY_TYPE_RULES = [
  {
    key: "semi-detached",
    pattern: /\bsemi[-\s]?detached\b/i,
    matches: (type) => type.includes("semi-detached")
  },
  {
    key: "detached",
    pattern: /\bdetached\b/i,
    matches: (type) =>
      type.includes("detached") && !type.includes("semi-detached")
  },
  {
    key: "terraced",
    pattern: /\bterraced?\b/i,
    matches: (type) => type.includes("terraced")
  },
  {
    key: "house",
    pattern: /\bhouses?\b/i,
    matches: (type) => type.includes("house")
  },
  {
    key: "flat",
    pattern: /\bflats?\b/i,
    matches: (type) => type.includes("flat")
  },
  {
    key: "apartment",
    pattern: /\bapartments?\b/i,
    matches: (type) => type.includes("apartment")
  },
  {
    key: "bungalow",
    pattern: /\bbungalows?\b/i,
    matches: (type) => type.includes("bungalow")
  },
  {
    key: "villa",
    pattern: /\bvillas?\b/i,
    matches: (type) => type.includes("villa")
  },
  {
    key: "penthouse",
    pattern: /\bpenthouses?\b/i,
    matches: (type) => type.includes("penthouse")
  },
  {
    key: "studio",
    pattern: /\bstudios?\b/i,
    matches: (type) => type.includes("studio")
  }
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

/* ---------------- HELPERS ---------------- */

function normalizeText(value = "") {
  return String(value).toLowerCase();
}

function isGreeting(message) {
  const text = normalizeText(message);
  return GREETING_WORDS.some((word) => text.includes(word));
}

function parseAmount(value, suffix) {
  const numericValue = Number(String(value).replace(/,/g, ""));

  if (!Number.isFinite(numericValue)) return null;

  if (suffix?.toLowerCase() === "k") return numericValue * 1000;
  if (suffix?.toLowerCase() === "m") return numericValue * 1000000;

  return numericValue;
}

function extractBudget(rawMessage) {
  const message = normalizeText(rawMessage);

  const contextualBudget = message.match(
    /(?:under|below|less than|max|up to|budget|around|about)\s*[£]?\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(k|m))?/i
  );

  if (contextualBudget) {
    return parseAmount(contextualBudget[1], contextualBudget[2]);
  }

  const absoluteBudget = message.match(
    /[£]?\s*(\d{1,3}(?:,\d{3})+|\d{5,})(?:\s*(k|m))?/i
  );

  if (!absoluteBudget) return null;

  return parseAmount(absoluteBudget[1], absoluteBudget[2]);
}

function extractBedrooms(rawMessage) {
  const match = normalizeText(rawMessage).match(
    /(\d+)\s*(?:bed|beds|bedroom|bedrooms)\b/i
  );

  if (!match) return null;

  return Number(match[1]);
}

function extractQueryTerms(rawMessage) {
  return normalizeText(rawMessage)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 1)
    .filter((term) => !STOP_WORDS.has(term))
    .filter((term) => !/^\d+$/.test(term));
}

function extractRequestedTypes(rawMessage) {
  const message = normalizeText(rawMessage);
  const requestedTypes = new Set();

  PROPERTY_TYPE_RULES.forEach((rule) => {
    if (rule.pattern.test(message)) {
      requestedTypes.add(rule.key);
    }
  });

  const hasSpecificHouseType =
    requestedTypes.has("semi-detached") ||
    requestedTypes.has("detached") ||
    requestedTypes.has("terraced");

  if (hasSpecificHouseType) {
    requestedTypes.delete("house");
  }

  return Array.from(requestedTypes);
}

function propertyMatchesRequestedTypes(propertyType, requestedTypes) {
  if (requestedTypes.length === 0) return true;

  const normalizedType = normalizeText(propertyType);

  return PROPERTY_TYPE_RULES.some((rule) => {
    if (!requestedTypes.includes(rule.key)) return false;
    return rule.matches(normalizedType);
  });
}

/* ---------------- SEARCH DETECTION ---------------- */

function isPropertySearch(rawMessage) {
  const message = normalizeText(rawMessage);

  const hasKeyword = SEARCH_KEYWORDS.some((keyword) =>
    message.includes(keyword)
  );

  const hasBudget = extractBudget(message) !== null;
  const hasBedrooms =
    /(\d+)\s*(?:bed|beds|bedroom|bedrooms)\b/i.test(message);
  const hasPropertyType = extractRequestedTypes(message).length > 0;

  return hasKeyword || hasBudget || hasBedrooms || hasPropertyType;
}

/* ---------------- PROPERTY MATCHING ---------------- */

function getRecommendedProperties(rawMessage, availableProperties) {
  if (!isPropertySearch(rawMessage)) return [];

  const budget = extractBudget(rawMessage);
  const bedrooms = extractBedrooms(rawMessage);
  const requestedTypes = extractRequestedTypes(rawMessage);
  const queryTerms = extractQueryTerms(rawMessage);

  let candidates = availableProperties
    .filter((property) => {
      if (budget !== null && property.price > budget) return false;
      if (bedrooms !== null && property.bedrooms !== bedrooms) return false;

      return propertyMatchesRequestedTypes(property.type, requestedTypes);
    })
    .map((property) => {
    let score = 0;

    const location = normalizeText(property.location);
    const type = normalizeText(property.type);

    if (budget !== null) score += 5;
    if (bedrooms !== null) score += 4;
    if (requestedTypes.length > 0) score += 4;

    queryTerms.forEach((term) => {
      if (location.includes(term)) score += 2;
      if (type.includes(term)) score += 2;
    });

    return { property, score };
  });

  candidates = candidates.sort((a, b) => b.score - a.score);

  return candidates.slice(0, 5).map(({ property }) => ({
    id: property.id,
    type: property.type,
    bedrooms: property.bedrooms,
    price: property.price,
    location: property.location,
    pageUrl: `/property/${property.id}`
  }));
}

/* ---------------- CHAT ROUTE ---------------- */

app.post("/chat", async (req, res) => {
  try {
    const rawMessage =
      typeof req.body?.message === "string"
        ? req.body.message.trim()
        : "";

    if (!rawMessage) {
      return res.json({
        reply: "Please type a message so I can help you.",
        listings: []
      });
    }

    const message = normalizeText(rawMessage);

    /* Greeting */

    if (isGreeting(message)) {
      return res.json({
        reply:
          "Hi 👋 I'm your Grand Abode assistant. I can help you find homes by price, bedrooms, or location. What are you looking for today?",
        listings: []
      });
    }

    /* Thanks */

    if (message.includes("thank")) {
      return res.json({
        reply:
          "You're welcome! Let me know if you'd like help finding more properties.",
        listings: []
      });
    }

    /* Property search */

    const isSearchIntent = isPropertySearch(rawMessage);
    const recommendations = isSearchIntent
      ? getRecommendedProperties(rawMessage, properties)
      : [];

    if (recommendations.length > 0) {
      return res.json({
        reply: `I found ${recommendations.length} properties that match your request.`,
        listings: recommendations
      });
    }

    if (isSearchIntent) {
      return res.json({
        reply:
          "I could not find properties that match those filters exactly. Try adjusting your budget, bedrooms, or property type.",
        listings: []
      });
    }

    /* Gemini fallback */

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a friendly real estate assistant for the Grand Abode website.

User message:
"${rawMessage}"

Respond naturally and helpfully. 
Keep answers short and helpful.
`;

    const result = await model.generateContent(prompt);

    const aiReply = result.response.text();

    return res.json({
      reply: aiReply,
      listings: []
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.json({
      reply: "Sorry, something went wrong. Please try again.",
      listings: []
    });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});