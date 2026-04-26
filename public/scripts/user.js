class User {
    constructor(email, password, firstName, lastName) {
        this.user_id = null; 
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.created_at = new Date();
        this.status = "active";
    }
}

// REGISTER 
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        register();
    });
}

function register() {
    const firstName = document.getElementById("FirstName").value;
    const lastName  = document.getElementById("LastName").value;
    const email     = document.getElementById("email").value;
    const password  = document.getElementById("password").value;

    const newUser = new User(email, password, firstName, lastName);

    console.log("New User registered:");
    console.log(newUser);
}

// LOGIN 
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login();
    });
}

function login() {
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginUser = new User(email, password, null, null);

    console.log("Login attempt:");
    console.log(loginUser);
}