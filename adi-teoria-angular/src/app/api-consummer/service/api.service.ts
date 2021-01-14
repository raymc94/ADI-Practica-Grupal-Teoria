import { Injectable } from '@angular/core';
import { Task } from "../model/task";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, takeLast, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private task: Task = { itemIndex: "", item: ""};
  private ApiUrl = "http://localhost:9000"; // URL to web api

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.ApiUrl)
    //Esto es para controlar que existan errores, evitar que bloquee la pagina
    //.pipe()
    ;
  }

  public postTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.ApiUrl, { item: task.item });
  }

  public deleteTask(itemIndex: string): Observable<Task> {
    return this.http.delete<Task>(this.ApiUrl+"/"+itemIndex);
  }
}
