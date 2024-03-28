export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(email)
  if(email!= '' && email != null){
    return emailRegex.test(email);
  }else{
    return false
  }
}