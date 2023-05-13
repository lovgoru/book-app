var input = document.getElementById("filter-input");
input.addEventListener("keyup", () => {
  var filterText = input.value.toLowerCase();

  var books = document.getElementsByClassName("basic-div");

  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var title = book.getElementsByTagName("p")[0].textContent.toLowerCase();
    var author = book.getElementsByTagName("p")[1].textContent.toLowerCase();

    if (title.includes(filterText) || author.includes(filterText)) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  }
});
