import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Plus, X, Check, BarChart3, Info, Megaphone, Bot, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── SVG NOISE OVERLAY ─── */
function NoiseOverlay() {
  return (
    <svg className="noise-overlay" width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

/* ─── WHATSAPP ICON ─── */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ─── TIKTOK ICON ─── */
function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.18 8.18 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z"/>
    </svg>
  )
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out px-3 py-2.5 flex items-center gap-6 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-orange/20 rounded-full'
        : 'bg-transparent rounded-full'
    }`} style={{ width: 'min(92vw, 900px)' }}>
      {/* Logo */}
      <a href="#" className="flex items-center gap-0 shrink-0">
        <span className={`font-syne font-[800] text-xl tracking-tight ${scrolled ? 'text-black' : 'text-white'}`}>Gastro</span>
        <span className="font-syne font-[800] text-xl tracking-tight text-orange">Visual</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
        {['Cómo funciona', 'Precios', 'FAQ'].map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
            className={`font-dm text-sm font-medium transition-colors duration-200 hover:text-orange ${scrolled ? 'text-black/70' : 'text-white/80'}`}>
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2.5 bg-orange text-white font-dm font-semibold text-sm rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shrink-0"
        style={{ padding: '12px 24px' }}>
        <WhatsAppIcon className="w-4 h-4" />
        Habla con nosotros
      </a>

      {/* Mobile hamburger */}
      <button onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden ml-auto flex flex-col gap-1.5 ${scrolled ? 'text-black' : 'text-white'}`}>
        <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-gray-100 md:hidden">
          {['Cómo funciona', 'Precios', 'FAQ'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
              onClick={() => setMobileOpen(false)}
              className="font-dm text-base font-medium text-black/80 hover:text-orange">
              {link}
            </a>
          ))}
          <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-orange text-white font-dm font-semibold text-sm rounded-full"
            style={{ padding: '14px 28px' }}>
            <WhatsAppIcon className="w-4 h-4" />
            Habla con nosotros
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── HERO ─── */
function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  /* Text entrance animation */
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.6 }, 0.1)
        .from('.hero-l1', { opacity: 0, y: 40, duration: 0.7 }, 0.3)
        .from('.hero-l2', { opacity: 0, y: 40, duration: 0.7 }, 0.45)
        .from('.hero-l3', { opacity: 0, y: 40, duration: 0.7 }, 0.6)
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, 0.8)
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, 1.0)
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.6 }, 1.2)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* Video scroll scrubbing — identical on all devices */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let st
    let raf

    // Unlock video on iOS — play+pause on first touch allows currentTime control
    document.addEventListener('touchstart', () => {
      video.play()
      video.pause()
    }, { once: true })

    // Force GPU compositing for smoother mobile rendering
    video.style.transform = 'translateZ(0)'
    video.style.willChange = 'transform'

    // Reduce callback frequency for smoother mobile scrub
    ScrollTrigger.config({ limitCallbacks: true, syncInterval: 40 })

    const initScrub = () => {
      const dur = video.duration
      if (!dur || !isFinite(dur)) return

      setVideoReady(true)
      video.currentTime = 0

      let currentT = 0
      let targetT = 0
      const lerpFactor = 0.1

      const tick = () => {
        currentT += (targetT - currentT) * lerpFactor
        if (Math.abs(video.currentTime - currentT) > 0.015) {
          video.currentTime = currentT
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      st = ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'top top',
        end: '+=200%',
        scrub: 2.5,
        pin: true,
        pinSpacing: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          targetT = self.progress * dur
        },
      })
    }

    // Start scrubbing as soon as metadata is available (duration known)
    // instead of waiting for full video download (readyState >= 3)
    const onReady = () => {
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('loadeddata', onReady)
      requestAnimationFrame(() => initScrub())
    }

    if (video.readyState >= 1) {
      requestAnimationFrame(() => initScrub())
    } else {
      video.addEventListener('loadedmetadata', onReady)
      video.addEventListener('loadeddata', onReady)
    }

    return () => {
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('loadeddata', onReady)
      if (st) st.kill()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const WA_URL = 'https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias.'

  return (
    <section
      ref={heroRef}
      className="hero-section"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '-webkit-fill-available',
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        backgroundColor: '#1C1410',
      }}
    >
      {/* Fallback image */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=80"
        alt=""
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', zIndex: 0 }}
      />

      {/* Video background */}
      <video
        ref={videoRef}
        src="/hero-video-scrub.mp4"
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', zIndex: 0, opacity: videoReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />

      {/* Loading indicator — shown while video loads */}
      {!videoReady && (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '50px', padding: '8px 16px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FF6B2B', animation: 'spin 0.8s linear infinite' }}></span>
          <span className="font-dm" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Cargando vídeo…</span>
        </div>
      )}

      {/* Dark overlay — z-index 1, class for mobile parallax */}
      <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)', zIndex: 1 }}></div>

      {/* Content — z-index 2, padded for navbar + safe areas */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: 'clamp(1.25rem, 5vw, 120px)',
        paddingRight: 'clamp(1.25rem, 5vw, 120px)',
        paddingBottom: 'clamp(2rem, 5vh, 64px)',
        paddingTop: 'clamp(5rem, 12vh, 7rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 3vh, 1.5rem)',
      }}>
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column' }}>
          {/* Badge */}
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', gap: '10px', padding: '8px 18px', borderRadius: '50px', marginBottom: 'clamp(0.75rem, 2vh, 1.25rem)', background: 'rgba(255,107,43,0.18)', border: '1px solid rgba(255,107,43,0.3)', position: 'relative' }}>
            <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B2B' }}></span>
            <span className="font-dm" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, color: '#FFB899' }}>
              Agencia de social media para restaurantes
            </span>
          </div>

          {/* Title */}
          <h1 className="font-syne font-[800]" style={{ fontSize: 'clamp(2.4rem, 10vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 0, marginBottom: 'clamp(1rem, 2vh, 1.5rem)', wordBreak: 'break-word' }}>
            <span className="hero-l1" style={{ display: 'block', color: '#fff' }}>Más clientes</span>
            <span className="hero-l2" style={{ display: 'block', color: '#fff' }}>desde redes</span>
            <span className="hero-l3" style={{ display: 'block', color: '#FF6B2B', fontStyle: 'italic' }}>sociales.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub font-dm" style={{ fontWeight: 300, fontSize: 'clamp(14px, 2.5vw, 18px)', maxWidth: '480px', marginBottom: 'clamp(1.25rem, 3vh, 2rem)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
            Gestionamos las redes sociales de tu restaurante para que tú te centres en lo que mejor sabes hacer: cocinar.
          </p>

          {/* CTAs */}
          <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="group"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#FF6B2B', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vw, 16px)', padding: 'clamp(14px, 2vw, 18px) clamp(24px, 4vw, 36px)', borderRadius: '50px', textDecoration: 'none', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <WhatsAppIcon className="w-5 h-5" style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Habla con nosotros por WhatsApp</span>
            </a>
            <a href="#precios" className="font-dm" style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              Ver planes <ChevronRight style={{ width: '16px', height: '16px' }} />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 2.5rem)', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { value: '50+', label: 'restaurantes' },
            { value: '4', label: 'redes gestionadas' },
            { value: '30', label: 'días para resultados' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <div>
                <span className="font-mono" style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 500, color: '#fff' }}>{stat.value}</span>
                <span className="font-dm" style={{ display: 'block', fontSize: 'clamp(10px, 1.5vw, 12px)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{stat.label}</span>
              </div>
              {i < 2 && <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.15)' }}></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CÓMO FUNCIONA ─── */
const hiwSteps = [
  {
    num: '01',
    title: 'Nos cuentas tu restaurante',
    desc: 'Analizamos tu perfil, tu zona y tu competencia. Sin formularios eternos. Una llamada de 20 minutos y tenemos todo lo necesario.',
  },
  {
    num: '02',
    title: 'Creamos tu contenido cada mes',
    desc: 'Fotos, reels, stories y copies adaptados a tu negocio. Tú solo revisas y apruebas. Nosotros nos encargamos de la producción completa.',
  },
  {
    num: '03',
    title: 'Publicamos y gestionamos todo',
    desc: 'Nos encargamos de publicar, responder comentarios y optimizar resultados. Tú te centras en tu restaurante, nosotros en tus redes.',
  },
]

const hiwCardStyle = {
  background: '#FFFFFF',
  borderRadius: '1.5rem',
  padding: '2.25rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
  border: '1px solid rgba(0,0,0,0.06)',
  opacity: 1,
  visibility: 'visible',
}

function HowItWorks() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [likeCount, setLikeCount] = useState(0)
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.hiw-card-item')
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0.2 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    let likeInterval, notifInterval
    likeInterval = setInterval(() => {
      setLikeCount(0)
      let count = 0
      const step = setInterval(() => {
        count += Math.ceil(Math.random() * 30)
        if (count >= 847) { count = 847; clearInterval(step) }
        setLikeCount(count)
      }, 40)
    }, 5000)

    notifInterval = setInterval(() => {
      setShowNotif(true)
      setTimeout(() => setShowNotif(false), 3500)
    }, 4000)

    return () => {
      ctx.revert()
      clearInterval(likeInterval)
      clearInterval(notifInterval)
    }
  }, [])

  const illustrations = [
    /* Step 1: two circles connecting */
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '3px solid #CC5833', background: '#FFF3EE', opacity: 1 }}></div>
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '3px solid #1A1A1A', background: '#F7F6F3', marginLeft: '-14px', opacity: 1 }}></div>
    </div>,
    /* Step 2: mini content preview with like counter */
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '190px', height: '110px', background: '#E8E0D5', borderRadius: '12px', border: '1.5px solid #D4C9BA', overflow: 'hidden', position: 'relative', padding: '10px' }}>
        <div style={{ width: '100%', height: '50px', background: '#CC5833', opacity: 0.15, borderRadius: '8px', marginBottom: '8px' }}></div>
        <div style={{ width: '70%', height: '7px', background: '#B0A898', borderRadius: '3px', marginBottom: '5px' }}></div>
        <div style={{ width: '45%', height: '7px', background: '#B0A898', opacity: 0.6, borderRadius: '3px' }}></div>
        <div style={{ position: 'absolute', bottom: '8px', right: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#CC5833', fontSize: '13px', fontWeight: 600 }}>♥</span>
          <span className="font-mono" style={{ fontSize: '12px', color: '#CC5833', fontWeight: 600 }}>{likeCount}</span>
        </div>
      </div>
    </div>,
    /* Step 3: notification ping */
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        background: '#1A1A1A', borderRadius: '12px', padding: '12px 18px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px',
        transition: 'all 0.5s ease',
        opacity: showNotif ? 1 : 0,
        transform: showNotif ? 'translateX(0)' : 'translateX(60px)',
      }}>
        <BarChart3 style={{ width: '18px', height: '18px', color: '#CC5833', flexShrink: 0 }} />
        <span className="font-dm" style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 500, whiteSpace: 'nowrap' }}>Tu informe de marzo está listo</span>
      </div>
    </div>,
  ]

  return (
    <section ref={sectionRef} id="como-funciona" className="bg-gray-surface" style={sectionPadding}>
      {/* Header */}
      <div style={{ ...innerContainer, maxWidth: '768px', textAlign: 'center', marginBottom: '4rem' }}>
        <span className="font-dm font-semibold text-orange bg-orange-soft"
          style={{ display: 'inline-block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '50px', marginBottom: '1.25rem' }}>
          Cómo funciona
        </span>
        <h2 className="font-syne font-[800] text-black" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '1rem', wordBreak: 'break-word' }}>
          Tres pasos y listo
        </h2>
        <p className="font-dm text-gray-text" style={{ fontSize: '18px', lineHeight: 1.6 }}>
          Sin complicaciones. Sin que tengas que aprender nada. Nos encargamos de todo.
        </p>
      </div>

      {/* Cards — always visible, GSAP only adds motion */}
      <div ref={cardsRef} style={{ ...innerContainer, position: 'relative' }}>
        {/* Dotted connector line */}
        <div className="hiw-line" style={{ display: 'none', position: 'absolute', top: '50%', left: '16%', right: '16%', borderTop: '2px dashed rgba(255,107,43,0.25)', transform: 'translateY(-50%)', zIndex: 0 }}></div>

        <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {hiwSteps.map((step, i) => (
            <div key={step.num} className="hiw-card-item hiw-card" style={hiwCardStyle}>
              <span className="font-mono" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#CC5833', fontWeight: 700, lineHeight: 1, opacity: 1 }}>
                {step.num}
              </span>
              <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {illustrations[i]}
              </div>
              <h3 className="font-syne font-[800] text-black" style={{ fontSize: '20px', lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p className="font-dm text-gray-text" style={{ fontSize: '14px', lineHeight: 1.75 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES: CONTENT BREAKDOWN ─── */
function FeatureContent() {
  const [activeCard, setActiveCard] = useState(0)
  const sectionRef = useRef(null)

  const plans = [
    {
      name: 'Plan Básico', price: '249', badge: null, badgeColor: '',
      grid: [['4', 'Fotos'], ['2', 'Carruseles'], ['2', 'Reels'], ['8', 'Stories']],
      networks: ['Instagram', 'Facebook'],
      total: '16 contenidos este mes',
      dot: 'bg-green-500'
    },
    {
      name: 'Plan Crecimiento', price: '399', badge: 'Más popular', badgeColor: 'bg-orange text-white',
      grid: [['4', 'Fotos'], ['4', 'Carruseles'], ['4', 'Reels'], ['8', 'Stories']],
      networks: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
      total: '20 contenidos este mes',
      dot: 'bg-orange'
    },
    {
      name: 'Plan Premium', price: '599', badge: 'Ads incluidos', badgeColor: 'bg-purple-100 text-purple-700',
      grid: [['6', 'Fotos'], ['6', 'Carruseles'], ['6', 'Reels'], ['8', 'Stories']],
      networks: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
      total: '26 contenidos este mes',
      dot: 'bg-purple-500'
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3)
    }, 3500)

    const ctx = gsap.context(() => {
      gsap.from('.feat-content', {
        scrollTrigger: { trigger: '.feat-content', start: 'top 75%' },
        opacity: 0, y: 50, duration: 0.8
      })
    }, sectionRef)

    return () => { clearInterval(interval); ctx.revert() }
  }, [])

  const plan = plans[activeCard]

  return (
    <section ref={sectionRef} className="feat-content bg-white" style={sectionPadding}>
      <div className="items-center" style={{ ...innerContainer, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Text */}
        <div>
          <span className="inline-block font-dm text-[11px] uppercase tracking-[0.15em] font-semibold text-orange bg-orange-soft px-4 py-1.5 rounded-full mb-4">
            Contenido
          </span>
          <h2 className="font-syne font-[800] text-3xl md:text-5xl tracking-tight text-black" style={{ marginBottom: '1rem' }}>
            El desglose de<br />contenido
          </h2>
          <p className="font-dm text-gray-text text-lg max-w-md" style={{ marginBottom: '0.75rem', lineHeight: 1.6 }}>
            Cada plan incluye contenido real, editado por profesionales. No templates. No stock. Tu restaurante, tu voz.
          </p>
          {/* Plan selector dots */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
            {plans.map((p, i) => (
              <button key={i} onClick={() => setActiveCard(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCard === i ? 'bg-orange scale-125' : 'bg-gray-300'}`}></button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div style={{ position: 'relative', minHeight: '520px' }}>
          <div key={activeCard} className="bg-white border border-gray-200 shadow-lg animate-[fadeInUp_0.5s_ease-out]"
            style={{ position: 'absolute', inset: 0, borderRadius: '24px', padding: '2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>

            {/* Header: name + badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <div>
                <span className="font-dm text-gray-text" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>{plan.name}</span>
                <div className="font-mono text-orange font-medium" style={{ fontSize: '40px', lineHeight: 1 }}>
                  {plan.price}€
                  <span className="font-dm text-gray-text" style={{ fontSize: '16px', marginLeft: '4px' }}>/ mes</span>
                </div>
              </div>
              {plan.badge && (
                <span className={`font-dm text-xs font-semibold rounded-full ${plan.badgeColor}`}
                  style={{ padding: '6px 14px', whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </span>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#eee', marginBottom: '1.75rem' }}></div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {plan.grid.map(([num, label], i) => (
                <div key={i} className="bg-gray-surface" style={{ borderRadius: '16px', padding: '1rem 0.75rem', textAlign: 'center' }}>
                  <span className="font-mono font-medium text-black" style={{ fontSize: '28px', display: 'block', lineHeight: 1.1, marginBottom: '4px' }}>{num}</span>
                  <span className="font-dm text-gray-text" style={{ fontSize: '12px' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Networks */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
              {plan.networks.map(net => (
                <span key={net} className="font-dm bg-gray-surface text-gray-text" style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '50px' }}>{net}</span>
              ))}
            </div>

            {/* Total — pushed to bottom */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF3EE', borderRadius: '50px', padding: '10px 16px' }}>
              <span className={`pulse-dot ${plan.dot}`} style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 }}></span>
              <span className="font-dm font-semibold text-black" style={{ fontSize: '14px' }}>{plan.total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES: TERMINAL ─── */
function FeatureTerminal() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)
  const lineIndexRef = useRef(0)

  const allLines = [
    'Publicando reel en Instagram del Restaurante Casa Pepe...',
    'Respondiendo 12 comentarios en TikTok...',
    'Programando 3 stories para esta semana...',
    'Informe de alcance generado: +2.4K impresiones',
    'Anuncio activo en Meta · Presupuesto: 150€ · CPC: 0.32€',
    'Subiendo carrusel "Menú del día" a Instagram...',
    'Optimizando perfil de Google Business...',
    'Nuevo seguidor orgánico: +47 esta semana',
  ]

  useEffect(() => {
    let charIndex = 0
    let typing = true
    let interval

    const typeLine = () => {
      const fullLine = allLines[lineIndexRef.current % allLines.length]
      interval = setInterval(() => {
        if (charIndex <= fullLine.length) {
          setCurrentLine(fullLine.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setLines(prev => [...prev.slice(-5), fullLine])
            setCurrentLine('')
            charIndex = 0
            lineIndexRef.current++
            typeLine()
          }, 1200)
        }
      }, 30)
    }

    typeLine()

    const ctx = gsap.context(() => {
      gsap.from('.feat-terminal', {
        scrollTrigger: { trigger: '.feat-terminal', start: 'top 75%' },
        opacity: 0, y: 50, duration: 0.8
      })
    }, sectionRef)

    return () => { clearInterval(interval); ctx.revert() }
  }, [])

  // Auto-scroll terminal to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines, currentLine])

  return (
    <section ref={sectionRef} className="feat-terminal bg-black" style={sectionPadding}>
      <div className="items-center" style={{ ...innerContainer, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Terminal */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 order-2 md:order-1" style={{ height: '380px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Title bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="font-mono text-xs text-white/30" style={{ marginLeft: '8px' }}>gastrovisual-cli</span>
          </div>
          {/* Content — fixed height, scroll internal, lines anchor to bottom */}
          <div ref={terminalRef} className="font-mono text-sm" style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', lineHeight: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div>
              {lines.map((line, i) => (
                <div key={i} className="text-white/50" style={{ marginBottom: '0.5rem' }}>
                  <span className="text-orange" style={{ marginRight: '10px' }}>▸</span>{line}
                </div>
              ))}
              <div className="text-white" style={{ marginTop: '0.5rem' }}>
                <span className="text-orange" style={{ marginRight: '10px' }}>▸</span>
                {currentLine}
                <span className="cursor-blink text-orange" style={{ marginLeft: '2px' }}>█</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <span className="inline-block font-dm text-[11px] uppercase tracking-[0.15em] font-semibold text-orange bg-orange/10 px-4 py-1.5 rounded-full" style={{ marginBottom: '1.25rem' }}>
            Gestión
          </span>
          <h2 className="font-syne font-[800] text-3xl md:text-5xl tracking-tight text-white" style={{ marginBottom: '1rem' }}>
            Terminal de<br />publicación
          </h2>
          <p className="font-dm text-white/50 text-lg max-w-md" style={{ lineHeight: 1.6 }}>
            Mientras tú cocinas, nuestro equipo publica, responde y optimiza en tiempo real. Todo monitorizado, nada al azar.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.mani-line').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          opacity: 0, y: 30, duration: 0.8, delay: i * 0.15
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" style={sectionPadding}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
          alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 text-center" style={{ ...innerContainer, maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p className="mani-line font-syne font-[800] text-2xl md:text-4xl text-gray-text leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            La mayoría de agencias te venden seguidores.
          </p>
          <p className="mani-line font-syne font-[800] text-2xl md:text-4xl text-white leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Nosotros te traemos clientes que reservan mesa.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p className="mani-line font-syne font-[800] text-2xl md:text-4xl text-gray-text leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Publican contenido genérico.
          </p>
          <p className="mani-line font-syne font-[800] text-2xl md:text-4xl text-white leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Nosotros creamos tu voz digital desde cero.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── PRICING CARD COMPONENT ─── */
function PricingCard({ badge, badgeColor, badgeStyle, extraBadges, name, tagline, price, contentGrid, contentTotal, contentNote, networks, includes, checkColor, adBlocks, addons, ctaStyle, featured }) {
  const checkIcon = <Check className="w-4 h-4 shrink-0" style={{ marginTop: '2px' }} />

  return (
    <div
      className={`pricing-card bg-white flex flex-col ${featured ? 'shadow-2xl border-2 border-orange' : 'shadow-sm border border-gray-200'}`}
      style={{
        borderRadius: '28px',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        position: 'relative',
        ...(featured ? { transform: 'scale(1.03)', zIndex: 2 } : {}),
      }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
          <span
            className={`inline-block font-dm text-xs font-semibold px-4 py-1.5 rounded-full ${badgeColor}`}
            style={{ ...badgeStyle }}
          >
            {badge}
          </span>
          {extraBadges && extraBadges.map((eb, i) => (
            <span key={i} className="inline-block font-dm text-xs font-[800] px-4 py-1.5 rounded-full" style={eb.style}>
              {eb.icon && <span style={{ marginRight: '4px' }}>{eb.icon}</span>}{eb.label}
            </span>
          ))}
        </div>
        <h3 className="font-syne font-[800] text-black" style={{ fontSize: 'clamp(22px, 2vw, 26px)', marginBottom: '6px', lineHeight: 1.2 }}>{name}</h3>
        <p className="font-dm italic text-gray-text" style={{ fontSize: '14px', marginBottom: '0' }}>{tagline}</p>
      </div>

      {/* ── Price ── */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e5e5' }}>
        <span className="font-syne font-[800] text-black" style={{ fontSize: 'clamp(48px, 4vw, 60px)', lineHeight: 1 }}>{price}</span>
        <span className="font-dm text-gray-text" style={{ fontSize: '16px', marginLeft: '4px' }}>/mes</span>
      </div>

      {/* ── Content Grid ── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="font-mono uppercase text-gray-text" style={{ fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '0.875rem' }}>
          Contenido mensual
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
          {contentGrid.map(([num, label], i) => (
            <div key={i} className="bg-gray-surface" style={{ borderRadius: '14px', paddingTop: '0.875rem', paddingBottom: '0.875rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', textAlign: 'center' }}>
              <span className="font-mono font-medium text-black" style={{ fontSize: '26px', display: 'block', lineHeight: 1.2, marginBottom: '4px' }}>{num}</span>
              <span className="font-dm text-gray-text" style={{ fontSize: '11px' }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="bg-orange-soft" style={{ borderRadius: '50px', padding: '10px 16px', textAlign: 'center', marginTop: '0.75rem' }}>
          <span className="font-dm font-medium text-orange" style={{ fontSize: '13px' }}>{contentTotal}</span>
        </div>
        {contentNote && (
          <p className="font-dm italic" style={{ fontSize: '11px', color: '#FF6B2B', marginTop: '0.5rem', textAlign: 'center' }}>{contentNote}</p>
        )}
      </div>

      {/* ── Networks ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e5e5' }}>
        {networks.map(([net, bg, textColor]) => (
          <span key={net} className="font-dm" style={{ fontSize: '12px', background: bg, color: textColor, padding: '6px 14px', borderRadius: '50px' }}>{net}</span>
        ))}
      </div>

      {/* ── Includes ── */}
      <div style={{ marginBottom: '1.75rem', flexGrow: 1 }}>
        <span className="font-mono uppercase text-gray-text" style={{ fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '1rem' }}>
          Incluye
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {includes.map((item, i) => {
            const isArr = Array.isArray(item)
            const isLast = i === includes.length - 1
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingTop: '0.6rem', paddingBottom: '0.6rem', borderBottom: isLast ? 'none' : '1px solid #f0f0f0' }}>
                <div className={checkColor}>{checkIcon}</div>
                <span className="font-dm text-black/80" style={{ fontSize: '14px', lineHeight: 1.55 }}>
                  {isArr ? item[0] : item}
                  {isArr && (
                    <span className="font-dm" style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px', background: item[2] || '#f0fdf4', color: item[3] || '#166534' }}>
                      {item[1]}
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Ads ── */}
      {adBlocks && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
        {/* Green block — management included */}
        <div style={{ borderLeft: '3px solid #22C55E', padding: '0.875rem 1.125rem', background: '#F0FDF4', borderRadius: '0 14px 14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="font-dm font-semibold" style={{ fontSize: '13px', color: '#0F0F0F' }}>{adBlocks.greenTitle}</span>
            <span className="font-dm" style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#166534' }}>incluida en el plan</span>
          </div>
          <p className="font-dm" style={{ fontSize: '12px', color: '#166534', margin: 0 }}>Creamos, optimizamos y monitorizamos tus campañas.</p>
        </div>
        {/* Gray block — budget paid by client */}
        <div style={{ borderLeft: '3px solid #BBBBBB', padding: '0.875rem 1.125rem', background: '#F8F8F6', borderRadius: '0 14px 14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="font-dm font-semibold" style={{ fontSize: '13px', color: '#0F0F0F' }}>Presupuesto publicitario</span>
            <span className="font-dm" style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: '#EBEBEB', color: '#666' }}>lo paga el restaurante</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {adBlocks.budgetRows.map(([label, value], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono text-gray-text" style={{ fontSize: '12px' }}>{label}</span>
                <span className="font-mono font-medium" style={{ fontSize: '12px', color: '#0F0F0F' }}>{value}</span>
              </div>
            ))}
          </div>
          <p className="font-dm italic" style={{ fontSize: '10px', color: '#ABABAB', marginTop: '0.6rem', marginBottom: 0 }}>{adBlocks.budgetNote}</p>
        </div>
      </div>
      )}

      {/* ── Add-ons ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
        <span className="font-mono uppercase text-gray-text" style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>Add-ons</span>
        {addons.map(([label, price, bg, textColor], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: bg, borderRadius: '12px', padding: '14px 18px' }}>
            <span className="font-dm" style={{ fontSize: '13px', color: textColor }}>{label}</span>
            <span className="font-mono font-medium" style={{ fontSize: '13px', color: textColor }}>{price}</span>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      {ctaStyle === 'solid' ? (
        <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
          className="group relative overflow-hidden"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '20px 32px', borderRadius: '50px', background: '#FF6B2B', color: 'white', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '16px', transition: 'transform 0.2s', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          <WhatsAppIcon className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Contactar por WhatsApp</span>
        </a>
      ) : (
        <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '20px 32px', borderRadius: '50px', border: '2px solid #FF6B2B', color: '#FF6B2B', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', textDecoration: 'none', background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FF6B2B'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B2B'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <WhatsAppIcon className="w-5 h-5" />
          Contactar por WhatsApp
        </a>
      )}
    </div>
  )
}

/* ─── PUBLICIDAD + ADD-ONS ─── */
function PublicidadAddons() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pub-header', {
        scrollTrigger: { trigger: '.pub-header', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8,
      })
      gsap.from('.pub-block', {
        scrollTrigger: { trigger: '.pub-blocks', start: 'top 75%' },
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-surface" style={sectionPadding}>
      {/* ── Header ── */}
      <div className="pub-header text-center" style={{ ...innerContainer, maxWidth: '1100px', marginBottom: '64px' }}>
        <span className="inline-block font-dm text-[11px] uppercase tracking-[0.15em] font-semibold text-orange bg-orange-soft px-4 py-1.5 rounded-full" style={{ marginBottom: '20px' }}>
          Publicidad + Add-ons
        </span>
        <h2 className="font-syne font-[800] text-black" style={{ fontSize: 'clamp(36px, 5vw, 48px)', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          La publicidad que<br /><span className="italic text-orange">llena</span> mesas
        </h2>
        <p className="font-dm font-[300] text-gray-text" style={{ fontSize: '17px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          Muchos restaurantes no saben que por el precio de un café al día pueden llegar a miles de personas en su barrio. Te explicamos cómo funciona y qué incluye cada add-on.
        </p>
      </div>

      <div className="pub-blocks" style={{ ...innerContainer, maxWidth: '1100px' }}>

        {/* ── BLOQUE 1 — ¿Qué es la publicidad segmentada? ── */}
        <div className="pub-block pub-explainer" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          {/* Left col — text */}
          <div className="pub-block-text">
            <h3 className="font-syne font-[700] text-black" style={{ fontSize: '24px', marginBottom: '16px' }}>Tu restaurante, solo ante quien importa</h3>
            <p className="font-dm font-[300]" style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '24px' }}>
              La publicidad en Meta (Instagram y Facebook) y TikTok no funciona como un cartel en la calle que ve todo el mundo. Funciona al revés: tú decides exactamente a quién quieres llegar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                'Personas que viven o trabajan a menos de 5 km de tu restaurante',
                'Usuarios que han buscado restaurantes como el tuyo recientemente',
                'Gente con el perfil exacto de tu cliente ideal: edad, intereses, hábitos',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B2B', flexShrink: 0, marginTop: '7px' }}></span>
                  <span className="font-dm font-[300]" style={{ fontSize: '14px', color: '#444', lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
            <p className="font-dm italic text-gray-text" style={{ fontSize: '14px', lineHeight: 1.6 }}>
              Nosotros configuramos esa segmentación. Tú solo pones el presupuesto directamente en tu cuenta de Meta o TikTok.
            </p>
          </div>

          {/* Right col — example card */}
          <div className="pub-block-card" style={{ background: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #EBEBEB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <div style={{ background: '#FF6B2B', padding: '16px 20px', borderRadius: '20px 20px 0 0' }}>
              <span className="font-syne font-[700]" style={{ fontSize: '14px', color: '#fff', display: 'block' }}>Ejemplo real</span>
              <span className="font-dm font-[300]" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Restaurante en Murcia</span>
            </div>
            <div style={{ padding: '24px 20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span className="pub-card-number font-syne font-[800]" style={{ fontSize: '52px', color: '#0F0F0F', lineHeight: 1 }}>40.000</span>
                <span className="font-dm font-[300] text-gray-text" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>personas alcanzadas</span>
              </div>
              <div style={{ height: '1px', background: '#EBEBEB', marginBottom: '16px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  ['Inversión diaria', '5€/día'],
                  ['Total al mes', '150€'],
                  ['Radio de impacto', '5 km del local'],
                  ['Coste por persona', '0,004€'],
                ].map(([label, value], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-mono text-gray-text" style={{ fontSize: '12px' }}>{label}</span>
                    <span className="font-mono font-medium" style={{ fontSize: '12px', color: '#0F0F0F', whiteSpace: 'nowrap' }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', background: '#EBEBEB', marginBottom: '14px' }}></div>
              <p className="font-dm italic" style={{ fontSize: '11px', color: '#ABABAB', margin: 0 }}>Con una campaña básica gestionada por GastroVisual durante 30 días.</p>
            </div>
          </div>
        </div>

        {/* ── BLOQUE 2 — Tarjetas de add-ons ── */}
        <div className="pub-block" style={{ marginBottom: '64px' }}>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h3 className="font-syne font-[700] text-black" style={{ fontSize: '28px', marginBottom: '10px' }}>¿Qué incluye cada add-on?</h3>
            <p className="font-dm font-[300] text-gray-text" style={{ fontSize: '15px' }}>Servicios que puedes añadir a cualquier plan según lo que necesites.</p>
          </div>

          <div className="pub-addon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>

            {/* Card 1 — Gestión de publicidad */}
            <div className="bg-white" style={{ borderRadius: '28px', border: '1px solid #e5e5e5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <Megaphone className="w-6 h-6 text-orange" style={{ marginBottom: '16px' }} />
              <div style={{ marginBottom: '4px' }}>
                <span className="font-syne font-[800]" style={{ fontSize: '32px', color: '#0F0F0F' }}>+49€</span>
                <span className="font-dm text-gray-text" style={{ fontSize: '14px', marginLeft: '4px' }}>/mes</span>
              </div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#ABABAB', display: 'block', marginBottom: '16px' }}>ya incluido en planes Impulso, Dominio e Imperio</span>
              <h4 className="font-syne font-[700] text-black" style={{ fontSize: '18px', marginBottom: '8px' }}>Gestión de anuncios</h4>
              <p className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '16px' }}>
                Creamos, configuramos y optimizamos tus campañas en Meta (Instagram + Facebook) y TikTok. Segmentación local, creatividades y seguimiento semanal.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', flexGrow: 1 }}>
                {[
                  'Creación de anuncios y creatividades',
                  'Segmentación por zona, edad e intereses',
                  'Optimización semanal del rendimiento',
                  'Informe mensual de resultados',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B2B', flexShrink: 0, marginTop: '6px' }}></span>
                    <span className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FFF3EE', borderRadius: '8px', padding: '10px 14px' }}>
                <span className="font-dm italic" style={{ fontSize: '11px', color: '#C2400A' }}>El presupuesto publicitario lo pagas tú directamente a Meta/TikTok. Mínimo recomendado: 50€/mes.</span>
              </div>
            </div>

            {/* Card 2 — Avatar Digital IA (DESTACADA) */}
            <div style={{ borderRadius: '28px', border: '2px solid #FF6B2B', boxShadow: '0 8px 32px rgba(255,107,43,0.12)', padding: '2rem', display: 'flex', flexDirection: 'column', background: '#FFFFFF', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <Bot className="w-6 h-6 text-orange" />
                <span className="font-syne font-[800]" style={{ fontSize: '10px', background: '#FF6B2B', color: '#fff', padding: '4px 10px', borderRadius: '50px', letterSpacing: '0.03em' }}>Incluido gratis en Plan Imperio</span>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <span className="font-syne font-[800]" style={{ fontSize: '32px', color: '#0F0F0F' }}>+75€</span>
                <span className="font-dm text-gray-text" style={{ fontSize: '14px', marginLeft: '4px' }}>/mes</span>
              </div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#ABABAB', display: 'block', marginBottom: '16px' }}>incluido en plan Imperio</span>
              <h4 className="font-syne font-[700] text-black" style={{ fontSize: '18px', marginBottom: '8px' }}>Avatar Digital IA</h4>
              <p className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '16px' }}>
                Creamos una identidad digital con inteligencia artificial que representa a tu restaurante. Con voz propia, imagen y personalidad. Aparece en reels, stories y comunicados sin que tengas que salir tú en cámara.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                {[
                  'Creación del avatar personalizado',
                  'Voz generada con IA en español',
                  'Integración en reels y stories',
                  'Comunicados y novedades del restaurante',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B2B', flexShrink: 0, marginTop: '6px' }}></span>
                    <span className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 — Google Business Profile */}
            <div className="bg-white" style={{ borderRadius: '28px', border: '1px solid #e5e5e5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <MapPin className="w-6 h-6 text-orange" style={{ marginBottom: '16px' }} />
              <div style={{ marginBottom: '4px' }}>
                <span className="font-syne font-[800]" style={{ fontSize: '32px', color: '#0F0F0F' }}>+49€</span>
                <span className="font-dm text-gray-text" style={{ fontSize: '14px', marginLeft: '4px' }}>/mes</span>
              </div>
              <span style={{ display: 'block', marginBottom: '16px', height: '13px' }}></span>
              <h4 className="font-syne font-[700] text-black" style={{ fontSize: '18px', marginBottom: '8px' }}>Google Business Profile</h4>
              <p className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '16px' }}>
                Gestionamos tu ficha en Google Maps y Google Search. Respondemos reseñas, actualizamos fotos, horarios y publicamos novedades para que aparezcas primero cuando alguien busca un restaurante cerca.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', flexGrow: 1 }}>
                {[
                  'Respuesta a reseñas positivas y negativas',
                  'Actualización de fotos y horarios',
                  'Publicaciones semanales en la ficha',
                  'Optimización para búsquedas locales',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B2B', flexShrink: 0, marginTop: '6px' }}></span>
                    <span className="font-dm font-[300]" style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F0FDF4', borderRadius: '8px', padding: '10px 14px' }}>
                <span className="font-dm italic" style={{ fontSize: '11px', color: '#166534' }}>El 46% de las búsquedas en Google tienen intención local. Estar bien posicionado en Maps es clave para restaurantes.</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── BLOQUE 3 — CTA final ── */}
        <div className="pub-block" style={{ background: '#0F0F0F', borderRadius: '24px', padding: '48px 40px', textAlign: 'center' }}>
          <h3 className="font-syne font-[800]" style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#FFFFFF', marginBottom: '12px' }}>¿No sabes qué necesita tu restaurante?</h3>
          <p className="font-dm font-[300]" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
            Cuéntanos cómo estás ahora y te decimos qué plan y qué add-ons tienen más sentido para ti. Sin compromiso.
          </p>
          <a
            href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px 40px', borderRadius: '50px', background: '#FF6B2B', color: 'white', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '16px', transition: 'transform 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <WhatsAppIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Habla con nosotros gratis</span>
          </a>
        </div>

      </div>
    </section>
  )
}

/* ─── PRICING ─── */
function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-header', {
        scrollTrigger: { trigger: '.pricing-header', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8
      })
      gsap.from('.pricing-card', {
        scrollTrigger: { trigger: '.pricing-cards', start: 'top 75%' },
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const networkBasic = [['Instagram', '#fdf2f8', '#db2777'], ['Facebook', '#eff6ff', '#2563eb']]
  const networkFull = [['Instagram', '#fdf2f8', '#db2777'], ['Facebook', '#eff6ff', '#2563eb'], ['TikTok', '#0F0F0F', '#ffffff'], ['YouTube', '#fef2f2', '#dc2626']]

  return (
    <section ref={sectionRef} id="precios" className="bg-gray-surface" style={sectionPadding}>
      {/* Header */}
      <div className="pricing-header text-center" style={{ ...innerContainer, maxWidth: '720px', marginBottom: '64px' }}>
        <span className="inline-block font-dm text-[11px] uppercase tracking-[0.15em] font-semibold text-orange bg-orange-soft px-4 py-1.5 rounded-full" style={{ marginBottom: '20px' }}>
          Planes y precios
        </span>
        <h2 className="font-syne font-[800] text-black" style={{ fontSize: 'clamp(36px, 5vw, 52px)', marginBottom: '16px', wordBreak: 'break-word', overflowWrap: 'break-word' }}>Planes que llenan mesas</h2>
        <p className="font-dm text-gray-text" style={{ fontSize: '18px', marginBottom: '20px' }}>Elige el plan que mejor se adapte a tu restaurante. Sin permanencia.</p>
      </div>

      {/* Ad explainer block */}
      <div style={{ ...innerContainer, maxWidth: '1720px', marginBottom: '32px' }}>
        <div style={{ background: '#FFF8F5', borderLeft: '4px solid #FF6B2B', borderRadius: '12px', padding: '16px 20px' }}>
          <span className="font-syne font-[700]" style={{ fontSize: '14px', color: '#0F0F0F', display: 'block', marginBottom: '12px' }}>¿Cómo funciona la publicidad?</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Check className="w-4 h-4 shrink-0" style={{ marginTop: '2px', color: '#22C55E' }} />
              <span className="font-dm" style={{ fontSize: '13px', color: '#333' }}>La gestión de anuncios (crear, optimizar y monitorizar tus campañas) está incluida en los planes Impulso, Dominio e Imperio.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Info className="w-4 h-4 shrink-0" style={{ marginTop: '2px', color: '#FF6B2B' }} />
              <span className="font-dm" style={{ fontSize: '13px', color: '#333' }}>El presupuesto publicitario (el dinero que inviertes en Meta o TikTok) lo pagas tú directamente a la plataforma. No está incluido en el precio del plan. Nosotros lo gestionamos, tú lo financias.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="pricing-cards" style={{ ...innerContainer, maxWidth: '1720px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'start' }}>

        <PricingCard
          badge="Plan Inicio"
          badgeColor=""
          badgeStyle={{ background: '#F5F5F3', color: '#555', border: '1px solid #E0E0E0' }}
          name="Inicio"
          tagline="Para restaurantes que quieren dar el primer paso en redes."
          price="€90"
          contentGrid={[['10', 'Fotos del restaurante'], ['2', 'Carruseles']]}
          contentTotal="12 contenidos al mes"
          contentNote="Las fotos las proporciona el restaurante"
          networks={networkBasic}
          includes={[
            'Diseño y edición de carruseles',
            'Planificación del calendario mensual',
            'Publicación en Instagram y Facebook',
            'Respuesta a comentarios y mensajes privados',
          ]}
          checkColor="text-orange"
          addons={[
            ['Avatar Digital IA', '+75€/mes', '#f5f3ff', '#7c3aed'],
            ['Google Business Profile', '+49€/mes', '#F7F6F3', '#767676'],
          ]}
          ctaStyle="outline"
        />

        <PricingCard
          badge="Plan Impulso"
          badgeColor=""
          badgeStyle={{ background: '#F0FDF4', color: '#166534' }}
          name="Impulso"
          tagline="Para restaurantes que quieren crecer con contenido profesional."
          price="€249"
          contentGrid={[['10', 'Fotos estáticas'], ['4', 'Carruseles'], ['2', 'Reels / vídeos'], ['8', 'Stories (2/semana)']]}
          contentTotal="24 contenidos al mes"
          networks={networkBasic}
          includes={[
            'Creación y edición de todo el contenido',
            'Planificación del calendario mensual',
            'Publicación en redes sociales',
            'Respuesta a comentarios y mensajes privados',
            'Optimización inicial de perfiles',
            'Resumen mensual de resultados',
          ]}
          checkColor="text-green-500"
          adBlocks={{
            greenTitle: 'Gestión de anuncios Meta',
            budgetRows: [
              ['Mínimo recomendado', '50€/mes'],
              ['Óptimo', '100–150€/mes'],
            ],
            budgetNote: 'Se paga directamente a Meta desde tu cuenta.',
          }}
          addons={[
            ['Avatar Digital IA', '+75€/mes', '#f5f3ff', '#7c3aed'],
            ['Google Business Profile', '+49€/mes', '#F7F6F3', '#767676'],
          ]}
          ctaStyle="outline"
        />

        <PricingCard
          featured
          badge="Más popular"
          badgeColor="bg-orange text-white"
          name="Dominio"
          tagline="Para restaurantes que quieren dominar su zona."
          price="€399"
          contentGrid={[['10', 'Fotos estáticas'], ['6', 'Carruseles'], ['4', 'Reels / vídeos'], ['8', 'Stories (2/semana)']]}
          contentTotal="28 contenidos al mes"
          networks={networkFull}
          includes={[
            'Todo lo del plan Impulso',
            ['Rediseño completo de perfiles', 'incluido'],
            'Estrategia mensual de contenido',
            'Informe mensual con métricas clave',
          ]}
          checkColor="text-orange"
          adBlocks={{
            greenTitle: 'Gestión de anuncios Meta + TikTok',
            budgetRows: [
              ['Mínimo recomendado', '100€/mes'],
              ['Óptimo', '150–300€/mes'],
            ],
            budgetNote: 'Se paga directamente a Meta/TikTok desde tu cuenta.',
          }}
          addons={[
            ['Avatar Digital IA', '+75€/mes', '#f5f3ff', '#7c3aed'],
            ['Google Business Profile', '+49€/mes', '#F7F6F3', '#767676'],
          ]}
          ctaStyle="solid"
        />

        <PricingCard
          badge="Plan Imperio"
          badgeColor=""
          badgeStyle={{ background: '#FFF3EE', color: '#C2400A' }}
          extraBadges={[{ label: 'Avatar IA incluido gratis', icon: '★', style: { background: '#FF6B2B', color: 'white' } }]}
          name="Imperio"
          tagline="Para ser la referencia absoluta en tu zona."
          price="€599"
          contentGrid={[['10', 'Fotos estáticas'], ['8', 'Carruseles'], ['6', 'Reels / vídeos'], ['8', 'Stories (2/semana)']]}
          contentTotal="32 contenidos al mes"
          networks={networkFull}
          includes={[
            'Todo lo del plan Dominio',
            ['Avatar Digital IA — creación e integración', 'incluido', '#FFF3EE', '#C2400A'],
            'Informe avanzado con analíticas detalladas',
            'Sesión estratégica mensual de 30 min',
          ]}
          checkColor="text-orange"
          adBlocks={{
            greenTitle: 'Gestión de anuncios Meta + TikTok',
            budgetRows: [
              ['Mínimo recomendado', '150€/mes'],
              ['Óptimo', '300–600€/mes'],
            ],
            budgetNote: 'Se paga directamente a Meta/TikTok desde tu cuenta.',
          }}
          addons={[
            ['Google Business Profile', '+49€/mes', '#F7F6F3', '#767676'],
          ]}
          ctaStyle="outline"
        />
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  const faqs = [
    {
      q: '¿Necesito tener cuenta en redes sociales ya creada?',
      a: 'No es necesario. Si ya tienes cuentas las optimizamos desde el primer día. Si no tienes, las creamos y dejamos listas antes de publicar.'
    },
    {
      q: '¿Quién crea el contenido, yo o vosotros?',
      a: 'Nosotros nos encargamos de todo: diseño, redacción, edición de vídeo y publicación. Solo necesitamos fotos o vídeos del restaurante.'
    },
    {
      q: '¿Cuánto tiempo tarda en verse resultados?',
      a: 'Los primeros resultados en métricas se notan desde el primer mes. El impacto en reservas y clientes suele verse entre el mes 2 y 3.'
    },
    {
      q: '¿Puedo cambiar de plan?',
      a: 'Sí, puedes subir o bajar de plan en cualquier momento avisando antes del inicio del siguiente mes.'
    },
    {
      q: '¿Qué es el Avatar Digital IA?',
      a: 'Es una representación digital del restaurante con voz y apariencia personalizadas, creada con IA, para protagonizar reels y stories sin que aparezcas tú en cámara.'
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-left', {
        scrollTrigger: { trigger: '.faq-left', start: 'top 80%' },
        opacity: 0, x: -40, duration: 0.8
      })
      gsap.from('.faq-right', {
        scrollTrigger: { trigger: '.faq-right', start: 'top 80%' },
        opacity: 0, x: 40, duration: 0.8
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="bg-white" style={sectionPadding}>
      <div style={{ ...innerContainer, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {/* Left */}
        <div className="faq-left">
          <span className="inline-block font-dm text-[11px] uppercase tracking-[0.15em] font-semibold text-orange bg-orange-soft px-4 py-1.5 rounded-full" style={{ marginBottom: '1.25rem' }}>
            FAQ
          </span>
          <h2 className="font-syne font-[800] text-3xl md:text-4xl tracking-tight text-black" style={{ marginBottom: '1rem' }}>
            Preguntas<br />frecuentes
          </h2>
          <p className="font-dm text-gray-text text-base" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>
            Si no encuentras tu respuesta, escríbenos por WhatsApp y te respondemos al momento.
          </p>
          <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-orange text-white font-dm font-semibold rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            style={{ padding: '16px 32px', fontSize: '15px' }}>
            <WhatsAppIcon className="w-5 h-5" />
            Escríbenos por WhatsApp
          </a>
        </div>

        {/* Right — Accordion */}
        <div className="faq-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-orange/30">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem' }}
              >
                <span className="font-dm text-sm md:text-base font-medium text-black pr-4">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'border-orange bg-orange text-white rotate-0' : 'border-gray-300 text-gray-400 rotate-0'
                }`}>
                  {openIndex === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48' : 'max-h-0'}`} style={{ paddingBottom: openIndex === i ? '1.25rem' : '0' }}>
                <p className="font-dm text-sm text-gray-text" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER CTA ─── */
function FooterCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fcta-content', {
        scrollTrigger: { trigger: '.fcta-content', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black text-center" style={sectionPadding}>
      <div className="fcta-content" style={{ ...innerContainer, maxWidth: '768px' }}>
        <span className="inline-block w-3 h-3 rounded-full bg-orange pulse-dot" style={{ marginBottom: '2.5rem' }}></span>
        <h2 className="font-syne font-[800] text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05]" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', marginBottom: '1.5rem' }}>
          ¿Listo para <span className="italic text-orange">llenar</span><br />tu restaurante?
        </h2>
        <p className="font-dm text-white/50 text-lg max-w-lg mx-auto" style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Cuéntanos tu caso y en menos de 24 horas tienes una propuesta sin compromiso.
        </p>
        <a href="https://wa.me/34666068310?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestro%20servicio%20de%20gesti%C3%B3n%20de%20Redes%20Sociales.%20Gracias." target="_blank" rel="noopener noreferrer"
          className="fcta-btn group inline-flex items-center gap-3 bg-orange text-white font-dm font-semibold rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 relative overflow-hidden"
          style={{ padding: '22px 48px', fontSize: '18px' }}>
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          <WhatsAppIcon className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Habla con nosotros por WhatsApp</span>
        </a>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#080808] rounded-t-[2rem]" style={{ width: '100%', paddingLeft: 'clamp(1.5rem, 8vw, 120px)', paddingRight: 'clamp(1.5rem, 8vw, 120px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={innerContainer}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="font-syne font-[800] text-2xl text-white">Gastro</span>
            <span className="font-syne font-[800] text-2xl text-orange">Visual</span>
          </a>
          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
            {['Cómo funciona', 'Precios', 'FAQ'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
                className="font-dm text-sm text-white/40 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10" style={{ paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span className="font-dm text-xs text-white/30">© 2025 GastroVisual. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#" className="font-dm text-xs text-white/30 hover:text-white/60 transition-colors">Política de privacidad</a>
            <a href="#" className="font-dm text-xs text-white/30 hover:text-white/60 transition-colors">Aviso legal</a>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="font-mono text-[11px] text-white/15">
            Hecho con tanta dedicación como el mejor plato de tu carta.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
/* ─── SECTION WRAPPER — consistent padding ─── */
const sectionPadding = {
  width: '100%',
  paddingLeft: 'clamp(1.5rem, 8vw, 120px)',
  paddingRight: 'clamp(1.5rem, 8vw, 120px)',
  paddingTop: 'clamp(5rem, 12vh, 140px)',
  paddingBottom: 'clamp(5rem, 12vh, 140px)',
}

const innerContainer = {
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
}

export default function App() {
  return (
    <div style={{ width: '100%', margin: '0' }}>
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeatureContent />
      <FeatureTerminal />
      <Manifesto />
      <PublicidadAddons />
      <Pricing />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  )
}
