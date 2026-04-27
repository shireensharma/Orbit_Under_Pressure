const BASELINE = {
  trackedObjects: 40000,
  activePayloads: 11000,
  trackedDebris: 29000,
  derelictSeeds: 5200,
  oneCmObjects: 1200000,
};

const BAND_DEFINITIONS = [
  {
    id: "sub500",
    label: "350-500 km",
    shortLabel: "350-500 km",
    note: "Lower, drag-heavy shell. Objects here fall back to Earth faster than they do in higher LEO bands.",
    activeShare: 0.25,
    debrisShare: 0.1,
    derelictShare: 0.1,
    dragRemovalRate: 0.13,
    collisionWeight: 0.82,
    launchShare: 0.24,
    retirementRate: 0.17,
  },
  {
    id: "midConstellation",
    label: "500-600 km",
    shortLabel: "500-600 km",
    note: "One of the most crowded current shells in LEO, especially for newer large constellations.",
    activeShare: 0.4,
    debrisShare: 0.16,
    derelictShare: 0.16,
    dragRemovalRate: 0.075,
    collisionWeight: 1.34,
    launchShare: 0.38,
    retirementRate: 0.14,
  },
  {
    id: "sunSyncLower",
    label: "600-800 km",
    shortLabel: "600-800 km",
    note: "Busy transition region for Earth observation and transport-style traffic, with longer object lifetimes.",
    activeShare: 0.17,
    debrisShare: 0.24,
    derelictShare: 0.22,
    dragRemovalRate: 0.035,
    collisionWeight: 1.08,
    launchShare: 0.18,
    retirementRate: 0.11,
  },
  {
    id: "sunSyncUpper",
    label: "800-1000 km",
    shortLabel: "800-1000 km",
    note: "Persistent high-risk band where debris can stay around for a very long time.",
    activeShare: 0.1,
    debrisShare: 0.3,
    derelictShare: 0.3,
    dragRemovalRate: 0.012,
    collisionWeight: 1.42,
    launchShare: 0.12,
    retirementRate: 0.09,
  },
  {
    id: "highLeo",
    label: "1000-1400 km",
    shortLabel: "1000-1400 km",
    note: "Long-lived upper LEO band where mistakes can remain for centuries or longer.",
    activeShare: 0.08,
    debrisShare: 0.2,
    derelictShare: 0.22,
    dragRemovalRate: 0.004,
    collisionWeight: 1.15,
    launchShare: 0.08,
    retirementRate: 0.07,
  },
];

const HIGHLIGHT_OBJECTS = [
  {
    name: "ISS",
    altitude: 420,
    bandId: "sub500",
    type: "active",
    summary: "Human-tended research station in low LEO. NASA says the station operates in roughly the 370-460 km range and needs periodic reboosts.",
    sourceLabel: "NASA ISS reference",
    sourceUrl: "https://www.nasa.gov/reference/international-space-station/",
  },
  {
    name: "Hubble",
    altitude: 483,
    bandId: "sub500",
    type: "active",
    summary: "Space telescope orbiting roughly 483 km above Earth, according to NASA's mission overview.",
    sourceLabel: "NASA Hubble observatory",
    sourceUrl: "https://science.nasa.gov/mission/hubble/observatory/",
  },
  {
    name: "Tiangong",
    altitude: 390,
    bandId: "sub500",
    type: "active",
    summary: "China's crewed space station operates in low LEO, another example of how human spaceflight uses the lower drag-heavy region.",
    sourceLabel: "General mission reference",
    sourceUrl: "https://www.nasa.gov/",
  },
  {
    name: "Aqua",
    altitude: 705,
    bandId: "sunSyncLower",
    type: "active",
    summary: "NASA Earth science mission flying at about 705 km in a sun-synchronous orbit.",
    sourceLabel: "NASA Aqua",
    sourceUrl: "https://science.nasa.gov/kids/earth/mission-aqua",
  },
  {
    name: "Landsat 8",
    altitude: 705,
    bandId: "sunSyncLower",
    type: "active",
    summary: "NASA and USGS Earth observation mission at about 705 km, useful for illustrating long-lived imaging orbits.",
    sourceLabel: "NASA Landsat 8",
    sourceUrl: "https://science.nasa.gov/mission/landsat-8/",
  },
  {
    name: "Sentinel-2A",
    altitude: 786,
    bandId: "sunSyncLower",
    type: "active",
    summary: "Copernicus Earth observation mission in a sun-synchronous orbit near the lower edge of the long-lived upper LEO region.",
    sourceLabel: "General mission reference",
    sourceUrl: "https://www.esa.int/",
  },
  {
    name: "Terra",
    altitude: 705,
    bandId: "sunSyncLower",
    type: "active",
    summary: "NASA Earth observing mission near 705 km, useful for showing how several major science missions share similar long-lived shells.",
    sourceLabel: "General mission reference",
    sourceUrl: "https://www.nasa.gov/",
  },
  {
    name: "Envisat",
    altitude: 800,
    bandId: "sunSyncUpper",
    type: "derelict",
    summary: "Defunct ESA Earth observation satellite near 800 km. ESA has pointed to Envisat as a major debris concern because of its size and persistent orbit.",
    sourceLabel: "ESA Envisat",
    sourceUrl: "https://www.esa.int/Applications/Observing_the_Earth/Envisat_satellite_facts",
  },
  {
    name: "ERS-2",
    altitude: 785,
    bandId: "sunSyncUpper",
    type: "derelict",
    summary: "ESA's ERS-2 was an important Earth observation mission and is a useful example of how large retired spacecraft can remain relevant to debris discussions.",
    sourceLabel: "General mission reference",
    sourceUrl: "https://www.esa.int/",
  },
  {
    name: "NOAA-20",
    altitude: 824,
    bandId: "sunSyncUpper",
    type: "active",
    summary: "Operational weather spacecraft in sun-synchronous orbit, representing the kind of infrastructure people depend on for forecasts and environmental monitoring.",
    sourceLabel: "General mission reference",
    sourceUrl: "https://www.nesdis.noaa.gov/",
  },
];

const defaults = {
  launches: 1400,
  compliance: 68,
  passivation: 72,
  removal: 0,
  cascade: 55,
  years: 20,
  viewMode: "general",
  scenario: "baseline",
};

const scenarios = {
  baseline: { launches: 1400, compliance: 68, passivation: 72, removal: 0, cascade: 55, years: 20 },
  constellation: { launches: 1900, compliance: 58, passivation: 65, removal: 0, cascade: 72, years: 20 },
  fiveYear: { launches: 1500, compliance: 87, passivation: 83, removal: 1, cascade: 42, years: 20 },
  removal: { launches: 1600, compliance: 82, passivation: 84, removal: 4, cascade: 38, years: 20 },
};

const audienceContent = {
  general: {
    label: "General Public",
    outlookHeading: "Why This Matters To Everyday Life",
    orbitVisualCaption: "Each ring is a different height above Earth. Hover a highlighted object to pause the animation and learn more.",
    bandsHeading: "Where The Traffic Is",
    bandsIntro: "Low Earth orbit is not one empty circle. Some heights are much more crowded than others, and those crowded heights are where the risk builds fastest.",
    impactIntro:
      "Space junk matters because many quiet parts of daily life depend on satellites. Weather forecasts, GPS, maps, wildfire tracking, climate monitoring, and some communication systems all become harder to protect when orbit gets too crowded.",
    briefCards: [
      {
        title: "What is orbital debris?",
        body: "It is human-made junk in orbit: dead satellites, rocket leftovers, and fragments created by crashes or explosions.",
      },
      {
        title: "Why is it dangerous?",
        body: "Objects in orbit move extremely fast. Even small fragments can hit with enough energy to badly damage a spacecraft.",
      },
      {
        title: "Why does crowding matter?",
        body: "The more objects share the same useful orbit lanes, the more chances they have to come dangerously close to one another.",
      },
      {
        title: "Why can the problem snowball?",
        body: "One collision can create many new fragments, and those fragments can later cause more collisions.",
      },
    ],
    runawayHeading: "How The Runaway Effect Works",
    runawayIntro:
      "The core idea is simple: if one crash creates a cloud of debris, that cloud becomes the setup for later crashes. That is why experts worry about debris starting to feed on itself.",
    runawaySteps: [
      { title: "1. Traffic builds up", body: "Working satellites and old junk share the same useful orbit lanes." },
      { title: "2. A breakup creates many pieces", body: "One bad collision can turn one object into many dangerous fragments." },
      { title: "3. Those pieces become the next risk", body: "The new fragments create more chances for later collisions." },
    ],
    actionsHeading: "What The General Public Can Do",
    actionsIntro:
      "Most people are not launching satellites, but public understanding still matters because space safety is tied to infrastructure that everyone depends on.",
    actions: [
      { title: "Support clear science communication", body: "Treat orbital safety as infrastructure and resilience, not just as niche space trivia." },
      { title: "Pay attention to policy debates", body: "Rules about communications, weather resilience, and space traffic all affect orbital safety." },
      { title: "Back science education", body: "The more people understand what satellites do, the easier it is to build support for protecting the orbits they use." },
    ],
    glossaryHeading: "Acronym And Terms Guide",
    glossaryIntro: "Here are the main words and abbreviations you need for the page.",
    glossary: [
      { term: "LEO", definition: "Low Earth orbit, the region of space relatively close to Earth where many satellites fly." },
      { term: "ISS", definition: "International Space Station, a large crewed science laboratory in low Earth orbit." },
      { term: "Active payload", definition: "A spacecraft that is still working and doing its job." },
      { term: "Derelict object", definition: "A dead spacecraft or hardware piece still in orbit and no longer controlled." },
      { term: "Passivation", definition: "Making a dead spacecraft safer by removing leftover fuel or stored energy." },
      { term: "Post-mission disposal", definition: "Moving a spacecraft out of a busy orbit after its mission ends." },
    ],
    rigorHeading: "How This Projection Works",
    rigorIntro:
      "The model is simplified, but it is built to be inspectable. Each control corresponds to a real lever people discuss in orbital debris mitigation.",
    rigor: [
      { title: "Research question", body: "How does congestion evolve across LEO altitude bands when launches, disposal, passivation, and cleanup improve at different rates?" },
      { title: "Engineering lens", body: "The model treats orbit as a system with flows in, flows out, and feedback, rather than as one static debris count." },
      { title: "Communication lens", body: "The page explains the same evidence differently depending on who needs to understand or act on it." },
      { title: "Three object groups", body: "The simulator tracks working spacecraft, dead collision-prone objects, and tracked debris fragments separately." },
    ],
  },
  policy: {
    label: "Policymakers",
    outlookHeading: "Governance Outlook",
    orbitVisualCaption: "The highlighted objects show why long-lived large spacecraft create public-risk spillovers when disposal fails.",
    bandsHeading: "Where Shared Risk Concentrates",
    bandsIntro: "The key policy issue is that crowded shells create spillover risk. One operator can raise the burden for many others sharing the same altitude band.",
    impactIntro:
      "This briefing treats debris as a governance problem. The central question is whether disposal, passivation, transparency, and remediation rules are strong enough to keep a finite orbital resource usable.",
    briefCards: [
      { title: "Why this is a policy problem", body: "Orbital risk is shared across operators, which means weak behavior by one actor can spill over onto everyone else." },
      { title: "Why legacy objects matter", body: "Even if new launches improve, old dead objects still remain in the environment and continue to raise risk." },
      { title: "Why the runaway effect matters", body: "Delay is costly because once collision feedback grows, later intervention must work harder just to stop things from getting worse." },
      { title: "Most useful levers", body: "Compliance, enforcement, disclosure, and support for cleanup capability matter more than slogans." },
    ],
    runawayHeading: "Runaway Effect For Policy",
    runawayIntro:
      "The policy concern is path dependence. Once a shell gets crowded enough, future mitigation has to spend more effort just to stabilize conditions.",
    runawaySteps: [
      { title: "1. Weak end-of-life behavior leaves hazards", body: "Dead spacecraft remain in traffic lanes instead of leaving them." },
      { title: "2. Breakups raise public cost", body: "Fragments increase conjunction burden for all operators using that orbital region." },
      { title: "3. Delay increases cleanup difficulty", body: "A larger stock of persistent objects means a larger long-term management problem." },
    ],
    actionsHeading: "What Policymakers Can Do",
    actionsIntro:
      "The strongest policy levers are the ones that change operator incentives before crowded shells tip toward stronger self-sustaining debris growth.",
    actions: [
      { title: "Tighten disposal rules", body: "Shorter post-mission disposal windows can reduce the number of dead spacecraft left in busy shells." },
      { title: "Make compliance visible", body: "Require transparent reporting on disposal success, passivation, and major conjunction practices." },
      { title: "Support cleanup capability", body: "Treat debris remediation, tracking, and data sharing as infrastructure worth public investment." },
    ],
    glossaryHeading: "Acronym And Terms Guide",
    glossaryIntro: "These terms are defined in the way they matter for oversight and regulation.",
    glossary: [
      { term: "LEO", definition: "Low Earth orbit, the shared near-Earth region where many spacecraft operate." },
      { term: "Compliance", definition: "Whether operators actually do the end-of-life actions they said they would do." },
      { term: "Conjunction burden", definition: "The planning, maneuvering, and coordination workload created by a crowded environment." },
      { term: "Remediation", definition: "Active removal of hazardous objects that are unlikely to leave orbit on their own." },
    ],
    rigorHeading: "How This Projection Works",
    rigorIntro:
      "This is not a licensing tool, but it is useful because it connects policy levers to plausible system behavior rather than showing only static totals.",
    rigor: [
      { title: "Research question", body: "How does congestion evolve across LEO altitude bands when launches, disposal, passivation, and cleanup improve at different rates?" },
      { title: "Engineering lens", body: "The model links density, lifetime, and end-of-life outcomes to the probability of future debris creation." },
      { title: "Communication lens", body: "The same physical story is translated into governance language focused on incentives, spillovers, and intervention timing." },
      { title: "Targeted cleanup", body: "Cleanup missions are modeled as reducing large dead-object risk more directly than generic drag does." },
    ],
  },
  universities: {
    label: "Universities",
    outlookHeading: "Academic Mission Outlook",
    orbitVisualCaption: "The highlighted objects show how research and science missions inhabit very different LEO shells with very different persistence.",
    bandsHeading: "Where Student And Research Missions Meet Risk",
    bandsIntro: "University missions are often small, but they still enter a shared environment where poor end-of-life planning can outlast the original project.",
    impactIntro:
      "Universities help train future spacecraft engineers and increasingly fly their own missions, so orbital sustainability should be part of core mission design and education rather than treated as an afterthought.",
    briefCards: [
      { title: "Why this matters on campus", body: "Student and research spacecraft still contribute to traffic and debris risk, even when each mission is physically small." },
      { title: "What universities control", body: "Mission altitude, passivation planning, disposal planning, and the norms students learn before entering graduate school or industry." },
      { title: "Why the runaway effect matters", body: "A failed spacecraft can remain a hazard much longer than the project, semester, or grant cycle that created it." },
      { title: "Why this is a teaching opportunity", body: "Orbital debris is a strong systems-engineering case because it connects design, operations, ethics, and policy." },
    ],
    runawayHeading: "Runaway Effect For Universities",
    runawayIntro:
      "The key lesson is that mission decisions have long tails. A project may end quickly, but its orbital consequences can persist for decades.",
    runawaySteps: [
      { title: "1. A mission enters a shared shell", body: "The spacecraft joins a region already used by many other missions." },
      { title: "2. End-of-life planning succeeds or fails", body: "If the vehicle cannot safely leave or be stabilized, it stays behind as a hazard." },
      { title: "3. The risk outlives the project", body: "A dead object can keep raising conjunction risk long after the original team has moved on." },
    ],
    actionsHeading: "What Universities Can Do",
    actionsIntro:
      "Universities have leverage both as launch participants and as training grounds for the engineers who will shape future space systems.",
    actions: [
      { title: "Teach it early", body: "Build disposal, passivation, and debris-aware design into normal aerospace coursework." },
      { title: "Design for end-of-life", body: "Require realistic disposal and passivation plans from the earliest mission reviews." },
      { title: "Share lessons learned", body: "Publish post-mission outcomes so future student teams can learn from both successes and failures." },
    ],
    glossaryHeading: "Acronym And Terms Guide",
    glossaryIntro: "These terms are framed around student missions, research spacecraft, and teaching.",
    glossary: [
      { term: "LEO", definition: "Low Earth orbit, where many student and research satellites operate." },
      { term: "Mission assurance", definition: "The practices used to reduce the chance that a mission fails or creates avoidable downstream risk." },
      { term: "End-of-life plan", definition: "The exact plan for what happens to the spacecraft after it finishes its job." },
      { term: "Systems engineering", definition: "Designing with the whole lifecycle and all interacting risks in view, not just one subsystem." },
    ],
    rigorHeading: "How This Projection Works",
    rigorIntro:
      "The model is especially useful in an academic setting because it makes the assumptions visible enough for critique, extension, and classroom discussion.",
    rigor: [
      { title: "Research question", body: "How does congestion evolve across LEO altitude bands when launches, disposal, passivation, and cleanup improve at different rates?" },
      { title: "Engineering lens", body: "The simulator emphasizes lifecycle thinking: launch, operation, retirement, disposal failure, and later collision risk." },
      { title: "Communication lens", body: "The same evidence is turned into a teaching tool by explicitly surfacing the assumptions behind each projection." },
      { title: "Band sensitivity", body: "Different altitude bands behave differently because drag and object lifetime change sharply with altitude." },
    ],
  },
  industry: {
    label: "Industry",
    outlookHeading: "Operational Risk Outlook",
    orbitVisualCaption: "The highlighted objects show why long-lived large spacecraft and crowded shells matter for maneuver burden and fleet resilience.",
    bandsHeading: "Where Fleet Risk Concentrates",
    bandsIntro: "Commercially attractive shells can be efficient for service delivery and fragile at the same time.",
    impactIntro:
      "Here the focus is operational risk. Congestion raises maneuver burden, service disruption risk, mission assurance cost, and the chance that one failed spacecraft becomes a fleet-wide problem.",
    briefCards: [
      { title: "Why this is a business problem", body: "Debris risk affects asset value, continuity of service, maneuver planning, and the resilience of full constellations." },
      { title: "Why derelicts matter", body: "Large dead objects are future fragment sources, not just passive clutter." },
      { title: "Why the runaway effect matters", body: "One high-energy breakup in a dense shell can sharply raise conjunction burden for many operators at once." },
      { title: "Most useful levers", body: "Disposal reliability, passivation, tracking quality, coordination, and removal-ready design all matter." },
    ],
    runawayHeading: "Runaway Effect For Operators",
    runawayIntro:
      "Once a useful shell gets dense enough, each operator inherits part of the risk created by everyone else sharing that region.",
    runawaySteps: [
      { title: "1. Preferred shells fill up", body: "Repeat launches concentrate traffic in the same commercially useful altitudes." },
      { title: "2. One failed spacecraft becomes a seed", body: "An uncontrolled vehicle can remain long enough to become a major future fragment source." },
      { title: "3. Burden spreads across fleets", body: "Conjunction workload, maneuvering, uncertainty, and insurance concern all rise together." },
    ],
    actionsHeading: "What Industry Can Do",
    actionsIntro:
      "The strongest operational choices are the ones that reduce the chance your hardware becomes someone else's long-lived debris problem.",
    actions: [
      { title: "Design for disposal", body: "Treat reliable end-of-life behavior as a core part of mission assurance." },
      { title: "Design for removal", body: "Add interfaces and architecture choices that make failed vehicles easier to remediate." },
      { title: "Share better data", body: "Better ephemerides and coordination reduce uncertainty and lower avoidable conjunction burden." },
    ],
    glossaryHeading: "Acronym And Terms Guide",
    glossaryIntro: "These terms are framed around fleet operations and mission assurance.",
    glossary: [
      { term: "LEO", definition: "Low Earth orbit, the shared operating region for many commercial fleets." },
      { term: "Conjunction", definition: "A close approach between space objects that may require assessment or a maneuver." },
      { term: "Collision seed", definition: "A large unmanaged object that could generate many future fragments if hit." },
      { term: "Maneuver burden", definition: "The operational workload created by repeatedly managing close approaches." },
    ],
    rigorHeading: "How This Projection Works",
    rigorIntro:
      "The value here is not exact prediction of one spacecraft's conjunctions. It is intuition about how fleet-scale choices interact with crowded orbital shells.",
    rigor: [
      { title: "Research question", body: "How does congestion evolve across LEO altitude bands when launches, disposal, passivation, and cleanup improve at different rates?" },
      { title: "Engineering lens", body: "Risk rises with both local density and the stock of long-lived uncontrolled objects in the same band." },
      { title: "Communication lens", body: "The page translates the same debris story into fleet resilience, operational workload, and risk management language." },
      { title: "Targeted cleanup realism", body: "Cleanup is limited and directed at large dead-object risk, not modeled as a magic reset button." },
    ],
  },
};

const sources = [
  {
    title: "ESA Space Environment Report 2025",
    url: "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025",
    note:
      "Used for the baseline environment through the end of 2024: about 40,000 tracked objects, about 11,000 active payloads, more than 1.2 million objects above 1 cm, and the warning that debris can continue growing without stronger intervention.",
  },
  {
    title: "ESA Annual Space Environment Report PDF",
    url: "https://www.sdo.esoc.esa.int/publications/Space_Environment_Report_I9R1_20251021.pdf",
    note:
      "Used for the altitude-crowding story and for the statement that debris can keep growing even if launches stopped because of fragmentation and collision feedback.",
  },
  {
    title: "NASA Orbital Debris FAQ",
    url: "https://orbitaldebris.jsc.nasa.gov/faq/",
    note:
      "Used for altitude-lifetime intuition, debris concentration context near 750 to 1000 km, and the high-speed impact explanation behind why even small fragments matter.",
  },
  {
    title: "NASA-STD-8719.14C Process for Limiting Orbital Debris",
    url: "https://standards.nasa.gov/standard/NASA/NASA-STD-871914",
    note:
      "Used to ground the disposal and passivation controls in real mitigation practice instead of made-up dashboard terms.",
  },
  {
    title: "NASA ISS reference",
    url: "https://www.nasa.gov/reference/international-space-station/",
    note:
      "Used for the highlighted ISS object and NASA's stated operational altitude range of roughly 370 to 460 km.",
  },
  {
    title: "NASA Hubble observatory",
    url: "https://science.nasa.gov/mission/hubble/observatory/",
    note:
      "Used for Hubble's approximate orbital altitude of about 483 km.",
  },
  {
    title: "NASA Aqua",
    url: "https://science.nasa.gov/kids/earth/mission-aqua",
    note:
      "Used for Aqua's altitude of about 705 km.",
  },
  {
    title: "NASA Landsat 8",
    url: "https://science.nasa.gov/mission/landsat-8/",
    note:
      "Used for Landsat 8's altitude of about 705 km.",
  },
  {
    title: "ESA Envisat satellite facts",
    url: "https://www.esa.int/Applications/Observing_the_Earth/Envisat_satellite_facts",
    note:
      "Used for Envisat's altitude of about 800 km and for illustrating why large dead spacecraft in persistent bands matter.",
  },
];

const inputs = {
  launches: document.getElementById("launchesInput"),
  compliance: document.getElementById("complianceInput"),
  passivation: document.getElementById("passivationInput"),
  removal: document.getElementById("removalInput"),
  cascade: document.getElementById("cascadeInput"),
  years: document.getElementById("yearsInput"),
};

const valueNodes = {
  launches: document.getElementById("launchesValue"),
  compliance: document.getElementById("complianceValue"),
  passivation: document.getElementById("passivationValue"),
  removal: document.getElementById("removalValue"),
  cascade: document.getElementById("cascadeValue"),
  years: document.getElementById("yearsValue"),
};

const state = { ...defaults };

const headlineStatusNode = document.getElementById("headlineStatus");
const endDebrisNode = document.getElementById("endDebris");
const riskLevelNode = document.getElementById("riskLevel");
const orbitScoreNode = document.getElementById("orbitScore");
const cascadeScoreNode = document.getElementById("cascadeScore");
const impactNarrativeNode = document.getElementById("impactNarrative");
const audienceBriefCardsNode = document.getElementById("audienceBriefCards");
const audienceLabelNode = document.getElementById("audienceLabel");
const yearlyHighlightsNode = document.getElementById("yearlyHighlights");
const bandCardsNode = document.getElementById("bandCards");
const sourcesListNode = document.getElementById("sourcesList");
const glossaryListNode = document.getElementById("glossaryList");
const glossaryIntroNode = document.getElementById("glossaryIntro");
const glossaryHeadingNode = document.getElementById("glossaryHeading");
const glossaryPanelNode = document.getElementById("glossaryPanel");
const rigorListNode = document.getElementById("rigorList");
const rigorIntroNode = document.getElementById("rigorIntro");
const rigorHeadingNode = document.getElementById("rigorHeading");
const runawayHeadingNode = document.getElementById("runawayHeading");
const runawayIntroNode = document.getElementById("runawayIntro");
const runawayStepsNode = document.getElementById("runawaySteps");
const actionsHeadingNode = document.getElementById("actionsHeading");
const actionsIntroNode = document.getElementById("actionsIntro");
const audienceActionsNode = document.getElementById("audienceActions");
const bandsHeadingNode = document.getElementById("bandsHeading");
const bandsIntroNode = document.getElementById("bandsIntro");
const orbitVisualCaptionNode = document.getElementById("orbitVisualCaption");
const outlookHeadingNode = document.getElementById("outlookHeading");
const orbitChart = document.getElementById("orbitChart");
const orbitCtx = orbitChart ? orbitChart.getContext("2d") : null;
const orbitVisual = document.getElementById("orbitVisual");
const visualCtx = orbitVisual ? orbitVisual.getContext("2d") : null;
const orbitTooltipNode = document.getElementById("orbitTooltip");
const methodsNoteNode = document.getElementById("methodsNote");
const effortsAndReadingNode = document.getElementById("effortsAndReading");
const earthTexture = new Image();
earthTexture.src = "360_F_938447737_wWdcV6i8BtmIt9pyefKImRqJXqlaICar.jpg.png";

let latestSimulation = null;
let animationFrame = null;
let orbitParticles = [];
let orbitAngle = 0;
let highlightedObjects = [];
let hoveredObjectName = null;

function formatNumber(value) {
  return Math.round(value).toLocaleString();
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function clamp(min, value, max) {
  return Math.min(max, Math.max(min, value));
}

function safeRatio(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

function updateControls() {
  valueNodes.launches.textContent = formatNumber(state.launches);
  valueNodes.compliance.textContent = formatPercent(state.compliance);
  valueNodes.passivation.textContent = formatPercent(state.passivation);
  valueNodes.removal.textContent = `${state.removal}`;
  valueNodes.cascade.textContent = formatPercent(state.cascade);
  valueNodes.years.textContent = `${state.years} years`;

  Object.entries(inputs).forEach(([key, input]) => {
    input.value = state[key];
  });

  document.querySelectorAll(".scenario-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === state.scenario);
  });

  document.querySelectorAll(".view-mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.viewMode);
  });
}

function createInitialBands() {
  return BAND_DEFINITIONS.map((band) => ({
    ...band,
    active: BASELINE.activePayloads * band.activeShare,
    debris: BASELINE.trackedDebris * band.debrisShare,
    derelicts: BASELINE.derelictSeeds * band.derelictShare,
  }));
}

function simulateSystem() {
  const yearly = [];
  let bands = createInitialBands();

  for (let year = 0; year <= state.years; year += 1) {
    const snapshotBands = bands.map((band) => {
      const disposalEffect = state.compliance / 100;
      const passivationEffect = state.passivation / 100;
      const cleanupEffort = state.removal;
      const cascadeEffect = state.cascade / 100;

      const collisionMass = band.active + band.debris + band.derelicts * 1.35;
      const densityRatio = collisionMass / 9000;
      const localTrafficRatio = (band.active + band.derelicts) / 6000;
      const runawayMultiplier =
        1 + Math.max(0, densityRatio - 0.85) * (0.8 + cascadeEffect) + (band.debris / 12000) * cascadeEffect * 0.55;
      const collisionEvents = band.collisionWeight * densityRatio * localTrafficRatio * runawayMultiplier * 0.44;
      const accidentalBreakups = (1 - passivationEffect) * band.derelicts * 0.012;

      const launchInflux = state.launches * band.launchShare;
      const retirements = band.active * band.retirementRate;
      const successfulDisposals = retirements * disposalEffect;
      const failedDisposals = retirements - successfulDisposals;

      const cleanupWeight = band.id === "sunSyncUpper" || band.id === "highLeo" ? 1.25 : 0.45;
      const removalOperations = cleanupEffort * cleanupWeight;
      const derelictsRemoved = Math.min(band.derelicts * 0.16, removalOperations * 7);
      const debrisRemovedByCleanup = Math.min(band.debris * 0.035, removalOperations * 10);
      const naturalDebrisDecay = band.debris * band.dragRemovalRate;
      const naturalDerelictDecay = band.derelicts * band.dragRemovalRate * 0.55;

      const collisionFragments = collisionEvents * (150 + runawayMultiplier * 95);
      const breakupFragments = accidentalBreakups * 90;
      const disposalFragments = failedDisposals * 1.7;

      const nextActive = Math.max(280, band.active + launchInflux - retirements);
      const nextDerelicts = Math.max(
        60,
        band.derelicts + failedDisposals - derelictsRemoved - naturalDerelictDecay - collisionEvents * 1.2
      );
      const nextDebris = Math.max(
        200,
        band.debris + collisionFragments + breakupFragments + disposalFragments - debrisRemovedByCleanup - naturalDebrisDecay
      );

      const health = clamp(
        0,
        100
          - densityRatio * 16
          - collisionEvents * 10
          - failedDisposals / 135
          - accidentalBreakups * 11
          + state.compliance * 0.12
          + state.passivation * 0.08
          + state.removal * 1.8,
        100
      );

      return {
        ...band,
        densityRatio,
        collisionEvents,
        accidentalBreakups,
        runawayMultiplier,
        health,
        nextActive,
        nextDerelicts,
        nextDebris,
        launchInflux,
        failedDisposals,
        successfulDisposals,
        derelictsRemoved,
        debrisRemovedByCleanup,
      };
    });

    const totalActive = snapshotBands.reduce((sum, band) => sum + band.active, 0);
    const totalDebris = snapshotBands.reduce((sum, band) => sum + band.debris, 0);
    const totalDerelicts = snapshotBands.reduce((sum, band) => sum + band.derelicts, 0);
    const totalCollisions = snapshotBands.reduce((sum, band) => sum + band.collisionEvents, 0);
    const totalBreakups = snapshotBands.reduce((sum, band) => sum + band.accidentalBreakups, 0);
    const meanScore = snapshotBands.reduce((sum, band) => sum + band.health, 0) / snapshotBands.length;
    const maxCascade = Math.max(...snapshotBands.map((band) => band.runawayMultiplier));

    yearly.push({
      year,
      active: totalActive,
      debris: totalDebris,
      derelicts: totalDerelicts,
      collisions: totalCollisions,
      breakups: totalBreakups,
      score: meanScore,
      cascadeIndex: maxCascade,
      bands: snapshotBands,
    });

    bands = snapshotBands.map((band) => ({
      ...band,
      active: band.nextActive,
      debris: band.nextDebris,
      derelicts: band.nextDerelicts,
    }));
  }

  return yearly;
}

function summarize(results) {
  const first = results[0];
  const last = results[results.length - 1];
  const avgCollisions = results.reduce((sum, year) => sum + year.collisions, 0) / results.length;
  const avgScore = results.reduce((sum, year) => sum + year.score, 0) / results.length;
  const avgCascade = results.reduce((sum, year) => sum + year.cascadeIndex, 0) / results.length;
  const debrisGrowth = safeRatio(last.debris - first.debris, first.debris);

  let status = "Orbit is stressed but still recoverable";
  let tone = "ok";

  if (avgCascade > 2.25 || avgScore < 35 || debrisGrowth > 1.4) {
    status = "Runaway collision behavior is emerging";
    tone = "danger";
  } else if (avgCascade > 1.55 || avgScore < 58 || debrisGrowth > 0.55) {
    status = "Orbit is degrading without stronger intervention";
    tone = "warn";
  }

  return {
    endDebris: last.debris,
    endDerelicts: last.derelicts,
    avgCollisions,
    avgScore,
    avgCascade,
    status,
    tone,
  };
}

function setHeadline(summary) {
  headlineStatusNode.textContent = summary.status;
  headlineStatusNode.style.color =
    summary.tone === "danger" ? "var(--danger)" : summary.tone === "warn" ? "var(--warm)" : "var(--ok)";
  headlineStatusNode.style.borderColor =
    summary.tone === "danger"
      ? "rgba(251, 113, 133, 0.28)"
      : summary.tone === "warn"
        ? "rgba(251, 191, 36, 0.28)"
        : "rgba(134, 239, 172, 0.22)";
  headlineStatusNode.style.background =
    summary.tone === "danger"
      ? "rgba(251, 113, 133, 0.12)"
      : summary.tone === "warn"
        ? "rgba(251, 191, 36, 0.12)"
        : "rgba(134, 239, 172, 0.12)";
}

function updateMetrics(summary) {
  endDebrisNode.textContent = formatNumber(summary.endDebris);
  riskLevelNode.textContent = `${summary.avgCollisions.toFixed(1)} / yr`;
  orbitScoreNode.textContent = `${Math.round(summary.avgScore)} / 100`;
  cascadeScoreNode.textContent = `${summary.avgCascade.toFixed(2)}x`;
}

function renderAudience(summary, results) {
  const copy = audienceContent[state.viewMode];
  const last = results[results.length - 1];
  const worstBand = last.bands.reduce((worst, band) => (band.runawayMultiplier > worst.runawayMultiplier ? band : worst), last.bands[0]);

  audienceLabelNode.textContent = copy.label;
  outlookHeadingNode.textContent = copy.outlookHeading;
  orbitVisualCaptionNode.textContent = copy.orbitVisualCaption;
  bandsHeadingNode.textContent = copy.bandsHeading;
  bandsIntroNode.textContent = copy.bandsIntro;
  runawayHeadingNode.textContent = copy.runawayHeading;
  runawayIntroNode.textContent = copy.runawayIntro;
  actionsHeadingNode.textContent = copy.actionsHeading;
  actionsIntroNode.textContent = copy.actionsIntro;
  glossaryHeadingNode.textContent = copy.glossaryHeading;
  glossaryIntroNode.textContent = copy.glossaryIntro;
  rigorHeadingNode.textContent = copy.rigorHeading;
  rigorIntroNode.textContent = copy.rigorIntro;
  impactNarrativeNode.innerHTML = "<br><br>";

  audienceBriefCardsNode.innerHTML = copy.briefCards
    .map((item) => `<div class="highlight"><strong>${item.title}</strong>${item.body}</div>`)
    .join("");

  runawayStepsNode.innerHTML = copy.runawaySteps
    .map((step) => `<article class="runaway-step"><strong>${step.title}</strong><p>${step.body}</p></article>`)
    .join("");

  audienceActionsNode.innerHTML = copy.actions
    .map((item) => `<article><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");

  glossaryListNode.innerHTML = copy.glossary
    .map((item) => `<div class="source-item"><strong>${item.term}</strong>${item.definition}</div>`)
    .join("");

  rigorListNode.innerHTML = copy.rigor
    .map((item) => `<article><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");

  glossaryPanelNode.classList.toggle("general-glossary", state.viewMode === "general");
}

function renderHighlights(results) {
  const checkpoints = [0.25, 0.5, 0.75]
    .map((fraction) => results[Math.min(results.length - 1, Math.floor((results.length - 1) * fraction))])
    .filter(Boolean);

  yearlyHighlightsNode.innerHTML = checkpoints
    .map((point) => {
      return `<div class="highlight"><strong>Year ${point.year}</strong>` +
        `Tracked debris is around ${formatNumber(point.debris)}, collision activity is ${point.collisions.toFixed(1)} modeled events per year, ` +
        `and the strongest runaway multiplier reaches ${point.cascadeIndex.toFixed(2)}x.</div>`;
    })
    .join("");
}

function renderBands(results) {
  const last = results[results.length - 1];
  const maxBandDebris = Math.max(...last.bands.map((band) => band.debris));
  const maxBandActive = Math.max(...last.bands.map((band) => band.active));
  const maxBandDerelicts = Math.max(...last.bands.map((band) => band.derelicts));

  bandCardsNode.innerHTML = last.bands
    .map((band) => {
      const riskLabel = band.runawayMultiplier > 2 ? "Runaway-prone" : band.runawayMultiplier > 1.4 ? "Crowded" : "More forgiving";
      return `<article class="band-card">
        <div class="band-topline">
          <strong>${band.label}</strong>
          <span class="band-risk">${riskLabel}</span>
        </div>
        <div class="band-meta">${band.note}</div>
        <div class="band-meters">
          <div>
            <div class="meter-label-row"><span>Active payloads</span><span>${formatNumber(band.active)}</span></div>
            <div class="meter-bar"><div class="meter-fill sat-fill" style="width:${safeRatio(band.active, maxBandActive) * 100}%"></div></div>
          </div>
          <div>
            <div class="meter-label-row"><span>Tracked debris</span><span>${formatNumber(band.debris)}</span></div>
            <div class="meter-bar"><div class="meter-fill debris-fill" style="width:${safeRatio(band.debris, maxBandDebris) * 100}%"></div></div>
          </div>
          <div>
            <div class="meter-label-row"><span>Derelict seeds</span><span>${formatNumber(band.derelicts)}</span></div>
            <div class="meter-bar"><div class="meter-fill derelict-fill" style="width:${safeRatio(band.derelicts, maxBandDerelicts) * 100}%"></div></div>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function renderSources() {
  sourcesListNode.innerHTML = sources
    .map((source) => `<div class="source-item"><strong><a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a></strong>${source.note}</div>`)
    .join("");
}

function renderClosingSections() {
  methodsNoteNode.innerHTML = [
    {
      title: "Observed baseline first",
      body: "The simulator starts from official NASA and ESA reporting on the current debris environment, then treats that as the present-day state rather than inventing a baseline from scratch.",
    },
    {
      title: "Band-by-band projection",
      body: "LEO is split into altitude bands because traffic density, drag, and object lifetime change with altitude. Each year of the simulation updates launches, retirements, disposal success, derelict growth, debris growth, and cleanup effects inside each band.",
    },
    {
      title: "Feedback, not exact prediction",
      body: "The future curves come from a transparent feedback model: more crowding raises collision pressure, failed disposal leaves more collision seeds, and stronger cleanup reduces some of that pressure. The model is meant to explain system behavior, not predict the exact catalog on a specific future date.",
    },
  ]
    .map((item) => `<article><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");

  effortsAndReadingNode.innerHTML = [
    {
      title: "Current removal efforts",
      body: "ESA's ClearSpace-1 is currently planned for 2029 and is intended to demonstrate capture and removal of ESA's Proba-1. ESA is also developing ADRIOS and the CAT design-for-removal demonstration, while NASA's Orbital Debris Program Office states that long-term stabilization likely requires targeted removal of large high-risk objects.",
    },
    {
      title: "Why this work is hard",
      body: "Removing debris is difficult because targets may be tumbling, uncooperative, and not designed for capture. That is why agencies are also pushing design-for-removal interfaces and stricter end-of-life standards, not only cleanup missions.",
    },
    {
      title: "Further reading",
      body: `Start with <a href="https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025" target="_blank" rel="noreferrer">ESA's Space Environment Report 2025</a>, <a href="https://orbitaldebris.jsc.nasa.gov/faq/" target="_blank" rel="noreferrer">NASA's Orbital Debris FAQ</a>, <a href="https://www.esa.int/Space_Safety/Space_Debris/Active_debris_removal" target="_blank" rel="noreferrer">ESA's Active Debris Removal overview</a>, and <a href="https://www.orbitaldebris.jsc.nasa.gov/remediation/" target="_blank" rel="noreferrer">NASA's debris remediation page</a>.`,
    },
  ]
    .map((item) => `<article><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");
}

function drawChart(results) {
  if (!orbitCtx || !orbitChart) {
    return;
  }

  const width = orbitChart.width;
  const height = orbitChart.height;
  const padding = { top: 24, right: 24, bottom: 42, left: 58 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxPrimary = Math.max(...results.map((point) => Math.max(point.active, point.debris)), 100);
  const maxCollisions = Math.max(...results.map((point) => point.collisions), 1);

  orbitCtx.clearRect(0, 0, width, height);

  orbitCtx.strokeStyle = "rgba(156, 184, 203, 0.14)";
  orbitCtx.lineWidth = 1;
  for (let index = 0; index <= 4; index += 1) {
    const y = padding.top + (innerHeight / 4) * index;
    orbitCtx.beginPath();
    orbitCtx.moveTo(padding.left, y);
    orbitCtx.lineTo(width - padding.right, y);
    orbitCtx.stroke();
  }

  orbitCtx.fillStyle = "rgba(156, 184, 203, 0.82)";
  orbitCtx.font = '12px "Space Grotesk", sans-serif';
  orbitCtx.textAlign = "right";
  for (let index = 0; index <= 4; index += 1) {
    const value = maxPrimary - (maxPrimary / 4) * index;
    orbitCtx.fillText(formatNumber(value), padding.left - 8, padding.top + (innerHeight / 4) * index + 4);
  }

  orbitCtx.textAlign = "center";
  const step = Math.max(1, Math.floor(results.length / 6));
  results.forEach((point, index) => {
    if (index % step !== 0 && index !== results.length - 1) {
      return;
    }
    const x = padding.left + (index / (results.length - 1)) * innerWidth;
    orbitCtx.fillText(`${point.year}`, x, height - 16);
  });

  drawLine(results, (point) => point.debris, maxPrimary, padding, innerWidth, innerHeight, "#fb7185");
  drawLine(results, (point) => point.active, maxPrimary, padding, innerWidth, innerHeight, "#7dd3fc");
  drawLine(results, (point) => point.score * (maxPrimary / 100), maxPrimary, padding, innerWidth, innerHeight, "#fbbf24");
  drawLine(results, (point) => point.collisions * (maxPrimary / maxCollisions) * 0.35, maxPrimary, padding, innerWidth, innerHeight, "#c084fc");
}

function drawLine(results, selector, maxValue, padding, innerWidth, innerHeight, color) {
  orbitCtx.beginPath();
  results.forEach((point, index) => {
    const x = padding.left + (index / (results.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (selector(point) / maxValue) * innerHeight;
    if (index === 0) {
      orbitCtx.moveTo(x, y);
    } else {
      orbitCtx.lineTo(x, y);
    }
  });
  orbitCtx.strokeStyle = color;
  orbitCtx.lineWidth = 3;
  orbitCtx.stroke();
}

function buildOrbitParticles(results) {
  const last = results[results.length - 1];
  const particles = [];
  const maxActiveDotsPerBand = 45;
  const maxDebrisDotsPerBand = 95;
  const maxDerelictDotsPerBand = 28;

  last.bands.forEach((band, bandIndex) => {
    const activeDots = Math.min(maxActiveDotsPerBand, Math.max(10, Math.round(band.active / 500)));
    const debrisDots = Math.min(maxDebrisDotsPerBand, Math.max(18, Math.round(band.debris / 700)));
    const derelictDots = Math.min(maxDerelictDotsPerBand, Math.max(6, Math.round(band.derelicts / 220)));

    for (let index = 0; index < activeDots; index += 1) {
      particles.push({
        bandIndex,
        kind: "active",
        angle: (Math.PI * 2 * index) / activeDots + bandIndex * 0.18,
        speed: 0.0032 + bandIndex * 0.00065,
      });
    }

    for (let index = 0; index < debrisDots; index += 1) {
      particles.push({
        bandIndex,
        kind: "debris",
        angle: (Math.PI * 2 * index) / debrisDots + 0.35,
        speed: 0.0019 + bandIndex * 0.00045,
      });
    }

    for (let index = 0; index < derelictDots; index += 1) {
      particles.push({
        bandIndex,
        kind: "derelict",
        angle: (Math.PI * 2 * index) / derelictDots + 0.8,
        speed: 0.0012 + bandIndex * 0.00024,
      });
    }
  });

  orbitParticles = particles;
}

function getBandRadius(bandId) {
  const bandIndex = BAND_DEFINITIONS.findIndex((band) => band.id === bandId);
  return 128 + bandIndex * 42;
}

function getHoverableObjects() {
  return highlightedObjects;
}

function drawEarth(centerX, centerY, earthRadius) {
  const glow = visualCtx.createRadialGradient(centerX, centerY, earthRadius * 0.65, centerX, centerY, earthRadius * 1.35);
  glow.addColorStop(0, "rgba(125, 211, 252, 0)");
  glow.addColorStop(0.8, "rgba(125, 211, 252, 0.10)");
  glow.addColorStop(1, "rgba(125, 211, 252, 0.32)");
  visualCtx.fillStyle = glow;
  visualCtx.beginPath();
  visualCtx.arc(centerX, centerY, earthRadius * 1.4, 0, Math.PI * 2);
  visualCtx.fill();

  visualCtx.save();
  visualCtx.beginPath();
  visualCtx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
  visualCtx.clip();

  if (earthTexture.complete && earthTexture.naturalWidth > 0) {
    visualCtx.drawImage(
      earthTexture,
      centerX - earthRadius,
      centerY - earthRadius,
      earthRadius * 2,
      earthRadius * 2
    );
  } else {
    const fallback = visualCtx.createRadialGradient(centerX - 18, centerY - 18, 12, centerX, centerY, earthRadius);
    fallback.addColorStop(0, "#79ebff");
    fallback.addColorStop(0.4, "#237fbe");
    fallback.addColorStop(1, "#0b3558");
    visualCtx.fillStyle = fallback;
    visualCtx.beginPath();
    visualCtx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
    visualCtx.fill();
  }

  visualCtx.restore();

  visualCtx.strokeStyle = "rgba(214, 244, 255, 0.78)";
  visualCtx.lineWidth = 3;
  visualCtx.beginPath();
  visualCtx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
  visualCtx.stroke();

  visualCtx.strokeStyle = "rgba(125, 211, 252, 0.4)";
  visualCtx.lineWidth = 8;
  visualCtx.beginPath();
  visualCtx.arc(centerX, centerY, earthRadius + 4, 0, Math.PI * 2);
  visualCtx.stroke();
}

function drawDensityRing(band, bandIndex, centerX, centerY) {
  const radius = getBandRadius(band.id);
  const densityStrength = clamp(0.08, safeRatio(band.debris + band.derelicts * 1.2, 12000), 0.95);
  const ringGradient = visualCtx.createRadialGradient(centerX, centerY, radius - 18, centerX, centerY, radius + 18);
  ringGradient.addColorStop(0, "rgba(0,0,0,0)");
  ringGradient.addColorStop(0.45, `rgba(251, 113, 133, ${0.05 + densityStrength * 0.05})`);
  ringGradient.addColorStop(0.56, `rgba(125, 211, 252, ${0.04 + densityStrength * 0.04})`);
  ringGradient.addColorStop(0.7, "rgba(0,0,0,0)");

  const bandStroke = ["rgba(224,224,232,0.28)", "rgba(196,196,206,0.3)", "rgba(168,168,180,0.3)", "rgba(140,140,154,0.32)", "rgba(112,112,126,0.34)"][bandIndex];
  visualCtx.strokeStyle = bandStroke;
  visualCtx.lineWidth = 1.4;
  visualCtx.beginPath();
  visualCtx.ellipse(centerX, centerY, radius, radius * 0.78, 0, 0, Math.PI * 2);
  visualCtx.stroke();

  visualCtx.strokeStyle = ringGradient;
  visualCtx.lineWidth = 14;
  visualCtx.beginPath();
  visualCtx.ellipse(centerX, centerY, radius, radius * 0.78, 0, 0, Math.PI * 2);
  visualCtx.stroke();
}

function updateHighlightedObjectsPositions(centerX, centerY) {
  const result = [];
  HIGHLIGHT_OBJECTS.forEach((object, index) => {
    const radius = getBandRadius(object.bandId);
    const anchorAngle = orbitAngle * 0.9 + index * 1.1;
    const x = centerX + Math.cos(anchorAngle) * radius;
    const y = centerY + Math.sin(anchorAngle) * radius * 0.78;
    result.push({ ...object, x, y, radius: 8 });
  });
  highlightedObjects = result;
}

function drawHighlightedObjects() {
  highlightedObjects.forEach((object) => {
    visualCtx.strokeStyle = object.name === hoveredObjectName ? "rgba(255, 244, 176, 1)" : "rgba(251, 191, 36, 0.96)";
    visualCtx.lineWidth = object.name === hoveredObjectName ? 3.2 : 2.4;
    visualCtx.beginPath();
    visualCtx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
    visualCtx.stroke();

    visualCtx.fillStyle = "rgba(5, 14, 24, 0.95)";
    visualCtx.beginPath();
    visualCtx.arc(object.x, object.y, object.radius - 2.5, 0, Math.PI * 2);
    visualCtx.fill();
  });
}

function animateOrbit() {
  if (!visualCtx || !orbitVisual || !latestSimulation) {
    return;
  }

  const width = orbitVisual.width;
  const height = orbitVisual.height;
  const centerX = width / 2 - 8;
  const centerY = height / 2;
  const earthRadius = 72;
  const lastBands = latestSimulation[latestSimulation.length - 1].bands;
  const paused = Boolean(hoveredObjectName);

  visualCtx.clearRect(0, 0, width, height);
  visualCtx.fillStyle = "#03111b";
  visualCtx.fillRect(0, 0, width, height);

  const glow = visualCtx.createRadialGradient(centerX, centerY, earthRadius * 0.5, centerX, centerY, earthRadius * 3.2);
  glow.addColorStop(0, "rgba(56, 189, 248, 0.34)");
  glow.addColorStop(1, "rgba(56, 189, 248, 0)");
  visualCtx.fillStyle = glow;
  visualCtx.beginPath();
  visualCtx.arc(centerX, centerY, earthRadius * 3.2, 0, Math.PI * 2);
  visualCtx.fill();

  drawEarth(centerX, centerY, earthRadius);

  lastBands.forEach((band, bandIndex) => {
    drawDensityRing(band, bandIndex, centerX, centerY);
  });

  orbitParticles.forEach((particle) => {
    const radius = getBandRadius(BAND_DEFINITIONS[particle.bandIndex].id);
    if (!paused) {
      particle.angle += particle.speed;
    }
    const x = centerX + Math.cos(particle.angle + orbitAngle) * radius;
    const y = centerY + Math.sin(particle.angle + orbitAngle) * radius * 0.78;
    visualCtx.fillStyle =
      particle.kind === "active" ? "rgba(125, 211, 252, 0.9)" : particle.kind === "derelict" ? "rgba(251, 191, 36, 0.88)" : "rgba(251, 113, 133, 0.82)";
    visualCtx.beginPath();
    visualCtx.arc(x, y, particle.kind === "active" ? 2.2 : particle.kind === "derelict" ? 2.8 : 1.5, 0, Math.PI * 2);
    visualCtx.fill();
  });

  updateHighlightedObjectsPositions(centerX, centerY);
  drawHighlightedObjects();

  if (!paused) {
    orbitAngle += 0.0015;
  }
  animationFrame = requestAnimationFrame(animateOrbit);
}

function showOrbitTooltip(object, event) {
  if (!orbitTooltipNode) {
    return;
  }
  orbitTooltipNode.hidden = false;
  orbitTooltipNode.innerHTML =
    `<strong>${object.name}</strong><span>${object.altitude} km altitude</span><p>${object.summary}</p>` +
    `<a href="${object.sourceUrl}" target="_blank" rel="noreferrer">${object.sourceLabel}</a>`;

  const rect = orbitVisual.getBoundingClientRect();
  orbitTooltipNode.style.left = `${event.clientX - rect.left + 14}px`;
  orbitTooltipNode.style.top = `${event.clientY - rect.top + 14}px`;
}

function hideOrbitTooltip() {
  if (orbitTooltipNode) {
    orbitTooltipNode.hidden = true;
  }
}

function handleOrbitPointerMove(event) {
  if (!orbitVisual) {
    return;
  }

  const rect = orbitVisual.getBoundingClientRect();
  const scaleX = orbitVisual.width / rect.width;
  const scaleY = orbitVisual.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const hitObject = getHoverableObjects().find((object) => {
    const dx = x - object.x;
    const dy = y - object.y;
    return Math.sqrt(dx * dx + dy * dy) <= object.radius + 6;
  });

  if (hitObject) {
    hoveredObjectName = hitObject.name;
    orbitVisual.style.cursor = "pointer";
    showOrbitTooltip(hitObject, event);
  } else {
    hoveredObjectName = null;
    orbitVisual.style.cursor = "default";
    hideOrbitTooltip();
  }
}

function handleOrbitPointerLeave() {
  hoveredObjectName = null;
  if (orbitVisual) {
    orbitVisual.style.cursor = "default";
  }
  hideOrbitTooltip();
}

function renderAll() {
  updateControls();
  const results = simulateSystem();
  latestSimulation = results;
  const summary = summarize(results);

  setHeadline(summary);
  updateMetrics(summary);
  renderAudience(summary, results);
  renderHighlights(results);
  renderBands(results);
  renderSources();
  renderClosingSections();
  drawChart(results);
  buildOrbitParticles(results);

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  animateOrbit();
}

function setScenario(name) {
  state.scenario = name;
  Object.assign(state, scenarios[name], { scenario: name, viewMode: state.viewMode });
  renderAll();
}

function showFatalError(error) {
  console.error(error);
  if (headlineStatusNode) {
    headlineStatusNode.textContent = "Page hit a loading error";
    headlineStatusNode.style.color = "var(--danger)";
    headlineStatusNode.style.borderColor = "rgba(251, 113, 133, 0.28)";
    headlineStatusNode.style.background = "rgba(251, 113, 133, 0.12)";
  }
  if (impactNarrativeNode) {
    impactNarrativeNode.textContent = `The page loaded its HTML but the interactive layer failed to initialize. Error: ${error.message}`;
  }
}

function init() {
  document.getElementById("resetButton").addEventListener("click", () => {
    Object.assign(state, defaults);
    renderAll();
  });

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      state[key] = Number(input.value);
      renderAll();
    });
  });

  document.querySelectorAll(".scenario-card").forEach((button) => {
    button.addEventListener("click", () => {
      setScenario(button.dataset.scenario);
    });
  });

  document.querySelectorAll(".view-mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.viewMode = button.dataset.view;
      renderAll();
    });
  });

  if (orbitVisual) {
    orbitVisual.addEventListener("mousemove", handleOrbitPointerMove);
    orbitVisual.addEventListener("mouseleave", handleOrbitPointerLeave);
  }

  renderAll();
}

try {
  init();
} catch (error) {
  showFatalError(error);
}
