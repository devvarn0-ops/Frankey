function continueToPanel() {
  const dashboard = document.getElementById("dashboard");

  dashboard.classList.add("active");

  setTimeout(() => {
    dashboard.scrollIntoView({
      behavior: "smooth"
    });
  }, 100);
}

function showMessage(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
    }
