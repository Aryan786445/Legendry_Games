
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const gameCards = [...document.querySelectorAll(".game-card")];
const filterButtons = [...document.querySelectorAll(".filter")];
const categoryButtons = [...document.querySelectorAll("[data-pick]")];
const emptyMessage = document.getElementById("emptyMessage");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

let activeCategory = "All";

function updateGames() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  gameCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category;
    const matchesSearch = title.includes(query) ||
      category.toLowerCase().includes(query);
    const matchesCategory = activeCategory === "All" ||
      category === activeCategory;
    const visible = matchesSearch && matchesCategory;

    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  updateGames();
  document.getElementById("trending").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", updateGames);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    filterButtons.forEach(filter => {
      filter.classList.toggle("active", filter === button);
    });

    updateGames();
  });
});

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.pick;

    filterButtons.forEach(filter => {
      filter.classList.toggle(
        "active",
        filter.dataset.category === activeCategory
      );
    });

    updateGames();
    document.getElementById("trending").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("viewAll").addEventListener("click", event => {
  event.preventDefault();
  activeCategory = "All";
  searchInput.value = "";

  filterButtons.forEach(filter => {
    filter.classList.toggle("active", filter.dataset.category === "All");
  });

  updateGames();
  document.getElementById("trending").scrollIntoView({ behavior: "smooth" });
});

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
    menuBtn.textContent = "☰";
  });
});

gameCards.forEach(card => {
  const playButton = card.querySelector(".play-btn");
  const gameUrl = (card.dataset.url || "").trim();

  if (!gameUrl) {
    playButton.disabled = true;
    playButton.textContent = "Soon";
    playButton.setAttribute("aria-label", `${card.dataset.title} coming soon`);
    playButton.title = "This game is not published yet";
    card.classList.add("game-coming-soon");
  } else {
    playButton.addEventListener("click", () => {
      window.location.href = gameUrl;
    });
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

console.log("Legendry Games initialized successfully.");
