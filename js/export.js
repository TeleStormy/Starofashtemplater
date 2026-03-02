// ------------------------
// SINGLE CARD EXPORT (unchanged)
// ------------------------
document.getElementById("exportCard").addEventListener("click", () => {
  if (!cards.length) return;
  exportCard(cards[0]);
});

function exportCard(card) {
  const canvas = document.createElement("canvas");
  canvas.width = 825;
  canvas.height = 1125;

  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, 1125);
  gradient.addColorStop(0, "#111");
  gradient.addColorStop(1, "#1a1a1a");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 825, 1125);

  Object.keys(template).forEach(fieldId => {
    const field = template[fieldId];

    let value = "";
    if (fieldId === "name") value = card.Name;
    if (fieldId === "cost") value = card.Cost;
    if (fieldId === "atk") value = "⚔ " + card.ATK;
    if (fieldId === "hp") value = "❤ " + card.HP;
    if (fieldId === "spd") value = "➤ " + card.Speed;
    if (fieldId === "abilities") value = card.Abilities;

    ctx.font = `${field.fontSize}px Cinzel`;
    ctx.fillStyle = "#e6e0d4";
    ctx.textAlign = "center";

    ctx.fillText(value, field.x, field.y);
  });

  const link = document.createElement("a");
  link.download = card.Name + ".png";
  link.href = canvas.toDataURL();
  link.click();
}

// ------------------------
// 10x7 CARD SHEET EXPORT
// ------------------------
function exportCardSheet(cards) {
  const columns = 10;
  const rows = 7;
  const cardWidth = 825;
  const cardHeight = 1125;

  const canvas = document.createElement("canvas");
  canvas.width = cardWidth * columns;
  canvas.height = cardHeight * rows;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < Math.min(cards.length, columns * rows); i++) {
    const card = cards[i];
    const col = i % columns;
    const row = Math.floor(i / columns);

    drawCardOnSheet(ctx, card, col * cardWidth, row * cardHeight);
  }

  const link = document.createElement("a");
  link.download = "card_sheet.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ------------------------
// DRAW INDIVIDUAL CARD ON SHEET
// ------------------------
function drawCardOnSheet(ctx, card, offsetX, offsetY) {
  const cardWidth = 825;
  const cardHeight = 1125;

  // Card background
  const gradient = ctx.createLinearGradient(0, 0, 0, cardHeight);
  gradient.addColorStop(0, "#111");
  gradient.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(offsetX, offsetY, cardWidth, cardHeight);

  // Card border
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 4;
  ctx.strokeRect(offsetX, offsetY, cardWidth, cardHeight);

  // Faction circle behind cost
  const factionColors = { Flame: "orange", Blood: "red", Ash: "gray" };
  const costX = offsetX + 80;
  const costY = offsetY + 80;
  const radius = 25;

  if (card.Faction.includes("/")) {
    const colors = card.Faction.split("/").map(f => factionColors[f]);
    const grad = ctx.createLinearGradient(costX - radius, costY - radius, costX + radius, costY + radius);
    colors.forEach((c, idx) => grad.addColorStop(idx / (colors.length - 1), c));
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = factionColors[card.Faction] || "black";
  }
  ctx.beginPath();
  ctx.arc(costX, costY, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Cost number
  ctx.fillStyle = "white";
  ctx.font = "20px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(card.Cost, costX, costY);

  // Name
  ctx.fillStyle = "white";
  ctx.font = "48px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText(card.Name, offsetX + 412, offsetY + 80);

  // ATK / HP / SPD
  drawStatCircle(ctx, "⚔ " + card.ATK, offsetX + 80, offsetY + 250, "red");
  drawStatCircle(ctx, "❤ " + card.HP, offsetX + 80, offsetY + 320, "green");
  drawStatCircle(ctx, "➤ " + card.Speed, offsetX + 80, offsetY + 390, "blue");

  // Abilities
  ctx.fillStyle = "white";
  ctx.font = "24px Cinzel, serif";
  wrapText(ctx, card.Abilities, offsetX + 412, offsetY + 800, 700, 28);
}

// ------------------------
// SMALL STAT CIRCLE HELPER
// ------------------------
function drawStatCircle(ctx, text, x, y, color) {
  const radius = 20;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "16px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.replace(/[^0-9]/g, ""), x, y);
}

// ------------------------
// MULTI-LINE TEXT HELPER
// ------------------------
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
