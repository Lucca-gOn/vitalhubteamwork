using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SituacaoController : ControllerBase
    {
        private ISituacaoConsultaRepository situacaoConsultaRepository;
        
        public SituacaoController()
        {
            situacaoConsultaRepository = new SituacaoConsultaRespository();
        }

        //[Authorize]
        [HttpGet("ListarTodas")]
        public IActionResult Get()
        {
            return Ok(situacaoConsultaRepository.ListarTodos());
        }
    }
}
