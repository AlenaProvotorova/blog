class Users {
  checkUserName() {
    const id = sidebar.getCurrentIdFromCookie();
    const userData = {
      currentUserId: id,
    };
    axios
      .post("/user", {
        currentUserId: userData.currentUserId,
      })
      .then(function (res) {
        const userName = res.data.name;

        console.log("===========", res.data);
        blogVariables.headerLinkUsername.innerHTML = userName;
      })
      .catch();
  }

  createSearchUserItem() {
    const newItem = post.createPostTemplate("div", "drop-down-menu__user");
    const userName = post.createPostTemplate("span");
    const isSubscribe = post.createPostTemplate("i", "far fa-heart");

    newItem.append(userName);
    newItem.append(isSubscribe);

    return newItem;
  }

  createUserFragment(arr) {
    const fragment = new DocumentFragment();
    arr.forEach((elem) => {
      fragment.prepend(this.createSearchUserItem(elem));
    });
    return fragment;
  }
}

const user = new Users();
