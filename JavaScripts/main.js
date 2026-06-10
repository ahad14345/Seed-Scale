const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginState = {
  emailInput: document.getElementById('email'),
  passwordInput: document.getElementById('password'),
  emailError: document.getElementById('emailError'),
  passwordError: document.getElementById('passwordError'),
  submitMessage: document.getElementById('submitMessage'),
  togglePasswordButton: document.getElementById('togglePassword')
};

const signupState = {
  nameInput: document.getElementById('fullName'),
  emailInput: document.getElementById('signupEmail'),
  passwordInput: document.getElementById('signupPassword'),
  confirmInput: document.getElementById('confirmPassword'),
  nameError: document.getElementById('nameError'),
  emailError: document.getElementById('signupEmailError'),
  passwordError: document.getElementById('signupPasswordError'),
  confirmError: document.getElementById('confirmPasswordError'),
  submitMessage: document.getElementById('signupMessage')
};

const VALID_USER = {
  email: 'user@seedandscale.com',
  password: 'Grow2026!'
};

function showError(element, message) {
  if (element) {
    element.textContent = message;
  }
}

function clearErrors(state) {
  if (!state) return;
  Object.keys(state).forEach(key => {
    if (key.includes('Error') || key === 'submitMessage') {
      const element = state[key];
      if (element) {
        element.textContent = '';
      }
    }
  });
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(value) {
  return value.length >= 8;
}

function updateMessage(element, message, isSuccess = false) {
  if (!element) return;
  element.textContent = message;
  element.style.color = isSuccess ? '#86efac' : '#fda4af';
}

if (loginForm && loginState.emailInput && loginState.passwordInput) {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors(loginState);

    const email = loginState.emailInput.value.trim();
    const password = loginState.passwordInput.value.trim();
    let hasError = false;

    if (!email) {
      showError(loginState.emailError, 'Please enter your email address.');
      hasError = true;
    } else if (!validateEmail(email)) {
      showError(loginState.emailError, 'Enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      showError(loginState.passwordError, 'Please enter your password.');
      hasError = true;
    } else if (!validatePassword(password)) {
      showError(loginState.passwordError, 'Password must be at least 8 characters.');
      hasError = true;
    }

    if (hasError) {
      updateMessage(loginState.submitMessage, 'Check the highlighted fields and try again.');
      return;
    }

    if (email === VALID_USER.email && password === VALID_USER.password) {
      updateMessage(loginState.submitMessage, 'Login successful! Redirecting...', true);
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1100);
      return;
    }

    updateMessage(loginState.submitMessage, 'Email or password is incorrect.');
  });

  if (loginState.togglePasswordButton) {
    loginState.togglePasswordButton.addEventListener('click', () => {
      const isHidden = loginState.passwordInput.type === 'password';
      loginState.passwordInput.type = isHidden ? 'text' : 'password';
      loginState.togglePasswordButton.textContent = isHidden ? 'Hide' : 'Show';
    });
  }

  if (loginState.emailInput) {
    loginState.emailInput.addEventListener('input', () => {
      if (loginState.emailError && loginState.emailError.textContent) {
        validateEmail(loginState.emailInput.value) ? showError(loginState.emailError, '') : null;
      }
    });
  }

  if (loginState.passwordInput) {
    loginState.passwordInput.addEventListener('input', () => {
      if (loginState.passwordError && loginState.passwordError.textContent) {
        validatePassword(loginState.passwordInput.value) ? showError(loginState.passwordError, '') : null;
      }
    });
  }
}

if (signupForm && signupState.nameInput && signupState.emailInput && signupState.passwordInput && signupState.confirmInput) {
  signupForm.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors(signupState);

    const fullName = signupState.nameInput.value.trim();
    const email = signupState.emailInput.value.trim();
    const password = signupState.passwordInput.value.trim();
    const confirmPassword = signupState.confirmInput.value.trim();
    let hasError = false;

    if (!fullName) {
      showError(signupState.nameError, 'Please enter your full name.');
      hasError = true;
    }

    if (!email) {
      showError(signupState.emailError, 'Please enter your email address.');
      hasError = true;
    } else if (!validateEmail(email)) {
      showError(signupState.emailError, 'Enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      showError(signupState.passwordError, 'Please create a password.');
      hasError = true;
    } else if (!validatePassword(password)) {
      showError(signupState.passwordError, 'Password must be at least 8 characters.');
      hasError = true;
    }

    if (!confirmPassword) {
      showError(signupState.confirmError, 'Please confirm your password.');
      hasError = true;
    } else if (password !== confirmPassword) {
      showError(signupState.confirmError, 'Passwords do not match.');
      hasError = true;
    }

    if (hasError) {
      updateMessage(signupState.submitMessage, 'Fix the errors above before continuing.');
      return;
    }

    updateMessage(signupState.submitMessage, 'Account created! Redirecting to login...', true);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });

  signupState.nameInput.addEventListener('input', () => {
    if (signupState.nameError && signupState.nameError.textContent) {
      signupState.nameInput.value ? showError(signupState.nameError, '') : null;
    }
  });

  signupState.emailInput.addEventListener('input', () => {
    if (signupState.emailError && signupState.emailError.textContent) {
      validateEmail(signupState.emailInput.value) ? showError(signupState.emailError, '') : null;
    }
  });

  signupState.passwordInput.addEventListener('input', () => {
    if (signupState.passwordError && signupState.passwordError.textContent) {
      validatePassword(signupState.passwordInput.value) ? showError(signupState.passwordError, '') : null;
    }
  });

  signupState.confirmInput.addEventListener('input', () => {
    if (signupState.confirmError && signupState.confirmError.textContent) {
      signupState.passwordInput.value === signupState.confirmInput.value
        ? showError(signupState.confirmError, '')
        : null;
    }
  });
}
