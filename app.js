async function loadSection(type) {
  const container = document.getElementById("content");
  container.innerHTML = "<p>Chargement...</p>";

  const res = await fetch(`data/${type}.json`);
  const data = await res.json();

  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");

    card.style.margin = "10px 0";
    card.style.padding = "10px";
    card.style.background = "#222";
    card.style.borderRadius = "8px";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.channel || ""}</p>
      ${item.url ? `<a href="${item.url}" target="_blank" style="color:#4ea1ff;">Voir</a>` : ""}
    `;

    container.appendChild(card);
  });
}
