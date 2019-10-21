import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store"

import * as fromAuth from "./auth/auth.reducer"
import * as fromUi from "./shared/ui.reducer"

export const enum SUBFEATURE {
  UI = "ui",
  AUTH = "auth",
}

export interface State {
  [SUBFEATURE.UI]: fromUi.State
  [SUBFEATURE.AUTH]: fromAuth.State
}

export const appReducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
}

export const getUiState = createFeatureSelector<fromUi.State>(SUBFEATURE.UI)
export const getIsLoading = createSelector(
  getUiState,
  fromUi.getIsLoading,
)

export const getAuthState = createFeatureSelector<fromAuth.State>(
  SUBFEATURE.AUTH,
)
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated,
)
