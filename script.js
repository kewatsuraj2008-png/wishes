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

  if (!cake) {
    return;
  }

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
});
