import { Component } from '@angular/core';
import { Tarea } from '../tarea';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareaEditando= {} as Tarea;
  arrayColeccionTareas: any = [{
    id: "",
    tarea: {} as Tarea
  }
  ];
  idTareaSelect: string= "";
  constructor(private firestoreService: FirestoreService) {
  this.obtenerListaTareas();
  }

  clicBotonInsertar(){
    console.log("Entra en clicBotonInsertar");
    this.firestoreService.insertar("tareas",this.tareaEditando).then(() => {
    console.log ("Tarea creada correctamente")
    this.tareaEditando = {}  as Tarea;
  },
  (error) => {
    console.error(error);
  });
  }

  obtenerListaTareas() {
    this.firestoreService.consultar("tareas").subscribe((datosRecibidos) => {
      this.arrayColeccionTareas = [];
      datosRecibidos.forEach((datosTarea) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          tarea: datosTarea.payload.doc.data()
        });
      });
    });
  }

  selectTarea(idTarea:string, tareaSelect:Tarea) {

    this.tareaEditando = tareaSelect;
    this.idTareaSelect = idTarea;
    
  }
  
  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idTareaSelect).then(() => {
      console.log("Tarea borrada correctamente")
      this.idTareaSelect = "";
      this.tareaEditando = {} as Tarea;
    }, (error) => {
      console.error(error);
    });
  }
  
}
