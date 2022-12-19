// variables
let userNameInput = document.querySelector('#username');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');
let confirmPasswordInput = document.querySelector('#confirm-password');
let form = document.querySelector('form');
let alerts = document.querySelectorAll('.alert');

// functions
// validation
function validateUserName() {
  let alert = document.querySelector('.username + .alert');
  alert.textContent = '';
  let username = userNameInput.value;
  if (username.length < 5 || username.length > 15) {
    alert.textContent = 'Username must consist of 5 to 15 characters';
  }
  if (/\W/.test(username) || /_/.test(username)) {
    alert.textContent = 'only letters and numbers are allowed';
  }
  if (/^\d|\d$/.test(username)) {
    alert.textContent = 'numbers at the beginning or the end are not allowed';
  }
}

function validateEmail() {
  let alert = document.querySelector('.email + .alert');
  alert.textContent = '';
  let email = emailInput.value;
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    alert.textContent = 'email is not valid';
  }
}

function validatePassword() {
  let alert = document.querySelector('.password + .alert');
  alert.textContent = '';
  let password = passwordInput.value;
  if (password.length < 8) {
    alert.textContent = 'Password must be at least 8 characters';
  }
}

function validateConfirmPassword() {
  let alert = document.querySelector('.confirm-password + .alert');
  alert.textContent = '';
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    alert.textContent = 'passwords should be the same';
  }
}

// handler
function handleSubmit(e) {
  e.preventDefault();
  validateUserName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  for (const alert of alerts) {
    if (alert.textContent !== '') {
      return;
    }
  }

  let data = {
    username: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    password_confirmation: confirmPasswordInput.value,
  };

  JSON.stringify(data);

  fetch('https://goldblv.com/api/hiring/tasks/register', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      window.location.href = 'succeed.html';
      localStorage.setItem("email", JSON.stringify(emailInput.value))
    })
    .catch((err) => {
      alert('something wrong happened');
    });
}

// event listeners
userNameInput.addEventListener('change', validateUserName);
emailInput.addEventListener('change', validateEmail);
passwordInput.addEventListener('change', validatePassword);
confirmPasswordInput.addEventListener('change', validateConfirmPassword);

form.addEventListener('submit', handleSubmit);
