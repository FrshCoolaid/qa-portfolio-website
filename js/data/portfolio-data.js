/* ==========================================================================
   portfolio-data.js — SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Everything the site displays comes from this file. To change any text,
   link, project, skill or image on the website, edit it HERE — you should
   never need to touch the HTML or the component files.

   Anything wrapped in [SQUARE BRACKETS] is a placeholder you should replace.
   Search this file for "[" to find them all.
   ========================================================================== */

const PORTFOLIO_DATA = {

  /* ========================================================================
     1. SITE CONFIG — feature switches and metadata
     ======================================================================== */
  config: {
    // Your personal phone number is in your CV. It is switched OFF by default
    // because publishing a mobile number on a public site attracts spam calls
    // and scrapers. Flip to true if you want it shown in the Contact section.
    showPhone: false,

    // The Test Runner feature we are going to build together.
    // Leave false until the Playwright + GitHub Actions work is done — that
    // way you can publish the site right now without a dead button on it.
    // Flip to true when we wire it up.
    showTestRunner: true,

    // Shown in the hero as a small status chip. Set to null to hide it.
    availability: "Open to QA opportunities",
  },

  meta: {
    title: "Aleksandar Djokic | Senior QA Engineer — AAA Game Development",
    description:
      "Portfolio of Aleksandar Djokic, Senior QA Engineer with nearly six years of AAA GameDev experience in cross-platform testing, feature validation, test planning, defect management, and release quality.",
    // [REPLACE] with your real deployed URL once it is live, e.g.
    // "https://aleksandardjokic.github.io/qa-portfolio/"
    siteUrl: "[YOUR_SITE_URL]",
    ogImage: "assets/og-image.png", // [ADD ASSET] 1200x630 png — see assets/README.md
    locale: "en_US",
  },

  /* ========================================================================
     2. IDENTITY
     ======================================================================== */
  profile: {
    name: "Aleksandar Djokic",
    initials: "AD",
    role: "Senior QA Engineer",
    tagline: "AAA Game Development · Cross-Platform QA · Feature Ownership",
    location: "Belgrade, Serbia",
    company: "Ubisoft Belgrade",

    // Hero paragraph — rewritten from the CV profile, not copy-pasted.
    intro:
      "Nearly six years of QA in AAA game development at Ubisoft, working across shipped and in-development titles in Agile, cross-functional teams. I own validation for gameplay, UI, content and technical features across PC, PlayStation 5, Xbox Series X and Stadia from early feature planning through to release readiness and post-launch support.",

    // Hero stat strip. Only facts the CV supports — no invented bug counts.
    stats: [
      { value: "~6", unit: "yrs", label: "AAA GameDev QA" },
      { value: "3",  unit: "",    label: "AAA projects" },
      { value: "4",  unit: "",    label: "Platforms shipped on" },
      { value: "ISTQB", unit: "", label: "Foundation Level" },
    ],
  },

  /* ========================================================================
     3. ABOUT
     ======================================================================== */
  about: {
    eyebrow: "About",
    heading: "Finding defects is half the job. Helping the team ship is the other half.",
    paragraphs: [
      "I'm a Senior QA Engineer at Ubisoft Belgrade, where I've spent nearly six years testing AAA titles across their full lifecycle from features that exist only as design documents through to live post-launch builds. My work sits close to the people building the game: developers, designers, production, QA Leads and other QA teams.",
      "Day to day that means taking ownership of features rather than waiting for a test case to be handed to me. I read the requirements, ask the questions that surface risk early, build the test plans and checklists, and then validate the thing across every platform it has to run on. When something breaks, I care as much about the quality of the report by including clean repro steps, logs, video, honest risk context, as about the find itself.",
      "The AAA environment sharpened a set of habits that travel well beyond games: testing across multiple builds and platforms in parallel, supporting release readiness against real dates, and reporting coverage, defect trends and open risks to the people who have to make the call.",
    ],

    // The small profile / status card beside the copy.
    card: {
      status: "Currently at Ubisoft Belgrade",
      rows: [
        { label: "Role",       value: "Senior QA Engineer" },
        { label: "Focus",      value: "Client-side game QA" },
        { label: "Based in",   value: "Belgrade, Serbia" },
        { label: "Languages",  value: "Serbian (native), English (fluent)" },
        { label: "Certified",  value: "ISTQB Foundation Level" },
      ],
      // Small strengths listed on the card
      traits: [
        "Feature ownership",
        "Cross-platform",
        "Release readiness",
        "Agile / Scrum",
      ],
    },
  },

  /* ========================================================================
     4. EXPERIENCE
     The CV bullets, reorganised into six ownership areas rather than dumped
     as one long list. Each area becomes a tab / accordion panel.
     ======================================================================== */
  experience: {
    eyebrow: "Experience",
    heading: "Six areas I own",
    intro:
      "One role, deliberately broad. Below is how the work actually breaks down at Ubisoft. Select an area to see what it involves.",

    role: {
      title: "Senior QA Engineer",
      company: "Ubisoft Belgrade",
      period: "2020 — Present",
      location: "Belgrade, Serbia",
      summary:
        "QA validation for gameplay, UI, content and technical features across AAA projects, from development through to post-launch.",
    },

    areas: [
      {
        id: "ownership",
        code: "01",
        title: "Feature Ownership",
        icon: "target",
        summary: "Taking a feature from requirements through to release readiness.",
        points: [
          "Own QA validation for gameplay, UI, content and technical features across AAA projects, from development through to post-launch.",
          "Analyse feature requirements, design documents and build priorities to establish what 'done' actually means before testing starts.",
          "Identify and communicate risk early, while it is still cheap to act on.",
          "Report on feature readiness and validation status to QA Leads, developers and production.",
        ],
      },
      {
        id: "platforms",
        code: "02",
        title: "Cross-Platform QA",
        icon: "layers",
        summary: "The same feature, validated across four very different targets.",
        points: [
          "Test client-side game behaviour across PC, PlayStation 5, Xbox Series X and Stadia.",
          "Cover gameplay logic, UI flows and platform-specific issues on each target.",
          "Validate consistency of behaviour across platforms and surface where it diverges.",
          "Work across multiple builds and platform configurations in parallel.",
        ],
      },
      {
        id: "defects",
        code: "03",
        title: "Defect Lifecycle",
        icon: "bug",
        summary: "From first repro to verified fix and regression pass.",
        points: [
          "Report, track and verify defects through the full bug lifecycle.",
          "Write clear, minimal reproduction steps that a developer can act on immediately.",
          "Attach the evidence that shortens investigation — logs, screenshots, video captures.",
          "Provide risk context so priority decisions are made on information rather than instinct.",
          "Verify fixes and run regression around them to confirm nothing else moved.",
        ],
      },
      {
        id: "strategy",
        code: "04",
        title: "Test Strategy & Execution",
        icon: "checklist",
        summary: "Documentation that stays useful past the sprint it was written in.",
        points: [
          "Create and maintain test plans, test cases and checklists based on feature requirements, design documents, builds and priorities.",
          "Execute manual functional, smoke, regression, exploratory and acceptance/UAT testing across multiple builds and platforms.",
          "Support release readiness with structured coverage rather than ad-hoc passes.",
          "Prepare QA summaries covering test coverage, defect trends, open risks and validation results.",
        ],
      },
      {
        id: "collaboration",
        code: "05",
        title: "Cross-Functional Collaboration",
        icon: "users",
        summary: "QA works best when it is in the room early.",
        points: [
          "Participate in feature planning and documentation review with developers, designers, production, QA Leads and QA teams.",
          "Clarify requirements before implementation, so ambiguity is resolved on a document rather than in a bug report.",
          "Communicate risks, test status and feature readiness to the people making ship decisions.",
          "Operate inside Agile, cross-functional teams on live-service game development.",
        ],
      },
      {
        id: "technical",
        code: "06",
        title: "Technical Environment",
        icon: "terminal",
        summary: "Owning the environment the testing runs in.",
        points: [
          "Prepare and maintain test environments, including build deployment and configuration changes.",
          "Work with Linux and cloud-based workflows and validate through the terminal.",
          "Investigate issues through logs and technical troubleshooting rather than surface symptoms.",
          "Collaborate with automation QA and developers on UI flows for automation, including running existing automated tests and reviewing results for QA reports.",
        ],
      },
    ],
  },

  /* ========================================================================
     5. PROJECTS
     --------------------------------------------------------------------------
     >> TO EDIT A PROJECT DESCRIPTION: change the `description` string below.
     >> TO ADD REAL ARTWORK: drop the image into assets/projects/ and set the
        `image` field to its path. If the file is missing, the site falls back
        to the abstract `placeholder` SVG automatically — nothing breaks.

     >> VERIFY BEFORE PUBLISHING: your CV lists the four platforms you have
        worked on, but not which platforms you covered on which title. The
        per-project `platforms` arrays below are set from each game's public
        release platforms, NOT from your CV. Check each one reflects what you
        personally tested and adjust. Same for the `qaTags`.
     ======================================================================== */
  projects: {
    eyebrow: "Projects",
    heading: "Titles I've tested",
    intro:
      "AAA projects at Ubisoft Belgrade, tested across development, launch and post-launch.",

    items: [
      {
        id: "riders-republic",
        title: "Riders Republic",
        studio: "Ubisoft",
        year: "",              // [OPTIONAL] add your involvement window if you want it shown
        status: "Released",
        // Drop an official/promotional image here when you have one you are
        // permitted to use. Until then the placeholder SVG is shown.
        image: "assets/projects/riders-republic.jpg",
        placeholder: "assets/projects/placeholder-riders-republic.svg",
        alt: "Abstract artwork representing the Riders Republic project",
        description:
          "[Add a short description of the project, your responsibilities, the areas and features you tested, and your key QA contributions here.]",
        qaTags: ["Gameplay validation", "UI testing", "Content validation", "Regression"],
        platforms: ["PC", "PS5", "Xbox Series X", "Stadia"],
        redacted: false,
      },
      {
        id: "ac-mirage",
        title: "Assassin's Creed Mirage",
        studio: "Ubisoft",
        year: "",
        status: "Released",
        image: "assets/projects/ac-mirage.jpg",
        placeholder: "assets/projects/placeholder-ac-mirage.svg",
        alt: "Abstract artwork representing the Assassin's Creed Mirage project",
        description:
          "[Add a short description of your QA involvement, the features and content you tested, the platforms you covered, and your responsibilities here.]",
        qaTags: ["Feature ownership", "Exploratory", "Cross-platform", "Bug lifecycle"],
        platforms: ["PC", "PS5", "Xbox Series X"],
        redacted: false,
      },
      {
        id: "unannounced",
        title: "Unannounced AAA Project",
        studio: "Ubisoft",
        year: "",
        status: "In development",
        image: null,           // intentionally none — do not add artwork here
        placeholder: "assets/projects/placeholder-unannounced.svg",
        alt: "Abstract redacted artwork representing an unannounced project",
        description:
          "[Add a non-confidential overview of your responsibilities and QA contributions here. Do not include the title, setting, features, dates or any other detail that is not public.]",
        qaTags: ["Test planning", "Smoke & regression", "Technical QA"],
        platforms: ["Under NDA"],
        redacted: true,
      },
    ],
  },

  /* ========================================================================
     6. SKILLS
     Grouped capabilities. Deliberately no percentage ratings — a "Python 80%"
     bar tells a hiring manager nothing and invites awkward questions.
     ======================================================================== */
  skills: {
    eyebrow: "Skills",
    heading: "What I bring to a QA team",
    intro:
      "Grouped by what the work actually is, rather than a flat wall of keywords.",

    groups: [
      {
        id: "test-design",
        title: "QA & Test Design",
        icon: "checklist",
        blurb: "Turning requirements into coverage that holds up.",
        items: [
          "Test documentation",
          "Test cases",
          "Checklists",
          "Exploratory testing",
          "Functional testing",
          "Smoke testing",
          "Regression testing",
          "Acceptance / UAT",
          "Cross-platform testing",
          "Performance testing",
        ],
      },
      {
        id: "game-qa",
        title: "Game QA",
        icon: "gamepad",
        blurb: "The part that is specific to shipping games.",
        items: [
          "Client-side game testing",
          "Gameplay validation",
          "UI validation",
          "Content validation",
          "Platform-specific testing",
          "Release readiness",
          "Feature ownership",
        ],
      },
      {
        id: "defect-mgmt",
        title: "Defect Management",
        icon: "bug",
        blurb: "Reports developers can act on without a follow-up conversation.",
        items: [
          "Bug reporting",
          "Reproduction",
          "Bug lifecycle management",
          "Regression verification",
          "Evidence collection",
          "Risk communication",
        ],
      },
      {
        id: "collab",
        title: "Process & Collaboration",
        icon: "users",
        blurb: "Working inside a cross-functional AAA team.",
        items: [
          "Agile / Scrum",
          "Requirements analysis",
          "Feature planning",
          "Documentation review",
          "QA reporting & summaries",
          "Stakeholder communication",
        ],
      },
    ],

    // Tools — strictly the ones listed on the CV.
    tools: {
      title: "Tools & Technologies",
      items: [
        { name: "Jira",     note: "Tracking" },
        { name: "TestRail", note: "Test management" },
        { name: "Git",      note: "Version control" },
        { name: "SVN",      note: "Version control" },
        { name: "Linux",    note: "Environments" },
        { name: "SQL",      note: "Data checks" },
        { name: "JQL",      note: "Jira queries" },
        { name: "JSON",     note: "Config & data" },
        { name: "XML",      note: "Config & data" },
        { name: "Python",   note: "Scripting" },
      ],
    },

    platforms: {
      title: "Platforms",
      items: [
        { name: "PC",             icon: "monitor" },
        { name: "PlayStation 5",  icon: "playstation" },
        { name: "Xbox Series X",  icon: "xbox" },
        { name: "Stadia",         icon: "cloud" },
      ],
    },
  },

  /* ========================================================================
     7. PROFESSIONAL JOURNEY
     Only what the CV supports. No invented promotion dates or intermediate
     job titles. Any item with `confirm: true` is one you should double-check
     or fill in before publishing.
     ======================================================================== */
  journey: {
    eyebrow: "Journey",
    heading: "How I got here",
    intro:
      "A QA career built inside AAA game development, one release cycle at a time.",

    milestones: [
      {
        tag: "Foundation",
        title: "School of Electrical and Computer Engineering of Applied Studies",
        detail: "Including Routing and Switching — Cisco Academy.",
        meta: "[ADD YEARS]",
        confirm: true,
        icon: "book",
      },
      {
        tag: "Certified",
        title: "ISTQB Foundation Level",
        detail: "Certified through the South East European Testing Board (SEETB).",
        meta: "[ADD YEAR]",
        confirm: true,
        icon: "badge",
      },
      {
        tag: "2020",
        title: "Joined Ubisoft Belgrade",
        detail: "Moved into AAA game development QA, working in Agile, cross-functional teams.",
        meta: "Ubisoft Belgrade",
        confirm: false,
        icon: "flag",
      },
      {
        tag: "Shipped",
        title: "Riders Republic",
        detail: "Client-side QA on an AAA title, from development through to post-launch.",
        // [VERIFY] Set to the platforms you personally covered on this title.
        meta: "PC · PS5 · Xbox Series X · Stadia",
        confirm: false,
        icon: "package",
      },
      {
        tag: "Shipped",
        title: "Assassin's Creed Mirage",
        detail: "Feature validation and defect lifecycle support across platforms.",
        // [VERIFY] Set to the platforms you personally covered on this title.
        meta: "PC · PS5 · Xbox Series X",
        confirm: false,
        icon: "package",
      },
      {
        tag: "In development",
        title: "Unannounced AAA Project",
        detail: "Ongoing QA ownership on an unannounced title.",
        meta: "Under NDA",
        confirm: false,
        icon: "lock",
      },
      {
        tag: "Today",
        title: "Senior QA Engineer",
        detail:
          "Owning validation across gameplay, UI, content and technical features, and supporting release readiness on AAA titles.",
        meta: "Ubisoft Belgrade · 2020 — Present",
        confirm: false,
        icon: "star",
        current: true,
      },
    ],
  },

  /* ========================================================================
     8. CERTIFICATION & EDUCATION
     ======================================================================== */
  credentials: {
    eyebrow: "Credentials",
    heading: "Certification & education",

    certification: {
      name: "ISTQB Foundation Level",
      issuer: "South East European Testing Board (SEETB)",
      // [OPTIONAL] add these if you want them displayed
      year: "[ADD YEAR]",
      credentialId: "[ADD CREDENTIAL ID — or delete this line to hide it]",
      credentialUrl: "", // [OPTIONAL] link to your certificate; leave "" to hide the button
      blurb:
        "The internationally recognised entry standard for software testing, test design techniques, test levels, defect management and the vocabulary that makes QA legible across teams and industries.",
      highlights: [
        "Test design techniques",
        "Test levels & types",
        "Defect management",
        "Test process & planning",
      ],
    },

    education: [
      {
        institution: "School of Electrical and Computer Engineering of Applied Studies",
        qualification: "Routing and Switching — Cisco Academy",
        period: "[ADD YEARS]",
        location: "[ADD LOCATION]",
      },
    ],

    languages: [
      { name: "Serbian", level: "Native" },
      { name: "English", level: "Fluent" },
    ],
  },

  /* ========================================================================
     9. CONTACT & LINKS
     >> ALL your contact details and social links are configured here.
     ======================================================================== */
  contact: {
    eyebrow: "Contact",
    heading: "Let's ship something stable",
    intro:
      "Open to QA Engineer, Game QA and technical QA roles in games and in the wider software industry. The fastest way to reach me is email.",

    email: "adjokicc00@gmail.com",

    // Your CV links to LinkedIn but the URL was not extractable from the PDF.
    // [REPLACE] this with your real profile URL — until you do, the link is
    // hidden from the site automatically rather than pointing somewhere wrong.
    linkedin: "https://www.linkedin.com/in/adjokicc/",

    // [OPTIONAL] add if you want them shown; leave "" to hide.
    github: "",

    phone: "+381 63 1240 621", // only rendered if config.showPhone is true
    location: "Belgrade, Serbia",

    // Drop your PDF at this exact path to activate the download buttons.
    cvPath: "assets/cv/Aleksandar-Djokic-CV.pdf",
    cvFileName: "Aleksandar-Djokic-CV.pdf",

    form: {
      // The form does NOT send anything yet — see js/lib/contact-form.js.
      // Nothing on the site claims that it does.
      enabled: true,
      note:
        "This form is not connected to a mail service yet. Until it is, email is the reliable route.",
    },
  },

  /* ========================================================================
     10. NAVIGATION
     Order here controls both the header links and the scroll-spy order.
     ======================================================================== */
  nav: [
    { id: "home",        label: "Home" },
    { id: "about",       label: "About" },
    { id: "experience",  label: "Experience" },
    { id: "projects",    label: "Projects" },
    { id: "skills",      label: "Skills" },
    { id: "journey",     label: "Journey" },
    { id: "credentials", label: "Credentials" },
    { id: "contact",     label: "Contact" },
  ],

  /* ========================================================================
     11. TEST RUNNER  — placeholder config for the feature we build together
     ------------------------------------------------------------------------
     Nothing here is wired up yet. `config.showTestRunner` is false, so the
     button is not rendered at all. We fill this in during the Playwright /
     GitHub Actions sessions.
     ======================================================================== */
  testRunner: {
    label: "Test Runner",
    blurb: "Run the Playwright suite against this site, or open the latest report.",
    reportUrl: "",   // [LATER] published Playwright HTML report URL
    workflowUrl: "", // [LATER] GitHub Actions workflow page
    repoUrl: "",     // [LATER] the repository this site lives in
  },
};
