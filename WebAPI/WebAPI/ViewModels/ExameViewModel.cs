using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.ViewModels
{
    public class ExameViewModel
    {
        public Guid? ConsultaId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile? Imagem { get; set; }

        public string? Descricao { get; set; }
    }
}
