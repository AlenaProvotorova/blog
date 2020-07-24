class Btns {
  changeSearchInput(topBtnStyle, unactiveCl, activeCl) {
    blogVariables.searchFriendsBtn.style.display = topBtnStyle;
    blogVariables.searchActive.classList.remove(unactiveCl);
    blogVariables.searchActive.classList.add(activeCl);
  }

  clearSearchInput() {
    blogVariables.dropDownMenu.classList.remove("drop-down-menu--active");
    blogVariables.searchInput.value = "";
  }

  showPopup(text) {
    blogVariables.popupSuccsess.classList.add("popup-succsess--active");
    blogVariables.popupSuccsess.innerHTML = `<div class="popup-text">${text}</div>`;
    setTimeout(() => {
      blogVariables.popupSuccsess.classList.remove("popup-succsess--active");
    }, 1500);
  }

  sendInputRequest() {
    blogVariables.searchInput.addEventListener("input", () => {
      const currentUserId = sidebar.getCurrentIdFromCookie();

      const inputData = {
        inputdata: blogVariables.searchInput.value,
        currentUserId: currentUserId,
      };

      if (blogVariables.searchInput.value !== "") {
        axios
          .get("/search", {
            params: {
              input: inputData.inputdata,
              id: inputData.currentUserId,
            },
          })
          .then(function (res) {
            if (res.data[0]) {
              user.deleteUsers();
              blogVariables.dropDownMenu.innerHTML = "";
              blogVariables.dropDownMenu.classList.add(
                "drop-down-menu--active"
              );
              blogVariables.dropDownMenu.append(
                user.createUserFragment(res.data)
              );
            } else {
              console.log("=======нет совпадений====");
              blogVariables.dropDownMenu.classList.add(
                "drop-down-menu--active"
              );
              blogVariables.dropDownMenu.innerHTML = `<span>no result</span>`;
            }
          })
          .catch(function (error) {
            alert(error);
          });
      } else {
        user.deleteUsers();
        blogVariables.dropDownMenu.classList.remove("drop-down-menu--active");
      }
    });
  }
}

const btns = new Btns();
