IMask(document.querySelector('.request__telephone'), {
  mask: '+{7} (000) 000-00-00',
  lazy: true
});


const form = document.querySelector('.request__form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const target = e.target;
  let error = false;

  for(let i = 0; i < target.length; i++) {
    const input = target[i];

    if(input.type === 'text') {

      if( input.value === '' || (input.name === 'telephone' && input.value.length !==  18)) {
        input.classList.add('request__input--error');
        error = true;
      } else if (input.classList.contains('request__input--error')) {
        input.classList.remove('request__input--error');
      }
    }
  }

  if(error)return;
  const data = {
    name:e.target.name.value,
    telephone:e.target.telephone.value,
  }
  fetch("sendmail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      target.reset()
    }
  });
})