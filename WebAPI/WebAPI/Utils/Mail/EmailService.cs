
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //Variavel privada com as config do email

        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> options)
        {
            //Obtem as configs do email e armazena na variavel privada
            emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //Objeto que representa o email
                var email = new MimeMessage();

                //Define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatario do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //Define o assunto do email
                email.Subject = mailRequest.Subject;

                //Cria o corpo do email
                var builder = new BodyBuilder();

                //Define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //Define o corpo do email no objeto MimeMessage
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient()) 
                {
                    //Conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);

                    //Autentica-se no servidor SMTP
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //Envia o email assincrono 
                    await smtp.SendAsync(email);

                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
