# BrandVoice AI — Approach

## 1. Problem

The goal is to build a simple AI-powered workflow that can generate 10 on-brand tweets for any given brand and campaign.

The system should understand the provided brand context, maintain a consistent communication style, and generate varied content without inventing unsupported product information.

## 2. Overall Workflow

```text
User Input
    ↓
React Frontend
    ↓
POST /api/generate
    ↓
Express Backend
    ↓
Prompt Construction
    ↓
Groq LLM
    ↓
Structured JSON Response
    ↓
Validation
    ↓
React UI
```

## 3. Inputs

The application accepts four inputs:

- Brand Name — optional
- Industry / Category — optional
- Campaign Objective — required
- Product Description — required

The campaign objective helps determine the purpose of the content, while the product description provides the factual context for the generated tweets.

## 4. Brand Voice Analysis

The LLM is instructed to analyze the provided information and identify:

- **Tone** — how the brand should sound
- **Target Audience** — who the content is intended for
- **Content Themes** — relevant topics and messaging areas
- **Communication Style** — how the brand communicates with its audience

The analysis is kept concise and is returned as structured data.

## 5. Content Generation Logic

The system asks the LLM to generate exactly 10 tweets.

The prompt encourages variation across five content categories:

1. Engaging / Conversational
2. Promotional
3. Witty / Playful
4. Informative / Value-driven
5. Motivational

The model is instructed to avoid repetitive sentence structures and use different creative angles such as questions, wordplay, calls to action, humor, and motivational language.

## 6. Product-Fact Guardrail

One important design decision is treating the **Product Description as the source of truth for product facts**.

The prompt explicitly instructs the model:

- Not to use prior knowledge about a named brand or product
- Not to invent product features
- Not to assume unsupported capabilities
- Not to introduce factual claims that are absent from the product description

Creativity is encouraged through language and writing style rather than by inventing product information.

This is particularly important for marketing content because fabricated product claims could make otherwise creative content misleading.

## 7. Prompt Design

The prompt is divided into clear sections:

### Brand Information

Provides the model with:

- Brand name
- Industry
- Campaign objective
- Product description

### Brand Voice Analysis

Requests the tone, target audience, content themes, and communication style.

### Tweet Generation

Requests exactly 10 tweets with varied purposes.

### Content Rules

Defines:

- Required tweet categories
- Product-fact restrictions
- Content diversity
- Tone consistency
- Creativity guidelines

### Output Format

The model is required to return a predefined JSON structure.

## 8. Structured AI Output

The backend uses Groq's structured JSON Schema output rather than relying only on free-form text.

Expected structure:

```json
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
```

The backend also validates that exactly 10 tweets are returned before sending the response to the frontend.

## 9. Technology Choices

### React + Vite

Used to build a lightweight and responsive user interface.

### Node.js + Express

Used for the backend API and to keep the application architecture simple.

### Groq

Used to access the LLM for brand voice analysis and tweet generation.

### JSON Schema

Used to make the AI response predictable and easier for the frontend to consume.

### GitHub

Used for version control and sharing the project with reviewers.

## 10. Why No Database?

The assignment focuses on generating content from user input. Persistent storage is not required for the core workflow, so a database was intentionally avoided.

This keeps the MVP simple and reduces unnecessary infrastructure.

## 11. Why No Social Media Scraping?

The assignment allows brand voice to be inferred through prompt-based analysis or manually defined personality.

The current implementation uses the provided brand context rather than scraping external social media profiles.

This makes the application:

- Faster to implement
- Easier to deploy
- Less dependent on external services
- Simpler to evaluate

A future version could optionally analyze public social profiles to extract a more precise brand voice.

## 12. Error Handling

The application handles several failure cases:

- Missing campaign objective
- Missing product description
- AI/API errors
- Invalid AI response structure
- Less than or more than 10 generated tweets

The frontend displays appropriate loading and error states to the user.

## 13. Testing

The application was tested with multiple brand contexts to verify that the workflow adapts its output.

Examples include:

- Nike — sportswear context
- Duolingo — language learning context
- EcoSip — new/unknown brand context
- FitFuel — fitness/nutrition context

The application was also tested for required input validation and AI response formatting.

## 14. Future Improvements

Possible improvements include:

- Analyze a brand's existing social media posts
- Learn a brand voice from uploaded examples
- Regenerate individual tweets
- Save previous campaigns
- Support additional social platforms
- Add content scheduling
- Add analytics and engagement tracking

## 15. Key Design Principle

The main design principle is:

> **Keep the workflow simple while making the AI output structured, varied, and grounded in the information provided by the user.**
