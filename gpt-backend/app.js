const express = require("express");
const app = express();
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/suggest-keywords", async (req, res) => {
  try {
    const { dataInput } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Understand the context from the input and provide a limited set (max four) of single-worded response keywords." },
        { role: "user", content: `Context: ${dataInput}` },
        { role: "assistant", content: "Keywords: " },
      ],
      model: "gpt-3.5-turbo",
    });

    const keywordsString = completion.choices[0].message.content.trim();
    const keywordsArray = keywordsString.split("\n").filter(keyword => keyword.trim() !== '');

    res.json({ keywords: keywordsArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
