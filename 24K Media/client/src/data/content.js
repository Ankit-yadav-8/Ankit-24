// 24K Media — single source of truth for all site content.
// Served by the Express API and mirrored to the client as an offline fallback.

export const company = {
  name: '24K Media',
  tagline: 'We Build Internet Brands.',
  heroHeadline: "We Build Internet Brands That People Can't Ignore.",
  heroSub:
    'Content, distribution, growth and media infrastructure for creators, founders and modern businesses.',
  positioning:
    '24K Media is the growth partner behind modern creators, founders and businesses — turning attention into authority, and authority into durable, monetisable internet brands.',
  email: 'hello@24kmedia.in',
  whatsapp: '+919000024000',
  calendly: 'https://calendly.com/24kmedia/growth-call',
  location: 'India · Working worldwide',
  supportingLines: [
    'From Attention to Authority.',
    'The Growth Partner Behind Modern Creators.',
    'Build Your Personal Monopoly.',
  ],
}

export const stats = [
  { id: 'views', label: 'Total Views Generated', value: 2.4, suffix: 'B+', decimals: 1, prefix: '' },
  { id: 'revenue', label: 'Revenue Influenced', value: 180, suffix: 'Cr+', decimals: 0, prefix: '₹' },
  { id: 'videos', label: 'Videos Produced', value: 12400, suffix: '+', decimals: 0, prefix: '' },
  { id: 'clients', label: 'Creators & Brands Served', value: 260, suffix: '+', decimals: 0, prefix: '' },
]

export const clients = [
  'NovaCast', 'Hindwave', 'Foundr Labs', 'Quill & Co', 'Saffron D2C', 'BharatBuild',
  'LedgerIQ', 'CreatorOS', 'ApexFit', 'Studio Mango', 'TenetAI', 'NorthStar VC',
]

export const whyPillars = [
  {
    id: 'strategy-first',
    title: 'Strategy Before Execution',
    description:
      'Every channel starts with positioning, audience and a 90-day thesis — never a camera turned on by accident.',
  },
  {
    id: 'dedicated-team',
    title: 'Dedicated Growth Team',
    description:
      'A strategist, editor, designer and distribution lead assigned to your brand. Not a freelancer queue.',
  },
  {
    id: 'data-driven',
    title: 'Data-Driven Decisions',
    description:
      'Retention curves, CTR and revenue per asset decide what we make next — not opinion.',
  },
  {
    id: 'full-ecosystem',
    title: 'Full Content Ecosystem',
    description:
      'Long-form, shorts, podcast, newsletter and site working as one compounding system.',
  },
  {
    id: 'fast-turnaround',
    title: 'Fast Turnaround',
    description:
      '48-hour edit cycles and weekly publishing cadence, held to a calendar you can trust.',
  },
  {
    id: 'founder-led',
    title: 'Founder-Led Execution',
    description:
      'Built by an operator who has shipped products and grown audiences from zero.',
  },
]

export const process = [
  { step: '01', title: 'Discovery', description: 'We map your goals, audience, niche and the unfair advantage only you have.' },
  { step: '02', title: 'Strategy', description: 'A documented content thesis: formats, hooks, cadence and the metrics that matter.' },
  { step: '03', title: 'Production', description: 'Retention-first editing, click-worthy packaging and on-brand design — at scale.' },
  { step: '04', title: 'Distribution', description: 'Multi-platform publishing engineered for the algorithm and the human at once.' },
  { step: '05', title: 'Growth', description: 'We compound reach into subscribers, leads and revenue with weekly iteration.' },
  { step: '06', title: 'Optimization', description: 'Every asset feeds the next. We double down on winners and cut what stalls.' },
]

export const services = [
  {
    slug: 'youtube-growth', number: '01', category: 'Content', icon: '▶',
    title: 'YouTube Growth',
    tagline: 'End-to-end channel strategy, packaging & scaling.',
    summary: 'We turn a YouTube channel into a predictable growth engine — from thesis to thumbnail to retention.',
    outcomes: [
      { value: '11x', label: 'Avg. views in 6 months' },
      { value: '+340%', label: 'Watch-time lift' },
      { value: '48h', label: 'Edit turnaround' },
    ],
    problem: 'Talented creators plateau because publishing is random, packaging is weak and retention is never measured.',
    approach: 'We install a documented format system, A/B-test packaging, and edit every video around the retention curve.',
    deliverables: ['Channel strategy & format system', 'Scripting & hook frameworks', 'Retention-first editing', 'Thumbnail & title A/B testing', 'Analytics review & iteration'],
    proof: 'A finance creator went from 18K to 410K subscribers in 9 months on this exact system.',
  },
  {
    slug: 'personal-branding', number: '02', category: 'Brand', icon: '◆',
    title: 'Personal Branding',
    tagline: 'Positioning & narrative for individuals.',
    summary: 'We engineer the story, look and language that make you the obvious authority in your space.',
    outcomes: [
      { value: '#1', label: 'Share of voice in niche' },
      { value: '3.2x', label: 'Inbound opportunities' },
      { value: '90d', label: 'To a defined brand' },
    ],
    problem: 'Founders are respected offline but invisible online — no narrative, no consistency, no compounding.',
    approach: 'We define a sharp positioning, a content pillar system and a visual identity, then run it weekly.',
    deliverables: ['Positioning & messaging', 'Visual identity direction', 'Content pillar system', 'Profile & bio optimisation', 'Signature story development'],
    proof: 'A B2B founder became a category voice and closed 7-figure deals attributed directly to content.',
  },
  {
    slug: 'podcast-production', number: '03', category: 'Content', icon: '◎',
    title: 'Podcast Production',
    tagline: 'Record, edit, clip & distribute.',
    summary: 'A full-stack podcast operation — from booking and recording to clips that travel across every feed.',
    outcomes: [
      { value: '20+', label: 'Clips per episode' },
      { value: '5x', label: 'Reach vs. audio-only' },
      { value: '0', label: 'Ops on your plate' },
    ],
    problem: 'Podcasts die in the gap between recording and distribution — great conversations nobody ever sees.',
    approach: 'We run the studio: production calendar, multicam edit, short-form clips and a distribution engine.',
    deliverables: ['Show strategy & format', 'Remote/in-studio recording', 'Multicam long-form edit', 'Short-form clip engine', 'Cross-platform distribution'],
    proof: 'A founder podcast hit the top 50 business charts in India within 12 weeks of launch.',
  },
  {
    slug: 'video-editing', number: '04', category: 'Content', icon: '✦',
    title: 'Video Editing',
    tagline: 'Retention-first long & short-form edits.',
    summary: 'Editing built around the watch-time graph — pacing, motion and sound that hold attention.',
    outcomes: [
      { value: '+62%', label: 'Avg. view duration' },
      { value: '48h', label: 'Standard turnaround' },
      { value: '4K', label: 'Delivery standard' },
    ],
    problem: 'Most edits are decorated, not engineered. Viewers leave before the value lands.',
    approach: 'We cut to the retention curve: ruthless openings, pattern interrupts, motion graphics and clean sound design.',
    deliverables: ['Long-form retention edits', 'Short-form / Reels / Shorts', 'Motion graphics & captions', 'Sound design & mix', 'Brand template kit'],
    proof: 'Re-editing a back-catalogue lifted average view duration 62% with zero new footage.',
  },
  {
    slug: 'thumbnail-design', number: '05', category: 'Brand', icon: '❖',
    title: 'Thumbnail Design',
    tagline: 'Click-worthy, on-brand thumbnails.',
    summary: 'The 5% of pixels that decide 50% of performance — designed and tested obsessively.',
    outcomes: [
      { value: '+47%', label: 'Click-through rate' },
      { value: 'A/B', label: 'Tested every upload' },
      { value: '<24h', label: 'Concept to final' },
    ],
    problem: 'Brilliant videos stay unwatched because the thumbnail loses the click.',
    approach: 'We design 2-3 concepts per video, test them, and build a recognisable visual language for the channel.',
    deliverables: ['2–3 concepts per video', 'A/B testing & iteration', 'Visual identity system', 'Title pairing', 'Performance reporting'],
    proof: 'A redesign program lifted channel-wide CTR from 4.1% to 6.0% in a single quarter.',
  },
  {
    slug: 'content-strategy', number: '06', category: 'Strategy', icon: '◈',
    title: 'Content Strategy',
    tagline: 'Formats, calendars & topic systems.',
    summary: 'The operating system behind everything you publish — so growth stops being luck.',
    outcomes: [
      { value: '12mo', label: 'Roadmap delivered' },
      { value: '100%', label: 'On-calendar publishing' },
      { value: '3', label: 'Compounding pillars' },
    ],
    problem: 'Without a system, content becomes a treadmill — busy, expensive and impossible to measure.',
    approach: 'We design pillars, a topic engine, a publishing calendar and a measurement framework you actually keep.',
    deliverables: ['Audience & niche research', 'Content pillars & formats', 'Topic & keyword engine', '12-month calendar', 'Measurement framework'],
    proof: 'A SaaS brand 4x’d qualified demo requests by aligning content to buyer intent.',
  },
  {
    slug: 'social-media-management', number: '07', category: 'Distribution', icon: '◐',
    title: 'Social Media Management',
    tagline: 'Cross-platform publishing & community.',
    summary: 'One team running every feed in your brand voice — published, engaged and reported.',
    outcomes: [
      { value: '6', label: 'Platforms managed' },
      { value: 'Daily', label: 'Publishing cadence' },
      { value: '+210%', label: 'Engaged community' },
    ],
    problem: 'Brands spread themselves thin across platforms and sound different on every one.',
    approach: 'We adapt one content engine to each platform’s native format and manage community daily.',
    deliverables: ['Channel strategy per platform', 'Daily publishing & scheduling', 'Community management', 'Trend & format watch', 'Monthly analytics review'],
    proof: 'A D2C brand grew an engaged community 210% and cut paid dependency in two quarters.',
  },
  {
    slug: 'founder-branding', number: '08', category: 'Brand', icon: '♦',
    title: 'Founder Branding',
    tagline: 'Operator-to-authority storytelling.',
    summary: 'We make the founder the most valuable distribution channel the company owns.',
    outcomes: [
      { value: '5x', label: 'Inbound pipeline' },
      { value: 'Top 1%', label: 'Voice in category' },
      { value: '90d', label: 'To consistent output' },
    ],
    problem: 'The founder is the brand’s biggest asset and its most under-used one.',
    approach: 'We extract the founder’s POV, package it into formats, and ship it on a schedule that protects their time.',
    deliverables: ['POV & narrative extraction', 'Format & cadence design', 'Ghost-production pipeline', 'LinkedIn + YouTube system', 'Inbound tracking'],
    proof: 'A fintech founder generated a multi-crore pipeline directly attributed to founder content.',
  },
  {
    slug: 'linkedin-growth', number: '09', category: 'Distribution', icon: '▣',
    title: 'LinkedIn Growth',
    tagline: 'B2B audience & inbound engine.',
    summary: 'Turn LinkedIn into a predictable source of authority, audience and qualified inbound.',
    outcomes: [
      { value: '+8K', label: 'Followers / quarter' },
      { value: '3.2x', label: 'Inbound leads' },
      { value: '15%', label: 'Avg. post engagement' },
    ],
    problem: 'B2B teams post into the void — no hook system, no rhythm, no pipeline tie-back.',
    approach: 'We build a hook library, a weekly cadence and a profile that converts attention into conversations.',
    deliverables: ['Profile & funnel optimisation', 'Hook & post frameworks', 'Weekly content production', 'Engagement strategy', 'Lead tracking'],
    proof: 'A consultant booked 40+ qualified calls in 90 days from a standing-start profile.',
  },
  {
    slug: 'performance-marketing', number: '10', category: 'Strategy', icon: '◍',
    title: 'Performance Marketing',
    tagline: 'Paid acquisition & funnels.',
    summary: 'Paid media that amplifies what already works organically — measured to revenue, not vanity.',
    outcomes: [
      { value: '4.6x', label: 'Blended ROAS' },
      { value: '-38%', label: 'Cost per acquisition' },
      { value: 'Weekly', label: 'Creative testing' },
    ],
    problem: 'Most ad budgets boost the wrong creative and report on clicks no one can bank.',
    approach: 'We pair winning organic creative with tight funnels and test relentlessly against revenue.',
    deliverables: ['Funnel & offer architecture', 'Creative production for paid', 'Campaign management', 'Conversion tracking', 'Weekly optimisation'],
    proof: 'A course business scaled to 4.6x ROAS by feeding paid with proven organic hooks.',
  },
  {
    slug: 'website-development', number: '11', category: 'Strategy', icon: '◇',
    title: 'Website Development',
    tagline: 'Premium sites & media infrastructure.',
    summary: 'Fast, beautiful, conversion-built sites that look like the brand you’re becoming.',
    outcomes: [
      { value: '95+', label: 'Lighthouse score' },
      { value: '<1.5s', label: 'Load time' },
      { value: '2.3x', label: 'Conversion lift' },
    ],
    problem: 'A weak website quietly undoes every great piece of content that points to it.',
    approach: 'We design and build premium, performance-budgeted sites with motion and a clear conversion path.',
    deliverables: ['Design system & UI', 'Front-end build (React)', 'CMS & content modelling', 'SEO & performance pass', 'Analytics & integrations'],
    proof: 'A rebuild took a creator’s funnel from 1.1% to 2.5% conversion on the same traffic.',
  },
  {
    slug: 'ai-content-systems', number: '12', category: 'Strategy', icon: '⬡',
    title: 'AI Content Systems',
    tagline: 'Automated pipelines & AI tooling.',
    summary: 'Custom AI workflows that multiply your team’s output without losing the brand voice.',
    outcomes: [
      { value: '3x', label: 'Output per editor' },
      { value: '-50%', label: 'Production time' },
      { value: '24/7', label: 'Repurposing engine' },
    ],
    problem: 'AI is everywhere and useful nowhere — generic output that sounds like everyone.',
    approach: 'We build brand-trained pipelines for ideation, repurposing and QA that a human always finishes.',
    deliverables: ['Brand-voice prompt systems', 'Repurposing automations', 'Ideation & research tooling', 'QA & guardrails', 'Team training'],
    proof: 'An automation pipeline tripled short-form output while keeping a single, consistent voice.',
  },
]

export const caseStudies = [
  {
    slug: 'finance-creator-scale',
    client: 'A Finance Education Creator',
    category: 'Creator',
    headline: 'From 18K to 410K subscribers in 9 months.',
    summary: 'A retention-first format system and obsessive packaging turned a stalled channel into a category leader.',
    services: ['YouTube Growth', 'Thumbnail Design', 'Video Editing'],
    metrics: [
      { label: 'Subscribers', before: '18K', after: '410K', delta: '+2,177%' },
      { label: 'Monthly Views', before: '120K', after: '9.4M', delta: '+7,733%' },
      { label: 'Avg. View Duration', before: '2:10', after: '4:35', delta: '+112%' },
      { label: 'Sponsorship Revenue', before: '₹0', after: '₹14L / mo', delta: 'New line' },
    ],
    testimonial: { quote: 'They treated my channel like a product. The growth wasn’t luck — it was a system.', name: 'Creator', role: 'Finance Educator' },
  },
  {
    slug: 'b2b-founder-authority',
    client: 'A B2B SaaS Founder',
    category: 'SaaS',
    headline: 'A founder voice that generated a multi-crore pipeline.',
    summary: 'Founder branding on LinkedIn and YouTube turned expertise into inbound that sales could close.',
    services: ['Founder Branding', 'LinkedIn Growth', 'Content Strategy'],
    metrics: [
      { label: 'LinkedIn Followers', before: '1.2K', after: '46K', delta: '+3,733%' },
      { label: 'Inbound Demos', before: '4 / mo', after: '38 / mo', delta: '+850%' },
      { label: 'Pipeline Influenced', before: '₹0', after: '₹6.2Cr', delta: 'New line' },
      { label: 'Avg. Post Engagement', before: '0.6%', after: '14.8%', delta: '+2,366%' },
    ],
    testimonial: { quote: 'Our cheapest, highest-intent pipeline now comes from content. That’s a category shift.', name: 'Founder', role: 'B2B SaaS' },
  },
  {
    slug: 'd2c-brand-community',
    client: 'A D2C Wellness Brand',
    category: 'D2C',
    headline: 'Cut paid dependency by building an owned audience.',
    summary: 'A cross-platform content engine grew an engaged community and lowered blended acquisition cost.',
    services: ['Social Media Management', 'Performance Marketing', 'Content Strategy'],
    metrics: [
      { label: 'Engaged Community', before: '22K', after: '210K', delta: '+855%' },
      { label: 'Blended CAC', before: '₹640', after: '₹396', delta: '-38%' },
      { label: 'Organic Revenue Share', before: '11%', after: '43%', delta: '+290%' },
      { label: 'Blended ROAS', before: '1.9x', after: '4.6x', delta: '+142%' },
    ],
    testimonial: { quote: 'We finally own our audience instead of renting it from the ad auction.', name: 'Marketing Lead', role: 'D2C Wellness' },
  },
  {
    slug: 'education-personal-monopoly',
    client: 'An Education Founder',
    category: 'Education',
    headline: 'Built a personal monopoly in a crowded niche.',
    summary: 'Sharp positioning plus a podcast and short-form engine made one founder the default name in the category.',
    services: ['Personal Branding', 'Podcast Production', 'Video Editing'],
    metrics: [
      { label: 'Audience (all platforms)', before: '60K', after: '1.3M', delta: '+2,066%' },
      { label: 'Course Revenue', before: '₹40L / yr', after: '₹3.1Cr / yr', delta: '+675%' },
      { label: 'Podcast Downloads', before: '0', after: '85K / mo', delta: 'New line' },
      { label: 'Email List', before: '8K', after: '92K', delta: '+1,050%' },
    ],
    testimonial: { quote: 'When people think of my category now, they think of me first. That’s the whole game.', name: 'Founder', role: 'Education' },
  },
]

export const portfolio = [
  { id: 'p1', title: 'Finance Channel Relaunch', client: 'NovaCast', category: 'Creator', type: 'Video', metric: '9.4M monthly views' },
  { id: 'p2', title: 'Founder Thumbnail System', client: 'LedgerIQ', category: 'SaaS', type: 'Thumbnail', metric: '+47% CTR' },
  { id: 'p3', title: 'D2C Brand Site', client: 'Saffron D2C', category: 'D2C', type: 'Website', metric: '2.5% conversion' },
  { id: 'p4', title: 'Podcast Launch Campaign', client: 'Foundr Labs', category: 'Startup', type: 'Campaign', metric: 'Top 50 chart' },
  { id: 'p5', title: 'Shorts Engine', client: 'ApexFit', category: 'Personal Brand', type: 'Video', metric: '60M plays' },
  { id: 'p6', title: 'LinkedIn Authority Build', client: 'TenetAI', category: 'SaaS', type: 'Campaign', metric: '+850% inbound' },
  { id: 'p7', title: 'Course Brand Identity', client: 'Quill & Co', category: 'Education', type: 'Website', metric: '₹3.1Cr / yr' },
  { id: 'p8', title: 'Creator Membership Site', client: 'CreatorOS', category: 'Creator', type: 'Website', metric: '12K members' },
  { id: 'p9', title: 'Performance Creative Set', client: 'BharatBuild', category: 'D2C', type: 'Campaign', metric: '4.6x ROAS' },
  { id: 'p10', title: 'Founder Documentary', client: 'NorthStar VC', category: 'Startup', type: 'Video', metric: '1.2M views' },
  { id: 'p11', title: 'Education Thumbnail Suite', client: 'Studio Mango', category: 'Education', type: 'Thumbnail', metric: '+52% CTR' },
  { id: 'p12', title: 'Personal Brand Refresh', client: 'Hindwave', category: 'Personal Brand', type: 'Website', metric: '3.2x inbound' },
]

export const portfolioFilters = ['All', 'Creator', 'Startup', 'Education', 'D2C', 'SaaS', 'Personal Brand']

export const testimonials = [
  { id: 't1', quote: 'They treated my channel like a product. The growth wasn’t luck — it was a system we could repeat every single week.', name: 'Aarav Mehta', role: 'Finance Educator', company: 'NovaCast', rating: 5 },
  { id: 't2', quote: 'Our cheapest, highest-intent pipeline now comes from content. 24K turned our founder into a real distribution channel.', name: 'Priya Nair', role: 'Co-Founder', company: 'LedgerIQ', rating: 5 },
  { id: 't3', quote: 'We finally own our audience instead of renting it from the ad auction. CAC down, community up — every quarter.', name: 'Rohan Shah', role: 'Head of Growth', company: 'Saffron D2C', rating: 5 },
  { id: 't4', quote: 'The craft is on another level. Every thumbnail, every edit, every transition feels intentional. It reads premium.', name: 'Sneha Kulkarni', role: 'Creator', company: 'ApexFit', rating: 5 },
  { id: 't5', quote: 'When people think of my category now, they think of me first. That is the entire game and they delivered it.', name: 'Vikram Rao', role: 'Founder', company: 'Quill & Co', rating: 5 },
  { id: 't6', quote: 'Working with them feels like having a media company on retainer, not an agency. Fast, sharp, accountable.', name: 'Ananya Gupta', role: 'CEO', company: 'TenetAI', rating: 5 },
]

export const founder = {
  name: 'The Founder',
  role: 'Founder & Operator, 24K Media',
  bio:
    'An operator who has shipped products, grown audiences from zero and obsessed over the craft of attention. 24K Media is the studio that turns that playbook into infrastructure for the next generation of Indian creators and founders.',
  mission: 'Help 10,000 Indian creators build sustainable businesses on the back of their own audience.',
  timeline: [
    { year: '2016', title: 'IIT Roorkee', description: 'Engineering foundations, first products and the obsession with how things are built.' },
    { year: '2018', title: 'Startups', description: 'Early operator roles — learning growth, distribution and the reality of shipping under pressure.' },
    { year: '2020', title: 'Product', description: 'Built and scaled products, owning the full loop from positioning to retention.' },
    { year: '2022', title: 'Growth', description: 'Grew audiences from zero and reverse-engineered what actually compounds online.' },
    { year: '2026', title: '24K Media', description: 'Turned the playbook into a studio — media infrastructure for creators and founders.' },
  ],
}

// The company origin story — 24K Media was founded in May 2026.
export const story = {
  founded: 'May 2026',
  intro:
    'Every internet brand begins with one decision: to stop being invisible. 24K Media was born from that decision — in May 2026 — to give India’s creators and founders the kind of media infrastructure usually reserved for billion-dollar companies.',
  highlight: 'Founded in May 2026 — and building like it’s day one, every single day.',
  milestones: [
    {
      date: 'May 2026',
      title: 'The Spark',
      description:
        'Founded on one conviction — attention, engineered properly, compounds into a durable, ownable asset.',
    },
    {
      date: 'May 2026',
      title: 'The Studio Takes Shape',
      description:
        'A core team of strategists, editors, designers and distribution leads came together around the craft of attention.',
    },
    {
      date: 'June 2026',
      title: 'First Internet Brands',
      description:
        'Onboarded our first creators and founders — proving the retention-first system from the very first upload.',
      current: true,
    },
    {
      date: 'Q3 2026',
      title: 'Scaling the System',
      description:
        'Turning the playbook into repeatable media infrastructure — formats, pipelines and dashboards built to scale.',
    },
    {
      date: '2027 & Beyond',
      title: 'The Vision',
      description:
        'Help 10,000 Indian creators build sustainable businesses on the back of an audience they truly own.',
    },
  ],
}

export const resources = [
  {
    slug: 'retention-is-the-only-metric',
    title: 'Retention Is the Only Metric That Compounds',
    category: 'Playbook',
    excerpt: 'Why average view duration — not subscribers — is the number that decides whether a channel grows.',
    readTime: '6 min read',
    date: '2026-05-28',
    body: [
      'Subscribers are a lagging vanity metric. Retention is the leading one. The platform watches how long people stay, and it rewards the videos that hold attention with more reach — which creates more subscribers, not the other way around.',
      'The first 30 seconds carry disproportionate weight. If you lose a third of viewers in the opening, no amount of value later can recover the algorithmic penalty. Engineer the open like a product launch: promise, proof, and a reason to stay.',
      'Edit to the retention graph, not to taste. Every dip is feedback. Cut the dead air, add a pattern interrupt, and re-test. Channels that institutionalise this loop compound; channels that decorate stall.',
    ],
  },
  {
    slug: 'personal-monopoly-playbook',
    title: 'The Personal Monopoly Playbook',
    category: 'Strategy',
    excerpt: 'How founders become the default name in their category by owning a specific intersection of ideas.',
    readTime: '8 min read',
    date: '2026-05-14',
    body: [
      'A personal monopoly is the unique intersection of skills, story and point of view that only you can occupy. You do not win by being better at a crowded thing — you win by being the only one at a specific thing.',
      'Find the overlap of what you uniquely know, what your audience urgently needs, and what you can produce consistently. That overlap becomes your content pillars, and your pillars become your moat.',
      'Consistency is the compounding engine. Showing up weekly in the same lane for twelve months does more for authority than any single viral moment. The goal is to become the obvious answer to a question your market is already asking.',
    ],
  },
  {
    slug: 'thumbnails-decide-the-click',
    title: 'Thumbnails Decide the Click. Titles Decide the Watch.',
    category: 'Playbook',
    excerpt: 'A practical system for packaging that lifts CTR without resorting to clickbait.',
    readTime: '5 min read',
    date: '2026-04-30',
    body: [
      'Packaging is the highest-leverage 5% of any video. A two-point CTR improvement can double a channel’s reach with zero change to the content itself.',
      'Design for the smallest size first. If the thumbnail does not read on a phone in feed, it does not work. One subject, one emotion, high contrast, and a visual gap the title resolves.',
      'Test everything. Two or three concepts per upload, measured honestly. Over a quarter you build a visual language your audience recognises before they read a word.',
    ],
  },
  {
    slug: 'content-to-revenue',
    title: 'From Content to Revenue: Closing the Loop',
    category: 'Report',
    excerpt: 'The frameworks we use to tie content output to pipeline, so growth is bankable — not vanity.',
    readTime: '7 min read',
    date: '2026-04-12',
    body: [
      'Attention only matters if it converts. The brands that win treat content as the top of a measurable funnel, not as a separate brand exercise that no one can connect to revenue.',
      'Map every asset to an intent. Awareness content earns reach; consideration content earns trust; conversion content earns the click to a call or checkout. The mix, not any single video, is the system.',
      'Instrument the path. UTM discipline, a clear next step on every surface, and a feedback loop from sales back to content. When the loop is closed, you stop guessing and start scaling what already works.',
    ],
  },
]
