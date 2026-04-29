const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const jobCount = document.getElementById("jobCount");
const emptyState = document.getElementById("emptyState");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editIndex = null;

displayJobs();

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // ✅ Properly fetch values
    const title = document.getElementById("title").value.trim();
    const company = document.getElementById("company").value.trim();
    const location = document.getElementById("location").value.trim();
    const type = document.getElementById("type").value;
    const salary = document.getElementById("salary").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !company || !location || !type || !salary || !description) {
        alert("Please fill all fields!");
        return;
    }

    const job = {
        title,
        company,
        location,
        type,
        salary,
        description,
        postedDate: new Date().toLocaleDateString()
    };

    if (editIndex === null) {
        jobs.push(job);
    } else {
        jobs[editIndex] = job;
        editIndex = null;
    }

    localStorage.setItem("jobs", JSON.stringify(jobs));
    form.reset();
    displayJobs();
});

function displayJobs() {
    jobList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filterValue = filterType.value;

    const filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchText) ||
         job.company.toLowerCase().includes(searchText)) &&
        (filterValue === "All" || job.type === filterValue)
    );

    jobCount.textContent = `${filteredJobs.length} Jobs Found`;

    emptyState.style.display = filteredJobs.length === 0 ? "block" : "none";

    filteredJobs.forEach((job, index) => {

        const card = document.createElement("div");
        card.className = "job-card";

        const jobId = "JOB" + (index + 1).toString().padStart(3, "0");

        card.innerHTML = `
            <div class="job-title">${job.title}</div>

            <div class="job-meta">
                <p><strong>🏢 Company:</strong> ${job.company}</p>
                <p><strong>📍 Location:</strong> ${job.location}</p>
                <p><strong>💼 Job Type:</strong> ${job.type}</p>
                <p><strong>💰 Salary:</strong> ${job.salary}</p>
                <p><strong>🆔 Job ID:</strong> ${jobId}</p>
                <p><strong>📅 Posted On:</strong> ${job.postedDate}</p>
            </div>

            <div class="job-description">
                <strong>📝 Description:</strong>
                <p>${job.description}</p>
            </div>

            <div class="card-buttons">
                <button class="apply-btn">Apply Now</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        card.querySelector(".delete-btn").onclick = () => {
            jobs.splice(index, 1);
            localStorage.setItem("jobs", JSON.stringify(jobs));
            displayJobs();
        };

        card.querySelector(".edit-btn").onclick = () => {
            document.getElementById("title").value = job.title;
            document.getElementById("company").value = job.company;
            document.getElementById("location").value = job.location;
            document.getElementById("type").value = job.type;
            document.getElementById("salary").value = job.salary;
            document.getElementById("description").value = job.description;
            editIndex = index;
        };

        card.querySelector(".apply-btn").onclick = () => {
            alert(`Application submitted for ${job.title} at ${job.company}`);
        };

        jobList.appendChild(card);
    });
}

searchInput.addEventListener("input", displayJobs);
filterType.addEventListener("change", displayJobs);