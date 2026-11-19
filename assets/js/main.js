(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  const filter = document.querySelector("#filter-input");
  const cards = [...document.querySelectorAll(".company-card")];
  const searchInput = document.querySelector("#search-input");
  const filterCards = value => {
    const query = value.trim().toLowerCase();
    cards.forEach(card => {
      const haystack = (card.dataset.search + " " + card.innerText).toLowerCase();
      card.hidden = query.length > 0 && !haystack.includes(query);
    });
  };
  if (filter) filter.addEventListener("input", event => filterCards(event.target.value));
  const form = document.querySelector("#directory-search");
  if (form && searchInput) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (filter) {
        filter.value = searchInput.value;
        filterCards(searchInput.value);
      }
      document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth" });
      if (filter) filter.focus({ preventScroll: true });
    });
  }
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const term = card.dataset.category || "";
      if (filter) {
        filter.value = term;
        filterCards(term);
      }
    });
  });
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();