import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type InitProductImagesInput = {
  mainImageUrl?: string;
  thumbnailUrls?: string[];
};

type AppendImagesFields = {
  mainImageField: string;
  thumbnailField: string;
};

type AppendImagesOptions = {
  skipMainImage?: boolean;
};

type ProductImageEditorState = {
  mainImageUrl: string;
  mainImageFile: File | null;
  mainImagePreviewUrl: string;
  keptThumbnailUrls: string[];
  newThumbnailFiles: File[];
  newThumbnailPreviewUrls: string[];
};

export const useProductImageEditor = () => {
  const [state, setState] = useState<ProductImageEditorState>({
    mainImageUrl: '',
    mainImageFile: null,
    mainImagePreviewUrl: '',
    keptThumbnailUrls: [],
    newThumbnailFiles: [],
    newThumbnailPreviewUrls: []
  });

  const revokePreviewUrls = useCallback((urls: string[]) => {
    urls.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }, []);

  const initProductImages = useCallback(
    ({ mainImageUrl, thumbnailUrls }: InitProductImagesInput) => {
      setState(prev => {
        revokePreviewUrls([prev.mainImagePreviewUrl, ...prev.newThumbnailPreviewUrls].filter(Boolean));

        return {
          mainImageUrl: mainImageUrl || '',
          mainImageFile: null,
          mainImagePreviewUrl: '',
          keptThumbnailUrls: thumbnailUrls || [],
          newThumbnailFiles: [],
          newThumbnailPreviewUrls: []
        };
      });
    },
    [revokePreviewUrls]
  );

  const handleMainImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      setState(prev => {
        revokePreviewUrls([prev.mainImagePreviewUrl].filter(Boolean));

        return {
          ...prev,
          mainImageFile: file,
          mainImagePreviewUrl: file ? URL.createObjectURL(file) : ''
        };
      });

      event.target.value = '';
    },
    [revokePreviewUrls]
  );

  const clearMainImageFile = useCallback(() => {
    setState(prev => {
      revokePreviewUrls([prev.mainImagePreviewUrl].filter(Boolean));

      return {
        ...prev,
        mainImageFile: null,
        mainImagePreviewUrl: ''
      };
    });
  }, [revokePreviewUrls]);

  const handleThumbnailFilesChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const previewUrls = files.map(file => URL.createObjectURL(file));

    setState(prev => ({
      ...prev,
      newThumbnailFiles: [...prev.newThumbnailFiles, ...files],
      newThumbnailPreviewUrls: [...prev.newThumbnailPreviewUrls, ...previewUrls]
    }));

    event.target.value = '';
  }, []);

  const removeKeptThumbnail = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      keptThumbnailUrls: prev.keptThumbnailUrls.filter((_, currentIndex) => currentIndex !== index)
    }));
  }, []);

  const removeNewThumbnail = useCallback(
    (index: number) => {
      setState(prev => {
        const removedPreviewUrl = prev.newThumbnailPreviewUrls[index];

        if (removedPreviewUrl) {
          revokePreviewUrls([removedPreviewUrl]);
        }

        return {
          ...prev,
          newThumbnailFiles: prev.newThumbnailFiles.filter((_, currentIndex) => currentIndex !== index),
          newThumbnailPreviewUrls: prev.newThumbnailPreviewUrls.filter((_, currentIndex) => currentIndex !== index)
        };
      });
    },
    [revokePreviewUrls]
  );

  const moveKeptThumbnail = useCallback((index: number, direction: 'up' | 'down') => {
    setState(prev => {
      const next = [...prev.keptThumbnailUrls];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }

      const currentItem = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = currentItem;

      return {
        ...prev,
        keptThumbnailUrls: next
      };
    });
  }, []);

  const appendImagesToFormData = useCallback(
    (formData: FormData, fields: AppendImagesFields, options?: AppendImagesOptions) => {
      formData.append('keepThumbnailUrls', JSON.stringify(state.keptThumbnailUrls));

      if (!options?.skipMainImage && state.mainImageFile) {
        formData.append(fields.mainImageField, state.mainImageFile);
      }

      state.newThumbnailFiles.forEach(file => {
        formData.append(fields.thumbnailField, file);
      });
    },
    [state.keptThumbnailUrls, state.mainImageFile, state.newThumbnailFiles]
  );

  useEffect(() => {
    return () => {
      revokePreviewUrls([state.mainImagePreviewUrl, ...state.newThumbnailPreviewUrls].filter(Boolean));
    };
  }, [revokePreviewUrls, state.mainImagePreviewUrl, state.newThumbnailPreviewUrls]);

  return {
    mainImageUrl: state.mainImageUrl,
    mainImageFile: state.mainImageFile,
    mainImagePreviewUrl: state.mainImagePreviewUrl,
    keptThumbnailUrls: state.keptThumbnailUrls,
    newThumbnailFiles: state.newThumbnailFiles,
    newThumbnailPreviewUrls: state.newThumbnailPreviewUrls,
    initProductImages,
    handleMainImageChange,
    clearMainImageFile,
    handleThumbnailFilesChange,
    removeKeptThumbnail,
    removeNewThumbnail,
    moveKeptThumbnail,
    appendImagesToFormData
  };
};
