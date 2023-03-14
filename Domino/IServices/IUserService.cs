namespace Domino.IServices
{
    public interface IUserService
    {
        public bool IsUser(string email, string password);
    }
}
