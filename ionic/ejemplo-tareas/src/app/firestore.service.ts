import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore ) {}

  public insertar(coleccion: string,datos: object){
    console.log("Entra en insertar");
    console.log(datos);
    console.log(coleccion)
    return this.angularFirestore.collection(coleccion).add(datos)
  }
}

