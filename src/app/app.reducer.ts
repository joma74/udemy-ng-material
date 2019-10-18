import { Action, ActionReducer } from "@ngrx/store"

export interface UIState {
  isLoading: boolean
}

const initialState: UIState = {
  isLoading: false,
}

const enum UIACTION {
  START_LOADING = "START_LOADING",
  STOP_LOADING = "STOP_LOADING",
}

// see https://medium.com/@AustinMatherne/ngrx-action-types-with-string-enums-d4b752f3c336

export class StartLoading implements Action {
  readonly type = UIACTION.START_LOADING
}

export class StopLoading implements Action {
  readonly type = UIACTION.STOP_LOADING
}

export type LoadingActions = StartLoading | StopLoading

//

export function appReducer(
  state: UIState = initialState,
  action: LoadingActions,
): UIState {
  switch (action.type) {
    case UIACTION.START_LOADING:
      return {
        isLoading: true,
      }
    case UIACTION.STOP_LOADING:
      return {
        isLoading: false,
      }
    default:
      return initialState
  }
  // return assertUnreachable(action)
}

/**
 * Indicates at TS compile time you forgot to include cases in your exhaustive switch. At runtime ...?
 * See https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 * @param x by TS flow checks it should never reach this
 */
function assertUnreachable(x: never): never {
  throw new Error("Switch block is not exhaustive")
}
