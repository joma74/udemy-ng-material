// tslint:disable-next-line: no-namespace
declare namespace NodeJS {
  export interface ProcessEnv {
    RELEASE_PROC_TYPE: "evalnv" | "release"
  }
}
