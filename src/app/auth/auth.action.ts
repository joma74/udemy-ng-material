import { Action } from "@ngrx/store"

export const enum AUTHACTION {
  SET_AUTHENTICATED = "[AUTH] SET_AUTHENTICATED",
  SET_UNAUTHENTICATED = "[AUTH] SET_UNAUTHENTICATED",
}

// see https://medium.com/@AustinMatherne/ngrx-action-types-with-string-enums-d4b752f3c336

export class SetAuthenticated implements Action {
  readonly type = AUTHACTION.SET_AUTHENTICATED
}

export class SetUnauthenticated implements Action {
  readonly type = AUTHACTION.SET_UNAUTHENTICATED
}

export type AuthAction = SetAuthenticated | SetUnauthenticated
