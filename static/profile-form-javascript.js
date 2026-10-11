//we intercept the submission so that clicking Submit does not immediately contact the server
const form = document.getElementById("profileForm");
const panel = document.getElementById("reviewPanel");
form.addEventListener("submit", function(submitEvent){
    submitEvent.preventDefault(); 
//We need to validate the form. If anything is invalid, it shows the warnings and stops 
 if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

//Collects all the form data
//personal Information
const studentID = document.getElementById("student_id").value; 
const fullname = document.getElementById("fullname").value; 
const email = document.getElementById("email").value; 
const phone = document.getElementById("phone").value;
const birthdate = document.getElementById("birthdate").value; 
const Github = document.getElementById("portfolio").value; 
const Render = document.getElementById("gin446").value; 

//Academic Information
const major = document.getElementById("major").value;
const gpa = Number(document.getElementById("gpa").value); 
const credits = Number(document.getElementById("credits").value); 
const graduation = document.querySelector('input[name="graduation"]:checked')?.value;
const graduation_month = document.getElementById("graduation_month").value; 
const internship_completed= document.querySelector('input[name="internship_completed"]:checked')?.value;

//Technical Background

const  skills = [...document.querySelectorAll('input[name="skills"]:checked')]
    .map(cb => cb.value);
const language = document.getElementById("language").value;
const software = [...document.getElementById("software").selectedOptions]
    .map(opt => opt.value);


//Final Year Project

const project_title = document.getElementById("project_title").value; 
const project_area = document.getElementById("project_area").value;
const description = document.getElementById("description").value; 
const team_size = Number(document.getElementById("team_size").value); 
const project_color = document.getElementById("project_color").value; 
const meeting_date = document.getElementById("meeting_date").value; 
const meeting_time = document.getElementById("meeting_time").value; 

//Hidden field
const formVersion = document.getElementById("form_version").value;

//Confirmation checkbox
const confirmation= document.getElementById("confirmation").checked;

//content of The Panel
const reviewContent = document.getElementById("reviewContent");
reviewContent.textContent = "";

const Parag = document.createElement("p");
Parag.textContent = "Student ID: " + studentID;
reviewContent.appendChild(Parag);

const nameParag = document.createElement("p");
nameParag.textContent = "Full Name: " + fullname;
reviewContent.appendChild(nameParag);

const emailParag = document.createElement("p");
emailParag.textContent = "USEK Email: " + email;
reviewContent.appendChild(emailParag);

const phoneParag = document.createElement("p");
phoneParag.textContent = "Phone Number: " + phone;
reviewContent.appendChild(phoneParag);

const birthdateParag = document.createElement("p");
birthdateParag.textContent = "Date of Birth: " + birthdate;
reviewContent.appendChild(birthdateParag);

const githubParag = document.createElement("p");
githubParag.textContent = "GitHub: " + Github;
reviewContent.appendChild(githubParag);

const renderParag = document.createElement("p");
renderParag.textContent = "GIN446 Website: " + Render;
reviewContent.appendChild(renderParag);

const majorParag = document.createElement("p");
majorParag.textContent = "Engineering Major: " + major;
reviewContent.appendChild(majorParag);

const gpaParag = document.createElement("p");
gpaParag.textContent = "Current GPA: " + gpa;
reviewContent.appendChild(gpaParag);

const creditsParag = document.createElement("p");
creditsParag.textContent = "Credits Completed: " + credits;
reviewContent.appendChild(creditsParag);

const graduationParag = document.createElement("p");
graduationParag.textContent = "Expected Graduation: " + graduation;
reviewContent.appendChild(graduationParag);

const graduationMonthParag = document.createElement("p");
graduationMonthParag.textContent = "Expected Graduation Month & Year: " + graduation_month;
reviewContent.appendChild(graduationMonthParag);

const internshipParag = document.createElement("p");
internshipParag.textContent = "Internship Completed: " + internship_completed;
reviewContent.appendChild(internshipParag);

const skillsParag = document.createElement("p");
skillsParag.textContent = "Technical Skills: " + skills.join(", ");
reviewContent.appendChild(skillsParag);

const languageParag = document.createElement("p");
languageParag.textContent = "Primary Programming Language: " + language;
reviewContent.appendChild(languageParag);

const softwareHeading = document.createElement("h3");
softwareHeading.textContent = "Engineering Software Used";
reviewContent.appendChild(softwareHeading);

const softwareList = document.createElement("ul");

software.forEach(function(item) {
    const li = document.createElement("li");
    li.textContent = item;
    softwareList.appendChild(li);
});

reviewContent.appendChild(softwareList);

const projectTitleParag = document.createElement("p");
projectTitleParag.textContent = "Proposed Project Title: " + project_title;
reviewContent.appendChild(projectTitleParag);

const projectAreaParag = document.createElement("p");
projectAreaParag.textContent = "Preferred Project Area: " + project_area;
reviewContent.appendChild(projectAreaParag);

const descriptionParag = document.createElement("p");
descriptionParag.textContent = "Brief Project Description: " + description;
reviewContent.appendChild(descriptionParag);

const teamSizeParag = document.createElement("p");
teamSizeParag.textContent = "Preferred Team Size: " + team_size;
reviewContent.appendChild(teamSizeParag);

const colorParag = document.createElement("p");
colorParag.textContent = "Project Dashboard Color: " + project_color;
reviewContent.appendChild(colorParag);

const meetingDateParag = document.createElement("p");
meetingDateParag.textContent = "Preferred Meeting Date: " + meeting_date;
reviewContent.appendChild(meetingDateParag);

const meetingTimeParag = document.createElement("p");
meetingTimeParag.textContent = "Preferred Meeting Time: " + meeting_time;
reviewContent.appendChild(meetingTimeParag);

const confirmationParag = document.createElement("p");
confirmationParag.textContent = "Information Confirmed: " + (confirmation ? "Yes" : "No");
reviewContent.appendChild(confirmationParag);

const versionParag = document.createElement("p");
versionParag.textContent = "Form Version: " + formVersion;
reviewContent.appendChild(versionParag);



//Open a review panel that shows every field's value, read-only
panel.classList.add("open"); //Open the review panel
});

//Closes the Review Panel 
const editButton = document.getElementById("editButton");
editButton.addEventListener("click", function() {
    panel.classList.remove("open");
});

// Confirm and submit the form to Flask
const confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", function() {
    form.submit();
});

