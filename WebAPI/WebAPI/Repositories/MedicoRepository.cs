using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    
    public class MedicoRepository : IMedicoRepository
    {
        VitalContext ctx = new VitalContext();

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico)
        {

            Medico medicoBuscado = ctx.Medicos.Include(x => x.IdNavigation).FirstOrDefault(x => x.Id == Id);

            if (medicoBuscado == null) return null;

            // Atualizar somente os campos que foram modificados
            if (medico.Foto != null)
            {
                medicoBuscado.IdNavigation.Foto = medico.Foto;
            }
            if (medico.Nome != null)
            {
                medicoBuscado.IdNavigation.Nome = medico.Nome;
            }
            if (medico.Email != null)
            {
                medicoBuscado.IdNavigation.Email = medico.Email;
            }
            if (medico.EspecialidadeId != null)
            {
                var especialidade = ctx.Especialidades.Find(medico.EspecialidadeId);
                if (especialidade == null)
                {
                }
                else
                {
                    medicoBuscado.EspecialidadeId = medico.EspecialidadeId;
                }
            }
            if (medico.Crm != null)
            {
                medicoBuscado.Crm = medico.Crm;
            }
            if (medicoBuscado.Endereco == null)
            {
                medicoBuscado.Endereco = new Endereco(); // Crie uma nova instância se necessário
            }
            if (medico.Logradouro != null)
            {
                medicoBuscado.Endereco.Logradouro = medico.Logradouro;
            }
            if (medico.Cep != null)
            {
               medicoBuscado.Endereco!.Cep = medico.Cep;
            }

            ctx.Medicos.Update(medicoBuscado);
            ctx.SaveChanges();

            return medicoBuscado;

        }

        public Medico BuscarPorId(Guid Id)
        {
            return ctx.Medicos
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .Include(x => x.Especialidade)
                .FirstOrDefault(x => x.Id == Id)!;
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.
                Include(m => m.IdNavigation)
                .Select(m => new Medico
                {
                    Id = m.Id,
                    Crm = m.Crm,
                    Especialidade = m.Especialidade,

                    
                    IdNavigation = new Usuario
                    {
                        Nome = m.IdNavigation.Nome,
                        Foto = m.IdNavigation.Foto
                    }
                })
                .ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }

        public List <Consulta> BuscarPorData(DateTime dataConsulta, Guid idMedico)
        {
            return ctx.Consultas
                .Include(x => x.Situacao)
                .Include(x => x.Prioridade)
                .Include(x => x.Paciente!.IdNavigation)
                .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                .Include(x => x.Receita)
                .Where(x => x.MedicoClinica!.MedicoId == idMedico && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                .ToList();
        }
        public List<Medico> ListarPorClinica(Guid id)
        {
            List<Medico> medicos = ctx.MedicosClinicas  
                
                .Where(mc => mc.ClinicaId == id)

                .Select(mc => new Medico
                {
                    Id=mc.Id,
                    Crm = mc.Medico!.Crm,
                    Especialidade = mc.Medico.Especialidade,

                    IdNavigation = new Usuario
                    {
                        Id = mc.Medico.IdNavigation.Id,
                        Nome = mc.Medico.IdNavigation.Nome,
                        Email = mc.Medico.IdNavigation.Email,
                        Foto = mc.Medico.IdNavigation.Foto
                    }
                })
                .ToList();

            return medicos;
        }
    }
}
