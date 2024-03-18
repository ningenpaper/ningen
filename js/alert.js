function alert() {
  var txt;
  if (confirm("Under Construction. Will let you know when it's ready.")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  document.getElementById("demo").innerHTML = txt;
}