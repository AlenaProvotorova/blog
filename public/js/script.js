const inputs = document.getElementsByClassName("input");
const form = document.querySelector("form");
const formName = document.getElementById("form-name");
const formEmail = document.getElementById("form-email");
const formPassword = document.getElementById("form-password");
const formConfirmPassword = document.getElementById("form-conf-password");
const btn = document.getElementById("btn-sign-in");
const errorMessages = document.getElementsByClassName("error-message");
const errorName = document.querySelectorAll(".error-message")[0];
const errorMail = document.querySelectorAll(".error-message")[1];
const errorPassword1 = document.querySelectorAll(".error-message")[2];
const errorPassword2 = document.querySelectorAll(".error-message")[3];
const result = document.getElementById("result");

function removeClass(input) {
  input.classList.remove("input-error");
}

function checkEmptyInputs() {
  [...inputs].forEach((elem) => {
    if (!elem.value) {
      elem.classList.add("input-error");
      [...errorMessages].forEach((message) => {
        message.classList.add("error-message--active");
      });
      return false;
    }
  });
  return true;
}

function changeErrorInputStyle() {
  [...inputs].forEach((elem, i) => {
    elem.addEventListener("input", () => {
      if (elem.classList.contains("input-error")) {
        elem.classList.remove("input-error");
        [...errorMessages][i].classList.remove("error-message--active");
      }
    });
  });
}

changeErrorInputStyle();

function validateEmail() {
  const pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
  if (pattern.test(formEmail.value) == false) {
    formEmail.classList.add("input-error");
    errorMail.classList.add("error-message--active");
    return false;
  }
  return true;
}

function validatePassword() {
  if (formPassword.value !== formConfirmPassword.value) {
    formPassword.classList.add("input-error");
    formConfirmPassword.classList.add("input-error");
    errorPassword1.classList.add("error-message--active");
    errorPassword2.classList.add("error-message--active");
    return false;
  } else {
    return true;
  }
}

function validateMain() {
  if (checkEmptyInputs() && validateEmail() && validatePassword()) return true;
}

function deleteInputValue() {
  [...inputs].forEach((elem) => {
    elem.value = "";
  });
}

function requestToServise() {
  const isValid = validateMain();

  // if (isValid || true) {
  console.log("all good");
  const formData = {
    name: formName.value,
    email: formEmail.value,
    password: formPassword.value,
  };

  axios
    .post("/sign-up", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    .then(function (response) {
      alert(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });

  // deleteInputValue();
  // } else {
  //   console.log("ошибка");
  // }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  requestToServise();
});
