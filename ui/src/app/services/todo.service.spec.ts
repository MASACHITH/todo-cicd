import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('TodoService' , () => {

    let svc : TodoService ; 
    let http : HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({imports : [HttpClientTestingModule]});
        svc = TestBed.inject(TodoService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('loads all todos' , () => {
        const mock = [{ id : '1' , title : 'A' ,done: false , tags : [] }];
        svc.all().subscribe(data => expect(data.length).toBe(1));
        const req = http.expectOne('/api/todos');
        expect(req.request.method).toBe('GET')
        req.flush(mock);
    });

});