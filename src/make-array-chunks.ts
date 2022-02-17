export const makeArrayChunks = (array: any[], chunkSize: number): any[][] => {
  return array.reduce((res, item, index) => {
    const chunkIndex = Math.floor(index/chunkSize)

    if(!res[chunkIndex]) {
      res[chunkIndex] = [] // start a new chunk
    }

    res[chunkIndex].push(item)

    return res
  }, []);
}
