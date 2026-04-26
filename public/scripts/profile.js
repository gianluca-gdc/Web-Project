class UserProfile {
    constructor(age, gender, major, interests) {
        this.profile_id  = null;  
        this.user_id     = null;  
        this.age         = age;
        this.gender      = gender;
        this.major       = major;
        this.interests   = interests; 
        this.bio         = null;
        this.updated_at  = new Date();
    }
}

//PROFILE CREATE 
const profileForm = document.getElementById("profileForm");

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

function createProfile() {
    const age       = document.getElementById("Age").value;
    const major     = document.getElementById("Major").value;

    
    const interestsRaw = document.getElementById("Interests").value;
    const interests = interestsRaw
        .split(",")
        .map(i => i.trim())
        .filter(i => i.length > 0);

    const newProfile = new UserProfile(age, selectedGender, major, interests);

    console.log("New UserProfile created:");
    console.log(newProfile);
}