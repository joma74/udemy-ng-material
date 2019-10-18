import { LoadingActions, UIACTION } from "./ui.actions"

export interface State {
  isLoading: boolean
}

const INITIALSTATE: State = {
  isLoading: false,
}
//

export function uiReducer(
  state: State = INITIALSTATE,
  action: LoadingActions,
): State {
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
      return state
  }
  // return assertUnreachable(action)
}

export const getIsLoading = (state: State) => state.isLoading

/**
 * Indicates at TS compile time you forgot to include cases in your exhaustive switch. At runtime ...?
 * See https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 * @param x by TS flow checks it should never reach this
 */
function assertUnreachable(x: never): never {
  throw new Error("Switch block is not exhaustive")
}
