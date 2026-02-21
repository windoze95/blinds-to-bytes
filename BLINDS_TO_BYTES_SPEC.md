# Blinds to Bytes: AI Training Hub — Project Spec

## Project Overview

Build a local web application that serves as a comprehensive AI education platform for someone with zero technical background. The user is a professional window blind installer who wants to deeply understand AI — not to become an engineer, but to fluently speak the language, explain technical concepts, and qualify for the growing wave of non-engineering AI roles (AI Trainer, Prompt Engineer, AI Operations Specialist, AI Product Analyst, AI Solutions Consultant, etc.).

The app teaches through the lens of what the user already knows: measuring, cutting, installing, and troubleshooting window blinds. Every AI concept is grounded in a real-world analogy from the trades before introducing the technical terminology. The goal is that by the end, the user can walk into a room of engineers and hold their own in an AI conversation — not by pretending to code, but by genuinely understanding what's happening under the hood and why it matters.

The app uses the Anthropic API (`claude-sonnet-4-6`) as an adaptive AI tutor throughout.

---

## Tech Stack

- **Frontend**: React (Vite) with Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API (`claude-sonnet-4-6`)
- **Database**: SQLite (via better-sqlite3) for progress tracking
- **No external auth required** — single-user local app

---

## Architecture

```
ai-training-hub/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/        # Nav, sidebar, top bar, AI chat panel
│   │   │   ├── StudyPlan/     # Section-based curriculum view
│   │   │   ├── Flashcards/    # Spaced repetition cards
│   │   │   ├── BlindsToBytes/ # Window Blinds ↔ AI concept mapping (Rosetta Stone equivalent)
│   │   │   ├── Labs/          # Guided hands-on exercises (no coding)
│   │   │   ├── Quiz/          # Quizzes with scoring and review
│   │   │   ├── MockInterview/ # AI-powered interview simulator for AI roles
│   │   │   ├── Scenarios/     # Real-world AI scenario analysis exercises
│   │   │   └── Progress/      # Dashboard & analytics
│   │   ├── data/              # Static content (flashcards, quizzes, mappings, labs, scenarios)
│   │   ├── hooks/             # Custom hooks (useAI, useProgress, useTimer)
│   │   ├── context/           # App state management
│   │   └── App.jsx
│   └── index.html
├── server/
│   ├── index.js               # Express server
│   ├── routes/
│   │   ├── ai.js              # Anthropic API proxy
│   │   └── progress.js        # Progress CRUD
│   ├── db/
│   │   ├── schema.sql         # SQLite schema
│   │   └── seed.js            # DB initialization
│   └── prompts/               # System prompts for AI modes
│       ├── tutor.txt
│       ├── interviewer.txt
│       ├── behavioral.txt
│       ├── technical.txt
│       ├── scenario-reviewer.txt
│       ├── lab-reviewer.txt
│       └── explain-coach.txt
├── package.json
└── .env.example               # ANTHROPIC_API_KEY=your-key-here
```

---

## The Analogy Framework: Blinds → AI

This is the core teaching philosophy. Every AI concept maps to something from the blind installation trade. The user should never encounter a concept cold — the analogy comes FIRST, then the technical term.

### Why This Works
A window blind installer already understands:
- **Precision and measurement** — getting inputs right determines the output
- **Templates and patterns** — following a process that works across different situations
- **Troubleshooting** — diagnosing why something doesn't fit or work right
- **Customer requirements** — translating what someone asks for into what they actually need
- **Quality control** — knowing when something is "good enough" vs. needs rework
- **Tool selection** — picking the right tool for the right job
- **Iteration** — adjusting until it's right

These map perfectly to AI concepts like training data quality, model architecture, debugging, prompt engineering, evaluation, tool selection, and fine-tuning.

### Sample Analogy Map (abbreviated — full map in BlindsToBytes section)

| Blind Installation | AI Concept | Why It Maps |
|---|---|---|
| Measuring the window | Collecting training data | Garbage measurements = garbage results. The quality of what you put in determines what you get out. |
| The measuring tape | A sensor / data collection tool | The instrument that captures information from the real world |
| The cut list (measurements written down) | A dataset | Organized, structured information ready to be used |
| Cutting blinds to spec | Training a model | Using your data to create something that fits the specific situation |
| The installation template/guide | A model architecture | The overall approach/pattern you follow — not the specific measurements, but the process |
| "Measure twice, cut once" | Data validation / testing | Checking your inputs before committing to an expensive operation |
| A blind that fits perfectly | A good prediction | The model's output matches reality |
| A blind that's 2 inches too short | A bad prediction (error) | The model got it wrong — now you need to figure out why |
| Adjusting the tilt rod | Fine-tuning a model | Making small adjustments to improve performance after the initial setup |
| Different blind types for different windows | Different model types for different problems | You wouldn't use a roller shade where you need plantation shutters |
| The customer saying "I want it to look nice" | A vague prompt | Ambiguous input that needs clarification to produce good output |
| The customer saying "I want 2-inch faux wood blinds, inside mount, in pearl white, 36x48" | A well-engineered prompt | Specific, detailed input that produces exactly what's needed |
| Your years of experience knowing what works | Transfer learning | Taking knowledge from past jobs and applying it to new ones |
| A factory that mass-produces blinds | Cloud computing / GPU clusters | Specialized infrastructure that processes things at scale |
| Your work van (tools, materials, everything you need) | An AI platform / framework | The complete environment that has everything needed to do the job |

---

## Core Features

### 1. Section-Based Study Plan (Main Dashboard)

The landing page shows a 14-section curriculum. Each section has a theme and a mix of activities.

#### Section 1: What Even Is AI? (Demystifying the Buzzwords)
- **Flashcards**: Core vocabulary — AI, machine learning, algorithm, model, training, inference, data
- **Blinds to Bytes**: First batch of analogy mappings (measuring → data collection, cutting → training)
- **Reading Guide**: Links to beginner-friendly AI explainers (Google's "AI for Everyone", Coursera preview)
- **Quiz**: 20 questions — "Is this AI?" scenarios, basic terminology

Key concepts: What AI is (and isn't), narrow AI vs. general AI, the AI hype cycle, why AI is suddenly everywhere (hint: data + compute), AI vs. automation vs. machine learning — what's the difference?

Analogy anchor: "AI is like having a really experienced installer who's done 10,000 jobs — they can look at a window and know what's going to work before they even measure. Except the AI 'learned' from data instead of from years on the job."

#### Section 2: How Machines Learn (The Three Ways)
- **Flashcards**: Supervised learning, unsupervised learning, reinforcement learning, training data, labels, features, target variable
- **Blinds to Bytes**: Learning-type analogies (supervised = apprentice with a mentor, unsupervised = sorting a warehouse, reinforcement = trial and error)
- **Lab 1**: Classify real-world scenarios into supervised/unsupervised/reinforcement learning
- **Quiz**: 20 questions on learning types and when to use each

Key concepts: Supervised learning (learning from labeled examples), unsupervised learning (finding patterns without labels), reinforcement learning (learning from rewards/penalties), what "training" actually means, train/test split (why you don't test yourself on what you studied)

Analogy anchor: "Supervised learning is like training a new installer by showing them 100 completed jobs and saying 'this is what good looks like.' Unsupervised learning is like dumping a pile of mixed blinds on a table and asking them to sort them into groups without telling them the categories. Reinforcement learning is like letting them try installations and just saying 'good job' or 'try again' after each one."

#### Section 3: Data — The Raw Material
- **Flashcards**: Dataset, structured vs. unstructured data, data cleaning, feature engineering, data labeling, bias in data, data augmentation
- **Blinds to Bytes**: Data analogies (raw measurements → raw data, a messy cut list → dirty data, etc.)
- **Lab 2**: Data quality detective — find problems in sample datasets (described in plain English, not code)
- **Quiz**: 20 questions on data concepts

Key concepts: Why data is the most important thing in AI (not the algorithm), structured data (spreadsheets) vs. unstructured data (images, text, audio), data cleaning (fixing bad data), feature engineering (deciding what information matters), data labeling (the unglamorous work that makes AI possible), bias in data (garbage in, garbage out — but worse), data privacy and consent

Analogy anchor: "Data is your raw material — it's the equivalent of every measurement, every cut list, every customer spec sheet you've ever written down. If your measurements are sloppy, your blinds won't fit. If your data is sloppy, your AI won't work. Cleaning data is like going through old job orders and fixing the ones where someone wrote '36' but meant '36.5' — tedious but critical."

#### Section 4: Neural Networks — How AI "Thinks"
- **Flashcards**: Neuron, layer, input layer, hidden layer, output layer, weights, activation function, forward pass, backpropagation, deep learning
- **Blinds to Bytes**: Neural network as an installation crew analogy
- **Lab 3**: Trace a decision through a simplified neural network (visual, no math)
- **Quiz**: 20 questions on neural network concepts

Key concepts: What a neural network is (layers of simple decisions that combine into complex ones), why it's called "deep" learning (many layers), how training works at a high level (adjust the knobs until the output is right), why neural networks are good at patterns, types of neural networks (CNNs for images, RNNs for sequences, Transformers for language)

Analogy anchor: "A neural network is like a crew of installers working in stages. The first crew member measures the window (input layer). They hand their notes to the next person who calculates the cut dimensions — but they might check with another person about whether inside mount or outside mount is better (hidden layers). The last person makes the final call on the complete spec (output layer). Training is like doing this 10,000 times and after each job, going back and adjusting everyone's approach based on whether the blind fit perfectly or was off."

#### Section 5: Language AI — How Machines Understand Words
- **Flashcards**: NLP, tokenization, embeddings, attention mechanism, context window, transformer architecture, text generation, sentiment analysis, named entity recognition
- **Blinds to Bytes**: Language processing analogies
- **Lab 4**: Explore tokenization (break sentences into tokens using a visual tool), test sentiment analysis on customer reviews
- **Quiz**: 20 questions on NLP concepts

Key concepts: How computers turn words into numbers (tokenization → embeddings), what attention is and why it matters ("paying attention" to relevant context), the Transformer architecture (the breakthrough behind modern AI), how text generation works (predicting the next word), sentiment analysis (is this review positive or negative?), named entity recognition (identifying names, places, dates in text)

Analogy anchor: "When you read a work order, you naturally focus on the important parts — window dimensions, mount type, color — and skip the fluff. That's basically what the 'attention mechanism' does in a Transformer. It figures out which words in a sentence are most relevant to understanding the meaning. Tokenization is like how you break a job address into parts: street number, street name, city, zip — each piece means something specific."

#### Section 6: Vision AI — How Machines See
- **Flashcards**: Computer vision, image classification, object detection, image segmentation, convolutional neural network (CNN), pixel, feature map, bounding box, OCR
- **Blinds to Bytes**: Vision analogies
- **Lab 5**: Test image classification (upload images, see how AI classifies them — use a free API or visual demo)
- **Quiz**: 20 questions on computer vision concepts

Key concepts: How computers "see" (pixels as numbers), what a CNN does (detecting edges → shapes → objects → scenes, layer by layer), image classification vs. object detection vs. segmentation, real-world uses (self-driving cars, medical imaging, quality control), OCR (reading text from images), why vision AI struggles with certain things (adversarial examples, unusual angles)

Analogy anchor: "When you look at a window, you instantly see: double-hung, 36 inches wide, white frame, inside mount possible. You don't think about it — your brain just processes it. Computer vision is teaching a machine to do the same thing, except it starts by seeing millions of tiny colored dots (pixels) and has to learn that certain patterns of dots mean 'window' and others mean 'door frame.' A CNN is like how you scan a window: first you notice the edges, then the frame shape, then the type, then the full context of the room. Each layer sees more of the big picture."

#### Section 7: Large Language Models — The ChatGPT Era
- **Flashcards**: LLM, GPT, Claude, tokens, parameters, pre-training, fine-tuning, RLHF, hallucination, temperature, system prompt, context window, emergent abilities
- **Blinds to Bytes**: LLM analogies
- **Lab 6**: Compare responses from different LLMs on the same prompt, explore temperature settings, test context window limits
- **Quiz**: 20 questions on LLMs

Key concepts: What an LLM actually is (a giant pattern-matching engine trained on text), how they're built (pre-training on internet text → fine-tuning → RLHF), why they hallucinate (they generate plausible text, not truth), parameters (billions of adjustable knobs), tokens and context windows (how much the AI can "remember" in one conversation), temperature (randomness dial), the major players (GPT-4, Claude, Gemini, Llama, Mistral), open-source vs. closed-source models

Analogy anchor: "An LLM is like an installer who has read every installation manual ever written for every blind manufacturer in every language. They can talk fluently about any type of blind — but they've never actually installed one. They might confidently describe an installation process that sounds perfect but has a critical flaw, because they're generating plausible instructions, not recalling actual experience. That's a hallucination. Parameters are like all the micro-adjustments in your technique — hand pressure, angle, speed — except an LLM has 70 billion of them."

#### Section 8: Prompt Engineering — Talking to AI Effectively
- **Flashcards**: Prompt, system prompt, user prompt, few-shot prompting, chain-of-thought, role prompting, prompt injection, prompt template, output formatting, guardrails
- **Blinds to Bytes**: Prompt engineering as customer communication
- **Lab 7**: Write prompts for real tasks — progressively harder challenges. Compare good vs. bad prompts. Practice few-shot and chain-of-thought techniques
- **Quiz**: 20 questions on prompt engineering

Key concepts: Why prompt engineering matters (the same AI gives wildly different results depending on how you ask), anatomy of a good prompt (role, context, task, format, constraints), few-shot prompting (giving examples), chain-of-thought (asking the AI to show its work), system prompts (setting the AI's personality and rules), common pitfalls (ambiguity, leading questions, missing context), prompt injection (security risk), iterative refinement

Analogy anchor: "Prompt engineering is exactly like taking a customer order. 'I want blinds' is a terrible order — you'd need to ask a dozen follow-up questions. 'I need 2-inch faux wood blinds, inside mount, cordless lift, pearl white, for a 36x48 bathroom window with 1.5 inches of depth' is a perfect order. Prompt engineering is the skill of writing that perfect order for an AI. Few-shot prompting is like showing the AI a photo of a completed job and saying 'do it like this.' Chain-of-thought is like asking the installer to talk through their process step by step instead of just giving you the final number."

#### Section 9: AI Tools You Can Use Today (No Coding Required)
- **Flashcards**: ChatGPT, Claude, Midjourney, DALL-E, Copilot, Zapier AI, Make.com, Google AI Studio, Hugging Face, API, no-code platforms
- **Blinds to Bytes**: Tool selection analogies (right tool for the right job)
- **Lab 8**: Build a real workflow — use ChatGPT/Claude to draft customer communications, use an AI image tool, set up a simple AI-powered automation with a no-code tool
- **Quiz**: 20 questions on AI tools and platforms

Key concepts: Text AI tools (ChatGPT, Claude, Gemini), image AI tools (Midjourney, DALL-E, Stable Diffusion), voice AI, video AI, no-code AI builders (Zapier AI, Make.com), what an API is (how AI tools talk to each other), AI-powered features in everyday software (Notion AI, Canva AI, Google's AI features), AI agents (AI that can take actions, not just answer questions)

Analogy anchor: "You wouldn't use a drill to measure a window or a tape measure to drive screws. Same with AI tools — ChatGPT is great for text but terrible for images. Midjourney makes stunning images but can't write a proposal. An API is like having a universal adapter — it lets different tools connect and work together, like how your cordless drill battery fits your saw, your light, and your impact driver."

#### Section 10: AI Ethics, Safety & Bias
- **Flashcards**: Bias, fairness, transparency, explainability, alignment, AI safety, deepfake, misinformation, consent, privacy, responsible AI, AI regulation, EU AI Act
- **Blinds to Bytes**: Ethics analogies (building trust, doing quality work, standing behind your product)
- **Lab 9**: Analyze case studies — find the bias in real AI failures (Amazon's hiring AI, facial recognition disparities, etc.)
- **Quiz**: 20 questions on AI ethics and safety

Key concepts: Where bias comes from (biased data, biased design, biased deployment), real-world consequences of AI bias (hiring, lending, criminal justice, healthcare), explainability (can we understand WHY the AI made this decision?), AI safety (alignment problem, existential risk debate), deepfakes and misinformation, data privacy and consent, AI regulation (EU AI Act, emerging US frameworks), responsible AI principles, the role of AI Ethics in organizations

Analogy anchor: "If you only ever installed blinds in brand-new suburban homes, you'd be terrible at older buildings with non-standard windows. That's bias — your 'training data' was too narrow. Now imagine an AI trained mostly on data from one demographic making decisions about loans, hiring, or healthcare for everyone. That's the same problem at massive scale, with real consequences. Explainability is like being able to show the customer exactly why you recommended inside mount vs. outside mount — not just 'trust me,' but showing the measurements and reasoning."

#### Section 11: AI in Business — How Companies Actually Use It
- **Flashcards**: Use case, ROI, total cost of ownership, POC (proof of concept), AI maturity, automation vs. augmentation, build vs. buy, AI strategy, change management, stakeholder alignment
- **Blinds to Bytes**: Business analogies (estimating jobs, managing a business, customer relationships)
- **Lab 10**: Identify AI opportunities in a fictional business — write a proposal for an AI implementation (in plain English)
- **Quiz**: 20 questions on AI in business

Key concepts: How companies decide where to use AI (high-volume, repetitive, data-rich processes), automation vs. augmentation (replacing humans vs. helping humans), the AI implementation lifecycle (identify → evaluate → pilot → scale → monitor), why most AI projects fail (bad data, unclear goals, no buy-in), ROI calculation for AI, change management (getting humans to trust and use AI), real-world case studies across industries

Analogy anchor: "Running an AI project is a lot like running a big commercial blind installation. You start with a site survey (discovery), then you spec out the job (design), do a sample room to make sure everything works (proof of concept), then roll out floor by floor (scaling). Most failed AI projects are like showing up to install without measuring first — you're guaranteed to waste time and money. Change management is like convincing a building manager to switch from manual blinds to motorized — it's better, but people resist change."

#### Section 12: The AI Job Landscape — Where You Fit In
- **Flashcards**: AI Trainer, Prompt Engineer, AI Operations, AI Product Manager, AI Ethics Analyst, Data Annotator, AI Solutions Consultant, AI Quality Analyst, Conversational AI Designer
- **Blinds to Bytes**: Career transition analogies
- **Lab 11**: Write your resume for 3 different AI roles, translating blind installation experience into relevant skills
- **Quiz**: 20 questions on AI roles, skills, and career paths

Key concepts: Non-engineering AI roles that exist today and are growing, what each role actually does day-to-day, which skills from trades work transfers (attention to detail, customer communication, troubleshooting, process optimization), what additional skills to build, salary ranges and job market trends, where to find these jobs, how to talk about your non-traditional background as a strength, building a portfolio without code, certifications that matter (and which ones don't)

Specific roles to cover:
- **AI Trainer / Data Annotator**: Teaching AI by labeling data, evaluating AI outputs, providing human feedback (RLHF). Pay: $40-80K+
- **Prompt Engineer**: Crafting effective prompts, building prompt libraries, testing and optimizing AI interactions. Pay: $60-120K+
- **AI Operations Specialist**: Managing AI systems in production, monitoring performance, handling failures. Pay: $60-100K+
- **AI Solutions Consultant**: Helping businesses identify AI opportunities, scoping projects, managing implementations. Pay: $70-130K+
- **Conversational AI Designer**: Designing chatbot flows, writing dialogue, testing conversation quality. Pay: $55-95K+
- **AI Product Analyst**: Analyzing AI product performance, user behavior, defining requirements. Pay: $65-110K+
- **AI Ethics/Safety Analyst**: Evaluating AI systems for bias, safety, compliance. Pay: $70-120K+
- **AI Quality Assurance**: Testing AI outputs for accuracy, consistency, safety. Pay: $50-90K+

Analogy anchor: "You know how the best installers aren't always the ones with engineering degrees — they're the ones who understand the craft, communicate well with customers, and know how to solve problems on the fly? AI jobs are going the same way. Companies are realizing they need people who understand how AI works AND can talk to real humans about it. Your experience dealing with customers, troubleshooting on-site, and explaining technical options in plain English is exactly what these roles need."

#### Section 13: Building AI Solutions Without Code
- **Flashcards**: No-code, low-code, AI agent, workflow automation, API integration, chatbot builder, RAG (retrieval-augmented generation), vector database, fine-tuning vs. prompting, AI wrapper
- **Blinds to Bytes**: Building solutions analogies
- **Lab 12**: Build a real AI solution — create a chatbot, automate a workflow, or build an AI-powered tool using only no-code platforms
- **Quiz**: 20 questions on no-code AI building

Key concepts: No-code AI platforms (Voiceflow, Botpress, Stack AI, Flowise), building chatbots without code, connecting AI to data (RAG explained simply), workflow automation with AI (Zapier, Make.com, n8n), when no-code works and when you need engineering, understanding APIs at a conceptual level (not coding them), AI agents that take actions, building AI "wrappers" (custom interfaces on top of LLMs)

Analogy anchor: "No-code AI is like motorized blinds with a remote — you don't need to understand electrical engineering to install them and make them work perfectly. You need to understand the specs, the mounting, the programming sequence, and how to troubleshoot when something's off. Same with no-code AI tools — you don't write code, but you need to understand the components and how they fit together."

#### Section 14: Capstone — Prove What You Know
- **Lab 13**: Full AI strategy project — given a fictional company, identify AI opportunities, propose solutions, select tools, address ethics, and present your plan
- **Mock Interview**: AI role interview simulation (AI-powered, 45 min)
- **Flashcard Review**: Review all weak cards
- **Final Assessment**: 50-question comprehensive exam

---

### 2. Flashcard Engine

Spaced repetition system using simplified Leitner boxes (1-5).

**Card Schema:**
```json
{
  "id": "string",
  "section": 1,
  "category": "foundations|learning|data|neural-networks|nlp|vision|llms|prompting|tools|ethics|business|careers|no-code",
  "front": "What is a neural network?",
  "back": "A computing system inspired by the brain, made up of layers of simple processing units (neurons) connected together. Each layer transforms data and passes it to the next. By adjusting the strength of connections (weights) during training, the network learns to recognize patterns.",
  "blinds_analogy": "Think of it like a multi-person installation crew working in stages. Person 1 measures and hands notes to Person 2 who calculates cuts, who passes to Person 3 who checks specs, who tells Person 4 the final install plan. Training is doing this thousands of times and tweaking each person's approach until the team produces perfect installs every time.",
  "difficulty": "easy|medium|hard"
}
```

**Target: ~250 cards across 13 sections** (section 14 is review/capstone).

Key design note: The `blinds_analogy` field is the killer feature — it MUST be present on every card and MUST use genuine blind installation language, not generic trade analogies. Use specific terms: inside mount, outside mount, headrail, valance, tilt rod, cord lock, bracket, spacer block, reveal depth, deductions, J-channel, etc.

---

### 3. Blinds to Bytes — The Concept Mapper

The "Rosetta Stone" equivalent. An interactive two-column comparison view: blind installation concept on the left, AI concept on the right. Each row expands for a detailed explanation.

**Schema:**
```json
{
  "id": "string",
  "category": "data|learning|architecture|engineering|tools|business|ethics",
  "blinds": {
    "name": "Measuring the Window",
    "description": "Taking precise measurements of the window opening — width, height, depth — to determine the correct blind size. Inside mount requires measuring the reveal depth to ensure the blind fits. Measurements are taken at multiple points because windows aren't perfectly square."
  },
  "ai": {
    "name": "Data Collection",
    "description": "Gathering the raw information that will be used to train an AI model. Like measurements, data needs to be precise, comprehensive, and representative. Collecting data from multiple sources (like measuring at multiple points) produces better results."
  },
  "notes": "Both require precision — bad measurements = bad blinds, bad data = bad AI",
  "detailedComparison": "Extended comparison with nuance...",
  "section": 1
}
```

**Full Mapping Table (~50 entries):**

| Category | Blind Installation Concept | AI Concept | Section |
|---|---|---|---|
| **Data** | Measuring the window | Data collection | 3 |
| Data | The cut list (written measurements) | A dataset | 3 |
| Data | Measuring at multiple points | Data from multiple sources / augmentation | 3 |
| Data | A window that's not square | Noisy / imperfect data | 3 |
| Data | "Measure twice, cut once" | Data validation | 3 |
| Data | Deductions (subtracting for inside mount clearance) | Data preprocessing / feature engineering | 3 |
| Data | A complete job folder (measurements + photos + notes) | A labeled dataset | 3 |
| Data | Old job folders with coffee stains and missing info | Dirty data that needs cleaning | 3 |
| **Learning** | Training an apprentice by showing completed jobs | Supervised learning | 2 |
| Learning | Sorting a pile of mixed inventory by eye | Unsupervised learning | 2 |
| Learning | "Try it, I'll tell you if it's right" | Reinforcement learning | 2 |
| Learning | An installer with 10,000 jobs of experience | A well-trained model | 2 |
| Learning | A new hire's first week | An untrained model (random weights) | 2 |
| Learning | An installer who only knows roller shades | A model trained on narrow data | 2 |
| Learning | Learning from your mistakes on the job | Backpropagation / gradient descent | 4 |
| **Architecture** | The step-by-step installation process | An algorithm | 1 |
| Architecture | A crew working in stages (measure → cut → mount → install) | Neural network layers | 4 |
| Architecture | The experienced lead who checks the tricky parts | The attention mechanism | 5 |
| Architecture | Your whole toolkit (drills, levels, saws, etc.) | A model's parameters | 7 |
| Architecture | Choosing bracket placement for heavy blinds | Weight adjustments in training | 4 |
| Architecture | Your van with all tools and materials | An AI platform / framework | 9 |
| Architecture | The installation manual for a specific brand | A pre-trained model | 7 |
| **Engineering** | The customer saying "make it look nice" | A vague prompt | 8 |
| Engineering | A detailed customer spec sheet | A well-engineered prompt | 8 |
| Engineering | Showing a customer a photo: "like this?" | Few-shot prompting | 8 |
| Engineering | Walking through your process out loud | Chain-of-thought prompting | 8 |
| Engineering | "I need these for a bathroom — waterproof" | Giving the AI context/constraints | 8 |
| Engineering | Adjusting tilt and cord after install | Fine-tuning a model | 7 |
| Engineering | Cutting a custom blind from a standard blank | Customizing a pre-trained model | 7 |
| Engineering | Checking your work before leaving | Model evaluation / testing | 2 |
| **Tools** | Cordless drill | ChatGPT / Claude (general-purpose power tool) | 9 |
| Tools | Tape measure | A data collection tool / sensor | 9 |
| Tools | Level | A validation / quality check tool | 9 |
| Tools | Saw/cutter | A data transformation tool | 9 |
| Tools | The work van | Cloud computing infrastructure | 9 |
| Tools | The manufacturer's catalog | An AI model library (Hugging Face) | 9 |
| Tools | Universal mounting brackets | APIs (adapters that connect different things) | 9 |
| **Business** | Site survey before quoting | AI discovery / needs assessment | 11 |
| Business | Doing one sample room first | Proof of concept (POC) | 11 |
| Business | Rolling out floor by floor | Scaling an AI solution | 11 |
| Business | The job estimate | ROI calculation for AI | 11 |
| Business | Customer walkthroughs after install | Change management / user adoption | 11 |
| Business | Warranty and callbacks | AI monitoring and maintenance | 11 |
| Business | A commercial job vs. residential | Enterprise AI vs. consumer AI | 11 |
| **Ethics** | Only knowing suburban homes | Training data bias | 10 |
| Ethics | Standing behind your work | AI accountability / transparency | 10 |
| Ethics | Not cutting corners on safety | AI safety practices | 10 |
| Ethics | Customer privacy (not sharing their home details) | Data privacy | 10 |
| Ethics | Building code compliance | AI regulation (EU AI Act, etc.) | 10 |
| Ethics | Explaining your recommendation to the customer | AI explainability | 10 |

---

### 4. Guided Labs

13 labs with hands-on exercises. NO CODING — all exercises use plain English, visual tools, free AI tools (ChatGPT/Claude), and no-code platforms.

**Lab 1 (Section 2): Learning Type Detective**
```
Scenario: 10 real-world AI applications are described.
Task: Classify each as supervised, unsupervised, or reinforcement learning.
Explain your reasoning using blind installation analogies.

Examples:
- "Netflix recommends movies based on what similar users watched" → ?
- "An AI groups customers into segments without being told the categories" → ?
- "A robot learns to walk by trying and falling thousands of times" → ?
```

**Lab 2 (Section 3): Data Quality Inspector**
```
Scenario: You're given descriptions of 5 datasets (in plain English) that
a company wants to use for AI. Each has problems.

Task: Identify the data quality issues, explain why they'd cause problems,
and suggest fixes.

Example: "A hiring company wants to predict good employees using 10 years
of hiring data. 90% of their past hires were men."
→ Student identifies: bias (gender imbalance), potential discrimination,
   need for balanced data or bias mitigation
```

**Lab 3 (Section 4): Neural Network Walkthrough**
```
Scenario: A visual, interactive exercise where you trace a decision
through a simplified neural network. No math — just concepts.

Task: Given an input (a photo of a window), trace through:
1. Input layer: What features does the first layer detect? (edges, colors)
2. Hidden layers: How do features combine? (edges → shapes → window type)
3. Output layer: What's the final classification?
4. What happens when it's wrong? (backpropagation in plain English)
```

**Lab 4 (Section 5): Language AI Explorer**
```
Scenario: Using ChatGPT or Claude, explore language AI capabilities.

Task:
1. Tokenize a sentence (use OpenAI's tokenizer tool to see how text splits)
2. Test sentiment analysis — write 5 customer reviews and see if AI
   correctly identifies positive/negative/neutral
3. Test named entity recognition — give AI a paragraph and ask it to
   identify all people, places, dates, and organizations
4. Write a short paragraph with deliberate ambiguity — see how AI handles it
```

**Lab 5 (Section 6): Vision AI Testing**
```
Scenario: Using free AI vision tools (Google Lens, ChatGPT vision,
Hugging Face demos).

Task:
1. Test image classification with 5 different images
2. Try to "fool" the AI — find edge cases where it fails
3. Test OCR (take a photo of text and see how accurately AI reads it)
4. Describe a real-world use case where vision AI could help
   the blind installation business
```

**Lab 6 (Section 7): LLM Comparison Lab**
```
Scenario: Test the same prompts across different LLMs.

Task:
1. Write a customer email about a warranty claim — try it on ChatGPT,
   Claude, and Gemini. Compare quality, tone, accuracy.
2. Ask each LLM to explain a technical concept. Which explains best?
3. Test temperature settings — same prompt at different temperatures.
   Observe how randomness affects output.
4. Test context windows — give increasingly long inputs and find where
   quality degrades.
5. Try to make an LLM hallucinate — ask about a made-up topic and
   see which models admit they don't know.
```

**Lab 7 (Section 8): Prompt Engineering Workshop**
```
Scenario: Progressively harder prompt challenges.

Task:
1. Basic: Write a prompt to get AI to draft a customer quote for a
   blind installation job
2. Intermediate: Use few-shot prompting — give 2 example quotes, then
   ask for a new one matching the style
3. Advanced: Use chain-of-thought to get AI to walk through a
   troubleshooting process for blinds that won't tilt
4. Expert: Write a system prompt for an "AI blind installation assistant"
   that can answer customer questions accurately
5. Security: Try to break your own system prompt with prompt injection
   — then fix the vulnerability
```

**Lab 8 (Section 9): AI Tool Exploration**
```
Scenario: Hands-on with real AI tools (all free tier).

Task:
1. Use ChatGPT/Claude to draft a full week of customer follow-up emails
2. Use an AI image tool (DALL-E, Midjourney free trial) to generate
   a before/after visualization for a blind installation
3. Set up a simple automation: when a Google Form is submitted,
   use Zapier/Make.com + AI to draft a personalized response
4. Use an AI transcription tool to transcribe a short audio clip
5. Reflect: Which tool impressed you most? Which felt overhyped?
```

**Lab 9 (Section 10): Bias Detective**
```
Scenario: Real case studies of AI bias and failures.

Task: For each case study:
1. Identify what went wrong
2. Trace it back to the data, design, or deployment decision
3. Suggest how it could have been prevented
4. Write a one-paragraph "lesson learned" using a blind installation analogy

Case studies:
- Amazon's AI recruiting tool that discriminated against women
- Facial recognition systems with higher error rates for darker skin
- A healthcare algorithm that deprioritized Black patients
- ChatGPT making up fake legal citations
- Self-driving car that couldn't detect a pedestrian at night
```

**Lab 10 (Section 11): AI Business Proposal**
```
Scenario: A mid-size home improvement company (500 employees,
30 locations) wants to use AI but doesn't know where to start.

Task:
1. Identify 5 potential AI use cases (customer service, scheduling,
   inventory, quality control, pricing)
2. Rank them by feasibility and impact
3. Write a one-page proposal for the #1 opportunity
4. Identify data requirements and potential challenges
5. Estimate a rough timeline and what success looks like
```

**Lab 11 (Section 12): Resume & Portfolio Builder**
```
Scenario: You're applying for 3 different AI roles.

Task:
1. AI Trainer: Write a resume summary that positions blind installation
   experience as relevant (attention to detail, quality standards,
   process documentation, customer feedback handling)
2. Prompt Engineer: Create a portfolio piece — 5 prompt templates
   with documentation showing your methodology
3. AI Solutions Consultant: Write a cover letter for a consulting role
   that frames your customer-facing trade experience as an asset
4. LinkedIn profile optimization: Rewrite your headline and about
   section for an AI career pivot
5. AI reviews each piece and provides feedback
```

**Lab 12 (Section 13): Build an AI Solution**
```
Scenario: Build something real using no-code tools.

Choose one project:
A. Customer Service Chatbot: Using Voiceflow or Botpress, build a
   chatbot that answers common blind installation questions
B. Smart Scheduling: Using Zapier + ChatGPT, build a workflow that
   takes a job request form and generates an optimized schedule
C. Quote Generator: Using Claude's API (via a no-code tool), build a
   system that generates blind installation quotes from measurements

Task:
1. Define your project scope
2. Choose your tools
3. Build a working prototype
4. Test it with 5 sample inputs
5. Document what worked, what didn't, and what you'd improve
```

**Lab 13 (Section 14): Full AI Strategy Project**
```
Scenario: GreenShade Co. is a regional blind manufacturer and installer
(200 employees, $30M revenue). They've heard "AI" is the future but have
no AI expertise. You've been hired as their AI consultant.

Task (time-boxed):
1. Discovery (10 min): What questions would you ask the CEO?
2. Opportunity Assessment (15 min): Identify and rank AI use cases
3. Solution Design (15 min): Detail your #1 recommendation
4. Ethics Check (10 min): What could go wrong? How do you prevent it?
5. Presentation (10 min): Summarize your plan as if presenting to the board

AI acts as the CEO during discovery and provides feedback on each phase.
```

---

### 5. Mock Interview Simulator

The AI takes on different interviewer personas for AI job interview practice. Each session is timed with transcript saving.

**Interview Types:**

#### A. AI Role Interview (45 min)
The AI interviews for a non-engineering AI role (randomly selected from: AI Trainer, Prompt Engineer, AI Solutions Consultant, AI Operations Specialist).

**System prompt for AI interviewer:**
```
You are a hiring manager at a tech company interviewing a candidate
for a non-engineering AI role. The candidate is transitioning from
a career as a professional window blind installer.

Ask questions that assess:
- Depth of AI understanding (can they explain concepts accurately?)
- Ability to explain technical concepts to non-technical people
- Problem-solving approach (how they'd apply AI to real situations)
- Understanding of AI ethics and limitations
- Genuine curiosity and learning ability
- How they frame their non-traditional background as a strength

Questions to rotate through:
1. "Explain how a neural network works to me as if I'm a customer
   asking about it at a dinner party."
2. "A client wants to use AI to automate customer service. Walk me
   through how you'd approach this."
3. "What's the difference between supervised and unsupervised
   learning? Can you give me a real-world example of each?"
4. "Tell me about a time in your previous career where you had to
   troubleshoot a complex problem. How does that skill apply to AI?"
5. "What are the biggest risks of deploying an AI system, and how
   would you mitigate them?"
6. "If you were evaluating an AI vendor's claims, what questions
   would you ask to cut through the hype?"
7. "Explain what a large language model is and why it sometimes
   makes things up."
8. "How would you explain the concept of bias in AI to a CEO who
   doesn't believe it's a real issue?"

After the session, provide a detailed scorecard (1-5) on:
- Technical knowledge depth
- Communication clarity
- Problem-solving approach
- Self-awareness about strengths and gaps
- Overall readiness for the role
```

#### B. Behavioral Interview (30 min)
Standard behavioral questions reframed for AI career transition.

**System prompt:**
```
You are a hiring manager conducting a behavioral interview for an
AI role. The candidate is transitioning from professional window
blind installation.

Ask questions that assess:
- Adaptability and learning agility
- Customer communication skills
- Problem-solving under pressure
- Attention to detail
- Teamwork and collaboration
- Why they want to move into AI

Help the candidate see how their trade experience maps to AI roles.

Questions to rotate through:
1. "Tell me about a time you had to explain something technical to
   a customer who didn't understand."
2. "Describe a job that went completely wrong. What happened and
   how did you handle it?"
3. "What motivated you to learn about AI? What was the moment you
   decided to make this career change?"
4. "Tell me about a time you improved a process or workflow. What
   did you change and what was the result?"
5. "Describe a situation where you had to learn something completely
   new very quickly."
6. "How do you handle it when a customer's expectations are unrealistic?"
7. "What's the most complex project you've managed? How did you
   keep everything on track?"
8. "Where do you see yourself in 2 years in this AI career?"

After the session, provide feedback on:
- STAR format execution
- Specificity of examples
- How well they connected trade experience to AI relevance
- Confidence and authenticity
- Areas to improve
```

#### C. Technical Concept Explainer (30 min)
The AI asks the candidate to explain AI concepts clearly and accurately — testing depth of understanding.

**System prompt:**
```
You are a senior AI professional testing a candidate's depth of
understanding. Ask them to explain AI concepts. Start simple and
go deeper based on their answers.

The candidate should NOT be expected to code or do math. They should
be expected to explain concepts accurately, use good analogies,
acknowledge limitations, and know when they're at the edge of their
knowledge.

Start with:
"Explain [concept] in a way that a business executive would understand."

Then probe deeper:
"Why does that happen?"
"What could go wrong with that approach?"
"How would you explain that differently to a technical audience?"

Concepts to test (rotate, start easy, get harder):
Easy: AI vs ML, supervised vs unsupervised, what is training data
Medium: How a neural network learns, what is a transformer, why
        LLMs hallucinate, what is fine-tuning
Hard: Attention mechanism, RLHF, embedding spaces, the alignment
      problem, RAG architecture

Score on:
- Accuracy (do they get the core concept right?)
- Clarity (could a non-technical person follow their explanation?)
- Depth (do they understand WHY, not just WHAT?)
- Intellectual honesty (do they say "I'm not sure" when appropriate?)
- Analogy quality (do their comparisons actually illuminate?)
```

---

### 6. "Scenarios" Module — Real-World AI Analysis

Exercises where the user analyzes real-world AI situations and formulates responses. This replaces the "Translate Your Experience" module from the FDE app.

**Exercise 1: AI Opportunity Spotter**
```
Read this business scenario. Identify 3 ways AI could help.
For each, specify: the AI type, the data needed, the expected
benefit, and one risk to watch for.

Scenario: "A regional home services company gets 500 calls per day.
Dispatchers manually assign technicians to jobs. They lose 20% of
calls to hold-time abandonment. Customer satisfaction is at 72%."
```

**Exercise 2: AI Hype Detector**
```
A vendor is pitching an AI product. Read their marketing claims
and identify: what's real, what's exaggerated, and what questions
you'd ask before buying.

Claims: "Our AI platform uses advanced deep learning to predict
customer behavior with 99% accuracy. Simply upload your data and
our proprietary algorithms will transform your business overnight.
No technical expertise required."
```

**Exercise 3: Ethics Scenario**
```
You're on a team evaluating an AI system for a company. Read the
scenario and write a recommendation.

Scenario: "A property management company wants to use AI to screen
rental applicants. The AI would analyze credit reports, social media,
and facial analysis during video interviews to predict 'reliability.'"
```

---

### 7. Progress Tracking

**SQLite Schema:**
```sql
CREATE TABLE progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  score REAL,
  time_spent_seconds INTEGER,
  notes TEXT,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flashcard_progress (
  card_id TEXT PRIMARY KEY,
  box INTEGER DEFAULT 1,
  times_reviewed INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  last_reviewed DATETIME,
  next_review DATETIME
);

CREATE TABLE interview_transcripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  interview_type TEXT NOT NULL,
  transcript TEXT NOT NULL,
  ai_feedback TEXT,
  duration_seconds INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section INTEGER NOT NULL,
  quiz_id TEXT NOT NULL,
  answers TEXT NOT NULL,
  score REAL NOT NULL,
  time_spent_seconds INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## UI/UX Guidelines

### Layout
- **Left sidebar**: Navigation with 14-section curriculum, each section expandable to show activities
- **Top bar**: Overall progress bar (% complete), current section indicator
- **Main content area**: Active module
- **Right panel** (collapsible): AI tutor chat, available in every view

### Design
- Clean, approachable look — NOT intimidating or overly "techy"
- Dark mode by default (toggle available)
- Color scheme: warm dark backgrounds (not corporate blue — think workshop/garage feel), amber/gold accents, green for progress/success
- Friendly, readable fonts — larger body text than typical dev tools
- Progress indicators on every activity card
- Generous whitespace — this isn't a code editor, it's a learning tool

### Key Interactions
- Flashcards: click to flip, rate difficulty (Easy/Medium/Hard) to drive spaced repetition. Blind installation analogy prominently displayed on back of every card
- Quizzes: Multiple choice with immediate feedback and detailed explanations using analogies
- Labs: Step-by-step with instructions, workspace textarea, AI hint button, and AI review
- Blinds to Bytes: Two-column layout, click any row to expand detailed comparison
- Mock Interviews: Chat interface with timer, transcript saves automatically
- Scenarios: Guided analysis exercises with AI feedback

### Tone of All Content
- Conversational, never condescending
- Technical terms are ALWAYS introduced with a plain-English explanation first
- Humor is welcome — the absurdity of comparing window blinds to neural networks is part of the charm
- No assumed knowledge of math, programming, or computer science
- When concepts genuinely require math/code to fully understand, be honest about it: "The full picture involves calculus, but here's the intuition..."

---

## AI Integration Details

### System Prompt Templates

**Critical context to include in ALL system prompts:**
```
The user is a professional window blind installer pivoting into
a non-engineering AI career. They have zero formal tech education
but are smart, curious, and great at hands-on problem solving.

Key background:
- Years of experience installing window blinds (residential and
  commercial), including measuring, cutting, mounting, and
  troubleshooting
- Strong customer communication skills — regularly explains
  technical options (inside vs. outside mount, motorized vs.
  manual, material choices) to homeowners
- Detail-oriented — precision measurements, quality checks
- Experienced troubleshooter — diagnoses fit problems, uneven
  brackets, cord malfunctions, light gaps
- No programming experience
- No college degree in a technical field
- Currently learning AI to transition into non-engineering AI roles

When explaining concepts:
- ALWAYS start with a window blind installation analogy first
- Use specific blind terminology (headrail, valance, tilt rod,
  inside mount, reveal depth, deductions) — the user knows these
- THEN introduce the technical AI term
- Never assume math or programming knowledge
- Encourage questions — "does that analogy make sense?" moments
- Be honest when a concept truly requires technical depth to fully
  grasp — don't oversimplify to the point of inaccuracy
```

---

## Environment & Setup

### .env.example
```
ANTHROPIC_API_KEY=your-key-here
PORT=3001
DATABASE_PATH=./data/progress.db
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "nodemon server/index.js",
    "dev:client": "cd client && vite",
    "build": "cd client && vite build",
    "start": "node server/index.js",
    "seed": "node server/db/seed.js",
    "reset": "rm -f data/progress.db && npm run seed"
  }
}
```

---

## Key Design Principles

1. **Analogies are everything** — The blind installation analogies aren't just a gimmick, they're the entire pedagogical approach. Every concept gets grounded in something physical and familiar before the abstraction.
2. **No gatekeeping** — Never imply that "real" understanding requires coding or math. Many AI concepts are genuinely accessible without either.
3. **Depth over breadth** — Better to truly understand 50 concepts than to skim 200. When the user finishes, they should be able to explain any covered concept accurately to anyone.
4. **Active recall > passive reading** — Flashcards, quizzes, labs, and scenario analysis over long articles.
5. **Career-oriented from Section 1** — Every section should connect to "how does this help you get an AI job?"
6. **Honest about limits** — Some concepts genuinely require math/code to fully understand. Be upfront about this. "You can understand WHAT attention does and WHY it matters without knowing the linear algebra. Here's the intuition."
7. **AI as tutor, not lecture** — The AI asks probing questions, pushes the user to explain concepts in their own words, and uses Socratic method.
8. **Build real things** — By the end, the user should have actually built something with AI (even if no-code) and have portfolio pieces.

---

## Notes for Claude Code

- The blind installation analogies are the most important content in this entire app. They need to be genuinely clever and accurate on BOTH sides — the installation side AND the AI side. Don't force analogies that don't work.
- Use real blind installation terminology throughout (headrail, valance, tilt rod, cord lock, bracket, spacer block, reveal depth, deductions, inside mount, outside mount, J-channel, fascia board, clutch mechanism, etc.). The user should feel like the app was written by someone who understands their trade.
- The tone should feel like a knowledgeable friend explaining things, not a textbook. Conversational, occasionally funny, always respectful.
- Labs that use real AI tools (ChatGPT, Claude, image generators, no-code platforms) should include specific step-by-step instructions — don't assume the user knows how to navigate these tools.
- Mock interview questions should be realistic for actual non-engineering AI roles that exist today.
- The career section (Section 12) should include real salary ranges, real job titles, and real advice — not aspirational fluff.
- The app should work offline for everything except AI features. All static content is bundled.
