document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");

  const startMusic = () => {
    if (!music) {
      return;
    }

    music.play().catch(() => {
      // Browsers may block autoplay until the user interacts with the page.
    });
  };

  startMusic();
  window.addEventListener("pointerdown", startMusic, { once: true });
  window.addEventListener("keydown", startMusic, { once: true });

  const cake = document.querySelector(".cake-wrap");

  if (cake) {
    const colors = ["#fff2cc", "#ffcf7d", "#ff8cc0", "#ffffff"];
    const bursts = 24;

    for (let i = 0; i < bursts; i += 1) {
      const spark = document.createElement("span");
      spark.className = "firecracker";

      const angle = (Math.PI * 2 * i) / bursts;
      const radius = 90 + Math.random() * 80;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const delay = Math.random() * 1.8;

      spark.style.setProperty("--x", `${x.toFixed(1)}px`);
      spark.style.setProperty("--y", `${y.toFixed(1)}px`);
      spark.style.setProperty("--delay", `${delay}s`);
      spark.style.setProperty("--color", colors[i % colors.length]);

      cake.appendChild(spark);
    }
  }

  const slideshowPhoto = document.getElementById("slideshow-photo");

  if (slideshowPhoto) {
    const photos = [
      {
        src: "assets/krishu-1.jpeg",
        alt: "Krishu smiling in a casual portrait",
      },
      {
        src: "assets/krishu-2.jpeg",
        alt: "Krishu smiling in a dark printed outfit",
      },
      {
        src: "assets/krishu-3.jpeg",
        alt: "Krishu with a bright sunflower filter and a soft smile",
      },
      {
        src: "assets/krishu-4.jpeg",
        alt: "Krishu smiling outdoors in a floral dupatta",
      },
      {
        src: "assets/krishu-5.jpeg",
        alt: "Krishu wearing glasses with a playful expression",
      },
      {
        src: "assets/krishu-6.jpeg",
        alt: "Krishu smiling beside a wooden doorway",
      },
    ];

    photos.forEach((photo) => {
      const preload = new Image();
      preload.src = photo.src;
    });

    let activeIndex = 0;
    const fadeDuration = 900;
    const holdDuration = 2200;
    let timerId = null;

    const scheduleNext = () => {
      timerId = window.setTimeout(() => {
        const nextIndex = (activeIndex + 1) % photos.length;

        slideshowPhoto.classList.add("is-fading");

        window.setTimeout(() => {
          slideshowPhoto.src = photos[nextIndex].src;
          slideshowPhoto.alt = photos[nextIndex].alt;
          slideshowPhoto.classList.remove("is-fading");
          activeIndex = nextIndex;
          scheduleNext();
        }, fadeDuration);
      }, holdDuration);
    };

    scheduleNext();

    window.addEventListener(
      "beforeunload",
      () => {
        if (timerId) {
          window.clearTimeout(timerId);
        }
      },
      { once: true }
    );
  }
});
