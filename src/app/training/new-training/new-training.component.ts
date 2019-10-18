import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Subscription } from "rxjs"
import { UIService } from "../../shared/ui.service"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

@AutoUnsubscribe()
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
  ) {}

  isLoading: boolean
  availableExcercises: Exercise[]

  loadingStateChangedSub: Subscription
  availableExercisesChangedSub: Subscription

  ngOnInit() {
    this.loadingStateChangedSub = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState),
    )
    this.availableExercisesChangedSub = this.trainingService.availableExercisesChangedSub.subscribe(
      (availableExcercises) => {
        this.availableExcercises = availableExcercises
      },
    )
    //
    this.trainingService.fetchAvailableExercises()
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.selectedExerciseId)
  }
}
