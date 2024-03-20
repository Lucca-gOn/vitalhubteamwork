import { AntDesign } from "@expo/vector-icons";
import { ButtonCard, ButtonText, ClockCard, ContainerCardsList, ContentCard, DataProfileCard, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow, } from "./Style";

export const CardQuery = ({
  situacao = "pendente",
  onPressCancel,
  onPressMedicalRecord,
}) => {
  return (
    // container principal
    <ContainerCardsList>
      {/* imagem de perfil */}
      <ProfileImage source={{ uri: "https://avatars.githubusercontent.com/u/125275514?v=4" }} />

      {/* conteúdo ao lado da imagem de perfil */}
      <ContentCard>
        <DataProfileCard>
          <ProfileName>Paulo</ProfileName>

          <ProfileData>
            <TextAge>26 anos</TextAge>
            <TextBold>Rotina</TextBold>
          </ProfileData>
        </DataProfileCard>

        <ViewRow>
          <ClockCard situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao == "agendadas" ? "#49B3BA" : "#8C8A97"}
            />

            <TextBold situacao={situacao} color={"#49B3BA"}>
              14:00
            </TextBold>
          </ClockCard>

          {/* valida e mostra o tipo de botão conforme a situação */}

          {
            situacao == "cancelado" ? (
              <>
              </>
            ) : situacao == "agendadas" ? (
              <ButtonCard onPress={onPressCancel}>
                <ButtonText situacao={situacao}>Cancelar</ButtonText>
              </ButtonCard>
            ) : (
              <ButtonCard onPress={onPressMedicalRecord}>
                <ButtonText situacao={situacao}>Ver Prontuário</ButtonText>
              </ButtonCard>
            )
          }
        </ViewRow>
      </ContentCard>
    </ContainerCardsList>
  );
};