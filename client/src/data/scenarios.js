export const scenarios = [
  {
    id: "scenario-01",
    title: "AI Opportunity Spotter",
    section: 11,
    difficulty: "medium",
    estimatedMinutes: 20,
    overview:
      "Read a real-world business scenario, identify three ways AI could help, and articulate the specifics for each — the type of AI, the data it needs, the expected benefit, and the risks to watch for. This is the bread and butter of an AI Solutions Consultant role.",
    scenario:
      "A regional home services company gets 500 calls per day across plumbing, HVAC, electrical, and handyman services. Dispatchers manually assign technicians to jobs based on who they think is available and close by — mostly from memory and a shared spreadsheet. They lose 20% of calls to hold-time abandonment (customers hanging up before they get through). Customer satisfaction is at 72%, and their biggest complaint is 'I had to explain my problem three times to three different people.' Technicians average 3.5 jobs per day but spend 45 minutes driving between them. The company has 10 years of job records (service type, duration, location, technician, customer rating) in a legacy database, plus recordings of every phone call from the last 2 years.",
    guidingQuestions: [
      "What are the highest-pain, highest-data areas in this business?",
      "Which problems could AI address with the data they already have?",
      "For each AI opportunity, what specific type of AI would you use (NLP, optimization, prediction, classification)?",
      "What data would each solution need, and does the company already have it?",
      "What could go wrong with each solution? What biases might appear?",
      "How would you prioritize these opportunities — which one first and why?",
    ],
    evaluationCriteria: [
      {
        criterion: "Opportunity Identification",
        description:
          "Did you identify at least 3 distinct AI opportunities that are realistic given the company's data and situation?",
      },
      {
        criterion: "Technical Specificity",
        description:
          "For each opportunity, did you name the specific AI approach (not just 'use AI') and explain why that approach fits?",
      },
      {
        criterion: "Data Awareness",
        description:
          "Did you connect each opportunity to specific data the company has (or would need to collect)?",
      },
      {
        criterion: "Risk Identification",
        description:
          "Did you identify realistic risks and potential problems, not just benefits?",
      },
      {
        criterion: "Prioritization Logic",
        description:
          "Did you prioritize based on clear criteria (feasibility, impact, data readiness, risk) rather than just picking the flashiest option?",
      },
      {
        criterion: "Blind Analogy",
        description:
          "Bonus: Did you connect any of your analysis to blind installation concepts (site survey, measuring before cutting, sample room, etc.)?",
      },
    ],
    sampleResponse:
      "A strong response might identify: (1) AI-powered call routing using NLP to understand the customer's problem from their first sentence and route to the right department — reducing the 'explained my problem three times' issue. Uses the 2 years of call recordings as training data. Risk: NLP might misclassify unusual requests. (2) Smart dispatch optimization using the 10 years of job records to predict job duration and optimal routing — increasing from 3.5 to 4.5+ jobs per day. Risk: historical data might reflect biased assignment patterns. (3) Predictive scheduling using historical patterns to forecast call volume by day/time/service type — reducing hold-time abandonment by staffing appropriately. Risk: unusual events (storms, cold snaps) could break the pattern.",
  },
  {
    id: "scenario-02",
    title: "AI Hype Detector",
    section: 11,
    difficulty: "medium",
    estimatedMinutes: 15,
    overview:
      "A vendor is pitching an AI product. Your job is to separate legitimate capabilities from marketing hype, identify red flags, and formulate the questions you'd ask before recommending this product to a business. This is a critical skill for anyone in an AI-adjacent role.",
    scenario:
      "You're sitting in a meeting at a mid-size company. A vendor is presenting their product, 'OmniPredict AI,' with the following claims:\n\n'Our AI platform uses advanced deep learning to predict customer behavior with 99% accuracy. Simply upload your data and our proprietary algorithms will transform your business overnight. No technical expertise required. Our system works across any industry — retail, healthcare, finance, manufacturing — with zero customization needed. We've processed over 10 billion data points. Our competitors use outdated machine learning, but OmniPredict uses cutting-edge neural networks with 500 billion parameters. We guarantee ROI within 30 days.'\n\nThe slides show impressive graphs with hockey-stick growth curves from 'anonymized clients.' The demo shows a clean dashboard with predictions. When someone asks about how it works, the presenter says, 'That's our proprietary secret sauce — we can't reveal our methodology, but trust us, the results speak for themselves.'",
    guidingQuestions: [
      "Which claims sound legitimate and which sound exaggerated or impossible?",
      "What does '99% accuracy' actually mean — and what questions would you ask to understand it?",
      "Why is 'works across any industry with zero customization' a red flag?",
      "What's suspicious about refusing to explain methodology?",
      "What specific questions would you ask this vendor before making any recommendation?",
      "How does this compare to how you'd evaluate a new product or tool in the blind installation trade?",
    ],
    evaluationCriteria: [
      {
        criterion: "Hype Detection",
        description:
          "Did you identify the major red flags: '99% accuracy,' 'overnight transformation,' 'zero customization,' 'works across any industry,' 'guaranteed ROI in 30 days'?",
      },
      {
        criterion: "Technical Understanding",
        description:
          "Did you demonstrate understanding of why these claims are problematic (e.g., accuracy without context is meaningless, no model works everywhere, ROI guarantees are unrealistic)?",
      },
      {
        criterion: "Critical Questions",
        description:
          "Did you formulate specific, probing questions that would reveal the truth behind the marketing (e.g., 'What does 99% accuracy mean — precision, recall, F1? On whose data?')?",
      },
      {
        criterion: "Methodology Concern",
        description:
          "Did you flag the refusal to explain methodology as a serious issue for trust, explainability, and compliance?",
      },
      {
        criterion: "Practical Wisdom",
        description:
          "Did your analysis show the kind of practical skepticism that would protect a company from a bad purchase?",
      },
    ],
    sampleResponse:
      "A strong response would flag: (1) '99% accuracy' — accuracy at what? On what data? Their test set or real-world conditions? Is this precision, recall, or something else? You wouldn't trust a tape measure that's '99% accurate' without knowing the margin of error and what it was tested against. (2) 'Works across any industry with zero customization' — this is like claiming one type of blind fits every window in every building. It's physically impossible. Every industry has different data, different patterns, different requirements. (3) 'Proprietary secret sauce' — in AI, refusing to explain methodology is a massive red flag. How do you evaluate bias? How do you audit decisions? This is like an installer who won't show you the brackets they're using. (4) 'Guaranteed ROI in 30 days' — legitimate AI vendors don't guarantee timelines because implementation complexity varies wildly. This is a sales tactic, not a technical claim.",
  },
  {
    id: "scenario-03",
    title: "Ethics Scenario: AI Tenant Screening",
    section: 10,
    difficulty: "hard",
    estimatedMinutes: 25,
    overview:
      "You're on a team evaluating an AI system that a company wants to deploy. The system raises serious ethical concerns. Your job is to analyze the risks, articulate why they matter, and write a recommendation. This exercises the skills needed for AI Ethics Analyst and AI Quality Assurance roles.",
    scenario:
      "A large property management company (managing 15,000 rental units across 8 states) wants to deploy an AI system to screen rental applicants. The system, built by a startup called TenantScore AI, would:\n\n1. Analyze credit reports (standard practice, already done manually)\n2. Scan applicants' public social media posts for 'red flags' (party photos, complaints about landlords, mentions of pets when applying to no-pet units)\n3. Use facial analysis during required video interviews to assess 'trustworthiness and emotional stability' based on micro-expressions\n4. Generate a 1-100 'Reliability Score' that determines approval, conditional approval, or rejection\n5. The system was trained on 5 years of the company's historical data: past tenants rated as 'good' (renewed lease, no complaints, no late payments) or 'bad' (evicted, frequent complaints, late payments)\n\nThe property management company is excited because their manual screening process takes 3 days per applicant and they want to reduce it to 3 minutes. TenantScore AI claims their system reduces eviction rates by 40%.",
    guidingQuestions: [
      "Which components of this system are ethically acceptable, and which cross lines?",
      "What biases could exist in the historical training data (5 years of 'good' vs. 'bad' tenant ratings)?",
      "Why is facial analysis for 'trustworthiness' particularly problematic?",
      "What are the legal risks? (Think Fair Housing Act, FCRA, state privacy laws)",
      "What would a responsible alternative look like — using AI to help with screening without the problematic elements?",
      "How would you explain your concerns to a non-technical executive who just sees '40% fewer evictions'?",
    ],
    evaluationCriteria: [
      {
        criterion: "Ethical Analysis Depth",
        description:
          "Did you identify the specific ethical problems with each component (social media scanning, facial analysis, historical bias)?",
      },
      {
        criterion: "Bias Identification",
        description:
          "Did you recognize how historical 'good/bad tenant' data could encode racial, economic, and demographic biases?",
      },
      {
        criterion: "Legal Awareness",
        description:
          "Did you flag potential violations of fair housing laws, privacy regulations, and anti-discrimination protections?",
      },
      {
        criterion: "Facial Analysis Critique",
        description:
          "Did you specifically challenge the pseudoscience of inferring 'trustworthiness' from facial expressions, and its documented racial bias?",
      },
      {
        criterion: "Constructive Alternative",
        description:
          "Did you propose a responsible alternative rather than just saying 'don't use AI'?",
      },
      {
        criterion: "Communication Clarity",
        description:
          "Could a non-technical executive understand your recommendation and the reasoning behind it?",
      },
    ],
    sampleResponse:
      "A strong response would: (1) Separate the acceptable (credit report analysis — already standard, just faster) from the unacceptable (facial analysis, social media scanning). (2) Identify historical bias: if the company has historically discriminated (consciously or not) in who they evict or complain about, the AI will learn and amplify those patterns. If tenants in lower-income zip codes got more complaints, the AI will score future applicants from those areas lower — a digital redlining effect. (3) Flag facial analysis as pseudoscience: there is no scientific basis for inferring trustworthiness from micro-expressions, and this technology has documented racial bias (performing differently across skin tones and cultural expressions). (4) Note legal risks: Fair Housing Act prohibits discrimination based on race, religion, national origin, sex, disability, and familial status. Social media scanning could reveal protected characteristics. Facial analysis has been banned in several jurisdictions for employment screening. (5) Recommend an alternative: use AI for the parts that are ethically defensible (automating credit check processing, standardizing income verification, reducing processing time) while keeping human judgment for the subjective assessment, with bias audits and transparent criteria.",
  },
];
