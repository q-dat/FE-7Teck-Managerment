export const downloadImage = async (url: string, filename: string) => {
  try {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', url);
  }
};
