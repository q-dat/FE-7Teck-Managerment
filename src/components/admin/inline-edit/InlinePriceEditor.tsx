import { useState } from 'react';
import { Input } from 'react-daisyui';
import { FaSave } from 'react-icons/fa';

interface InlinePriceEditorProps<T> {
  prodId: string;
  field: keyof T;
  value: T[keyof T] | null | undefined;
  type?: 'text' | 'number';
  formatter?: (v: T[keyof T]) => string;
  onSubmit: (prodId: string, field: keyof T, value: T[keyof T]) => Promise<void>;
}

export function InlinePriceEditor<T>({
  prodId,
  field,
  value,
  type = 'text',
  formatter,
  onSubmit
}: InlinePriceEditorProps<T>) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState<T[keyof T] | ''>(value ?? '');
  const [pending, setPending] = useState(false);

  const changed = localValue !== value;

  const handleSave = async () => {
    try {
      setPending(true);
      await onSubmit(prodId, field, localValue as T[keyof T]);
      setEditing(false);
    } finally {
      setPending(false);
    }
  };

  if (editing) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Input
          size="sm"
          type={type}
          autoFocus
          value={String(localValue)}
          className="w-[100px] rounded border bg-transparent p-2 focus:outline-none"
          onChange={e => {
            const val = type === 'number' ? Number(e.target.value) : e.target.value;
            setLocalValue(val as T[keyof T]);
          }}
        />

        {changed && (
          <button
            color="primary"
            onClick={handleSave}
            disabled={pending}
            className="rounded-none bg-transparent font-light text-green-600"
          >
            <FaSave size={20} />
          </button>
        )}
      </div>
    );
  }

  // Không phải editing
  const displayValue =
    value === null || value === undefined || (typeof value === 'number' && value === 0)
      ? 'Chưa giảm'
      : formatter
        ? formatter(value)
        : String(value);

  return (
    <span
      className="inline-block w-[100px] rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500"
      onClick={() => setEditing(true)}
    >
      {displayValue}
    </span>
  );
}
