import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Subscription } from "rxjs"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(private trainingService: TrainingService) {}

  exercisesChangedSubscription: Subscription

  availableExcercises: Exercise[]

  ngOnInit() {
    this.exercisesChangedSubscription = this.trainingService.exercisesChangedSubscription.subscribe(
      (availableExcercises) => {
        this.availableExcercises = availableExcercises
      },
    )
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy(): void {
    this.exercisesChangedSubscription.unsubscribe()
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.selectedExerciseId)
  }
}
