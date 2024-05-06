import { css } from "styled-components";
import styled from "styled-components/native";


export const InputGreen = styled.TextInput.attrs((props) => ({
  placeholderTextColor: '#34898F',
  autoCapitalize: props.autoCapitalize !== undefined ? props.autoCapitalize : "none",
  autoCorrect: false,
  clearButtonMode: "while-editing",
  cursorColor: '#34898F',
  enablesReturnKeyAutomatically: true,
}))`
  ${(props) => {
    if (!props.disabledInput) {
      return css`
        color: #34898F;
        border: 2px solid #49B3BA;
      `
    } else {
      return css`
        background-color: #F5F3F3;
        border-color: #F5F3F3;
        color: #4E4B59;
      `
    }
  }
  }

  padding:16px;
  width:100%;
  
  
  border-radius: 5px;

  font-family: 'MontserratAlternates_600SemiBold';
  font-size: 14px;
`

export const InputGray = styled(InputGreen).attrs({
  placeholderTextColor: '#ACACAC',
  cursorColor: '#000',
})`
${(props) => {
    if (props.disabledInput) {
      return css`
        color: #34898F;        
        background-color:transparent;
        border: 2px solid #34898F;
      `
    } else {
      return css`
        background-color: #F5F3F3;                
        color: #000;
        border:none;
      `
    }
  }
  }
    
  font-family: 'MontserratAlternates_500Medium';  
`


export const InputGreenMultiLine = styled(InputGreen).attrs({
  multiline: true,
  textAlignVertical: "top"
})`
  ${(props) => {
    if (!props.disabledInput) {
      return css`
        color: #34898F;
        border-color: #34898F;
      `
    } else {
      return css`
        background-color: #F5F3F3;
        border-color: #F5F3F3;
        color: #4E4B59;
      `
    }
  }
  }
  width: 100%;
  /* height:121px;   */
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
  keyboardType: "numeric",
  selectTextOnFocus: true,
  caretHidden: true,
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