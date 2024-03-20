import { Container } from "../Container/Style";
import { InputWithTitleContent } from "../Content/Style";
import { InputLarge } from "../Input/Style";
import { TitleWithInput } from "../Title/Style";

export function InputWithTitle({ title, placeholder, }) {
    return (
        <Container>
            <InputWithTitleContent>
                <TitleWithInput>{title}</TitleWithInput>

                <InputLarge placeholder={placeholder} />
            </InputWithTitleContent>
        </Container>
    );
};