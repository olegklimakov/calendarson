import { Calendarson } from "../src/calendarson"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new Calendarson()).toBeInstanceOf(Calendarson)
  })
})
