using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid usuarioId, PacienteViewModel paciente)
        {
            try
            {
                // Encontre o usuário com base no ID
                Usuario usuarioBuscado = ctx.Usuarios
                    .Include(u => u.Paciente) 
                    .FirstOrDefault(u => u.Id == usuarioId)!;

                if (usuarioBuscado != null && usuarioBuscado.Paciente != null)
                {
                    Paciente pacienteBuscado = usuarioBuscado.Paciente;

                    // Atualize os campos do paciente conforme necessário
                    if (paciente.DataNascimento != null)
                        pacienteBuscado.DataNascimento = paciente.DataNascimento;

                    if (paciente.Cpf != null)
                        pacienteBuscado.Cpf = paciente.Cpf;

                    if (paciente.Logradouro != null && pacienteBuscado.Endereco != null)
                        pacienteBuscado.Endereco.Logradouro = paciente.Logradouro;

                    if (paciente.Numero != null && pacienteBuscado.Endereco != null)
                        pacienteBuscado.Endereco.Numero = paciente.Numero;

                    if (paciente.Cep != null && pacienteBuscado.Endereco != null)
                        pacienteBuscado.Endereco.Cep = paciente.Cep;

                    if (paciente.Cidade != null && pacienteBuscado.Endereco != null)
                        pacienteBuscado.Endereco.Cidade = paciente.Cidade;

                    // Salve as alterações no banco de dados
                    ctx.Pacientes.Update(pacienteBuscado);
                    ctx.SaveChanges();

                    return pacienteBuscado;
                }
                else
                {
                    throw new Exception("Usuário ou paciente não encontrado");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }



        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
            try
            {
                return ctx.Consultas
                 .Include(x => x.Situacao)
                 .Include(x => x.Prioridade)
                 .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                 .Include(x => x.MedicoClinica!.Medico!.Especialidade)

                 // diferença em dias entre a Data da Consulta e a dataConsulta é igual a 0.
                 .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                 .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Paciente BuscarPorId(Guid Id)
        {
            try
            {
                return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario user)
        {
            try
            {
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

