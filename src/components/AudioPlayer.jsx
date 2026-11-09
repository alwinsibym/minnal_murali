import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { audioSrc } from '../data/film'

const read = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v) } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage unavailable */ } }

const pulse = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(82,200,255,.5)}50%{box-shadow:0 0 0 10px rgba(82,200,255,0)}`
const Dock = styled.div`
  position: fixed; z-index: 60; right: max(14px, env(safe-area-inset-right, 0px)); bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  display: flex; align-items: center; gap: 10px; padding: 8px 12px 8px 8px;
  background: rgba(7,11,28,.88); backdrop-filter: blur(14px); border: 1px solid rgba(82,200,255,.35);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
`
const Round = styled.button`
  display: grid; place-items: center; width: 42px; height: 42px; flex: none; cursor: pointer; border: 0; border-radius: 50%;
  background: ${(p) => (p.$hot ? 'var(--crimson)' : 'rgba(154,166,207,.18)')}; color: #fff;
  animation: ${(p) => (p.$nudge ? pulse : 'none')} 1.8s infinite;
`
const Ghost = styled.button`display: grid; place-items: center; width: 32px; height: 32px; padding: 0; background: none; border: 0; color: #c3cdee; cursor: pointer; &:hover { color: #fff; }`
const Meta = styled.div`display: grid; line-height: 1.2; min-width: 0; b { font-family: var(--mono); font-weight: 500; font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); white-space: nowrap; } small { font-size: .72rem; color: #9aa6cf; white-space: nowrap; }`
const Slider = styled.input`
  -webkit-appearance: none; appearance: none; width: 84px; height: 4px; border-radius: 2px; cursor: pointer; outline-offset: 6px;
  background: linear-gradient(90deg, var(--volt) var(--v), rgba(154,166,207,.3) var(--v));
  &::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 0; }
  &::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 0; }
  @media (max-width: 480px) { width: 60px; }
`
const Hint = styled.span`@media (max-width: 560px) { display: none; }`

export default function AudioPlayer() {
  const audio = useRef(null)
  const fade = useRef(0)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [volume, setVolume] = useState(() => read('mm-volume', 0.6))
  const [muted, setMuted] = useState(() => read('mm-muted', false))

  const ramp = useCallback((to) => {
    const a = audio.current; if (!a) return
    cancelAnimationFrame(fade.current)
    const from = a.volume, t0 = performance.now(), dur = 2200
    const step = (now) => { const k = Math.min(1, (now - t0) / dur); a.volume = Math.min(1, Math.max(0, from + (to - from) * k)); if (k < 1) fade.current = requestAnimationFrame(step) }
    fade.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    const a = audio.current; if (!a) return Promise.resolve()
    a.volume = 0
    return a.play().then(() => { setPlaying(true); setBlocked(false); ramp(muted ? 0 : volume) }).catch(() => setBlocked(true))
  }, [ramp, muted, volume])

  // Try to autoplay on load. Browsers usually refuse until the visitor interacts,
  // so the first click, key press or touch starts the music instead.
  useEffect(() => {
    start()
    const events = ['pointerdown', 'keydown', 'touchend', 'click']
    const unlock = () => { if (userPaused.current) return; start().then(() => events.forEach((e) => window.removeEventListener(e, unlock))) }
    events.forEach((e) => window.addEventListener(e, unlock))
    return () => { events.forEach((e) => window.removeEventListener(e, unlock)); cancelAnimationFrame(fade.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = (e) => {
    e.stopPropagation()
    const a = audio.current
    if (a.paused) { userPaused.current = false; start() } else { userPaused.current = true; a.pause(); setPlaying(false) }
  }
  const onVolume = (e) => {
    const v = Number(e.target.value); cancelAnimationFrame(fade.current)
    setVolume(v); setMuted(v === 0); write('mm-volume', v); write('mm-muted', v === 0)
    if (audio.current) audio.current.volume = v
  }
  const toggleMute = (e) => {
    e.stopPropagation()
    const next = !muted; setMuted(next); write('mm-muted', next)
    cancelAnimationFrame(fade.current)
    if (audio.current) audio.current.volume = next ? 0 : (volume || 0.6)
    if (!next && volume === 0) setVolume(0.6)
  }
  const shown = muted ? 0 : volume
  const VolIcon = shown === 0 ? VolumeX : shown < 0.5 ? Volume1 : Volume2

  return (
    <Dock role="group" aria-label="Music player">
      <audio ref={audio} src={audioSrc} loop preload="auto" />
      <Round type="button" onClick={toggle} $hot={playing} $nudge={blocked && !playing} aria-label={playing ? 'Pause music' : 'Play music'}>
        {playing ? <Pause size={18} fill="currentColor" aria-hidden /> : <Play size={18} fill="currentColor" aria-hidden />}
      </Round>
      <Meta><b>The Entrance</b><small><Hint>{blocked && !playing ? 'Tap anywhere to start' : playing ? 'Now playing' : 'Paused'}</Hint></small></Meta>
      <Ghost type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}><VolIcon size={18} aria-hidden /></Ghost>
      <Slider type="range" min="0" max="1" step="0.01" value={shown} onChange={onVolume} aria-label="Volume" style={{ '--v': `${shown * 100}%` }} />
    </Dock>
  )
}
