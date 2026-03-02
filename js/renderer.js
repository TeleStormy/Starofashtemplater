function renderCard(card) {
  const canvas = document.getElementById("cardCanvas");
  canvas.innerHTML = "";

  template = {
    name: { x: 412, y: 80, fontSize: 48 },
    cost: { x: 80, y: 80, fontSize: 36 },
    atk: { x: 80, y: 250, fontSize: 32 },
    hp: { x: 80, y: 320, fontSize: 32 },
    spd: { x: 80, y: 390, fontSize: 32 },
    abilities: { x: 412, y: 800, fontSize: 24 }
  };

  addField("name", card.Name);
  addCostField(card); // UPDATED: use custom cost rendering
  addField("atk", "⚔ " + card.ATK);
  addField("hp", "❤ " + card.HP);
  addField("spd", "➤ " + card.Speed);
  addField("abilities", card.Abilities);

  applyFactionStyle(card.Faction);
}

function addField(id, text) {
  const field = template[id];

  const div = document.createElement("div");
  div.className = "card-field";
  div.dataset.id = id;

  div.style.left = field.x + "px";
  div.style.top = field.y + "px";
  div.style.fontSize = field.fontSize + "px";
  div.style.textAlign = "center";

  div.innerText = text;

  div.addEventListener("click", () => openFieldEditor(id));

  makeDraggable(div, id);

  document.getElementById("cardCanvas").appendChild(div);
}

// ---------------------------
// NEW FUNCTION: renders cost as circle with faction color
// ---------------------------
function addCostField(card) {
  const field = template["cost"];
  const div = document.createElement("div");
  div.className = "cost-circle";

  // Set faction color or gradient for multi-faction
  const factionColors = { Flame: "orange", Blood: "red", Ash: "gray" };

  if (card.Faction.includes("/")) {
    const colors = card.Faction.split("/").map(f => factionColors[f]);
    div.style.background = `linear-gradient(45deg, ${colors.join(",")})`;
  } else {
    div.style.background = factionColors[card.Faction] || "black";
  }

  // Position and font
  div.style.left = field.x + "px";
  div.style.top = field.y + "px";
  div.style.fontSize = field.fontSize + "px";
  div.style.position = "absolute";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";

  div.innerText = card.Cost;

  document.getElementById("cardCanvas").appendChild(div);
}

function applyFactionStyle(faction) {
  const canvas = document.getElementById("cardCanvas");

  let glow = "rgba(150,150,150,0.4)";

  if (faction === "Blood") glow = "rgba(180,0,0,0.4)";
  if (faction === "Flame") glow = "rgba(255,120,0,0.4)";
  if (faction === "Ash") glow = "rgba(120,120,120,0.4)";

  canvas.style.boxShadow = `0 0 40px ${glow}`;
}
