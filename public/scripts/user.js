class User {
    constructor(email, password, firstName, lastName) {
        this.user_id = null; 
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
        this.created_at = new Date();
        this.status = "active";
    }
}

function saveLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function showMessage(message) {
    alert(message);
}

async function getExistingProfile(userId) {
    const response = await fetch(`/profiles/user/${userId}`);

    if (response.status === 404) {
        return null;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not check user profile.");
    }

    return data;
}

async function goToNextPage(user) {
    const profile = await getExistingProfile(user.user_id);

    if (profile) {
        localStorage.setItem("userProfile", JSON.stringify(profile));
        window.location.href = "/mainPage.html";
        return;
    }

    window.location.href = "/profileCreate.html";
}

// REGISTER 
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        register();
    });
}

async function register() {
    const firstName = document.getElementById("FirstName").value;
    const lastName  = document.getElementById("LastName").value;
    const email     = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm_email").value;
    const password  = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (email !== confirmEmail) {
        showMessage("Emails do not match.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
    }

    const newUser = new User(email, password, firstName, lastName);

    try {
        const response = await fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        saveLoggedInUser(data);
        await goToNextPage(data);
    } catch (err) {
        showMessage(err.message);
    }
}

// LOGIN 
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login();
    });
}

async function login() {
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginUser = new User(email, password, null, null);

    try {
        const response = await fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUser)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed.");
        }

        saveLoggedInUser(data);
        await goToNextPage(data);
    } catch (err) {
        showMessage(err.message);
    }
}
