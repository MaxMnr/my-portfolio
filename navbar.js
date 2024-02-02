const toggleBtn = document.querySelector(".toggle-button");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtn.classList = isOpen ? "toggle-button open" : "toggle-button";
};

document.addEventListener("DOMContentLoaded", function () {
  var emoji = document.getElementById("emoji");
  var music = document.getElementById("music");
  emoji.addEventListener("click", function () {
    if (!music.paused) {
      // Heart emoji
      emoji.innerHTML = "Made with &#9825; in HTML & CSS"; // Replace with your desired emoji (e.g., Alien emoji)
    } else {
      emoji.innerHTML = "The cake is a lie! &#127874;"; // Change back to the heart emoji
    }
  });
  emoji.addEventListener("click", function () {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });
});
