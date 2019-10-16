import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Subscription } from "rxjs"
import { UIService } from "../../shared/ui.service"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

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

  loadingStateChangedSubscription: Subscription
  availableExercisesChangedSubscription: Subscription

  ngOnInit() {
    this.loadingStateChangedSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState),
    )
    this.availableExercisesChangedSubscription = this.trainingService.availableExercisesChangedSubscription.subscribe(
      (availableExcercises) => {
        this.availableExcercises = availableExcercises
      },
    )
    //
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy(): void {
    this.availableExercisesChangedSubscription.unsubscribe()
    this.loadingStateChangedSubscription.unsubscribe()
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.selectedExerciseId)
  }
}
