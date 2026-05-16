import Knob from './Knob';
import '../../styles/synth.css';

function FilterPanel({ cutoff, resonance, onCutoffChange, onResonanceChange }) {
  return (
    <div className="panel">
      <h3 className="title">FILTER</h3>
      <div className="knobs">
        <Knob label="CUTOFF" min={20} max={20000} value={cutoff} onChange={onCutoffChange} />
        <Knob label="RESONANCE" min={0} max={20} value={resonance} onChange={onResonanceChange} />
      </div>
    </div>
  );
}

export default FilterPanel