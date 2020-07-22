var regVariables = {
  inputs: document.getElementsByClassName("input"),
  form: document.querySelector("form"),
  formName: document.getElementById("form-name"),
  formEmail: document.getElementById("form-email"),
  formPassword: document.getElementById("form-password"),
  formConfirmPassword: document.getElementById("form-conf-password"),
  btn: document.getElementById("btn-sign-in"),
  errorMessages: document.getElementsByClassName("error-message"),
  errorName: document.querySelectorAll(".error-message")[0],
  errorMail: document.querySelectorAll(".error-message")[1],
  errorPassword1: document.querySelectorAll(".error-message")[2],
  errorPassword2: document.querySelectorAll(".error-message")[3],
  result: document.getElementById("result"),
};

var authVariables = {
  form: document.querySelector("form"),
  formName: document.getElementById("form-name"),
  formEmail: document.getElementById("form-email"),
  formPassword: document.getElementById("form-password"),
  formConfirmPassword: document.getElementById("form-conf-password"),
  btn: document.getElementById("btn-sign-in"),
  errorMail: document.querySelectorAll(".error-message")[0],
};
