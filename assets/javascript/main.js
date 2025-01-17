function moveSide(buttonId) {
  let cardLogin = document.getElementById('card-login') 
  let cardInfoLogin = document.getElementById('card-info-login')
  let cardInfoSingup = document.getElementById('card-info-singup')

  if (buttonId === 'singup') {
    cardLogin.style.left = '50%'
    cardInfoLogin.style.display = 'none'
    cardInfoSingup.style.display = 'block'
  } else if (buttonId === 'login') {
    cardLogin.style.left = '50px'
    cardInfoLogin.style.display = 'block'
    cardInfoSingup.style.display = 'none'
  }
}

class ValidForm {
  constructor(form) { //O construtor recebe como argumento um formulário específico e
    this.form = form; //armazena na propriedade this.form
    this.events();
  }

  events() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.form.querySelectorAll('.validate').forEach((field) => {
      field.addEventListener('input', () => this.removeErrorOnInput(field));
    });
  }

  handleSubmit(e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    const validFields = this.fieldAreValid(); // Verifica se os campos são válidos
    if (validFields) {
      alert('Formulário enviado com sucesso!');
    }
  }

  fieldAreValid() {
    let valid = true;

    this.form.querySelectorAll('.error-text').forEach((error) => error.remove());

    this.form.querySelectorAll('.validate').forEach((field) => {
      const label = field.closest('.form-floating').querySelector('label').innerText;
      /*Validação nome*/
      if (!field.value) {
        this.creatError(field, `Campo ${label} não pode estar em branco.`);
        valid = false;
      }
      /*Validação email*/
      if (field.classList.contains('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        this.creatError(field, `Campo ${label} deve ser um e-mail válido.`);
        valid = false;
      }
      /*Validação senha*/
      if (field.value.length < 6) {
        this.creatError(field, `Campo ${label} deve ter no mínimo 6 caracteres.`);
        valid = false;
      }

    });

    return valid;
  }

  creatError(field, msg) {
    if (field.nextElementSibling?.classList.contains('error-text')) return;

    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }

  removeErrorOnInput(field) {
    const error = field.nextElementSibling;
    if (field.value && error?.classList.contains('error-text')) {
      error.remove();
    }
  }
}

// Instanciar para cada formulário
const loginForm = document.querySelector('#card-info-login .form');
const signupForm = document.querySelector('#card-info-singup .form');

new ValidForm(loginForm);
new ValidForm(signupForm);