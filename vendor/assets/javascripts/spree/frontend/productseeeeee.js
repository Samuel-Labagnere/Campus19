let items = document.getElementsByClassName("item"),
  imgShirt = document.getElementsByTagName("img"),
  btnColor = document.getElementsByTagName("button");

for (let i = 0; i < items.length; i++) {
  for (let i = 0; i < imgShirt.length; i++) {
    btnColor[i].addEventListener("mouseover", () => {
      for (let i = 0; i < imgShirt.length; i++) {
        imgShirt[i].style.display = "none";
      }
      imgShirt[i].style.display = "block";
    });
  }
}