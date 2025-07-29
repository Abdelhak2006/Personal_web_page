// Scroll + Header behavior
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const scrollY = window.scrollY;

  // Add/remove background color
  header.classList.toggle("scrolled", scrollY > 50);

  // Hide/show header on scroll direction
  if (scrollY > lastScrollTop) {
    header.style.top = "-100px";
  } else {
    header.style.top = "0";
  }

  lastScrollTop = scrollY <= 0 ? 0 : scrollY;
});

// Logo Click Animation
const logoTitle = document.querySelector(".logo h1");
if (logoTitle) {
  logoTitle.addEventListener("click", () => {
    logoTitle.classList.toggle("clicked");
  });
}

// About Image Zoom with Overlay
const aboutImg = document.querySelector(".about-img img");
const overlay = document.querySelector(".about-img .overlay");
const wrapper = document.querySelector(".img-wrapper");

if (aboutImg && overlay && wrapper) {
  wrapper.addEventListener("mouseenter", () => {
    aboutImg.classList.add("zoomed");
    setTimeout(() => (overlay.style.opacity = "1"), 1000);
  });

  wrapper.addEventListener("mouseleave", () => {
    aboutImg.classList.remove("zoomed");
    overlay.style.opacity = "0";
  });
}

// Carousel Functionality
const imageCount = 21;
let currentIndex = 0;
const carouselImage = document.getElementById("carousel-image");

function loadImage(index) {
  const basePath = `gallery/${index}`;
  const formats = ["jpg", "png", "webp"];
  let formatIndex = 0;

  carouselImage.classList.remove("show");

  const tempImg = new Image();
  tempImg.onload = () => {
    carouselImage.src = tempImg.src;
    setTimeout(() => carouselImage.classList.add("show"), 50);
  };
  tempImg.onerror = () => {
    formatIndex++;
    if (formatIndex < formats.length) {
      tempImg.src = `${basePath}.${formats[formatIndex]}`;
    }
  };
  tempImg.src = `${basePath}.${formats[formatIndex]}`;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % imageCount;
  loadImage(currentIndex + 1);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + imageCount) % imageCount;
  loadImage(currentIndex + 1);
}

loadImage(currentIndex + 1);

// Carousel Controls
document.querySelector(".next")?.addEventListener("click", showNextImage);
document.querySelector(".prev")?.addEventListener("click", showPrevImage);

// Auto Slide
let interval = setInterval(showNextImage, 1000);

// Pause on hover
carouselImage?.addEventListener("mouseenter", () => clearInterval(interval));
carouselImage?.addEventListener("mouseleave", () => {
  interval = setInterval(showNextImage, 1500);
});

// Toggle menu (mobile)
document.getElementById("menu-toggle")?.addEventListener("click", () => {
  document.querySelector("nav")?.classList.toggle("show");
});
