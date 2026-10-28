// Headless slide capture — render a deck route and screenshot the 1280×720
// .deck frame to a PNG, so a slide can be self-reviewed against the design
// rubric without a human looking. Hermetic: starts its own Vite dev server.
//
//   npm run shot <session/slide> [outfile]
//   npm run shot financial-market/10            → shot-financial-market-10.png
//   npm run shot financial-market/10 /tmp/x.png
//
// Self-review loop: build → `npm run shot <route>` → Read the PNG → critique
// against slides-jsx-convention.md "자가검수" checklist → fix → repeat.
import { createServer } from 'vite'
import { chromium } from 'playwright'

const route = (process.argv[2] || 'financial-market/10').replace(/^\/+|\/+$/g, '')
const out = process.argv[3] || `shot-${route.replace(/\W+/g, '-')}.png`

const server = await createServer({ server: { port: 0 }, logLevel: 'warn' })
await server.listen()
const base = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await chromium.launch()
try {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 840 },
    deviceScaleFactor: 2,
  })
  // 'commit' (not load/networkidle) — Vite's HMR websocket keeps the network
  // busy so load/networkidle can hang. We only need navigation committed; the
  // frame selector below gates actual render-readiness.
  await page.goto(`${base}/#/${route}`, { waitUntil: 'commit' })
  const deck = page.locator('[data-deck-frame]') // stable hook on the 1280×720 frame
  await deck.waitFor({ state: 'visible', timeout: 45000 })
  await page.evaluate(() => document.fonts && document.fonts.ready)
  await page.waitForTimeout(400) // let layout/fonts settle
  await deck.screenshot({ path: out })
  console.log('captured', out)
} finally {
  await browser.close()
  await server.close()
}
