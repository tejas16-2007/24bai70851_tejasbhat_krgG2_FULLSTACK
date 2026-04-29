window.onload = function () {

    const form = document.getElementById("careerForm");
    const displayData = document.getElementById("displayData");

    let candidateCount = 0;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        candidateCount++;

        let name = document.getElementById("fullName").value;
        let email = document.getElementById("emailId").value;
        let job = document.getElementById("jobTitle").value;
        let exp = document.getElementById("yearsExp").value;
        let skills = document.getElementById("skillSet").value;

        let profileBlock = document.createElement("div");
        profileBlock.classList.add("profile-entry");

        profileBlock.innerHTML = `
            <h3>Candidate ${candidateCount}</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Role:</strong> ${job}</p>
            <p><strong>Experience:</strong> ${exp} years</p>
            <p><strong>Skills:</strong> ${skills}</p>
        `;

        displayData.appendChild(profileBlock);

        form.reset();
    });
};
