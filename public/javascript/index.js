const listButtons = [].slice.call(
  document.getElementsByClassName("star-button")
);

console.log(listButtons);

listButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    for (btn of listButtons) {
      if (btn.id === button.id && btn.value <= button.value)
        btn.firstChild.src = "/yellow_star.png";
    }
  });

  button.addEventListener("mouseleave", () => {
    for (btn of listButtons) {
      btn.firstChild.src = "/white_star.png";
    }
  });
});
