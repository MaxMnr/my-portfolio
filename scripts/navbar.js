const toggleBtn = document.querySelector(".toggle-button");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");

  const isOpen = dropDownMenu.classList.contains("open");

  toggleBtn.classList = isOpen ? "toggle-button open" : "toggle-button";

  const menuIcon = document.getElementById("menu-icon");

  menuIcon.src = isOpen ? "images/logos/cross.svg" : "images/logos/hamburger.svg";
};

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

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

function hover(id) {
  let classes = [
    ".experiences-card-title",
    ".experiences-card-description",
    ".experiences-card-footer",
    ".experiences-card-paragraph",
  ];
  let element = document.getElementById(id);
  for (let i = 0; i < classes.length - 1; i++) {
    let div = element.querySelector(classes[i]);
    div.style.display = "none";
  }
  let div = element.querySelector(classes[classes.length - 1]);
  div.style.display = "block";
}

function leave(id) {
  let classes = [
    ".experiences-card-title",
    ".experiences-card-description",
    ".experiences-card-footer",
    ".experiences-card-paragraph",
  ];
  let element = document.getElementById(id);
  for (let i = 0; i < classes.length - 1; i++) {
    let div = element.querySelector(classes[i]);
    div.style.display = "block";
  }
  let div = element.querySelector(classes[classes.length - 1]);
  div.style.display = "none";
}

