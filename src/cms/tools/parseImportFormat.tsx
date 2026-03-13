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

export const parseImportFormat = (text: string): ProductJson[] => {
  const rows = text
    .split('\n')
    .map(r => r.trim())
    .filter(Boolean);

  const result: ProductJson[] = [];

  for (const row of rows) {
    const parts = row.split('|').map(p => p.trim());

    if (parts.length < 5) continue;

    const brand = parts[0];
    const model = parts[1];
    const memory = parts[2];
    const colors = parts[3];
    const priceRaw = parts[4];

    const price = Number(priceRaw.replace(/[^\d]/g, ''));

    const catalogName = `${brand} ${model} ${memory}`.replace(/\s+/g, ' ').trim();

    const colorList = colors.split(',').map(c => c.trim());

    for (const color of colorList) {
      result.push({
        catalogName,
        name: catalogName,
        color,
        img: '',
        thumbnail: [],
        price,
        status: 'New',
        des: '',
        note: ''
      });
    }
  }

  return result;
};

