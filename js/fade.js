const OBSERVER_OPTIONS = {
  threshold: 0.25,
  root: null,
  rootMargin: "0px",
};

let fadeUpElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((elements) => {
  elements.forEach((el) => {
    el.target.classList.toggle("show-fade", el.isIntersecting);
    if (el.isIntersecting) observer.unobserve(el.target);
  });
}, OBSERVER_OPTIONS);

fadeUpElements.forEach((el) => observer.observe(el));
