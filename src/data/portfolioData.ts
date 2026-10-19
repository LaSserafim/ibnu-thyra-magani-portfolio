export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  githubUrl: string;
  liveUrl?: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  codeSnippet?: {
    filename: string;
    code: string;
    explanation: string;
  };
  howBuiltWithAi: {
    promptingAndScaffolding: string;
    humanEngineeringAndRefinement: string;
  };
}

export interface ProfileData {
  name: string;
  title: string;
  school: string;
  curriculum: string;
  location: string;
  about: string;
  competitions: Array<{
    title: string;
    result: string;
    field: string;
    summary: string;
  }>;
  targetPrograms: Array<{
    institution: string;
    program: string;
    field: string;
  }>;
}

export const PROFILE_DATA: ProfileData = {
  name: "Ibnu Thyra Magani",
  title: "Student Developer & Software Builder",
  school: "BINUS SCHOOL Semarang",
  curriculum: "Cambridge International Curriculum",
  location: "Semarang, Indonesia",
  about:
    "High school student interested in computer systems, quantitative analysis, and interactive educational software. I use modern web standards, Python, and AI coding tools to design, build, and deploy functional applications.",
  competitions: [
    {
      title: "Bandung International Science Fair (BISF)",
      result: "Silver Medal",
      field: "Physics & Engineering",
      summary: "Built and tested an engineering hardware setup applying mechanical physics principles.",
    },
    {
      title: "American Mathematics Olympiad (AMO)",
      result: "Bronze Medal",
      field: "Mathematics",
      summary: "Competed in high-school level discrete mathematics, geometry, and combinatorics.",
    },
  ],
  targetPrograms: [
    {
      institution: "Keio University",
      program: "GIGA Program (SFC)",
      field: "AI, Data Science & Network Systems",
    },
    {
      institution: "University of Aizu",
      program: "ICT Global All-English",
      field: "Computer Science & Software Engineering",
    },
    {
      institution: "University of Tsukuba",
      program: "Interdisciplinary Engineering",
      field: "Computational Mechanics & Systems",
    },
    {
      institution: "Temple University Japan",
      program: "B.S. in Computer Science",
      field: "Software Development & Systems",
    },
    {
      institution: "Waseda University",
      program: "EBSE (CSCE)",
      field: "Computer Science & Communications Engineering",
    },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "mediaspine",
    title: "MediaSpine",
    tagline: "In-browser clinical posture and spinal angle screener",
    category: "Computer Vision / HealthTech",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/mediaspine",
    liveUrl: "https://mediaspine.vercel.app",
    description:
      "A real-time webcam posture screener built for the SpineSafe initiative. It measures the Craniovertebral Angle (CVA) between the tragus of the ear and C7 vertebra to detect Forward Head Posture (FHP). All image processing runs locally in the browser with zero video transmission to servers.",
    techStack: ["Vanilla JavaScript (ES Modules)", "HTML5 Canvas API", "MediaPipe Pose", "Vercel"],
    keyFeatures: [
      "Real-time 30+ FPS pose landmark tracking directly in browser memory",
      "Calculates Craniovertebral Angle (CVA) and Coronal Shoulder Tilt with threshold warnings",
      "Built without external NPM build tools to run instantly on low-spec school computers",
      "Completely private: video stream never leaves the user device",
    ],
    codeSnippet: {
      filename: "posture-math.js",
      code: `// Calculate Craniovertebral Angle (CVA)
export function calculateCVA(tragus, c7) {
  const dx = tragus.x - c7.x;
  const dy = tragus.y - c7.y;
  const angleRad = Math.atan2(Math.abs(dy), Math.abs(dx));
  const angleDeg = angleRad * (180 / Math.PI);
  return {
    angle: Math.round(angleDeg * 10) / 10,
    isAbnormal: angleDeg < 50.0 // CVA < 50 deg indicates forward head posture
  };
}`,
      explanation:
        "Trigonometric calculation of the CVA angle from MediaPipe 3D coordinate vectors.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I researched orthopaedic literature for the clinical definition of CVA and FHP, then used Claude to scaffold the initial MediaPipe Pose callback listener and canvas coordinate math.",
      humanEngineeringAndRefinement:
        "The raw model output suffered from coordinate jitter under uneven lighting. I implemented an Exponential Moving Average (EMA) smoothing buffer and stripped all heavyweight NPM packages down to a single vanilla ES module for zero-latency loading.",
    },
  },
  {
    id: "the-link-reaction",
    title: "The Link Reaction",
    tagline: "Interactive step-by-step cellular respiration simulation",
    category: "Interactive Education / SVG",
    year: "2025",
    githubUrl: "https://github.com/LaSserafim/the-link-reaction",
    liveUrl: "https://the-link-reaction.vercel.app",
    description:
      "An interactive visual guide built around the Cambridge International A-Level Biology (9700) curriculum. It breaks down the Link Reaction (oxidative decarboxylation of pyruvate into Acetyl-CoA) across 8 distinct sequential steps with atom-level tracking.",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Procedural SVG"],
    keyFeatures: [
      "8-stage interactive state machine with keyboard (arrow keys, space) and touch navigation",
      "Strict stoichiometry tracking showing 3C Pyruvate splitting into 2C Acetyl group and 1C CO2",
      "Procedural SVG animation showing Coenzyme A (CoA-SH) binding to the acetate group",
      "Accessible design with step indicators, pause/play, and zoom controls",
    ],
    codeSnippet: {
      filename: "state-engine.js",
      code: `// Transition state machine for Cambridge 9700 Link Reaction
export function nextReactionStage(currentStage) {
  const STAGES = [
    { step: 1, name: "Pyruvate Transport across Mitochondrial Membrane" },
    { step: 2, name: "Decarboxylation: Release of 1 CO2 molecule" },
    { step: 3, name: "Dehydrogenation: Reduction of NAD+ to NADH" },
    { step: 4, name: "Binding of Coenzyme A (CoA-SH) to 2C Acetyl Group" },
    { step: 5, name: "Formation of Acetyl-Coenzyme A (Acetyl-CoA)" }
  ];
  return STAGES[Math.min(currentStage + 1, STAGES.length - 1)];
}`,
      explanation:
        "Finite state transition ensuring students step through the biochemical reaction in exact syllabus order.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I fed the Cambridge 9700 syllabus learning objectives to DeepSeek to draft the state transition table and list required coenzymes (NAD, CoA).",
      humanEngineeringAndRefinement:
        "AI models initially suggested heavy Three.js 3D models that lagged on mobile. I redirected the project to clean, resolution-independent SVG vector coordinates with CSS keyframes, ensuring instant loading on mobile phones and Chromebooks.",
    },
  },
  {
    id: "futureas",
    title: "FutureAs",
    tagline: "Automated equity valuation and quantitative simulation tool",
    category: "Quantitative Analytics / Python",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/futureas",
    liveUrl: "https://futureas.vercel.app",
    description:
      "A quantitative stock intelligence tool combining financial data ingestion with stochastic price path simulations. Runs Monte Carlo simulations, calculates Dollar-Cost Averaging (DCA) historical return curves, and tracks corporate insider transactions.",
    techStack: ["Python 3.12", "FastAPI", "NumPy", "Yahoo Finance API", "React", "Tailwind CSS"],
    keyFeatures: [
      "1,000-path Geometric Brownian Motion (GBM) Monte Carlo simulation for 1-year price distributions",
      "Historical Dollar-Cost Averaging (DCA) backtest calculator comparing lump-sum vs monthly purchases",
      "Downside risk calculation: Maximum Drawdown (MDD), Value-at-Risk (VaR), and Sortino ratios",
      "Automated SEC Form 4 insider transaction log parser",
    ],
    codeSnippet: {
      filename: "monte_carlo.py",
      code: `import numpy as np

def run_gbm_simulation(last_price: float, mu: float, sigma: float, days: int = 252, paths: int = 1000):
    dt = 1.0 / 252.0
    drift = (mu - 0.5 * (sigma ** 2)) * dt
    diffusion = sigma * np.sqrt(dt) * np.random.normal(0, 1, (days, paths))
    daily_returns = np.exp(drift + diffusion)
    
    price_paths = np.empty((days + 1, paths))
    price_paths[0] = last_price
    for t in range(1, days + 1):
        price_paths[t] = price_paths[t - 1] * daily_returns[t - 1]
    return price_paths`,
      explanation:
        "Vectorized simulation of 1,000 potential future price paths using historical drift and annualized volatility.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I used Claude to draft the initial NumPy matrix operations for Geometric Brownian Motion and set up the FastAPI endpoint structure.",
      humanEngineeringAndRefinement:
        "I audited the statistical equations to ensure annualization constants matched standard 252-trading-day conventions, and added Redis caching to prevent Yahoo Finance API rate limits.",
    },
  },
  {
    id: "stock-intelligence-cloud",
    title: "Stock Intelligence Cloud",
    tagline: "Autonomous daily market intelligence and automated report pipeline",
    category: "Automation / DevOps",
    year: "2024–2026",
    githubUrl: "https://github.com/LaSserafim/stock-intelligence-cloud",
    description:
      "An automated daily market research pipeline. Every morning, it fetches data across FinViz, SEC filings, and Yahoo Finance, renders formatted PDF intelligence briefs using headless Chromium, and emails them automatically to subscribers.",
    techStack: ["Python 3.12", "Puppeteer (Headless Chrome)", "GitHub Actions", "macOS launchd", "SMTP"],
    keyFeatures: [
      "Dual-layer scheduler: runs locally via macOS launchd at 09:00 WIB with GitHub Actions cloud cron as fallback",
      "Idempotent delivery guard using GitHub cache to ensure reports are never emailed twice",
      "Automated HTML to vector PDF compiler with custom CSS print page breaks",
      "Network recovery daemon that checks Wi-Fi connectivity before attempting email dispatch",
    ],
    codeSnippet: {
      filename: "run_pipeline.py",
      code: `import time, urllib.request

def wait_for_network(max_retries=12, delay=5):
    """Ensure network is connected before running fetchers."""
    for attempt in range(max_retries):
        try:
            urllib.request.urlopen("https://1.1.1.1", timeout=3)
            return True
        except Exception:
            time.sleep(delay)
    return False`,
      explanation:
        "Network resilience check preventing launchd jobs from failing silently when the laptop wakes from sleep.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I used AI to draft the Puppeteer script flags needed to run Chrome headless inside macOS environments without sandbox errors.",
      humanEngineeringAndRefinement:
        "I designed the dual-redundancy failover logic between local launchd and GitHub Actions, and added cache-locking to ensure automated deliveries remain idempotent.",
    },
  },
  {
    id: "quant-idx",
    title: "QUANT.IDX Terminal",
    tagline: "Indonesian stock market orderbook and microstructure analytics terminal",
    category: "Financial Microstructure / Full Stack",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/quantidx",
    description:
      "A quantitative market microstructure analytics terminal for the Indonesia Stock Exchange (IDX). It visualizes 15-level orderbook depth, computes Order Flow Imbalance (OFI), and calculates broker concentration using the Herfindahl-Hirschman Index (HHI).",
    techStack: ["FastAPI (Python)", "WebGPU / Canvas", "TradingView Pro API", "Pandas", "Tailwind CSS"],
    keyFeatures: [
      "15-level Depth of Market (DOM) bid/ask volume ladder",
      "Order Flow Imbalance (OFI) indicator tracking top-of-book size changes between ticks",
      "Broker Summary (BrokSum) volume concentration index (HHI) for institutional activity",
      "Integrated TradingView lightweight charting with custom overlay indicators",
    ],
    codeSnippet: {
      filename: "ofi_engine.py",
      code: `def calculate_ofi(bid_p, bid_v, ask_p, ask_v, prev_bid_p, prev_bid_v, prev_ask_p, prev_ask_v):
    # Order Flow Imbalance (OFI) delta computation
    delta_bid = bid_v if bid_p > prev_bid_p else (bid_v - prev_bid_v if bid_p == prev_bid_p else 0)
    delta_ask = ask_v if ask_p < prev_ask_p else (ask_v - prev_ask_v if ask_p == prev_ask_p else 0)
    return delta_bid - delta_ask`,
      explanation:
        "Calculates net supply and demand pressure at the best bid and ask quotes between consecutive updates.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I explained Indonesian broker summary mechanisms to AI models and had them help draft the mathematical HHI concentration formulas.",
      humanEngineeringAndRefinement:
        "I tuned the data structures using Pandas and NumPy vectors to ensure calculations run in under 5 milliseconds on live tick feeds.",
    },
  },
];
