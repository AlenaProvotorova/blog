function Controller() {
  this.currentUser = 1;
}

Controller.init = function () {
  blogVariables.myPosts.addEventListener("click", Post.getPosts());
  blogVariables.myPosts.addEventListener(
    "click",
    Sidebar.showCurrentUsersPosts
  );
  blogVariables.allPosts.addEventListener("click", Sidebar.showAllPosts);
};

var AppController = new Controller();
