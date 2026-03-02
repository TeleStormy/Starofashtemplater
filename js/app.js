let snapEnabled = true;
const GRID_SIZE = 10;

document.getElementById("toggleSnap").addEventListener("click", () => {
  snapEnabled = !snapEnabled;
  document.getElementById("toggleSnap").innerText =
    "Snap: " + (snapEnabled ? "ON" : "OFF");
});

document.getElementById("cardSearch").addEventListener("input", function(e) {
  const search = e.target.value.toLowerCase();

  document.querySelectorAll(".card-item").forEach(item => {
    item.style.display =
      item.innerText.toLowerCase().includes(search)
        ? "block"
        : "none";
  });
});
