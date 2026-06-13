/* ═══════════════════════════════════════════
   SLIDE EXPORT — render each slide to a high-res PNG (PPT background)

   - Renders the slide component off-screen at the native 1280×720 frame,
     then rasterizes via html-to-image at a pixel ratio (default 3× → 4K).
   - Captures a CLEAN slide (no deck border / radius / shadow / nav chrome),
     so the PNG drops straight in as a full-bleed PPT background.
   - Embeds the Pretendard variable font once and reuses it for every slide,
     so Korean glyphs render correctly inside the isolated SVG snapshot
     (the browser can't see page-loaded fonts when rasterizing an SVG image).

   Session-aware: every public function takes the active session's `slides`
   array, so one app can export any deck without a hard-coded slide import.
═══════════════════════════════════════════ */
import { createRoot } from 'react-dom/client'
import { toBlob } from 'html-to-image'
import JSZip from 'jszip'

const W = 1280
const H = 720

/* Pretendard variable font (full glyph coverage) — one file, fetched once. */
const PRETENDARD_VAR_URL =
  'https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2'

let _fontCssPromise = null

/**
 * Build a self-contained @font-face CSS for Pretendard as a data URL.
 * Returned once and memoized; resolves to `undefined` on failure so
 * html-to-image falls back to its own (slower) font scanning.
 */
function getFontEmbedCSS() {
  if (!_fontCssPromise) {
    _fontCssPromise = (async () => {
      try {
        const buf = await (await fetch(PRETENDARD_VAR_URL)).arrayBuffer()
        let bin = ''
        const bytes = new Uint8Array(buf)
        const chunk = 0x8000
        for (let i = 0; i < bytes.length; i += chunk) {
          bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
        }
        const b64 = btoa(bin)
        return (
          `@font-face{font-family:'Pretendard';font-style:normal;` +
          `font-weight:45 920;font-display:swap;` +
          `src:url(data:font/woff2;base64,${b64}) format('woff2-variations');}`
        )
      } catch (e) {
        console.warn('[exportSlides] Pretendard embed failed, falling back:', e)
        return undefined
      }
    })()
  }
  return _fontCssPromise
}

/** Wait until web fonts are ready and every <img> in `node` has loaded. */
async function waitForAssets(node) {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready
    } catch {
      /* ignore */
    }
  }
  const imgs = Array.from(node.querySelectorAll('img'))
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = res
            img.onerror = res
          })
    )
  )
}

const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

/* SVG presentation props that slides set via CSS classes (fill/stroke/dashes…). */
const SVG_PRESENTATION_PROPS = [
  'fill', 'fill-opacity', 'fill-rule',
  'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray',
  'stroke-linecap', 'stroke-linejoin', 'stroke-dashoffset', 'stroke-miterlimit',
  'opacity', 'color',
  'font-family', 'font-size', 'font-weight', 'font-style',
  'letter-spacing', 'text-anchor', 'dominant-baseline',
]

/**
 * Inline computed presentation styles onto every SVG descendant.
 *
 * html-to-image deep-clones <svg> natively and does NOT inline computed styles
 * on SVG children, so class-based fills/strokes (which live in external CSS the
 * isolated SVG snapshot can't see) collapse to defaults (black fill, no dashes).
 * Copying them to inline style — which survives the native clone — preserves the
 * intended look.
 */
function inlineSvgStyles(root) {
  root.querySelectorAll('svg, svg *').forEach((el) => {
    const cs = window.getComputedStyle(el)
    for (const prop of SVG_PRESENTATION_PROPS) {
      const value = cs.getPropertyValue(prop)
      if (value) el.style.setProperty(prop, value)
    }
  })
}

/**
 * Mount a slide off-screen at the native frame, run `fn(stage)`, then clean up.
 *
 * The off-screen offset lives on an OUTER wrapper; the captured `stage` itself
 * has no positioning. html-to-image clones the capture node with its own inline
 * styles, so a `position:fixed; left:-99999px` on the captured node would push
 * its content off the SVG canvas and yield a blank image — keeping the offset
 * one level up avoids that.
 */
async function withOffscreenSlide(SlideComponent, fn) {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position:fixed;left:-99999px;top:0;pointer-events:none;z-index:-1;'
  const stage = document.createElement('div')
  stage.style.cssText = `width:${W}px;height:${H}px;overflow:hidden;background:var(--bg);`
  wrapper.appendChild(stage)
  document.body.appendChild(wrapper)
  const root = createRoot(stage)
  try {
    root.render(<SlideComponent />)
    await raf()
    await waitForAssets(stage)
    await raf()
    inlineSvgStyles(stage)
    return await fn(stage)
  } finally {
    root.unmount()
    wrapper.remove()
  }
}

/**
 * Rasterize the slide at `index` (0-based) within `slides` to a PNG Blob.
 * Renders the slide off-screen at the native 1280×720 frame, so the result is
 * a clean full-bleed image with no deck chrome.
 */
export async function slideToPngBlob(slides, index, { pixelRatio = 3 } = {}) {
  const fontEmbedCSS = await getFontEmbedCSS()
  const SlideComponent = slides[index].component
  return withOffscreenSlide(SlideComponent, (host) =>
    toBlob(host, {
      pixelRatio,
      width: W,
      height: H,
      backgroundColor: '#ffffff',
      cacheBust: true,
      fontEmbedCSS,
    })
  )
}

const pad2 = (n) => String(n).padStart(2, '0')

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  // revoke after the click has had a chance to start the download
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Download a single slide (0-based index) as `slide-NN.png`. */
export async function downloadSlide(slides, index, { pixelRatio = 3 } = {}) {
  const blob = await slideToPngBlob(slides, index, { pixelRatio })
  saveBlob(blob, `slide-${pad2(index + 1)}.png`)
}

/**
 * Download every slide as `slide-NN.png` bundled into a single ZIP.
 * `onProgress(done, total)` fires after each slide is rendered.
 */
export async function downloadAllSlides(slides, { pixelRatio = 3, onProgress, zipName = 'slides.zip' } = {}) {
  const fontEmbedCSS = await getFontEmbedCSS()
  const zip = new JSZip()
  const total = slides.length
  for (let i = 0; i < total; i++) {
    const SlideComponent = slides[i].component
    const blob = await withOffscreenSlide(SlideComponent, (host) =>
      toBlob(host, {
        pixelRatio,
        width: W,
        height: H,
        backgroundColor: '#ffffff',
        cacheBust: true,
        fontEmbedCSS,
      })
    )
    zip.file(`slide-${pad2(i + 1)}.png`, blob)
    if (onProgress) onProgress(i + 1, total)
  }
  const out = await zip.generateAsync({ type: 'blob' })
  saveBlob(out, zipName)
}
