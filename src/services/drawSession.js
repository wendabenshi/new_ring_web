import {
  LOVE_ENERGY_POSITIONS,
  pickDistinctCards,
  getCardByLabel,
} from "../data/tarotCards.js";

export function createLoveEnergyDraw(question) {
  const cards = pickDistinctCards(3).map((card) => ({
    card_name: card.label,
  }));

  return {
    question,
    spread_name: "Love Energy",
    position_meanings: [...LOVE_ENERGY_POSITIONS],
    cards,
  };
}

export function resolveSlotCards(draw) {
  return draw.cards.map((entry) => getCardByLabel(entry.card_name)).filter(Boolean);
}

export function generateReading(question, draw) {
  const slots = resolveSlotCards(draw);
  const intro = `You asked: “${question}”\n\nThe cards don't rush an answer — they sit with the question alongside you. Here is what they suggest for your love energy right now.`;

  const sections = draw.position_meanings.map((position, index) => {
    const card = slots[index];
    if (!card) return "";
    return `${position}\n${card.label}\n${card.loveMeaning}`;
  });

  const closing =
    "Take what resonates and leave the rest. Love rarely moves in a straight line — but your clarity can deepen with every honest question you ask.";

  return [intro, ...sections, closing].filter(Boolean).join("\n\n");
}

/** Simulates network latency for draw + interpret. */
export function simulateDraw(question) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(createLoveEnergyDraw(question)), 450);
  });
}

export function simulateInterpret(question, draw) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(generateReading(question, draw)), 900);
  });
}
