import Knob from './Knob';
import '../../styles/synth.css';

function EnvelopePanel({ attack, decay, sustain, release, onChange }) {
  const attackConv = attack / 2 * 100;
  const decayConv = decay / 2 * 100;
  const sustainConv = sustain * 100;
  const releaseConv = release / 4 * 100;

  const width = 120;
  const height = 30;
  const padding = 4;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const totalDuration = attackConv + decayConv + 30 + releaseConv;
  const attackX = padding + (attackConv / totalDuration) * graphWidth;
  const decayX = attackX + (decayConv / totalDuration) * graphWidth;
  const sustainX = decayX + (30 / totalDuration) * graphWidth;
  const releaseX = sustainX + (releaseConv / totalDuration) * graphWidth;

  const attackY = padding;
  const decayY = padding + (1 - sustainConv / 100) * graphHeight;
  const sustainY = decayY;
  const releaseY = padding + graphHeight;

  const pathData = `M ${padding} ${padding + graphHeight} L ${attackX} ${attackY} L ${decayX} ${decayY} L ${sustainX} ${sustainY} L ${releaseX} ${releaseY}`;

  return (
    <div className="panel">
      <h3 className="title">ENVELOPE</h3>
      <svg className="adsrVisual" width={width} height={height}>
        <path d={pathData} stroke="#00ff00" strokeWidth="1.5" fill="none" />
      </svg>
      <div className="adsrKnobs">
        <Knob label="ATTACK" min={0} max={100} value={attackConv} onChange={v => onChange("attack",  v / 100 * 2)} />
        <Knob label="DECAY" min={0} max={100} value={decayConv} onChange={v => onChange("decay",   v / 100 * 2)} />
        <Knob label="SUSTAIN" min={0} max={100} value={sustainConv} onChange={v => onChange("sustain", v / 100)} />
        <Knob label="RELEASE" min={0} max={100} value={releaseConv} onChange={v => onChange("release", v / 100 * 4)} />
      </div>
    </div>
  );
}

export default EnvelopePanel