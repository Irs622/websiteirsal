import React, { memo, useEffect, useId, useRef, useState } from 'react';
import {
  AUDIO_CHASSIS, AUDIO_FINISH, AUDIO_HEAD, AUDIO_HEAD_REST, AUDIO_HEIGHT,
  AUDIO_INITIAL_POSITION, AUDIO_KEY_ICONS, AUDIO_LABEL_MATRIX, AUDIO_PART_COUNT,
  AUDIO_READER, AUDIO_SHADOW, AUDIO_SPEAKER, AUDIO_TRANSPORT, AUDIO_WIDTH,
  AUDIO_WHEEL, AUDIO_WHEEL_REST, headTransform, wheelPointer,
  type AudioPart
} from './ProjectAudioAnatomyGeometry';
import './ProjectAudioAnatomy.css';

function Part({ part }: { part: AudioPart }) {
  const { paths } = part;
  return (
    <g className={`paa-part paa-material-${part.material}`} data-part={part.name}>
      <path className="paa-fill" d={paths.fill} />
      {paths.shades.map((d, i) => d ? <path key={i} className={`paa-shade paa-shade-${i}`} d={d} /> : null)}
      <path className="paa-top" d={paths.top} />
      <path className="paa-crease" d={paths.crease} />
      {paths.bevel ? <path className="paa-crease" d={paths.bevel} /> : null}
      {part.details ? <path className="paa-detail" d={part.details} /> : null}
      {part.engraving ? <path className="paa-engraving" d={part.engraving} /> : null}
      <path className="paa-edge" d={paths.outline} />
    </g>
  );
}
const Parts = memo(function Parts({ parts }: { parts: AudioPart[] }) {
  return <>{parts.map(part => <Part key={part.name} part={part} />)}</>;
});
const Chassis = memo(function Chassis() {
  return (
    <>
      <path className="paa-contact-shadow" d={AUDIO_SHADOW} />
      <Parts parts={AUDIO_CHASSIS} />
      <Parts parts={AUDIO_FINISH} />
      <text className="paa-machine-label" transform={AUDIO_LABEL_MATRIX} textAnchor="middle" dominantBaseline="middle">DENGARBAIN</text>
      <Parts parts={AUDIO_SPEAKER} />
      <Parts parts={AUDIO_READER} />
    </>
  );
});
const Controls = memo(function Controls() {
  return (
    <>
      <Parts parts={AUDIO_TRANSPORT} />
      {AUDIO_KEY_ICONS.map(({ transform, kind }) => (
        <g key={kind} transform={transform} className="paa-key-engraving">
          {kind === 'play' ? (
            <>
              <path className="paa-icon-play" d="M-3-4L4 0-3 4Z" />
              <path className="paa-icon-pause" d="M-3-4V4M2-4V4" />
            </>
          ) : (
            <g transform={kind === 'back' ? 'rotate(180)' : undefined}>
              <path d="M-4-3L1 0-4 3Z" />
              <path d="M3-3V3" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </g>
          )}
        </g>
      ))}
      <Parts parts={AUDIO_WHEEL} />
    </>
  );
});

/**
 * Borderless, self-contained Selected Work figure. No audio, networking, timers
 * representing content duration, or dependencies beyond React and the site's kit.
 * The native range is the single position control; SVG parts mirror its model.
 */
export function ProjectAudioAnatomy() {
  const id = useId();
  const figure = useRef<HTMLElement>(null);
  const head = useRef<SVGGElement>(null);
  const wheel = useRef<SVGPathElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const readout = useRef<HTMLOutputElement>(null);
  const model = useRef({ target: AUDIO_INITIAL_POSITION, position: AUDIO_INITIAL_POSITION });
  const wake = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = figure.current;
    if (!root) return;
    let frame = 0;
    let last = 0;
    let inView = !('IntersectionObserver' in window);
    let disposed = false;
    const s = model.current;

    const draw = () => {
      head.current?.setAttribute('transform', headTransform(s.position));
      wheel.current?.setAttribute('d', wheelPointer(s.position));
      if (range.current) range.current.value = (playing ? s.position : s.target).toFixed(2);
      if (readout.current) readout.current.textContent = `${Math.round(s.position)}% · ${playing && !reducedMotion ? 'moving' : 'still'}`;
    };
    const canAnimate = () => inView && !document.hidden && !disposed;
    const run = () => {
      if (!frame && canAnimate()) {
        last = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!canAnimate()) return;
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 0;
      last = now;
      // An arbitrary illustrative sweep, deliberately not a track clock.
      if (playing && !reducedMotion) s.target = Math.min(100, s.target + dt * 3.5);
      s.position = reducedMotion ? s.target : s.position + (s.target - s.position) * (1 - Math.exp(-dt / 0.16));
      if (Math.abs(s.target - s.position) < 0.005) s.position = s.target;
      draw();
      if (playing && s.position === 100) {
        setPlaying(false);
        return;
      }
      if ((playing && !reducedMotion) || s.position !== s.target) frame = window.requestAnimationFrame(tick);
    };
    const cancel = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const onVisibility = () => document.hidden ? cancel() : run();
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      inView = entries[entries.length - 1].isIntersecting;
      if (inView) run();
      else cancel();
    }, { threshold: 0.05 }) : null;
    observer?.observe(root);
    document.addEventListener('visibilitychange', onVisibility);
    wake.current = () => {
      if (reducedMotion) {
        s.position = s.target;
        draw();
      } else run();
    };
    if (reducedMotion) s.position = s.target;
    draw();
    run();
    return () => {
      disposed = true;
      cancel();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      wake.current = () => {};
    };
  }, [playing, reducedMotion]);

  const scrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    model.current.target = event.currentTarget.valueAsNumber;
    setPlaying(false);
    wake.current();
  };
  const toggle = () => {
    if (!playing && model.current.position >= 99.99) {
      model.current.target = 0;
      model.current.position = 0;
    }
    setPlaying(value => !value);
  };

  return (
    <figure
      ref={figure}
      className="project-audio-anatomy"
      data-playing={playing && !reducedMotion ? 'true' : 'false'}
      data-parts={AUDIO_PART_COUNT}
      aria-labelledby={`${id}-caption`}
      aria-describedby={`${id}-disclaimer`}
    >
      <figcaption id={`${id}-caption`} className="paa-caption">
        <span className="paa-figure-number">Fig. 03</span>
        <span>Audio, with a reading companion</span>
      </figcaption>
      <svg
        className="paa-drawing"
        viewBox={`0 0 ${AUDIO_WIDTH} ${AUDIO_HEIGHT}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
      >
        <title id={`${id}-title`}>DengarBain — an illustrative listening instrument</title>
        <desc id={`${id}-description`}>
          A paper-colored tabletop talking-book player with a circular speaker,
          tactile keys, a scrub wheel, and a reading window. One graphite index
          slides across the passage as you change the illustration position.
          This is a visual metaphor for an audio-first accessible PWA, not a functioning player.
        </desc>
        <Chassis />
        <g ref={head} transform={AUDIO_HEAD_REST} className="paa-head">
          <Parts parts={AUDIO_HEAD} />
        </g>
        <Controls />
        <path ref={wheel} className="paa-wheel-pointer" d={AUDIO_WHEEL_REST} />
      </svg>
      <div className="paa-controls">
        <button
          type="button"
          className="paa-toggle"
          aria-label={reducedMotion ? 'Illustration animation disabled by reduced-motion preference' : playing ? 'Pause illustration animation' : 'Play illustration animation (no audio)'}
          aria-pressed={playing}
          aria-describedby={`${id}-disclaimer`}
          disabled={reducedMotion}
          onClick={toggle}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            {playing ? <path d="M6 5V15M13 5V15" fill="none" stroke="currentColor" strokeWidth="2" /> : <path d="M7 5L15 10L7 15Z" fill="currentColor" />}
          </svg>
        </button>
        <div className="paa-scrub">
          <label htmlFor={`${id}-position`}>{reducedMotion ? 'Motion reduced · scrub to explore' : 'Scrub the reading position'}</label>
          <input
            ref={range}
            id={`${id}-position`}
            className="paa-range"
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue={AUDIO_INITIAL_POSITION}
            aria-label="Illustration reading position, percent"
            aria-describedby={`${id}-disclaimer`}
            onChange={scrub}
            onFocus={() => setPlaying(false)}
            onPointerDown={() => setPlaying(false)}
          />
        </div>
        <output ref={readout} className="paa-readout" htmlFor={`${id}-position`} aria-live="off">{AUDIO_INITIAL_POSITION}% · still</output>
      </div>
      <p id={`${id}-disclaimer`} className="paa-disclaimer">Illustrative playback mechanism. No audio is played.</p>
    </figure>
  );
}

export default ProjectAudioAnatomy;
