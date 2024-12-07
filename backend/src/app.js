import express from "express";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk"

dotenv.configDotenv({
  path: ".env",
});

import cors from "cors";
const app = express();


app.use(cors({
  origin: ['http://localhost:5173',"*"], 
  credentials: true, 
}));

const anthropic =new Anthropic({
  apiKey:process.env.ANTHROPIC_API_KEY,
  baseURL:`https://apis.scrimba.com/api.anthropic.com`
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
   res.send("Welcome to Text Summarizer!")
 });
 
app.post("/textSummarizer", async(req, res) => {
  const {text,size,prompt}=req.body;
  console.log(req.body)
  try{
    const response =await anthropic.messages.create({
      model:'claude-3-5-sonnet-20240620',
      max_tokens:Number(size),
      system:`You are a text Summarizer . When asked to summarize a text, ${prompt || "return the summary."}`,
      messages:[{
        'role':'user',
        'content':[
          {
            'type':'text',
            'text':`Summarize this text .Limit to the ${size} words: ${text}`
          }
        ]
      }]
    })
    if (response && response.content) {
      res.status(200).json(response.content[0].text);
    } else {
      res.status(500).json( 'Unexpected response format from the API');
    }
   
  }catch(error){
    console.error('Error:', error.message);
    res.status(500).json( 'Failed to summarize text. Please try again.' );

  }
 
 
 });


export { app };
 