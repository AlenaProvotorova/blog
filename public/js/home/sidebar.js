class Sidebar {
  constructor() {
    //получить из локал сторедж
    this.activeSidebar = localStorage.getItem("activeSidebar");
  }

  getCurrentIdFromCookie() {
    const currentUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)CurrentUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return currentUserId;
  }

  saveInLocalStorage(name, num) {
    localStorage.setItem(name, num);
  }

  deleteClass(arr, className) {
    [...arr].forEach((elem) => {
      elem.classList.remove(className);
    });
  }

  addClass(elem, className) {
    elem.classList.add(className);
  }

  checkLinkStyle(elem) {
    sidebar.deleteClass(blogVariables.headerLinkPosts, "header-link__posts");
    sidebar.addClass(elem, "header-link__posts");
  }

  showCurrentUsersPosts() {
    sidebar.checkLinkStyle(blogVariables.myPosts);
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
          sidebar.saveInLocalStorage("activeSidebar", 0);
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
    sidebar.checkLinkStyle(blogVariables.allPosts);
    axios
      .get("/posts")
      .then(function (res) {
        if (res.data[0]) {
          post.deletePosts();
          blogVariables.postsList.append(post.createPostsFragment(res.data));
          sidebar.saveInLocalStorage("activeSidebar", 1);
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

const sidebar = new Sidebar();
