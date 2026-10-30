# BrandVoice AI

An AI-powered social media content generation tool that analyzes a brand's voice and generates 10 on-brand tweets for a given campaign.

## Overview

BrandVoice AI helps marketers and businesses quickly create social media content based on:

- Brand name
- Industry / category
- Campaign objective
- Product description

The application uses an LLM to analyze the brand context and generate exactly 10 tweets with different content styles.

## Features

- AI-powered brand voice analysis
- Generates exactly 10 tweets
- Multiple tweet styles:
  - Engaging
  - Promotional
  - Witty
  - Informative
  - Motivational
- Campaign objective-based content generation
- Structured AI responses using JSON Schema
- Copy-to-clipboard functionality
- Loading and error states
- Input validation
- Responsive UI
- Supports different brands and product descriptions

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js

### AI
- Groq API
- OpenAI GPT-OSS 20B model

## How It Works

```text
User Input
    ↓
React Frontend
    ↓
POST /api/generate
    ↓
Express Backend
    ↓
Groq LLM
    ↓
Brand Voice Analysis
    +
10 Tweet Generation
    ↓
Structured JSON Response
    ↓
React UI