import { ButtoTitleStatus, ButtonStatus } from "../StatusQuery/Style"
import { ButtoLevelQueryTitleStatus, ButtonLevelQueryStyle } from "./Style"

export const ButtonLevelQuery = ({textButton, clickButton=false, onPress}) => {
    return (
        <ButtonLevelQueryStyle clickButton={clickButton} onPress={onPress}>
            <ButtoLevelQueryTitleStatus clickButton={clickButton}>{textButton}</ButtoLevelQueryTitleStatus>
        </ButtonLevelQueryStyle>
    )
}