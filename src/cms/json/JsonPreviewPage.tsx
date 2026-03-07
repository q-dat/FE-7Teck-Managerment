import React, { useEffect, useMemo, useRef, useState } from 'react';

type Variant = {
  id: string;
  color: string;
  price: number;
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

const createVariant = (): Variant => ({
  id: crypto.randomUUID(),
  color: '',
  price: 0,
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

const JsonPreviewPage: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [activeCatalog, setActiveCatalog] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const isInputFocused = () => {
    const el = document.activeElement;
    if (!el) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  };

  /* LOAD LOCAL */

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCatalogs(JSON.parse(saved));
  }, []);

  /* SAVE LOCAL */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogs));
  }, [catalogs]);

  /* ACTIONS */

  const addCatalog = () => {
    const catalog = createCatalog();
    setCatalogs(p => [...p, catalog]);
    setActiveCatalog(catalog.id);
  };

  const addVariant = () => {
    if (!activeCatalog) return;

    setCatalogs(prev =>
      prev.map(c => (c.id === activeCatalog ? { ...c, variants: [...c.variants, createVariant()] } : c))
    );
  };

  const duplicateVariant = () => {
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
  };

  const removeCatalog = () => {
    if (!activeCatalog) return;

    setCatalogs(prev => prev.filter(c => c.id !== activeCatalog));

    setActiveCatalog(null);
  };

  const clearLocal = () => {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) sessionStorage.setItem(BACKUP_KEY, current);

    localStorage.removeItem(STORAGE_KEY);
    setCatalogs([]);
  };

  const restoreBackup = () => {
    const backup = sessionStorage.getItem(BACKUP_KEY);
    if (!backup) return;

    localStorage.setItem(STORAGE_KEY, backup);
    setCatalogs(JSON.parse(backup));
  };

  /* UPDATE */

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

  /* ARROW NAVIGATION */

  const moveFocus = (direction: 'up' | 'down' | 'left' | 'right') => {
    const elements = Array.from(containerRef.current?.querySelectorAll('input,button') ?? []) as HTMLElement[];

    const currentIndex = elements.indexOf(document.activeElement as HTMLElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (direction === 'right') nextIndex = currentIndex + 1;
    if (direction === 'left') nextIndex = currentIndex - 1;
    if (direction === 'down') nextIndex = currentIndex + 4;
    if (direction === 'up') nextIndex = currentIndex - 4;

    const next = elements[nextIndex];

    if (next) next.focus();
  };

  /* HOTKEYS */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const el = document.activeElement as HTMLElement;
        el?.blur();
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

        case 'z':
          removeCatalog();
          break;

        case 'x':
          clearLocal();
          break;

        case 'b':
          restoreBackup();
          break;

        case 'arrowup':
          moveFocus('up');
          break;

        case 'arrowdown':
          moveFocus('down');
          break;

        case 'arrowleft':
          moveFocus('left');
          break;

        case 'arrowright':
          moveFocus('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [activeCatalog, activeVariant, catalogs]);

  /* JSON OUTPUT */

  const jsonOutput = useMemo<ProductJson[]>(() => {
    const result: ProductJson[] = [];

    catalogs.forEach(catalog => {
      catalog.variants.forEach(variant => {
        result.push({
          catalogName: catalog.catalogName,
          name: catalog.catalogName,
          color: variant.color,
          img: variant.img,
          thumbnail: variant.thumbnail,
          price: variant.price,
          status: variant.status,
          des: variant.des,
          note: variant.note
        });
      });
    });

    return result;
  }, [catalogs]);

  const jsonText = useMemo(() => JSON.stringify(jsonOutput, null, 2), [jsonOutput]);

  /* COPY JSON */

  const copyJson = async () => {
    await navigator.clipboard.writeText(jsonText);
  };

  /* DOWNLOAD */

  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'products.json';

    a.click();
  };
  return (
    <div ref={containerRef} className="flex h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-200">
      {/* JSON */}

      <div className="w-full overflow-auto border-r border-gray-300 p-4 scrollbar-hide dark:border-gray-700 xl:w-1/2">
        <div className="mb-2 flex justify-between">
          <h2 className="text-sm font-semibold">JSON Preview</h2>

          <div className="flex gap-1">
            <button className="btn btn-outline btn-xs" onClick={copyJson}>
              Copy
            </button>

            <button className="btn btn-primary btn-xs" onClick={downloadJson}>
              Download
            </button>
            <button className="btn btn-error btn-xs" onClick={clearLocal}>
              X
            </button>

            <button className="btn btn-outline btn-xs" onClick={restoreBackup}>
              B
            </button>
          </div>
        </div>

        <pre className="whitespace-pre-wrap text-[11px]">{jsonText}</pre>
      </div>

      {/* EDITOR */}

      <div className="w-full space-y-4 overflow-auto p-4 xl:w-1/2">
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-xs" onClick={addCatalog}>
            T
          </button>

          <button className="btn btn-outline btn-xs" onClick={addVariant}>
            N
          </button>

          <button className="btn btn-outline btn-xs" onClick={duplicateVariant}>
            M
          </button>

          <button className="btn btn-warning btn-xs" onClick={removeCatalog}>
            Z
          </button>
        </div>

        {catalogs.map(catalog => (
          <div
            key={catalog.id}
            className={`rounded-xl border p-3 dark:border-gray-700 ${
              activeCatalog === catalog.id ? 'border-primary bg-primary/10' : ''
            }`}
            onClick={() => setActiveCatalog(catalog.id)}
          >
            <input
              className="input input-xs input-bordered mb-2 w-full"
              placeholder="Catalog name"
              value={catalog.catalogName}
              onChange={e => updateCatalog(catalog.id, e.target.value)}
            />

            <div className="space-y-2">
              {catalog.variants.map(variant => (
                <div
                  key={variant.id}
                  onClick={() => {
                    setActiveCatalog(catalog.id);
                    setActiveVariant(variant.id);
                  }}
                  className={`grid grid-cols-2 gap-2 rounded-lg border p-2 text-xs dark:border-gray-700 xl:grid-cols-4 ${
                    activeVariant === variant.id ? 'border-secondary bg-secondary/10' : ''
                  }`}
                >
                  <input
                    className="input input-xs input-bordered"
                    placeholder="Color"
                    value={variant.color}
                    onChange={e => updateVariant(catalog.id, variant.id, 'color', e.target.value)}
                  />

                  <input
                    type="number"
                    className="input input-xs input-bordered"
                    placeholder="Price"
                    value={variant.price}
                    onChange={e => updateVariant(catalog.id, variant.id, 'price', Number(e.target.value))}
                  />

                  <input
                    className="input input-xs input-bordered"
                    placeholder="Image"
                    value={variant.img}
                    onChange={e => updateVariant(catalog.id, variant.id, 'img', e.target.value)}
                  />

                  <input
                    className="input input-xs input-bordered"
                    placeholder="Status"
                    value={variant.status}
                    onChange={e => updateVariant(catalog.id, variant.id, 'status', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JsonPreviewPage;

