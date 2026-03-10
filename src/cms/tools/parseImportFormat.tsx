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

export const parseImportFormat = (input: string): ProductJson[] => {
  const lines = input
    .split('\n')
    .map(v => v.trim())
    .filter(Boolean);

  const result: ProductJson[] = [];

  lines.forEach(line => {
    const parts = line.split('|').map(v => v.trim());

    if (parts.length < 4) return;

    const model = parts[0];
    const storage = parts[1];
    const colorsRaw = parts[2];
    const priceRaw = parts[3];

    const catalogName = `${model} ${storage}`.trim();

    const basePrice = Number(priceRaw.replace(/[^\d]/g, ''));

    const colorList = colorsRaw.split(',').map(c => c.trim());

    colorList.forEach(colorItem => {
      let color = colorItem;
      let price = basePrice;

      const match = colorItem.match(/(.+?)[ :](\d+)/);

      if (match) {
        color = match[1].trim();
        price = Number(match[2]);
      }

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
    });
  });

  return result;
};
