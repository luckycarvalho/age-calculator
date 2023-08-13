const form = document.getElementById('form');

// Nascimento do usuário
const diaNasc = document.getElementById('dia');
const mesNasc = document.getElementById('mes');
const anoNasc = document.getElementById('ano');

// Dia, mês e ano atual
const diaAtual = new Date().getDate();
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getFullYear();

// Limitando a quantidade de dígitos
const maxDigitosDia = 2
const maxDigitosMes = 2
const maxDigitosAno = 4

diaNasc.addEventListener('input', () => limitarDigitos(diaNasc, maxDigitosDia));
mesNasc.addEventListener('input', () => limitarDigitos(mesNasc, maxDigitosMes));
anoNasc.addEventListener('input', () => limitarDigitos(anoNasc, maxDigitosAno));

function limitarDigitos(input, maxDigitos) {
    const valor = input.value;
    if (valor.length > maxDigitos) {
        input.value = valor.slice(0, maxDigitos)
    };
};

// Exibir erros
function exibirErro(input, mensagem) {
    input.previousElementSibling.classList.add('label-invalido'); 
    input.classList.add('input-invalido');
    input.nextElementSibling.innerHTML = mensagem;
};

function apagarErro(input) {
    input.previousElementSibling.classList.remove('label-invalido'); 
    input.classList.remove('input-invalido');
    input.nextElementSibling.innerHTML = '';
};

// Validações
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (diaNasc.value == "") {
        exibirErro(diaNasc, 'Este campo é obrigatório');
    };
    if (mesNasc.value == "") {
        exibirErro(mesNasc, 'Este campo é obrigatório');
    };
    if (anoNasc.value == "") {
        exibirErro(anoNasc, 'Este campo é obrigatório');
    };
    
    if (diaNasc.value <= 0 || diaNasc.value > diasMes[mesNasc.value - 1]) {
        exibirErro(diaNasc, 'Digite um dia válido');
    };
    if (mesNasc.value <= 0 || mesNasc.value > 12) {
        exibirErro(mesNasc, 'Digite um mês válido');
    };
    if (anoNasc.value <= 0 || anoNasc.value.toString().length < 4 || anoNasc.value > anoAtual) {
        exibirErro(anoNasc, 'Digite um ano válido');
    };       
});

[diaNasc, mesNasc, anoNasc].forEach(input => {
    input.addEventListener('input', () => {
        apagarErro(input);
    });
});