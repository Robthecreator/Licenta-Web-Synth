import Knob from './Knob';
import '../../styles/synth.css';

function EffectsPanel({ reverb, chorus, echo, echoSpeed, onReverbChange, onChorusChange, onEchoChange, onEchoSpeedChange }) {
  return (
    <div className="panel">
      <h3 className="title">EFFECTS</h3>
      <div className="knobsGrid">
        <div className="knobsRow">
          <Knob label="REVERB" min={0} max={100} value={reverb * 100} onChange={v => onReverbChange(v / 100)} />
          <Knob label="CHORUS" min={0} max={100} value={chorus * 100} onChange={v => onChorusChange(v / 100)} />
        </div>
        <div className="knobsRow">
          <Knob label="ECHO" min={0} max={100} value={echo * 100} onChange={v => onEchoChange(v / 100)} />
          <Knob label="ECHO SPEED" min={0} max={100} value={echoSpeed * 100} onChange={v => onEchoSpeedChange(v / 100)} />
        </div>
      </div>
    </div>
  );
}

export default EffectsPanel