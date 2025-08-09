// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TodoService, Todo } from './services/todo.service';

describe('AppComponent', () => {
  const todosMock: Todo[] = [
    { id: '1', title: 'First', done: false, tags: ['home'] },
    { id: '2', title: 'Second', done: true, tags: [] },
  ];

  const todoServiceMock = {
    all: jasmine.createSpy('all').and.returnValue(of(todosMock)),
    add: jasmine.createSpy('add').and.returnValue(of({ id: '3', title: 'X', done: false, tags: [] })),
    toggle: jasmine.createSpy('toggle').and.returnValue(of(void 0)),
    addTag: jasmine.createSpy('addTag').and.returnValue(of(void 0)),
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, CommonModule, FormsModule],
    declarations: [AppComponent],
    providers: [{ provide: TodoService, useValue: todoServiceMock }]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load and render header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngOnInit -> load()
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Todo + Tags');
    expect(todoServiceMock.all).toHaveBeenCalled();
  });

  // optional: update this test to match your component’s actual "title" property
  it('should have an empty input-model title initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('');
  });
});
