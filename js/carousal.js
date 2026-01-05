// GET ALL THE CAROUSALS IN THE DOCUMENT
let carousals = document.querySelectorAll(".carousal");

// PREPARING EACH CAROUSAL
carousals.forEach((carousal, carousalNumber) => {
  // SETTING THE CAROUSAL ID FOR USE LATER
  carousal.id = `carousal-${carousalNumber}`;

  // GETTING ALL ITEMS INSIDE THE CAROUSAL
  let carousalItems = carousal.querySelectorAll(".carousal-item");

  // ADDING PREVIOUS AND NEXT BUTTONS FOR THE CAROUSAL IF IT IS NOT OFF
  if (carousal.dataset.controls != "off") {
    carousal.appendChild(makePreviousBtn(carousalNumber));
    carousal.appendChild(makeNextBtn(carousalNumber));
  }

  // ADD INDICATORS IF IT IS NOT OFF
  if (carousal.dataset.indicators != "off") {
    let indicators = document.createElement("div");
    indicators.classList.add("carousal-indicators");

    // COPYING WHATEVER THE ITEM BODY HOLDS //E.G IMAGE VIDEO
    carousalItems.forEach((item, itemNumber) => {
      // ADDING AN INDICATOR FOR EACH ITEM OF THE CAROUSAL
      let ind = makeIndicator(carousalNumber);

      if (itemNumber == 0) {
        ind.classList.add("active");
      }

      indicators.appendChild(ind);
    });

    // APPENDING THE INDICATORS TO THE CAROUSAL
    carousal.appendChild(indicators);
  }

  // DUPLICATE THE IMAGE OR VIDEO OR WHATEVER THE ITEM BODY IS TO AVOID LETTER BOXING IF IT IS NOT OFF
  if (carousal.dataset.letterboxing != "off") {
    // COPYING WHATEVER THE ITEM BODY HOLDS //E.G IMAGE VIDEO TO AVOID LETTERBOXING EFFECT
    carousalItems.forEach((item, itemNumber) => {
      itemContent = item.querySelector(".carousal-item-body").innerHTML;

      itemContent = document
        .createRange()
        .createContextualFragment(itemContent);
      item.querySelector(".carousal-item-body").appendChild(itemContent);
    });
  }

  // ADDING ITEM PROGRESS IF IT IS NOT OFF
  if (carousal.dataset.auto == "on") {
    carousal.appendChild(makeAutoIndicator(carousal));
  }

  // INITIALIZE FIRST CAROUSAL ITEM
  carousalItems[0].classList.add("active");

  carousal.dataset.currentItem = 0;
});

// IF A NEXT OR PREVIOUS BUTTON CLICKED ON A CAROUSAL
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("carousal-control")) {
    let carousal = e.target.closest(".carousal");
    let carousalItems = carousal.querySelectorAll(".carousal-item");
    let currentItem = carousal.dataset.currentItem;

    // REMOVING THE ACTIVE CLASS FROM THE PREVIOUS ITEM
    carousalItems[currentItem].classList.remove("active");

    // REMOVE ACTIVE CLASS FROM THE INDICATOR OF THE PREVIOUS ITEM
    if (carousal.dataset.indicators != "off") {
      let indicators = carousal.querySelectorAll(".indicator");
      indicators[currentItem].classList.remove("active");
    }

    if (e.target.id.includes("next")) {
      currentItem++;
      if (currentItem == carousalItems.length - 1) {
        carousal.querySelector(".next-btn").classList.add("hide-control");
      } else {
        carousal
          .querySelector(".previous-btn")
          .classList.remove("hide-control");
      }
    } else if (e.target.id.includes("previous")) {
      currentItem--;
      if (currentItem == 0) {
        carousal.querySelector(".previous-btn").classList.add("hide-control");
      } else {
        carousal.querySelector(".next-btn").classList.remove("hide-control");
      }
    }

    scrollItemToView(carousal, currentItem);
  }
});

// FUNCTION THAT WILL CREATE A PREVIOUS BUTTON FOR THE CAROUSAL
function makePreviousBtn(carousalId) {
  // PREVIOUS BUTTON
  const previousBtn = document.createElement("button");
  previousBtn.classList.add("carousal-control", "previous-btn", "hide-control");
  previousBtn.id = `previous-btn-${carousalId}`;
  previousBtn.innerHTML = "&#10094;";

  return previousBtn;
}

// FUNCTION THAT WILL CREATE A NEXT BUTTON FOR THE CAROUSAL
function makeNextBtn(carousalId) {
  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("carousal-control", "next-btn");
  nextBtn.id = `next-btn-${carousalId}`;
  nextBtn.innerHTML = "&#10095;";

  return nextBtn;
}

// FUNCTION THAT WILL MAKE A INDICATOR INDICATING THE ITEMS IN THE CAROUSAL
function makeIndicator(carousalId) {
  let indicator = document.createElement("div");
  indicator.classList.add("circle-12", "indicator");

  return indicator;
}

// FUNCTION THAT WILL SCROLL THE CALCULATED ITEM INTO THE VIEW
function scrollItemToView(carousal, itemNumber) {
  let carousalItems = carousal.querySelectorAll(".carousal-item");

  carousalItems[itemNumber].scrollIntoView({
    behavior: "smooth", // Optional: adds a smooth animation
    block: "nearest", // Prevents forced vertical scrolling if already visible vertically
    inline: "center", // Aligns the target to the center of the horizontal container
  });

  carousalItems[itemNumber].classList.add("active");

  carousal.dataset.currentItem = itemNumber;

  if (carousal.dataset.indicators != "off") {
    let indicators = carousal.querySelectorAll(".indicator");
    indicators[itemNumber].classList.add("active");
  }
}

// FUNCTION TO MAKE THE INDICATOR FOR AUTO CAROUSAL
function makeAutoIndicator(carousal) {
  let autoCarousalIndicator = document.createElement("div");
  autoCarousalIndicator.classList.add("auto-carousal-indicator");

  let itemProgress = document.createElement("div");
  itemProgress.classList.add("item-progress");

  autoCarousalIndicator.appendChild(itemProgress);

  return autoCarousalIndicator;
}
