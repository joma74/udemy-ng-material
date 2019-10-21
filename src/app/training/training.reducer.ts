import { createFeatureSelector, createSelector } from "@ngrx/store"
import * as fromApp from "../app.reducer"
import { Exercise } from "./exercise.model"
import { TRAININGACTION, TrainingAction } from "./training.action"

export interface TrainingState {
  availableExercises: Exercise[]
  pastExercises: Exercise[]
  runningExercise: Exercise
}

export const enum SUBFEATURE {
  TRAINING = "training",
}

export interface State extends fromApp.State {
  [SUBFEATURE.TRAINING]: TrainingState
}

const INITIALSTATE: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  runningExercise: null,
}

export function trainingReducer(
  state: TrainingState = INITIALSTATE,
  action: TrainingAction,
): TrainingState {
  switch (action.type) {
    case TRAININGACTION.SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payLoad,
      }
    case TRAININGACTION.SET_PAST_EXERCISES:
      return {
        ...state,
        pastExercises: action.payLoad,
      }
    case TRAININGACTION.START_RUNNING_EXERCISE:
      return {
        ...state,
        runningExercise: state.availableExercises.find(
          (availableExercise) => availableExercise.id === action.payLoad,
        ),
      }
    case TRAININGACTION.UNSET_RUNNING_EXERCISE:
      return {
        ...state,
        runningExercise: null,
      }
    default:
      return state
  }
  // return assertUnreachable(action)
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  SUBFEATURE.TRAINING,
)

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises,
)

export const getPastExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.pastExercises,
)

export const getRunningExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.runningExercise,
)

export const isExerciseRunning = createSelector(
  getTrainingState,
  (state: TrainingState) => state.runningExercise != null,
)

/**
 * Indicates at TS compile time you forgot to include cases in your exhaustive switch. At runtime ...?
 * See https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 * @param x by TS flow checks it should never reach this
 */
function assertUnreachable(x: never): never {
  throw new Error("Switch block is not exhaustive")
}
