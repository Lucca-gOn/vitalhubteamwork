import { InsertMedicalRecordImageContainer } from "../Container/Style";
import { InsertMedicalRecordContent } from "../Content/Style";
import { InsertMedicalRecordImageProfile } from "./Style";


export function InsertMedicalRecordImage() {
    return(
        <InsertMedicalRecordImageContainer>
            <InsertMedicalRecordContent>
                <InsertMedicalRecordImageProfile source={{ uri: "https://github.com/MagiLogus.png" }}/>
            </InsertMedicalRecordContent>
        </InsertMedicalRecordImageContainer>
    );
};