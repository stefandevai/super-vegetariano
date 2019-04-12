(function() {
  const notificationEl = document.getElementById('notification');
  const nam = document.getElementById('name-input');
  const mail = document.getElementById('email-input');
  const msg = document.getElementById('message-input');

  const url = 'https://cmng71if45.execute-api.us-west-2.amazonaws.com/beta';
  let params = '';
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      notificationEl.classList.add('success');
      notificationEl.innerHTML = '¡Gracias! Tu mensaje ha sido enviado.';
      clearForm();

      setTimeout(() => {
        notificationEl.style.opacity = "0";
        notificationEl.style.height = "0";
      }, 3000);
    }
    else if (xhr.readyState == 4){
      notificationEl.classList.add('failure');
      notificationEl.innerHTML = 'Error ' + xhr.status;
    }
  }

  function clearForm() {
    nam.value = '';
    mail.value = '';
    msg.value = '';
  }

  function validateInputs() {
    nam.checkValidity();
    mail.checkValidity();
    msg.checkValidity();

    return nam.reportValidity() && mail.reportValidity() && msg.reportValidity();
  }

  function getParams() {
    return {
      name: nam.value,
      email: mail.value,
      message: msg.value,
    };
  }

  document.getElementById('submit-button').addEventListener('click', (e) => {
    e.preventDefault();
    if (validateInputs()) {
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      let data = getParams();
      xhr.send(JSON.stringify(data));
    }
  }, false);

})();
