using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class SituacaoConsultaRespository : ISituacaoConsultaRepository
    {
        public VitalContext ctx = new VitalContext();
        public List<SituacaoConsulta> ListarTodos()
        {
            return ctx.Situacoes
                .Select(s => new SituacaoConsulta
                {
                    Id = s.Id,
                    Situacao = s.Situacao,
                })
                .ToList();
        }
    }
}
