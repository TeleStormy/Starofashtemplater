let template = {};

function snap(value) {
  if (!snapEnabled) return value;
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

function makeDraggable(element, fieldId) {
  let offsetX, offsetY;

  element.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });

  function move(e) {
    let newX = snap(e.clientX - offsetX);
    let newY = snap(e.clientY - offsetY);

    element.style.left = newX + "px";
    element.style.top = newY + "px";

    template[fieldId].x = newX;
    template[fieldId].y = newY;
  }

  function stop() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  }
}

function openFieldEditor(fieldId) {
  const field = template[fieldId];
  const panel = document.getElementById("editorPanel");

  panel.innerHTML = `
    <h3>${fieldId.toUpperCase()}</h3>
    <label>Font Size</label>
    <input type="range" min="12" max="100" value="${field.fontSize}" id="fontSlider"/>
  `;

  document.getElementById("fontSlider").addEventListener("input", (e) => {
    field.fontSize = e.target.value;
    document.querySelector(`[data-id='${fieldId}']`).style.fontSize =
      field.fontSize + "px";
  });
}
