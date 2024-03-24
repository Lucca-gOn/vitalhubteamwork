import styled from "styled-components/native";


export const InputGreen = styled.TextInput.attrs((props)=>({
  placeholderTextColor: '#34898F',
  autoCapitalize: props.autoCapitalize !== undefined ? props.autoCapitalize : "none",
  autoCorrect: false,
  clearButtonMode: "while-editing",
  cursorColor: '#34898F',
  enablesReturnKeyAutomatically: true,
}))`
  padding:16px;
  width:100%;
  
  border: 2px solid #49B3BA;
  border-radius: 5px;

  font-family: 'MontserratAlternates_600SemiBold';
  font-size: 14px;
  color: #34898F;

`

export const InputGray = styled(InputGreen).attrs({
  placeholderTextColor: '#ACACAC',
  cursorColor: '#000',
})`
  border:none;
  background-color:#f5f3f3;
  font-family: 'MontserratAlternates_500Medium';
  color: #000;
`


export const InputGreenMultiLine = styled(InputGreen).attrs({
  multiline:true,
  textAlignVertical: "top"  
})`
  height:121px;

`

export const InputGreenCode = styled.TextInput.attrs({
  placeholderTextColor: '#34898F',  
  autoCapitalize: "none",
  autoCorrect: false,  
  cursorColor: '#34898F',
  enablesReturnKeyAutomatically: true,
  maxLength: 1,
  placeholder: '0',
  inputMode: "numeric",
  keyboardType: "decimal-pad",
  selectTextOnFocus: true,
})`
  width:20%;

  padding: 5px 20px;
  border-radius: 5px;
  border: 2px solid #77CACF;
  align-items:center;
  justify-content:center;
  text-align: center;
  font-family: 'Quicksand_600SemiBold';
  font-size: 40px;
  color: #34898F;
`