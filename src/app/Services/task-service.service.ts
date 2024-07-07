import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Task } from '../Models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private http: HttpClient) {}
  private API_Url: string = 'https://localhost:7234/api/ToDo/';

  public getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_Url + 'tasks');
  }

  public async getTask(id: number): Promise<Observable<Task>> {
    return await this.http.get<Task>(this.API_Url + 'task/' + id);
  }

  public async addTask(task: Task): Promise<Observable<any>> {
    return await this.http.post(this.API_Url + 'task', task).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  public async updateTask(task: Task): Promise<Observable<any>> {
    return await this.http.put(this.API_Url + 'task', task).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  public async deleteTask(id: number): Promise<Observable<any>> {
    return await this.http.delete(this.API_Url + 'task/' + id).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
