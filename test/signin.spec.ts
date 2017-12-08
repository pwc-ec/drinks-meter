// tslint:disable
import { expect } from 'chai'
import * as Nightmare from 'nightmare'

const newUserEmail = Date.now() + '@nightmarejs.org'
let settings = null
let url = 'http://frontend.bmai.pwc.delivery/'
const isProduction = process.env.NODE_ENV === 'production'
if(!isProduction) {
  settings = {
//      openDevTools: {mode: 'detach'},
    dock: true,
    show: true
  }

  url = 'http://localhost:3000'
  if(process.env.IS_DOCKER) {
    url = 'http://localhost:5000'
  }
}

describe('Test ' + url + ' against ' + (process.env.API_URL_LOCALHOST ? process.env.API_URL_LOCALHOST : 'graphcool'), function() {
  this.timeout(30000)

  const nightmare = Nightmare(settings)

  it('should sign in', async () => {
    const userFullname = await nightmare
      .goto(url)
      .wait('input[type="email"]')
      .type('input[type="email"]', 'pwc@pwc.com')
      .type('input[type="password"]', 'pwc')
      .click('button')
      .wait('button[aria-label="Menu"]')
      .evaluate(() => document.querySelector('header div div aside').textContent)

    expect(userFullname).to.equal('Nicolas Patra')
  })

  it('should create user', async () => {
    await nightmare
      .click('button[aria-label="Menu"]')
      .wait('ul[role="menu"] > li')
      .click('ul[role="menu"] > li')
      .wait('button[aria-label="add"]')
      .click('button[aria-label="add"]')
      .wait('div[role="document"]')
      .wait('div[role="document"] button[type="submit"]')
      .type('div[role="document"] input[type="text"]', 'Test Nightmare')
      .type('div[role="document"] input[type="email"]', newUserEmail)
      .type('div[role="document"] input[type="password"]', '5Znaku')
      .click('div[role="document"] div[aria-haspopup="true"]')
      .wait('ul[role="listbox"]')
      .click('ul[role="listbox"] li')
      .click('div[role="document"] button[type="submit"]')
      .wait('#snackbar-message')
  })

  it('should sign out', async () => {
    const buttonText = await nightmare
      .click('button[aria-label="Menu"]')
      .click('ul[role="menu"] li:nth-child(3)')
      .evaluate(() => document.querySelector('button[type="submit"] > span').textContent)

    expect(buttonText).to.equal('Sign In')
  })

  it('should sign in as a just created user', async () => {
    const userFullname = await nightmare
      .wait(500)
      .type('input[type="email"]', newUserEmail)
      .type('input[type="password"]', '5Znaku')
      .click('button')
      .wait('button[aria-label="Menu"]')
      .evaluate(() => document.querySelector('header div div aside').textContent)

    expect(userFullname).to.equal('Test Nightmare')
  })

  it('should go to create report page', async () => {
    await nightmare
      .click('header div div div:nth-child(2) div[role="button"]')
  })

  it('should remove preselected company', async () => {
    await nightmare
      .wait('button[aria-label="Click to remove"]')
      .click('button[aria-label="Click to remove"]')
      .wait(500)
  })

  it('should create report of two companies', async () => {
    await nightmare
      .type('input[type="search"]', 'b')
      .wait('li[role="button"]')
      .mousedown('li[role="button"]')
      .type('input[type="search"]', 'm')
      .wait('li[role="button"]')
      .mousedown('li[role="button"]')
      .wait(500)
      .click('main article div:nth-child(4) button')
      .wait('main > div > div:nth-child(2) button')
  })

  let lineCount = 0
  it('should create graph', async () => {
    lineCount = await nightmare
      .click('main > div > div:nth-child(2) button')
      .wait('ul li input[type="checkbox"]')
      .click('ul li input[type="checkbox"]')
      .wait(500)
      .click('div[role="document"] div div div button:nth-child(2)')
      .wait('div.recharts-responsive-container')
      .evaluate(() => document.querySelectorAll('g.recharts-line').length + document.querySelectorAll('g.recharts-bar').length)
  })

  let lineCountTwoKpis = 0
  it('should add two kpis into graph', async () => {
    lineCountTwoKpis = await nightmare
      .click('button[aria-label="add kpi"]')
      .wait('ul li:nth-child(2) input[type="checkbox"]')
      .click('ul li:nth-child(2) input[type="checkbox"]')
      .click('ul li:nth-child(3) input[type="checkbox"]')
      .wait(500)
      .click('div[role="document"] div div div button:nth-child(2)')
      .wait((lineCount) => {
        const lines = document.querySelectorAll('g.recharts-line').length
        const bars = document.querySelectorAll('g.recharts-bar').length
        return lines + bars !== lineCount
      }, lineCount)
      .evaluate(() => document.querySelectorAll('g.recharts-line').length + document.querySelectorAll('g.recharts-bar').length)

    expect(lineCountTwoKpis).to.be.above(lineCount)
  })

  let lineCountAfterRemove
  it('should remove first kpi from graph', async () => {
    lineCountAfterRemove = await nightmare
      .click('main div[role="button"] svg')
      .wait(2000)
      .evaluate(() => document.querySelectorAll('g.recharts-line').length + document.querySelectorAll('g.recharts-bar').length)

    expect(lineCountAfterRemove).to.be.below(lineCountTwoKpis)
  })

  it('should create another graph', async () => {
    const oldText = await nightmare
      .evaluate(() => (document.querySelector('main div div div div:nth-child(2) h1') as HTMLElement).innerText)

    const lineCount = await nightmare
      .click('main > div > div:nth-child(2) button')
      .wait('ul li input[type="checkbox"]')
      .click('ul li:nth-child(6) input[type="checkbox"]')
      .click('ul li:nth-child(7) input[type="checkbox"]')
      .click('ul li:nth-child(8) input[type="checkbox"]')
      .click('ul li:nth-child(9) input[type="checkbox"]')
      .wait(500)
      .click('div[role="document"] div div div button:nth-child(2)')
      .wait('div.react-draggable')
      .wait('div.recharts-tooltip-wrapper')
      .wait((oldText) => (document.querySelector('main div div div div:nth-child(2) h1') as HTMLElement).innerText !== oldText, oldText)
      .evaluate(() => document.querySelectorAll('g.recharts-line').length + document.querySelectorAll('g.recharts-bar').length)

    expect(lineCount).to.be.least(lineCountAfterRemove)
  })

  it('should change graphs by drag`n`drop', async () => {
    const oldText = await nightmare
      .evaluate(() => (document.querySelector('main div div div div:nth-child(2) h1') as HTMLElement).innerText)

    const newText = await nightmare
      .mousedown('div.react-draggable')
      .wait('div.react-draggable-dragging')
      .evaluate(() => {
        document.dispatchEvent(new Event('mousemove', {position: {x: 100, y: 100}} as EventInit))
      })
      .wait(500)
      .mouseup('div.react-draggable')
      .wait((oldText) => (document.querySelector('main div div div div:nth-child(2) h1') as HTMLElement).innerText !== oldText, oldText)
  })

  it('should delete graph in sidebar', async () => {
    const draggableElement = await nightmare
      .click('button[aria-label="Delete graph"]:nth-child(2)')
      .wait('#snackbar-message')
      .wait(1000)
      .evaluate(() => document.querySelector('div.react-draggable'))

    expect(draggableElement).to.be.null
  })

  it('should delete first report in the list', async () => {
    await nightmare
      .click('div[role="button"]')
      .wait('button[aria-label="Delete Report"]')
      .click('button[aria-label="Delete Report"]')
      .wait('#snackbar-message')
  })

  after( async () => {
    await nightmare.end()
  })
})
