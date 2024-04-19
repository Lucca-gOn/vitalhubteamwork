using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{

    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                //verifica se existe o arquivo 
                if (arquivo != null)
                {
                    //gerar um nome unico para a imagem 
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);
                    //cria um instancia do blob service client passando a string fde conexao com a blob azure 
                    var blobServiceClient = new BlobServiceClient(stringConexao);
                    //obtem dadosdo container client 
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);
                    //obtem um blob client usando o blob name 
                    var blobClient = blobContainerClient.GetBlobClient(blobName);
                    //abre o fluxo de entrada do arquivo (foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //carrega o arquivo (foto) para o blob de forma assincrona 
                        await blobClient.UploadAsync(stream, true);
                    }
                    //retorna a uri do blob como uma string 
                    return blobClient.Uri.ToString();   
                }
                else
                {
                    //retorna a uri e uma imagem padrao caso nenhuma imagem seja enviada na requisicao
                    return "https://blobstoragevitalhub.blob.core.windows.net/blobvitalhubcontainer/125275514.png";
                }

            }
            catch (Exception)
            {

                throw;
            }








        }
           





    }
}
