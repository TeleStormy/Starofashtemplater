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
