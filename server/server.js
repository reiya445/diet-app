import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
console.log(
  "API KEY:",
  process.env.GEMINI_API_KEY ? "読み込み成功" : "なし"
);

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.get("/", (req, res) => {
  res.send("Gemini Server Running!");
});


app.post("/analyze", async (req, res) => {

  try {

    console.log("画像解析リクエスト受信");


    const { image } = req.body;


    const base64 = image.split(",")[1];


    const response = await ai.models.generateContent({

      model: "gemini-3.6-flash",

      contents: [
        {
          role: "user",

          parts: [

            {
              text: `
あなたは管理栄養士です。

この料理画像を解析してください。

以下のJSONだけ返してください。

{
"dish":"",
"ingredients":[
{
"name":"",
"amount":""
}
],
"calories":0,
"advice":"",
"tomorrow_recipe":""
}
`
            },

            {
              inlineData:{
                mimeType:"image/jpeg",
                data:base64
              }
            }

          ]

        }
      ]

    });


    console.log("Gemini Response:");
    console.log(response.text);


    res.json({
      result: response.text
    });


  } catch(error){

    console.error("========== Gemini Error ==========");
    console.error(error);

    res.status(500).json({
      error:error.message
    });

  }

});



const PORT = process.env.PORT || 5001;


app.listen(PORT, "0.0.0.0", ()=>{

  console.log(`Server Start : http://localhost:${PORT}`);

});