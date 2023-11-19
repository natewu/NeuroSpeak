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

// app.post("/suggest-keywords", async (req, res) => {
//   try {
//     const { dataInput } = req.body;

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: "system", content: "Understand the context from the input and provide a limited set (max four) of single-worded response keywords." },
//         { role: "user", content: `Context: ${dataInput}` },
//         { role: "assistant", content: "Keywords: " },
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     const keywords = completion.choices[0].message.content.trim();
//     res.json({ keywords });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/suggest-keywords", async (req, res) => {
  try {
    const { dataInput } = req.body;
    console.log(dataInput);
    const options = { // only 8 options allowed
      "food": ["Pizza", "Burger", "Pasta", "Sandwich", "Soup", "Steak", "Sushi", "Taco"],
      "eat": ["Dinner", "Breakfast", "Lunch", "Snack", "Meal", "Restaurant", "Cafe", "Bar"],
      "drink": ["Water", "Coffee", "Tea", "Juice", "Milk", "Soda", "Warm Drink", "Cold Drink"],
      "hobby": ["Reading", "Writing", "Drawing", "Painting", "Singing", "Dancing", "Cooking", "Gaming"],
      "help": ["Move bed", "Change position", "Change clothes", "Drink water", "Eat food", "Take medicine", "Go to toilet", "Take a shower"],
      "hungry": ["Yes", "No", "Maybe later", "I'm not hungry", "I'm thirsty", "What's for dinner?", "What's for lunch?", "What's for breakfast?"],
      "thirsty": ["Yes", "No", "Maybe later", "I'm not thirsty", "I'm hungry", "What's for dinner?", "What's for lunch?", "What's for breakfast?"],
      "else": ["No thank you", "I'm fine", "I'm good", "I'm okay", "I'm alright", "I'm not sure", "I'm not sure yet", "Okay bye"],

    }

    // adding context
    const dataInputArray = dataInput.split(" ");
    const dataInputArrayLowerCase = dataInput.toLowerCase().split(" ");
    const keywords = [];

    for (let i = 0; i < dataInputArray.length; i++) {
      const dataInputWord = dataInputArray[i];
      const dataInputWordLowerCase = dataInputArrayLowerCase[i];
      if (options[dataInputWord]) {
        keywords.push(options[dataInputWord]);
      } else if (options[dataInputWordLowerCase]) {
        keywords.push(options[dataInputWordLowerCase]);
      }
    }

    if (keywords.length === 0) {
      keywords.push(options["else"]);
    } else if (keywords.length > 1) {
      const randomizedKeywords = [];
      keywords.forEach((keyword) => {
        const randomizedKeyword = keyword[Math.floor(Math.random() * keyword.length)];
        randomizedKeywords.push(randomizedKeyword);
      });
      keywords = randomizedKeywords;
    }
    // flatten keywords array to 1d array
    const flattenedKeywords = keywords.flat();
    // const keywords = completion.choices[0].message.content.trim();
    res.json(flattenedKeywords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
