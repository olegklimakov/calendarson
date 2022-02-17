import { makeArrayChunks } from '../src/make-array-chunks'

const testArray = new Array(20).fill(null).map((_, i) => i);

describe("Chunkify array test", () => {
  it('should split array to chunks', () => {
    const chunks = makeArrayChunks(testArray, 7)
    expect(chunks.length).toBe(3)
    expect(chunks[0].length).toBe(7)
    expect(chunks[1].length).toBe(7)
    expect(chunks[2].length).toBe(6)
  })

  it('should handle empty array', () => {
    const chunks = makeArrayChunks([], 7)
    expect(chunks.length).toBe(0)
  })
})
