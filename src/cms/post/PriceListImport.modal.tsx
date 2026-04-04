'use client';
import React, { useMemo, useState } from 'react';
import { Button, Textarea } from 'react-daisyui';
import axios from 'axios';
import { ICreatePriceListPayload } from '../../types/type/price-list/price-list';
import { useEscClose } from '../../hooks/useEscClose';
import { Toastify } from '../../helper/Toastify';

interface Props {
  open: boolean;
  onClose: () => void;
}

const catalogJsonExample = `
{
  "category": "phoneProducts",
  "price_new": 28000,
  "price_used": 26500,
  "conditions": "",
  "groups": [
    {
      "catalog": "iPhone 15 Series",
      "variants": [
        { "name": "iPhone 15 Pro Max 256G", "price_new": 28000, "price_used": 26500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Pro Max----------- 512G", "price_new": 34000, "price_used": 30000, "condition": "", "storage": "512GB" },
        { "name": "iPhone 15 Pro 128G", "price_new": 23000, "price_used": 21000, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Pro 256G", "price_new": 26000, "price_used": 23000, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Plus 128G", "price_new": 20500, "price_used": 19500, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Plus 256G", "price_new": 23500, "price_used": 20500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 128G", "price_new": 18000, "price_used": 16000, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 256G", "price_new": 20500, "price_used": 18000, "condition": "", "storage": "256GB" }
      ]
    }
 ]}`;

const PriceListImportModal: React.FC<Props> = ({ open, onClose }) => {
  useEscClose(open, onClose);

  const [jsonText, setJsonText] = useState('');
  const [data, setData] = useState<ICreatePriceListPayload | null>(null);
  const [loading, setLoading] = useState(false);

  // parse JSON
  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonText);

      if (!parsed?.category || !Array.isArray(parsed?.groups)) {
        Toastify('Sai format JSON', 500);
        return;
      }

      setData(parsed);
      Toastify('Parse thành công', 200);
    } catch {
      Toastify('JSON không hợp lệ', 500);
    }
  };

  // stats
  const stats = useMemo(() => {
    if (!data) return null;

    const totalVariants = data.groups.reduce((sum, g) => sum + g.variants.length, 0);

    return {
      groups: data.groups.length,
      variants: totalVariants
    };
  }, [data]);

  // import API
  const handleImport = async () => {
    if (!data) return;

    try {
      setLoading(true);

      await axios.post('/api/price-list/import', data);

      Toastify('Import thành công', 200);
      setJsonText('');
      setData(null);
      onClose();
    } catch (err: any) {
      Toastify(err?.response?.data?.message || 'Import thất bại', 500);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="relative flex flex-col overflow-hidden rounded-md border border-gray-300 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        style={{
          width: 'calc(100vw - 10vw)',
          height: 'calc(100vh - 20vh)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-black p-2 text-gray-300">
          <h2 className="text-sm font-semibold">Import Price List JSON</h2>

          <Button size="xs" onClick={onClose}>
            ESC / Đóng
          </Button>
        </div>

        {/* Body */}
        <div className="grid h-full grid-cols-1 gap-2 overflow-hidden p-2 text-black dark:text-white xl:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">Input JSON</p>

            <Textarea
              className="h-full w-full resize-none border border-gray-300 bg-white text-xs text-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Paste JSON here..."
              value={jsonText}
              onChange={e => setJsonText(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              <Button size="xs" onClick={handleParse}>
                Parse
              </Button>

              <Button size="xs" color="primary" onClick={handleImport} disabled={!data || loading}>
                {loading ? 'Importing...' : 'Import'}
              </Button>

              <Button
                size="xs"
                onClick={() => {
                  setJsonText('');
                  setData(null);
                }}
              >
                Clear
              </Button>
            </div>

            {stats && (
              <div className="text-xs opacity-70">
                {stats.groups} catalogs • {stats.variants} variants
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-2 overflow-hidden">
            <pre className="break-all rounded bg-gray-400 p-1 text-[10px] text-black dark:bg-gray-800 dark:text-green-500">
              {catalogJsonExample}
            </pre>
            <p className="text-xs font-semibold">Preview</p>

            <div className="h-full overflow-auto rounded bg-gray-400 p-2 text-[10px] text-black dark:bg-gray-800 dark:text-green-500">
              {data ? (
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <p className="opacity-50">Chưa có dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceListImportModal;
