
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variavel privada com as config do email
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings>options) 
        { 
            //obtem as config do email e armazena as variavel privada
         emailSettings = options.Value;  
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try 
            {
                //obj que representa email 
                var email = new MimeMessage();
                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);
                //adiciona destinatario do email 
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail)); 
                //define o assunto do email 
                email.Subject = mailRequest.Subject; 
                //Cria corpo do email 
                var builder = new BodyBuilder();
                //define o corpo do email com html 
                builder.HtmlBody= mailRequest.Body; 
                //define o corpo do objeto mimemessage
                email.Body = builder.ToMessageBody();
                //cria um client SMTP para envio de email 
                using (var smtp = new SmtpClient())
                {
                    //conecta ao servidor SMTP usando os dados do email settings
                    smtp.Connect(emailSettings.Host,emailSettings.Port,MailKit.Security.SecureSocketOptions.StartTls);
                    //autentica-se no servidor SMTP usando os dados do emailsettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);
                    //envia o email asyncrono
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
