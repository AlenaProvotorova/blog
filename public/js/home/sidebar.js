class Sidebar {
  constructor() {
    this.activeSidebar = 1;
  }

  getCurrentIdFromCookie() {
    const currentUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)CurrentUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return currentUserId;
  }

  showCurrentUsersPosts() {
    const id = sidebar.getCurrentIdFromCookie();

    const formAddPostData = {
      currentUserId: id,
    };

    axios
      .post("/currentUser", {
        currentUserId: formAddPostData.currentUserId,
      })
      .then(function (res) {
        if (res.data[0]) {
          post.deletePosts();
          blogVariables.postsList.append(post.createPostsFragment(res.data));
        } else {
          blogVariables.postsList.innerHTML = `<span class="note-emptyPostList">The list of posts is empty</span>`;
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  showAllPosts() {
    axios
      .get("/posts")
      .then(function (res) {
        if (res.data[0]) {
          post.deletePosts();
          blogVariables.postsList.append(post.createPostsFragment(res.data));
        } else {
          blogVariables.postsList.innerHTML = `<span class="note-emptyPostList">The list of posts is empty</span>`;
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }
}

Sidebar.state = {
  my: 0,
  all: 1,
};

const sidebar = new Sidebar();
