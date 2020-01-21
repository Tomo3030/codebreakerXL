import { GameService } from "./../../game-select/game.service";
import { PartnerRequestComponent } from "./../dialog/partner-request/partner-request.component";
import { UserService } from "./../user.service";
import { LoungeService } from "./../lounge.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { PartnerRejectComponent } from "../dialog/partner-reject/partner-reject.component";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-lounge",
  templateUrl: "./lounge.component.html",
  styleUrls: ["./lounge.component.scss"]
})
export class LoungeComponent implements OnInit, OnDestroy {
  classroomId;
  classList;
  filteredList;
  studentSearch;
  myPick;
  pickedMe;
  user;
  dialogRef;
  hasPicked;
  spinner;
  subscription;
  constructor(
    private loungeService: LoungeService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private gameService: GameService,
    private sharedService: SharedService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.user = await this.sharedService.getUserPromise();
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
    this.unPickPartner();
    console.log(this.classroomId);
    this.subscription = this.loungeService
      .getClassMembers(this.classroomId)
      .subscribe(members => {
        this.classList = this.filteredList = members.filter(user => {
          return user.uid !== this.user.uid;
        });
        this.myPick = members
          .filter(member => {
            return this.user.uid === member.uid && member.myPick;
          })
          .map(user => {
            return user.myPick;
          });
        this.pickedMe = members
          .filter(member => {
            return member.myPick && member.myPick.uid === this.user.uid;
          })
          .map(user => {
            return {
              name: user.name,
              uid: user.uid,
              gameId: user.myPick.gameId
            };
          });

        //if myPick existed and then it got deleted.

        if (this.myPick.length) {
          this.hasPicked = this.myPick[0].name;
        }
        if (this.hasPicked && this.myPick == 0) {
          this.openPartnerRejectDialog(this.hasPicked);
          this.hasPicked = null;
        }

        if (
          //if someone picked me but I picked someone else
          this.myPick[0] &&
          this.pickedMe[0] &&
          this.myPick[0].uid !== this.pickedMe[0].uid
        ) {
          this.loungeService.deletePartnerPick(
            this.classroomId,
            this.pickedMe[0].uid
          );
        }

        if (
          //if two people pick each other.
          this.myPick[0] &&
          this.pickedMe[0] &&
          this.myPick[0].uid === this.pickedMe[0].uid
        ) {
          this.spinner = true;
          let myId = this.myPick[0].gameId;
          let pId = this.pickedMe[0].gameId;
          let gameId = Math.min(myId, pId);
          if (gameId === myId) {
            this.createGame(gameId);
          } else {
            this.joinGame(gameId);
          }
          return;
        }

        if (
          //someone picked me and no dialog is open
          this.pickedMe.length &&
          !this.myPick.length &&
          !this.dialog.openDialogs.length
        ) {
          let len = this.pickedMe.length - 1;
          this.openPartnerRequestDialog(this.pickedMe[len]);
        }

        //someone picked me and than deleted their pick -- close dialog
        if (!this.pickedMe.length && this.dialog.openDialogs.length) {
          this.dialog.closeAll();
        }
      });
  }

  filter() {
    this.filteredList = this.studentSearch
      ? this.classList.filter(user =>
          user.name.toLowerCase().includes(this.studentSearch.toLowerCase())
        )
      : this.classList;
  }

  pickPartner(myPick) {
    this.loungeService.pickPartner(this.classroomId, this.user.uid, myPick);
  }

  unPickPartner() {
    this.loungeService.deletePartnerPick(this.classroomId, this.user.uid);
  }

  openPartnerRequestDialog(user) {
    this.dialogRef = this.dialog.open(PartnerRequestComponent, {
      disableClose: true,
      width: "90%",
      data: { user }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.pickPartner(result);
      } else {
        this.loungeService.deletePartnerPick(this.classroomId, user.uid);
      }
    });
  }

  openPartnerRejectDialog(name) {
    const dialogRef = this.dialog.open(PartnerRejectComponent, {
      width: "90%",
      data: { name }
    });
  }

  createGame(gameId) {
    console.log("i am creater");
    this.gameService.createGame(gameId, this.classroomId).then(gameId => {
      this.router.navigate([
        `/game/${gameId}`,
        { classroomId: this.classroomId }
      ]);
    });
  }

  joinGame(gameId) {
    console.log("i am joiner");
    this.gameService.joinGame(gameId, this.classroomId).then(() => {
      this.router.navigate([
        `/game/${gameId}`,
        { classroomId: this.classroomId }
      ]);
    });
  }
}
