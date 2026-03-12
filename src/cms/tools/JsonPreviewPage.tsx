import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input } from 'react-daisyui';
import { Toastify } from '../../helper/Toastify';
import { parseImportFormat } from './parseImportFormat';

// MODEL | STORAGE | COLORS | PRICE
type Variant = {
  id: string;
  color: string;
  price: number;
  basePrice: number;
  img: string;
  thumbnail: string[];
  status: string;
  des: string;
  note: string;
};

type Catalog = {
  id: string;
  catalogName: string;
  variants: Variant[];
};

type ProductJson = {
  catalogName: string;
  name: string;
  color: string;
  img: string;
  thumbnail: string[];
  price: number;
  status: string;
  des: string;
  note: string;
};

const STORAGE_KEY = 'catalog_json_storage';
const BACKUP_KEY = 'catalog_json_backup';
const NOTE_KEY = 'price_note_storage';
const btnClass =
  'text-xs font-semibold rounded-md transition-all duration-300 ' +
  'bg-black text-cyan-400 border border-cyan-500/40 ' +
  'hover:bg-cyan-500 hover:text-black ' +
  'shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/40 ' +
  'active:scale-95';

// storage hook
function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [state, setState] as const;
}

// factories
const createVariant = (): Variant => ({
  id: crypto.randomUUID(),
  color: '',
  price: 0,
  basePrice: 0,
  img: '',
  thumbnail: [],
  status: 'New',
  des: '',
  note: ''
});

const createCatalog = (): Catalog => ({
  id: crypto.randomUUID(),
  catalogName: '',
  variants: [createVariant()]
});

// component
const JsonPreviewPage: React.FC = () => {
  const [catalogs, setCatalogs] = useLocalStorageState<Catalog[]>(STORAGE_KEY, []);

  const [activeCatalog, setActiveCatalog] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  const [importText, setImportText] = useState('');
  const [formattedJson, setFormattedJson] = useState<ProductJson[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const previewItemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [priceNote, setPriceNote] = useLocalStorageState<string>(NOTE_KEY, '');
  const [activeRightTab, setActiveRightTab] = useState<'preview' | 'note'>('preview');

  const [searchName, setSearchName] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const catalogRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const catalogsScrollRef = useRef<HTMLDivElement>(null);

  // helpers
  const isInputFocused = () => {
    const el = document.activeElement;
    if (!el) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  };

  // actions
  const addCatalog = useCallback(() => {
    const catalog = createCatalog();

    setCatalogs(p => [...p, catalog]);
    setActiveCatalog(catalog.id);
  }, [setCatalogs]);

  const addVariant = useCallback(() => {
    if (!activeCatalog) return;

    setCatalogs(prev =>
      prev.map(c => (c.id === activeCatalog ? { ...c, variants: [...c.variants, createVariant()] } : c))
    );
  }, [activeCatalog, setCatalogs]);

  const duplicateVariant = useCallback(() => {
    if (!activeCatalog || !activeVariant) return;

    setCatalogs(prev =>
      prev.map(c => {
        if (c.id !== activeCatalog) return c;

        const variant = c.variants.find(v => v.id === activeVariant);
        if (!variant) return c;

        return {
          ...c,
          variants: [...c.variants, { ...variant, id: crypto.randomUUID() }]
        };
      })
    );
  }, [activeCatalog, activeVariant, setCatalogs]);

  const removeCatalog = useCallback(() => {
    if (!activeCatalog) return;

    setCatalogs(prev => prev.filter(c => c.id !== activeCatalog));
    setActiveCatalog(null);
  }, [activeCatalog, setCatalogs]);

  const clearLocal = useCallback(() => {
    const current = localStorage.getItem(STORAGE_KEY);

    if (current) sessionStorage.setItem(BACKUP_KEY, current);

    localStorage.removeItem(STORAGE_KEY);
    setCatalogs([]);
  }, [setCatalogs]);

  const restoreBackup = useCallback(() => {
    const backup = sessionStorage.getItem(BACKUP_KEY);

    if (!backup) return;

    localStorage.setItem(STORAGE_KEY, backup);
    setCatalogs(JSON.parse(backup));
  }, [setCatalogs]);

  // update
  const updateCatalog = (id: string, value: string) => {
    setCatalogs(prev => prev.map(c => (c.id === id ? { ...c, catalogName: value } : c)));
  };

  const updateVariant = (catalogId: string, variantId: string, field: keyof Variant, value: string | number) => {
    setCatalogs(prev =>
      prev.map(c => {
        if (c.id !== catalogId) return c;

        return {
          ...c,
          variants: c.variants.map(v => (v.id === variantId ? { ...v, [field]: value } : v))
        };
      })
    );
  };

  // json output
  const jsonOutput = useMemo<ProductJson[]>(() => {
    return catalogs.flatMap(c =>
      c.variants.map(v => ({
        catalogName: c.catalogName,
        name: c.catalogName,
        color: v.color,
        img: v.img,
        thumbnail: v.thumbnail,
        price: v.price,
        status: v.status,
        des: v.des,
        note: v.note
      }))
    );
  }, [catalogs]);

  const variantIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    let index = 0;

    catalogs.forEach(c => {
      c.variants.forEach(v => {
        map.set(v.id, index);
        index++;
      });
    });

    return map;
  }, [catalogs]);

  //
  useEffect(() => {
    if (!activeVariant) return;

    const index = variantIndexMap.get(activeVariant);

    if (index === undefined) return;

    let frame: number;

    const tryScroll = () => {
      const el = previewItemRefs.current[index];

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        return;
      }

      frame = requestAnimationFrame(tryScroll);
    };

    frame = requestAnimationFrame(tryScroll);

    return () => cancelAnimationFrame(frame);
  }, [activeVariant, variantIndexMap]);

  // import
  const importJson = (text: string) => {
    try {
      const data: ProductJson[] = JSON.parse(text);

      const map = new Map<string, Catalog>();

      data.forEach(item => {
        if (!map.has(item.catalogName)) {
          map.set(item.catalogName, {
            id: crypto.randomUUID(),
            catalogName: item.catalogName,
            variants: []
          });
        }

        const catalog = map.get(item.catalogName)!;

        catalog.variants.push({
          id: crypto.randomUUID(),
          color: item.color,
          price: item.price,
          basePrice: item.price,
          img: item.img,
          thumbnail: item.thumbnail ?? [],
          status: item.status,
          des: item.des,
          note: item.note
        });
      });

      setCatalogs(Array.from(map.values()));
      setFormattedJson([]);
    } catch (err) {
      Toastify('Failed to import JSON. Please check the input format.', 500);
    }
  };

  // format phones json
  const formatPhonesJson = () => {
    try {
      const parsed = JSON.parse(importText);

      if (!parsed.phones || !Array.isArray(parsed.phones)) {
        Toastify('Failed to format JSON. Expected a "phones" array.', 500);
        return;
      }

      const formatted: ProductJson[] = parsed.phones.map((p: any) => ({
        catalogName: p.phone_catalog_id?.name ?? '',
        name: p.phone_catalog_id?.name ?? '',
        color: p.color ?? '',
        img: p.img ?? '',
        thumbnail: p.thumbnail ?? [],
        price: p.price ?? 0,
        status: p.status ?? '',
        des: p.des ?? '',
        note: p.note ?? ''
      }));

      setFormattedJson(formatted);
    } catch {
      Toastify('Failed to format JSON. Please check the input format.', 500);
    }
  };

  const previewJson = useMemo(() => {
    if (formattedJson.length) return formattedJson;
    return jsonOutput;
  }, [formattedJson, jsonOutput]);

  const previewText = useMemo(() => JSON.stringify(previewJson, null, 2), [previewJson]);

  const previewStats = useMemo(() => {
    return {
      products: previewJson.length,
      catalogs: catalogs.length,
      variants: catalogs.reduce((s, c) => s + c.variants.length, 0),
      formatted: formattedJson.length > 0
    };
  }, [previewJson, catalogs, formattedJson]);

  // stats
  const stats = useMemo(() => {
    const catalogCount = catalogs.length;

    const variantCount = catalogs.reduce((sum, c) => sum + c.variants.length, 0);

    return {
      catalogCount,
      variantCount
    };
  }, [catalogs]);

  // price multiplier
  const toggleMultiplyPrice = (catalogId: string, variantId: string, factor: number) => {
    setCatalogs(prev =>
      prev.map(c => {
        if (c.id !== catalogId) return c;

        return {
          ...c,
          variants: c.variants.map(v => {
            if (v.id !== variantId) return v;

            const multiplied = v.basePrice + factor;

            const isMultiplied = v.price === multiplied;

            return {
              ...v,
              price: isMultiplied ? v.basePrice : multiplied
            };
          })
        };
      })
    );
  };

  //
  const handleParseImport = () => {
    try {
      const data = parseImportFormat(importText);

      if (!data.length) {
        Toastify('No valid rows found', 500);
        return;
      }

      setFormattedJson(data);
    } catch {
      Toastify('Parse failed', 500);
    }
  };

  //
  const matchedCatalogIds = useMemo(() => {
    if (!searchName.trim()) return [];

    const lower = searchName.toLowerCase();

    return catalogs.filter(c => (c.catalogName || '').toLowerCase().includes(lower)).map(c => c.id);
  }, [searchName, catalogs]);

  //
  const firstMatchedCatalogId = matchedCatalogIds.length > 0 ? matchedCatalogIds[0] : null;

  // Scroll matched catalog lên gần top - phiên bản siêu mượt (dùng RAF )
  const scrollToFirstMatchedCatalog = useCallback(() => {
    if (!firstMatchedCatalogId) return;

    const el = catalogRefs.current[firstMatchedCatalogId];
    if (!el || !catalogsScrollRef.current) return;

    const container = catalogsScrollRef.current;
    const elTop = el.offsetTop;
    const offset = 300; // cách top đẹp mắt, dễ nhìn nhất

    container.scrollTo({
      top: Math.max(0, elTop - offset),
      behavior: 'smooth'
    });
  }, [firstMatchedCatalogId]);

  // Trigger scroll mượt khi gõ search (dùng RAF )
  useEffect(() => {
    if (!firstMatchedCatalogId) return;

    let frame: number;

    const tryScroll = () => {
      scrollToFirstMatchedCatalog();
    };

    frame = requestAnimationFrame(tryScroll);

    return () => cancelAnimationFrame(frame);
  }, [firstMatchedCatalogId, scrollToFirstMatchedCatalog]);

  // hotkeys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchName('');
        const el = document.activeElement as HTMLElement;
        el?.blur();
        return;
      }

      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setTimeout(scrollToFirstMatchedCatalog, 100); // chờ focus xong
        return;
      }

      if (isInputFocused()) return;

      switch (e.key.toLowerCase()) {
        case 't':
          addCatalog();
          break;

        case 'n':
          addVariant();
          break;

        case 'm':
          duplicateVariant();
          break;

        case 'b':
          removeCatalog();
          break;

        case 'x':
          clearLocal();
          break;

        case 'z':
          restoreBackup();
          break;
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [addCatalog, addVariant, duplicateVariant, removeCatalog, clearLocal, restoreBackup, scrollToFirstMatchedCatalog]);

  return (
    <div
      ref={containerRef}
      className="flex h-screen rounded-md border border-black bg-white text-black dark:bg-gray-950 dark:text-white 2xl:h-[90vh]"
    >
      {/* Header */}
      <div className="fixed z-10 flex flex-wrap bg-white dark:bg-black">
        {/* Left */}
        <div className="flex w-full flex-wrap items-start gap-2 border-r border-black p-2 dark:border-white xl:w-2/4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Catalogs</h2>
            <span className="text-xs opacity-70">
              {stats.catalogCount} catalogs • {stats.variantCount} variants
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              ref={searchInputRef}
              size="xs"
              placeholder="Search catalog..."
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              onFocus={scrollToFirstMatchedCatalog}
              className="w-[300px] border border-gray-300 bg-white text-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <span className="text-xs opacity-60">{matchedCatalogIds.length} results</span>
            <Button size="xs" className={btnClass} onClick={() => searchInputRef.current?.focus()}>
              F
            </Button>
          </div>
          <textarea
            className="w-full rounded border border-gray-300 bg-white p-2 text-xs text-black focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            rows={1}
            placeholder="Paste JSON here to import..."
            value={importText}
            onChange={e => setImportText(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button size="xs" className={btnClass} onClick={() => importJson(importText)}>
                Import Catalog JSON
              </Button>

              <Button size="xs" className={btnClass} onClick={formatPhonesJson}>
                Format Phones API
              </Button>
              <Button size="xs" className={btnClass} onClick={handleParseImport}>
                MODEL | STORAGE | COLORS | PRICE
              </Button>
              <Button size="xs" className={btnClass} onClick={() => setImportText('')}>
                Clear Import
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="xs" className={btnClass} onClick={addCatalog}>
                T - Add Catalog
              </Button>

              <Button size="xs" className={btnClass} onClick={addVariant}>
                N - Add Variant
              </Button>

              <Button size="xs" className={btnClass} onClick={duplicateVariant}>
                M - Duplicate Variant
              </Button>

              <Button size="xs" className={btnClass} onClick={removeCatalog}>
                B - Remove Catalog
              </Button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full flex-wrap items-start gap-2 p-2 xl:w-2/4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Preview</h2>
            <span className="text-xs opacity-70">
              {previewStats.products} products
              {previewStats.formatted && ' • formatted'}
            </span>
          </div>

          <Button size="xs" className={btnClass} onClick={() => navigator.clipboard.writeText(previewText)}>
            Copy
          </Button>

          <Button
            size="xs"
            className={btnClass}
            onClick={() => {
              const blob = new Blob([previewText], {
                type: 'application/json'
              });

              const url = URL.createObjectURL(blob);

              const a = document.createElement('a');
              a.href = url;
              a.download = previewStats.formatted ? 'phones-formatted.json' : 'products.json';

              a.click();
            }}
          >
            Download
          </Button>

          <Button size="xs" className={btnClass} onClick={clearLocal}>
            X - Clear Local
          </Button>

          <Button size="xs" className={btnClass} onClick={restoreBackup}>
            Z - Restore Backup
          </Button>

          <div className="mb-3 flex gap-2">
            <Button
              size="xs"
              className={`hover:border hover:border-dashed hover:bg-primary/50 hover:text-white ${
                activeRightTab === 'preview'
                  ? 'bg-primary font-semibold text-white shadow-sm'
                  : 'border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
              onClick={() => setActiveRightTab('preview')}
            >
              Preview JSON
            </Button>

            <Button
              size="xs"
              className={`hover:border hover:border-dashed hover:bg-primary/50 hover:text-white ${
                activeRightTab === 'note'
                  ? 'bg-primary font-semibold text-white shadow-sm'
                  : 'border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
              onClick={() => setActiveRightTab('note')}
            >
              Price Note
            </Button>
          </div>
        </div>
      </div>

      {/* Catalog */}
      <div
        className="mt-[200px] flex w-full flex-col gap-2 overflow-auto border-r border-black p-2 scrollbar-hide dark:border-white 2xl:mt-[150px]"
        ref={catalogsScrollRef}
      >
        {catalogs.map((catalog, index) => (
          <div
            key={catalog.id}
            ref={el => {
              catalogRefs.current[catalog.id] = el;
            }}
            className={`cursor-pointer rounded-xl border p-2 transition-colors ${
              matchedCatalogIds.includes(catalog.id)
                ? 'border-red-500 bg-red-100 dark:bg-red-900/40'
                : activeCatalog === catalog.id
                  ? 'border-blue-500 bg-blue-100 dark:border-green-500 dark:bg-green-950/50'
                  : 'border-dashed border-gray-50 bg-white dark:border-gray-700 dark:bg-gray-900'
            }`}
            onClick={() => setActiveCatalog(catalog.id)}
          >
            <p className="mb-2 font-bold text-primary dark:text-green-500">
              <span className="text-xl">#{index + 1}. </span>
              {catalog.catalogName}{' '}
              {catalog.variants.length > 0 && (
                <span className="text-xs opacity-70">({catalog.variants.length} variants)</span>
              )}
            </p>
            <Input
              size="xs"
              className="mb-3 w-full border border-gray-300 bg-white font-bold text-black focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500"
              placeholder="Catalog name"
              value={catalog.catalogName}
              onChange={e => updateCatalog(catalog.id, e.target.value)}
            />

            <div className="space-y-2">
              {catalog.variants.map((variant, variantIndex) => (
                <div
                  key={variant.id}
                  onClick={() => {
                    setActiveCatalog(catalog.id);
                    setActiveVariant(variant.id);
                  }}
                  className={`flex items-center rounded-lg border p-2 text-xs transition-colors ${
                    activeVariant === variant.id
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'border-black bg-white dark:border-gray-700 dark:bg-gray-900'
                  }`}
                >
                  <p className="w-10 py-1 text-sm font-bold text-primary dark:text-green-500">#{variantIndex + 1}.</p>
                  <div className="grid w-full grid-cols-2 gap-2 xl:grid-cols-4">
                    <Input
                      size="xs"
                      className="border border-gray-300 bg-white text-black focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500"
                      placeholder="Color"
                      value={variant.color}
                      onChange={e => updateVariant(catalog.id, variant.id, 'color', e.target.value)}
                    />

                    <div className="flex flex-col">
                      <Input
                        size="xs"
                        type="number"
                        className="border border-gray-300 bg-white text-black focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500"
                        placeholder="Price"
                        value={variant.price}
                        onChange={e => updateVariant(catalog.id, variant.id, 'price', Number(e.target.value))}
                      />
                      <div className="flex flex-wrap gap-1 py-1">
                        {[1000, 1500, 2000, 2500, 3000].map(f => (
                          <button
                            key={f}
                            className="rounded border border-gray-300 px-1 py-px text-[10px] text-gray-500"
                            onClick={() => toggleMultiplyPrice(catalog.id, variant.id, f)}
                          >
                            +{f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Input
                      size="xs"
                      className="border border-gray-300 bg-white text-black focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500"
                      placeholder="Image"
                      value={variant.img}
                      onChange={e => updateVariant(catalog.id, variant.id, 'img', e.target.value)}
                    />

                    <Input
                      size="xs"
                      className="border border-gray-300 bg-white text-black focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500"
                      placeholder="Status"
                      value={variant.status}
                      onChange={e => updateVariant(catalog.id, variant.id, 'status', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* JSON Preview */}
      <div className="mt-[180px] w-full overflow-auto p-2 scrollbar-hide lg:w-1/3 xl:mt-[130px] xl:w-1/4">
        {/*  */}
        {activeRightTab === 'preview' && (
          <div className="mt-5 space-y-2 text-[10px] text-blue-800 dark:text-green-500">
            {previewJson.map((item, index) => (
              <div
                key={index}
                ref={el => {
                  previewItemRefs.current[index] = el;
                }}
                className={`rounded border p-2 ${
                  variantIndexMap.get(activeVariant ?? '') === index
                    ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
                }`}
              >
                {/* <pre className="whitespace-pre-wrap">{JSON.stringify(item)}</pre> */} {/* Json 1 dòng */}
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(item, null, 2)}</pre>
              </div>
            ))}
          </div>
        )}
        {activeRightTab === 'note' && (
          <textarea
            className="h-full w-full rounded-sm border bg-white p-2 text-base focus:outline-none dark:bg-black"
            placeholder="Paste phone price list here..."
            value={priceNote}
            onChange={e => setPriceNote(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default JsonPreviewPage;

