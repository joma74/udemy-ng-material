import { Component, OnDestroy, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Subject } from "rxjs"
import { take, takeUntil, takeWhile } from "rxjs/operators"
import * as fromTraining from "../training.reducer"
import { TrainingService } from "../training.service"
import { StopTrainingComponent } from "./stop-training.component"

@AutoUnsubscribe()
@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0
  private timer: NodeJS.Timer
  public displayTrainingPlan: string
  // see https://medium.com/@stodge/ngrx-common-gotchas-8f59f541e47c
  private ngUnsubscribe: Subject<void> = new Subject<void>()

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) {}

  /**
   * This component starts automatically as soon as it is shown. See training.component.html
   */
  ngOnInit() {
    this.startOrResumeTimer()
    this.store
      .select(fromTraining.getRunningExercise)
      .pipe(
        // until the component issues a unsubscribe itself
        takeUntil(this.ngUnsubscribe),
        // or the exercise is not running, which may occur between ngIf in parent comp html
        takeWhile(() => {
          let result = false
          this.store.select(fromTraining.isExerciseRunning).subscribe({
            next: (current) => {
              result = current
            },
          })
          return result
        }),
      )
      .subscribe({
        next: (runningExercise) => {
          this.displayTrainingPlan = `Do ${runningExercise.name} for ${runningExercise.duration} seconds`
        },
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  startOrResumeTimer() {
    this.store
      .select(fromTraining.getRunningExercise)
      .pipe(take(1))
      .subscribe({
        next: (runningExercise) => {
          const step = (runningExercise.duration / 100) * 1000
          this.timer = setInterval(() => {
            if (this.progress < 100) {
              this.progress = this.progress + 1
            } else {
              this.trainingService.onCompleteExercise()
              clearInterval(this.timer)
            }
          }, step)
        },
        error: (error) => {
          this.trainingService.onErrorExercise(error)
        },
      })
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
