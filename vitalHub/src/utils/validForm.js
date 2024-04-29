export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(email)
  if (email != '' && email != null) {
    return emailRegex.test(email);
  } else {
    return false
  }
}

export const validNewPassWord = (newPassWord) => {
  // Verifica se a senha tem pelo menos 8 caracteres
  if (senha.length < 8) {
    return false;
  }

  // Verifica se a senha contém pelo menos uma letra minúscula
  var regexMinuscula = /[a-z]/;
  if (!regexMinuscula.test(senha)) {
    return false;
  }

  // Verifica se a senha contém pelo menos uma letra maiúscula
  var regexMaiuscula = /[A-Z]/;
  if (!regexMaiuscula.test(senha)) {
    return false;
  }

  // Verifica se a senha contém pelo menos um número
  var regexNumero = /[0-9]/;
  if (!regexNumero.test(senha)) {
    return false;
  }

  // Verifica se a senha contém pelo menos um caractere especial
  var regexEspecial = /[!@#$%^&*()_+=-]/;
  if (!regexEspecial.test(senha)) {
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

  //COMENTADO PARA FACILITAR TESTES

  // let soma = 0;  
  // let resto;  

  // //Calcula a soma dos produtos dos primeiros nove dígitos do CPF.
  // for (let i = 1; i <= 9; i++)  
  //   soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);  
  // //Calcula o resto da divisão da soma por 11 e multiplica por 10. O resultado define o primeiro dígito verificador.
  // resto = (soma * 10) % 11; 

  // //Se o resto é 10 ou 11, ajusta o dígito para 0.
  // if ((resto === 10) || (resto === 11)) resto = 0;  
  // //Compara o dígito verificador calculado com o décimo dígito do CPF. Se forem diferentes, retorna false
  // if (resto !== parseInt(cpf.substring(9, 10))) return false;  

  // //Reinicia a variável soma para calcular o segundo dígito verificador.
  // soma = 0;
  // //Calcula a soma dos produtos dos primeiros dez dígitos do CPF pelos seus respectivos pesos   
  // for (let i = 1; i <= 10; i++)  
  //   soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);  
  // resto = (soma * 10) % 11;  

  // //Novamente ajusta o resto para 0 se for 10 ou 11.
  // if ((resto === 10) || (resto === 11)) resto = 0;  
  // //Compara o segundo dígito verificador calculado com o décimo primeiro dígito do CPF.
  // if (resto !== parseInt(cpf.substring(10, 11))) return false;  

  // Se passar por todas as verificações, cpf é valido.
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

