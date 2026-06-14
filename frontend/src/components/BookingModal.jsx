/* ════════════════════════════════════════════════════════════════════════════
   BookingModal — multi-step consultation booking flow
   ────────────────────────────────────────────────────────────────────────────
   • Reuses the existing glass-card / gradient utilities — no new design system.
   • 5 steps:  Service → Date → Time → Contact → Confirm   +   Success screen
   • Esc + backdrop click close. Fade/scale animation.
   • Timezone auto-detected; user can change.
   • Edit config + booked slots at the top of this file.
   • Wire up your delivery channel in submitBooking() — three options provided
     (FastAPI / Resend|EmailJS|Formspree / Google Calendar).
═══════════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'

/* ──────────────────────────────────────────────────
   1. CONFIG  ← edit me first
────────────────────────────────────────────────── */

// EmailJS credentials (public — safe to ship in browser code).
// 🔒 Lock these down to your domain in EmailJS dashboard → Account → Security.
const EMAILJS = {
  publicKey:      'i1y9r6EQfitSBB_wi',
  serviceId:      'service_krji98s',
  templateIdLead: 'template_vopxiss',  // notification → hayatka472@gmail.com
  templateIdAuto: 'template_ztgoazh',  // auto-reply  → client
}

const CONFIG = {
  workingHours:        { start: 9, end: 17 },     // 09:00 → 17:00 (24h)
  slotIntervalMinutes: 30,
  workingDays:         [1, 2, 3, 4, 5],            // 0=Sun … 6=Sat (Mon–Fri here)
  muteWeekends:        true,                       // grey out Sat/Sun
  maxAdvanceMonths:    3,                          // how far ahead bookings allowed
  minLeadHours:        2,                          // can't book a slot less than N hours out (today)
  brand:               'NexuraAWT',
  contactEmail:        'hello@nexuraawt.com',
}

// 🔧 Replace with real availability from your backend (GET /api/bookings/availability?date=YYYY-MM-DD).
// Key: 'YYYY-MM-DD' (local date), value: array of 'HH:MM' starts already taken.
const BOOKED_SLOTS = {
  // '2026-06-15': ['10:00', '14:30'],
}

const SERVICES = [
  { id: 'software',       icon: 'fas fa-code',          label: 'Software Application Development' },
  { id: 'web',            icon: 'fas fa-globe',         label: 'Web Development' },
  { id: 'mobile',         icon: 'fas fa-mobile-screen', label: 'Mobile Apps (Android & iOS)' },
  { id: 'ai-integration', icon: 'fas fa-plug',          label: 'AI Integration' },
  { id: 'ai-app',         icon: 'fas fa-brain',         label: 'AI-Powered Application' },
  { id: 'mern',           icon: 'fab fa-react',         label: 'MERN Stack' },
  { id: 'mean',           icon: 'fab fa-angular',       label: 'MEAN Stack' },
  { id: 'nextjs',         icon: 'fas fa-bolt',          label: 'Next.js' },
  { id: 'fastapi',        icon: 'fas fa-server',        label: 'FastAPI' },
]

const STEP_LABELS = ['Service', 'Date', 'Time', 'Details', 'Confirm']

/* ──────────────────────────────────────────────────
   2. DATE / SLOT HELPERS
────────────────────────────────────────────────── */

const pad = n => String(n).padStart(2, '0')
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const sameYmd = (a, b) => a && b && ymd(a) === ymd(b)
const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x }
const addMonths  = (d, n) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x }

function buildSlots() {
  const out = []
  const { start, end } = CONFIG.workingHours
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += CONFIG.slotIntervalMinutes) {
      out.push(`${pad(h)}:${pad(m)}`)
    }
  }
  return out
}
const ALL_SLOTS = buildSlots()

function slotEnd(start) {
  const [h, m] = start.split(':').map(Number)
  const totalMin = h * 60 + m + CONFIG.slotIntervalMinutes
  return `${pad(Math.floor(totalMin / 60) % 24)}:${pad(totalMin % 60)}`
}

function isSlotDisabled(date, slot) {
  if (!date) return true
  const taken = BOOKED_SLOTS[ymd(date)] || []
  if (taken.includes(slot)) return true

  // Block slots in the past (for today)
  const now = new Date()
  if (sameYmd(date, now)) {
    const [h, m] = slot.split(':').map(Number)
    const slotTime = new Date(date); slotTime.setHours(h, m, 0, 0)
    if (slotTime.getTime() - now.getTime() < CONFIG.minLeadHours * 3600 * 1000) return true
  }
  return false
}

function isDateDisabled(date) {
  const today = startOfDay(new Date())
  const max   = addMonths(today, CONFIG.maxAdvanceMonths)
  if (date < today) return true
  if (date > max)   return true
  if (!CONFIG.workingDays.includes(date.getDay())) return true
  return false
}

function calendarMatrix(viewMonth) {
  // 6×7 grid starting on Monday. Some cells belong to prev/next month.
  const first         = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
  const firstWeekday  = (first.getDay() + 6) % 7                  // Mon=0 … Sun=6
  const start         = new Date(first); start.setDate(first.getDate() - firstWeekday)
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i); return d
  })
}

function detectTimezone() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone }
  catch { return 'UTC' }
}

function listTimezones() {
  try { return Intl.supportedValuesOf('timeZone') }
  catch {
    return [
      'UTC', 'Europe/London', 'Europe/Zurich', 'Europe/Berlin', 'Europe/Paris',
      'America/New_York', 'America/Chicago', 'America/Los_Angeles',
      'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo',
      'Australia/Sydney',
    ]
  }
}

const MONTH_NAMES     = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAY_HEADERS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const labelForService = id => SERVICES.find(s => s.id === id)?.label || id
const formatLongDate  = d => d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const isValidEmail    = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

/* ══════════════════════════════════════════════════════════════════════════
   3. submitBooking — sends two EmailJS emails per booking:
        1. lead notification → hayatka472@gmail.com   (template_vopxiss)
        2. auto-reply        → the client's email     (template_ztgoazh)

   The `payload` keys below are exposed to each template as {{variables}}:
     {
       service, serviceLabel,
       date, time, endTime, timezone,
       startIso, endIso,
       name, email, company, phone, message,
       bookingId, submittedAt,
     }
═══════════════════════════════════════════════════════════════════════════ */

async function submitBooking(payload) {
  // Empty strings render as "—" in the templates for nicer formatting.
  const templateParams = {
    ...payload,
    company: payload.company || '—',
    phone:   payload.phone   || '—',
  }

  // 1. Lead → admin inbox. If this fails, the booking fails.
  await emailjs.send(
    EMAILJS.serviceId,
    EMAILJS.templateIdLead,
    templateParams,
    { publicKey: EMAILJS.publicKey },
  )

  // 2. Auto-reply → client. If this bounces (typo in their email, etc.) we
  //    still consider the booking successful — the admin notification went out.
  try {
    await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.templateIdAuto,
      templateParams,
      { publicKey: EMAILJS.publicKey },
    )
  } catch (err) {
    console.warn('Auto-reply to client failed (lead notification succeeded):', err)
  }

  return { ok: true, bookingId: payload.bookingId }
}

/* ──────────────────────────────────────────────────
   4. Step UI helpers
────────────────────────────────────────────────── */

function StepIndicator({ step }) {
  return (
    <div className="px-6 sm:px-8 pt-5 pb-3">
      <div className="flex items-center justify-between gap-2">
        {STEP_LABELS.map((label, i) => {
          const n      = i + 1
          const active = n === step
          const done   = n < step
          return (
            <div key={label} className="flex-1 flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border transition-colors flex-shrink-0 ${
                  done   ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white border-transparent shadow-md shadow-purple-500/30'
                : active ? 'bg-white/5 text-white border-purple-500/60 shadow-md shadow-purple-500/20'
                         : 'bg-white/[0.03] text-gray-500 border-white/10'
                }`}
              >
                {done ? <i className="fas fa-check text-[10px]" /> : n}
              </div>
              <span className={`hidden sm:inline text-xs font-medium truncate ${active ? 'text-white' : done ? 'text-gray-300' : 'text-gray-500'}`}>
                {label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <div className={`hidden sm:block flex-1 h-px ${done ? 'bg-purple-500/40' : 'bg-white/5'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────
   5. Main component
────────────────────────────────────────────────── */

/* Engagement plans — labels shown when a pricing-card CTA pre-fills the modal */
const PLAN_LABELS = {
  hourly:  'Hourly · $15/hour',
  monthly: 'Monthly · $2,500/mo (dedicated developer)',
  fixed:   'Fixed Project · custom quote',
}

export default function BookingModal({ isOpen, onClose, prefill }) {
  const [mounted, setMounted] = useState(false)   // controls DOM presence
  const [visible, setVisible] = useState(false)   // controls open/close animation
  const [step, setStep]       = useState(1)

  const [plan,     setPlan]     = useState('')    // 'hourly' | 'monthly' | 'fixed' | ''
  const [service,  setService]  = useState('')
  const [viewMonth, setViewMonth] = useState(startOfDay(new Date()))
  const [date,     setDate]     = useState(null)
  const [time,     setTime]     = useState('')
  const [timezone, setTimezone] = useState(detectTimezone())
  const [contact,  setContact]  = useState({ name: '', email: '', company: '', phone: '', message: '' })

  const [errors,    setErrors]    = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitErr,  setSubmitErr]  = useState('')
  const [bookingRef, setBookingRef] = useState('')

  const dialogRef = useRef(null)

  /* Mount + open/close animation */
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // next frame → trigger transition
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 200)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  /* Reset internal state every time we open fresh */
  useEffect(() => {
    if (!isOpen) return
    setStep(1)
    setPlan(prefill?.plan || '')   // pre-filled from a pricing-card CTA, if any
    setService('')
    setViewMonth(startOfDay(new Date()))
    setDate(null)
    setTime('')
    setTimezone(detectTimezone())
    setContact({ name: '', email: '', company: '', phone: '', message: '' })
    setErrors({})
    setSubmitting(false)
    setSubmitErr('')
    setBookingRef('')
  }, [isOpen, prefill])

  /* Lock body scroll while open */
  useEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mounted])

  /* Esc to close + initial focus */
  useEffect(() => {
    if (!visible) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  const goNext = useCallback(() => setStep(s => Math.min(5, s + 1)), [])
  const goBack = useCallback(() => setStep(s => Math.max(1, s - 1)), [])

  /* Per-step validation */
  const validateStep = useCallback(() => {
    const e = {}
    if (step === 1 && !service)       e.service = 'Pick a service to continue.'
    if (step === 2 && !date)          e.date    = 'Pick a date to continue.'
    if (step === 3 && !time)          e.time    = 'Pick a time slot to continue.'
    if (step === 4) {
      if (!contact.name.trim())                   e.name    = 'Your name is required.'
      if (!contact.email.trim())                  e.email   = 'Email is required.'
      else if (!isValidEmail(contact.email))      e.email   = 'That email doesn\'t look right.'
      if (!contact.message.trim())                e.message = 'A short project description helps us prepare.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }, [step, service, date, time, contact])

  const handleNext = () => { if (validateStep()) goNext() }

  /* Final submission */
  const handleConfirm = async () => {
    setSubmitting(true)
    setSubmitErr('')

    const refId = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).slice(0, 8)
    const end   = slotEnd(time)

    // If an engagement plan was pre-filled from a pricing-card CTA, prepend it to
    // the message so it shows up in the existing EmailJS template without needing
    // a new {{variable}} added on the EmailJS dashboard.
    const planLabel = plan ? PLAN_LABELS[plan] : ''
    const messageWithPlan = planLabel
      ? `[Engagement: ${planLabel}]\n\n${contact.message.trim()}`
      : contact.message.trim()

    const payload = {
      service,
      serviceLabel: labelForService(service),
      plan,                                  // 'hourly' | 'monthly' | 'fixed' | ''
      planLabel,                             // human-readable
      date:    ymd(date),
      time,
      endTime: end,
      timezone,
      startIso: `${ymd(date)}T${time}:00`,
      endIso:   `${ymd(date)}T${end}:00`,
      name:    contact.name.trim(),
      email:   contact.email.trim(),
      company: contact.company.trim(),
      phone:   contact.phone.trim(),
      message: messageWithPlan,
      bookingId: refId,
      submittedAt: new Date().toISOString(),
    }

    try {
      await submitBooking(payload)
      setBookingRef(refId)
      setStep(6) // success
    } catch (err) {
      setSubmitErr(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!mounted) return null

  /* ────────────────────────────────────────────────
     STEP RENDERERS
  ──────────────────────────────────────────────── */

  const renderService = () => (
    <div className="px-6 sm:px-8 pb-6">
      <h3 className="text-xl font-bold text-white mb-1">What can we build for you?</h3>
      <p className="text-gray-400 text-sm mb-5">Pick the closest fit — we'll refine it on the call.</p>

      {/* Plan badge — appears when a pricing-card CTA pre-filled the engagement type */}
      {plan && PLAN_LABELS[plan] && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-blue-600/10 px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm text-white">
            <i className="fas fa-handshake text-purple-300" />
            <span>
              <span className="text-purple-300 font-semibold">Engagement:</span> {PLAN_LABELS[plan]}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPlan('')}
            className="text-xs text-gray-400 hover:text-white underline-offset-4 hover:underline"
            aria-label="Remove engagement plan"
          >
            Change
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SERVICES.map(s => {
          const active = service === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setService(s.id)}
              className={`text-left rounded-xl p-3 border transition-all ${
                active
                  ? 'bg-gradient-to-br from-purple-600/15 to-blue-600/15 border-purple-500/60 shadow-md shadow-purple-500/10'
                  : 'bg-white/[0.03] border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]'
              }`}
            >
              <i className={`${s.icon} text-purple-300 text-base mb-1.5`} />
              <div className="text-white text-xs font-semibold leading-snug">{s.label}</div>
            </button>
          )
        })}
      </div>

      {errors.service && <p className="mt-3 text-red-400 text-xs">{errors.service}</p>}
    </div>
  )

  const renderDate = () => {
    const cells = calendarMatrix(viewMonth)
    const today = startOfDay(new Date())
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + CONFIG.maxAdvanceMonths, 1)
    const atMin = viewMonth <= minMonth
    const atMax = viewMonth >= maxMonth

    return (
      <div className="px-6 sm:px-8 pb-6">
        <h3 className="text-xl font-bold text-white mb-1">Choose a date</h3>
        <p className="text-gray-400 text-sm mb-5">
          We're available {WEEKDAY_HEADERS.filter((_, i) => CONFIG.workingDays.includes((i + 1) % 7)).slice(0,5).join(', ')}.
        </p>

        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            disabled={atMin}
            onClick={() => setViewMonth(addMonths(viewMonth, -1))}
            className="w-9 h-9 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous month"
          >
            <i className="fas fa-chevron-left text-xs" />
          </button>
          <div className="text-white font-semibold">
            {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </div>
          <button
            type="button"
            disabled={atMax}
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
            className="w-9 h-9 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next month"
          >
            <i className="fas fa-chevron-right text-xs" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAY_HEADERS.map(w => (
            <div key={w} className="text-center text-[11px] uppercase tracking-wider text-gray-500 font-semibold py-1">
              {w}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            const inMonth  = d.getMonth() === viewMonth.getMonth()
            const isToday  = sameYmd(d, today)
            const isSel    = sameYmd(d, date)
            const disabled = isDateDisabled(d)
            const weekend  = d.getDay() === 0 || d.getDay() === 6
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => { setDate(new Date(d)); setTime('') }}
                className={[
                  'aspect-square rounded-lg text-sm font-medium transition-all relative',
                  isSel
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/30'
                    : disabled
                      ? 'text-gray-700 cursor-not-allowed'
                      : inMonth ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-white/10',
                  !isSel && !disabled && weekend && CONFIG.muteWeekends ? 'opacity-50' : '',
                  isToday && !isSel ? 'ring-1 ring-purple-500/50' : '',
                ].join(' ')}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>

        {date && (
          <p className="mt-4 text-sm text-purple-300">
            <i className="fas fa-calendar-check mr-2" />Selected: {formatLongDate(date)}
          </p>
        )}
        {errors.date && <p className="mt-3 text-red-400 text-xs">{errors.date}</p>}
      </div>
    )
  }

  const renderTime = () => (
    <div className="px-6 sm:px-8 pb-6">
      <h3 className="text-xl font-bold text-white mb-1">Pick a time</h3>
      <p className="text-gray-400 text-sm mb-4">
        {date ? formatLongDate(date) : 'Select a date first'}
      </p>

      {/* Timezone selector */}
      <div className="mb-5">
        <label htmlFor="bm-tz" className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
          Your timezone
        </label>
        <select
          id="bm-tz"
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
          className="w-full bg-[#0d1424] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
        >
          {listTimezones().map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>

      {/* Slot grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {ALL_SLOTS.map(slot => {
          const disabled = isSlotDisabled(date, slot)
          const active   = time === slot
          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => setTime(slot)}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                active
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white border-transparent shadow-md shadow-purple-500/30'
                  : disabled
                    ? 'text-gray-600 bg-white/[0.02] border-white/5 cursor-not-allowed line-through'
                    : 'text-white bg-white/[0.04] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08]'
              }`}
            >
              {slot}
            </button>
          )
        })}
      </div>

      {errors.time && <p className="mt-3 text-red-400 text-xs">{errors.time}</p>}
    </div>
  )

  const renderContact = () => (
    <div className="px-6 sm:px-8 pb-6">
      <h3 className="text-xl font-bold text-white mb-1">Your details</h3>
      <p className="text-gray-400 text-sm mb-5">So we know who's joining the call and what to prep.</p>

      {/* Summary recap */}
      <div className="mb-5 rounded-xl border border-purple-500/20 bg-purple-500/[0.05] p-3 text-sm">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-300">
          <span><i className="fas fa-briefcase text-purple-400 mr-2" />{labelForService(service)}</span>
          <span><i className="fas fa-calendar text-purple-400 mr-2" />{date && formatLongDate(date)}</span>
          <span><i className="fas fa-clock text-purple-400 mr-2" />{time} {timezone}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id="bm-name" label="Full name" required value={contact.name} error={errors.name}
               onChange={v => setContact(c => ({ ...c, name: v }))} placeholder="Jane Doe" />
        <Field id="bm-email" label="Email" required type="email" value={contact.email} error={errors.email}
               onChange={v => setContact(c => ({ ...c, email: v }))} placeholder="jane@company.com" />
        <Field id="bm-company" label="Company" value={contact.company}
               onChange={v => setContact(c => ({ ...c, company: v }))} placeholder="Acme Inc." />
        <Field id="bm-phone" label="Phone" type="tel" value={contact.phone}
               onChange={v => setContact(c => ({ ...c, phone: v }))} placeholder="+41 …" />
      </div>

      <div className="mt-3">
        <label htmlFor="bm-message" className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
          Project description <span className="text-red-400">*</span>
        </label>
        <textarea
          id="bm-message"
          rows={4}
          value={contact.message}
          onChange={e => setContact(c => ({ ...c, message: e.target.value }))}
          placeholder="What are you trying to build, and by when?"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors resize-none"
        />
        {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message}</p>}
      </div>
    </div>
  )

  const renderConfirm = () => (
    <div className="px-6 sm:px-8 pb-6">
      <h3 className="text-xl font-bold text-white mb-1">Confirm your booking</h3>
      <p className="text-gray-400 text-sm mb-5">One last check before we lock it in.</p>

      <div className="space-y-3 mb-6">
        {plan && PLAN_LABELS[plan] && (
          <SummaryRow icon="fas fa-handshake" label="Engagement" value={PLAN_LABELS[plan]} />
        )}
        <SummaryRow icon="fas fa-briefcase" label="Service" value={labelForService(service)} />
        <SummaryRow icon="fas fa-calendar" label="Date"    value={formatLongDate(date)} />
        <SummaryRow icon="fas fa-clock"    label="Time"    value={`${time} – ${slotEnd(time)}  (${timezone})`} />
        <SummaryRow icon="fas fa-user"     label="Name"    value={contact.name} />
        <SummaryRow icon="fas fa-envelope" label="Email"   value={contact.email} />
        {contact.company && <SummaryRow icon="fas fa-building" label="Company" value={contact.company} />}
        {contact.phone   && <SummaryRow icon="fas fa-phone"    label="Phone"   value={contact.phone} />}
        <SummaryRow icon="fas fa-comment"  label="Brief" value={contact.message} multiline />
      </div>

      {submitErr && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          <i className="fas fa-triangle-exclamation mr-2" />{submitErr}
        </div>
      )}
    </div>
  )

  const renderSuccess = () => (
    <div className="px-6 sm:px-8 py-10 text-center">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
        <i className="fas fa-check text-green-400 text-2xl" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">You're booked!</h3>
      <p className="text-gray-400 text-sm mb-1">
        We've sent a confirmation to <span className="text-white">{contact.email}</span>.
      </p>
      <p className="text-gray-500 text-xs mb-6">Booking reference: <span className="font-mono text-purple-300">{bookingRef}</span></p>

      <div className="text-left max-w-sm mx-auto space-y-2 mb-7">
        <SummaryRow icon="fas fa-briefcase" label="Service" value={labelForService(service)} />
        <SummaryRow icon="fas fa-calendar" label="Date"    value={formatLongDate(date)} />
        <SummaryRow icon="fas fa-clock"    label="Time"    value={`${time} – ${slotEnd(time)}  (${timezone})`} />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
      >
        Done
      </button>
    </div>
  )

  /* ────────────────────────────────────────────────
     MODAL SHELL
  ──────────────────────────────────────────────── */

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a consultation"
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        className={`relative glass-card gradient-border rounded-2xl w-full max-w-2xl shadow-2xl max-h-[92vh] flex flex-col transition-all duration-200 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'
        }`}
      >
        {/* Header — close + brand */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-purple-300/80 font-semibold">
            <i className="fas fa-calendar-alt" />
            <span>Free consultation</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Step indicator (hidden on success) */}
        {step <= 5 && <StepIndicator step={step} />}

        {/* Body — scrolls on mobile */}
        <div className="overflow-y-auto">
          {step === 1 && renderService()}
          {step === 2 && renderDate()}
          {step === 3 && renderTime()}
          {step === 4 && renderContact()}
          {step === 5 && renderConfirm()}
          {step === 6 && renderSuccess()}
        </div>

        {/* Footer — nav */}
        {step <= 5 && (
          <div className="px-6 sm:px-8 py-4 border-t border-white/5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1 || submitting}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-arrow-left mr-2" />Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-md shadow-purple-500/20"
              >
                Continue<i className="fas fa-arrow-right ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-md shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? <><i className="fas fa-spinner fa-spin mr-2" />Booking…</>
                  : <><i className="fas fa-check mr-2" />Confirm booking</>}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────
   6. Tiny inner components
────────────────────────────────────────────────── */

function Field({ id, label, value, onChange, placeholder, type = 'text', required, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none text-sm transition-colors ${
          error ? 'border-red-500/50 focus:border-red-400' : 'border-white/10 focus:border-purple-500/50'
        }`}
      />
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function SummaryRow({ icon, label, value, multiline = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
        <i className={`${icon} text-purple-400 text-xs`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">{label}</div>
        <div className={`text-white text-sm ${multiline ? 'whitespace-pre-wrap' : 'truncate'}`}>{value}</div>
      </div>
    </div>
  )
}
