import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(private rtdb: AngularFireDatabase,
              private firestore: AngularFirestore) {
  }

  // RealTime Database
  loadData$(): Observable<any> {
    return this.rtdb.list('/courses').valueChanges();
  }

  // FireStore
  createCourse(record) {
    return this.firestore.collection('courses').add(record);
  }

  readCourse() {
    return this.firestore.collection('courses').snapshotChanges();
  }

  updateCourse(recordID, record) {
    this.firestore.doc('courses/' + recordID).update(record);
  }

  deleteCourse(recordID) {
    this.firestore.doc('courses/' + recordID).delete();
  }
}
