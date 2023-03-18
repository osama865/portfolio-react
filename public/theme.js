console.log("Themes script");

let currentTheme = localStorage.getItem("theme");
console.log(currentTheme);

function setTheme(theme) {
  document.getElementById(`theme-style`).href = `css/${theme}.css`;
  localStorage.setItem("theme", theme);
}

setTimeout(() => {
  let themeDots = document.getElementsByClassName("theme-dot");

  if (themeDots.length != 0) {
    if (currentTheme == null) {
      setTheme("light");
    } else {
      setTheme(currentTheme);
    }

    console.log("is sthis working", themeDots);

    for (var i = 0; themeDots.length > i; i++) {
      themeDots[i].addEventListener("click", function () {
        let mode = this.dataset.mode;
        setTheme(mode);
        console.log("Option clicked:", mode);
      });
    }
  } else {
    console.log("there is no themes, apply the current theme");
    document.getElementById(`theme-style`).href = `css/${currentTheme}.css`;
  }
}, 2000);
