import Knob from './Knob';
import '../../styles/synth.css';

function OscillatorPanel({ title, type, volume, octave, detune, onTypeChange, onVolumeChange, onDetuneChange, onOctaveChange }) {
  const OSC_TYPES = ["sawtooth", "sine", "square", "triangle"];
  const cycleType = () => {
    const next = OSC_TYPES[(OSC_TYPES.indexOf(type) + 1) % OSC_TYPES.length];
    onTypeChange(next);
  };

  const knobToVolume = (v) => v === 0 ? -Infinity : (v / 100) * 40 - 40;
  const volumeToKnob = (db) => db === -Infinity ? 0 : (db + 40) / 40 * 100;

  return (
    <div className="panel">
      <h3 className="title">{title}</h3>
      <button className="typeButton" onClick={cycleType}>
        {type.toUpperCase()}
      </button>
      <Knob label="VOLUME" min={0} max={100} value={volumeToKnob(volume)} onChange={v => onVolumeChange(knobToVolume(v))} />
      <Knob label="OCTAVE" min={-2} max={2} value={octave} onChange={v => onOctaveChange(Math.round(v))} />
      <Knob label="DETUNE" min={-1200} max={1200} value={detune} onChange={onDetuneChange}  />
    </div>
  );
}

export default OscillatorPanel