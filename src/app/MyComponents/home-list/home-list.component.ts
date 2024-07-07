import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/Task';
import { TaskServiceService } from '../../Services/task-service.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css',
})
export class HomeListComponent implements OnInit {
  constructor(private taskService: TaskServiceService) {}

  taskList: Task[] = [];

  async ngOnInit(): Promise<void> {
    this.taskList = [];
    this.getAllTaskLocal();
  }

  async deleteTask(id: number): Promise<void> {
    (await this.taskService.deleteTask(id)).subscribe(
      () => {
        console.log('task deleted');
      },
      (err) => {
        console.error(err.message);
      }
    );
    setTimeout(() => {
      this.getAllTaskLocal();
    }, 1000);
  }

  getAllTaskLocal() {
    this.taskService.getAllTask().subscribe(
      (data: Task[]) => {
        this.taskList = data;
        console.log(this.taskList);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
