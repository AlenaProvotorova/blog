class Post {
  getPosts() {
    axios
      .get("/posts")
      .then(function (res) {
        this.createPosts(res.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  clearUpPostInputs() {
    blogVariables.postTitle.value = "";
    blogVariables.postText.value = "";
  }

  deletePosts() {
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

  createPostItem = function ({ title, post_text, userName, date }) {
    const newPost = this.createPostTemplate("div", "post-item");
    const postTitle = this.createPostTemplate("h2", "post-item__title", title);
    const postText = this.createPostTemplate("p", "post-item__text", post_text);
    const postUser = this.createPostTemplate(
      "span",
      "post-item__user-name",
      "namename"
    );
    const postDate = this.createPostTemplate(
      "span",
      "post-item__post-date",
      date
    );

    newPost.append(postTitle);
    newPost.append(postText);
    newPost.append(postUser);
    newPost.append(postDate);

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
        console.log("===========", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }
}

const post = new Post();
