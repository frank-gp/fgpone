/***
    
    <!-- contact component... -->

    <!-- <link rel="stylesheet" href="https://frankgp.com/icon/icomoon/style.css" /> -->
    
    
    <section class="contact"></section>
    <script src="https://frankgp.com/component/contact.js" defer></script>


    <!-- contact component... -->

 ***/

var classContact = document.querySelector(".contact");

if (classContact) {
  ContactFunction();
}

function ContactFunction() {
  // ========== DOM... ==========
  let section_contact = document.querySelector(".contact");

  let contact_css = /* css */ `/* contact-css */
        .contact {
          --color-1: #80f;
          --color-2: #aaa;
          --color-white: #fff;
          --color-black: #555;
          background-color: var(--color-white);
          padding: 2em;
          border-radius: 0.3em;
          max-width: 35em;
          margin: 10vh auto;
          border: thin solid var(--color-2);
        }
        .contact * {
          box-sizing: border-box;
          color: var(--color-2);
          border-radius: 0.3em;
        }
        .contact hr {
          border: none;
          border-bottom: thin solid var(--color-2);
          margin: 1em 0;
        }
        .contact h2 {
          color: var(--color-black);
        }
        .contact :is(aside, textarea) {
          position: relative;
          margin-top: 0.5em;
        }
        .contact :is(.data input, textarea) {
          width: 100%;
          padding: 1em 3em;
          outline: none;
          border: thin solid var(--color-2);
          font-family: inherit;
        }
        .contact :is(.data input, textarea)::placeholder {
          color: inherit;
        }
        .contact :is(.data input, textarea):focus {
          border: thin solid var(--color-1);
          color: var(--color-1);
        }
        .contact :is(.data input, textarea):focus ~ i {
          color: var(--color-1);
        }
        .contact textarea {
          min-width: 100%;
          max-width: 100%;
          min-height: 15em;
        }
        .contact i {
          position: absolute;
          left: 1em;
          top: 50%;
          transform: translateY(-50%);
        }
        .contact .message i {
          top: 2em;
        }
        .contact .btn-contact {
          border: none;
          padding: 1em 3em;
          background-color: var(--color-1);
          color: var(--color-white);
          position: relative;
        }
        .contact .btn-contact i {
          font-size: 1.1rem;
        }
        .contact .btn-contact:hover:enabled {
          opacity: 0.8;
          cursor: pointer;
        }
        .contact .btn-contact i {
          color: inherit;
        }
        .contact .btn-area label {
          color: var(--color-black);
          cursor: pointer;
        }
        .btn-contact:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* @media desktop... */
        @media (min-width: 50rem) {
          .contact .data {
            display: flex;
            gap: 1em;
          }
          .contact aside {
            flex: 1 1 auto;
          }
          .contact .btn-area {
            display: flex;
            align-items: center;
          }
          .contact .btn-area aside {
            flex: 0 1 auto;
          }
          .contact .btn-area label {
            margin-left: 2em;
          }
        }
        /* @media desktop. */
        
        /* @media mobile... */
        @media (max-width: 50rem) {
          .contact {
            text-align: center;
          }
          .contact .btn-area button {
            margin: 1em;
          }
        }
        /* @media mobile. */
        
        @keyframes fadeInOut {
          50% {
            opacity: .2;
          }
        }
        
        .loadingMessage {
          animation: fadeInOut 1s infinite;
        }
        `;
  let style_contact = document.createElement("style");
  style_contact.innerHTML = contact_css;
  section_contact.insertAdjacentElement("beforebegin", style_contact);

  let contact_html = /* html */ `<h1>Contact Form</h1>
    <form id="contactForm">
      <section class="data">
        <aside>
          <input type="text" placeholder="Enter your name" name="name" id="name" required />
          <i class="icon-user"></i>
        </aside>
    
        <aside>
          <input type="email" placeholder="Enter your email" name="email" id="email" required />
          <i class="icon-mail"></i>
        </aside>
      </section>
      <section class="message">
        <aside>
          <textarea placeholder="Write your message" name="message" id="message" required></textarea>
          <i class="icon-message"></i>
        </aside>
      </section>
      <section class="btn-area">
        <aside>
          <button class="btn-contact" type="submit" onclick="submitForm()" disabled><i class="icon-send"></i> Send Message</button>
        </aside>
        <aside>
          <label>
            <input type="checkbox" name="form_checkbox" value="checkbox_value" required disabled />
            I'm not a Robot
          </label>
        </aside>
      </section>
    </form>
    <section id="confirmationMessage" style="display: none">
      <br />
      <p>✅ Your form was submitted successfully! 📩</p>
      <br />
      <div class="btn" onclick="reloadPage()">⬅️ Reload Page</div>
    </section>
    `;

  section_contact.innerHTML = contact_html;
  // ========== DOM. ==========

  // ========== No Robot... ==========
  document.querySelector("input[type=checkbox]").value = location.href;

  let textarea = document.querySelector(".contact textarea");
  let submit = document.querySelector(".contact .btn-contact");
  let checkbox = document.querySelector(".contact input[type=checkbox]");

  // submitEnable = () => submit.removeAttribute("disabled", "");

  submitEnable = () => {
    if (checkbox.checked) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", "disabled");
    }
  };

  enableCheckbox = () => checkbox.removeAttribute("disabled", "");

  textarea.addEventListener("mousemove", enableCheckbox);
  checkbox.addEventListener("change", submitEnable);

  textarea.oninput = function () {
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px";
  };
  // ========== No Robot. ==========
}

// Function to validate form and enable/disable submit button
function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Simple validation for name (non-empty)
  if (!name.trim()) {
    alert("Please enter your name.");
    return false;
  }

  // Simple validation for email (non-empty and valid format)
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim() || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Simple validation for message (non-empty)
  if (!message.trim()) {
    alert("Please enter your message.");
    return false;
  }

  return true;
}

function submitForm() {
  // Validate the form before submitting
  if (!validateForm()) {
    return;
  }

  // Disable the button and show loading message
  var submitButton = document.getElementById("contactForm").querySelector("button");
  submitButton.disabled = true;
  submitButton.innerHTML = "Submitting...";
  submitButton.classList.add("loadingMessage");

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // You can add additional validation here if needed

  var formData = {
    name: name,
    email: email,
    message: message,
    currentUrl: window.location.href, // Add current URL to formData
  };
  var url = "http://localhost:3000/contact/submit";
    // var url = "https://fgp.one/contact/submit";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("contactForm").style.display = "none";
        document.getElementById("confirmationMessage").style.display = "block";
        document.querySelector(".btn-contact").innerHTML = "Send Message";
      } else {
        alert("An error occurred while submitting the form.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    })
    .finally(() => {
      // Re-enable the button and hide loading message
      submitButton.disabled = false;
    });
}

function reloadPage() {
  // Use the location.reload() method to reload the page
  location.reload();
}
