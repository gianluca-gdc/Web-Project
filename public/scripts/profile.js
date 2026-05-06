class UserProfile {
    constructor(userId, firstName, lastName, age, gender, major, interests) {
        this.profile_id  = null;  
        this.user_id     = userId;
        this.first_name  = firstName;
        this.last_name   = lastName;
        this.age         = age;
        this.gender      = gender;
        this.major       = major;
        this.interests   = interests; 
        this.bio         = interests.join(", ");
        this.updated_at  = new Date();
    }
}

//PROFILE CREATE 
const profileForm = document.getElementById("profileForm");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser && profileForm) {
    window.location.href = "/login.html";
}

const signOutLink = document.querySelector(".sign-out");

if (signOutLink) {
    signOutLink.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
    });
}

const profilePhotoInput = document.getElementById("profilePhotoInput");
const profilePhotoButton = document.getElementById("profilePhotoButton");
const profilePhotoIcon = document.getElementById("profilePhotoIcon");
const profilePhotoPreview = document.getElementById("profilePhotoPreview");
let selectedProfilePhoto = localStorage.getItem("profilePhoto");

function showSelectedPhoto(photoUrl) {
    if (!profilePhotoPreview || !profilePhotoIcon) {
        return;
    }

    profilePhotoPreview.src = photoUrl;
    profilePhotoPreview.style.display = "inline-block";
    profilePhotoIcon.style.display = "none";
}

if (selectedProfilePhoto) {
    showSelectedPhoto(selectedProfilePhoto);
}

if (profilePhotoButton && profilePhotoInput) {
    profilePhotoButton.addEventListener("click", function () {
        profilePhotoInput.click();
    });

    profilePhotoInput.addEventListener("change", function () {
        const file = profilePhotoInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", function () {
            selectedProfilePhoto = reader.result;
            localStorage.setItem("profilePhoto", selectedProfilePhoto);
            showSelectedPhoto(selectedProfilePhoto);
        });

        reader.readAsDataURL(file);
    });
}

let selectedGender = null;

const genderButtons = document.querySelectorAll(".gender-btn");
genderButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        genderButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedGender = btn.dataset.gender;
    });
});

if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();
        createProfile();
    });
}

async function createProfile() {
    if (!loggedInUser) {
        window.location.href = "/login.html";
        return;
    }

    const age       = document.getElementById("Age").value;
    const major     = document.getElementById("Major").value;

    if (!selectedGender) {
        alert("Please select a gender.");
        return;
    }

    
    const interestsRaw = document.getElementById("Interests").value;
    const interests = interestsRaw
        .split(",")
        .map(i => i.trim())
        .filter(i => i.length > 0);

    if (interests.length < 3) {
        alert("Please enter at least 3 interests.");
        return;
    }

    const newProfile = new UserProfile(
        loggedInUser.user_id,
        loggedInUser.first_name || "First",
        loggedInUser.last_name || "Last",
        age,
        selectedGender,
        major,
        interests
    );

    try {
        const response = await fetch("/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Profile creation failed.");
        }

        localStorage.setItem("userProfile", JSON.stringify(data));
        window.location.href = "/mainPage.html";
    } catch (err) {
        alert(err.message);
    }
}
