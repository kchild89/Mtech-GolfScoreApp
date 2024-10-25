let selectedTeeType;
let courseId;

const teeBtns = document.querySelectorAll("#tee");
const courseBtns = document.querySelectorAll(".course");
const noTeeButton = document.getElementById("noTeeButton");

const courseSelect = document.getElementById("course-select");

courseSelect.addEventListener("change", () => {
  courseId = courseSelect.value;
  const courses = document.getElementById("courses");
  courses.innerHTML = `<h3 class="text-center text-white">Course: ${
    courseSelect.options[courseSelect.selectedIndex].text
  }</h3>`;
  const tees = document.getElementById("tees");
  tees.className = "row";
  tees.classList.add("justify-content-center", "vw-60");
});

const teeSelect = document.getElementById("tee-select");

teeSelect.addEventListener("change", () => {
  selectedTeeType = teeSelect.value.toLowerCase();
  if (selectedTeeType === "pro" && courseId === "19002") {
    const noTee = document.getElementById("noTee");
    noTee.className = "active-display";
    overlay.className = "active-overlay";
    return;
  }
  tees.innerHTML = `<h3 class="text-center text-white">Tee Type: ${
    teeSelect.options[teeSelect.selectedIndex].text
  }</h3>`;
  const newPlayerButton = document.getElementById("newPlayer");
  newPlayerButton.className = "m-2";
  newPlayerButton.classList.add("p-2", "rounded-pill");
  newPlayerButton.click();
  displayCourseInfo(courseId);
});

noTeeButton.addEventListener("click", () => {
  noTee.className = "no-display";
  overlay.className = "hide-overlay";
});

async function displayCourseInfo(id) {
  let url = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${id}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let yardages = [];
  let pars = [];
  let handicaps = [];
  for (hole of data.holes) {
    let teeBoxes = hole.teeBoxes;
    for (box of teeBoxes) {
      if (box.teeType === selectedTeeType) {
        yardages.push(box.yards);
        pars.push(box.par);
        handicaps.push(box.hcp);
      }
    }
  }

  let totalYard = 0;
  let totalPar = 0;
  let totalHcp = 0;
  let halfYard = 0;
  let halfPar = 0;
  let halfHcp = 0;
  const yardageElements = document.querySelectorAll(".yardage");
  const parElements = document.querySelectorAll(".par");
  const handicapElements = document.querySelectorAll(".handicap");
  const yardTotal = document.getElementById("yardTotal");
  const parTotal = document.getElementById("parTotal");
  const hcpTotal = document.getElementById("hcpTotal");
  const frontYardOut = document.getElementById("frontYardOut");
  const frontParOut = document.getElementById("frontParOut");
  const frontHcpOut = document.getElementById("frontHcpOut");
  const yardIn = document.getElementById("yardIn");
  const parIn = document.getElementById("parIn");
  const hcpIn = document.getElementById("hcpIn");
  for (i = 0; i < 18; i++) {
    yardageElements[i].textContent = yardages[i];
    parElements[i].textContent = pars[i];
    handicapElements[i].textContent = handicaps[i];
    totalYard += Number(yardages[i]);
    totalPar += Number(pars[i]);
    totalHcp += Number(handicaps[i]);
  }
  for (i = 0; i < 9; i++) {
    halfYard += Number(yardages[i]);
    halfPar += Number(pars[i]);
    halfHcp += Number(handicaps[i]);
  }
  yardTotal.textContent = totalYard;
  parTotal.textContent = totalPar;
  hcpTotal.textContent = totalHcp;
  frontYardOut.textContent = halfYard;
  frontParOut.textContent = halfPar;
  frontHcpOut.textContent = halfHcp;
  yardIn.textContent = halfYard;
  parIn.textContent = halfPar;
  hcpIn.textContent = halfHcp;
}
