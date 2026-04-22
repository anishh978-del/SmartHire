/* ================= STUDENT SWIPE ================= */

let jobs = [
  { title: "Frontend Developer", match: 85, reason: "React, JavaScript", image: "IBM.png" },
  { title: "Backend Developer", match: 70, reason: "Node.js, API", image: "rare.png" },
  { title: "UI/UX Designer", match: 60, reason: "Figma, Design", image: "micro.png" }
];

let jobIndex = 0;

function loadJob() {
  if (!document.getElementById("jobTitle")) return;

  let job = jobs[jobIndex];

  document.getElementById("jobTitle").innerText = job.title;
  document.getElementById("match").innerText = "Match: " + job.match + "%";
  document.getElementById("reason").innerText = "Matched: " + job.reason;
  document.querySelector(".card img").src = job.image;

  document.querySelector(".status").innerText =
    job.match >= 60 ? "✅ Eligible" : "⚠ Low Match";
}

function like() {
  alert("Applied!");
  nextJob();
}

function skip() {
  nextJob();
}

function nextJob() {
  jobIndex++;
  if (jobIndex >= jobs.length) jobIndex = 0;
  loadJob();
}

/* Load student page */
if (window.location.href.includes("student.html")) {
  loadJob();
}


/* ================= COMPANY SWIPE + CARD STACK ================= */

let candidates = [
  { name: "Anish", match: 85, skills: "React, JavaScript", image: "anish.jpeg" },
  { name: "Vasudev", match: 78, skills: "React, HTML", image: "vasudev.jpeg" },
  { name: "Ranver", match: 72, skills: "Node.js, Backend", image: "Ranver.jpeg" },
 
  { name: "Loki", match: 90, skills: "React, JS, CSS", image: "loki.jpeg" },
  { name: "Ksitis", match: 65, skills: "Java, OOP", image: "ksitis.jpeg" },
  { name: "Aditya", match: 80, skills: "JavaScript, API", image: "Adi.jpeg" }
];

let cIndex = 0;
let currentCandidate = candidates[0];

function loadCandidate() {
  if (!document.getElementById("candidateName")) return;

  // FRONT CARD
  currentCandidate = candidates[cIndex];

  document.getElementById("candidateName").innerText = currentCandidate.name;
  document.getElementById("matchC").innerText = "Match: " + currentCandidate.match + "%";
  document.getElementById("reasonC").innerText = "Matched: " + currentCandidate.skills;

  document.querySelector("#swipeCard img").src = currentCandidate.image;

  document.querySelector(".statusC").innerText =
    currentCandidate.match >= 75 ? "✅ Strong Match" : "⚠ Moderate Match";

  // BACK CARD
  let nextIndex = (cIndex + 1) % candidates.length;
  let nextCandidate = candidates[nextIndex];

  document.getElementById("backName").innerText = nextCandidate.name;
  document.querySelector("#backCard img").src = nextCandidate.image;
}

function sendRequest() {
  alert("Request Sent to " + currentCandidate.name);
  nextCandidate();
}

function reject() {
  nextCandidate();
}

function nextCandidate() {
  let card = document.getElementById("swipeCard");

  card.style.opacity = "0";

  setTimeout(() => {
    cIndex++;
    if (cIndex >= candidates.length) cIndex = 0;

    loadCandidate();

    card.style.transform = "translateX(0px) rotate(0deg)";
    card.style.opacity = "1";
  }, 300);
}

/* Load company page */
if (window.location.href.includes("company.html")) {
  loadCandidate();
}


/* ================= SWIPE GESTURE ================= */

let card = document.getElementById("swipeCard");

if (card) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  card.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    card.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    currentX = e.clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    card.classList.remove("dragging");

    if (currentX > 120) {
      card.style.transform = "translateX(500px) rotate(20deg)";
      setTimeout(() => {
        sendRequest();
        resetCard();
      }, 300);
    } else if (currentX < -120) {
      card.style.transform = "translateX(-500px) rotate(-20deg)";
      setTimeout(() => {
        reject();
        resetCard();
      }, 300);
    } else {
      resetCard();
    }
  });

  function resetCard() {
    card.style.transform = "translateX(0px) rotate(0deg)";
  }
}


/* ================= RESUME POPUP ================= */

function downloadResume(name, skills) {
  document.getElementById("resumeName").innerText = name;
  document.getElementById("resumeSkills").innerText = skills;

  document.getElementById("resumeModal").style.display = "flex";
}

function closeResume() {
  document.getElementById("resumeModal").style.display = "none";
}
/* ================= LOGIN FLOW ================= */

// store role and go to login
function goStudent() {
  localStorage.setItem("role", "student");
  window.location.href = "login.html";
}

function goCompany() {
  localStorage.setItem("role", "company");
  window.location.href = "login.html";
}

// fake login
function login() {
  let role = localStorage.getItem("role");

  if (role === "student") {
    window.location.href = "dashboard.html";
  } else if (role === "company") {
    window.location.href = "company_dashboard.html"; // 👈 NEW
  }
}
function goDashboard() {
  window.location.href = "dashboard.html";
}

function goMatches() {
  window.location.href = "student.html";
}

function goResume() {
  alert("Resume Report Coming Soon!");
}

function goProfile() {
  alert("Profile Page Coming Soon!");
}

if (document.getElementById("myChart")) {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
       
        {
          label: "Profile Views",
          data: [8, 15, 12, 20],
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: "Shortlisted",
          data: [2, 4, 3, 6],
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        },
        title: {
          display: true,
          text: "Your Job Search Performance",
          color: "white"
        }
      },
      scales: {
        x: {
          ticks: { color: "white" }
        },
        y: {
          ticks: { color: "white" }
        }
      }
    }
  });
}

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 50;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});
if (document.getElementById("companyChart")) {
  const ctx = document.getElementById("companyChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Candidates Viewed",
          data: [30, 50, 40, 70],
          borderWidth: 1
        },
        {
          label: "Shortlisted",
          data: [10, 20, 15, 25],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "white" }
        },
        title: {
          display: true,
          text: "Hiring Performance",
          color: "white"
        }
      },
      scales: {
        x: {
          ticks: { color: "white" }
        },
        y: {
          ticks: { color: "white" }
        }
      }
    }
  });
}
function goCompanyDashboard() {
  window.location.href = "company_dashboard.html";
}

function goCompanySwipe() {
  window.location.href = "company.html";
}

function goPostJob() {
  alert("Post Job feature coming soon!");
}

function goAnalytics() {
  alert("Advanced analytics coming soon!");
}