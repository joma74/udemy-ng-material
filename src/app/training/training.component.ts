import { Component, OnDestroy, OnInit } from "@angular/core"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable } from "rxjs"
import * as fromTraining from "./training.reducer"

@AutoUnsubscribe()
@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining$: Observable<boolean>
  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.isExerciseRunning)
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }
}
