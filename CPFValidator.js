const form = document.querySelector('.formulario')
const result = document.querySelector('.result')
const pseudo = document.styleSheets[0].rules[9].style

function ValidCPF(cpfValue) {
    Object.defineProperty(this, 'cleanCPF', {
        value: cpfValue.replace(/\D+/g, '')
    })
}

ValidCPF.prototype.getDigitsCPFNumbers = function () {
    const isUndefined = typeof this.cleanCPF === 'undefined';
    const isDiferentEleven = this.cleanCPF.length !== 11;
    const isSequencialCPF = this.isSequencial();

if (isUndefined || isDiferentEleven || isSequencialCPF) return false;
    const parcialCPF = this.cleanCPF.slice(0, -2);
    const digitOne = this.createDigits(parcialCPF);
    const digitTwo = this.createDigits(parcialCPF + digitOne);
    const validCPFNumber = parcialCPF + digitOne + digitTwo;

    return validCPFNumber === this.cleanCPF
}

ValidCPF.prototype.createDigits = function (parcialCPF) {
    const arrayConvertCPFNumber = parcialCPF.split('');
    let reducer = arrayConvertCPFNumber.length + 1;

    const sumNumbers = arrayConvertCPFNumber
        .reduce((acc, number) => acc += number * reducer--, 0);

    const digits = 11 - (`${sumNumbers}` % 11);
    return digits > 9 ? '0' : String(digits);
}

ValidCPF.prototype.isSequencial = function () {
    const CPFlength = this.cleanCPF.length;
    const isSequencial = this.cleanCPF[0].repeat(CPFlength);
    return isSequencial === this.cleanCPF;
}


const showResult = (color, result) => {
    pseudo.backgroundColor = color;
    pseudo.content = result;
    pseudo.animation = "0.5s ease-in-out 0s 1 normal forwards running valido"

}

form.CPFValidator.addEventListener('input', event => {
    const lengthisfourteen = event.target.value.length === 14;

    if (lengthisfourteen) {
        const registeredCPF = new ValidCPF(`${event.target.value}`)
        const isValid = registeredCPF.getDigitsCPFNumbers()

        if (isValid) {
            showResult('green', "\"CPF válido\"");
        } else{
            showResult('red', "\"CPF inválido\"");  
        }

    } else {
        pseudo.animation = "0.5s ease-in-out 0s 1 normal forwards running invalido";
    }

})


