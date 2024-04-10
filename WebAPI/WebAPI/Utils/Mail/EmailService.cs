
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;


namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variavel privada com as configs do email 
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> options) 
        { 
            //obtem as configuraçoes de email e armazena na variavel privada
            emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();
                //Define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);
                //Adiciona o destinatario do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                //Define o asso do email
                email.Subject = mailRequest.Subject;

                //Cria o corpo do email
                var builder = new BodyBuilder();
                //Define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;
                //define o corpo do email no obj mimeMessage
                email.Body = builder.ToMessageBody();

                //Cria um client SMTP para envio de email
                using (var smtp = new SmtpClient())
                {
                    //Conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
                    //autentica-se no servidor SMTP usando dados do emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);
                    //envia o email assincrono
                    await smtp.SendAsync(email);
                }
            } catch (Exception ex)
            {

            }
        }
    }
}
}
