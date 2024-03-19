let attached = false;

const getElmtImage = (elmt) => {
  return elmt.querySelector("img")
}

const followMouse = (elmt, event) => {
  elmt.style.left = event.x + "px";
  elmt.style.top = event.y + "px";
}

function showImage(elmt) {
  const image = getElmtImage(elmt)
  if (!attached) {
    attached = true;
    image.style.display = "block";
    document.addEventListener("pointermove", function(event) {
      followMouse(image, event)
    });
  }
}

function hideImage(elmt) {
  const image = getElmtImage(elmt)
  attached = false;
  image.style.display = "none";
  document.removeEventListener("pointermove", followMouse);
}