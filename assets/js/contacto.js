(function() {
  const notificationEl = document.getElementById('notification');
  const nam = document.getElementById('name-input');
  const mail = document.getElementById('email-input');
  const msg = document.getElementById('message-input');

  //const url = 'https://clumsy-guineafowl.dev.with-datafire.io/contact';
  const url = 'https://f8fo8drpy3.execute-api.us-west-1.amazonaws.com/beta';
  let params = '';
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      notificationEl.classList.add('success');
      notificationEl.innerHTML = '¡Gracias! Tu mensaje ha sido enviado.';
      cleanForm();
    }
    else if (xhr.readyState == 4){
      notificationEl.classList.add('failure');
      notificationEl.innerHTML = 'Error ' + xhr.status;
      //xhr = new XMLHttpRequest();
    }
  }

  function clearForm() {
    nam.value = '';
    mail.value = '';
    msg.value = '';
  }

  function getParams() {
    return 'name=' + nam.value + '&emailAddress=' + mail.value + '&message=' + msg.value;
  }

  document.getElementById('submit-button').addEventListener('click', (e) => {
    //if (xhr.readyState == 4) xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    e.preventDefault();
    //let params = getParams();
    //console.log(params);
    xhr.send(params);
  }, false);

})();
