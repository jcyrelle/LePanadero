document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     Hover animation
  =============================== */
  const buttons = document.querySelectorAll("button, a");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "all 0.3s ease";
    });
  });

  /* ===============================
     Section reveal (safe)
  =============================== */
  const sections = document.querySelectorAll(".section");

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* ===============================
     Eye toggle (signup + login)
  =============================== */
  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.dataset.target);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  /* ===============================
     Signup: confirm password check
  =============================== */
  const form = document.querySelector(".auth-form");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const errorText = document.getElementById("password-error");

  if (form && password && confirmPassword && errorText) {
    form.addEventListener("submit", (e) => {
      if (password.value !== confirmPassword.value) {
        e.preventDefault();
        errorText.style.display = "block";
        confirmPassword.focus();
      } else {
        errorText.style.display = "none";
      }
    });
  }

  /* ===============================
     Login error handling
  =============================== */
  const loginErrorBox = document.getElementById("login-error");

  if (loginErrorBox) {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "wrongpass") {
      loginErrorBox.textContent = "Incorrect password. Please try again.";
      loginErrorBox.style.display = "block";
    }

    if (error === "nouser") {
      loginErrorBox.textContent = "No account found with this email.";
      loginErrorBox.style.display = "block";
    }
  }

});
