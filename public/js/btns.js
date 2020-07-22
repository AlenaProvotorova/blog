class Btns {
  changeSearchInput(topBtnStyle, unactiveCl, activeCl) {
    blogVariables.searchFriendsBtn.style.display = topBtnStyle;
    blogVariables.searchActive.classList.remove(unactiveCl);
    blogVariables.searchActive.classList.add(activeCl);
  }
}

const btns = new Btns();

blogVariables.searchInput.addEventListener("input", () => {
  const inputData = {
    inputdata: blogVariables.searchInput.value,
  };

  axios
    .post("/search", {
      input: inputData.inputdata,
    })
    .then(function (res) {
      blogVariables.dropDownMenu.append(user.createUserFragment(res.data));
    })
    .catch(function (error) {
      alert(error);
    });
});
