using Api.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> Get() => Ok(_todoService.All());



        public record AddRequest(string Title);
        [HttpPost]
        public ActionResult<Todo> Add([FromBody] AddRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Title)) return BadRequest("Title required");
            var todo = _todoService.Add(req.Title);
            return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
        }


        [HttpPost("{id:guid}/toggle")]
        public IActionResult Toggle(Guid id) => _todoService.Toggle(id) ? NoContent() : NotFound();

        public record TagRequest(string Tag);
        [HttpPost("{id:guid}/tags")]
        public IActionResult AddTag(Guid id, [FromBody] TagRequest req)
            => _todoService.AddTag(id, req.Tag) ? NoContent() : NotFound();

    }
}
