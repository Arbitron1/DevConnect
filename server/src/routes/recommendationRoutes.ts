import express from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get("/users", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;

    const currentUser = await User.findById(userId).lean();
    const allUsers = await User.find({ _id: { $ne: userId } }).lean();

    const prompt = `
      You are an AI recommendation engine.
      The current user is:
      ${JSON.stringify(currentUser)}

      Recommend the TOP 5 users they should follow.
      Use fields: name, bio, skills, interests, posts, etc.
      Return ONLY JSON array of user _id values.
      
      Users available:
      ${JSON.stringify(allUsers)}
    `;

    const aiRes = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
  response_format: { type: "json_object" },
});

const output = aiRes.choices[0].message?.content;

if (!output) {
  return res.status(500).json({ message: "AI returned empty content" });
}

let recommendedIds;
try {
  recommendedIds = JSON.parse(output);
} catch (err) {
  console.error("JSON Parse Error:", output);
  return res.status(500).json({ message: "Invalid AI response format" });
}


    const recommendedUsers = allUsers.filter(u =>
      recommendedIds.includes(String(u._id))
    );

    res.json({ users: recommendedUsers });
  } catch (err) {
    console.error("AI Recommendation Error:", err);
    res.status(500).json({ message: "Failed to generate recommendations" });
  }
});

export default router;
