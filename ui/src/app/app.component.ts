import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  todos : Todo[] = [];
  title = '';

  constructor(private svc :TodoService){

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.all().subscribe(d => this.todos = d);
  }

  add() {
    this.svc.add(this.title).subscribe(() => {this.title = '' ; this.load(); })
  }

  toggle(t : Todo){
    this.svc.toggle(t.id).subscribe(() => this.load());
  }

  addTag(t : Todo ,tag : string){
    if(!tag?.trim()) return;

    this.svc.addTag(t.id , tag).subscribe(() => this.load());
  }

}
