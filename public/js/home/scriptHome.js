blogVariables.linkaddPost.addEventListener("click", () => {
  blogVariables.modalAddPost.classList.add("modal_add-post--active");
});

blogVariables.modalCloseIcon.addEventListener("click", () => {
  blogVariables.modalAddPost.classList.remove("modal_add-post--active");
});

function requestToAddPost() {
  const currentUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)currentUserId\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  console.log("=====currentUserId======", currentUserId);

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

Sidebar.publishPost();
