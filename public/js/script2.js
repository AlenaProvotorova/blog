const form = document.querySelector("form");
const formName = document.getElementById("form-name");
const formEmail = document.getElementById("form-email");
const formPassword = document.getElementById("form-password");
const formConfirmPassword = document.getElementById("form-conf-password");
const btn = document.getElementById("btn-sign-in");
const errorMail = document.querySelectorAll(".error-message")[0];

function removeClass(input) {
  input.classList.remove("input-error");
}

function validateAll(input) {
  if (!input.value) {
    input.classList.add("input-error");
    return false;
  }
  return true;
}

function validateEmail() {
  const pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
  if (pattern.test(formEmail.value) == false) {
    formEmail.classList.add("input-error");
    return false;
  }
  return true;
}

function validatePassword() {
  if (formPassword.value === "") {
    formPassword.classList.add("input-error");
    return false;
  } else {
    return true;
  }
}

function validateMain() {
  if (
    validateAll(formEmail) &&
    validateAll(formPassword) &&
    validateEmail() &&
    validatePassword()
  ) {
    return true;
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateMain() === true) {
    const formData = {
      email: formEmail.value,
      password: formPassword.value,
    };

    axios
      .post("/sign-in", {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        window.location = "http://localhost:3000/home.html";

        const currentUserId = response.data.userId;
        document.cookie = `currentUserId = ${currentUserId}`;
      })

      .catch(function (error) {
        alert("Неправильно введен логин или пароль");
      });
  } else {
    console.log("плохо");
  }
});
