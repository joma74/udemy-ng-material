import { Component, OnInit } from "@angular/core"
import { Subscription } from "rxjs"
import { TrainingService } from "./training.service"

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false
  exerciseChangedSubscription: Subscription
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseChangedSubscription = this.trainingService.exerciseChangedSubscription.subscribe(
      (exChanged) => {
        exChanged
          ? (this.ongoingTraining = true)
          : (this.ongoingTraining = false)
      },
    )
  }
}
