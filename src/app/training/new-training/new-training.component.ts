import { Component, OnInit } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { NgForm } from "@angular/forms"
import { Observable } from "rxjs"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit {
  availableExcercises: Observable<any>

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
  ) {}

  ngOnInit() {
    // this.availableExcercises = this.trainingService.getAvailableExercises()
    this.availableExcercises = this.db
      .collection("availableExercises")
      .valueChanges()
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.selectedExerciseId)
  }
}
