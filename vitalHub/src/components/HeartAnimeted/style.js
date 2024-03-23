import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import HeartRed from "../../assets/images/heartRed.json"

export const HeartAnimated = styled(LottieView).attrs({
  source: HeartRed,
  autoPlay: true,
  loop:true,
})`
  width: 400px;
  height:300px;
`