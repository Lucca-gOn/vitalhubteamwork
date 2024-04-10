namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //Email do remetente
        public string? Email { get; set; }

        //Senha do remetente
        //Não é a senha do email, sim o codigo...
        public string? Password { get; set; }

        //host do servidor SMTP
        public string? Host { get; set; }

        //Nome exibido do remetente
        public string? DisplayName { get; set; }

        //Porta do servidor SMTP
        public int Port { get; set; }
    }
}
