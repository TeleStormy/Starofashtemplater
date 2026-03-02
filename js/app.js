let snapEnabled = true;
const GRID_SIZE = 10;

// ------------------------
// SNAP TO GRID TOGGLE
// ------------------------
document.getElementById("toggleSnap").addEventListener("click", () => {
  snapEnabled = !snapEnabled;
  document.getElementById("toggleSnap").innerText =
    "Snap: " + (snapEnabled ? "ON" : "OFF");
});

// ------------------------
// CARD SEARCH FILTER
// ------------------------
document.getElementById("cardSearch").addEventListener("input", function(e) {
  const search = e.target.value.toLowerCase();

  document.querySelectorAll(".card-item").forEach(item => {
    item.style.display =
      item.innerText.toLowerCase().includes(search)
        ? "block"
        : "none";
  });
});

// ------------------------
// EXPORT 10x7 CARD SHEET
// ------------------------
document.getElementById("exportSheet").addEventListener("click", () => {
  if (!cards || !cards.length) return;
  exportCardSheet(cards);
});
