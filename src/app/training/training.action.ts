import { Action } from "@ngrx/store"
import { Exercise } from "./exercise.model"

export const enum TRAININGACTION {
  SET_AVAILABLE_EXERCISES = "[TRAINING] SET_AVAILABLE_EXERCISES",
  SET_PAST_EXERCISES = "[TRAINING] SET_PAST_EXERCISES",
  START_RUNNING_EXERCISE = "[TRAINING] START_RUNNING_EXERCISE",
  UNSET_RUNNING_EXERCISE = "[TRAINING] UNSET_RUNNING_EXERCISE",
}

// see https://medium.com/@AustinMatherne/ngrx-action-types-with-string-enums-d4b752f3c336

export class SetAvailableExercises implements Action {
  readonly type = TRAININGACTION.SET_AVAILABLE_EXERCISES
  constructor(public payLoad: Exercise[]) {}
}

export class SetPastExercises implements Action {
  readonly type = TRAININGACTION.SET_PAST_EXERCISES
  constructor(public payLoad: Exercise[]) {}
}

export class StartRunningExercise implements Action {
  readonly type = TRAININGACTION.START_RUNNING_EXERCISE
  constructor(public payLoad: string) {}
}

export class UnsetRunningExercise implements Action {
  readonly type = TRAININGACTION.UNSET_RUNNING_EXERCISE
}

export type TrainingAction =
  | SetAvailableExercises
  | SetPastExercises
  | StartRunningExercise
  | UnsetRunningExercise
