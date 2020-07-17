function Sidebar() {
  this.activeSidebar = 1;
}

Sidebar.state = {
  my: 0,
  all: 1,
};

Sidebar.publishPost = function () {
  blogVariables.puplishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    requestToAddPost().then(() => {
      blogVariables.modalAddPost.classList.remove("modal_add-post--active");
      Post.deleteNewPostInput();
      Post.deletePost();
      Post.getPosts();
    });
  });
};

Sidebar.showCurrentUsersPosts = function () {
  console.log("=======priveeet====");
  const currentUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)currentUserId\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const formAddPostData = {
    currentUserId: currentUserId,
  };

  axios
    .post("/currentUser", {
      currentUserId: formAddPostData.currentUserId,
    })
    .then(function (res) {
      Post.deletePostsOnPage();
      Post.createPostsFromArray(res.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};

Sidebar.showAllPosts = function () {
  axios
    .get("/allPost")
    .then(function (res) {
      Post.deletePostsOnPage();
      Post.createPostsFromArray(res.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
