import { useState } from "react";
import { useSynth } from "../../hooks/useSynth.js";
import OscillatorPanel from "./OscillatorPanel";
import NoisePanel from "./NoisePanel";
import EffectsPanel from "./EffectsPanel";
import EnvelopePanel from "./EnvelopePanel";
import FilterPanel from "./FilterPanel";
import Keyboard from "./Keyboard";
import "../../styles/synth.css";

function Synth() {
    const {
        noteOn, noteOff, pressedNotes, setOscType, setOscVolume, setOscDetune, setOsc2Type, setOsc2Volume, setOsc2Detune,
        setNoiseType, setNoiseVolume, setReverb, setChorus, setEcho, setEchoSpeed, setEnvelope, setFilterCutoff, setFilterResonance,
        setOscOctave, setOsc2Octave,
    } = useSynth();

    const [params, setParams] = useState({
        oscType: "sawtooth", oscVolume: -20, oscDetune: 0, oscOctave: 0,
        osc2Type: "sine", osc2Volume: -30, osc2Detune: 0, osc2Octave: 0,
        noiseType: "white", noiseVolume: -40,
        reverb: 0, chorus: 0, echo: 0, echoSpeed: 0,
        attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.6,
        cutoff: 2000, resonance: 1,
    });

    const set = (key, value, applyFn) => {
        setParams(p => ({ ...p, [key]: value }));
        applyFn(value);
    };

    return (
        <div className="chassis">
            <div className="topRow">
                <OscillatorPanel
                    title="OSC1"
                    type={params.oscType}
                    volume={params.oscVolume}
                    octave={params.oscOctave}
                    detune={params.oscDetune}
                    onTypeChange={v => set("oscType", v, setOscType)}
                    onVolumeChange={v => set("oscVolume", v, setOscVolume)}
                    onOctaveChange={v => set("oscOctave", v, setOscOctave)}
                    onDetuneChange={v => set("oscDetune", v, setOscDetune)}
                />
                <OscillatorPanel
                    title="OSC2"
                    type={params.osc2Type}
                    volume={params.osc2Volume}
                    detune={params.osc2Detune}
                    octave={params.osc2Octave}
                    onTypeChange={v => set("osc2Type", v, setOsc2Type)}
                    onVolumeChange={v => set("osc2Volume", v, setOsc2Volume)}
                    onOctaveChange={v => set("osc2Octave", v, setOsc2Octave)}
                    onDetuneChange={v => set("osc2Detune", v, setOsc2Detune)}
                />
                <NoisePanel
                    type={params.noiseType}
                    volume={params.noiseVolume}
                    onTypeChange={v => set("noiseType", v, setNoiseType)}
                    onVolumeChange={v => set("noiseVolume", v, setNoiseVolume)}
                />
                <EffectsPanel
                    reverb={params.reverb}
                    chorus={params.chorus}
                    echo={params.echo}
                    echoSpeed={params.echoSpeed}
                    onReverbChange={v => set("reverb", v, setReverb)}
                    onChorusChange={v => set("chorus", v, setChorus)}
                    onEchoChange={v => set("echo", v, setEcho)}
                    onEchoSpeedChange={v => set("echoSpeed", v, setEchoSpeed)}
                />
            </div>
            <div className="bottomRow">
                <EnvelopePanel
                    attack={params.attack}
                    decay={params.decay}
                    sustain={params.sustain}
                    release={params.release}
                    onChange={(param, value) => set(param, value, v => setEnvelope(param, v))}
                />
                <FilterPanel
                    cutoff={params.cutoff}
                    resonance={params.resonance}
                    onCutoffChange={v => set("cutoff", v, setFilterCutoff)}
                    onResonanceChange={v => set("resonance", v, setFilterResonance)}
                />
            </div>
            <Keyboard onNoteOn={noteOn} onNoteOff={noteOff} pressedNotes={pressedNotes} />
        </div>
    );
}

export default Synth