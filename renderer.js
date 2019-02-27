let title = document.querySelector(".title");
let form = document.querySelector(".form");
let button = document.querySelector("button");
let type = document.querySelector(".type");
let prettySetup = document.querySelector(".prettySetup");
let exportOptions = document.querySelector(".export");
let loader = document.querySelector(".loader");
let h1 = document.querySelector("h1");
let globalState = {
  type: "web",
  title: "",
  export: "disk"
};
window.onload = () => {
  type.focus();
  type.value == "nodejs"
    ? changeState("nodejs", "type")
    : changeState("web", "type");
  globalState.export = exportOptions.value;
};
button.addEventListener("click", () => {
  button.blur();
  loader.classList.add("show");
  form.classList.add("hide");
  h1.classList.add("hide");
  // build
  if (globalState.export == "disk") {
    exportToDisk();
  } else if (globalState.export == "github") {
    exportToGitHub();
  } else if (globalState.export == "codepen") {
    exportToCodePen();
  }
});
let exportToDisk = () => {
  let downloadLink = "/download/" + globalState.title + "|" + globalState.type;
  window.location.href = downloadLink;
};
let exportToGitHub = () => {
  // Export to GitHub
  setTimeout(() => {
    loader.classList.remove("show");
    form.classList.remove("hide");
    h1.classList.remove("hide");
  }, 2500);
};
let exportToCodePen = () => {
  // Export to CodePen
  setTimeout(() => {
    loader.classList.remove("show");
    form.classList.remove("hide");
    h1.classList.remove("hide");
  }, 2500);
};
title.addEventListener("keyup", e => {
  let key = e.which || e.keyCode;
  if (key === 13) {
    exportOptions.focus();
  }
  globalState.title = title.value;
});
type.addEventListener("change", () => {
  type.value == "nodejs"
    ? changeState("nodejs", "type")
    : changeState("web", "type");
  title.focus();
});
exportOptions.addEventListener("change", () => {
  button.focus();
  globalState.export = exportOptions.value;
});
let changeState = (state, method) => {
  if (method == "type") {
    switch (state) {
      case "nodejs":
        exportOptions.innerHTML = `
          <option value="disk">Disk</option>
          <option value="github">GitHub</option>
        `;
        globalState.type = "nodejs";
        break;
      case "web":
      default:
        exportOptions.innerHTML = `
            <option value="disk">Disk</option>
            <option value="codepen" class="notnode">CodePen</option>
            <option value="github">GitHub</option>
        `;
        globalState.type = "web";
        break;
    }
  }
  return globalState;
};
