interface ContactInfo {
  phone: string;
  email: string;
}

interface BuildContentOptions {
  des: string;
  url: string;
  contact: ContactInfo;
  hashtag: string; // hiển thị
}

const TRACKING_HASH = '#7teck';

const appendHash = (url: string, hash: string): string => {
  if (!url) return '';
  return url.includes(hash) ? url : `${url}${hash}`;
};

const formatContactBlock = ({ phone, email }: ContactInfo): string => {
  return [`Zalo/Call/WhatsApp: ${phone}`, `📩 Email: ${email}`].join('\n');
};

export const buildFacebookContent = ({ des, url, contact, hashtag }: BuildContentOptions): string => {
  const finalUrl = appendHash(url.trim(), TRACKING_HASH);

  return [
    des?.trim() || '',
    '',
    formatContactBlock(contact),
    '',
    `👉 Xem chi tiết: ${finalUrl}`,
    '',
    hashtag.trim()
  ].join('\n');
};

export const copyPostContent = async (options: BuildContentOptions): Promise<void> => {
  if (!navigator.clipboard) {
    throw new Error('Clipboard not supported');
  }

  const content = buildFacebookContent(options);
  await navigator.clipboard.writeText(content);
};

interface ShareFacebookOptions extends BuildContentOptions {}

export const handleShareFacebook = async ({
  des,
  url,
  contact,
  hashtag
}: ShareFacebookOptions): Promise<{
  success: boolean;
  error?: unknown;
}> => {
  try {
    window.open(import.meta.env.VITE_FACEBOOK_SHARE_URL, '_blank');

    await copyPostContent({
      des,
      url,
      contact,
      hashtag
    });

    return { success: true };
  } catch (error) {
    console.error('SHARE FACEBOOK ERROR:', error);
    return { success: false, error };
  }
};
