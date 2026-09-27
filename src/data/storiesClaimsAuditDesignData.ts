import { IStoryClaimsAuditItem } from "@/types";

const MACBOOK_GIFT = {
  _id: "gift-macbook-air",
  title: 'MacBook Air 13" (M1 256GB Space Gray)',
  image:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=220&auto=format&fit=crop&q=85",
};

export const STORIES_CLAIMS_AUDIT_DESIGN_DATA: IStoryClaimsAuditItem[] = [
  {
    _id: "story-201",
    applicantName: "shihabulislam.ugv",
    applicantAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "South Congress, Austin, TX",
    submittedAt: "Just now",
    gift: MACBOOK_GIFT,
    headline: "SD",
    prompt: "How would this gift help your daily routine or education?",
    story: "Regarding: How would this gift help your daily routine or education?",
    aiUrgencyScore: 92,
    aiAssessment:
      "Verified local resident with meaningful community/personal impact potential.",
    peerVotes: 1,
    status: "SHORTLISTED",
  },
  {
    _id: "story-202",
    applicantName: "shihabulislam.ugv",
    applicantAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "South Congress, Austin, TX",
    submittedAt: "Just now",
    gift: MACBOOK_GIFT,
    headline: "df",
    prompt: "Who in your family or community will benefit?",
    story: "cfvd Regarding: Who in your family or community will benefit?",
    aiUrgencyScore: 98,
    aiAssessment:
      "Verified local resident with meaningful community/personal impact potential.",
    peerVotes: 0,
    status: "PENDING",
  },
  {
    _id: "story-203",
    applicantName: "Maya Rodriguez",
    applicantAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "East Austin, TX",
    submittedAt: "1 hour ago",
    gift: MACBOOK_GIFT,
    headline: "For first-generation college freshman studying Nursing & CS",
    prompt: "How would this gift help your daily routine or education?",
    story:
      "I am starting my freshman year at UT Austin as a first-generation college student. My family currently shares an 8-year-old desktop that crashes during virtual lectures.",
    aiUrgencyScore: 89,
    aiAssessment:
      "Strong education need with a clear, verifiable local impact.",
    peerVotes: 14,
    status: "SHORTLISTED",
  },
  {
    _id: "story-204",
    applicantName: "David Chen",
    applicantAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "Riverside, Austin, TX",
    submittedAt: "45 mins ago",
    gift: MACBOOK_GIFT,
    headline: "Building free digital skills workshops for local veterans",
    prompt: "Who in your family or community will benefit?",
    story:
      "I volunteer teaching resume building and digital literacy to unhoused veterans. Our second training station currently has no working computer.",
    aiUrgencyScore: 94,
    aiAssessment:
      "Community benefit is specific, plausible, and supported by local activity.",
    peerVotes: 9,
    status: "PENDING",
  },
  {
    _id: "story-205",
    applicantName: "Aisha Coleman",
    applicantAvatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "Mueller, Austin, TX",
    submittedAt: "2 hours ago",
    gift: MACBOOK_GIFT,
    headline: "Returning to school while raising two young children",
    prompt: "How would this gift help your daily routine or education?",
    story:
      "A dependable laptop would let me complete evening coursework after my children are asleep and apply for remote internships.",
    aiUrgencyScore: 91,
    aiAssessment:
      "High personal impact with a credible education and employment pathway.",
    peerVotes: 11,
    status: "PENDING",
  },
  {
    _id: "story-206",
    applicantName: "Noah Williams",
    applicantAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "Hyde Park, Austin, TX",
    submittedAt: "3 hours ago",
    gift: MACBOOK_GIFT,
    headline: "Launching a neighborhood mutual-aid resource directory",
    prompt: "Who in your family or community will benefit?",
    story:
      "Our volunteer group is cataloguing free food, transport, and school-supply resources for families across central Austin.",
    aiUrgencyScore: 86,
    aiAssessment:
      "Clear community purpose with moderate urgency and verifiable collaborators.",
    peerVotes: 7,
    status: "PENDING",
  },
  {
    _id: "story-207",
    applicantName: "Elena Brooks",
    applicantAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=85",
    isVerified: true,
    location: "Zilker, Austin, TX",
    submittedAt: "Yesterday",
    gift: MACBOOK_GIFT,
    headline: "Supporting accessible tutoring for neurodivergent students",
    prompt: "How would this gift help your daily routine or education?",
    story:
      "I create free visual study guides and host weekly tutoring sessions for students who need more accessible learning materials.",
    aiUrgencyScore: 88,
    aiAssessment:
      "Meaningful education impact with a consistent record of local service.",
    peerVotes: 12,
    status: "SHORTLISTED",
  },
];
