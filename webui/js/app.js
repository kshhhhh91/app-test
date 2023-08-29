const signup = document.getElementById("sign-up");
signin = document.getElementById("sign-in");
loginin = document.getElementById("login-in");
loginup = document.getElementById("login-up");

signup.addEventListener("click", () => {
    loginin.classList.remove("block");
    loginup.classList.remove("none");

    loginin.classList.add("none");
    loginup.classList.add("block");
})

signin.addEventListener("click", () => {
    loginin.classList.remove("none");
    loginup.classList.remove("block");

    loginin.classList.add("block");
    loginup.classList.add("none");
})

//gpt code
const signupBtn = document.getElementById("sign-up");
const signinBtn = document.getElementById("sign-in");
const logininForm = document.getElementById("login-in");
const loginupForm = document.getElementById("login-up");

signupBtn.addEventListener("click", () => {
    logininForm.classList.remove("block");
    loginupForm.classList.remove("none");

    logininForm.classList.add("none");
    loginupForm.classList.add("block");
})

signinBtn.addEventListener("click", () => {
    logininForm.classList.remove("none");
    loginupForm.classList.remove("block");

    logininForm.classList.add("block");
    loginupForm.classList.add("none");
})

// Login function using axios
logininForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = e.target.querySelector("input[placeholder='Username']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    const requestBody = {
        username: username,
        password: password
    };

    axios.post("http://localhost:3000/login", requestBody)
    .then(response => {
        if(response.data.status === "success") {
            alert(response.data.message);
            // Redirect to dashboard or some other page
            // window.location.href = "/dashboard";
        } else {
            alert(response.data.message);
        }
    })
    .catch(error => {
        alert("Error occurred: " + error.message);
    });
});

// Signup function using axios
loginupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = e.target.querySelector("input[placeholder='Username']").value;
    const email = e.target.querySelector("input[placeholder='Email']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    const requestBody = {
        username: username,
        email: email,
        password: password
    };

    axios.post("http://localhost:3000/signup", requestBody)
    .then(response => {
        if(response.data.status === "success") {
            alert(response.data.message);
            // Redirect to login page or some other page after successful registration
            // window.location.href = "/login";
        } else {
            alert(response.data.message);
        }
    })
    .catch(error => {
        alert("Error occurred: " + error.message);
    });
});