/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const validateForm = (event) => {
  event.preventDefault();
  const form = document.getElementById('createProduct');
  let count = 0;
  for (let i = 0; i < form.length; i++) {
    if (form.elements[i].type === 'text') {
      if (form.elements[i].value === '') count += 1;
    }
  }
  if (count === 0) {
    form.submit();
  }
};

const toggleField = (fieldId, isDisplayed, message, type) => {
  const field = document.getElementById(fieldId);
  if (!isDisplayed) {
    field.style.display = 'none';
  } else field.style.display = 'block';
  field.innerHTML = message;
  field.classList.add(type);
};

const validateField = (event) => {
  const fieldId = `${event.target.name}-error`;
  if (event.target.value === '') {
    toggleField(fieldId, true, `${event.target.name} is missing.`, 'is-danger');
  } else {
    toggleField(fieldId, false, null, null);
  }
};

const toggleModal = () => {
  const modal = document.getElementById('delete');
  const styles = modal.className.split(' ');
  if (styles.indexOf('is-active') === -1) {
    modal.classList.add('is-active');
  } else {
    modal.classList.remove('is-active');
  }
};

const showModal = (event, id, title) => {
  toggleModal();
  document.getElementById(`${title}Id`).value = id;
  event.preventDefault();
};

const removeResource = (title) => {
  const resourceId = document.getElementById(`${title}Id`).value;
  const method = {
    method: 'DELETE',
  };
  fetch(`/${title}s/${resourceId}`, method)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `/${title}s`;
    }).catch((err) => console.log(err));
};
