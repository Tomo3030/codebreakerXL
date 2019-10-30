import { MatDialog } from "@angular/material";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import firebase from "firebase";
//import * as firebase from "firebase/app";
import { AdminDialogComponent } from "../admin-dialog.component";
//import "firebase/firestore";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"]
})
export class AdminPanelComponent implements OnInit {
  email;
  role;
  spinner;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  makeRole() {
    this.spinner = true;
    if (this.role === "teacher") {
      this.makeTeacher();
    }

    if (this.role === "admin") {
      this.makeAdmin();
    }
  }

  makeAdmin() {
    const makeAdmin = firebase.functions().httpsCallable("addAdminRole");
    makeAdmin({ email: this.email })
      .then(reply => {
        let msg = reply.data.message || reply.data.errorInfo.code;
        this.openDialog(msg);
        this.spinner = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  makeTeacher() {
    const makeTeacher = firebase.functions().httpsCallable("addTeacherRole");
    makeTeacher({ email: this.email })
      .then(reply => {
        let msg = reply.data.message || reply.data.errorInfo.code;
        this.openDialog(msg);
        this.spinner = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  openDialog(msg) {
    this.dialog.open(AdminDialogComponent, {
      //data: { email: this.email, role: this.role }
      data: { msg }
    });
  }
}
