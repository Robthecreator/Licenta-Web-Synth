import Knob from './Knob';
import '../../styles/synth.css';

function NoisePanel({ type, volume, onTypeChange, onVolumeChange }) {
  const NOISE_TYPES = ["white", "pink", "brown"];
  const cycleType = () => {
    const next = NOISE_TYPES[(NOISE_TYPES.indexOf(type) + 1) % NOISE_TYPES.length];
    onTypeChange(next);
  };

  const knobToVolume = (v) => v === 0 ? -Infinity : (v / 100) * 40 - 40;
  const volumeToKnob = (db) => db === -Infinity ? 0 : (db + 40) / 40 * 100;

  return (
    <div className="panel">
      <h3 className="title">NOISE</h3>
      <button className="typeButton" onClick={cycleType}>
        {type.toUpperCase()}
      </button>
      <Knob label="VOLUME" min={0} max={100} value={volumeToKnob(volume)} onChange={v => onVolumeChange(knobToVolume(v))} />
    </div>
  );
}

export default NoisePanel