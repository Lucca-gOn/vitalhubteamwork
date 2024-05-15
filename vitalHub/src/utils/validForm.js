export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email != '' && email != null) {
    //console.log(emailRegex.test(email)) ;
    return emailRegex.test(email);
  } else {
    return false
  }
}

export const validRG = (rg) => {
  // Removendo caracteres especiais e espaços em branco
  rg = rg.replace(/[^\w\s]/gi, '');
  
  // Verificando se o RG tem o número correto de caracteres (7 ou 9 dígitos)
  if (!/^(?:\d{7}|\d{8}[0-9A-Za-z])$/.test(rg)) {
    console.log("rg validaçao:",rg)
    return false;
  }
  
  // Separando os dígitos do dígito verificador
  const numerosRG = rg.substring(0, rg.length - 1); // Obtendo todos os dígitos (menos o último)
  const dv = rg.charAt(rg.length - 1); // Obtendo o último caractere (dígito verificador)
  
  // Verificando se o último caractere é um dígito ou uma letra (para RGs antigos)
  if (!/^\d$|^[A-Za-z]$/i.test(dv)) {
    return false;
  }

  // Calculando o dígito verificador (RG antigo com 7 dígitos)
  if (rg.length === 7) {
    let soma = 0;
    for (let i = 0; i < 7; i++) {
      soma += parseInt(numerosRG.charAt(i)) * (i + 1);
    }

    const resto = soma % 10;
    const dvCalculado = resto === 0 ? 0 : 10 - resto;
    return dv.toUpperCase() === dvCalculado.toString().toUpperCase();
  }

  // Calculando o dígito verificador (RG novo com 9 dígitos)
  let soma = 0;
  for (let i = 0; i < 8; i++) {
    soma += parseInt(numerosRG.charAt(i)) * (10 - i);
  }

  soma += parseInt(dv) * 2;

  const resto = soma % 11;
  let dvCalculado;
  if (resto < 2) {
    dvCalculado = 0;
  } else {
    dvCalculado = 11 - resto;
    // Se o dígito verificador calculado for 10, ele deve ser representado pela letra 'X'
    if (dvCalculado === 10) {
      dvCalculado = 'X';
    }
  }

  return dv.toUpperCase() === dvCalculado.toString().toUpperCase();
};


export const validName = (nome) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ]{3,}(?: [a-zA-ZÀ-ÿ]+)*$/;
  if(nome != '' && nome != null){
    return nameRegex.test(nome);
  }else{
    return false
  }
}

export const validDataNasciemnto = (dataString) =>{
  const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!dataRegex.test(dataString)){
    console.log('Erro')
    return false;
  }

  const [, dia, mes, ano] = dataRegex.exec(dataString);

  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  console.log(`Dia ${dia}, mes ${mes} e ano ${ano}`)
  console.log(data.getDate() === Number(dia) &&
    data.getMonth() + 1 === Number(mes) &&
    data.getFullYear() === Number(ano));
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zerar horas, minutos, segundos e milissegundos para comparar apenas a data
  
    return (
      data.getDate() === Number(dia) &&
      data.getMonth() + 1 === Number(mes) &&
      data.getFullYear() === Number(ano) &&
      data <= hoje
    );
}

export const validNewPassWord = (newPassWord) => {
  // Verifica se a senha tem pelo menos 8 caracteres
  if (newPassWord.length < 8) {
    return false;
  }
  // Verifica se a senha contém pelo menos uma letra minúscula
  var regexMinuscula = /[a-z]/;
  if (!regexMinuscula.test(newPassWord)) {
    return false;
  }
  // Verifica se a senha contém pelo menos uma letra maiúscula
  var regexMaiuscula = /[A-Z]/;
  if (!regexMaiuscula.test(newPassWord)) {
    return false;
  }
  // Verifica se a senha contém pelo menos um número
  var regexNumero = /[0-9]/;
  if (!regexNumero.test(newPassWord)) {
    return false;
  }
  // Verifica se a senha contém pelo menos um caractere especial
  var regexEspecial = /[!@#$%^&*()_+=-]/;
  if (!regexEspecial.test(newPassWord)) {
    return false;
  }
  // Se passar por todas as verificações, a senha é válida
  return true;
}

export const validarCPF = (cpf) => {
  //Remove todos os caracteres não numéricos do CPF, mantendo apenas os dígitos.
  cpf = cpf.replace(/[^\d]+/g, '');
  //Se o CPF não tem exatamente 11 dígitos ou se todos os dígitos são iguais. 
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  // COMENTADO PARA FACILITAR TESTES

  let soma = 0;  
  let resto;  

  //Calcula a soma dos produtos dos primeiros nove dígitos do CPF.
  for (let i = 1; i <= 9; i++)  
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);  
  //Calcula o resto da divisão da soma por 11 e multiplica por 10. O resultado define o primeiro dígito verificador.
  resto = (soma * 10) % 11; 

  //Se o resto é 10 ou 11, ajusta o dígito para 0.
  if ((resto === 10) || (resto === 11)) resto = 0;  
  //Compara o dígito verificador calculado com o décimo dígito do CPF. Se forem diferentes, retorna false
  if (resto !== parseInt(cpf.substring(9, 10))) return false;  

  //Reinicia a variável soma para calcular o segundo dígito verificador.
  soma = 0;
  //Calcula a soma dos produtos dos primeiros dez dígitos do CPF pelos seus respectivos pesos   
  for (let i = 1; i <= 10; i++)  
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);  
  resto = (soma * 10) % 11;  

  //Novamente ajusta o resto para 0 se for 10 ou 11.
  if ((resto === 10) || (resto === 11)) resto = 0;  
  //Compara o segundo dígito verificador calculado com o décimo primeiro dígito do CPF.
  if (resto !== parseInt(cpf.substring(10, 11))) return false;  

  //Se passar por todas as verificações, cpf é valido.
  return true;
};

export const formatarDataNascimento = (data) => {
  // Remove tudo que não é dígito
  data = data.replace(/[^\d]/g, "");

  // Aplica a formatação
  if (data.length > 4) {
    data = data.substring(0, 2) + "/" + data.substring(2, 4) + "/" + data.substring(4, 8);
  } else if (data.length > 2) {
    data = data.substring(0, 2) + "/" + data.substring(2, 4);
  }

  return data;
};

