import { ContentIconPatientQuery, ContentSquareIcon } from "../Content/Style";
import { IconStethoscope } from "../Icon/Style";

export const ButtonSchedule = ({
    onPressSchedule
}) => {
    return (
        <ContentSquareIcon onPress={onPressSchedule}>
            <IconStethoscope />
        </ContentSquareIcon>
    );
};