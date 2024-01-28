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

