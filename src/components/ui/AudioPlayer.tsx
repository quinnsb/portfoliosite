"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";

type Track = {
  title: string;
  artist: string;
  src: string;
};

const TRACKS: Track[] = [
  {
    title: "Blame It on the Boogie",
    artist: "The Jacksons",
    src: "/audio/the-jacksons-blame-it-on-the-boogie.mp3",
  },
  {
    title: "Tokyo Night",
    artist: "Vulfmon, Jacob Jeffries & Evangeline",
    src: "/audio/tokyo-night.mp3",
  },
  {
    title: "Euphoria Spring Fling",
    artist: "Klickaud",
    src: "/audio/euphoria-spring-fling-2016-mix.mp3",
  },
  {
    title: "Mister Magic",
    artist: "Grover Washington, Jr.",
    src: "/audio/grover-washington-jr-mister-magic.mp3",
  },
  {
    title: "I'd Like To",
    artist: "Corinne Bailey Rae",
    src: "/audio/corinne-bailey-rae-id-like-to.mp3",
  },
  {
    title: "What a Fool Believes",
    artist: "The Doobie Brothers",
    src: "/audio/the-doobie-brothers-what-a-fool-believes.mp3",
  },
  {
    title: "Brasilian Skies",
    artist: "Playlist",
    src: "/audio/brasilian-skies.mp3",
  },
  {
    title: "Worth It.",
    artist: "RAYE",
    src: "/audio/raye-worth-it.mp3",
  },
];

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(72);
  const [shuffle, setShuffle] = useState(true);

  const currentTrack = TRACKS[currentIndex];
  const progress = duration ? (elapsed / duration) * 100 : 0;

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * TRACKS.length));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;
    audio.play().catch(() => setIsPlaying(false));
  }, [currentIndex, isPlaying]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const chooseTrack = (index: number) => {
    if (index === currentIndex) {
      play();
      return;
    }
    setCurrentIndex(index);
    setElapsed(0);
    setIsPlaying(true);
  };

  const getRandomIndex = () => {
    if (TRACKS.length < 2) return 0;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * TRACKS.length);
    }
    return nextIndex;
  };

  const previous = () => {
    setCurrentIndex((index) => (shuffle ? getRandomIndex() : index === 0 ? TRACKS.length - 1 : index - 1));
    setElapsed(0);
    setIsPlaying(true);
  };

  const next = () => {
    setCurrentIndex((index) => (shuffle ? getRandomIndex() : index === TRACKS.length - 1 ? 0 : index + 1));
    setElapsed(0);
    setIsPlaying(true);
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (!audio) return;
    audio.currentTime = nextTime;
    setElapsed(nextTime);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onEnded={next}
      />

      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((value) => !value)}
        type="button"
        aria-label={isOpen ? "Close music player" : "Open music player"}
      >
        {isOpen ? "x" : <span />}
      </button>

      <section className={`${styles.walkman} ${isOpen ? styles.walkmanOpen : ""}`} aria-label="Music player">
        <div className={styles.topButtons} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.cassette}>
          <div className={styles.brandMark}>QB</div>
          <div className={styles.label}>
            <span>Now playing</span>
            <strong>{formatTime(elapsed)}</strong>
          </div>
          <div className={styles.reels} aria-hidden="true">
            <span className={isPlaying ? styles.reelSpin : ""} />
            <span className={isPlaying ? styles.reelSpin : ""} />
          </div>
          <div className={styles.tapeStripe} aria-hidden="true" />
        </div>

        <div className={styles.nowPlaying}>
          <strong>{currentTrack.title}</strong>
          <span>{currentTrack.artist}</span>
        </div>

        <input
          className={styles.progress}
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={elapsed}
          onChange={seek}
          aria-label="Track progress"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />

        <div className={styles.timeRow}>
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={previous} aria-label="Previous track">
            ←
          </button>
          <button type="button" className={styles.playButton} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "pause" : "play"}
          </button>
          <button type="button" onClick={next} aria-label="Next track">
            →
          </button>
          <button
            type="button"
            className={`${styles.shuffleButton} ${shuffle ? styles.shuffleActive : ""}`}
            onClick={() => setShuffle((value) => !value)}
            aria-pressed={shuffle}
            aria-label="Shuffle"
          >
            shuffle
          </button>
        </div>

        <div className={styles.volumeRow}>
          <span>vol</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Volume"
          />
        </div>

        <div className={styles.trackList}>
          {TRACKS.map((track, index) => (
            <button
              type="button"
              key={track.src}
              className={index === currentIndex ? styles.activeTrack : ""}
              onClick={() => chooseTrack(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{track.title}</strong>
              <em>{track.artist}</em>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
