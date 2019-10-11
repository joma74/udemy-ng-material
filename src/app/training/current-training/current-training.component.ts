import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { MatDialog } from "@angular/material"
import { TrainingService } from "../training.service"
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
  private timer: NodeJS.Timer

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
  ) {}

  /**
   * This component starts automatically as soon as it is shown. See training.component.html
   */
  ngOnInit() {
    this.startOrResumeTimer()
  }

  displayTrainingPlan() {
    const ex = this.trainingService.getCurrentExercise()
    return `Do ${ex.name} for ${ex.duration} seconds`
  }

  startOrResumeTimer() {
    const step =
      (this.trainingService.getCurrentExercise().duration / 100) * 1000
    this.timer = setInterval(() => {
      if (this.progress < 100) {
        this.progress = this.progress + 1
      } else {
        clearInterval(this.timer)
      }
    }, step)
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
