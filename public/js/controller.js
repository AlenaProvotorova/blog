class Controller {
  constructor() {
    this.currentUser = 1;
  }

  init() {
    blogVariables.myPosts.addEventListener(
      "click",
      sidebar.showCurrentUsersPosts
    );

    blogVariables.allPosts.addEventListener("click", sidebar.showAllPosts);

    blogVariables.linkaddPost.addEventListener("click", () => {
      blogVariables.modalAddPost.classList.add("modal_add-post--active");
      blogVariables.addPostMain.classList.add("add-post__main--active");
    });

    blogVariables.modalCloseIcon.addEventListener("click", () => {
      blogVariables.modalAddPost.classList.remove("modal_add-post--active");
      blogVariables.addPostMain.classList.remove("add-post__main--active");
    });

    blogVariables.puplishBtn.addEventListener("click", (e) => {
      e.preventDefault();
      post.addPostInDB().then(() => {
        blogVariables.modalAddPost.classList.remove("modal_add-post--active");
        post.clearUpPostInputs();
        post.deletePost();
        post.getPosts();
      });
    });

    blogVariables.searchFriendsBtn.addEventListener("click", function () {
      btns.changeSearchInput("none", "search--unactive", "search--active");
    });

    blogVariables.searchDeleteBtn.addEventListener("click", function () {
      btns.clearSearchField();
    });

    blogVariables.headerLinkUsername.addEventListener("click", function () {
      blogVariables.userMenu.classList.toggle("user-menu--active");
    });

    blogVariables.btnLeaveBlog.addEventListener("click", function () {
      document.cookie =
        "CurrentUserId=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = "token=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      window.location = "http://localhost:3000/singIn.html";
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      const check = target.closest(".block-search");

      if (!check) {
        btns.clearSearchField();
      }
    });

    +sidebar.activeSidebar === 0
      ? sidebar.showCurrentUsersPosts()
      : sidebar.showAllPosts();

    btns.sendInputRequest();
    user.checkUserName();
    user.checkSubscribesAmount();
    post.checkPostsAmount();
  }
}

var AppController = new Controller();
