import { AUTHACTION, AuthAction } from "./auth.action"

export interface State {
  isAuthenticated: boolean
}

const INITIALSTATE: State = {
  isAuthenticated: false,
}
//

export function authReducer(
  state: State = INITIALSTATE,
  action: AuthAction,
): State {
  switch (action.type) {
    case AUTHACTION.SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
      }
    case AUTHACTION.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
      }
    default:
      return state
  }
  // return assertUnreachable(action)
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated

/**
 * Indicates at TS compile time you forgot to include cases in your exhaustive switch. At runtime ...?
 * See https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 * @param x by TS flow checks it should never reach this
 */
function assertUnreachable(x: never): never {
  throw new Error("Switch block is not exhaustive")
}
