/* codear la calculadora */

//CONSIGO TODAS LAS TECLAS Y EL DISPLAY
let teclas = document.querySelectorAll('.tecla');
let display = document.querySelector('#display');

let calculadora = {
  numero1: '',
  numero2: '',
  operador: '',
  resultado: 0,
  signo: '+',
  tienePunto: false,

  suma: function(numero1, numero2){
    this.resultado = numero1 + numero2;
    checkLength(this.resultado);
  },
  resta: function(numero1, numero2){
    this.resultado = numero1 - numero2;
    checkLength(this.resultado);
  },
  multiplicacion: function(numero1, numero2){
    this.resultado = numero1 * numero2;
    checkLength(this.resultado);
  },
  division: function(numero1, numero2){
    this.resultado = numero1 / numero2;
    checkLength(this.resultado);
  },
  calcular: function(operador){
    if (calculadora.numero2 == '') {
      calculadora.numero2 = display.innerHTML;
    }
    switch (operador) {
      case '+':
            calculadora.suma(this.numero1, this.numero2);
        break;
      case '-':
            calculadora.resta(this.numero1, this.numero2);
        break;
      case '*':
            calculadora.multiplicacion(this.numero1, this.numero2);
        break;
      case '/':
            calculadora.division(this.numero1, this.numero2);
        break;
    }
  }
}

for (let i = 0; i < teclas.length; i++) {
  teclas[i].addEventListener('mousedown', function(){
    checkBtn(teclas[i].id);
    teclas[i].style.transform = 'scale(1.1)';
    teclas[i].addEventListener('mouseup', function(){
      teclas[i].style.transform = 'scale(1)';
    })
  })

}

function checkBtn(id){
  switch (id) {
    case 'on':
      calculadora.numero1 = '';
      calculadora.numero2 = '';
      calculadora.operador = '';
      calculadora.resultado = 0;
      calculadora.tienePunto = false;
      display.innerHTML = 0;
      break;
    case 'sign': //hacerlo funcional
      if (calculadora.signo == '+' && display.innerHTML != 0) {
        let texto = document.createTextNode('-');
        display.prepend(texto);
        calculadora.signo = '-';
      } else if(calculadora.signo == '-' && display.innerHTML != 0) {
        let negativo = parseInt(display.innerHTML);
        let positivo = negativo * Math.sign(negativo);
        display.innerHTML = positivo;
        calculadora.signo = '+';
      }
      break;
    case 'dividido':
      calculadora.operador = '/';
      calculadora.numero1 = parseInt(display.innerHTML);
      display.innerHTML = '';
    break;
    case 'raiz':
      return
    break;
    case 'por':
      calculadora.operador = '*';
      calculadora.numero1 = parseInt(display.innerHTML);
      display.innerHTML = '';
      break;
    case 'menos':
      calculadora.operador = '-';
      calculadora.numero1 = parseInt(display.innerHTML);
      display.innerHTML = '';
      break;
    case 'mas':
      calculadora.operador = '+';
      calculadora.numero1 = parseInt(display.innerHTML);
      display.innerHTML = '';
      break;
    case 'punto':
      id = '.';
      if (calculadora.tienePunto == false) {
        insertText(id);
        calculadora.tienePunto = true;
      } else {
        return
      }
      break;
    case 'igual':
      if (calculadora.numero1 == '') {
        display.innerHTML = 'ERROR';
      } else if (calculadora.resultado == display.innerHTML) {
        calculadora.numero1 = calculadora.resultado;
        calculadora.calcular(calculadora.operador);
      } else if (display.innerHTML != calculadora.resultado) {
        calculadora.numero2 = parseInt(display.innerHTML);
        calculadora.calcular(calculadora.operador);
      } else {
        calculadora.calcular(calculadora.operador);
      }
      break;
    default:
    insertText(id);
  }
}

function insertText(numero){
  if (display.innerHTML.length < 8) {
    if (display.innerHTML == 0) {
      display.innerHTML = '';
      let texto = document.createTextNode(numero);
      display.appendChild(texto);
    } else if(display.innerHTML == 0 && numero == 0) {
      display.innerHTML = '';
      let texto = document.createTextNode(numero);
      display.appendChild(texto);
    } else {
      let texto = document.createTextNode(numero);
      display.appendChild(texto);
    }
  }
}

function checkLength(resultado){
  let resultFinal = resultado;
  let toString = '' + resultFinal;
  if (toString.length > 8) {
    let substraido = toString.substr(0, 8);
    display.innerHTML = parseInt(substraido);
  } else {
    display.innerHTML = resultado;
  }
}
