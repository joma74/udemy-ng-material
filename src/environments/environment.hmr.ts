import { environment as defaultEnvironment } from "./environment.default"

export const environment = {
  ...defaultEnvironment,
  production: false,
  hmr: true,
}
