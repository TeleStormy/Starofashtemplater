function exportCardSheet(cards) {
  const columns = 10;
  const rows = 7;
  const cardWidth = 825;
  const cardHeight = 1125;

  const canvas = document.createElement("canvas");
  canvas.width = cardWidth * columns;
  canvas.height = cardHeight * rows;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f0f0f"; // dark background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < Math.min(cards.length, columns * rows); i++) {
    const card = cards[i];
    const col = i % columns;
    const row = Math.floor(i / columns);

    // Draw individual card at offset
    drawCardOnSheet(ctx, card, col * cardWidth, row * cardHeight);
  }

  // Export as PNG
  const link = document.createElement("a");
  link.download = "card_sheet.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ------------------------
// Draw a single card on the sheet
// ------------------------
function drawCardOnSheet(ctx, card, offsetX, offsetY) {
  const cardWidth = 825;
  const cardHeight = 1125;

  // Card background
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(offsetX, offsetY, cardWidth, cardHeight);

  // Card border
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 4;
  ctx.strokeRect(offsetX, offsetY, cardWidth, cardHeight);

  // Faction glow
  let glow = "rgba(150,150,150,0.4)";
  if (card.Faction === "Blood") glow = "rgba(180,0,0,0.4)";
  if (card.Faction === "Flame") glow = "rgba(255,120,0,0.4)";
  if (card.Faction === "Ash") glow = "rgba(120,120,120,0.4)";
  ctx.shadowColor = glow;
  ctx.shadowBlur = 40;

  // Name
  ctx.shadowBlur = 0;
  ctx.fillStyle = "white";
  ctx.font = "48px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText(card.Name, offsetX + 412, offsetY + 80);

  // Cost circle
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
// Draw small stat circles
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
// Helper for multi-line text
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
