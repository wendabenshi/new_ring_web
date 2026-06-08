export const LOVE_ENERGY_POSITIONS = [
  "Your heart right now",
  "What's blocking love",
  "Where love is leading",
];

export function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function cardImageSlug(label) {
  return label
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function cardImageUrl(label) {
  return `https://woomoo.app/common/tarot_cards/${cardImageSlug(label)}.webp`;
}

/** @type {{ label: string, loveMeaning: string }[]} */
export const TAROT_CARDS = [
  { label: "The Fool", loveMeaning: "Something new is trying to begin. Love may ask you to step forward before you feel fully ready." },
  { label: "The Magician", loveMeaning: "You have more influence over this connection than you think. Clear intention can shift the energy." },
  { label: "The High Priestess", loveMeaning: "Trust what you already sense beneath the surface. Not everything needs to be spoken yet." },
  { label: "The Empress", loveMeaning: "Warmth, nurture, and openness are available. Let affection be expressed, not only imagined." },
  { label: "The Emperor", loveMeaning: "Structure and honesty matter now. Love grows where boundaries are clear and respect is mutual." },
  { label: "The Lovers", loveMeaning: "A meaningful choice is present. Your heart is being asked to align with what you truly value." },
  { label: "The Chariot", loveMeaning: "Momentum is building. If you want this to move forward, your direction needs to stay steady." },
  { label: "Strength", loveMeaning: "Gentle persistence beats force. Soft courage will take this further than pressure or fear." },
  { label: "The Hermit", loveMeaning: "A pause for reflection may protect you. Solitude now can clarify what your heart actually wants." },
  { label: "Wheel of Fortune", loveMeaning: "The situation is turning. What felt stuck may shift sooner than expected — stay open to timing." },
  { label: "Justice", loveMeaning: "Balance and truth are central. What is fair — and what is honest — will guide the next step." },
  { label: "The Hanged Man", loveMeaning: "Waiting is part of the story. A different perspective may reveal what action cannot yet." },
  { label: "Death", loveMeaning: "An old pattern is ending to make room for something truer. Release what love has outgrown." },
  { label: "Temperance", loveMeaning: "Patience and moderation will serve you. The right connection rarely needs to be forced." },
  { label: "The Devil", loveMeaning: "Watch for attachment, obsession, or old loops. Name what keeps pulling you back." },
  { label: "The Tower", loveMeaning: "A shake-up may clear illusions. Uncomfortable truth can still protect your heart long-term." },
  { label: "The Star", loveMeaning: "Hope is not naive here. Healing and renewal are quietly becoming possible again." },
  { label: "The Moon", loveMeaning: "Mixed signals or uncertainty may cloud things. Move slowly until feelings become clearer." },
  { label: "The Sun", loveMeaning: "Joy, clarity, and warmth want in. This energy favors honesty, playfulness, and open-heartedness." },
  { label: "Judgement", loveMeaning: "A wake-up call around love is arriving. Answer it with compassion, not self-judgment." },
  { label: "The World", loveMeaning: "Completion and fulfillment are within reach. A cycle may be ready to mature into something whole." },
  { label: "Two of Cups", loveMeaning: "Mutual attraction and emotional reciprocity are highlighted. Connection wants to be balanced." },
  { label: "Three of Cups", loveMeaning: "Support, celebration, or friendship may shape the path. Joy grows in shared emotional space." },
  { label: "Ace of Cups", loveMeaning: "A fresh emotional opening is possible. Be receptive without abandoning self-respect." },
  { label: "Ten of Cups", loveMeaning: "Long-term emotional harmony is the deeper theme. Ask whether this aligns with the life you want." },
  { label: "Two of Swords", loveMeaning: "Avoidance may be keeping you in limbo. A decision postponed is still a decision." },
  { label: "Three of Swords", loveMeaning: "Pain or disappointment needs acknowledgment before healing can begin." },
  { label: "Queen of Cups", loveMeaning: "Emotional depth and intuition are your strength. Lead with empathy, not self-erasure." },
  { label: "Knight of Cups", loveMeaning: "Romantic energy is in motion — through message, invitation, or sincere emotional gesture." },
];

export function getCardByLabel(label) {
  return TAROT_CARDS.find((card) => card.label === label) ?? null;
}

export function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function pickDistinctCards(count = 3) {
  return shuffle(TAROT_CARDS).slice(0, count);
}
