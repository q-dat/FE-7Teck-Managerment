import React, { useState } from 'react';
import { Textarea } from 'react-daisyui';
import { FaSave } from 'react-icons/fa';

interface Props {
  prodId: string;
  value: string;
  onSubmit: (prodId: string, newNote: string) => Promise<void>;
}

const InlineNoteEditor: React.FC<Props> = ({ prodId, value, onSubmit }) => {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState<string>(value);
  const [pending, setPending] = useState(false);

  const changed = note !== value;

  const handleSave = async () => {
    try {
      setPending(true);
      await onSubmit(prodId, note);
      setEditing(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {editing ? (
        <>
          <Textarea
            className="h-[50px] w-[80px] text-xs rounded border bg-transparent p-px focus:outline-none"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Điền ghi chú..."
          />

          {changed && (
            <button
              color="primary"
              onClick={handleSave}
              disabled={pending}
              className="rounded-none bg-transparent font-light text-green-600"
            >
              <FaSave size={30} />
            </button>
          )}
        </>
      ) : (
        <mark
          className="line-clamp-3 h-[50px] w-[80px] text-xs cursor-pointer rounded p-0.5 text-start"
          onClick={() => setEditing(true)}
        >
          {value || 'Trống!'}
        </mark>
      )}
    </div>
  );
};

export default InlineNoteEditor;
