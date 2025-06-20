const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const summary = document.getElementById("summary");
const education = document.getElementById("education");
const experience = document.getElementById("experience");
const skills = document.getElementById("skills");
const clear = document.getElementById("clear-form");

const preview = document.getElementById("preview-content");

let educationDetails = [];
let expList = [];
let skiList = [];

function updatePreview() {
    let eduTable = "";
    if (educationDetails.length > 0) {
        eduTable += `
            <h3>Education:</h3>
            <table border="1" cellspacing="0" cellpadding="8">
                <tr>
                    <th>Degree</th>
                    <th>College</th>
                    <th>Year</th>
                </tr>`;
        educationDetails.forEach(item => {
            eduTable += `
                <tr>
                    <td>${item.degree}</td>
                    <td>${item.college}</td>
                    <td>${item.year}</td>
                </tr>`;
        });
        eduTable += `</table>`;
    }

    preview.innerHTML = `
        <p><strong>Name:</strong> ${name.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Phone:</strong> ${phone.value}</p>
        <p><strong>Summary:</strong> ${summary.value}</p>
        ${eduTable}
        <p><strong>Experience:</strong></p>
        <ul>${expList.map(item => `<li>${item}</li>`).join("")}</ul>
        <p><strong>Skills:</strong></p>
        <ul>${skiList.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

education.addEventListener("click", () => {
    const degree = prompt("Enter Degree (e.g., B.Tech in CSE):");
    const college = prompt("Enter College Name:");
    const year = prompt("Enter Passing Year:");

    if (degree && college && year) {
        educationDetails.push({ degree, college, year });
        updatePreview();
    }
});

experience.addEventListener("click", () => {
    const exp = prompt("Enter your experience details:");
    if (exp) {
        expList.push(exp);
        updatePreview();
    }
});

skills.addEventListener("click", () => {
    const ski = prompt("Enter your skills:");
    if (ski) {
        skiList.push(ski);
        updatePreview();
    }
});

clear.addEventListener("click", () => {
    name.value = "";
    email.value = "";
    phone.value = "";
    summary.value = "";

    educationDetails = [];
    expList = [];
    skiList = [];

    preview.innerHTML = "";
});

document.getElementById("download-resume").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const content = document.getElementById("preview-content").innerText;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(content, 10, 10);

  doc.save("resume.pdf");
});

