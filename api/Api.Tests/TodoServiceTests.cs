using Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Api.Tests
{
    public class TodoServiceTests
    {

        [Fact] 
        public void Add_Creates_Item_With_Title()
        {
            var svc = new TodoService();
            var t = svc.Add(" Learn CI/CD");
            Assert.Equal("Learn CI/CD", t.Title);
            Assert.False(t.Done);
            Assert.NotEqual(Guid.Empty, t.Id);
        }

        [Fact]
        public void Toggle_Flips_Done()
        {
            var svc = new TodoService();
            var t = svc.Add("Task");
            var ok = svc.Toggle(t.Id);
            Assert.True(svc.All().First().Done);
        }


        [Fact]
        public void AddTag_Is_Case_Insensitive_And_Unique()
        {
            var svc = new TodoService();
            var t = svc.Add("Task");
            svc.AddTag(t.Id, "Dev");
            svc.AddTag(t.Id, "dev");
            var tags = svc.All().First().Tags;
            Assert.Single(tags);
            Assert.Contains("Dev", tags, StringComparer.OrdinalIgnoreCase);

        }
    }
}
