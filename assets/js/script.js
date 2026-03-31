document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニュー
  const menu = document.querySelector(".menu");
  const menuWrapper = document.querySelector(".hamburger-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  hamburgerIcon.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuWrapper.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuWrapper.classList.remove("active");
    });
  });

  // スクロールでヒーローとコンテンツ切り替え
  const heroPage1 = document.querySelector(".hero-section .page1");
  const heroPage2 = document.querySelector(".hero-section .page2");
  const contentsSection = document.querySelector(".contents");
  const contentsPage1 = contentsSection?.querySelector(".page1");
  const contentsPage2 = contentsSection?.querySelector(".page2");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // ヒーロー
    const heroTrigger = windowHeight * 0.9;
    if (heroPage1 && heroPage2) {
      if (scrollY > heroTrigger) {
        heroPage1.classList.remove("active");
        heroPage2.classList.add("active");
      } else {
        heroPage1.classList.add("active");
        heroPage2.classList.remove("active");
      }
    }

    // コンテンツ
    const contentsTrigger = windowHeight * 4;
    if (contentsPage1 && contentsPage2) {
      if (scrollY > contentsTrigger) {
        contentsPage1.classList.remove("active");
        contentsPage2.classList.add("active");
      } else {
        contentsPage1.classList.add("active");
        contentsPage2.classList.remove("active");
      }
    }
  });

  // ギャラリー画像切り替え・スライドショー
  const mainDisplay = document.getElementById('mainDisplay');
  const thumbs = document.querySelectorAll('.thumb');
  const images = Array.from(thumbs).map(img => img.src);
  let currentIndex = 0;
  let slideshowInterval;

  // orientation 判定関数
  function checkOrientation() {
    const img = document.getElementById("mainDisplay");
    if (!img) return;
    if (img.naturalHeight > img.naturalWidth) {
      img.classList.add("portrait");
    } else {
      img.classList.remove("portrait");
    }
  }

  function updateMainImage() {
    mainDisplay.style.opacity = 0;
    setTimeout(() => {
      mainDisplay.src = images[currentIndex];
      mainDisplay.onload = () => {
        checkOrientation();
        mainDisplay.style.opacity = 1;
      };
    }, 400);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImage();
  }

  function toggleSlideshow() {
    const btn = document.getElementById('playPauseBtn');
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      if (btn) btn.textContent = '▶';
    } else {
      slideshowInterval = setInterval(nextImage, 3800);
      if (btn) btn.textContent = '⏸';
    }
  }

  // 初期化
  if (images.length > 0) {
    mainDisplay.src = images[0];
    mainDisplay.onload = () => {
      checkOrientation();
      mainDisplay.style.opacity = 1;
    };
  }

  slideshowInterval = setInterval(nextImage, 3800);

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      updateMainImage();
      clearInterval(slideshowInterval);
      slideshowInterval = setInterval(nextImage, 3800);
    });
  });

  // 再生・停止ボタン、前後ボタンのイベント
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateMainImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextImage();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', toggleSlideshow);
  }
});
