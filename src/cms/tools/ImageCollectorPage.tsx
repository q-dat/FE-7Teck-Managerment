import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'react-daisyui';

type ImageItem = {
  id: string;
  url: string;
  selected: boolean;
};

const STORAGE_KEY = 'image_crawler_url';

const ImageCollectorPage: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setValue(saved);

    inputRef.current?.focus();
  }, []);

  const isInputFocused = () => {
    const el = document.activeElement;
    if (!el) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  };

  const fetchImagesFromProduct = async (url: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, url);

      const res = await fetch(
        `${import.meta.env.VITE_API_PORT}/api/crawl-product-images?url=${encodeURIComponent(url)}`
      );

      const data = await res.json();

      if (!data?.images) return;

      const items: ImageItem[] = data.images.map((img: string) => ({
        id: crypto.randomUUID(),
        url: img,
        selected: true
      }));

      setImages(items);

      setTimeout(() => {
        listRef.current?.scrollTo({
          top: 0
        });
      }, 50);
    } catch {
      console.error('crawl failed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) return;

    fetchImagesFromProduct(value.trim());
  };

  const toggleSelect = (id: string) => {
    setImages(prev => prev.map(img => (img.id === id ? { ...img, selected: !img.selected } : img)));
  };

  const removeItem = (id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const downloadImage = async (url: string, index: number) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `image-${index + 1}.jpg`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(objectUrl);
    } catch {
      console.error('download failed');
    }
  };

  const downloadAll = useCallback(async () => {
    const selected = images.filter(i => i.selected);

    for (let i = 0; i < selected.length; i++) {
      await downloadImage(selected[i].url, i);
    }
  }, [images]);

  const selectedCount = images.filter(i => i.selected).length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        return;
      }

      if (isInputFocused()) return;

      if (e.key.toLowerCase() === 's') {
        downloadAll();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [downloadAll]);

  return (
    <div className="flex h-screen flex-col gap-4 bg-white p-4 text-black dark:bg-gray-950 dark:text-white">
      {/* INPUT */}
      <div className="flex gap-2">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            ref={inputRef}
            value={value}
            placeholder="Paste product URL then Enter"
            className="w-full border border-gray-300 bg-white text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            onChange={e => setValue(e.target.value)}
          />

          <Button type="submit" className="btn btn-primary text-white">
            Crawl
          </Button>
        </form>

        <Button className="btn btn-success text-white" onClick={downloadAll}>
          Download
        </Button>
      </div>

      {/* STATS */}
      <div className="flex items-center justify-between text-sm">
        <div>
          Total images: <b>{images.length}</b>
        </div>

        <div>
          Selected: <b>{selectedCount}</b>
        </div>
      </div>

      {/* GRID */}
      <div ref={listRef} className="grid grid-cols-2 gap-3 overflow-auto xl:grid-cols-5">
        {images.map((img, index) => (
          <div
            key={img.id}
            onClick={() => toggleSelect(img.id)}
            className={`group relative cursor-pointer overflow-hidden rounded-xl border transition ${
              img.selected ? 'border-green-400' : 'border-red-400 opacity-50'
            }`}
          >
            {/* IMAGE */}
            <img src={img.url} className="aspect-square w-full bg-black/5 object-contain" />

            {/* BIG CHECKBOX */}
            <div className="absolute left-2 top-2">
              <input
                type="checkbox"
                checked={img.selected}
                onChange={() => toggleSelect(img.id)}
                className="h-6 w-6 cursor-pointer"
              />
            </div>

            {/* ACTION BAR */}
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 bg-black/70 p-1 opacity-0 transition group-hover:opacity-100">
              <Button
                size="xs"
                className="btn btn-info text-white"
                onClick={e => {
                  e.stopPropagation();
                  downloadImage(img.url, index);
                }}
              >
                Download
              </Button>

              <Button
                size="xs"
                className="btn btn-error text-white"
                onClick={e => {
                  e.stopPropagation();
                  removeItem(img.id);
                }}
              >
                Remove
              </Button>
            </div>

            {/* URL */}
            <div className="truncate bg-black/50 p-1 text-[10px] text-white">{img.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollectorPage;
