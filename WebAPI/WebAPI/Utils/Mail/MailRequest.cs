namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //destinatario email
        public string? ToEmail { get; set; }
        //assunto email
        public string? Subject { get; set;}
        //corpo email
        public string? Body { get; set;}    
    }
}
