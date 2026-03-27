const container = document.getElementById("game-container");

function loadGame(name) {
  container.innerHTML = `
    <button onclick="goBack()">⬅ Back</button>
    <iframe
      id="game-frame"
      src="./${name}/index.html"
      title="${name} game"
      frameborder="0"
      style="position: absolute; top: 0;"
      allowfullscreen
    ></iframe>
  `;
}

function goBack() {
    container.innerHTML = "";
}