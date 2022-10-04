/*jslint plusplus: true, evil: true */
// Todo: jslint plusplus: true for error for ++
// Todo: evil: true for error document.write

/*global console, alert, prompt, $, document, write, ADSAFE, report, jslint, bitwise, node*/

/*property charAt, slicexs*/

/*jslint browser: true */

/*global window */

// Todo: Check File When You Type Code Javascript
// @ts-check
// Todo: Not Check File When You Type Code Javascript
// @ts-nocheck
// Todo: Ignore Line Have Error Code Javascript
// @ts-ignore

"use strict";

/*
?===============================================
?                 Header
?===============================================
*/

// Explain: Work  With Screen Small

// Func : Function For Show Menu
const showMenu = (toggleId, NavId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(NavId);
  // Validate That Variables Exist
  if (toggle && nav) {
    // Toggle Class show-menu On Click Element nav-toggle
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

// Get All Li In Navbar
const navLink = document.querySelectorAll(".nav-link");

// Func : Remove Menu When Click On Each Nav Link
function linkActive() {
  // Get Nav Menu
  const navMenu = document.getElementById("nav-menu");
  // When Click On Each nav-link Remove The show-menu Class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((ele) => ele.addEventListener("click", linkActive));

/*
?===============================================
?               Functions
?===============================================
*/

// Explain: Header Active Link On This Section
// Get All Section
const sections = document.querySelectorAll("section[id");

// Func: On Scroll Section Active
function scrollActive() {
  // Get Scroll Window
  let scrollY = window.pageYOffset;
  sections.forEach((current) => {
    var sectionHeight = current.offsetHeight;
    var sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Explain: Change Background Header
function scrollHeader() {
  // Get Header
  let header = document.getElementById("header");

  // When Scroll Is Greater Then 200 Viewport Height
  // Add Class scroll-header To Header
  if (this.scrollY >= 200) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*
?===============================================
?             Show Button Scroll Top
?===============================================
*/
// 5

// Func: When Scroll Is Greater Then 200 Viewport Height
// Func: Add Class show-scroll-top To Element scroll-top

function scrollTop() {
  // Get Element Scroll-Top
  let scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll-top");
  } else {
    scrollTop.classList.remove("show-scroll-top");
  }
}
window.addEventListener("scroll", scrollTop);

/*
?===============================================
?             Dark Light Theme
?===============================================
*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously Selected Topic ( If User Selected )
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We Obtain The current Theme That The Interface Has By Validating The dark-theme Class

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We Validate If The User Previously Chose a Topic
if (selectedTheme) {
  // If the Validation Is Fulfilled
  // We Ask What the Issue Was To Know If We Activated Or Deactivated The Dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / Deactivate The Theme Manually With The Button
themeButton.addEventListener("click", () => {
  // Add Or Remove The Dark / Icon Theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // We Save The Theme And The Current Icon That The User Chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*
?===============================================
?             SCROLL REVEAL ANIMATION
?===============================================
*/

const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home,
  .about,
  .services,
  .team,
  .contact`,
  {
    interval: 200,
  }
);
