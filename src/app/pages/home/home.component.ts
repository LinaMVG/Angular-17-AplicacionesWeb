import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    // {
    //   id: Date.now(),
    //   title: 'Crear proyecto',
    //   completed: true,
    // },
    // {
    //   id: Date.now(),
    //   title: 'Crear componente',
    //   completed: false,
    // },
  ]);

  filter = signal<'all' | 'pending' | 'completed' >('all');
  taskByFilter = computed(()=> {
    const filter = this.filter()
    const tasks = this.tasks()
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks
  })

  //Crea instancias
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  /*injector = inject(Injector)*/

  constructor(){
    effect(() =>{
      const tasks = this.tasks()
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log('run effect' + tasks);
    })
  }

  ngOnInit(){
    const storage =localStorage.getItem('tasks')
    if(storage){
      const tasks = JSON.parse(storage)
      this.tasks.set(tasks)
    }
    //this.trackTasks()
  }

  // trackTask(){
  //   effect(() =>{
  //     const tasks = this.tasks()
  //     localStorage.setItem('tasks', JSON.stringify(tasks))
  //     console.log('run effect' + tasks);
  //   }, {injector: this.injector})
  // }


  //Metodos que sirven para ejecutar una acción en la aplicación

  changeHandler() {
    // const input = event.target as HTMLInputElement;
    // const newTask = input.value;
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
    // this.tasks.mutate(state=>{
    //   const currenTask = state[index]
    //   state[index] = {
    //     ...currenTask,
    //     completed: !currenTask.completed
    //   }
    // })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing:false
        };
      });
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter : 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}


