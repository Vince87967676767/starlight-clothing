const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const openBasketButton = document.getElementById("openBasket");
const closeBasketButton = document.getElementById("closeBasket");
const continueShoppingButton = document.getElementById("continueShopping");
const basketDrawer = document.getElementById("basketDrawer");
const basketOverlay = document.getElementById("basketOverlay");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 15);
}

function toggleMenu() {
  const isOpen = mobileMenu?.classList.toggle("open") ?? false;
  menuButton?.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  mobileMenu?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}

function setBasketOpen(isOpen) {
  basketDrawer?.classList.toggle("open", isOpen);
  basketOverlay?.classList.toggle("open", isOpen);
  basketDrawer?.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("no-scroll", isOpen);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton?.addEventListener("click", toggleMenu);

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

openBasketButton?.addEventListener("click", () => setBasketOpen(true));
closeBasketButton?.addEventListener("click", () => setBasketOpen(false));
continueShoppingButton?.addEventListener("click", () => setBasketOpen(false));
basketOverlay?.addEventListener("click", () => setBasketOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setBasketOpen(false);
    closeMenu();
  }
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});
