import { Component, OnDestroy, OnInit } from "@angular/core"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Subscription } from "rxjs"
import { TrainingService } from "./training.service"

@AutoUnsubscribe()
@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false
  exerciseChangedSub: Subscription
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseChangedSub = this.trainingService.exerciseChangedSub.subscribe(
      (exChanged) => {
        exChanged
          ? (this.ongoingTraining = true)
          : (this.ongoingTraining = false)
      },
    )
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }
}
