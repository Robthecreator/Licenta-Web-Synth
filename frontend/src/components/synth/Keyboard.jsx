import '../../styles/synth.css'

const NOTES = [
  "C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4",
  "C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5",
  "C6"
];

const BLACK = new Set([
  "Db4","Eb4","Gb4","Ab4","Bb4",
  "Db5","Eb5","Gb5","Ab5","Bb5",
]);

const BLACK_KEY_AFTER_WHITE = [
    {note: "Db4", afterIndex: 0},
    {note: "Eb4", afterIndex: 1},
    {note: "Gb4", afterIndex: 3},
    {note: "Ab4", afterIndex: 4},
    {note: "Bb4", afterIndex: 5},
    {note: "Db5", afterIndex: 7},
    {note: "Eb5", afterIndex: 8},
    {note: "Gb5", afterIndex: 10},
    {note: "Ab5", afterIndex: 11},
    {note: "Bb5", afterIndex: 12},
];

const WHITE_KEY_WIDTH = 44;

function Keyboard({ onNoteOn, onNoteOff, pressedNotes }) {
  const whites = NOTES.filter(n => !BLACK.has(n));

  return (
    <div className="keyboard">
      {whites.map((note) => (
        <div key={note} className={pressedNotes.has(note) ? 'key white whitePressed' : 'key white'}
          onMouseDown={() => onNoteOn(note)}
          onMouseUp={() => onNoteOff(note)}
          onMouseLeave={() => onNoteOff(note)}
        />
      ))}

      {BLACK_KEY_AFTER_WHITE.map(({ note, afterIndex }) => (
        <div key={note} className={pressedNotes.has(note) ? 'key black blackPressed' : 'key black'}
          style={{
            left: (afterIndex + 1) * WHITE_KEY_WIDTH - 11,
          }}
          onMouseDown={(e) => { e.stopPropagation(); onNoteOn(note); }}
          onMouseUp={(e) => { e.stopPropagation(); onNoteOff(note); }}
          onMouseLeave={() => onNoteOff(note)}
        />
      ))}
    </div>
  );
}

export default Keyboard