import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Exercise } from "./exercise.model"

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
    { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 },
  ]
  private runningExercise: Exercise
  private pastExercises: Exercise[] = []

  exerciseChangedSubscription = new Subject<Exercise>()

  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  onCompleteExercise() {
    this.pastExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "COMPLETED",
    })
    this.runningExercise = null
    this.exerciseChangedSubscription.next(null)
  }

  onCancelExercise(progress: number) {
    this.pastExercises.push({
      ...this.runningExercise,
      duration:
        Math.floor(this.runningExercise.duration * (progress / 100) * 10) / 10,
      calories:
        Math.floor(this.runningExercise.calories * (progress / 100) * 100) /
        100,
      date: new Date(),
      state: "CANCELED",
    })
    this.runningExercise = null
    this.exerciseChangedSubscription.next(null)
  }

  startExercise(selectedExerciseId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => selectedExerciseId === ex.id,
    )
    this.exerciseChangedSubscription.next({ ...this.runningExercise })
  }

  getCurrentExercise() {
    const runningExerciseCpy: Exercise = { ...this.runningExercise }
    return runningExerciseCpy
  }

  getPastExercises() {
    return this.pastExercises.slice()
  }
}
