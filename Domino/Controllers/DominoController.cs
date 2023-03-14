using Domino.IServices;
using Domino.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Domino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DominoController : ControllerBase
    {
        private readonly IDominoService _dominoService;

        public DominoController(IDominoService dominoService)
        {
            _dominoService = dominoService;
        }

        //<summary>
        //This endpoint will try to find the solution with the tiles
        //</summary>
        [HttpPost]
        public async Task<IActionResult> Resolve([FromBody] DominoModel dominoModel)
        {
            var list = _dominoService.Resolve(dominoModel.tiles);

            return Ok(new { result = list.Result });
        }
    }
}
