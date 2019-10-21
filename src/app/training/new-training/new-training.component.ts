import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable } from "rxjs"
import * as fromApp from "../../app.reducer"
import { Exercise } from "../exercise.model"
import * as fromTraining from "../training.reducer"
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
    private store: Store<fromTraining.State>,
  ) {}

  isLoading$: Observable<boolean>
  availableExcercises$: Observable<Exercise[]>

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading)
    this.availableExcercises$ = this.store.select(
      fromTraining.getAvailableExercises,
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
