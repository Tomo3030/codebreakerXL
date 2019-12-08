import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-join-info",
  templateUrl: "./join-info.component.html",
  styleUrls: ["./join-info.component.scss"]
})
export class JoinInfoComponent implements OnInit {
  classroomId;
  url;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
    this.url = `codebreakerxl.com/#/login;classroomId=${this.classroomId}`;
  }
}
