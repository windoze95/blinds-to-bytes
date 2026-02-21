export const conceptMappings = [
  // ── DATA CATEGORY (Section 3) ──────────────────────────────────────
  {
    id: "map-data-01",
    category: "data",
    blinds: {
      name: "Measuring the Window",
      description:
        "Taking precise measurements of the window opening — width, height, depth — to determine the correct blind size. Inside mount requires measuring the reveal depth to ensure the blind fits. Measurements are taken at multiple points because windows aren't perfectly square.",
    },
    ai: {
      name: "Data Collection",
      description:
        "Gathering the raw information that will be used to train an AI model. Like measurements, data needs to be precise, comprehensive, and representative. Collecting data from multiple sources (like measuring at multiple points) produces better, more reliable results.",
    },
    notes:
      "Both require precision — bad measurements = bad blinds, bad data = bad AI.",
    detailedComparison:
      "A window installer who eyeballs measurements will produce blinds that gap and bind. A data scientist who grabs the first dataset they find online will produce an AI that makes sloppy predictions. In both cases, the quality of your raw inputs is the single biggest factor in the quality of your output. An experienced installer measures at three points (top, middle, bottom) and uses the smallest reading. A good data scientist collects data from multiple sources and cross-validates. The discipline is the same — never trust a single data point.",
    section: 3,
  },
  {
    id: "map-data-02",
    category: "data",
    blinds: {
      name: "The Cut List",
      description:
        "The organized list of measurements written down for a job — each window's width, height, mount type, and special notes. This is the document the fabricator or the saw operator works from. A good cut list is clear, consistent, and complete.",
    },
    ai: {
      name: "A Dataset",
      description:
        "A structured collection of data organized into rows and columns (or records and fields). Each entry represents one observation, and each column represents a feature. Like a cut list, a dataset needs to be consistently formatted and complete to be useful.",
    },
    notes:
      "Both are organized records of observations that someone else will act on downstream.",
    detailedComparison:
      "Your cut list is the single source of truth for a job. If it says 35.5 inches, that's what gets cut — no questions asked. A dataset works the same way for AI: whatever's in the data is what the model learns from. A typo on the cut list means a blind that doesn't fit. A typo in the dataset means a model that makes wrong predictions. Both need to be meticulously organized and double-checked before anyone acts on them.",
    section: 3,
  },
  {
    id: "map-data-03",
    category: "data",
    blinds: {
      name: "Measuring at Multiple Points",
      description:
        "Taking width measurements at the top, middle, and bottom of the window, and height measurements at the left, center, and right. Windows are rarely perfectly square, especially in older homes. You use the smallest measurement for inside mounts to ensure the blind fits.",
    },
    ai: {
      name: "Data from Multiple Sources / Augmentation",
      description:
        "Collecting training data from different sources, perspectives, or conditions to build a more robust dataset. Data augmentation also creates variations of existing data (flipping images, adding noise) to help the model generalize better.",
    },
    notes:
      "Multiple data points in both worlds prevent you from getting burned by outliers.",
    detailedComparison:
      "If you only measured at the top of the window and it was 36 inches, but the middle bows in at 35.25, you'd cut a blind that won't slide into the opening. Measuring at multiple points catches the real picture. In AI, training on data from only one source is like measuring at only one point — the model will be confidently wrong about any scenario that doesn't match its narrow experience. Data augmentation is like an installer who mentally accounts for settling, warping, and non-square frames before writing down the final number.",
    section: 3,
  },
  {
    id: "map-data-04",
    category: "data",
    blinds: {
      name: "A Window That's Not Square",
      description:
        "Common in older buildings: the window frame has shifted over time, so opposite corners aren't at 90 degrees. The opening might be 36 inches at the top and 35.5 at the bottom. This requires judgment calls about how to get the best fit.",
    },
    ai: {
      name: "Noisy / Imperfect Data",
      description:
        "Real-world data is rarely clean and consistent. Sensor errors, human mistakes, missing values, and inconsistencies are the norm. AI models need to handle this 'noise' without being thrown off by it, just like an installer needs to work with imperfect windows.",
    },
    notes:
      "Perfect conditions only exist in textbooks. Both trades deal with messy reality.",
    detailedComparison:
      "You'll never find a perfectly square window in a 1920s bungalow, and you'll never find a perfectly clean dataset in the real world. The skill isn't avoiding imperfection — it's knowing how to work with it. An experienced installer knows when to use a spacer block, when to shim, and when to tell the customer that outside mount is the smarter play. An experienced data scientist knows when to impute missing values, when to drop outliers, and when to restructure the whole approach. Both are judgment calls born from experience.",
    section: 3,
  },
  {
    id: "map-data-05",
    category: "data",
    blinds: {
      name: "Measure Twice, Cut Once",
      description:
        "The oldest rule in the trades. Verify your measurements before committing to an irreversible cut. Once the material is cut too short, there's no adding it back. The cost of double-checking is tiny compared to the cost of waste and rework.",
    },
    ai: {
      name: "Data Validation",
      description:
        "Checking your data for errors, inconsistencies, and problems before using it to train a model. Training on bad data is expensive and produces a model you'll have to retrain. Like measuring twice, validating is a small upfront cost that prevents major downstream waste.",
    },
    notes:
      "Both are about catching mistakes before they become expensive. Prevention over rework.",
    detailedComparison:
      "You've seen what happens when someone skips the second measurement — a $200 blind cut half an inch too short, a wasted trip, and an unhappy customer. In AI, training a model on unvalidated data can cost thousands in compute time and weeks of work, only to discover the model learned from garbage. A data validation step — checking for missing values, verifying ranges make sense, sampling entries to confirm accuracy — is your 'measure twice.' It costs almost nothing and saves everything.",
    section: 3,
  },
  {
    id: "map-data-06",
    category: "data",
    blinds: {
      name: "Deductions for Inside Mount Clearance",
      description:
        "When ordering inside-mount blinds, you subtract a small amount (usually 1/4 to 1/2 inch) from the measured width so the blind fits within the window opening without binding. Different manufacturers require different deduction amounts. Getting this wrong means the blind either won't fit or has visible gaps.",
    },
    ai: {
      name: "Data Preprocessing / Feature Engineering",
      description:
        "Transforming raw data into a form the model can actually use. This might mean normalizing numbers to a standard range, encoding categories as numbers, or creating new features from existing ones. Like deductions, the raw measurement isn't what you feed into the next step — you transform it first.",
    },
    notes:
      "Raw inputs need adjustment before they're useful downstream. The transformation matters as much as the measurement.",
    detailedComparison:
      "You never hand the raw window measurement to the saw operator for an inside mount — you apply the deduction first. The deduction depends on the manufacturer, the product line, and sometimes the mounting hardware. In AI, raw data almost never goes straight into a model. You preprocess it: scaling numbers so they're comparable, converting text to numbers, extracting the useful signal from noise. Feature engineering — deciding which transformations to apply — is a skill that separates good data work from mediocre, just like knowing the right deduction separates a clean install from a callback.",
    section: 3,
  },
  {
    id: "map-data-07",
    category: "data",
    blinds: {
      name: "A Complete Job Folder",
      description:
        "The full package for a job: measurements, photos of each window, customer notes about preferences, mount type decisions, product selections, and any special considerations (obstacles, trim, deep sills). Everything someone needs to execute the install without guessing.",
    },
    ai: {
      name: "A Labeled Dataset",
      description:
        "A dataset where each entry includes both the input data and the correct answer (the 'label'). For example, photos of windows labeled with the correct window type, or customer reviews labeled as positive or negative. The labels are what teach the model what the right answer looks like.",
    },
    notes:
      "Both are complete packages where every entry has context and answers attached.",
    detailedComparison:
      "A job folder without photos is just numbers on a page — anyone taking over the job would have to guess at context. A dataset without labels is just raw information — the model has no idea what it's supposed to learn. The photos in your job folder ARE the labels: they show the mounting surface, the obstacles, the trim situation. They turn abstract measurements into a complete picture. In AI, labeled data turns raw inputs into learning material. Both take effort to assemble properly, and both are dramatically more valuable than their unlabeled counterparts.",
    section: 3,
  },
  {
    id: "map-data-08",
    category: "data",
    blinds: {
      name: "Old Job Folders with Coffee Stains and Missing Info",
      description:
        "We've all inherited those folders — measurements without window labels, photos so blurry you can't tell the frame color, customer notes in illegible handwriting, pages stuck together, half the specs missing. Technically it's data, but using it as-is will cause problems.",
    },
    ai: {
      name: "Dirty Data That Needs Cleaning",
      description:
        "Real-world datasets plagued by missing values, duplicate entries, inconsistent formats, typos, and outdated information. Before it can be used for training, dirty data needs to be cleaned — filling gaps, removing duplicates, standardizing formats, and verifying accuracy.",
    },
    notes:
      "Both worlds spend more time cleaning up messes than anyone likes to admit.",
    detailedComparison:
      "Data scientists spend roughly 80% of their time cleaning data. Sound familiar? How much time have you spent deciphering someone else's chicken-scratch cut lists or remeasuring windows because the original folder is useless? Dirty data in AI is the same headache at a larger scale: a million-row spreadsheet where 'New York' appears as 'NY,' 'new york,' 'N.Y.,' and 'New Yrok.' Every inconsistency is a potential error in the model's training. The fix is the same in both worlds — patient, methodical cleanup before you even think about the next step.",
    section: 3,
  },

  // ── LEARNING CATEGORY (Section 2) ──────────────────────────────────
  {
    id: "map-learn-01",
    category: "learning",
    blinds: {
      name: "Training an Apprentice by Showing Completed Jobs",
      description:
        "You walk a new hire through finished installations: 'See how this inside-mount cellular shade sits flush in the reveal? That's what right looks like. See this gap on the left side? That's what wrong looks like.' You show them enough examples until they can judge quality on their own.",
    },
    ai: {
      name: "Supervised Learning",
      description:
        "The most common type of machine learning. You give the model thousands of examples where the correct answer is already provided (labeled data). The model studies these input-output pairs until it can predict the correct output for new, unseen inputs.",
    },
    notes:
      "Both learn from labeled examples — 'this is right, this is wrong' — until they can generalize.",
    detailedComparison:
      "When you train an apprentice, you don't just tell them the theory — you show them job after job. 'This bracket placement is correct. This one is too low.' After enough examples, they develop an eye for it. Supervised learning works identically: show the AI 10,000 photos of correctly installed blinds and 10,000 photos of bad installs, labeled accordingly. Eventually it can look at a new photo and tell you which category it falls into. The quality of your teaching examples directly determines how good the student gets — true for apprentices and algorithms alike.",
    section: 2,
  },
  {
    id: "map-learn-02",
    category: "learning",
    blinds: {
      name: "Sorting a Pile of Mixed Inventory by Eye",
      description:
        "Someone dumps a truck full of mixed blinds in the warehouse — no labels, no tags. You start grouping them: faux wood here, aluminum mini-blinds there, cellular shades in the corner, verticals along the wall. Nobody told you the categories — you just recognize patterns from experience.",
    },
    ai: {
      name: "Unsupervised Learning",
      description:
        "A type of machine learning where the model receives data without any labels or correct answers. Its job is to find patterns, clusters, or structure in the data on its own. Used for customer segmentation, anomaly detection, and discovering hidden groupings.",
    },
    notes:
      "No labels, no answer key — just pattern recognition and natural groupings.",
    detailedComparison:
      "When you sort that pile of mixed inventory, nobody handed you a checklist. You look at materials, sizes, mechanisms, and colors and group things that belong together. That's exactly what unsupervised learning does with data: finds natural clusters without being told what the groups should be. A retailer might use it to discover that their customers naturally fall into five buying patterns nobody had noticed. The AI doesn't know what to call the groups — it just sees that certain data points are more similar to each other than to others, same as how you'd sort blinds without a product catalog in hand.",
    section: 2,
  },
  {
    id: "map-learn-03",
    category: "learning",
    blinds: {
      name: "Try It, I'll Tell You If It's Right",
      description:
        "Instead of showing the apprentice every step, you let them attempt the install themselves. When they get a bracket level, you say 'nice.' When the headrail is crooked, you say 'try again.' Over many attempts, they learn what works through direct feedback on their actions.",
    },
    ai: {
      name: "Reinforcement Learning",
      description:
        "A type of machine learning where an agent learns by taking actions in an environment and receiving rewards or penalties. It's not shown the correct answer — it discovers optimal behavior through trial and error. Used to train game-playing AI, robots, and recommendation systems.",
    },
    notes:
      "Learning by doing and getting feedback, not by studying examples.",
    detailedComparison:
      "Reinforcement learning is the 'school of hard knocks' approach. The AI tries something, gets a score (reward or penalty), and adjusts. Over thousands of attempts, it figures out what maximizes rewards. It's how AlphaGo learned to beat the world champion at Go — not by studying human games, but by playing millions of games against itself and learning what moves lead to wins. Same energy as a new installer who learns faster by doing than by watching, as long as someone's there to say 'good' or 'nope' after each attempt.",
    section: 2,
  },
  {
    id: "map-learn-04",
    category: "learning",
    blinds: {
      name: "An Installer with 10,000 Jobs of Experience",
      description:
        "The veteran who can walk into any room and know within seconds what product to recommend, what mount type will work, what problems to expect from the trim situation, and how long the install will take. Decisions that used to take deliberation are now instant and accurate.",
    },
    ai: {
      name: "A Well-Trained Model",
      description:
        "A model that has been trained on a large, high-quality dataset and performs accurately on new, unseen data. It generalizes well — meaning it learned the actual patterns, not just memorized the training examples. Like a veteran installer, it handles novel situations confidently.",
    },
    notes:
      "Expertise from massive experience. Both make good predictions on new situations because they've seen so many old ones.",
    detailedComparison:
      "A 10,000-job installer doesn't look up specs for every product — the knowledge is internalized. Similarly, a well-trained model doesn't need to search a database for answers — the patterns are encoded in its parameters (weights). But here's the important nuance: even the best installer can be surprised by a truly unusual window, and even the best model can fail on data that's very different from what it trained on. Experience (or training) builds reliable intuition, not infallibility.",
    section: 2,
  },
  {
    id: "map-learn-05",
    category: "learning",
    blinds: {
      name: "A New Hire's First Week",
      description:
        "They don't know a headrail from a valance. They hold the drill wrong, put brackets in the wrong place, and measure from the wrong edge. Everything they do is essentially random until they start getting feedback and accumulating experience.",
    },
    ai: {
      name: "An Untrained Model (Random Weights)",
      description:
        "Before training, a neural network's internal parameters (weights) are set to small random values. Its predictions are essentially random guesses — no better than flipping a coin. Training is the process of adjusting those weights based on data until the model's outputs become accurate and useful.",
    },
    notes:
      "Everyone (and every model) starts clueless. The journey from random to reliable is what training is all about.",
    detailedComparison:
      "Your new hire produces random output on day one — not because they're dumb, but because they have no calibrated knowledge yet. A neural network at initialization is the same: its weights are random numbers that produce random outputs. Through training (exposure to thousands of examples with feedback), both the new hire and the neural network gradually adjust their internal 'settings' until their outputs become reliable. The speed of this process depends on the quality of training data and the effectiveness of the feedback loop.",
    section: 2,
  },
  {
    id: "map-learn-06",
    category: "learning",
    blinds: {
      name: "An Installer Who Only Knows Roller Shades",
      description:
        "They're great at roller shades — fast, accurate, clean installs every time. But hand them a set of plantation shutters or motorized honeycomb shades, and they're lost. Their skills are narrow because their experience is narrow.",
    },
    ai: {
      name: "A Model Trained on Narrow Data",
      description:
        "A model that performs well on the specific type of data it was trained on but fails on anything different. This is a common problem when training data doesn't represent the full range of real-world situations. The model is overfit to its narrow training distribution.",
    },
    notes:
      "Specialization without breadth. Great at what they know, useless at everything else.",
    detailedComparison:
      "If your only training data is roller shade installs, you'll be fast and confident — until someone hands you a vertical blind with a headrail track system. The model equivalent is an image classifier trained only on photos taken in daylight that completely falls apart when given a nighttime photo. This is why diversity in training data matters as much as volume. An installer who's done rollers, cellulars, verticals, shutters, and motorized systems in old homes and new construction is far more versatile — and so is a model trained on diverse, representative data.",
    section: 2,
  },
  {
    id: "map-learn-07",
    category: "learning",
    blinds: {
      name: "Learning from Your Mistakes on the Job",
      description:
        "You cut a blind too short. You figure out what went wrong — maybe you measured from the wrong edge, maybe you forgot the deduction. Next time, you adjust your process. Each mistake refines your technique, and over time your error rate drops close to zero.",
    },
    ai: {
      name: "Backpropagation / Gradient Descent",
      description:
        "The core training algorithm for neural networks. After each prediction, the model calculates how far off it was (the error). It then traces backward through the network, adjusting each weight slightly to reduce the error. Over many iterations, these adjustments accumulate and the model becomes accurate.",
    },
    notes:
      "Both are systematic error-correction loops. Make a mistake, figure out why, adjust, repeat.",
    detailedComparison:
      "When a blind comes out wrong, you don't randomly change everything — you trace the error back. 'The blind is half an inch too narrow. I measured correctly but forgot this manufacturer requires a 3/8 deduction, not 1/4.' You adjust that specific step. Backpropagation works the same way: it calculates the error at the output, then traces backward through every layer, figuring out how much each weight contributed to the mistake. Gradient descent is the specific technique for adjusting each weight in the right direction and by the right amount. It's systematic error correction, not random guessing.",
    section: 4,
  },

  // ── ARCHITECTURE CATEGORY (Sections 1, 4, 5, 7, 9) ────────────────
  {
    id: "map-arch-01",
    category: "architecture",
    blinds: {
      name: "The Step-by-Step Installation Process",
      description:
        "Every blind install follows a sequence: measure the window, select the product, calculate deductions, place the order, mount the brackets, hang the headrail, attach the valance, test the operation, clean up. Each step has clear inputs and outputs.",
    },
    ai: {
      name: "An Algorithm",
      description:
        "A step-by-step procedure for solving a problem or completing a task. In AI, algorithms define how data flows through a model, how the model learns from errors, and how predictions are generated. Like an installation process, an algorithm is a repeatable, defined sequence of operations.",
    },
    notes:
      "Both are structured procedures: defined inputs, clear steps, predictable outputs.",
    detailedComparison:
      "Your installation process IS an algorithm — you just don't call it that. It takes inputs (measurements, product specs), follows a defined sequence of steps, and produces an output (installed blinds). If someone else follows your exact process with the same inputs, they should get the same result. That's exactly what a computer algorithm does. The difference is that computer algorithms can execute millions of steps per second and handle thousands of inputs simultaneously, while your algorithm runs at human speed on one window at a time.",
    section: 1,
  },
  {
    id: "map-arch-02",
    category: "architecture",
    blinds: {
      name: "A Crew Working in Stages",
      description:
        "On a big commercial job, the work flows in stages: the measurer goes through every floor first, hands specs to the fabricator, who hands cut blinds to the mounting crew, who hands finished rooms to the quality checker. Each stage transforms the work and passes it forward.",
    },
    ai: {
      name: "Neural Network Layers",
      description:
        "A neural network is organized into layers, each performing a specific transformation on the data. The input layer receives raw data, hidden layers extract and combine features at increasing levels of abstraction, and the output layer produces the final prediction. Data flows forward through each layer sequentially.",
    },
    notes:
      "Both process information in sequential stages, with each stage building on the previous one's output.",
    detailedComparison:
      "Your commercial crew is a neural network. The measurer is the input layer — capturing raw information from the real world. The fabricator and mounting crew are hidden layers — transforming that raw info into something increasingly refined. The quality checker is the output layer — making the final judgment. Each person (layer) has a specialized job, and the quality of the final result depends on every stage doing its job well. In a neural network, the first hidden layers might detect simple patterns (edges in an image), middle layers combine those into shapes, and final layers recognize complex objects. Same layered progression, same dependency chain.",
    section: 4,
  },
  {
    id: "map-arch-03",
    category: "architecture",
    blinds: {
      name: "The Experienced Lead Who Checks the Tricky Parts",
      description:
        "On a multi-installer job, the lead doesn't install every blind — but they check the critical ones. Bay window? The lead looks. Angled ceiling mount? The lead looks. Standard bedroom window? The junior can handle it. The lead knows which parts need extra attention and focuses there.",
    },
    ai: {
      name: "The Attention Mechanism",
      description:
        "The breakthrough innovation behind Transformers and modern AI. Attention allows a model to dynamically focus on the most relevant parts of its input when producing output. Instead of treating all input equally, the model 'pays attention' to the parts that matter most for the current task.",
    },
    notes:
      "Both are about knowing where to focus and what to pay attention to given the context.",
    detailedComparison:
      "When you read a long work order, your eyes don't give equal weight to every word. They jump to dimensions, mount type, product code — the information that actually affects what you do. The attention mechanism works the same way for AI. When processing a sentence like 'The bank by the river is eroding,' attention helps the model focus on 'river' to understand that 'bank' means riverbank, not a financial institution. It's context-aware focus, and it's the reason modern AI understands language so much better than older systems that treated every word as equally important.",
    section: 5,
  },
  {
    id: "map-arch-04",
    category: "architecture",
    blinds: {
      name: "Your Whole Toolkit",
      description:
        "Every drill bit, driver, level, tape measure, pencil, shim, and saw blade in your setup. The toolkit represents the total capacity of what you can handle — more tools means more versatility. A full toolkit that's well-maintained is the sign of a serious professional.",
    },
    ai: {
      name: "A Model's Parameters",
      description:
        "The internal numerical values (weights and biases) that a model learns during training. GPT-4 has over a trillion parameters; even 'small' models have billions. More parameters generally means more capacity to learn complex patterns, but also requires more data and compute to train effectively.",
    },
    notes:
      "Both represent total capacity. More parameters/tools = more capability, but also more to manage.",
    detailedComparison:
      "Your toolkit with 200 items can handle more situations than a kit with 20. But a bigger toolkit doesn't automatically make you better — you need the skill to use each tool correctly. Similarly, a 70-billion-parameter model has more capacity than a 7-billion-parameter model, but parameters alone don't guarantee quality. A smaller model trained on excellent data can outperform a larger model trained on garbage. It's the combination of capacity (parameters) and training quality (data) that determines real performance. Think of it as tools AND experience, not just tools.",
    section: 7,
  },
  {
    id: "map-arch-05",
    category: "architecture",
    blinds: {
      name: "Choosing Bracket Placement for Heavy Blinds",
      description:
        "For a large, heavy wood blind, you need to calculate bracket spacing carefully. Too few brackets and the headrail sags in the middle. Too many and you've wasted time and material. The weight distribution determines how you position each support point.",
    },
    ai: {
      name: "Weight Adjustments in Training",
      description:
        "During training, a neural network constantly adjusts its internal weights — the numerical values that determine how strongly each connection between neurons influences the next layer. Getting the weights right is the entire point of training. Too large and the model overcorrects; too small and it learns nothing.",
    },
    notes:
      "Both are about finding the right balance point through careful adjustment.",
    detailedComparison:
      "Bracket placement is a balancing act: each bracket carries a portion of the load, and the positions need to distribute weight evenly. Neural network weights work the same way — each weight determines how much influence one neuron has on the next. During training, the model adjusts thousands of weights simultaneously, trying to find the combination that produces the best predictions. It's like adjusting bracket positions until the headrail hangs perfectly level — except with millions of brackets all being adjusted at once, and a computer doing the math.",
    section: 4,
  },
  {
    id: "map-arch-06",
    category: "architecture",
    blinds: {
      name: "Your Van with All Tools and Materials",
      description:
        "The fully stocked work van is your mobile platform — drills, saws, levels, blinds inventory, brackets, screws, shims, touch-up supplies, and the coffee maker. It's the complete environment that lets you show up to any job and execute. Without the van, you're just a person who knows about blinds.",
    },
    ai: {
      name: "An AI Platform / Framework",
      description:
        "A comprehensive software environment that provides all the tools needed to build, train, deploy, and monitor AI models. Examples include TensorFlow, PyTorch, Hugging Face, or cloud platforms like AWS SageMaker. They bundle compute, data tools, model libraries, and deployment capabilities into one platform.",
    },
    notes:
      "Both are the complete package — everything you need to go from concept to execution in one environment.",
    detailedComparison:
      "You could theoretically do an install with just a drill borrowed from a friend. But your fully equipped van lets you handle anything: standard installs, weird angles, motorized setups, last-minute changes. An AI platform is the same — it bundles data processing tools, model training infrastructure, pre-built model libraries, deployment pipelines, and monitoring dashboards. You COULD piece together each tool separately, just like you could borrow every tool individually. But the platform (like the van) is about having everything integrated and ready to go.",
    section: 9,
  },
  {
    id: "map-arch-07",
    category: "architecture",
    blinds: {
      name: "The Installation Manual for a Specific Brand",
      description:
        "The manufacturer's manual that covers bracket types, mounting depth requirements, cord routing, tilt mechanism, and special considerations for that specific product line. It encodes the knowledge of how to install that brand's products correctly.",
    },
    ai: {
      name: "A Pre-trained Model",
      description:
        "A model that has already been trained on a large dataset and can be used as-is or further customized. Pre-trained models like GPT, BERT, or ResNet encode massive amounts of learned knowledge from their training data. They can be used directly or fine-tuned for specific tasks.",
    },
    notes:
      "Both encode prior knowledge that can be applied to new specific situations.",
    detailedComparison:
      "A manufacturer's manual gives you a starting point — it won't tell you about the specific window you're standing in front of, but it tells you everything about how the product works and how to install it properly. A pre-trained model is the same: it doesn't know about your specific task, but it carries general knowledge from its training. GPT-4 has 'read' most of the internet — that's its installation manual for language. You can use it as-is, or you can fine-tune it (adapt it) for your specific application, like how you'd modify the manufacturer's standard process for a tricky window situation.",
    section: 7,
  },

  // ── ENGINEERING CATEGORY (Section 8, some Section 7) ───────────────
  {
    id: "map-eng-01",
    category: "engineering",
    blinds: {
      name: "The Customer Saying 'Make It Look Nice'",
      description:
        "The vaguest possible instruction. Nice how? What style? What color? What's the budget? Which rooms? Do they want privacy, light control, or decoration? You'd never start cutting blinds based on this — you'd need to ask twenty follow-up questions first.",
    },
    ai: {
      name: "A Vague Prompt",
      description:
        "An ambiguous or underspecified input to an AI system, like asking ChatGPT 'tell me about marketing.' The AI will produce something, but it's unlikely to match what you actually needed because the request lacks specificity, context, and constraints. Better prompts produce dramatically better outputs.",
    },
    notes:
      "Both produce mediocre results because the instructions are too vague to act on properly.",
    detailedComparison:
      "'Make it look nice' and 'write me something about marketing' share the same fundamental problem: they offload all the decision-making to the person doing the work. An installer can produce something with this instruction, but it probably won't match what the customer envisioned. Similarly, an AI will produce output from a vague prompt, but you'll waste time iterating because you didn't give it enough information upfront. The fix is the same: be specific about what you want, the constraints, the context, and the expected outcome.",
    section: 8,
  },
  {
    id: "map-eng-02",
    category: "engineering",
    blinds: {
      name: "A Detailed Customer Spec Sheet",
      description:
        "The dream order: '2-inch faux wood blinds, inside mount, cordless lift, pearl white, for a 36x48 bathroom window with 1.5 inches of reveal depth. Needs moisture resistance. Match the existing blinds in the hallway. Budget is $150 per window.' Everything you need to execute perfectly.",
    },
    ai: {
      name: "A Well-Engineered Prompt",
      description:
        "A specific, detailed input that gives the AI clear instructions, context, constraints, format requirements, and expectations. Like a perfect spec sheet, a well-engineered prompt eliminates ambiguity and produces output that matches what you actually need on the first try.",
    },
    notes:
      "Both give the executor everything they need to deliver exactly what's wanted, no guessing required.",
    detailedComparison:
      "The detailed spec sheet lets you order exactly the right product, cut it precisely, and install it in one trip. No callbacks, no misunderstandings, no wasted material. A well-engineered prompt does the same for AI: 'Write a 200-word professional email to a customer explaining why their warranty claim for faded blinds isn't covered, using a sympathetic tone, offering a 15% discount on replacement. Format with greeting, body, and sign-off.' That prompt will produce usable output on the first try. The time you invest in crafting a good spec (or prompt) pays for itself many times over in reduced rework.",
    section: 8,
  },
  {
    id: "map-eng-03",
    category: "engineering",
    blinds: {
      name: "Showing a Customer a Photo: 'Like This?'",
      description:
        "Instead of describing what you'll do, you pull out your phone and show a photo from a similar job: 'It'll look like this.' Instantly, the customer understands the product, the style, the look — more efficiently than ten minutes of verbal explanation.",
    },
    ai: {
      name: "Few-Shot Prompting",
      description:
        "A technique where you include a few examples of the desired input-output pattern in your prompt. Instead of just describing what you want, you show the AI examples: 'Here's an input and the output I want. Here's another. Now do this new one the same way.' It dramatically improves accuracy and consistency.",
    },
    notes:
      "Both use concrete examples to communicate expectations more clearly than abstract descriptions.",
    detailedComparison:
      "You've learned that showing beats telling. A customer can nod along to your description of 'a clean, modern look with cordless cellular shades' and still be surprised by the result. But show them a photo and they know instantly. Few-shot prompting applies the same insight to AI: instead of explaining what you want in abstract terms, you give the model two or three examples. 'Here's a customer email and the response I'd write. Here's another. Now write a response to this third email in the same style.' The examples are worth a thousand words of instruction.",
    section: 8,
  },
  {
    id: "map-eng-04",
    category: "engineering",
    blinds: {
      name: "Walking Through Your Process Out Loud",
      description:
        "When training someone or explaining a tricky install, you talk through your thinking: 'Okay, I'm measuring at three points... the top reads 35.75, which is the tightest... so I'll use that minus the 3/8 deduction... this gives me 35.375, which I'll round down to 35.25 to be safe.' Showing your work, step by step.",
    },
    ai: {
      name: "Chain-of-Thought Prompting",
      description:
        "A prompting technique where you ask the AI to show its reasoning step by step before giving a final answer. Adding 'think through this step by step' or 'explain your reasoning' dramatically improves accuracy on complex problems because it forces the model to work through the logic rather than jumping to a conclusion.",
    },
    notes:
      "Both improve outcomes by making the reasoning process explicit rather than jumping straight to the answer.",
    detailedComparison:
      "When you talk through your process, you catch errors that you'd miss if you just wrote down the final number. 'Wait, I said 35.75 minus 3/8, but this manufacturer uses 1/4 deductions, not 3/8.' The act of explaining surfaces mistakes. Chain-of-thought prompting works the same way for AI: when the model reasons step by step, it's more likely to arrive at the correct answer because each step checks against the previous one. It's the difference between an installer who silently scribbles a number and one who walks you through their math.",
    section: 8,
  },
  {
    id: "map-eng-05",
    category: "engineering",
    blinds: {
      name: "I Need These for a Bathroom — Waterproof",
      description:
        "Context changes everything. A bathroom window needs moisture-resistant materials (faux wood, not real wood), maybe higher privacy levels, and you'd avoid fabric options. The room's purpose constrains the solution. Knowing where the blinds are going is as important as knowing the window dimensions.",
    },
    ai: {
      name: "Giving the AI Context and Constraints",
      description:
        "Providing background information, use-case details, and limitations in your prompt. Telling the AI 'this is for a non-technical audience' or 'keep it under 100 words' or 'this will be used in a medical setting' drastically changes and improves the output, just like room context changes your product recommendation.",
    },
    notes:
      "Context and constraints narrow the solution space and produce more appropriate results.",
    detailedComparison:
      "Without 'bathroom,' you might recommend beautiful real wood blinds that would warp in six months from humidity. The context didn't change the window dimensions — it changed which solutions are appropriate. In AI, the same principle applies: 'Explain neural networks' gets a different (and better) result when you add 'to a non-technical business executive who has 2 minutes.' The AI isn't changing what a neural network is — it's changing which explanation is appropriate given the audience and situation. Both involve matching the solution to the full context, not just the technical specs.",
    section: 8,
  },
  {
    id: "map-eng-06",
    category: "engineering",
    blinds: {
      name: "Adjusting Tilt and Cord After Install",
      description:
        "The blinds are up, but the tilt rod is stiff and the cord pull is too tight. You make micro-adjustments: loosen the tilt mechanism a quarter turn, adjust the cord lock tension, straighten the ladder strings. These small tweaks after the main install make the difference between 'it works' and 'it's perfect.'",
    },
    ai: {
      name: "Fine-Tuning a Model",
      description:
        "Taking a pre-trained model and further training it on a smaller, specialized dataset to improve its performance on a specific task. Fine-tuning doesn't rebuild the model from scratch — it makes targeted adjustments to the existing knowledge, like adjusting a blind that's already installed.",
    },
    notes:
      "Both are targeted adjustments after the main work is done, optimizing for the specific situation.",
    detailedComparison:
      "You'd never take down a properly installed blind just because the tilt mechanism is slightly stiff. You adjust what needs adjusting and leave the rest alone. Fine-tuning is the same philosophy: you take a powerful pre-trained model (the installed blind) and make small targeted adjustments (the tilt and cord tweaks) for your specific use case. It's far more efficient than training a model from scratch, just like it's far more efficient to adjust the tilt mechanism than to remount the entire blind. The major work is already done — you're optimizing for the last mile.",
    section: 7,
  },
  {
    id: "map-eng-07",
    category: "engineering",
    blinds: {
      name: "Cutting a Custom Blind from a Standard Blank",
      description:
        "You take a standard-width blind blank from inventory and cut it down to the exact width needed for a specific window. The blank comes from the factory with general manufacturing quality — you customize it for the precise application.",
    },
    ai: {
      name: "Customizing a Pre-trained Model",
      description:
        "Taking a general-purpose pre-trained model and adapting it for a specific task through fine-tuning, prompt engineering, or adding specialized data. The model starts with broad capabilities and is narrowed down to excel at your particular use case.",
    },
    notes:
      "Both start with a general-purpose product and customize it for a specific application.",
    detailedComparison:
      "The factory makes a 72-inch blank that works for any window up to that size. You customize it to 35.375 inches for the specific window in front of you. A pre-trained model like GPT-4 is the general-purpose blank — it can do almost anything with language. When a company fine-tunes it on their customer service data, they're cutting it to size for their specific need. The factory (pre-training) handles the expensive, general work. The customization (fine-tuning) handles the application-specific precision. You need both — but the customization is far cheaper and faster than building from raw material.",
    section: 7,
  },
  {
    id: "map-eng-08",
    category: "engineering",
    blinds: {
      name: "Checking Your Work Before Leaving",
      description:
        "Before you pack up, you test every blind: open, close, tilt, lock. You check for light gaps, uneven hems, crooked headrails, and smooth operation. Any issues get fixed on the spot. Leaving a job without quality-checking is how you get callbacks.",
    },
    ai: {
      name: "Model Evaluation / Testing",
      description:
        "Systematically assessing a model's performance using test data it hasn't seen during training. Metrics like accuracy, precision, recall, and F1 score quantify how well the model performs. Evaluation happens before deployment — shipping an untested model is like leaving without checking your work.",
    },
    notes:
      "Both are quality control steps that happen before the work is considered done.",
    detailedComparison:
      "You test every blind on every window because the cost of a callback is far higher than the cost of spending two extra minutes checking. Model evaluation follows the same logic: testing before deployment is cheap, while fixing a model in production (serving bad predictions to real users) is expensive and embarrassing. Just as you have specific things you check — operation, alignment, light gaps — model evaluation has specific metrics: accuracy (how often it's right), precision (when it says yes, how often is it actually yes), and recall (of all the actual positives, how many did it catch). Both are systematic quality assurance.",
    section: 2,
  },

  // ── TOOLS CATEGORY (Section 9) ─────────────────────────────────────
  {
    id: "map-tools-01",
    category: "tools",
    blinds: {
      name: "Cordless Drill",
      description:
        "Your most-used power tool. Drives screws for brackets, drills pilot holes in different materials (wood, drywall, concrete), and handles 80% of installation tasks. General-purpose, reliable, and the first tool you grab for almost any job.",
    },
    ai: {
      name: "ChatGPT / Claude (General-Purpose AI)",
      description:
        "General-purpose large language models that can handle most text-based AI tasks: writing, analysis, coding, brainstorming, summarization, translation. Like a cordless drill, they're the first AI tool most people reach for and handle the majority of everyday tasks competently.",
    },
    notes:
      "Both are versatile, general-purpose tools that handle most common tasks. The default choice for everyday work.",
    detailedComparison:
      "You don't need a specialized tool for every task — the cordless drill handles most of them. ChatGPT and Claude are the same: they're not the best at any single task, but they're good enough at most tasks to be your go-to. You wouldn't use a drill to cut blinds to width (that's a saw's job), and you wouldn't use ChatGPT to generate images (that's Midjourney's job). But for the 80% of tasks that involve driving screws or processing text, the general-purpose tool is the right call.",
    section: 9,
  },
  {
    id: "map-tools-02",
    category: "tools",
    blinds: {
      name: "Tape Measure",
      description:
        "The most fundamental measurement tool. Without accurate measurements, nothing else matters. It captures real-world information (window dimensions) and translates it into numbers you can work with. The quality of the tape measure and the skill of the person using it determine the quality of all downstream work.",
    },
    ai: {
      name: "A Data Collection Tool / Sensor",
      description:
        "Any device or system that captures real-world information and converts it to data: cameras, microphones, web scrapers, surveys, IoT sensors, form inputs. Like a tape measure, these tools are foundational — the quality of the captured data determines everything downstream.",
    },
    notes:
      "Both capture real-world information and convert it to usable data. Foundational to the entire process.",
    detailedComparison:
      "A worn tape measure with faded markings will produce measurements that are close but not precise — and 'close' is not good enough for inside-mount blinds where a quarter inch matters. Similarly, a bad data collection tool (a poorly designed survey, a low-resolution camera, a noisy microphone) will produce data that's close but not precise — and close isn't good enough for training an AI that needs to make accurate predictions. In both cases, the tool is simple and often overlooked, but its quality has an outsized impact on the final result.",
    section: 9,
  },
  {
    id: "map-tools-03",
    category: "tools",
    blinds: {
      name: "Level",
      description:
        "Ensures brackets are straight and headrails are level. It doesn't install anything — it just tells you whether your installation is correct. A crooked blind in an otherwise perfect room is the first thing anyone notices.",
    },
    ai: {
      name: "A Validation / Quality Check Tool",
      description:
        "Tools and metrics used to verify that an AI model's outputs meet quality standards. This includes evaluation benchmarks, A/B testing platforms, human evaluation workflows, and monitoring dashboards. They don't build the model — they tell you whether the model is performing correctly.",
    },
    notes:
      "Both are verification tools. They don't create output — they validate that output meets standards.",
    detailedComparison:
      "A level doesn't mount a single bracket, but an install without one is a gamble. Quality check tools for AI serve the same role: they don't generate predictions, but they tell you whether the predictions are any good. A/B testing is like holding the level against two different bracket positions and going with the one that reads true. Human evaluation is like having a senior installer double-check your work. Both are essential quality gates that catch problems before they reach the customer or user.",
    section: 9,
  },
  {
    id: "map-tools-04",
    category: "tools",
    blinds: {
      name: "Saw / Cutter",
      description:
        "The chop saw or blind-cutting machine that takes a standard blank and cuts it to exact specifications. It transforms raw material into a finished product of precise dimensions. The cut must be clean, accurate, and square.",
    },
    ai: {
      name: "A Data Transformation Tool",
      description:
        "Software that takes raw data and transforms it into the format and structure needed for AI training or analysis. Tools like pandas, dbt, or Databricks handle cleaning, reformatting, filtering, aggregating, and reshaping data. Like a saw, they take general-purpose material and turn it into something precise and usable.",
    },
    notes:
      "Both transform general material into specific, precisely shaped outputs ready for the next step.",
    detailedComparison:
      "A 72-inch blind blank is useless until it's cut to 35.375 inches. Raw data is often equally useless until it's cleaned, filtered, and reshaped. The saw transforms the physical material; data transformation tools transform the digital material. Both require precision — a crooked cut means a blind that doesn't sit right, and a bad data transformation means a model trained on malformed inputs. And both are intermediate steps: nobody wants a cut blind or processed data as the end product — they're inputs to the next stage.",
    section: 9,
  },
  {
    id: "map-tools-05",
    category: "tools",
    blinds: {
      name: "The Work Van",
      description:
        "Not just a vehicle — it's a mobile workshop. Racking systems organize tools and materials, it carries inventory for the day's jobs, and it gets you from site to site. The van is the infrastructure that makes everything else possible. Without it, you're carrying tools in your arms.",
    },
    ai: {
      name: "Cloud Computing Infrastructure",
      description:
        "Remote servers (AWS, Google Cloud, Azure) that provide the massive computational power needed to train and run AI models. Like a work van, cloud infrastructure is the underlying platform that makes everything else possible — storing data, running computations, and serving predictions to users worldwide.",
    },
    notes:
      "Both are the infrastructure layer — they don't do the skilled work themselves, but nothing works without them.",
    detailedComparison:
      "You could theoretically do blind installations without a van — borrow a car, carry tools in bags, make multiple trips. It would work, but slowly and painfully. Similarly, you can do some AI work on a laptop, but training a serious model requires cloud computing. The van represents the investment in infrastructure that makes professional-scale work possible. AWS, Google Cloud, and Azure are the work vans of the AI world — they carry the compute power, storage, and networking that serious AI workloads require.",
    section: 9,
  },
  {
    id: "map-tools-06",
    category: "tools",
    blinds: {
      name: "The Manufacturer's Catalog",
      description:
        "The full product catalog from suppliers like Graber, Hunter Douglas, or Levolor. It lists every product line with specs, dimensions, mounting options, available colors, and pricing. You don't make blinds from scratch — you choose from the catalog and customize.",
    },
    ai: {
      name: "An AI Model Library (Hugging Face)",
      description:
        "Repositories like Hugging Face that offer thousands of pre-built, pre-trained AI models for different tasks: text classification, image recognition, translation, summarization. Like a manufacturer's catalog, you browse options, select one that fits your needs, and customize it for your specific application.",
    },
    notes:
      "Both offer pre-made options for specific needs. Browse, select, customize — don't build from scratch.",
    detailedComparison:
      "You don't manufacture blinds — you select from a catalog and customize for the specific window. Most AI practitioners don't train models from scratch either — they browse Hugging Face (which has over 500,000 pre-trained models), find one suited to their task, and fine-tune it. The catalog saves you from reinventing the wheel: why build a text classifier from zero when someone has already trained one on millions of documents? Same as why you'd order from Graber instead of weaving your own fabric.",
    section: 9,
  },
  {
    id: "map-tools-07",
    category: "tools",
    blinds: {
      name: "Universal Mounting Brackets",
      description:
        "Brackets designed to work across multiple product lines and brands. They adapt to different headrail sizes, mount types, and surfaces. Instead of carrying fifty brand-specific brackets, universal brackets let you connect different products to different mounting surfaces with one standardized interface.",
    },
    ai: {
      name: "APIs (Application Programming Interfaces)",
      description:
        "Standardized interfaces that allow different software systems to communicate and share data. An API lets one tool connect to another — like how a mobile app connects to a server, or how a no-code platform connects to ChatGPT. APIs are the universal adapters of the software world.",
    },
    notes:
      "Both are standardized interfaces that connect different things together without custom engineering.",
    detailedComparison:
      "A universal bracket has a standardized interface on one side (the headrail clip) and an adaptable interface on the other side (the mounting surface). An API works the same way: it has a standardized way to send requests and receive responses, allowing any tool that 'speaks the language' to connect. When Zapier connects to ChatGPT, it uses an API — a standardized bracket that clips ChatGPT's capabilities onto Zapier's workflow. Without APIs (or universal brackets), every connection would require custom engineering — an expensive, fragile approach that doesn't scale.",
    section: 9,
  },

  // ── BUSINESS CATEGORY (Section 11) ─────────────────────────────────
  {
    id: "map-biz-01",
    category: "business",
    blinds: {
      name: "Site Survey Before Quoting",
      description:
        "Before you give a price, you visit the site: count windows, check mounting surfaces, note obstacles (crown molding, recessed windows, unusual trim), assess access difficulty, and identify anything that could complicate the job. You never quote blind — pun intended.",
    },
    ai: {
      name: "AI Discovery / Needs Assessment",
      description:
        "The first phase of any AI project: understanding the business problem, available data, technical constraints, and success criteria before proposing a solution. Skipping discovery is the number one reason AI projects fail. It's the equivalent of showing up to install without measuring first.",
    },
    notes:
      "Both are upfront due diligence that prevents expensive mistakes downstream.",
    detailedComparison:
      "Quoting a 50-window commercial job without a site survey is professional malpractice — you'll underbid the tricky windows and overbid the easy ones. AI discovery serves the same function: understanding what data exists, what infrastructure is in place, what the actual business problem is (versus what people think it is), and what success looks like. Companies that skip AI discovery and jump straight to buying tools are making the same mistake as an installer who quotes sight-unseen. The discovery phase costs a fraction of the total project but saves multiples in prevented waste.",
    section: 11,
  },
  {
    id: "map-biz-02",
    category: "business",
    blinds: {
      name: "Doing One Sample Room First",
      description:
        "On a large commercial job, you install one room completely before doing the full rollout. The sample room proves the product looks right, the mounting works, the specs are accurate, and the customer is happy. Any problems get caught at a scale of one, not one hundred.",
    },
    ai: {
      name: "Proof of Concept (POC)",
      description:
        "A small-scale pilot project that tests whether an AI solution actually works before investing in full deployment. A POC might use a sample dataset, serve a limited user group, or run for a defined time period. The goal is to validate feasibility and value with minimal risk and cost.",
    },
    notes:
      "Both are controlled experiments that validate the approach at small scale before full commitment.",
    detailedComparison:
      "Your sample room is a proof of concept in every way: you invest the effort to do one room right, get sign-off, and only then scale to the full building. If the sample reveals a problem (wrong product, mounting issues, color mismatch), you've wasted one room's worth of materials and time, not a hundred rooms' worth. An AI POC works identically: you build a small working version, test it with real data, measure whether it actually delivers value, and only scale if it does. The ratio of POC cost to full rollout cost is similar — roughly 5-10% of the total investment to validate 80% of the assumptions.",
    section: 11,
  },
  {
    id: "map-biz-03",
    category: "business",
    blinds: {
      name: "Rolling Out Floor by Floor",
      description:
        "After the sample room is approved, you roll out floor by floor — not the entire building at once. Each floor lets you refine the process, catch issues early, and maintain quality control. By the tenth floor, the crew is efficient and the process is dialed in.",
    },
    ai: {
      name: "Scaling an AI Solution",
      description:
        "Gradually expanding an AI solution from pilot to full production. This might mean rolling out to more users, processing more data, or covering more use cases. Gradual scaling catches issues early and allows for optimization, rather than going from prototype to full deployment overnight.",
    },
    notes:
      "Both scale gradually. Each phase builds on lessons from the previous one.",
    detailedComparison:
      "Doing all 30 floors simultaneously would be chaos — you'd have every crew stumbling over the same learning-curve issues at the same time. Floor-by-floor rollout lets you refine with each iteration: 'The brackets in the conference rooms need longer screws for the steel studs — add that to the spec for floor 3.' Scaling AI is the same: you start with one department, learn what works, adjust, then expand. The first department's experience becomes training material for the next. Rushing to full scale skips the learning loop and multiplies problems instead of solving them.",
    section: 11,
  },
  {
    id: "map-biz-04",
    category: "business",
    blinds: {
      name: "The Job Estimate",
      description:
        "Your detailed cost breakdown: materials, labor hours, travel, specialty hardware, waste factor, and profit margin. The estimate needs to be accurate enough to win the job and profitable enough to be worth doing. Underbid and you lose money; overbid and you lose the customer.",
    },
    ai: {
      name: "ROI Calculation for AI",
      description:
        "Estimating the return on investment for an AI project: implementation costs (development, infrastructure, data, talent) vs. expected benefits (time saved, revenue gained, errors prevented). Like a job estimate, it needs to be realistic — AI project costs are notoriously hard to predict accurately.",
    },
    notes:
      "Both require honest cost estimation balanced against realistic value projections.",
    detailedComparison:
      "Experienced installers know to pad their estimates for unknowns — old buildings hide surprises behind every wall plate. AI ROI calculations need the same buffer. The development cost is the easy part; the hard part is estimating data cleanup time, integration complexity, change management effort, and ongoing maintenance. Companies that compare AI vendor quotes without understanding total cost of ownership are like homeowners who compare material prices without factoring in labor and callbacks. The cheapest quote often becomes the most expensive project.",
    section: 11,
  },
  {
    id: "map-biz-05",
    category: "business",
    blinds: {
      name: "Customer Walkthroughs After Install",
      description:
        "Walking each customer through their new blinds: how to operate the tilt, where the cord lock is, how to clean them, and what not to do (don't yank the cord, don't force the tilt past its stop). This handoff ensures the customer actually uses the product correctly.",
    },
    ai: {
      name: "Change Management / User Adoption",
      description:
        "The process of getting people to actually use a new AI system. This includes training, documentation, support, and addressing resistance. Many AI projects that are technically successful still fail because users don't adopt them — they go back to the old way of doing things.",
    },
    notes:
      "Both solve the 'last mile' problem: the product works, but people need to be brought along.",
    detailedComparison:
      "You've seen it: beautiful blinds, perfect install, and the customer calls back because they can't figure out the cordless lift or they're yanking the tilt rod the wrong way. The product is fine — the adoption failed. AI change management is the exact same challenge at organizational scale. A company deploys a brilliant AI scheduling system, but the dispatchers ignore it because nobody trained them, nobody explained why it's better, and nobody asked about their concerns. The technical solution is half the battle; getting humans to trust and use it is the other half.",
    section: 11,
  },
  {
    id: "map-biz-06",
    category: "business",
    blinds: {
      name: "Warranty and Callbacks",
      description:
        "Standing behind your work after the job is done. Callbacks for blinds that aren't operating smoothly, cords that have jumped track, or brackets that need re-tightening. Ongoing maintenance is part of the professional commitment — you don't just install and disappear.",
    },
    ai: {
      name: "AI Monitoring and Maintenance",
      description:
        "Ongoing oversight of deployed AI systems: tracking accuracy over time, detecting drift (when the model's performance degrades because real-world data has changed), retraining when needed, and fixing issues that emerge in production. AI models aren't 'set and forget' — they need ongoing care.",
    },
    notes:
      "Both require ongoing attention after the initial work is done. Deploy it and forget it is not a strategy.",
    detailedComparison:
      "A blind installed today might need adjustment next year as the house settles, seasons change, and parts wear. An AI model deployed today might degrade next quarter as customer behavior shifts, new products launch, or the data pipeline changes. In both cases, the professional doesn't just walk away — they plan for maintenance. Model monitoring dashboards are like your callback log: they track performance over time and flag when intervention is needed. The best installations and the best AI deployments both have maintenance plans from day one.",
    section: 11,
  },
  {
    id: "map-biz-07",
    category: "business",
    blinds: {
      name: "A Commercial Job vs. Residential",
      description:
        "Commercial jobs are bigger, more complex, more standardized, and involve more stakeholders. You deal with property managers, architects, general contractors, and procurement departments. The products are often heavier-duty, the volumes higher, and the coordination more demanding.",
    },
    ai: {
      name: "Enterprise AI vs. Consumer AI",
      description:
        "Enterprise AI serves businesses with requirements for security, scale, reliability, integration, and compliance that consumer AI (like ChatGPT for personal use) doesn't face. Enterprise deployments involve more stakeholders, stricter requirements, longer timelines, and bigger budgets — but also bigger impact.",
    },
    notes:
      "Both have a 'residential vs. commercial' divide that changes the complexity, stakeholders, and requirements.",
    detailedComparison:
      "A residential install is you and the homeowner — one decision-maker, simple sign-off. A commercial install involves procurement, facilities management, architects, building codes, and union rules. Enterprise AI is the same jump: you go from 'one person using ChatGPT' to 'a company deploying AI that touches customer data, requires HIPAA compliance, integrates with SAP, and needs 99.9% uptime.' The skills that make you great at residential installs don't disappear in commercial — but you add layers of coordination, compliance, and stakeholder management. Same craft, bigger stage.",
    section: 11,
  },

  // ── ETHICS CATEGORY (Section 10) ───────────────────────────────────
  {
    id: "map-ethics-01",
    category: "ethics",
    blinds: {
      name: "Only Knowing Suburban Homes",
      description:
        "An installer whose entire career has been in new-construction suburban homes with standard windows, modern framing, and predictable mounting surfaces. They've never dealt with brick, plaster walls, arched windows, historic homes, or non-standard sizes. Their experience is deep but narrow.",
    },
    ai: {
      name: "Training Data Bias",
      description:
        "When an AI model is trained on data that doesn't represent the full diversity of the real world. A facial recognition system trained mostly on light-skinned faces will perform poorly on darker skin. A hiring AI trained on a company's historical data (mostly male hires) will learn to prefer men. The model reflects whatever patterns exist in its training data — including unfair ones.",
    },
    notes:
      "Both suffer from narrow experience being treated as universal truth. The solution is broader, more diverse training.",
    detailedComparison:
      "Your suburban-only installer isn't bigoted — they just haven't been exposed to the full range of what exists. But when they encounter a 1920s brick rowhouse with plaster walls, arched windows, and no reveal depth, they're going to struggle. And if they confidently apply suburban techniques to that setting, things will go wrong. AI bias works the same way: the model isn't malicious, but if its training data is narrow, its predictions will be unreliable for anyone outside that narrow slice. The consequences are more serious for AI because these systems make decisions at scale — a biased hiring AI doesn't just fail one applicant, it systematically disadvantages entire groups.",
    section: 10,
  },
  {
    id: "map-ethics-02",
    category: "ethics",
    blinds: {
      name: "Standing Behind Your Work",
      description:
        "When something goes wrong — a blind falls, a mechanism breaks, a cord snaps — a professional installer owns it. They come back, they fix it, and they figure out why it happened. Accountability builds trust and repeat business. Hiding behind fine print destroys it.",
    },
    ai: {
      name: "AI Accountability / Transparency",
      description:
        "The principle that organizations deploying AI should be responsible for its outcomes and transparent about how it works. When an AI makes a wrong decision — denies a loan, misdiagnoses, flags content incorrectly — someone should be accountable, and affected people should understand what happened and have recourse.",
    },
    notes:
      "Both are about professional integrity: own your outcomes, fix your failures, and be honest about your process.",
    detailedComparison:
      "A customer trusts you because they know that if something goes wrong, you'll show up and make it right. That's accountability. In AI, the question is: when the AI system denies someone a loan or a job, who shows up to make it right? Transparency means the person affected can understand why the decision was made. Accountability means someone is responsible for fixing it when the system fails. Too many AI deployments lack both — the algorithm decides, nobody can explain why, and nobody takes responsibility for the consequences. That's the equivalent of a contractor who won't return your calls after the install.",
    section: 10,
  },
  {
    id: "map-ethics-03",
    category: "ethics",
    blinds: {
      name: "Not Cutting Corners on Safety",
      description:
        "Using proper anchors for heavy blinds instead of drywall screws that'll eventually pull out. Installing cord cleats for child safety. Following manufacturer weight limits. These things take extra time and cost extra money, but they prevent injuries and lawsuits.",
    },
    ai: {
      name: "AI Safety Practices",
      description:
        "Measures taken to ensure AI systems don't cause harm: testing for dangerous outputs, implementing content filters, building kill switches, red-teaming for vulnerabilities, and designing systems that fail gracefully. AI safety addresses risks from the mundane (a chatbot giving bad medical advice) to the existential (advanced AI systems behaving in unintended ways).",
    },
    notes:
      "Both prioritize preventing harm even when it costs more time and money upfront.",
    detailedComparison:
      "You could save ten minutes per job by skipping cord cleats and using cheaper anchors. But one pulled-out bracket dropping a headrail on a child, or one toddler getting tangled in a loose cord, ends careers and lives. AI safety operates at a similar cost-benefit: implementing content filters, red-teaming for vulnerabilities, and adding human oversight costs time and money. But an unchecked AI system dispensing dangerous medical advice, making discriminatory decisions, or being weaponized for misinformation causes harm at scale that dwarfs the cost of prevention. Safety isn't optional in either trade.",
    section: 10,
  },
  {
    id: "map-ethics-04",
    category: "ethics",
    blinds: {
      name: "Customer Privacy (Not Sharing Home Details)",
      description:
        "You see inside people's homes: their layout, their belongings, their security setup, their daily routines. Professional ethics demand you keep that information confidential. You don't post photos of customer homes without permission, share addresses, or discuss their properties with others.",
    },
    ai: {
      name: "Data Privacy",
      description:
        "The ethical and legal obligation to protect personal information used in AI systems. This includes data collection consent, secure storage, anonymization, the right to deletion, and transparent policies about how data is used. Regulations like GDPR and CCPA create legal requirements, but ethical data handling goes beyond compliance.",
    },
    notes:
      "Both involve a trust relationship: people grant access to private information and expect it to be protected.",
    detailedComparison:
      "Your customer lets you into their home because they trust you. That trust comes with an implicit agreement: you'll do the job and leave, not photograph their valuables or tell the neighborhood about their bedroom decor. AI data privacy is the same trust relationship at massive scale. When someone uses a health app, they're trusting the company with intimate health data. When they upload photos to a service, they trust those photos won't be used to train AI models without consent. The fundamental principle is identical: access to private information is a privilege that carries ethical responsibilities.",
    section: 10,
  },
  {
    id: "map-ethics-05",
    category: "ethics",
    blinds: {
      name: "Building Code Compliance",
      description:
        "Building codes exist for safety: cord-safety regulations for window coverings, fire-rated materials near exits, maximum weights for different mounting surfaces, and accessibility standards. Compliance isn't optional — it's the law, and it exists because people got hurt when standards were absent.",
    },
    ai: {
      name: "AI Regulation (EU AI Act, etc.)",
      description:
        "Emerging legal frameworks that govern how AI can be used. The EU AI Act classifies AI systems by risk level and imposes requirements accordingly. High-risk applications (healthcare, hiring, law enforcement) face strict rules about transparency, testing, and human oversight. Like building codes, AI regulation creates enforceable minimum standards.",
    },
    notes:
      "Both are regulatory frameworks that set minimum standards to prevent harm. Compliance is a floor, not a ceiling.",
    detailedComparison:
      "Building codes didn't appear randomly — every regulation was written because someone got hurt. Cord-safety requirements exist because children were strangled by looped cords. Fire-rated material requirements exist because buildings burned. AI regulation is following the same path: every major AI regulation is a response to documented harm. The EU AI Act was accelerated by facial recognition failures, hiring discrimination cases, and deepfake proliferation. Just as building codes don't make installers perfect but establish a minimum safety standard, AI regulations won't make AI systems perfect but will establish baseline requirements for testing, transparency, and accountability.",
    section: 10,
  },
  {
    id: "map-ethics-06",
    category: "ethics",
    blinds: {
      name: "Explaining Your Recommendation to the Customer",
      description:
        "When you recommend inside mount over outside mount, a good installer explains why: 'Your reveal depth is 2.5 inches, which gives us plenty of clearance. Inside mount will look cleaner and won't cover the decorative trim.' The customer understands the reasoning, not just the conclusion.",
    },
    ai: {
      name: "AI Explainability",
      description:
        "The ability to understand and communicate why an AI system made a particular decision. If an AI denies a loan application, the applicant has a right to know why. Explainable AI techniques make the model's reasoning interpretable to humans, rather than being an opaque 'black box' that produces unexplained outputs.",
    },
    notes:
      "Both are about showing your reasoning, not just your conclusion. Trust comes from understanding.",
    detailedComparison:
      "Imagine telling a customer 'you need outside mount' with no explanation. Even if you're right, they'll feel dismissed and suspicious. Now imagine a loan application denied by an AI with no explanation — just 'rejected.' The applicant has no idea if the denial was fair, what factors mattered, or what they could change. Explainability is the AI equivalent of walking the customer through your measurements and reasoning. Some AI models (like deep neural networks) are inherently harder to explain than others, which is why this is an active area of research. When decisions matter — loans, healthcare, hiring — explainability isn't a nice-to-have, it's a necessity.",
    section: 10,
  },
];
