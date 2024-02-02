function scrollToId(targetId, offset) {
  const element = document.querySelector(targetId);

  if (element) {
    // Calculate the position to scroll to considering the offset
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    // Smooth scroll to the calculated position
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

function navigateAndScroll(targetPage, targetId, offset) {
  window.location.href = targetPage + targetId + "_" + offset;
}

window.addEventListener("load", () => {
  const hash = window.location.hash;
  console.log(hash);
  if (hash.includes("#")) {
    // Extract the targetId and offset from the hash
    const params = hash.split("_");
    const targetId = params[0];
    const offset = parseInt(params[1], 10);
    // Call scrollToId function with extracted parameters
    scrollToId(targetId, offset);
  }
});

// ============= EASTER EGG =============

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

