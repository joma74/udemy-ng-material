import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { MatDialog } from "@angular/material"
import { StopTrainingComponent } from "./stop-training.component"

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit {
  @Output()
  trainingExit = new EventEmitter<void>()

  progress = 0
  timer: NodeJS.Timer

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      if (this.progress < 100) {
        this.progress = this.progress + 5
      } else {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingExit.emit()
      } else {
        this.startOrResumeTimer()
      }
    })
  }
}
