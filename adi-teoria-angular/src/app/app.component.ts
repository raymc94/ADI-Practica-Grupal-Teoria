import { Component } from '@angular/core';
import { ApiService } from "./api-consummer/service/api.service";
import { Task } from "./api-consummer/model/task";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public task: Task = { itemIndex: "", item: "" };
  public tasks: Task[];
  public taskNameForm : string = "";
  title = 'adi-teoria-angular';

  constructor(private apiservice: ApiService) {
    this.tasks = [];
   }

  deleteTask(id : string):void {
    console.log("Delete button is clicked. id" + id);
    this.apiservice.deleteTask(id).subscribe();
    window.location.reload();

  }

  addTask(taskName : string):void {
    
    console.log("Add task button is clicked. name" + this.taskNameForm);
    var taskAux : Task = {itemIndex:"", item : this.taskNameForm};
    this.apiservice.postTask(taskAux).subscribe();
    window.location.reload();
  }

  ngOnInit(): void {
    this.apiservice.getTasks().subscribe((tasks: Task[]) => {this.tasks = tasks;});
    console.log("Consumido");
  }

}
