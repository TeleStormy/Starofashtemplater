let cards = [];

document.getElementById("csvUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      cards = results.data.filter(c => c.Name);
      buildCardList();
      renderCard(cards[0]);
    }
  });
});

function buildCardList() {
  const list = document.getElementById("cardList");
  list.innerHTML = "";

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card-item";
    div.innerText = card.Name;

    div.addEventListener("click", () => {
      document.querySelectorAll(".card-item")
        .forEach(i => i.classList.remove("active"));
      div.classList.add("active");
      renderCard(card);
    });

    list.appendChild(div);
  });
}
