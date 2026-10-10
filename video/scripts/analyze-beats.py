"""Measure a music track's beat grid for cut-to-beat (卡点) editing.

Usage (needs librosa: `pip install librosa soundfile`):
    python scripts/analyze-beats.py public/music/bgm.m4a

Prints the tempo, the time of the first beat, which beat in each group of
four starts a bar, and loudness every 4 seconds (to find the intro, quiet
breaks, and the outro). Copy the results into src/<episode>/music.ts.
"""
import sys

import librosa
import numpy as np

path = sys.argv[1]
y, sr = librosa.load(path, sr=22050, mono=True)
onset = librosa.onset.onset_strength(y=y, sr=sr)
_, beats = librosa.beat.beat_track(onset_envelope=onset, sr=sr, units="frames")
times = librosa.frames_to_time(beats, sr=sr)

# Fit a constant-tempo grid; residuals show whether the tempo drifts.
k = np.arange(len(times))
period, first = np.polyfit(k, times, 1)
residual = times - (first + period * k)
print(f"duration   {len(y) / sr:.2f} s")
print(f"tempo      {60 / period:.3f} BPM (beat {period:.5f} s)")
print(f"first beat {first:.4f} s; grid error max {abs(residual).max() * 1000:.1f} ms")

# The bar starts on the beat phase with the strongest low-frequency onsets.
spec = np.abs(librosa.stft(y))
low = librosa.onset.onset_strength(S=librosa.amplitude_to_db(spec[:40]), sr=sr)[beats]
phase = int(np.argmax([low[p::4].mean() for p in range(4)]))
print(f"bars start on beat phase {phase} (first bar at {first + phase * period:.4f} s)")

rms = librosa.feature.rms(y=y)[0]
rt = librosa.times_like(rms, sr=sr)
levels = [rms[(rt >= t) & (rt < t + 4)].mean() for t in np.arange(0, len(y) / sr, 4)]
print("loudness per 4 s:", " ".join(f"{v:.2f}" for v in levels))
