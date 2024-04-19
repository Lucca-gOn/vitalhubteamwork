using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "a2c3ef988da24547b7ce7e1396871c07";
        private readonly string _endpoint = "https://vitalhubcomputervision.cognitiveservices.azure.com/";

        //metodo para reconhecer o caracteres a partir de uma imagem 
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //cria um client para api de computer vision 
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint  
                };

                //faz a cgamada para a api 
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //processa o resultado e retorna o texto reconhecido 
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)

            {
                return "Erro ao reconhecer o texto" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //percorre todas a regioes 
            foreach (var region in result.Regions)
            {
                //para cada regiao percorre as linhas
                foreach (var line in region.Lines)
                {
                    //para cada linha, percorre as palavras 
                    foreach (var word in line.Words)
                    {
                        //adiciona cada palavra ao texto, separando pelo espaco 
                        recognizedText += word.Text + "";
                    }

                    //quebra de linha ao final de cada linha 
                    recognizedText += "\n";
                }
            }

            //retorna o texto 
            return recognizedText;
        }








    }
}
