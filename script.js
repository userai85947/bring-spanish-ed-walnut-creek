const schools = {
  "buena-vista": {
    name: "Buena Vista Elementary",
    principal: "Angela Gramlick",
    salutation: "Gramlick",
    email: "agramlick@walnutcreeksd.org"
  },
  "indian-valley": {
    name: "Indian Valley Elementary",
    principal: "Amanda Minnich",
    salutation: "Minnich",
    email: "aminnich@walnutcreeksd.org"
  },
  "murwood": {
    name: "Murwood Elementary",
    principal: "Monifa Morgan",
    salutation: "Morgan",
    email: "monifam@walnutcreeksd.org"
  },
  "parkmead": {
    name: "Parkmead Elementary",
    principal: "Mike Burstein",
    salutation: "Burstein",
    email: "mburstein@walnutcreeksd.org"
  },
  "tice-creek": {
    name: "Tice Creek",
    principal: "Pam Davis",
    salutation: "Davis",
    email: "pdavis@walnutcreeksd.org"
  },
  "walnut-heights": {
    name: "Walnut Heights Elementary",
    principal: "Amy Romem",
    salutation: "Romem",
    email: "aromem@walnutcreeksd.org"
  }
};

function todayLong() {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date());
}

function buildTemplate(school) {
  const schoolDisplay = school.name.includes("Elementary") ? `${school.name} School` : school.name;
  return `Dear Principal ${school.salutation},

I am submitting a formal request for a Spanish-English Two-Way Dual Immersion (TWDI) language acquisition program at ${schoolDisplay} beginning in the 2027-2028 school year.

Date: [Date]
Parent/Guardian: [Name]
Home Address: [Address]
Student: [Student Name]
Current Grade: [Grade]
Requested School Year: 2027-2028
Requested Program: Spanish-English Two-Way Dual Immersion
Languages of Instruction: Spanish and English

Please document this as my formal request for a new language acquisition program pursuant to California Education Code Section 310 / Proposition 58.

Thank you,
[Name]`;
}

function showSchool(key) {
  const school = schools[key];
  if (!school) return;

  document.querySelectorAll(".school-button").forEach(button => {
    const active = button.dataset.school === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  const panel = document.getElementById("school-request-panel");
  const schoolName = document.getElementById("selected-school-name");
  const principalName = document.getElementById("principal-name");
  const principalEmail = document.getElementById("principal-email");
  const template = document.getElementById("request-template");
  const openEmail = document.getElementById("open-email");
  const openGmail = document.getElementById("open-gmail");
  const status = document.getElementById("copy-status");

  const body = buildTemplate(school);
  const subject = "Request for Spanish-English Two-Way Dual Immersion Program";

  schoolName.textContent = school.name;
  principalName.textContent = school.principal;
  principalEmail.textContent = school.email;
  principalEmail.href = `mailto:${school.email}`;
  template.value = body;
  openEmail.href = `mailto:${school.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  openGmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(school.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "";
  panel.hidden = false;

  template.style.height = "auto";
  template.style.height = `${template.scrollHeight}px`;

  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.querySelectorAll(".school-button").forEach(button => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => showSchool(button.dataset.school));
});

document.getElementById("copy-template")?.addEventListener("click", async () => {
  const template = document.getElementById("request-template");
  const status = document.getElementById("copy-status");

  try {
    await navigator.clipboard.writeText(template.value);
    status.textContent = "Copied — paste it into your email and fill in the bracketed items.";
  } catch {
    template.focus();
    template.select();
    document.execCommand("copy");
    status.textContent = "Copied — paste it into your email and fill in the bracketed items.";
  }
});
