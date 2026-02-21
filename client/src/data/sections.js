export const sections = [
  {
    id: 1,
    title: "What Even Is AI?",
    subtitle: "Demystifying the Buzzwords",
    description:
      "Strip away the hype and understand what AI actually is, what it isn't, and why everyone suddenly cares. You already understand precision, troubleshooting, and quality control — turns out those are AI concepts in work boots.",
    theme: "foundations",
    analogyAnchor:
      "AI is like having a really experienced installer who's done 10,000 jobs — they can look at a window and know what's going to work before they even measure. Except the AI \'learned\' from data instead of from years on the job.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 4 },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 2,
    title: "How Machines Learn",
    subtitle: "The Three Ways",
    description:
      "Supervised, unsupervised, and reinforcement learning — three ways machines pick things up. Think of it as the difference between training an apprentice with examples, sorting a mixed warehouse by instinct, and trial-and-error on the job site.",
    theme: "learning",
    analogyAnchor:
      "Supervised learning is like training a new installer by showing them 100 completed jobs and saying 'this is what good looks like.' Unsupervised learning is like dumping a pile of mixed blinds on a table and asking them to sort them into groups without telling them the categories. Reinforcement learning is like letting them try installations and just saying 'good job' or 'try again' after each one.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 6 },
      { type: "lab", label: "Lab 1: Learning Type Detective" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 3,
    title: "Data — The Raw Material",
    subtitle: "Garbage In, Garbage Out",
    description:
      "Data is to AI what measurements are to blinds — if your inputs are off, everything downstream fails. Learn about datasets, data quality, bias, and why data scientists spend 80% of their time cleaning data (sound familiar?).",
    theme: "data",
    analogyAnchor:
      "Data is your raw material — it's the equivalent of every measurement, every cut list, every customer spec sheet you've ever written down. If your measurements are sloppy, your blinds won't fit. If your data is sloppy, your AI won't work. Cleaning data is like going through old job orders and fixing the ones where someone wrote '36' but meant '36.5' — tedious but critical.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 8 },
      { type: "lab", label: "Lab 2: Data Quality Inspector" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 4,
    title: "Neural Networks",
    subtitle: "How AI \"Thinks\"",
    description:
      "Under the hood, AI runs on neural networks — layers of simple decisions that combine into complex ones. It's a lot like a multi-person installation crew where each stage builds on the last.",
    theme: "neural-networks",
    analogyAnchor:
      "A neural network is like a crew of installers working in stages. The first crew member measures the window (input layer). They hand their notes to the next person who calculates the cut dimensions — but they might check with another person about whether inside mount or outside mount is better (hidden layers). The last person makes the final call on the complete spec (output layer). Training is like doing this 10,000 times and after each job, going back and adjusting everyone's approach based on whether the blind fit perfectly or was off.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 4 },
      { type: "lab", label: "Lab 3: Neural Network Walkthrough" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 5,
    title: "Language AI",
    subtitle: "How Machines Understand Words",
    description:
      "From tokenization to transformers, learn how AI turns raw text into understanding. The same way you parse a work order — pulling out window dimensions, mount type, and color — language AI pulls meaning from words.",
    theme: "nlp",
    analogyAnchor:
      "When you read a work order, you naturally focus on the important parts — window dimensions, mount type, color — and skip the fluff. That's basically what the 'attention mechanism' does in a Transformer. It figures out which words in a sentence are most relevant to understanding the meaning. Tokenization is like how you break a job address into parts: street number, street name, city, zip — each piece means something specific.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 2 },
      { type: "lab", label: "Lab 4: Language AI Explorer" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 6,
    title: "Vision AI",
    subtitle: "How Machines See",
    description:
      "Computer vision starts with millions of tiny colored dots and learns to see objects, faces, and text. It's the same progression you make when scanning a window: edges, frame shape, window type, full context.",
    theme: "vision",
    analogyAnchor:
      "When you look at a window, you instantly see: double-hung, 36 inches wide, white frame, inside mount possible. You don't think about it — your brain just processes it. Computer vision is teaching a machine to do the same thing, except it starts by seeing millions of tiny colored dots (pixels) and has to learn that certain patterns of dots mean 'window' and others mean 'door frame.' A CNN is like how you scan a window: first you notice the edges, then the frame shape, then the type, then the full context of the room. Each layer sees more of the big picture.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 2 },
      { type: "lab", label: "Lab 5: Vision AI Testing" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 7,
    title: "Large Language Models",
    subtitle: "The ChatGPT Era",
    description:
      "LLMs are giant pattern-matching engines trained on oceans of text. They can talk fluently about anything — but they've never actually done any of it. Understanding how they work (and why they hallucinate) is essential.",
    theme: "llms",
    analogyAnchor:
      "An LLM is like an installer who has read every installation manual ever written for every blind manufacturer in every language. They can talk fluently about any type of blind — but they've never actually installed one. They might confidently describe an installation process that sounds perfect but has a critical flaw, because they're generating plausible instructions, not recalling actual experience. That's a hallucination. Parameters are like all the micro-adjustments in your technique — hand pressure, angle, speed — except an LLM has 70 billion of them.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 4 },
      { type: "lab", label: "Lab 6: LLM Comparison Lab" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 8,
    title: "Prompt Engineering",
    subtitle: "Talking to AI Effectively",
    description:
      "The same AI gives wildly different results depending on how you ask. Prompt engineering is the skill of writing the perfect customer order — specific, detailed, and unambiguous — for an AI.",
    theme: "prompting",
    analogyAnchor:
      "Prompt engineering is exactly like taking a customer order. 'I want blinds' is a terrible order — you'd need to ask a dozen follow-up questions. 'I need 2-inch faux wood blinds, inside mount, cordless lift, pearl white, for a 36x48 bathroom window with 1.5 inches of depth' is a perfect order. Prompt engineering is the skill of writing that perfect order for an AI. Few-shot prompting is like showing the AI a photo of a completed job and saying 'do it like this.' Chain-of-thought is like asking the installer to talk through their process step by step instead of just giving you the final number.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 5 },
      { type: "lab", label: "Lab 7: Prompt Engineering Workshop" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 9,
    title: "AI Tools You Can Use Today",
    subtitle: "No Coding Required",
    description:
      "A hands-on tour of the AI tools available right now — text, image, voice, automation — and when to use each one. The same principle as your toolbox: right tool, right job.",
    theme: "tools",
    analogyAnchor:
      "You wouldn't use a drill to measure a window or a tape measure to drive screws. Same with AI tools — ChatGPT is great for text but terrible for images. Midjourney makes stunning images but can't write a proposal. An API is like having a universal adapter — it lets different tools connect and work together, like how your cordless drill battery fits your saw, your light, and your impact driver.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 7 },
      { type: "lab", label: "Lab 8: AI Tool Exploration" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 10,
    title: "AI Ethics, Safety & Bias",
    subtitle: "Building AI You Can Stand Behind",
    description:
      "Where bias comes from, why it matters, and what responsible AI looks like. The same principles that make you stand behind your installations apply here — quality work, transparency, and accountability.",
    theme: "ethics",
    analogyAnchor:
      "If you only ever installed blinds in brand-new suburban homes, you'd be terrible at older buildings with non-standard windows. That's bias — your 'training data' was too narrow. Now imagine an AI trained mostly on data from one demographic making decisions about loans, hiring, or healthcare for everyone. That's the same problem at massive scale, with real consequences. Explainability is like being able to show the customer exactly why you recommended inside mount vs. outside mount — not just 'trust me,' but showing the measurements and reasoning.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 6 },
      { type: "lab", label: "Lab 9: Bias Detective" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 11,
    title: "AI in Business",
    subtitle: "How Companies Actually Use It",
    description:
      "How real businesses evaluate, pilot, and scale AI — and why most AI projects fail. If you can estimate a big commercial job, you can understand an AI implementation lifecycle.",
    theme: "business",
    analogyAnchor:
      "Running an AI project is a lot like running a big commercial blind installation. You start with a site survey (discovery), then you spec out the job (design), do a sample room to make sure everything works (proof of concept), then roll out floor by floor (scaling). Most failed AI projects are like showing up to install without measuring first — you're guaranteed to waste time and money. Change management is like convincing a building manager to switch from manual blinds to motorized — it's better, but people resist change.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 7 },
      { type: "lab", label: "Lab 10: AI Business Proposal" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 12,
    title: "The AI Job Landscape",
    subtitle: "Where You Fit In",
    description:
      "Real AI roles that don't require coding, what they pay, and how your trade experience is actually an advantage. The best installers aren't the ones with engineering degrees — they're the ones who understand the craft and communicate well.",
    theme: "careers",
    analogyAnchor:
      "You know how the best installers aren't always the ones with engineering degrees — they're the ones who understand the craft, communicate well with customers, and know how to solve problems on the fly? AI jobs are going the same way. Companies are realizing they need people who understand how AI works AND can talk to real humans about it. Your experience dealing with customers, troubleshooting on-site, and explaining technical options in plain English is exactly what these roles need.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 18 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 2 },
      { type: "lab", label: "Lab 11: Resume & Portfolio Builder" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 13,
    title: "Building AI Solutions Without Code",
    subtitle: "From Consumer to Creator",
    description:
      "No-code platforms, AI agents, chatbot builders, and workflow automation. You don't need to understand electrical engineering to install motorized blinds — same idea here.",
    theme: "no-code",
    analogyAnchor:
      "No-code AI is like motorized blinds with a remote — you don't need to understand electrical engineering to install them and make them work perfectly. You need to understand the specs, the mounting, the programming sequence, and how to troubleshoot when something's off. Same with no-code AI tools — you don't write code, but you need to understand the components and how they fit together.",
    activities: [
      { type: "flashcards", label: "Flashcards", count: 20 },
      { type: "blinds-to-bytes", label: "Blinds to Bytes", count: 2 },
      { type: "lab", label: "Lab 12: Build an AI Solution" },
      { type: "quiz", label: "Quiz", questionCount: 20 },
    ],
  },
  {
    id: 14,
    title: "Capstone",
    subtitle: "Prove What You Know",
    description:
      "Put it all together — a full AI strategy project, mock interviews, comprehensive review, and a 50-question final assessment. Time to show that you can walk into a room of engineers and hold your own.",
    theme: "capstone",
    analogyAnchor:
      "This is the commercial job walkthrough — the client wants to see the full package. Measure it, spec it, plan it, install it, stand behind it. You've learned all the concepts. Now prove you can put them together.",
    activities: [
      { type: "lab", label: "Lab 13: Full AI Strategy Project" },
      { type: "mock-interview", label: "Mock Interview (45 min)" },
      { type: "flashcard-review", label: "Review All Weak Cards" },
      { type: "quiz", label: "Final Assessment", questionCount: 50 },
    ],
  },
];
