class SignUp {
  removeClass(input) {
    input.classList.remove("input-error");
  }

  checkEmptyInputs() {
    [...regVariables.inputs].forEach((elem) => {
      if (!elem.value) {
        elem.classList.add("input-error");
        [...regVariables.errorMessages].forEach((message) => {
          message.classList.add("error-message--active");
        });
        return false;
      }
    });
    return true;
  }

  changeErrorInputStyle() {
    [...regVariables.inputs].forEach((elem, i) => {
      elem.addEventListener("input", () => {
        if (elem.classList.contains("input-error")) {
          elem.classList.remove("input-error");
          [...regVariables.errorMessages][i].classList.remove(
            "error-message--active"
          );
        }
      });
    });
  }

  validateEmail() {
    const pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
    if (pattern.test(regVariables.formEmail.value) == false) {
      regVariables.formEmail.classList.add("input-error");
      regVariables.errorMail.classList.add("error-message--active");
      return false;
    }
    return true;
  }

  validatePassword() {
    if (
      regVariables.formPassword.value !== regVariables.formConfirmPassword.value
    ) {
      regVariables.formPassword.classList.add("input-error");
      regVariables.formConfirmPassword.classList.add("input-error");
      regVariables.errorPassword1.classList.add("error-message--active");
      regVariables.errorPassword2.classList.add("error-message--active");
      return false;
    } else {
      return true;
    }
  }

  validateMain() {
    if (
      this.checkEmptyInputs() &&
      this.validateEmail() &&
      this.validatePassword()
    )
      return true;
  }

  deleteInputValue() {
    [...regVariables.inputs].forEach((elem) => {
      elem.value = "";
    });
  }

  requestToServise() {
    const isValid = this.validateMain();

    // if (isValid || true) {
    console.log("all good");
    const formData = {
      name: regVariables.formName.value,
      email: regVariables.formEmail.value,
      password: regVariables.formPassword.value,
    };

    axios
      .post("/sign-up", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        // alert(response.data.message);
        window.location = "http://localhost:3000/singIn.html";
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

  checkToken() {}

  init = function () {
    console.log("=======нажала====");
    regVariables.btn.addEventListener("click", (e) => {
      e.preventDefault();

      this.requestToServise();
    });
  };
}

const singUp = new SignUp();
