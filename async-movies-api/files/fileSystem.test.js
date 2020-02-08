const { loadCSV, parseCSV, createHTML } = require('./fileSystem')

describe('FileSystem', () => {
  describe('loadCSV should', () => {
    test('return a CSV file', async () => {
      const data = await loadCSV('test')

      const expected = 'rank,title,genre\n1,Guardians of the Galaxy,"Action,Adventure,Sci-Fi"\n'

      expect(data).toBe(expected)
    })
  })

  describe('parseCSV should', () => {
    test('return parsed CSV', async () => {
      const csv = 'rank,title,genre\n1,Guardians of the Galaxy,"Action,Adventure,Sci-Fi"\n'

      const expected = [{
        rank: "1",
        title: 'Guardians of the Galaxy',
        genre: 'Action,Adventure,Sci-Fi'
      }]

      const parsed = await parseCSV(csv)

      expect(parsed).toEqual(expected)
    })
  })

  describe('createHTML should', () => {
    test('iterate array and create HTML', async () => {
      const input = [{
        rank: "1",
        title: 'Guardians of the Galaxy',
        genre: 'Action,Adventure,Sci-Fi'
      }]

      const expected = 'Created with success'
      const result = await createHTML(input)

      expect(result).toEqual([expected])
    })
  })
})
