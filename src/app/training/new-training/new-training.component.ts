import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable, Subscription } from "rxjs"
import * as fromApp from "../../app.reducer"
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
    private store: Store<fromApp.State>,
  ) {}

  isLoading$: Observable<boolean>
  availableExcercises: Exercise[]

  availableExercisesChangedSub: Subscription

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading)
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
