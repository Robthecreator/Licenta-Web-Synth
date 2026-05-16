import { Knob as PrimeKnob } from 'primereact/knob'
import '../../styles/synth.css';

function Knob({ label, value, min, max, onChange }) {
  return (
    <div className="wrapper">
      <span className="label">{label}</span>
      <PrimeKnob
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.value)}
        size={48}
        strokeWidth={8}
      />
    </div>
  );
}

export default Knob