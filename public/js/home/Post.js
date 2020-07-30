class Post {
  clearUpPostInputs() {
    blogVariables.postTitle.value = "";
    blogVariables.postText.value = "";
  }

  deletePosts() {
    btns.clearSearchInput();
    btns.changeSearchInput("flex", "search--active", "search--unactive");
    blogVariables.postsList.innerHTML = "";
    [...blogVariables.postsOnPage].forEach((elem) => {
      elem.remove();
    });
  }

  createPostTemplate(tag, clName, text) {
    const elem = document.createElement(tag);
    elem.classList.add(clName);
    elem.textContent = text;

    return elem;
  }

  createPostItem = function ({ title, post_text, name, date }) {
    const newPost = this.createPostTemplate("div", "post-item");
    const postTitle = this.createPostTemplate("h2", "post-item__title", title);
    const postText = this.createPostTemplate("p", "post-item__text", post_text);
    const userInfo = this.createPostTemplate("div", "user-info");
    const postUser = this.createPostTemplate(
      "span",
      "post-item__user-name",
      name
    );
    const calendarIcon = this.createPostTemplate("i", "far");
    calendarIcon.classList.add("fa-calendar-alt");

    const postDate = this.createPostTemplate(
      "span",
      "post-item__post-date",
      date
    );

    newPost.append(postTitle);
    newPost.append(postText);
    userInfo.append(postUser);
    userInfo.append(calendarIcon);
    userInfo.append(postDate);
    newPost.append(userInfo);

    return newPost;
  };

  createPostsFragment(arr) {
    const fragment = new DocumentFragment();
    arr.forEach((elem) => {
      fragment.prepend(this.createPostItem(elem));
    });

    return fragment;
  }

  addPostInDB() {
    const currentUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)CurrentUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    const formAddPostData = {
      title: blogVariables.postTitle.value,
      postText: blogVariables.postText.value,
      currentUserId: currentUserId,
    };

    return axios
      .post("/posts", {
        title: formAddPostData.title,
        postText: formAddPostData.postText,
        currentUserId: formAddPostData.currentUserId,
      })
      .then(function (res) {
        btns.showPopup("post published successfully");
        sidebar.showCurrentUsersPosts();
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  checkPostsAmount() {
    axios
      .get("/posts/amount")
      .then((res) => {
        blogVariables.postsAmount.innerHTML = res.data.count;
      })
      .catch((err) => {
        alert(err);
      });
  }
}

const post = new Post();
