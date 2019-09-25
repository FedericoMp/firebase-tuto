import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../fire-service/database.service';

@Component({
  selector: 'oauth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  courses: any;
  courseName: string;
  courseTime: number;

  rtdbs: any[];

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.FireStoreRead();
    // this.RealTimeDb();
  }

  RealTimeDb() {
    this.dbService.loadData$()
      .subscribe(
        data => {
          this.rtdbs = data;
          console.log(this.rtdbs);
        }
      );
  }

  FireStoreRead() {
    this.dbService.readCourse().subscribe(
      data => {
        this.courses = data.map(
          e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              // tslint:disable-next-line: no-string-literal
              Name: e.payload.doc.data()['Name'],
              // tslint:disable-next-line: no-string-literal
              Time: e.payload.doc.data()['Time'],
            };
          }
        );
        console.log(this.courses);
      }
    );
  }

  CreateRecord() {
    // tslint:disable-next-line: prefer-const
    let record = {};
    // tslint:disable-next-line: no-string-literal
    record['Name'] = this.courseName;
    // tslint:disable-next-line: no-string-literal
    record['Time'] = this.courseTime;
    this.dbService.createCourse(record)
      .then(
        resp => {
          this.courseName = '';
          this.courseTime = undefined;
          console.log(resp);
        }
      ).catch( err => console.log(err) );
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditTime = record.Time;
  }

  RemoveRecord(rowId) {
    this.dbService.deleteCourse(rowId);
  }

  UpdateRecord(recordRow) {
    // tslint:disable-next-line: prefer-const
    let record = {};
    // tslint:disable-next-line: no-string-literal
    record['Name'] = recordRow.EditName;
    // tslint:disable-next-line: no-string-literal
    record['Time'] = recordRow.EditTime;
    this.dbService.updateCourse(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
