import { Button, ButtonMedicalRecord, ButtonMedicalRecordEdit, ButtonTitle } from "../../components/Button/Style";
import { Container } from "../../components/Container/Style";
import { ContentLinkCenter, ContentTextMedicalRecord, ContentTextModalPatient } from "../../components/Content/Style";
import { InputMedium } from "../../components/Input/Style";
import { InputWithTitle } from "../../components/InputWithTitle/InputWithTitle";
import { InputWithTitleMedium } from "../../components/InputWithTitleMedium/InputWithTitleMedium";
import { InsertMedicalRecordImage } from "../../components/InsertMedialRecordImage/InsertMedialRecordImage";
import { LinkBlueMontserratMargin } from "../../components/Links/Style";
import { TextGrayModalPatient } from "../../components/Text/Style";
import { Title, TitleMedicalRecord } from "../../components/Title/Style";
import { ScrollForm } from "./style";

export function InsertMedicalRecord() {
    return (
        <Container>
            <InsertMedicalRecordImage />

            <TitleMedicalRecord>Paulo Henrique</TitleMedicalRecord>

            <ContentTextMedicalRecord>
                <TextGrayModalPatient>26 Anos</TextGrayModalPatient>
                <TextGrayModalPatient>paulo.oliveira@gmail.com</TextGrayModalPatient>
            </ContentTextMedicalRecord>
            <ScrollForm showsVerticalScrollIndicator={false}>
                <InputWithTitle title={"Descrição da consulta"} placeholder={"Descrição"} />
                <InputWithTitleMedium title={"Diagnóstico do paciente"} placeholder={"Diagnóstico"} />
                <InputWithTitle title={"Prescrição médica"} placeholder={"Prescrição"} />

                <ButtonMedicalRecord>
                    <ButtonTitle>Salvar</ButtonTitle>
                </ButtonMedicalRecord>

                <ButtonMedicalRecordEdit>
                    <ButtonTitle>Editar</ButtonTitle>
                </ButtonMedicalRecordEdit>

                <ContentLinkCenter>
                    <LinkBlueMontserratMargin>Cancelar</LinkBlueMontserratMargin>
                </ContentLinkCenter>
            </ScrollForm>
        </Container>

    );
};