"use client"

import * as React from "react"
import MorphOrb from "@/components/ui/ai-thinking-orb-and-input";


/* ------------------------------------------------------------------ types */

export type MascotPortfolioHeroProps = {
  height?: string
  minHeight?: string
  index?: string
  discipline?: string
  tagline?: string
  collection?: [string, string]
  reel?: [string, string]
  year?: string
  initials?: string
  badge?: string
  line2?: string
  line3?: string
  word?: string
  verticalTag?: string
  bracketed?: string
  seekingLabel?: string
  seeking?: string
  href?: string
  services?: string[]
  greetings?: string[]
  skin?: string
  beanie?: string
  shirt?: string
  tag?: string
  accent?: string
  paper?: string
  ink?: string
  className?: string
  onExploreClick?: () => void
}

const SANS_STACK = '"Inter","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'
const DISPLAY_STACK = '"Archivo Black","Arial Black","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'

const CW = 600
const CH = 720

/* --------------------------------------------------------------- gaze math */

export function aim(px: number, py: number, cx: number, cy: number, rx: number, ry: number) {
  const sat = (v: number) => v / Math.sqrt(1 + v * v)
  return [sat((px - cx) / rx), sat((py - cy) / ry)]
}

export function approach(cur: number, target: number, dt: number, rate: number) {
  return target + (cur - target) * Math.exp(-rate * dt)
}

export function pose(x: number, y: number, near: number) {
  return {
    body: { dx: x * 4, dy: 0 },
    head: { dx: x * 10, dy: y * 7, rot: x * 4 },
    ears: { dx: -x * 7, dy: -y * 3, lead: 1 + x * 0.16, trail: 1 - x * 0.16 },
    beanie: { dx: x * 13, dy: y * 4 },
    tag: { dx: x * 7, dy: 0 },
    blush: { dx: x * 20, dy: y * 14 },
    face: { dx: x * 28, dy: y * (y < 0 ? 11 : 20) },
    nose: { dx: x * 10, dy: y * 7 },
    eyes: { dx: x * 4, dy: y * 4, scale: 1 + near * 0.14 },
    brows: { dx: x * 3, dy: y * 2 + Math.min(0, y) * 3 - near * 9 },
  }
}

export function blink(since: number) {
  const d = 0.15
  if (since < 0 || since > d) return 1
  return 1 - Math.sin((Math.PI * since) / d) * 0.92
}

/* ------------------------------------------------------------- room geometry */

type Seg = [number, number, number, number]

function room(): { back: Seg[]; rays: Seg[]; depth: string[] } {
  const x0 = 95, x1 = 905, y0 = 85, y1 = 865
  const vx = (x0 + x1) / 2, vy = (y0 + y1) / 2
  const cols = 14, rows = 11
  const back: Seg[] = [], rays: Seg[] = []
  const out = (x: number, y: number): Seg => {
    const dx = x - vx, dy = y - vy
    const tx = dx > 0 ? (1000 - x) / dx : dx < 0 ? -x / dx : Infinity
    const ty = dy > 0 ? (1000 - y) / dy : dy < 0 ? -y / dy : Infinity
    const t = Math.min(tx, ty)
    return [x, y, x + dx * t, y + dy * t]
  }
  for (let i = 0; i <= cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols
    back.push([x, y0, x, y1])
    rays.push(out(x, y0), out(x, y1))
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + ((y1 - y0) * j) / rows
    back.push([x0, y, x1, y])
    rays.push(out(x0, y), out(x1, y))
  }
  const depth = [1.07, 1.16, 1.28, 1.45, 1.7].map((s) => {
    const l = vx + (x0 - vx) * s, r = vx + (x1 - vx) * s
    const t = vy + (y0 - vy) * s, b = vy + (y1 - vy) * s
    return "M" + l + " " + t + "H" + r + "V" + b + "H" + l + "Z"
  })
  return { back, rays, depth }
}

const ROOM = room()

function flowerPath() {
  const n = 180
  const lens = [1, 0.84, 0.95, 0.78, 0.9]
  let d = ""
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2
    const k = Math.floor(((a + Math.PI / 5) / (Math.PI * 2)) * 5) % 5
    const lobe = Math.pow(Math.abs(Math.cos((a * 5) / 2)), 0.9)
    const r = 50 * (0.3 + 0.7 * lobe * lens[k])
    const x = 60 + Math.cos(a - Math.PI / 2) * r
    const y = 60 + Math.sin(a - Math.PI / 2) * r
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)
  }
  return d + "Z"
}

const FLOWER = flowerPath()
const CSS1 = `
.mph-root{position:relative;width:100%;overflow:hidden;isolation:isolate;background:var(--mph-paper);color:var(--mph-ink);container:mph / size;font-family:var(--mph-sans);-webkit-font-smoothing:antialiased;}
.mph-room{position:absolute;inset:0;width:100%;height:100%;display:block;color:var(--mph-ink);pointer-events:none;}
.mph-room line,.mph-room path{vector-effect:non-scaling-stroke;}
.mph-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100cqw,177.78cqh);aspect-ratio:16/9;container:mphs / inline-size;}
.mph-top{position:absolute;left:4.6%;right:4.6%;top:4.4%;display:grid;grid-template-columns:auto auto 1fr auto auto;align-items:center;column-gap:2.4cqw;font-size:1.05cqw;font-weight:800;line-height:1.1;text-transform:uppercase;letter-spacing:.02em;}
.mph-index{display:inline-flex;align-items:center;gap:.9em;border:.12cqw solid var(--mph-ink);border-radius:999px;padding:.12em .9em .12em .12em;font-size:.72em;}
.mph-index b{background:var(--mph-accent);color:var(--mph-ink);border-radius:999px;padding:.3em 1.2em;font-weight:800;}
.mph-tagline{font-size:1.18em;font-weight:900;margin-left:1cqw;}
.mph-brace{grid-column:4;font-size:1.3em;font-weight:700;letter-spacing:.04em;margin-right:2.6cqw;}
.mph-reel{grid-column:5;display:flex;align-items:center;gap:.8em;font-size:.8em;text-align:right;}
.mph-reel i{display:block;width:1.9em;height:1.9em;border-radius:50%;background:var(--mph-accent);border:.12cqw solid var(--mph-ink);flex:none;}
.mph-h1{position:absolute;left:8.8%;top:17.5%;margin:0;font-family:var(--mph-display);font-weight:900;font-size:6.5cqw;line-height:.93;letter-spacing:-.045em;text-transform:uppercase;color:var(--mph-ink);}
.mph-line{display:block;width:max-content;white-space:nowrap;position:relative;}
.mph-ch{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1),color .2s;}
.mph-ch:hover{transform:translateY(-.08em) rotate(-4deg);color:var(--mph-accent);}
.mph-arrow{display:inline-block;width:.6em;height:.6em;margin:0 .06em 0 .1em;vertical-align:-.02em;}
.mph-arrow path{stroke:currentColor;stroke-width:15;fill:none;stroke-linecap:square;}
.mph-badge{position:absolute;top:-.02em;left:calc(100% + .55em);font-family:var(--mph-sans);font-size:.2em;font-weight:800;letter-spacing:0;line-height:1;text-transform:none;border:.13cqw solid var(--mph-ink);border-radius:50%;padding:.75em 1.15em;transform:rotate(-9deg);transition:background .25s,transform .4s cubic-bezier(.3,1.6,.5,1);cursor:default;}
.mph-badge sup{font-size:.7em;margin-left:.1em;}
.mph-badge:hover{background:var(--mph-accent);transform:rotate(6deg) scale(1.08);}
.mph-swash{position:relative;display:inline-block;}
.mph-swash svg{position:absolute;left:-.95em;top:.3em;width:2.55em;height:.72em;overflow:visible;pointer-events:none;}
.mph-swash path{fill:none;stroke:var(--mph-ink);stroke-width:.2cqw;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;animation:mph-draw 1.6s .5s cubic-bezier(.6,0,.2,1) both;}
.mph-h1:hover .mph-swash path{animation:mph-draw 1.1s cubic-bezier(.6,0,.2,1) both;}
.mph-l4{font-size:1.2em;letter-spacing:-.02em;margin-top:.04em;}
.mph-vtag{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:-.02em;margin:0 .1em 0 .06em;width:.2em;}
.mph-vtag span{display:block;background:var(--mph-ink);color:var(--mph-paper);writing-mode:vertical-rl;font-family:var(--mph-sans);font-size:.105em;font-weight:800;letter-spacing:.12em;padding:.55em 0;text-align:center;}
.mph-vtag i{display:block;height:.34em;background:repeating-linear-gradient(to bottom,var(--mph-ink) 0 .02em,transparent .02em .045em);}
.mph-bracket{position:relative;display:inline-block;padding:0 .08em;}
.mph-bracket svg{position:absolute;left:-.02em;right:-.02em;top:-.1em;bottom:-.12em;width:calc(100% + .04em);height:calc(100% + .22em);overflow:visible;}
.mph-bracket path{fill:none;stroke:var(--mph-ink);stroke-width:.62cqw;stroke-linecap:butt;transition:transform .45s cubic-bezier(.3,1.6,.5,1);}
.mph-bracket:hover .mph-arc-t{transform:translateY(-10px);}
.mph-bracket:hover .mph-arc-b{transform:translateY(10px);}
.mph-star{display:inline-block;font-size:.66em;vertical-align:.5em;margin-left:.02em;transition:transform .6s cubic-bezier(.3,1.6,.5,1);}
.mph-l4:hover .mph-star{transform:rotate(180deg) scale(1.2);}
`
const CSS2 = `
.mph-pill{position:absolute;left:8.8%;top:72.8%;display:flex;align-items:stretch;font-size:1.72cqw;font-weight:800;line-height:1;}
.mph-pill-a{position:relative;z-index:1;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:999px;padding:.72em 1.25em;}
.mph-pill-b{display:inline-flex;align-items:center;gap:.5em;margin-left:-1.4em;padding:.72em 3.4em .72em 3.1em;background:var(--mph-accent);color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:0 999px 999px 0;text-decoration:none;transition:background .25s,color .25s,padding .35s cubic-bezier(.3,1.4,.5,1);}
.mph-pill-b em{font-style:normal;display:inline-block;width:0;overflow:hidden;opacity:0;transition:width .35s,opacity .25s;}
.mph-pill-b:hover,.mph-pill-b:focus-visible{background:var(--mph-ink);color:var(--mph-paper);padding-right:2.4em;outline:none;}
.mph-pill-b:hover em,.mph-pill-b:focus-visible em{width:1em;opacity:1;}
.mph-flower{position:absolute;left:35.4%;top:64%;width:7.4%;aspect-ratio:1;animation:mph-spin 22s linear infinite;cursor:grab;}
.mph-flower svg{display:block;width:100%;height:100%;overflow:visible;transition:transform .5s cubic-bezier(.3,1.8,.5,1);}
.mph-flower:hover svg{transform:scale(1.18) rotate(40deg);}
.mph-flower path{fill:#fff;stroke:var(--mph-ink);stroke-width:2.6;stroke-linejoin:round;}
.mph-curl{position:absolute;left:43.2%;top:52.5%;width:5.6%;aspect-ratio:1;overflow:visible;pointer-events:none;}
.mph-curl path{fill:none;stroke:var(--mph-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;animation:mph-draw 1.4s 1s cubic-bezier(.6,0,.2,1) both;}
.mph-services{position:absolute;left:4.6%;bottom:4.6%;display:flex;gap:4cqw;margin:0;padding:0;list-style:none;font-size:1.3cqw;font-weight:800;}
.mph-services li{position:relative;cursor:default;padding-bottom:.25em;}
.mph-services li::after{content:"";position:absolute;left:0;right:0;bottom:0;height:.18em;background:var(--mph-accent);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.6,0,.2,1);}
.mph-services li:hover::after{transform:scaleX(1);}
.mph-rule{position:absolute;width:0;border-left:.1cqw solid var(--mph-ink);}
.mph-rule::after{content:"";position:absolute;bottom:0;left:-.1cqw;width:1.1cqw;border-top:.1cqw solid var(--mph-ink);transform:rotate(28deg);transform-origin:left;}
.mph-rule-l{left:3.7%;top:23%;height:13%;}
.mph-rule-r{left:94.8%;top:66%;height:13%;}
.mph-char{position:absolute;left:55.5%;bottom:-1.2%;width:40.5%;aspect-ratio:600/720;padding:0;margin:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:40% 40% 8% 8%;}
.mph-char:focus-visible{outline:.2cqw dashed var(--mph-ink);outline-offset:.4cqw;}
.mph-char svg{display:block;width:100%;height:100%;overflow:visible;}
.mph-tagwig{transform-box:fill-box;transform-origin:50% 0;}
.mph-happy .mph-tagwig{animation:mph-wiggle .9s cubic-bezier(.3,1.6,.5,1);}
.mph-bubble{position:absolute;left:-4%;top:6%;max-width:46%;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:1.4em 1.4em 1.4em .2em;padding:.8em 1.1em;font-size:1.3cqw;font-weight:800;line-height:1.2;text-align:left;box-shadow:.35cqw .35cqw 0 var(--mph-accent);transform-origin:0 100%;transform:scale(0) rotate(-8deg);opacity:0;transition:transform .45s cubic-bezier(.3,1.6,.5,1),opacity .2s;pointer-events:none;}
.mph-bubble[data-on="true"]{transform:scale(1) rotate(-4deg);opacity:1;}
@keyframes mph-draw{from{stroke-dashoffset:1;}to{stroke-dashoffset:0;}}
@keyframes mph-spin{to{transform:rotate(360deg);}}
@keyframes mph-wiggle{0%{transform:rotate(0);}25%{transform:rotate(-14deg);}55%{transform:rotate(9deg);}80%{transform:rotate(-4deg);}100%{transform:rotate(0);}}
@container mph (orientation: portrait){
.mph-stage{top:0;transform:translateX(-50%);width:min(100cqw,56.25cqh);height:100cqh;aspect-ratio:auto;}
.mph-top{top:5cqw;left:6%;right:6%;grid-template-columns:auto 1fr auto;font-size:2.5cqw;}
.mph-tagline,.mph-brace{display:none;}
.mph-reel{grid-column:3;}
.mph-h1{left:7%;top:17cqw;font-size:11.4cqw;}
.mph-badge{left:calc(100% + .35em);top:.1em;font-size:.22em;}
.mph-pill{left:7%;top:70cqw;font-size:3.5cqw;}
.mph-flower{left:auto;right:6%;top:66cqw;width:13%;}
.mph-curl{left:auto;right:4%;top:44cqw;width:11%;}
.mph-services{left:7%;right:7%;bottom:auto;top:84cqw;flex-wrap:wrap;gap:1.6cqw 5cqw;font-size:3cqw;}
.mph-rule-l{left:3%;top:22cqw;height:12cqw;}
.mph-rule-r{left:95%;top:auto;bottom:40cqw;height:12cqw;}
.mph-char{left:12%;width:76%;bottom:-.6%;}
.mph-bubble{font-size:3cqw;left:-8%;top:2%;max-width:52%;}
}
@media (prefers-reduced-motion: reduce){
.mph-root *,.mph-root *::after{animation:none!important;transition:none!important;}
}
`
const CSS = CSS1 + CSS2


type Layers = Partial<
  Record<
    | "body" | "head" | "earL" | "earR" | "beanie" | "tag" | "blush"
    | "face" | "nose" | "eyes" | "brows",
    SVGGElement | null
  >
>

const DEFAULT_SERVICES = ["Security Engineering", "Full-Stack Dev", "Malware Sandbox", "AI Threat XAI"]
const DEFAULT_GREETINGS = ["Hi there!", "Let's make something secure.", "Psst — I'm open to M.Tech roles.", "Okay, you can stop poking me :)"]

export default function MascotPortfolioHero({
  height = "100svh",
  minHeight = "440px",
  index = "08/01",
  discipline = "Systems & Security",
  tagline = "Make it secure",
  collection = ["Selected", "Works"],
  reel = ["M.Tech Thesis @ 2026", "Security Engineering"],
  year = "2026",
  initials = "DU",
  badge = "Hire me",
  line2 = "Portfolio",
  line3 = "Security",
  word = "Phish",
  verticalTag = "Guard",
  bracketed = "S",
  seekingLabel = "Seeking*",
  seeking = "Full-Stack / Sec",
  href,
  services = DEFAULT_SERVICES,
  greetings = DEFAULT_GREETINGS,
  skin = "#f7cfb0",
  beanie = "#111827",
  shirt = "#18181a",
  tag = "#b98158",
  accent = "#06b6d4",
  paper = "#ebebea",
  ink = "#111111",
  className,
  onExploreClick,
}: MascotPortfolioHeroProps) {
  const uid = React.useId().replace(/:/g, "")
  const id = (n: string) => n + uid
  const u = (n: string) => "url(#" + id(n) + ")"

  const rootRef = React.useRef<HTMLDivElement>(null)
  const charRef = React.useRef<HTMLButtonElement>(null)
  const layers = React.useRef<Layers>({})
  const set = (k: keyof Layers) => (el: SVGGElement | null) => {
    layers.current[k] = el
  }

  const [happy, setHappy] = React.useState(false)
  const [said, setSaid] = React.useState(-1)
  const happyTimer = React.useRef<number | undefined>(undefined)

  const poke = () => {
    setSaid((n) => (n + 1) % Math.max(1, greetings.length))
    setHappy(true)
    window.clearTimeout(happyTimer.current)
    happyTimer.current = window.setTimeout(() => setHappy(false), 2200)
  }
  React.useEffect(() => () => window.clearTimeout(happyTimer.current), [])

  React.useEffect(() => {
    const root = rootRef.current
    const char = charRef.current
    if (!root || !char) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let still = mq.matches
    const onMq = () => (still = mq.matches)
    mq.addEventListener("change", onMq)

    let px = 0, py = 0, lastMove = -1e9, gx = 0, gy = 0, near = 0
    let prev = performance.now()
    let nextBlink = prev + 1800
    let blinkAt = -1e9
    let raf = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      lastMove = performance.now()
    }
    const onLeave = () => (lastMove = -1e9)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("blur", onLeave)

    const tr = (dx: number, dy: number) => "translate(" + dx.toFixed(2) + " " + dy.toFixed(2) + ")"
    const L = layers.current

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now

      const r = char.getBoundingClientRect()
      const cx = r.left + r.width * 0.5
      const cy = r.top + r.height * 0.48
      let tx = 0, ty = 0, tn = 0
      const idle = now - lastMove > 3500
      if (!idle) {
        const reach = Math.max(innerWidth, innerHeight)
        ;[tx, ty] = aim(px, py, cx, cy, reach * 0.3, reach * 0.26)
        const dist = Math.hypot(px - cx, py - cy)
        tn = Math.max(0, 1 - dist / (r.width * 0.45))
      } else if (!still) {
        const t = now / 1000
        tx = Math.sin(t * 0.45) * 0.55 + Math.sin(t * 1.1) * 0.1
        ty = Math.sin(t * 0.31 + 1) * 0.25
      }

      const rate = still ? 30 : 7
      gx = approach(gx, tx, dt, rate)
      gy = approach(gy, ty, dt, rate)
      near = approach(near, tn, dt, 8)
      const p = pose(gx, gy, near)
      const breathe = still ? 0 : Math.sin(now / 620) * 1.6

      if (!still && now > nextBlink) {
        blinkAt = now
        nextBlink = now + (Math.random() < 0.2 ? 260 : 2200 + Math.random() * 3200)
      }
      const open = still ? 1 : blink((now - blinkAt) / 1000)

      L.body?.setAttribute("transform", tr(p.body.dx, p.body.dy + breathe * 0.4))
      L.head?.setAttribute("transform", tr(p.head.dx, p.head.dy + breathe) + " rotate(" + p.head.rot.toFixed(2) + " 300 560)")
      L.earL?.setAttribute("transform", tr(p.ears.dx, p.ears.dy) + " translate(138 380) scale(" + p.ears.lead.toFixed(3) + " 1) translate(-138 -380)")
      L.earR?.setAttribute("transform", tr(p.ears.dx, p.ears.dy) + " translate(462 380) scale(" + p.ears.trail.toFixed(3) + " 1) translate(-462 -380)")
      L.beanie?.setAttribute("transform", tr(p.beanie.dx, p.beanie.dy))
      L.tag?.setAttribute("transform", tr(p.tag.dx, p.tag.dy))
      L.blush?.setAttribute("transform", tr(p.blush.dx, p.blush.dy))
      L.face?.setAttribute("transform", tr(p.face.dx, p.face.dy))
      L.nose?.setAttribute("transform", tr(p.nose.dx, p.nose.dy))
      L.brows?.setAttribute("transform", tr(p.brows.dx, p.brows.dy))
      L.eyes?.setAttribute("transform", tr(p.eyes.dx, p.eyes.dy) + " translate(300 350) scale(" + p.eyes.scale.toFixed(3) + " " + (p.eyes.scale * open).toFixed(3) + ") translate(-300 -350)")
    }
    raf = requestAnimationFrame(frame)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      prev = performance.now()
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mq.removeEventListener("change", onMq)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("blur", onLeave)
    }
  }, [])

  const chars = (s: string) =>
    Array.from(s).map((c, i) => (
      <span key={i} className="mph-ch">
        {c === " " ? " " : c}
      </span>
    ))

  const l3 = Array.from(line3)
  const l3Head = l3.slice(0, -1).join("")
  const l3Tail = l3[l3.length - 1] ?? ""
  const greeting = said >= 0 ? greetings[said % greetings.length] : greetings[0]

  const vars = {
    "--mph-accent": accent,
    "--mph-paper": paper,
    "--mph-ink": ink,
    "--mph-sans": SANS_STACK,
    "--mph-display": DISPLAY_STACK,
    height,
    minHeight,
  } as React.CSSProperties

  const pillInner = (
    <>
      {seeking}
      <em aria-hidden="true">→</em>
    </>
  )

  return (
    <div ref={rootRef} className={"mph-root" + (className ? " " + className : "")} style={vars}>
      <style>{CSS}</style>

      <svg className="mph-room" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.13">
          {ROOM.back.map((s, i) => (
            <line key={"b" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.rays.map((s, i) => (
            <line key={"r" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.depth.map((d, i) => (
            <path key={"d" + i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mph-stage">
        <header className="mph-top">
          <span className="mph-index">
            <b>{index}</b>
            {discipline}
          </span>
          <span className="mph-tagline">{tagline}</span>
          <span className="mph-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="mph-reel">
            <i aria-hidden="true" />
            <span>
              {reel[0]}
              <br />
              {reel[1]}
            </span>
          </span>
        </header>

        <span className="mph-rule mph-rule-l" aria-hidden="true" />
        <span className="mph-rule mph-rule-r" aria-hidden="true" />

        <h1 className="mph-h1" aria-label={[year, initials, line2, line3, word + bracketed].join(" ")}>
          <span className="mph-line" aria-hidden="true">
            {chars(year)}
            <svg className="mph-arrow" viewBox="0 0 100 100">
              <path d="M14 14 L84 84 M84 30 V84 H30" />
            </svg>
            {chars(initials)}
            <span className="mph-badge">
              {badge}
              <sup>@</sup>
            </span>
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(line2)}
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(l3Head)}
            <span className="mph-swash">
              <span className="mph-ch">{l3Tail}</span>
              <svg viewBox="0 0 255 72" preserveAspectRatio="none">
                <path
                  pathLength={1}
                  d="M6 44 C40 18 150 4 222 14 C262 20 258 48 214 58 C150 72 60 70 30 60 C10 53 20 40 60 34"
                />
              </svg>
            </span>
          </span>
          <span className="mph-line mph-l4" aria-hidden="true">
            {chars(word)}
            <span className="mph-vtag">
              <span>{verticalTag}</span>
              <i />
            </span>
            <span className="mph-bracket">
              <svg viewBox="0 0 100 120" preserveAspectRatio="none">
                <path className="mph-arc-t" vectorEffect="non-scaling-stroke" d="M4 16 Q50 -8 96 16" />
                <path className="mph-arc-b" vectorEffect="non-scaling-stroke" d="M4 104 Q50 128 96 104" />
              </svg>
              {bracketed}
            </span>
            <span className="mph-star">*</span>
          </span>
        </h1>

        <svg className="mph-curl" viewBox="0 0 100 100" aria-hidden="true">
          <path
            pathLength={1}
            d="M92 8 C70 6 52 22 58 40 C63 56 84 52 80 36 C76 22 50 30 40 48 C32 62 26 74 16 84 M14 66 L14 86 L34 86"
          />
        </svg>

        <div className="mph-pill">
          <span className="mph-pill-a">{seekingLabel}</span>
          {onExploreClick ? (
            <button
              onClick={onExploreClick}
              className="group relative inline-flex items-center rounded-full border-2 border-[#111111] bg-[#06b6d4] px-4 py-1.5 font-mono text-sm shadow-[4px_4px_0px_#111111] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#111111] cursor-pointer"
            >
              <span className="font-bold text-[#111111]">About ↓</span>
            </button>
          ) : href ? (
            <a className="mph-pill-b" href={href}>
              {pillInner}
            </a>
          ) : (
            <span className="mph-pill-b" tabIndex={0}>
              {pillInner}
            </span>
          )}
        </div>

        <div className="mph-flower" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <path d={FLOWER} />
            <circle cx="60" cy="60" r="4" fill="none" stroke={ink} strokeWidth="2" />
          </svg>
        </div>

        <ul className="mph-services">
          {services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="relative w-full flex justify-center items-center my-4 px-4 z-20">
          <MorphOrb onSubmit={async (query) => {
              // Direct integration with OmniRoute AI gateway endpoint
              const res = await fetch("/api/agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: query }),
              });
              const data = await res.json();
              return data.answer || `Analyzed: "${query}" via OmniRoute.`;
            }}
          />
        </div>


        <button
          ref={charRef}
          type="button"
          className={"mph-char" + (happy ? " mph-happy" : "")}
          onClick={poke}
          aria-label="Say hi to the character"
        >
          <div className="mph-bubble" data-on={said >= 0}>
            {greeting}
          </div>
          <svg viewBox={"0 0 " + CW + " " + CH} aria-hidden="true">
            <defs>
              <radialGradient id={id("shade")} cx="46%" cy="40%" r="62%">
                <stop offset="0.55" stopColor="#7a2e14" stopOpacity="0" />
                <stop offset="1" stopColor="#7a2e14" stopOpacity="0.34" />
              </radialGradient>
              <radialGradient id={id("hi")} cx="36%" cy="30%" r="42%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("blush")}>
                <stop offset="0" stopColor="#ff6f6f" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ff6f6f" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("knit")} cx="38%" cy="22%" r="80%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.35" />
              </radialGradient>
              <radialGradient id={id("eye")} cx="40%" cy="35%" r="70%">
                <stop offset="0" stopColor="#3a3a3c" />
                <stop offset="1" stopColor="#050505" />
              </radialGradient>
              <radialGradient id={id("nose")} cx="42%" cy="36%" r="66%">
                <stop offset="0" stopColor="#ff9c82" stopOpacity="0.18" />
                <stop offset="1" stopColor="#b8583a" stopOpacity="0.42" />
              </radialGradient>
              <linearGradient id={id("neck")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6b2a14" stopOpacity="0.45" />
                <stop offset="0.5" stopColor="#6b2a14" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id={id("cloth")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.3" />
              </linearGradient>
              <filter id={id("fuzz")} x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <clipPath id={id("mouth")}>
                <path d="M218 440 Q300 458 382 440 Q376 524 300 530 Q224 524 218 440 Z" />
              </clipPath>
              <clipPath id={id("cuff")}>
                <path d="M114 262 Q300 222 486 262 L490 322 Q300 286 110 322 Z" />
              </clipPath>
            </defs>

            <ellipse cx="300" cy="712" rx="250" ry="16" fill="#000" opacity="0.08" />

            <g ref={set("body")}>
              <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={shirt} />
              <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={u("cloth")} />
              <path d="M220 592 Q300 630 380 592 L394 730 L206 730 Z" fill={shirt} />
              <path d="M220 592 Q300 630 380 592 L394 730 L206 730 Z" fill={u("shade")} />
              <path d="M240 596 Q300 626 360 596 L350 670 Q300 682 250 670 Z" fill={ink} opacity="0.15" />
            </g>

            <path d="M188 596 C188 470 236 380 300 380 C364 380 412 470 412 596 Z" fill={skin} />
            <path d="M188 596 C188 470 236 380 300 380 C364 380 412 470 412 596 Z" fill={u("shade")} />

            <g ref={set("earL")}>
              <path d="M132 460 C114 460 102 436 110 412 C116 394 136 376 156 382 Z" fill={skin} />
              <path d="M132 460 C114 460 102 436 110 412 C116 394 136 376 156 382 Z" fill={u("shade")} />
              <path d="M134 442 C126 442 120 430 125 418 C128 410 138 400 146 404 Z" fill="none" stroke={ink} strokeWidth="12" strokeLinecap="round" opacity="0.18" />
            </g>
            <g ref={set("earR")}>
              <path d="M468 460 C486 460 498 436 490 412 C484 394 464 376 444 382 Z" fill={skin} />
              <path d="M468 460 C486 460 498 436 490 412 C484 394 464 376 444 382 Z" fill={u("shade")} />
              <path d="M466 442 C474 442 480 430 475 418 C472 410 462 400 454 404 Z" fill="none" stroke={ink} strokeWidth="12" strokeLinecap="round" opacity="0.18" />
            </g>

            <g ref={set("head")}>
              <path d="M180 420 C180 260 226 210 300 210 C374 210 420 260 420 420 C420 540 374 610 300 610 C226 610 180 540 180 420 Z" fill={skin} />
              <path d="M180 420 C180 260 226 210 300 210 C374 210 420 260 420 420 C420 540 374 610 300 610 C226 610 180 540 180 420 Z" fill={u("shade")} />

              <g ref={set("blush")}>
                <ellipse cx="228" cy="470" rx="26" ry="15" fill={u("blush")} />
                <ellipse cx="372" cy="470" rx="26" ry="15" fill={u("blush")} />
              </g>

              <g ref={set("nose")}>
                <path d="M290 435 C290 424 310 424 310 435 C310 455 290 455 290 435 Z" fill={skin} />
                <path d="M290 435 C290 424 310 424 310 435 C310 455 290 455 290 435 Z" fill={u("nose")} />
                <path d="M285 438 Q300 448 315 438" fill="none" stroke={ink} strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
              </g>

              <g ref={set("eyes")}>
                <g>
                  <circle cx="242" cy="390" r="15" fill={ink} />
                  <circle cx="246" cy="386" r="5" fill="#fff" opacity="0.9" />
                  <circle cx="238" cy="394" r="2" fill="#fff" opacity="0.7" />
                </g>
                <g>
                  <circle cx="358" cy="390" r="15" fill={ink} />
                  <circle cx="362" cy="386" r="5" fill="#fff" opacity="0.9" />
                  <circle cx="354" cy="394" r="2" fill="#fff" opacity="0.7" />
                </g>
              </g>

              <g ref={set("brows")}>
                <path d="M220 354 Q242 344 266 360" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
                <path d="M380 354 Q358 344 334 360" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
              </g>

              <g clipPath={u("mouth")}>
                <path d="M240 460 Q300 475 360 460 L360 520 Q300 535 240 520 Z" fill="#7a1c1c" />
                <path d="M275 496 Q300 526 325 496" fill="#ff8da1" />
              </g>
              <path d="M218 440 Q300 458 382 440 Q376 524 300 530 Q224 524 218 440 Z" fill="none" stroke={ink} strokeWidth="7" strokeLinejoin="round" />
            </g>

            <g ref={set("beanie")}>
              <path d="M164 340 C156 220 210 130 300 130 C390 130 444 220 436 340 C436 340 410 326 300 326 C190 326 164 340 164 340 Z" fill={beanie} filter={u("fuzz")} />
              <path d="M164 340 C156 220 210 130 300 130 C390 130 444 220 436 340 C436 340 410 326 300 326 C190 326 164 340 164 340 Z" fill={u("knit")} />
              <path d="M106 314 Q300 260 494 314 L490 358 Q300 304 110 358 Z" fill={beanie} filter={u("fuzz")} />
              <path d="M106 314 Q300 260 494 314 L490 358 Q300 304 110 358 Z" fill={u("knit")} />
              <g clipPath={u("cuff")}>
                <path d="M100 280 H500 V340 H100 Z" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="12 12" opacity="0.28" />
              </g>

              <g ref={set("tag")} transform="translate(0 0)">
                <path d="M270 300 L330 292 L334 332 L274 340 Z" fill={tag} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
                <circle cx="286" cy="318" r="4" fill={ink} opacity="0.6" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

