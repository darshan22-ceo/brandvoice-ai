# BrandVoice AI

An AI-powered social media content generator that analyzes a brand's communication style and generates 10 on-brand tweets for a given campaign.

## Overview

BrandVoice AI helps marketers and content teams quickly create social media content tailored to a specific brand, campaign objective, and product.

The user provides basic brand and product information, and the application uses an LLM to:

1. Analyze the brand voice.
2. Identify the target audience and content themes.
3. Generate exactly 10 varied tweets.
4. Categorize each tweet by content type.

The application focuses on simplicity, structured AI output, and preventing unsupported product claims.

## Features

- Brand voice analysis
- Generates exactly 10 tweets
- Multiple content styles:
  - Engaging
  - Promotional
  - Witty / Playful
  - Informative
  - Motivational
- Structured AI response using JSON Schema
- Product description used as the source of truth for product facts
- Copy individual tweets with one click
- Loading and error states
- Responsive React interface
- Supports different brands and industries
- No database required

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API

### AI

- Groq API
- GPT-OSS-20B

### Development Tools

- Git
- GitHub
- Postman
- VS Code

## How It Works

```text
User Input
    ↓
React Frontend
    ↓
Express REST API
    ↓
AI Prompt + Brand Information
    ↓
Groq LLM
    ↓
Structured JSON Response
    ↓
Brand Voice + 10 Tweets
    ↓
React UI
```

## Input

The application accepts:

- Brand Name — optional
- Industry / Category — optional
- Campaign Objective — required
- Product Description — required

## Brand Voice Analysis

The AI analyzes the provided information and generates:

- Tone
- Target audience
- Content themes
- Communication style

The analysis is intentionally concise so that the generated content remains focused on the campaign.

## Content Generation

The application generates exactly 10 tweets with varied content styles.

The prompt encourages a balanced combination of:

- Engaging / conversational content
- Promotional content
- Witty / playful content
- Informative / value-driven content
- Motivational content

The system also instructs the model not to invent product facts that are not present in the product description.

## AI Prompt Design

The prompt is designed around several principles:

### 1. Brand Context

The model receives the brand name, industry, campaign objective, and product description.

### 2. Product Facts

The product description is treated as the source of truth for factual product information.

### 3. Content Diversity

The model is instructed to generate different tweet types and avoid repetitive structures.

### 4. Structured Output

The backend uses JSON Schema structured output so the frontend receives predictable data.

Expected response structure:

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

## Project Structure

```text
brandvoice-ai/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── generate.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/darshan22-ceo/brandvoice-ai.git
cd brandvoice-ai
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
GROQ_API_KEY=your_groq_api_key
```

### 3. Start the backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API

### Generate Tweets

```text
POST /api/generate
```

Example request:

```json
{
  "brandName": "Nike",
  "industry": "Sportswear",
  "campaignObjective": "Engagement",
  "productDescription": "A lightweight running shoe designed for everyday runners."
}
```

The API returns:

- Brand voice analysis
- Exactly 10 generated tweets
- Tweet category for each tweet

## Example Brands Tested

The application was tested with different brand contexts including:

- Nike
- Duolingo
- EcoSip
- FitFuel

Testing with different brands demonstrates that the workflow dynamically adapts the generated content based on the provided inputs.

## Design Decisions

### No Database

The application does not require persistent storage because the assignment focuses on generating content from user input.

### No Authentication

Authentication was intentionally excluded to keep the MVP simple and focused on the core workflow.

### No Web Scraping

The current version does not scrape social media profiles. Brand voice is inferred from the provided brand information and product description.

This keeps the workflow simple and avoids unnecessary external dependencies.

### Structured AI Output

JSON Schema is used to make the AI response predictable and easier for the frontend to consume.

## Future Improvements

Possible future enhancements include:

- Social media profile analysis
- Real-time brand voice extraction
- Tweet regeneration
- Tweet scheduling
- Content history
- Multiple social platforms
- Brand voice presets
- Analytics and performance tracking

## Author

Darshan Chavan

Computer Science Engineering

GitHub: https://github.com/darshan22-ceo
