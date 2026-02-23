import { useEffect, useRef } from 'react';

const DREAMLAND_AUDIO_SRC = "/Kirby's Pixel Meadow Picnic.wav";

function safelyPlay(audio: HTMLAudioElement) {
  try {
    const playResult = audio.play();

    if (playResult && typeof playResult.catch === 'function') {
      playResult.catch(() => undefined);
    }
  } catch {
    // Browsers and test environments may block autoplay.
  }
}

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (import.meta.env.MODE === 'test') {
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.35;

    const startPlayback = () => {
      safelyPlay(audio);
    };

    // Try immediately, then again on first interaction for autoplay-restricted browsers.
    startPlayback();
    window.addEventListener('pointerdown', startPlayback, { once: true });
    window.addEventListener('keydown', startPlayback, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startPlayback);
      window.removeEventListener('keydown', startPlayback);
    };
  }, []);

  return <audio ref={audioRef} src={DREAMLAND_AUDIO_SRC} preload="auto" aria-hidden="true" />;
}
