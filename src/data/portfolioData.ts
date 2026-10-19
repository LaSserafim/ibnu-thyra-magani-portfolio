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

export interface TechnicalInterest {
  title: string;
  tag: string;
  summary: string;
  topics: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  school: string;
  curriculum: string;
  location: string;
  about: string;
  technicalInterests: TechnicalInterest[];
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
    "High school student interested in computer systems, financial econometrics, and interactive educational software. I use modern web standards, Python, and AI coding tools to design, build, and deploy functional applications.",
  technicalInterests: [
    {
      title: "Data Science",
      tag: "Analytics & Pipelines",
      summary:
        "Extracting patterns from high-volume, multi-source datasets through automated ETL pipelines, vectorized operations in NumPy/Pandas, and reproducible exploratory analysis.",
      topics: ["Data Pipelines & Ingestion", "Exploratory Analysis", "Feature Extraction", "Empirical Validation"],
    },
    {
      title: "Probability & Stochastic Modeling",
      tag: "Mathematics & Simulation",
      summary:
        "Formulating stochastic calculus and probability distributions to quantify uncertainty, simulate future scenarios, and calculate tail-risk bounds.",
      topics: ["Geometric Brownian Motion", "Monte Carlo Simulations", "Probability Distributions", "Tail-Risk Quantification"],
    },
    {
      title: "Financial Technology",
      tag: "Market Microstructure",
      summary:
        "Engineering real-time market data platforms, range-based volatility estimators, and econometric valuation frameworks for capital markets.",
      topics: ["Range-Based Volatility", "Cornish-Fisher VaR & CVaR", "Liquidity Proxies", "Automated Valuation Models"],
    },
    {
      title: "Cryptography & Privacy",
      tag: "Security Primitives",
      summary:
        "Studying asymmetric/symmetric encryption primitives, secure hash algorithms, cryptographic protocols, and local-first zero-cloud data models.",
      topics: ["Cryptographic Primitives", "Hashing & Verification", "Zero-Knowledge Concepts", "Client-Side Privacy"],
    },
  ],
  targetPrograms: [
    {
      institution: "University of Aizu",
      program: "ICT Global All-English (SCSE)",
      field: "Computer Science & Software Engineering",
    },
    {
      institution: "University of Tsukuba",
      program: "Interdisciplinary Engineering (IDE)",
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
    {
      institution: "Ritsumeikan University",
      program: "ISSE Course (College of Info Science)",
      field: "Information Systems, Cloud Infrastructure & AI",
    },
    {
      institution: "Tokyo International University",
      program: "B.S. in Data Science & Artificial Intelligence",
      field: "Machine Learning, Predictive Analytics & Applied AI",
    },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "mediaspine",
    title: "MediaSpine",
    tagline: "In-browser clinical posture screener with local computer vision and biometric scoring",
    category: "Computer Vision / HealthTech",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/mediaspine",
    liveUrl: "https://mediaspine.vercel.app",
    description:
      "A real-time webcam posture screening tool built for the SpineSafe NGO platform. Runs MediaPipe Pose locally via WebAssembly to measure neck deviation angles, shoulder tilt, head tilt, and postural sway. All video processing runs strictly on-device without cloud video uploads. Calculates a deterministic 0 to 100 posture score and plots cervical compressive force using the Kapandji-Hansraj model.",
    techStack: ["Vanilla JavaScript (ES Modules)", "HTML5 Canvas API", "MediaPipe Pose (Wasm)", "DeepSeek V3", "Supabase", "Vercel"],
    keyFeatures: [
      "Local pose estimation: BlazePose Lite runs via WebAssembly; frames are analyzed one by one and immediately discarded",
      "Automatic view detection: classifies Sagittal (Profile) vs Coronal (Frontal) views by comparing horizontal shoulder separation",
      "Five kinematic metrics: neck deviation angle, shoulder tilt, head tilt, rolling 30-frame live stability, and 3-second hold stability",
      "Deterministic 0 to 100 scoring with calibrated penalties across 5 brackets (Normal, Very Mild, Mild, Moderate, Severe)",
      "Kapandji-Hansraj cervical load curve plotting head tilt against cervical spinal compressive force (11 to 60 lbs)",
      "Bilingual interface (English & Bahasa Indonesia) with DeepSeek AI summaries and targeted mobility exercises",
    ],
    codeSnippet: {
      filename: "kinematics.js",
      code: `// MediaSpine: View Classification & Neck Angle Calculation
export function evaluateFrame(landmarks) {
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  
  // Horizontal separation under 0.15 indicates profile view
  const shoulderDist = Math.abs(leftShoulder.x - rightShoulder.x);
  const isProfile = shoulderDist < 0.15;
  
  if (isProfile) {
    // Pick side with higher landmark visibility (ear + shoulder)
    const side = (landmarks[7].visibility + leftShoulder.visibility) > 
                 (landmarks[8].visibility + rightShoulder.visibility) ? 'left' : 'right';
    const ear = side === 'left' ? landmarks[7] : landmarks[8];
    const shoulder = side === 'left' ? leftShoulder : rightShoulder;
    
    // Neck deviation from vertical plumb line
    const dx = Math.abs(ear.x - shoulder.x);
    const dy = Math.abs(ear.y - shoulder.y);
    const neckAngle = Math.atan(dx / dy) * (180 / Math.PI);
    return { mode: 'profile', neckAngle: Math.round(neckAngle * 10) / 10 };
  }
  return { mode: 'frontal' };
}`,
      explanation:
        "Calculates sagittal neck deviation angle from vertical plumb line with automatic profile/frontal view classification.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I formulated the biomechanical kinematic definitions from orthopedic literature (Kapandji-Hansraj cervical compression curves) and used Claude to scaffold the initial MediaPipe WebAssembly listener.",
      humanEngineeringAndRefinement:
        "Model outputs had frame-rate lag and coordinate jitter. I implemented drop-frame throttling when the GPU is busy, built a rolling 30-frame stability buffer, and designed the deterministic 0-100 penalty system so clinical labels and numerical scores always agree.",
    },
  },
  {
    id: "the-link-reaction",
    title: "The Link Reaction",
    tagline: "Interactive 8-stage cellular respiration simulation aligned with Cambridge 9700",
    category: "Interactive Education / SVG",
    year: "2025",
    githubUrl: "https://github.com/LaSserafim/the-link-reaction",
    liveUrl: "https://the-link-reaction.vercel.app",
    description:
      "A cinematic, interactive educational simulation built directly around the Cambridge International A-Level Biology (9700 Section 12) curriculum. Explains the oxidative decarboxylation of pyruvate to Acetyl-CoA across 8 sequential stages, with strict stoichiometric carbon-atom tracking and procedural SVG animations.",
    techStack: ["HTML5", "CSS3 Animation Engine", "Vanilla JavaScript (ES Modules)", "Procedural SVG"],
    keyFeatures: [
      "8-stage interactive finite state machine with keyboard (arrow keys, space) and mobile touch-swipe navigation",
      "Stoichiometric carbon conservation: tracks 3C Pyruvate splitting into 2C Acetyl group and 1C Carbon Dioxide",
      "Procedural SVG Bezier docking animations representing Coenzyme A (CoA-SH) sulfhydryl linkage formation",
      "Accessible design with keyboard shortcuts, label toggles, stage progress bar, and pan/zoom viewport controls",
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
        "Finite state transition engine enforcing exact biological step progression according to the Cambridge 9700 syllabus.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I provided the Cambridge A-Level Biology syllabus rubric to DeepSeek to draft the biochemical transition states and identify key enzyme cofactors.",
      humanEngineeringAndRefinement:
        "AI models suggested bulky WebGL 3D libraries that ran poorly on mobile devices. I rejected external dependencies and engineered lightweight procedural SVG coordinate transforms with native CSS keyframes for 60 FPS playback on any device.",
    },
  },
  {
    id: "futureas",
    title: "FutureAs",
    tagline: "Institutional equity research, stochastic modeling, and quantitative valuation terminal",
    category: "Quantitative Analytics / Python",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/futureas",
    liveUrl: "https://futureas.vercel.app",
    description:
      "An institutional-grade quantitative valuation and equity intelligence terminal for US equities. Models future price distributions via a 10,000-path Geometric Brownian Motion (GBM) Monte Carlo engine, tests Cox-Ross-Rubinstein (CRR) binomial lattice convergence, and evaluates downside risk with Value-at-Risk (VaR) and Expected Shortfall (CVaR). Features 7 specialized analytical modules and an automated 15/15 test suite.",
    techStack: ["Python 3.12", "FastAPI", "NumPy & SciPy", "Yahoo Finance API", "React", "Tailwind CSS", "Plotly"],
    keyFeatures: [
      "10,000-path Geometric Brownian Motion (GBM) simulation generating a full 252-day forward matrix in under 0.08s",
      "Cox-Ross-Rubinstein (CRR) binomial lattice tree with continuity correction for multi-step valuation convergence",
      "Non-parametric risk metrics: 95% Value-at-Risk (VaR), 95% Conditional Value-at-Risk (CVaR / Expected Shortfall)",
      "Abramowitz & Stegun rational approximation for normal CDF inversion without external scipy runtime bloat",
      "7 analytical modules: Valuation & Monte Carlo, Price & EMA Trend, Multi-Horizon Lump Sum vs DCA (1Y–10Y), Quant Probability, Drawdown Analysis, SEC Form 4/144 Insider Tracking, and Crash Radar",
      "Automated test suite with 15/15 passing unit and integration tests (test_api.py, test_quant.py)",
    ],
    codeSnippet: {
      filename: "monte_carlo.py",
      code: `import numpy as np

def run_gbm_simulation(last_price: float, mu: float, sigma: float, days: int = 252, paths: int = 10000):
    """Vectorized Geometric Brownian Motion simulation via Itô's Lemma."""
    dt = 1.0 / 252.0
    drift = (mu - 0.5 * (sigma ** 2)) * dt
    diffusion = sigma * np.sqrt(dt) * np.random.normal(0, 1, (days, paths))
    
    # Vectorized cumulative summation across simulation axis
    log_returns = drift + diffusion
    price_paths = np.empty((days + 1, paths))
    price_paths[0] = last_price
    price_paths[1:] = last_price * np.exp(np.cumsum(log_returns, axis=0))
    return price_paths`,
      explanation:
        "Generates 10,000 stochastic price trajectories in <80ms using vectorized cumulative log-return sums.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I drafted the SDE mathematical foundations (Itô's lemma, Wiener processes) and used Claude to scaffold the NumPy matrix vectorization and FastAPI route handlers.",
      humanEngineeringAndRefinement:
        "I resolved the binomial tree lattice boundary errors by implementing the Cox-Ross-Rubinstein continuity correction, wrote the Abramowitz-Stegun rational approximation to remove heavy dependencies, and authored a 15-test automated verification suite.",
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
      "An autonomous daily equity research pipeline that compiles and distributes publication-grade PDF intelligence dossiers every morning. Ingests data across FinViz, SEC EDGAR regulatory filings, and Yahoo Finance historical OHLCV. Employs dual-layer scheduling redundancy pairing local macOS launchd with GitHub Actions cloud cron.",
    techStack: ["Python 3.12", "Puppeteer (Headless Chrome)", "GitHub Actions", "macOS launchd", "SMTP"],
    keyFeatures: [
      "Dual-layer scheduler: runs locally via macOS launchd at 09:00 WIB with GitHub Actions cloud cron as fallback",
      "Idempotent delivery guard using GitHub cache to ensure reports are never emailed twice on the same trading day",
      "Automated HTML to vector PDF compiler using headless Chrome for Testing with precision CSS print media pagination",
      "Network recovery daemon with retry loops that verifies connectivity before attempting remote data fetches or SMTP dispatch",
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
    tagline: "Quantitative equity research & econometric market terminal for the Indonesia Stock Exchange",
    category: "Financial Econometrics / Full Stack",
    year: "2025–2026",
    githubUrl: "https://github.com/LaSserafim/quantidx",
    description:
      "An open-access quantitative finance and market terminal for the Indonesia Stock Exchange (IDX / Bursa Efek Indonesia). Integrates empirical financial econometrics, range-based volatility estimators, non-Gaussian tail risk modeling, liquidity proxies, and fundamental accounting ratios. Backed by FastAPI and live .JK market data.",
    techStack: ["Python 3.12", "FastAPI", "NumPy & Pandas", "TradingView Pro Widget", "Chart.js", "Tailwind CSS"],
    keyFeatures: [
      "Return distribution moments: calculates sample mean, volatility, skewness, excess kurtosis, and Jarque-Bera (1987) normality p-values",
      "Range-based volatility estimators: Parkinson (1980) High-Low, Garman-Klass (1980) OHLC, and Rogers-Satchell (1991) non-zero drift volatility",
      "Non-Gaussian downside risk: Cornish-Fisher expansion Value-at-Risk (adjusting for skewness and fat tails) and Expected Shortfall (CVaR)",
      "Empirical liquidity proxies: Corwin-Schultz (2012) Bid-Ask Spread estimator from daily high/low prices and Amihud (2002) Illiquidity Ratio",
      "30-day forward Monte Carlo Geometric Brownian Motion (GBM) simulation cone",
      "DeepSeek AI structured econometric research memorandums with deterministic fallback synthesizer",
    ],
    codeSnippet: {
      filename: "quant_engine.py",
      code: `import numpy as np

def parkinson_volatility(high: np.ndarray, low: np.ndarray, trading_days: int = 252) -> float:
    """Parkinson (1980) extreme-value realized volatility estimator.
    Provides ~5x greater statistical efficiency than close-to-close estimators.
    """
    n = len(high)
    if n == 0:
        return 0.0
    log_hl = np.log(high / low)
    sigma_sq = (1.0 / (4.0 * np.log(2.0) * n)) * np.sum(log_hl ** 2)
    return float(np.sqrt(sigma_sq * trading_days))`,
      explanation:
        "Computes extreme-value volatility using daily high/low price dispersion, offering 5x higher efficiency than close-to-close methods.",
    },
    howBuiltWithAi: {
      promptingAndScaffolding:
        "I researched peer-reviewed econometric papers (Parkinson 1980, Garman-Klass 1980, Corwin-Schultz 2012) and used AI to assist in translating the mathematical summations into vectorized NumPy formulas.",
      humanEngineeringAndRefinement:
        "I validated that all metrics rely strictly on empirical trading data (eliminating simulated orderbook ladders), implemented the closed-form Chi-Square p-value for the Jarque-Bera normality test, and built the high-density single-page interface with TradingView Pro charting.",
    },
  },
];
