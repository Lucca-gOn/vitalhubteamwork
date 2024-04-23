using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "2b0d13e8ffdb410085538bdb3fec2a34";

        private readonly string _endPoint = "https://cvvitalhuballan.cognitiveservices.azure.com/";

        //Metodo para reconhecer o carateres(texto a partir de uma imgagem
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //Cria um client para api de computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endPoint
                };

                //Faz a chamada para a Api
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                // Processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {
                return ("Erro ao reconhcer o texto : " + ex.Message);
            }
        }
        public static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //Percorre todas as regiões.
            foreach (var region in result.Regions)
            {
                //Percorre cada região, percorre as linhas
                foreach (var line in region.Lines)
                {
                    //Para cada linha, percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //Asiciona cada palavra ao texro, separando com espaço
                        recognizedText += word.Text + " ";
                    }
                    //quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }
            //Retorna o texto
            return recognizedText;
        }
    }

    
}
