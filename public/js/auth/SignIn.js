class SignIn {
  clearUp(input) {
    input.classList.remove("input-error");
  }

  validateAll(input) {
    if (!input.value) {
      input.classList.add("input-error");
      return false;
    }
    return true;
  }

  validateEmail() {
    const pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
    if (pattern.test(authVariables.formEmail.value) == false) {
      authVariables.formEmail.classList.add("input-error");
      return false;
    }
    return true;
  }

  validatePassword() {
    if (authVariables.formPassword.value === "") {
      authVariables.formPassword.classList.add("input-error");
      return false;
    } else {
      return true;
    }
  }

  validateMain() {
    if (
      this.validateAll(authVariables.formEmail) &&
      this.validateAll(authVariables.formPassword) &&
      this.validateEmail() &&
      this.validatePassword()
    ) {
      return true;
    }
  }

  requestToServise() {
    if (this.validateMain() === true) {
      const formData = {
        email: authVariables.formEmail.value,
        password: authVariables.formPassword.value,
      };

      axios
        .post("/sign-in", {
          email: formData.email,
          password: formData.password,
        })
        .then(function (response) {
          window.location = "http://localhost:3000/home";

          const currentUserId = response.data.userId;
          document.cookie = `CurrentUserId = ${currentUserId}`;
        })

        .catch(function (error) {
          alert("Неправильно введен логин или пароль");
        });
    } else {
      console.log("плохо");
    }
  }

  init = function () {
    authVariables.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.requestToServise();
    });
  };
}

const signIn = new SignIn();
