namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //email remetente
        public string? Email { get; set; }
        //senha remetente
        public string? Password { get; set; }
        //host do servidor SMTP
        public string? Host { get; set; }
        //nome exibido do remetente
        public string? Displayname { get; set; }
        //porta servidor SMTP
        public int Port { get; set; }
    }
}
