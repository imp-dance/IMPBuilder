let title = document.querySelector(".title")
let form = document.querySelector(".form")
let button = document.querySelector("button")
let type = document.querySelector(".type")
let prettySetup = document.querySelector(".prettySetup")
let exportOptions = document.querySelector(".export")
let loader = document.querySelector(".loader")
window.onload = () => {
    type.focus();
}
button.addEventListener("click", () => {
  button.blur();
  loader.classList.add("show")
  form.classList.add("hide")
  // build
  setTimeout(() =>{
  loader.classList.remove("show")
  form.classList.remove("hide")
  }, 2500)
})
title.addEventListener("keypress", (e) => {
  let key = e.which || e.keyCode;
  if (key === 13) {
    exportOptions.focus()
  }
})
type.addEventListener("change", ()=>{
  type.value == "nodejs" ? changeState("nodejs") : changeState("web")
  title.focus()
})
exportOptions.addEventListener("change", ()=>{button.focus()})
let changeState = (state) => {
  switch (state){
    case "nodejs":
      exportOptions.innerHTML = `
        <option value="disk">Disk</option>
        <option value="github">GitHub</option>
      `
    break;
    case "web":
    default:
    exportOptions.innerHTML = `
        <option value="disk">Disk</option>
        <option value="codepen" class="notnode">CodePen</option>
        <option value="github">GitHub</option>
    `
    break;
  }
}