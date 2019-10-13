import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core"
import { MatSort, MatTableDataSource } from "@angular/material"
import { Exercise } from "../exercise.model"
import { TrainingService } from "../training.service"

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  constructor(private trainingService: TrainingService) {}
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

  dataSource = new MatTableDataSource<Exercise>()

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises()
  }

  ngAfterViewInit() {
    // Because sort given via ViewChild is not ready
    // while in ngOnInit, these assignment MUST be done here at this stage
    this.dataSource.sort = this.sort
  }
}

/**
 * See https://stackoverflow.com/q/33547583.
 * See also https://github.com/dsherret/ts-nameof for a more refined version
 * @param name of some property key of TObj
 */
const keyOf = <TObj>(name: keyof TObj) => name
