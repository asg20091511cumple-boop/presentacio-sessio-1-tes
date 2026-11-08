
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("bar");
const counterTop = document.getElementById("counter");
const counterBottom = document.getElementById("counter-bottom");

function updatePresentation() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  const number = String(currentSlide + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  counterTop.textContent = `${number} / ${total}`;
  counterBottom.textContent = `${number} / ${total}`;

  progressBar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;

  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updatePresentation();
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updatePresentation();
  }
}

nextButton.addEventListener("click", nextSlide);
previousButton.addEventListener("click", previousSlide);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    previousSlide();
  }

  if (event.key === "Home") {
    currentSlide = 0;
    updatePresentation();
  }

  if (event.key === "End") {
    currentSlide = slides.length - 1;
    updatePresentation();
  }
});

// Pantalla completa
const fullscreenButton = document.getElementById("fullscreen");

fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("No s'ha pogut activar la pantalla completa:", error);
  }
});

// Activitats amb correcció automàtica
function feedback(button, isCorrect) {
  const container = button.closest(".slide");
  const buttons = container.querySelectorAll(".choices button");
  const result = container.querySelector(".feedback");

  buttons.forEach(option => {
    option.disabled = true;
  });

  if (isCorrect) {
    button.classList.add("correct");
    result.textContent = "✓ Correcte! Molt bona resposta.";
    result.style.color = "#31d69a";
  } else {
    button.classList.add("incorrect");
    result.textContent = "✗ No és correcte. Revisa el contingut i torna-ho a pensar.";
    result.style.color = "#ff7777";
    
    buttons.forEach(option => {
      if (option.getAttribute("onclick")?.includes("true")) {
        option.classList.add("correct");
      }
    });
  }
}

updatePresentation();
