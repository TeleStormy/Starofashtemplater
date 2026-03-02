// ------------------------
// Card Renderer
// ------------------------
function renderCard(card) {
  const canvas = document.getElementById("cardCanvas");
  canvas.innerHTML = "";

  // Template positions for card fields
  template = {
    name: { x: 412, y: 80, fontSize: 48 },
    cost: { x: 80, y: 80, fontSize: 36 },
    atk: { x: 80, y: 250, fontSize: 32 },
    hp: { x: 80, y: 320, fontSize: 32 },
    spd: { x: 80, y: 390, fontSize: 32 },
    abilities: { x: 412, y: 800, fontSize: 24 }
  };

  // Add card fields
  addField("name", card.Name);
  addCostField(card);        // Cost as colored circle
  addStatField("atk", "⚔ " + card.ATK, "atk");
  addStatField("hp", "❤ " + card.HP, "hp");
  addStatField("spd", "➤ " + card.Speed, "spd");
  addField("abilities", card.Abilities);

  applyFactionStyle(card.Faction);
}

// ------------------------
// Generic text field (name, abilities, etc.)
// ------------------------
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

// ------------------------
// Cost circle rendering
// ------------------------
function addCostField(card) {
  const field = template["cost"];

  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.left = field.x + "px";
  wrapper.style.top = field.y + "px";
  wrapper.style.width = "50px";
  wrapper.style.height = "50px";

  // Circle behind number
  const circle = document.createElement("div");
  circle.className = "cost-circle";

  const factionColors = { Flame: "orange", Blood: "red", Ash: "gray" };
  if (card.Faction.includes("/")) {
    const colors = card.Faction.split("/").map(f => factionColors[f]);
    circle.style.background = `linear-gradient(45deg, ${colors.join(",")})`;
  } else {
    circle.style.background = factionColors[card.Faction] || "black";
  }

  // Number on top
  const number = document.createElement("div");
  number.style.position = "absolute";
  number.style.width = "100%";
  number.style.height = "100%";
  number.style.display = "flex";
  number.style.justifyContent = "center";
  number.style.alignItems = "center";
  number.style.fontFamily = 'Cinzel, serif';
  number.style.fontWeight = "bold";
  number.style.color = "white";
  number.style.fontSize = "20px";
  number.innerText = card.Cost;

  wrapper.appendChild(circle);
  wrapper.appendChild(number);

  document.getElementById("cardCanvas").appendChild(wrapper);
}

// ------------------------
// ATK / HP / Speed optional circles
// ------------------------
function addStatField(id, text, statType) {
  const field = template[id];

  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.left = field.x + "px";
  wrapper.style.top = field.y + "px";
  wrapper.style.width = "40px";
  wrapper.style.height = "40px";

  const circle = document.createElement("div");
  circle.className = "stat-circle " + statType;

  const number = document.createElement("div");
  number.style.position = "absolute";
  number.style.width = "100%";
  number.style.height = "100%";
  number.style.display = "flex";
  number.style.justifyContent = "center";
  number.style.alignItems = "center";
  number.style.fontFamily = 'Cinzel, serif';
  number.style.fontWeight = "bold";
  number.style.color = "white";
  number.style.fontSize = "16px";
  number.innerText = text.replace(/[^0-9]/g, ""); // just number inside circle

  wrapper.appendChild(circle);
  wrapper.appendChild(number);

  document.getElementById("cardCanvas").appendChild(wrapper);
}

// ------------------------
// Faction glow around card
// ------------------------
function applyFactionStyle(faction) {
  const canvas = document.getElementById("cardCanvas");

  let glow = "rgba(150,150,150,0.4)";

  if (faction === "Blood") glow = "rgba(180,0,0,0.4)";
  if (faction === "Flame") glow = "rgba(255,120,0,0.4)";
  if (faction === "Ash") glow = "rgba(120,120,120,0.4)";

  canvas.style.boxShadow = `0 0 40px ${glow}`;
}
