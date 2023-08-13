const form = document.getElementById('form');

// Nascimento do usuário
const diaNasc = document.getElementById('dia');
const mesNasc = document.getElementById('mes');
const anoNasc = document.getElementById('ano');

// Dia, mês e ano atual
const diaAtual = new Date().getDate();
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getFullYear();
const diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Prints da idade
const exibirAno = document.querySelector('#exibirAno');
const exibirMes = document.querySelector('#exibirMes');
const exibirDia = document.querySelector('#exibirDia');

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

// Função para passar para próxima caixa automaticamente
diaNasc.addEventListener('input', () => {
    verificarLimite(diaNasc, maxDigitosDia, 'mes');
});
mesNasc.addEventListener('input', () => {
    verificarLimite(mesNasc, maxDigitosMes, 'ano');
});

function verificarLimite(input, maxDigitos, proximaCaixaId) {
    const valor = input.value;
    if (valor.toString().length >= maxDigitos) {
        const proximaCaixa = document.getElementById(proximaCaixaId);
        proximaCaixa.removeAttribute('disabled');
        proximaCaixa.focus();
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

// Validação de campos vazios ou incorretos
function validarCampos() {
    let temErros = false;

    if (diaNasc.value == "") {
        exibirErro(diaNasc, 'Este campo é obrigatório');
        temErros = true;
    } else if (diaNasc.value <= 0 || diaNasc.value > diasMes[mesNasc.value - 1]) {
        exibirErro(diaNasc, 'Digite um dia válido');
        temErros = true;
    };

    if (mesNasc.value == "") {
        exibirErro(mesNasc, 'Este campo é obrigatório');
        temErros = true;
    } else if (mesNasc.value <= 0 || mesNasc.value > 12) {
        exibirErro(mesNasc, 'Digite um mês válido');
        temErros = true;
    };

    if (anoNasc.value == "") {
        exibirErro(anoNasc, 'Este campo é obrigatório');
        temErros = true;
    } else  if (anoNasc.value <= 0 || anoNasc.value.toString().length < 4 || anoNasc.value > anoAtual) {
        exibirErro(anoNasc, 'Digite um ano válido');
        temErros = true;
    };
    
    return !temErros;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validarCampos()) {
        return;   
    } else {
        const anoNascimento = anoNasc.value;
        const mesNascimento = mesNasc.value - 1;
        const diaNascimento = diaNasc.value;

        const dataNasc = new Date(anoNascimento, mesNascimento, diaNascimento);

        const idadeMilissegundos = new Date() - dataNasc;
        
        let idadeAnos = Math.floor((idadeMilissegundos) / (365.25 * 24 * 60 * 60 * 1000 ));

        let idadeMeses = mesAtual - (mesNascimento + 1);
        if (diaAtual < diaNascimento) {
            idadeMeses--;
        };

        if (idadeMeses < 0) {
            idadeMeses += 12;
        };

        let idadeDias = diaAtual - diaNascimento;
        if (idadeDias < 0) {
            idadeDias += diasMes[mesAtual];
        };

        exibirAno.innerHTML = idadeAnos;
        exibirMes.innerHTML = idadeMeses;
        exibirDia.innerHTML = idadeDias;
    };
});

[diaNasc, mesNasc, anoNasc].forEach(input => {
    input.addEventListener('input', () => {
        apagarErro(input);
    });
});
