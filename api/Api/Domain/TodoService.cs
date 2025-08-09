namespace Api.Domain
{

    public record Todo(Guid Id, string Title, bool Done ,HashSet<string> Tags);

    public interface ITodoService
    {
        Todo Add(string title);
        bool Toggle(Guid id);

        bool AddTag(Guid id, string tag);

        IEnumerable<Todo> All();
    }


    public class TodoService : ITodoService
    {
        private readonly Dictionary<Guid, Todo> __store = new();

        public Todo Add(string title)
        {
           var todo = new Todo(Guid.NewGuid(), title.Trim() ,false, new HashSet<string>(StringComparer.OrdinalIgnoreCase));
            __store[todo.Id] = todo;
            return todo;

        }

        public bool AddTag(Guid id, string tag)
        {
           if(!__store.TryGetValue(id , out var t)) return false;
           var tags = new HashSet<string>(t.Tags, StringComparer.OrdinalIgnoreCase) { tag.Trim() };
           __store[id] = t with { Tags = tags }; 
           return true;

        }

        public IEnumerable<Todo> All() => __store.Values.OrderBy(x => x.Title);


        public bool Toggle(Guid id)
        {
            if(!__store.TryGetValue(id,out var t)) return false ;
            __store[id] = t with { Done = !t.Done};
            return true;
        }

    }
}
