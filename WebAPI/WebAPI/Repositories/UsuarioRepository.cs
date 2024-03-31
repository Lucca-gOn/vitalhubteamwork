using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;

namespace WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        VitalContext ctx = new VitalContext();

        public bool AlterarSenha(Guid Id, string senhaAntiga, string senhaNova)
        {
            var user = ctx.Usuarios.FirstOrDefault(x => x.Id == Id);

            if (user == null) return false;

            if (!Criptografia.CompararHash(user.Senha, senhaAntiga)) return false;
            user.Senha = Criptografia.GerarHash(senhaNova);
            ctx.Update(user);
            ctx.SaveChanges();


            return true;

        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
           // var user = ctx.Usuarios.FirstOrDefault
               // (x => x.Email== email);

            var user = ctx.Usuarios.Select(u => new Usuario
            {
                Id = u.Id,
                Email = u.Email,
                Senha = u.Senha,
                Nome =  u.Nome,
                TipoUsuario = new TiposUsuario
                {
                    Id = u.TipoUsuario.Id,
                    TipoUsuario = u.TipoUsuario.TipoUsuario
                }
            }).FirstOrDefault
                (x => x.Email == email);

            if (user == null) return null;

            // var senhaInformada = Criptografia.GerarHash(senha);

             if (!Criptografia.CompararHash(senha, user.Senha)) return null;

            // if (!Criptografia.CompararHash(user.Senha, senhaInformada)) return null;

            return user;
            
        }

        public Usuario BuscarPorId(Guid? id)
        {
            //permitir que sejam nulos, erro nullable object must have a value
            try
            {
                //X != null verifica se o objeto X não é nulo. Se X não for nulo, o operador ternário cria um novo objeto X e atribui os valores existentes a ele. Se X for nulo, o operador ternário atribui null ao campo X do objeto Usuario.

                //X = u.Paciente != null ? new X
                //{
                // Atribui os valores
                //} : null

                Usuario usuarioBuscado = ctx.Usuarios
               .Include(u => u.Paciente)
               .Include(u => u.Medico)
               .Select(u => new Usuario
               {
                   Id = u.Id,
                   Nome = u.Nome,
                   Email = u.Email,
                   Foto = u.Foto,

                   Paciente = u.Paciente != null ? new Paciente
                   {
                       Id = u.Paciente.Id,
                       DataNascimento = u.Paciente.DataNascimento,
                       Cpf = u.Paciente.Cpf,
                       Endereco = u.Paciente.Endereco != null ? new Endereco
                       {
                           Id = u.Paciente.Endereco.Id,
                           Cep = u.Paciente.Endereco.Cep,
                           Logradouro = u.Paciente.Endereco.Logradouro,
                           Latitude = u.Paciente.Endereco.Latitude,
                           Longitude = u.Paciente.Endereco.Longitude,
                           Cidade = u.Paciente.Endereco.Cidade
                       } : null
                   } : null,

                   Medico = u.Medico != null ? new Medico
                   {
                       Id = u.Medico.Id,
                       Crm = u.Medico.Crm,
                       Especialidade = u.Medico.Especialidade,
                       Endereco = u.Medico.Endereco

                   } : null
               })
               .FirstOrDefault(u => u.Id == id)!;

                return usuarioBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuario)
        {
            usuario.Senha = Criptografia.GerarHash(usuario.Senha);
            ctx.Add(usuario);
            ctx.SaveChanges();

        }
    }
}
