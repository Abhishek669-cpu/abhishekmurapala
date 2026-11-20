document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const toast = document.getElementById("uploadToast");
  const backToTop = document.getElementById("backToTop");
  const photo = document.getElementById("profilePhoto");
  const photoFrame = document.querySelector(".photo-frame");

  if (photo && photoFrame) {
    const loaded = () => { photo.classList.add("photo-loaded"); photoFrame.classList.add("has-photo"); };
    const failed = () => { photo.classList.remove("photo-loaded"); photoFrame.classList.remove("has-photo"); };
    photo.addEventListener("load", loaded);
    photo.addEventListener("error", failed);
    if (photo.complete) photo.naturalWidth > 0 ? loaded() : failed();
  }

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navItems.forEach(link => link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  let toastTimer;
  document.querySelectorAll(".upload-trigger").forEach(button => button.addEventListener("click", () => {
    if (!toast) return;
    clearTimeout(toastTimer);
    document.getElementById("toastTitle").textContent = "Upload Soon";
    document.getElementById("toastMessage").textContent = (button.dataset.upload || "This section") + " details will be added here later.";
    toast.classList.remove("show", "hide");
    void toast.offsetWidth;
    toast.classList.add("show");
    toastTimer = setTimeout(() => { toast.classList.remove("show"); toast.classList.add("hide"); }, 3000);
  }));
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
  const updateTop = () => backToTop?.classList.toggle("visible", window.scrollY > 450);
  window.addEventListener("scroll", updateTop, { passive: true });
  updateTop();
  backToTop?.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }), {rootMargin:"-25% 0px -60% 0px",threshold:0});
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
  }
});
