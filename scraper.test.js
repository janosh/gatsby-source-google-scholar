'use strict'

const scraper = require('./scraper')

test('scraper finds citation count', () => {
  scraper.search('albert einstein').then(response => {
    response.results.forEach(result => {
      expect(result.citedByCount > 0).toBe(true)
    })
  })
})
