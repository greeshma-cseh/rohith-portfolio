const outfits = document.querySelectorAll(".outfit");
let currentIndex = 0;
let autoSlide;
let isHovered = false;

// detect mobile
const isMobile = window.innerWidth <= 768;

// SLIDE SPEED
// Desktop: 4 sec
// Mobile: NO AUTO SCROLL
const SLIDE_SPEED = 6000;

/* =========================
   SHOW OUTFIT
========================= */
function showOutfit(index) {
  outfits.forEach(o => o.classList.remove("active"));
  outfits[index].classList.add("active");
}

/* =========================
   NEXT / PREV
========================= */
function nextOutfit() {
  if (!isMobile && isHovered) return;
  currentIndex = (currentIndex + 1) % outfits.length;
  showOutfit(currentIndex);
}

function prevOutfit() {
  if (!isMobile && isHovered) return;
  currentIndex = (currentIndex - 1 + outfits.length) % outfits.length;
  showOutfit(currentIndex);
}

/* =========================
   DESKTOP ARROWS
========================= */
document.querySelector(".arrow.next")?.addEventListener("click", () => {
  stopAutoSlide();
  nextOutfit();
  startAutoSlide();
});

document.querySelector(".arrow.prev")?.addEventListener("click", () => {
  stopAutoSlide();
  prevOutfit();
  startAutoSlide();
});

/* =========================
   MOBILE BUTTONS (BOTTOM)
========================= */
document.querySelector(".mobile-btn.next")?.addEventListener("click", nextOutfit);
document.querySelector(".mobile-btn.prev")?.addEventListener("click", prevOutfit);

/* =========================
   AUTO SLIDE (DESKTOP ONLY)
========================= */
function startAutoSlide() {
  if (isMobile) return; // ❌ NO AUTO SCROLL ON MOBILE
  autoSlide = setInterval(nextOutfit, SLIDE_SPEED);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

/* =========================
   PAUSE ON HOVER (DESKTOP ONLY)
========================= */
if (!isMobile) {
  document.querySelectorAll(".outfit-grid img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      isHovered = true;
      stopAutoSlide();
    });

    img.addEventListener("mouseleave", () => {
      isHovered = false;
      startAutoSlide();
    });
  });
}

/* =========================
   START
========================= */
startAutoSlide();

/* =========================
   DOWNLOAD ALL PHOTOS
========================= */
document.getElementById("downloadAllBtn")?.addEventListener("click", () => {

  const activeOutfit = document.querySelector(".outfit.active");
  if (!activeOutfit) return;

  const images = activeOutfit.querySelectorAll("img");

  images.forEach((img, index) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `rohith_reddy_${currentIndex + 1}_${index + 1}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
