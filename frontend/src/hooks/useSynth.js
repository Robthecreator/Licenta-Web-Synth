import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";

export function useSynth() {
  const [pressedNotes, setPressedNotes] = useState(new Set());

  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const chorusRef = useRef(null);
  const echoRef = useRef(null);
  const filterRef = useRef(null);
  const noiseRef = useRef(null);
  const synth2Ref = useRef(null);

  useEffect(() => {
    filterRef.current = new Tone.Filter(2000, "lowpass");
    reverbRef.current = new Tone.Reverb({ decay: 2, wet: 0 });
    chorusRef.current = new Tone.Chorus({ wet: 0 }).start();
    echoRef.current = new Tone.FeedbackDelay({ wet: 0 });

    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.6 },
    });

    synth2Ref.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.6 },
    });

    noiseRef.current = new Tone.Noise("white");
    noiseRef.current.volume.value = -Infinity;
    noiseRef.current.start();

    synthRef.current.connect(filterRef.current);
    synth2Ref.current.connect(filterRef.current);
    noiseRef.current.connect(filterRef.current);
    filterRef.current.connect(reverbRef.current);
    reverbRef.current.connect(chorusRef.current);
    chorusRef.current.connect(echoRef.current);
    echoRef.current.toDestination();

    const KEY_NOTE_MAP = {
      'z': 'C4',  's': 'Db4', 'x': 'D4',  'd': 'Eb4',
      'c': 'E4',  'v': 'F4',  'g': 'Gb4', 'b': 'G4',
      'h': 'Ab4', 'n': 'A4',  'j': 'Bb4', 'm': 'B4',
      ',': 'C5',  'l': 'Db5', '.': 'D5',  ';': 'Eb5',
      '/': 'E5', 
      'q': 'F5',  '2': 'Gb5', 'w': 'G5',  '3': 'Ab5',
      'e': 'A5',  '4': 'Bb5',  'r': 'B5', 't': 'C6',
    };

    const keysHeld = new Set();

    const onKeyDown = (e) => {
      const note = KEY_NOTE_MAP[e.key];
      if (note && !keysHeld.has(e.key)) {
        keysHeld.add(e.key);
        noteOn(note);
      }
    };

    const onKeyUp = (e) => {
      const note = KEY_NOTE_MAP[e.key];
      if (note) {
        keysHeld.delete(e.key);
        noteOff(note);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      synthRef.current?.dispose();
      synth2Ref.current?.dispose();
      noiseRef.current?.dispose();
      filterRef.current?.dispose();
      reverbRef.current?.dispose();
      chorusRef.current?.dispose();
      echoRef.current?.dispose();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const noteOn = (note) => {
    Tone.start();
    synthRef.current?.triggerAttack(note);
    synth2Ref.current?.triggerAttack(note);
    setPressedNotes(prev => new Set(prev).add(note));
  };

  const noteOff = (note) => {
    synthRef.current?.triggerRelease(note);
    synth2Ref.current?.triggerRelease(note);
    setPressedNotes(prev => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  };

  const setOscType = (type) => {
    synthRef.current?.set({ oscillator: { type } });
  };

  const setOscDetune = (value) => {
    synthRef.current?.set({ detune: value });
  };

  const setOscVolume = (value) => {
    if (synthRef.current) synthRef.current.volume.value = value;
  };

  const setOsc2Type = (type) => {
    synth2Ref.current?.set({ oscillator: { type } });
  }

  const setOsc2Detune = (value) => {
    synth2Ref.current?.set({ detune: value });
  }

  const setOsc2Volume = (value) => { 
    if (synth2Ref.current) synth2Ref.current.volume.value = value; 
  };

  const setNoiseType = (type) => {
    if (noiseRef.current) noiseRef.current.type = type;
  };

  const setNoiseVolume = (value) => {
    if (noiseRef.current) noiseRef.current.volume.value = value;
  };

  const setReverb = (value) => {
    if (reverbRef.current) reverbRef.current.wet.value = value;
  };

  const setChorus = (value) => {
    if (chorusRef.current) chorusRef.current.wet.value = value;
  };

  const setEcho = (value) => {
    if (echoRef.current) echoRef.current.wet.value = value;
  };

  const setEchoSpeed = (value) => {
    if (echoRef.current) echoRef.current.delayTime.value = value;
  };

  const setEnvelope = (param, value) => {
    synthRef.current?.set({ envelope: { [param]: value } });
  };

  const setFilterCutoff = (value) => {
    if (filterRef.current) filterRef.current.frequency.value = value;
  };

  const setFilterResonance = (value) => {
    if (filterRef.current) filterRef.current.Q.value = value;
  };

  const setOscOctave = (value) => {
    synthRef.current?.set({detune: value * 1200});
  };

  const setOsc2Octave = (value) => {
    synth2Ref.current?.set({detune: value * 1200});
  };

  return {
    noteOn, noteOff, pressedNotes,
    setOscType, setOscDetune, setOscVolume,
    setOsc2Type, setOsc2Detune, setOsc2Volume,
    setNoiseType, setNoiseVolume,
    setReverb, setChorus, setEcho, setEchoSpeed,
    setEnvelope,
    setFilterCutoff, setFilterResonance,
    setOscOctave, setOsc2Octave,
  };
}