/*
  Entry script for index.html
  ---
  Handles the onboarding form and redirects to the assessment page.
*/

const redirectToEvaluation = () => {
  window.location.href = 'avaliacao.html';
};

const saveUserData = (payload) => {
  if (!payload.name || !payload.email || !payload.city) {
    return false;
  }

  return saveUserProfile(payload);
};

const handleUserForm = () => {
  const form = document.getElementById('user-intake-form');
  if (!form) {
    return;
  }

  const errorEl = document.getElementById('user-form-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      city: formData.get('city')?.trim()
    };

    if (!payload.name || !payload.email || !payload.city) {
      if (errorEl) {
        errorEl.textContent = 'Informe nome, email e cidade para continuar.';
      }
      return;
    }

    const isSaved = saveUserData(payload);
    if (!isSaved) {
      if (errorEl) {
        errorEl.textContent = 'Não foi possível salvar seus dados no momento.';
      }
      return;
    }

    redirectToEvaluation();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  handleUserForm();
});
