import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {  FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'hola';
  tasks = [
    'instalar angular',
    'crear proyecto',
    'crear componentes',
    'Crear servicio',
  ];
  tasks2 = signal([
    'instalar angular',
    'crear proyecto',
    'crear componentes',
    'Crear servicio',
  ]);
  name = signal('Lina Marcela');
  edad = 24;
  disabled = true;
  img = 'https://i.postimg.cc/Wp5sNd5j/dish2.png';

  person = signal({
    name: 'Lina',
    age: 2,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable:true
  });


  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);

    })
  }

  clickHandler() {
    alert('Hola');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    //console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeName(event : Event){
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update(prevState => {
      return{
        ...prevState,
        name : newValue
      }
    })
  }
}
