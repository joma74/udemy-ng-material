import { Action } from "@ngrx/store"

export const enum UIACTION {
  START_LOADING = "[UI] START_LOADING",
  STOP_LOADING = "[UI] STOP_LOADING",
}

// see https://medium.com/@AustinMatherne/ngrx-action-types-with-string-enums-d4b752f3c336

export class StartLoading implements Action {
  readonly type = UIACTION.START_LOADING
}

export class StopLoading implements Action {
  readonly type = UIACTION.STOP_LOADING
}

export type LoadingActions = StartLoading | StopLoading
