import { Component, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material"
import { TrainingService } from "../training.service"
import { StopTrainingComponent } from "./stop-training.component"

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit {
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
        this.trainingService.onCompleteExercise()
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
        this.trainingService.onCancelExercise(this.progress)
      } else {
        this.startOrResumeTimer()
      }
    })
  }
}
