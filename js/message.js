function sendMail() {
  const message = document.getElementById("message").value.trim();
  const email = "ningenpaperpress@gmail.com"; // 받는 사람 이메일 주소
  const subject = "What happens if I press this?";
  const body = encodeURIComponent(message);

  if (!message) {
    alert("Please write a message before sending.");
    return;
  }

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailtoLink;
}
