namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Método asincrono para envio de email que recebe o objeto MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
