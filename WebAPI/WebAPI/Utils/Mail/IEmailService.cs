namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //metodo assincrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);

    }
}
