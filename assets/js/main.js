function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

const loadPartial = async (id, file) => {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (id === "header") {
      setupHamburger();
    }

  } catch (error) {
    console.log("Partial load failed:", file, error);
  }
};

loadPartial("header", "/partials/header.html");
loadPartial("footer", "/partials/footer.html");
