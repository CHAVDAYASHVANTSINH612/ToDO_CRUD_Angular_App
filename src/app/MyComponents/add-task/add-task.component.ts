import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../Models/Task';
import { TaskServiceService } from '../../Services/task-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder
  ) {}

  id: number = 0;
  editTask!: Task;
  taskForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    this.id = 0;
    this.taskForm = this.formBuilder.group({
      id: [0],
      title: [null, Validators.required],
      description: [null],
      dueDate: [null, Validators.required],
    });

    let idStr = await this.route.snapshot.paramMap.get('id');
    console.log('id is: ' + idStr);

    if (idStr) {
      this.id = parseInt(idStr);
      (await this.taskService.getTask(this.id)).subscribe((data: Task) => {
        console.log('data is: ' + JSON.stringify(data));
        this.editTask = data;
        this.taskForm.patchValue(this.editTask);
        console.log('editTask1 is: ' + this.editTask);
      });
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.taskForm.valid) {
      if (this.id > 0) {
        (await this.taskService.updateTask(this.taskForm.value)).subscribe(
          () => {
            console.log('Task Added Succesfully');
          },
          (err) => {
            console.log('Error While Adding Task: ' + err.toString());
          }
        );
      } else {
        (await this.taskService.addTask(this.taskForm.value)).subscribe(
          () => {
            console.log('Task Added Succesfully');
          },
          (err) => {
            console.log('Error While Adding Task: ' + JSON.stringify(err));
          }
        );
      }
    } else {
      console.error('add/edit Task form is not valid');
    }

    this.taskForm.reset();
  }
}
