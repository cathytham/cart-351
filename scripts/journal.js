const weeks = ["week2", "week3", "week4", "week5", "week6", "week7", "week8", "week9", "week10", "week11", "week12"];
let currentWeek = 0;

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Initialize buttons
updateButtons();

nextBtn.addEventListener("click", () => {
  // Hide current week
  document.getElementById(weeks[currentWeek]).style.display = "none";

  // Move to next week
  currentWeek++;

  // Show next week
  document.getElementById(weeks[currentWeek]).style.display = "block";

  // Update button states
  updateButtons();
});

prevBtn.addEventListener("click", () => {
  // Hide current week
  document.getElementById(weeks[currentWeek]).style.display = "none";

  // Move to previous week
  currentWeek--;

  // Show previous week
  document.getElementById(weeks[currentWeek]).style.display = "block";

  // Update button states
  updateButtons();
});

function updateButtons() {
  // Disable prev button if first week
  prevBtn.disabled = currentWeek === 0;
  // Disable next button if last week
  nextBtn.disabled = currentWeek === weeks.length - 1;
}
