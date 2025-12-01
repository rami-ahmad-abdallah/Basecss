const navMenu = document.querySelector(".nav-menu");
const burger = document.querySelector(".burger");
const closeNav = document.querySelector(".burger-close");

let currentOpenSubLinks = null;
let subLinksIsOpen = false;
let navMenuIsOpen = false;

function closeCurrentOpenSubLinks() {
  if (subLinksIsOpen) {
    currentOpenSubLinks.classList.remove("open-sub-links");
    subLinksIsOpen = false;
    currentOpenSubLinks = null;
  }
}

function showNavMenu() {
  navMenu.classList.add("show-nav");
  navMenuIsOpen = true;
}

function hideNavMenu() {
  navMenu.classList.remove("show-nav");
  navMenuIsOpen = true;
}

// EVENT DELEGATION
document.addEventListener("click", (e) => {
  clickedItem = e.target.closest("div");

  if (!clickedItem) {
    if (navMenuIsOpen) {
      e.preventDefault();
      hideNavMenu();
    }
  } else if (clickedItem.classList.contains("nav-item")) {
    let hasSubLinks = clickedItem.querySelector(".sub-links");
    // checking if the clicked nav item has a sub-links child node
    if (hasSubLinks) {
      // if yes
      e.preventDefault();
      // if a prviously sublinks was open and it is the same nav item that was clicked then close it
      if (subLinksIsOpen && currentOpenSubLinks == clickedItem) {
        closeCurrentOpenSubLinks();
      } else if (subLinksIsOpen) {
        // if a prviously sublinks was open BUT it is not the same nav item that was clicked then close opened sublinks and open the clicked item sublinks
        currentOpenSubLinks.classList.remove("open-sub-links");
        clickedItem.classList.add("open-sub-links");
        subLinksIsOpen = true;
        currentOpenSubLinks = clickedItem;
      } else {
        // if no sublinks is open then open the clicked item sublinks
        clickedItem.classList.add("open-sub-links");
        subLinksIsOpen = true;
        currentOpenSubLinks = clickedItem;
      }
    } else if (clickedItem == closeNav) {
      // if the clicked item is a nav item but it is the close nav button then  it means that the menu is open in mobile and toggle it
      e.preventDefault();
      hideNavMenu();
    }
  } else if (clickedItem == burger) {
    // if the clicked item is the burger then open show the nav // Only mobile
    showNavMenu();
  } else if (clickedItem.classList.contains("nav-menu")) {
    closeCurrentOpenSubLinks();
  } else {
    if (navMenuIsOpen) {
      e.preventDefault();
      hideNavMenu();
    }
  }
});
