export const buildFacebookContent = (des: string, url: string): string => {
  return [des?.trim() || '', '', '👉 Xem chi tiết:', url].join('\n');
};

export const copyPostContent = async (des: string, url: string): Promise<void> => {
  if (!navigator.clipboard) {
    throw new Error('Clipboard not supported');
  }

  const content = buildFacebookContent(des, url);
  await navigator.clipboard.writeText(content);
};

interface ShareFacebookOptions {
  des: string;
  url: string;
}

export const handleShareFacebook = async ({
  des,
  url
}: ShareFacebookOptions): Promise<{
  success: boolean;
  error?: unknown;
}> => {
  try {
    window.open(import.meta.env.VITE_FACEBOOK_SHARE_URL, '_blank');

    await copyPostContent(des, url);

    return { success: true };
  } catch (error) {
    console.error('SHARE FACEBOOK ERROR:', error);
    return { success: false, error };
  }
};
