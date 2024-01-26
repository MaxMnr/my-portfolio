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

