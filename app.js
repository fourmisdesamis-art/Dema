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

let channels = [];

async function loadChannels() {
  const res = await fetch("data/channels.json");
  channels = await res.json();
}

function getChannel(channelId) {
  return channels.find(c => c.id === channelId);
}

async function loadSection(type) {
  const container = document.getElementById("content");
  container.innerHTML = "<p>Chargement...</p>";

  const res = await fetch(`data/${type}.json`);
  const data = await res.json();

  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");

    card.style.margin = "10px 0";
    card.style.padding = "12px";
    card.style.background = "#222";
    card.style.borderRadius = "10px";

    // 🎯 si c'est une vidéo, on ajoute la chaîne
    let channelHTML = "";

    if (item.channelId) {
      const channel = getChannel(item.channelId);

      if (channel) {
        channelHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
            <img src="${channel.avatar}" style="width:35px; height:35px; border-radius:50%;">
            <div>
              <strong>${channel.name}</strong><br>
              <small style="color:gray;">${channel.bio}</small>
            </div>
          </div>
        `;
      }
    }

    card.innerHTML = `
      <h3>${item.title}</h3>
      ${item.url ? `<a href="${item.url}" target="_blank" style="color:#4ea1ff;">Voir la vidéo</a>` : ""}
      ${channelHTML}
    `;

    container.appendChild(card);
  });
}

// charger les chaînes au démarrage
loadChannels();
