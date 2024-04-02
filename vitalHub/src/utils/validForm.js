export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(email)
  if(email!= '' && email != null){
    return emailRegex.test(email);
  }else{
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
