import {
  LOVE_ENERGY_POSITIONS,
  SINGLE_CARD_POSITIONS,
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

export function createSingleCardDraw(question) {
  const cards = pickDistinctCards(1).map((card) => ({
    card_name: card.label,
  }));

  return {
    question,
    spread_name: "Single Card",
    position_meanings: [...SINGLE_CARD_POSITIONS],
    cards,
  };
}

export function generateSingleReading(question, draw) {
  const card = resolveSlotCards(draw)[0];
  if (!card) {
    return "The card couldn't be read right now. Try again when you're ready.";
  }

  const intro = `You asked: “${question}”\n\nOne card stepped forward. Here is its reading for you today.`;
  const body = `${draw.position_meanings[0]}\n${card.label}\n${card.loveMeaning}`;
  const closing =
    "Sit with this message for a moment. A single card rarely tells the whole story — but it can name what matters most right now.";

  return [intro, body, closing].join("\n\n");
}

export function simulateSingleDraw(question) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(createSingleCardDraw(question)), 450);
  });
}

export function simulateSingleInterpret(question, draw) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(generateSingleReading(question, draw)), 900);
  });
}
