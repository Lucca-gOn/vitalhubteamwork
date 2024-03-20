import { Container } from "../Container/Style";
import { InputWithTitleContent } from "../Content/Style";
import { InputLarge, InputMedium } from "../Input/Style";
import { TitleWithInput } from "../Title/Style";

export function InputWithTitleMedium({ title, placeholder, }) {
    return (
        <Container>
            <InputWithTitleContent>
                <TitleWithInput>{title}</TitleWithInput>

                <InputMedium placeholder={placeholder} />
            </InputWithTitleContent>
        </Container>
    );
};