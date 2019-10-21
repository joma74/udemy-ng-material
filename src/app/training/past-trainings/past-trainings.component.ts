import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core"
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Exercise } from "../exercise.model"
import * as fromTraining from "../training.reducer"
import { TrainingService } from "../training.service"

@AutoUnsubscribe()
@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"],
})
export class PastTrainingsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) {}
  COLUMNHEADERNAME: string[] = [
    "Name",
    "Duration[s]",
    "Calories[kcal]",
    "Date",
    "State",
  ]

  /**
   * For MatSort to work, these MUST be exactely spelled like the property keys
   * of the data source objects being sorted.
   */
  COLUMNAMESFROMPROPERTYKEYS: string[] = [
    keyOf<Exercise>("name"),
    keyOf<Exercise>("duration"),
    keyOf<Exercise>("calories"),
    keyOf<Exercise>("date"),
    keyOf<Exercise>("state"),
  ]

  @ViewChild(MatSort, { static: true })
  sort: MatSort

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator

  dataSource = new MatTableDataSource<Exercise>()

  ngOnInit() {
    this.store.select(fromTraining.getPastExercises).subscribe({
      next: (pastExercises) => {
        this.dataSource.data = pastExercises
      },
    })
    this.trainingService.fetchPastExercises()
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  ngAfterViewInit() {
    // Because sort and paginator given via ViewChild is not ready
    // while in ngOnInit, the following assignments MUST be done here at this stage
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}

/**
 * See https://stackoverflow.com/q/33547583.
 * See also https://github.com/dsherret/ts-nameof for a more refined version
 * @param name of some property key of TObj
 */
const keyOf = <TObj>(name: keyof TObj) => name
