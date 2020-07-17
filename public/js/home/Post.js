class Post {
  construtor({ title, text, name, date }) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.date = date;
  }
}

Post.getPosts = function () {
  axios
    .get("/posts")
    .then(function (res) {
      Post.createPosts(res.data);
    })
    .catch(function (error) {
      alert(error);
    });
};

Post.clearUpPostInputs = function () {
  blogVariables.postTitle.value = "";
  blogVariables.postText.value = "";
};

Post.deletePosts = function () {
  [...blogVariables.postsOnPage].forEach((elem) => {
    elem.remove();
  });
};

Post.createPostMarkUp = function ({ title, text, userName, date }) {
  const newPost = document.createElement("div");
  newPost.classList.add("post-item");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post-item__title");
  postTitle.textContent = title;

  const postText = document.createElement("p");
  postText.classList.add("post-item__text");
  postText.textContent = text;

  const postUser = document.createElement("span");
  postUser.classList.add("post-item__user-name");
  postUser.textContent = userName;

  const postDate = document.createElement("span");
  postDate.classList.add("post-item__post-date");
  postDate.textContent = date;

  newPost.append(postTitle);
  newPost.append(postText);
  newPost.append(postUser);
  newPost.append(postDate);

  blogVariables.postsList.append(newPost);
};

Post.createPosts = function (arr) {
  arr.forEach((elem) => {
    const post = new Post(elem);
    Post.createPostMarkUp(post);
  });
};
