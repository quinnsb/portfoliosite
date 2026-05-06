"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

type Track = { name: string; url?: string; file?: File };
type Skin = "mono" | "era90" | "pet" | "ivan";

const EQ_BANDS = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
const EQ_LABELS = ["60", "170", "310", "600", "1K", "3K", "6K", "12K", "14K", "16K"];

const EQ_PRESETS: Record<string, number[]> = {
  Flat:  [0,  0,  0,   0,  0,  0,  0,  0,  0,  0],
  Rock:  [5,  4, -2,  -4, -2,  3,  5,  7,  7,  7],
  Pop:   [-1, 3,  5,   5,  3,  0, -1, -1, -1, -1],
  Tech:  [5,  4,  1,  -2, -2,  0,  4,  6,  6,  5],
  Bass:  [8,  6,  4,   1, -1, -1,  0,  0,  0,  0],
  Dance: [5,  6,  3,   0, -1, -3, -1,  3,  5,  4],
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([
    { name: "QUINNAMP INTRO" },
    { name: "DUSK 2034" },
    { name: "A NEW BEGINNING" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [skin, setSkin] = useState<Skin>("mono");
  const [eqEnabled, setEqEnabled] = useState(true);
  const [eqBands, setEqBands] = useState<number[]>([0,0,0,0,0,0,0,0,0,0]);
  const [preamp, setPreamp] = useState(0);
  const [playlistOpen, setPlaylistOpen] = useState(true);
  const [eqOpen, setEqOpen] = useState(true);
  const [skinsOpen, setSkinsOpen] = useState(true);

  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef  = useRef<AudioContext | null>(null);
  const gainRef      = useRef<GainNode | null>(null);
  const filtersRef   = useRef<BiquadFilterNode[]>([]);
  const preampRef    = useRef<GainNode | null>(null);
  const analyserRef  = useRef<AnalyserNode | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const animRef      = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const source = ctx.createMediaElementSource(audio);
    const preampGain = ctx.createGain();
    preampRef.current = preampGain;
    source.connect(preampGain);
    const filters = EQ_BANDS.map((freq, i) => {
      const f = ctx.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = freq;
      f.Q.value = 1.4;
      f.gain.value = eqBands[i];
      return f;
    });
    filtersRef.current = filters;
    let prev: AudioNode = preampGain;
    filters.forEach((f) => { prev.connect(f); prev = f; });
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;
    prev.connect(analyser);
    const gain = ctx.createGain();
    gain.gain.value = volume / 100;
    gainRef.current = gain;
    analyser.connect(gain);
    gain.connect(ctx.destination);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barCount = 16;
    const barW = Math.floor(canvas.width / barCount) - 2;
    for (let i = 0; i < barCount; i++) {
      const val = data[i] ?? 0;
      const h = Math.max(3, (val / 255) * canvas.height);
      ctx.fillStyle = val > 180 ? "var(--amp-accent)" : "rgba(255,255,255,0.15)";
      ctx.fillRect(i * (barW + 2), canvas.height - h, barW, h);
    }
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (isPlaying) animRef.current = requestAnimationFrame(draw);
    else cancelAnimationFrame(animRef.current);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, draw]);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume / 100;
    if (audioRef.current && !audioCtxRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    filtersRef.current.forEach((f, i) => { f.gain.value = eqEnabled ? eqBands[i] : 0; });
  }, [eqBands, eqEnabled]);

  useEffect(() => {
    if (preampRef.current) preampRef.current.gain.value = eqEnabled ? Math.pow(10, preamp / 20) : 1;
  }, [preamp, eqEnabled]);

  const playTrack = useCallback((index: number) => {
    const track = tracks[index];
    const audio = audioRef.current;
    if (!track || !audio) return;
    if (track.file) audio.src = URL.createObjectURL(track.file);
    else if (track.url) audio.src = track.url;
    else return;
    initAudioContext();
    if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
    setCurrentIndex(index);
    audio.play();
    setIsPlaying(true);
  }, [tracks, initAudioContext]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.src) {
      initAudioContext();
      if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
      audio.play();
      setIsPlaying(true);
    } else if (tracks.length > 0) {
      playTrack(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  const handlePause  = () => { audioRef.current?.pause(); setIsPlaying(false); };
  const handleStop   = () => {
    const a = audioRef.current;
    if (a) { a.pause(); a.currentTime = 0; }
    setIsPlaying(false); setElapsed(0);
  };
  const handlePrev   = () => { if (currentIndex > 0) playTrack(currentIndex - 1); };
  const handleNext   = () => { if (currentIndex < tracks.length - 1) playTrack(currentIndex + 1); };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (a) { setElapsed(a.currentTime); setDuration(a.duration || 0); }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (a && duration) a.currentTime = (Number(e.target.value) / 1000) * duration;
  };

  const handleEnded = () => {
    if (currentIndex < tracks.length - 1) playTrack(currentIndex + 1);
    else setIsPlaying(false);
  };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newTracks: Track[] = Array.from(files).map((f) => ({
      name: f.name.replace(/\.[^.]+$/, "").toUpperCase(),
      file: f,
    }));
    const startIdx = tracks.length;
    setTracks((prev) => [...prev, ...newTracks]);
    if (currentIndex === -1) setTimeout(() => playTrack(startIdx), 50);
  };

  const handleEqBand = (i: number, v: number) =>
    setEqBands((prev) => { const n = [...prev]; n[i] = v; return n; });

  const progressValue = duration ? (elapsed / duration) * 1000 : 0;
  const currentTrack  = currentIndex >= 0 ? tracks[currentIndex] : null;
  const remain        = duration ? duration - elapsed : 0;

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} preload="metadata" />

      {/* Trigger */}
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        title={isOpen ? "Close player" : "Open player"}
      >
        {isOpen ? "✕" : "▶"}
      </button>

      {/* Player stack */}
      <div className={`${styles.stack} ${styles[`skin-${skin}`]} ${isOpen ? styles.stackOpen : ""}`}>

        {/* ── Main player window ── */}
        <div className={styles.window}>
          <div className={`${styles.titlebar} ${styles.titlebarMain}`}>
            <span className={styles.titlebarLabel}>QuinnAmp</span>
            <span className={styles.titlebarGrip} aria-hidden="true" />
            <div className={styles.titlebarBtns}>
              <button className={styles.titlebarBtn} onClick={() => setIsOpen(false)} title="Close">✕</button>
            </div>
          </div>
          <div className={styles.windowBody}>
            {/* Display */}
            <div className={styles.display}>
              <div className={styles.displayLeft}>
                <span className={styles.elapsed}>{fmt(elapsed)}</span>
                {duration > 0 && <span className={styles.remain}>-{fmt(remain)}</span>}
              </div>
              <div className={styles.displayRight}>
                <div className={styles.displayTrack}>
                  <span className={styles.marquee}>{currentTrack?.name ?? "NO TRACK LOADED"}</span>
                </div>
                <div className={styles.displayViz}>
                  <canvas ref={canvasRef} className={styles.vizCanvas} width={160} height={24} />
                </div>
                <div className={styles.displayMeta}>
                  <span>128KBPS</span><span>44KHZ</span><span>STEREO</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <input
              type="range"
              className={styles.progressBar}
              min="0" max="1000" step="1"
              value={Math.round(progressValue)}
              onChange={handleSeek}
            />

            {/* Controls */}
            <div className={styles.controlsRow}>
              <div className={styles.transport}>
                <button className={styles.tBtn} onClick={handlePrev}  title="Previous">&#x23EE;</button>
                <button className={`${styles.tBtn} ${!isPlaying ? styles.tBtnActive : ""}`} onClick={handlePlay}  title="Play">&#x25B6;</button>
                <button className={`${styles.tBtn} ${isPlaying  ? styles.tBtnActive : ""}`} onClick={handlePause} title="Pause">&#x23F8;</button>
                <button className={styles.tBtn} onClick={handleStop}  title="Stop">&#x25A0;</button>
                <button className={styles.tBtn} onClick={handleNext}  title="Next">&#x23ED;</button>
              </div>
              <div className={styles.volRow}>
                <span className={styles.volLabel}>VOL</span>
                <input
                  type="range"
                  className={styles.volBar}
                  min="0" max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Playlist window ── */}
        <div className={styles.window}>
          <div className={`${styles.titlebar} ${styles.titlebarSub}`}>
            <span className={styles.titlebarLabel}>Playlist</span>
            <div className={styles.titlebarBtns}>
              <button className={styles.titlebarBtn} onClick={() => setPlaylistOpen((v) => !v)}>
                {playlistOpen ? "–" : "+"}
              </button>
            </div>
          </div>
          {playlistOpen && (
            <div className={styles.windowBody}>
              {tracks.map((t, i) => (
                <div
                  key={i}
                  className={`${styles.playlistItem} ${i === currentIndex ? styles.playlistItemActive : ""}`}
                  onClick={() => playTrack(i)}
                >
                  <span className={styles.playlistNum}>{String(i + 1).padStart(2, "0")}.</span>
                  <span className={styles.playlistTitle}>{t.name}</span>
                </div>
              ))}
              <button className={styles.addTrack} onClick={() => fileInputRef.current?.click()}>
                + Add audio files
              </button>
              <input ref={fileInputRef} type="file" accept="audio/*" multiple style={{ display: "none" }} onChange={handleAddFiles} />
            </div>
          )}
        </div>

        {/* ── Equalizer window ── */}
        <div className={styles.window}>
          <div className={`${styles.titlebar} ${styles.titlebarSub}`}>
            <span className={styles.titlebarLabel}>Equalizer</span>
            <div className={styles.titlebarBtns}>
              <button className={styles.titlebarBtn} onClick={() => setEqOpen((v) => !v)}>
                {eqOpen ? "–" : "+"}
              </button>
            </div>
          </div>
          {eqOpen && (
            <div className={styles.windowBody}>
              <div className={styles.eqHeader}>
                <button
                  className={`${styles.eqToggle} ${eqEnabled ? styles.eqToggleOn : ""}`}
                  onClick={() => setEqEnabled((v) => !v)}
                >
                  {eqEnabled ? "ON" : "OFF"}
                </button>
                <div className={styles.eqPresets}>
                  {Object.keys(EQ_PRESETS).map((name) => (
                    <button key={name} className={styles.eqPresetBtn} onClick={() => setEqBands(EQ_PRESETS[name])}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.eqBands}>
                <div className={`${styles.eqBand} ${styles.isPreamp}`}>
                  <span className={styles.eqBandDb}>{preamp > 0 ? "+" : ""}{preamp.toFixed(0)}</span>
                  <input type="range" className={styles.eqRange} min="-12" max="12" step="0.5"
                    value={preamp} onChange={(e) => setPreamp(Number(e.target.value))} />
                  <span className={styles.eqBandLabel}>PRE</span>
                </div>
                {EQ_LABELS.map((label, i) => (
                  <div key={label} className={styles.eqBand}>
                    <span className={styles.eqBandDb}>{eqBands[i] > 0 ? "+" : ""}{eqBands[i].toFixed(0)}</span>
                    <input type="range" className={styles.eqRange} min="-12" max="12" step="0.5"
                      value={eqBands[i]} onChange={(e) => handleEqBand(i, Number(e.target.value))} />
                    <span className={styles.eqBandLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Skins window ── */}
        <div className={styles.window}>
          <div className={`${styles.titlebar} ${styles.titlebarSub}`}>
            <span className={styles.titlebarLabel}>Skins</span>
            <div className={styles.titlebarBtns}>
              <button className={styles.titlebarBtn} onClick={() => setSkinsOpen((v) => !v)}>
                {skinsOpen ? "–" : "+"}
              </button>
            </div>
          </div>
          {skinsOpen && (
            <div className={styles.windowBody}>
              <div className={styles.skinsRow}>
                {(["mono", "era90", "pet", "ivan"] as Skin[]).map((s) => (
                  <button
                    key={s}
                    className={`${styles.skinBtn} ${skin === s ? styles.skinBtnActive : ""}`}
                    onClick={() => setSkin(s)}
                  >
                    {s === "mono" ? "Stone" : s === "era90" ? "Night" : s === "pet" ? "Coral" : "Arctic"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
