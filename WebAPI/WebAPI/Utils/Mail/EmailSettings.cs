namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //Email do Rementente
        public string? Email { get; set; }
        //Senha do Remetente coidgo de 4 digitos
        public string? Password { get; set; }
        //host do Servidor SMTP
        public string? Host { get; set;}
        //Nome que é exibido do remetente
        public string? DisplayName { get; set;}
        //Porta do servidor SMTP
        public int Port {  get; set; }
    }
}
