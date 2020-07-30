class Users {
  checkUserName() {
    axios
      .get("/users")
      .then(function (res) {
        const userName = res.data.name;
        blogVariables.headerLinkUsername.innerHTML = userName;
      })
      .catch();
  }

  listenSubscribe(isSubscribe, id) {
    isSubscribe.addEventListener("click", () => {
      const SubscribeId = sidebar.getCurrentIdFromCookie();
      const formAddPostData = {
        currentUserId: SubscribeId,
        personFollowId: id,
      };

      if (isSubscribe.classList.contains("far")) {
        isSubscribe.classList.remove("far");
        isSubscribe.classList.add("fas");

        axios
          .post("/subscription", {
            currentUserId: formAddPostData.currentUserId,
            personFollowId: formAddPostData.personFollowId,
          })
          .then((res) => {
            btns.showPopup("subscribed successfully");
            this.checkSubscribesAmount();
          })
          .catch((err) => {
            alert(err);
          });
      } else if (isSubscribe.classList.contains("fas")) {
        isSubscribe.classList.remove("fas");
        isSubscribe.classList.add("far");

        axios
          .post("/unsubscription", {
            personFollowId: formAddPostData.personFollowId,
          })
          .then((res) => {
            btns.showPopup("you unsubscribed");
            this.checkSubscribesAmount();
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  }

  createSearchUserItem({ id, name, is_follower }) {
    const newItem = post.createPostTemplate("div", "drop-down-menu__user");
    const userName = post.createPostTemplate("span", "hi", name);
    const isSubscribe = post.createPostTemplate("i", "far");
    isSubscribe.classList.add("fa-heart");

    if (is_follower) {
      isSubscribe.classList.remove("far");
      isSubscribe.classList.add("fas");
    }

    this.listenSubscribe(isSubscribe, id);

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

  deleteUsers() {
    [...blogVariables.dropDownMenuUser].forEach((elem) => {
      elem.remove();
    });
  }

  checkSubscribesAmount() {
    axios
      .get("/users/friendsAmount")
      .then((res) => {
        blogVariables.subscribesAmount.innerHTML = res.data.count;
      })
      .catch((err) => {
        alert(err);
      });
  }
}

const user = new Users();
