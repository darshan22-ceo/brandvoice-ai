const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { brandName, industry, campaignObjective, productDescription } =
      req.body;

    // Validate required fields
    if (!campaignObjective || !productDescription) {
      return res.status(400).json({
        success: false,
        message: "Campaign objective and product description are required",
      });
    }

    const prompt = `
You are an expert social media strategist and copywriter.

Your task is to analyze a brand and generate exactly 10 high-quality,
human-sounding tweets for a social media campaign.

BRAND INFORMATION

Brand Name:
${brandName || "Not provided"}

Industry:
${industry || "Not provided"}

Campaign Objective:
${campaignObjective}

Product Description:
${productDescription}


TASK 1 — BRAND VOICE ANALYSIS

Based only on the information provided, identify:

1. Tone
2. Target audience
3. Content themes
4. Communication style

Keep the analysis concise, practical, and relevant to the brand.


TASK 2 — GENERATE 10 TWEETS

Generate exactly 10 tweets.

Create a balanced mixture of:

- Engaging / conversational
- Promotional
- Witty / playful
- Informative / value-driven
- Motivational when appropriate

Each tweet should have a different purpose or angle.

The tweets should feel like they belong to the same brand while
avoiding repetitive ideas or wording.


IMPORTANT CONTENT RULES

The Product Description is the ONLY source of truth for product facts.

Treat every detail in the Product Description as factual information
that may be used in tweets.

DO NOT use your prior knowledge about the brand, company, product,
industry, or real-world services.

DO NOT invent, assume, infer, or imply any product detail that is not
explicitly stated in the Product Description.

- Brand name, industry, campaign objective, and product description should guide the content, but only the Product Description may be used as factual evidence about the product.
- Make at least 2 tweets conversational.
- Make at least 2 tweets promotional.
- Make at least 2 tweets witty or playful.
- Make at least 2 tweets informative or value-driven.
- Make at least 1 tweet motivational.
- Avoid repeating the same sentence structure.
For example:

If the description says:
"short interactive lessons"

You MAY say:
"Practice with short interactive lessons."

You MUST NOT say:
"Practice with 5-minute lessons."

You MUST NOT say:
"Learn faster with proven lessons."

You MUST NOT say:
"Improve fluency in just a few minutes."

Creativity should come from:

- Questions
- Wordplay
- Humor
- Motivation
- Conversations
- Calls to action
- Different writing angles

Do NOT create creativity by adding product facts.

For informative tweets, only explain or rephrase information that is
explicitly present in the Product Description.

For promotional tweets, only promote the product using information
explicitly present in the Product Description.

For witty, engaging, and motivational tweets, you may use creative
language, but do not introduce new factual claims.

If there is not enough factual information to create an informative
tweet, create a general engagement or motivational tweet instead.

Never use external knowledge about a named brand.


TWEET VARIETY

Try to include approximately:

- 2 engaging tweets
- 2 promotional tweets
- 2 witty/playful tweets
- 2 informative/value-driven tweets
- 2 motivational tweets

The exact distribution can vary when another mix better suits the
brand and campaign objective.


OUTPUT FORMAT

Return ONLY valid JSON.

Use exactly this structure:

{
  "brandVoice": {
    "tone": [],
    "targetAudience": "",
    "contentThemes": [],
    "communicationStyle": ""
  },
  "tweets": [
    {
      "text": "",
      "type": ""
    }
  ]
}

Requirements:

- The tweets array MUST contain exactly 10 objects.
- Every tweet must have "text" and "type".
- The type should be one of:
  "engaging",
  "promotional",
  "witty",
  "informative",
  "motivational"

- Do not include markdown.
- Do not include explanations outside the JSON.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are an expert social media strategist and copywriter. Follow the requested JSON structure exactly and never invent factual product claims.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "brand_tweet_generation",
          strict: true,
          schema: {
            type: "object",
            properties: {
              brandVoice: {
                type: "object",
                properties: {
                  tone: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  targetAudience: {
                    type: "string",
                  },
                  contentThemes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  communicationStyle: {
                    type: "string",
                  },
                },
                required: [
                  "tone",
                  "targetAudience",
                  "contentThemes",
                  "communicationStyle",
                ],
                additionalProperties: false,
              },

              tweets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    text: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                      enum: [
                        "engaging",
                        "promotional",
                        "witty",
                        "informative",
                        "motivational",
                      ],
                    },
                  },
                  required: ["text", "type"],
                  additionalProperties: false,
                },
                minItems: 10,
                maxItems: 10,
              },
            },

            required: ["brandVoice", "tweets"],
            additionalProperties: false,
          },
        },
      },
    });

    const result = completion.choices[0].message.content;

    const parsedResult = JSON.parse(result);

    // Basic validation
    if (
      !parsedResult.brandVoice ||
      !Array.isArray(parsedResult.tweets) ||
      parsedResult.tweets.length !== 10
    ) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response format",
      });
    }

    res.json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    console.error("AI generation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate content",
    });
  }
});

module.exports = router;
