function sendMail() {
  var link = "mailto:ningenpaperpress@gmail.com"
           + "?cc="
           + "&subject=" + escape("")
           + "&body=" + escape(document.getElementById('message').value)
  ;

  window.location.href = link;
}