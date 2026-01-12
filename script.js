let outfits = document.querySelectorAll(".outfit");
let currentIndex = 0;
let autoSlide;
let isHovered = false;

// show outfit
function showOutfit(index) {
  outfits.forEach(o => o.classList.remove("active"));
  outfits[index].classList.add("active");
}

// next / prev
function nextOutfit() {
  if (isHovered) return;
  currentIndex = (currentIndex + 1) % outfits.length;
  showOutfit(currentIndex);
}

function prevOutfit() {
  if (isHovered) return;
  currentIndex = (currentIndex - 1 + outfits.length) % outfits.length;
  showOutfit(currentIndex);
}

// arrows
document.querySelector(".arrow.next").addEventListener("click", nextOutfit);
document.querySelector(".arrow.prev").addEventListener("click", prevOutfit);

// auto scroll
function startAutoSlide() {
  autoSlide = setInterval(nextOutfit, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// pause on hover (IMPORTANT)
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

// start on load
startAutoSlide();


// DOWNLOAD ALL PHOTOS
document.getElementById("downloadAllBtn").addEventListener("click", () => {

  // get ONLY images from current visible outfit
  const activeOutfit = document.querySelector(".outfit.active");
  const images = activeOutfit.querySelectorAll("img");

  images.forEach((img, index) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `rohith_reddy_${index + 1}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
