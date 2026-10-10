"""Synthesize the series' sound effects (original, no samples).

Usage (needs numpy): python scripts/make-sfx.py public/sfx

Pitched sounds are tuned to G minor, the key of the S1E01 background
track, so they sit inside the music. Change ROOT_HZ to retune.
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 44100
ROOT_HZ = 196.0  # G3
rng = np.random.default_rng(7)


def t(seconds):
    return np.arange(int(SR * seconds)) / SR


def note(semitones):
    return ROOT_HZ * 2 ** (semitones / 12)


def env(n, attack=0.004, decay=0.2):
    x = np.arange(n) / SR
    return np.minimum(1, x / attack) * np.exp(-x / decay)


def lowpass(x, cutoff):
    # One-pole low-pass; good enough for shaping noise.
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def bell(freq, seconds=1.4, decay=0.5):
    x = t(seconds)
    partials = [(1, 1.0), (2.0, 0.5), (3.0, 0.25), (4.2, 0.12), (5.4, 0.06)]
    s = sum(a * np.sin(2 * np.pi * freq * r * x) * np.exp(-x * r / decay) for r, a in partials)
    return s * np.minimum(1, x / 0.003)


def pluck(freq, seconds=0.6):
    # Additive plucked tone: exact pitch, brighter partials die out first.
    x = t(seconds)
    return sum(np.sin(2 * np.pi * freq * k * x) * np.exp(-x * (3 + 4 * k)) / k for k in range(1, 7))


def sounds():
    s = {}
    # pop: quick pitch-drop blip for things appearing.
    x = t(0.12)
    f = 900 * np.exp(-x * 18) + 380
    s["pop"] = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(x), 0.002, 0.04)
    # tick: tiny high click for counters and list items.
    x = t(0.04)
    s["tick"] = highpass(rng.normal(0, 1, len(x)), 2500) * env(len(x), 0.0005, 0.006) + 0.4 * np.sin(2 * np.pi * 2400 * x) * env(len(x), 0.0005, 0.01)
    # whoosh: swept band of noise for scene cuts.
    x = t(0.55)
    noise = rng.normal(0, 1, len(x))
    shape = np.sin(np.pi * np.clip(x / 0.55, 0, 1)) ** 2
    sweep = np.concatenate([lowpass(noise[i : i + 2205], 250 + 2200 * (i / len(x))) for i in range(0, len(x), 2205)])[: len(x)]
    s["whoosh"] = highpass(sweep, 150) * shape
    # chime: G-minor bell triad (G, Bb, D), for reveals and verdicts.
    s["chime"] = bell(note(12)) + 0.6 * np.pad(bell(note(15)), (2205, 0))[: int(SR * 1.4)] + 0.5 * np.pad(bell(note(19)), (4410, 0))[: int(SR * 1.4)]
    # ding: single bright bell (D5) for a correct match.
    s["ding"] = bell(note(19), 1.0, 0.35)
    # thud: soft low hit for tower floors landing.
    x = t(0.35)
    f = 110 * np.exp(-x * 9) + 48
    s["thud"] = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(x), 0.002, 0.12) + 0.15 * lowpass(rng.normal(0, 1, len(x)), 800) * env(len(x), 0.001, 0.03)
    # scratch: pencil stroke for crossing things out.
    x = t(0.32)
    grain = lowpass(highpass(rng.normal(0, 1, len(x)), 1200), 5500) * (0.6 + 0.4 * np.sin(2 * np.pi * 38 * x))
    s["scratch"] = grain * np.sin(np.pi * np.clip(x / 0.32, 0, 1)) ** 0.6
    # clink: cup on saucer (inharmonic metal partials).
    x = t(0.3)
    s["clink"] = sum(a * np.sin(2 * np.pi * fr * x) for fr, a in [(2350, 1), (3720, 0.6), (5110, 0.35)]) * env(len(x), 0.0008, 0.07)
    # page: paper flick for cards and the ledger.
    x = t(0.22)
    s["page"] = lowpass(highpass(rng.normal(0, 1, len(x)), 900), 5000) * np.sin(np.pi * np.clip(x / 0.22, 0, 1)) ** 1.5
    # plucks: G-minor notes for digits and steps, low to high.
    for name, semis in [("pluck1", 7), ("pluck2", 10), ("pluck3", 12), ("pluck4", 14), ("pluck5", 15), ("pluck6", 19)]:
        s[name] = pluck(note(semis) * 2, 0.7) * env(int(SR * 0.7), 0.001, 0.35)
    # sparkle: scattered high bells for the brand bloom and the finale.
    out = np.zeros(int(SR * 1.6))
    for k, semis in enumerate([24, 27, 31, 34, 36, 31]):
        b = bell(note(semis), 1.0, 0.25) * (0.7 - 0.08 * k)
        start = int(SR * 0.07 * k)
        out[start : start + len(b)] += b[: len(out) - start]
    s["sparkle"] = out
    # riser: soft swell into the brand mark.
    x = t(1.0)
    s["riser"] = (lowpass(rng.normal(0, 1, len(x)), 2000) * 0.5 + 0.3 * np.sin(2 * np.pi * np.cumsum(note(-12) * (1 + x)) / SR)) * (x / 1.0) ** 2
    return s


def write(path, x, peak=0.8):
    x = x / (np.abs(x).max() + 1e-9) * peak
    fade = min(len(x), int(SR * 0.01))
    x[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


out_dir = Path(sys.argv[1])
out_dir.mkdir(parents=True, exist_ok=True)
for name, x in sounds().items():
    write(out_dir / f"{name}.wav", x)
    print(f"{name}.wav  {len(x) / SR:.2f}s")
