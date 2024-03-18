function addComment(event) {
  event.preventDefault();
  var commentInput = event.target.querySelector("input");
  var commentText = commentInput.value;
  var date = new Date().toLocaleString();

  var commentDiv = document.createElement("div");
  commentDiv.className = "card my-3";
  commentDiv.innerHTML = `
    <div class="card-body">
      <p class="card-text">${commentText}</p>
      <p class="card-text"><small class="text-muted">${date}</small></p>
    </div>
  `;

  var commentsDiv = event.target.parentNode.querySelector(".comments");
  commentsDiv.insertBefore(commentDiv, commentsDiv.firstChild);

  commentInput.value = "";
}