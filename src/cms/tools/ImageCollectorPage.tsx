import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'react-daisyui';
import { BsDownload } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import LabelForm from '../../components/adminPage/LabelForm';
import NavbarAdminMobile from '../../components/adminPage/responsiveUI/mobile/NavbarAdmin.mobile';

type ImageItem = {
  id: string;
  url: string;
  selected: boolean;
};

const STORAGE_KEY = 'image_crawler_url';
const DOMAIN_FILTER_KEY = 'image_domain_filter';
const inputClass =
  'w-full rounded border border-gray-300 bg-white p-2 text-xs text-black focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white';

const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
};

const matchFilter = (url: string, filter: string): boolean => {
  if (!filter) return true;

  try {
    const parsed = new URL(url);
    const full = `${parsed.hostname}${parsed.pathname}`;

    return full.toLowerCase().includes(filter.toLowerCase());
  } catch {
    return false;
  }
};

const btnClass = 'bg-white text-primary hover:text-white hover:bg-primary ';

const ImageCollectorPage: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [value, setValue] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [domainMap, setDomainMap] = useState<Record<string, number>>({});

  const urlInputRef = useRef<HTMLInputElement>(null);
  const domainInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem(STORAGE_KEY);
    const savedFilter = localStorage.getItem(DOMAIN_FILTER_KEY);

    if (savedUrl) setValue(savedUrl);
    if (savedFilter) setDomainFilter(savedFilter);

    urlInputRef.current?.focus();
  }, []);

  const isInputFocused = () => {
    const el = document.activeElement;
    if (!el) return false;

    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  };

  const fetchImagesFromProduct = async (url: string) => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_PORT}/api/crawl-product-images?url=${encodeURIComponent(url)}`;

      localStorage.setItem(STORAGE_KEY, url);

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data?.images) return;

      const items: ImageItem[] = data.images.map((img: string) => ({
        id: crypto.randomUUID(),
        url: img,
        selected: true
      }));

      setImages(items);

      const counter: Record<string, number> = {};

      items.forEach(i => {
        const host = getHostname(i.url);
        counter[host] = (counter[host] || 0) + 1;
      });

      setDomainMap(counter);

      setTimeout(() => {
        listRef.current?.scrollTo({ top: 0 });
      }, 50);
    } catch {
      console.error('crawl failed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = value.trim();
    if (!url) return;

    fetchImagesFromProduct(url);
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

  const filteredImages = images.filter(img => matchFilter(img.url, domainFilter));

  const downloadAll = useCallback(async () => {
    const selected = filteredImages.filter(i => i.selected);

    for (let i = 0; i < selected.length; i++) {
      await downloadImage(selected[i].url, i);
    }
  }, [filteredImages]);

  const handleDomainFilterChange = (v: string) => {
    setDomainFilter(v);

    if (v) localStorage.setItem(DOMAIN_FILTER_KEY, v);
    else localStorage.removeItem(DOMAIN_FILTER_KEY);
  };

  const selectedCount = filteredImages.filter(i => i.selected).length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'escape') {
        urlInputRef.current?.blur();
        domainInputRef.current?.blur();
        return;
      }

      if (key === 'f') {
        e.preventDefault();
        window.scrollTo({ top: 0 });
        urlInputRef.current?.focus();
        urlInputRef.current?.select();
        return;
      }

      if (key === 'g') {
        e.preventDefault();
        window.scrollTo({ top: 0 });
        domainInputRef.current?.focus();
        domainInputRef.current?.select();
        return;
      }

      if (isInputFocused()) return;

      if (key === 's') {
        downloadAll();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [downloadAll]);

  return (
    <div className="flex h-screen flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
      <NavbarAdminMobile Title_NavbarAdmin="Image Collector Page" />

      <div className="border-b p-4 dark:border-gray-800">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3">
          {/* HOTKEY HELP */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="rounded border px-2 py-1">F - Focus URL</span>
            <span className="rounded border px-2 py-1">G - Focus Domain</span>
            <span className="rounded border px-2 py-1">S - Download</span>
            <span className="rounded border px-2 py-1">Esc - Blur</span>
          </div>
          {/*  */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="w-full">
              <LabelForm title="Product URL" />
              <Input
                size="sm"
                ref={urlInputRef}
                value={value}
                placeholder="Paste product URL then Enter"
                className={inputClass}
                onChange={e => setValue(e.target.value)}
              />
            </div>
            <div className="w-full">
              <LabelForm title="Domain/Path" />
              <Input
                size="sm"
                ref={domainInputRef}
                value={domainFilter}
                placeholder="Filter domain or path"
                className={inputClass}
                onChange={e => handleDomainFilterChange(e.target.value)}
              />
            </div>

            <Button size="sm" type="submit" className={btnClass}>
              Crawl
            </Button>

            <Button size="sm" type="button" className={btnClass} onClick={downloadAll}>
              <FaDownload />
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              Total images: <b>{images.length}</b>
            </div>

            <div className="rounded-md border border-dashed border-black bg-primary px-3 py-1 text-sm font-semibold text-white">
              Selected: <b>{selectedCount}</b>
            </div>
          </div>

          {/* DOMAIN CHIPS */}
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(domainMap).map(([domain, count]) => (
              <button
                key={domain}
                onClick={() => handleDomainFilterChange(domain)}
                className={`rounded border px-2 py-1 ${
                  domainFilter === domain ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                }`}
              >
                {domain} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto p-2">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => toggleSelect(img.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-xl dark:bg-gray-900 ${
                img.selected ? 'border-green-500' : 'border-red-500 opacity-60'
              }`}
            >
              <div className="break-all border-t bg-primary px-1 py-2 text-xs text-white dark:bg-black">{img.url}</div>
              <div className="h-[200px] w-full">
                <img src={img.url} className="h-full w-full object-contain" />
              </div>

              <div className="absolute bottom-2 right-2">
                <input
                  type="checkbox"
                  checked={img.selected}
                  onChange={() => toggleSelect(img.id)}
                  className="checkbox-success checkbox"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex gap-2 bg-black/70 p-3 opacity-0 transition group-hover:opacity-100">
                <Button
                  size="xs"
                  className={btnClass}
                  onClick={e => {
                    e.stopPropagation();
                    downloadImage(img.url, index);
                  }}
                >
                  <BsDownload size={20} />
                </Button>

                <Button
                  size="xs"
                  className={btnClass}
                  onClick={e => {
                    e.stopPropagation();
                    removeItem(img.id);
                  }}
                >
                  <MdDeleteForever size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCollectorPage;

