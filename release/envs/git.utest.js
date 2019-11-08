jest.mock("execa")

/**
 * @typedef  {import('execa')} execeaT
 * @type jest.Mocked<execeaT>
 */
// @ts-ignore
const execa = require("execa")

test("can read git config", () => {
  const mock = jest.spyOn(execa, "sync")
  /**
   * @type {import('execa').ExecaReturnBase<string>}
   */
  const mockReturnValue = {
    command: null,
    exitCode: null,
    failed: null,
    killed: null,
    signal: null,
    signalDescription: null,
    stderr: null,
    stdout: null,
    timedOut: null,
  }
  mock
    // @ts-ignore
    .mockReturnValueOnce({ ...mockReturnValue, stdout: "testa-mails@hoot.net" })
    .mockReturnValueOnce({ ...mockReturnValue, stdout: "testa74" })
  const semanticreleaseenv = require("./git.js")
  expect(mock).toHaveBeenCalledTimes(2)
  expect(semanticreleaseenv.GIT_AUTHOR_EMAIL).toBe("testa-mails@hoot.net")
  expect(semanticreleaseenv.GIT_AUTHOR_NAME).toBe("testa74")
  expect(semanticreleaseenv.GIT_COMMITTER_EMAIL).toBe("testa-mails@hoot.net")
  expect(semanticreleaseenv.GIT_COMMITTER_NAME).toBe("testa74")
})
