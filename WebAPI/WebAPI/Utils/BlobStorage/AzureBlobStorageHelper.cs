using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
				//Verifica se existe o arquivo
				if (arquivo != null)
				{
					//Retorna a uri
					//Gerar nome unico para a imagem
					var blobName = Guid.NewGuid().ToString().Replace("-","") + Path.GetExtension(arquivo.FileName);

					//Cria uma instancia do blobServiceCliente passando a string de conexao com o blob da azure.
					var blobServiceClient = new BlobServiceClient(stringConexao);

					//Obtem dados do container client 
					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					//Obtaer o nome do container
					var blobClient = blobContainerClient.GetBlobClient(blobName);

					//Abre o fluxo de entrada do arquivo (foto)
					using(var stream = arquivo.OpenReadStream())
					{
						//Carrega o arquivo para o blob de forma assincrona
						await blobClient.UploadAsync(stream, true);
					}
					//Retorna a uri do blob como um string
					return blobClient.Uri.ToString();



				}
				else
				{
					//Retorna a uri padrao (Imagem)
					return "https://blobvitalhub3dmallan.blob.core.windows.net/blobvitalcontainerallan/NotImage.svg";

                }
			}
			catch (Exception)
			{

				throw;
			}
        }
    }
}
