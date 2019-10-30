import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScoreService } from "../score.service";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  sortedScore = [];
  show;
  scoreboardId;
  scoreSubscription;

  constructor(
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.scoreboardId = this.activatedRoute.snapshot.paramMap.get(
      "classroomId"
    );

    this.scoreSubscription = this.scoreService
      .getScores(this.scoreboardId)
      .subscribe(scoreObj => {
        this.sortedScore = scoreObj.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return { id, ...data };
        });
        //console.log(scoreObj[0].payload.doc.data());
        //console.log(scoreObj[0].payload.doc.id);

        this.sortedScore
          .sort((a, b) => {
            return b.score - a.score;
          })
          .slice(0, 5);
      });
  }

  clicked(i, event) {
    this.show !== i ? (this.show = i) : (this.show = -1);
    event.stopPropagation();
  }

  delete(i) {
    console.log(this.sortedScore[i]);
    //this.adminService.deleteSingleScore(this.routeId, this.sortedScore[i].id);
    this.scoreService.deleteSingleScore(
      this.scoreboardId,
      this.sortedScore[i].id
    );
    this.show = !this.show;
  }
}
