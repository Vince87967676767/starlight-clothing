const header = document.getElementById("siteHeader");
const menuTrigger = document.getElementById("menuTrigger");
const mobileMenu = document.getElementById("mobileMenu");

const openBasket = document.getElementById("openBasket");
const closeBasket = document.getElementById("closeBasket");
const continueShopping = document.getElementById("continueShopping");
const basketDrawer = document.getElementById("basketDrawer");
const basketOverlay = document.getElementById("basketOverlay");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 15);
}

function toggleMenu() {
  const isOpen = mobileMenu?.classList.toggle("open") ?? false;
  menuTrigger?.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  mobileMenu?.classList.remove("open");
  menuTrigger?.setAttribute("aria-expanded", "false");
}

function setBasketOpen(isOpen) {
  basketDrawer?.classList.toggle("open", isOpen);
  basketOverlay?.classList.toggle("open", isOpen);
  basketDrawer?.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("no-scroll", isOpen);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuTrigger?.addEventListener("click", toggleMenu);

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

openBasket?.addEventListener("click", () => setBasketOpen(true));
closeBasket?.addEventListener("click", () => setBasketOpen(false));
continueShopping?.addEventListener("click", () => setBasketOpen(false));
basketOverlay?.addEventListener("click", () => setBasketOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    setBasketOpen(false);
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
