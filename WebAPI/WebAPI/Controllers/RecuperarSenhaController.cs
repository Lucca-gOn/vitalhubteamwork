using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;
        public RecuperarSenhaController(VitalContext context, EmailSendingService emailSendingService)
        {
            _context = context;
            _emailSendingService = emailSendingService;

        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                //busca ususario pelo email 
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario nao encontrado!");
                }

                //gera um codigo aleatorio com 4 algarismos 
                Random random = new Random();
                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                //envia codigo de confirmacao por email 
                await _context.SaveChangesAsync();

                await _emailSendingService.SendRecoveryPassword(user.Email!, recoveryCode);

                return Ok("Codigo enviado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("ValidarCodigo")]
        public async Task<IActionResult> ValidatePasswordRecoveryCode(string email, int codigo)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null)
                {
                    return NotFound("usuario nao encontrado!");
                }

                if (user.CodRecupSenha != codigo)
                {
                    return BadRequest("codigo de recuperacao invalido!");
                }

                user.CodRecupSenha = null;

                await _context.SaveChangesAsync();

                return Ok("codigo de recuperacao correto!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
