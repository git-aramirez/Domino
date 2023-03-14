using Domino.IServices;
using Domino.Models;

namespace Domino.Services
{
    public class UserService : IUserService
    {
        List<User> users = new List<User>()
        {
            new User() { Email= "ander@inalambria.com" , Password="An#er32345InAsFd$"}
        };

        public bool IsUser(string email, string password) =>
            users.Where(user => user.Email == email && user.Password == password).Count() > 0;
    }
}
