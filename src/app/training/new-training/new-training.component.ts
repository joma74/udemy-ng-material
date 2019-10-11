import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  availableExcercises: Exercise[] = []

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.availableExcercises = this.trainingService.getAvailableExercises()
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.selectedExerciseId)
  }
}
