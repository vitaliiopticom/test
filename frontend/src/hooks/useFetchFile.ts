import { useState } from 'react';

import { getFilenameFromUrl, saveFromBlob } from '@/utils/download';

const downloadFile = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return blob;
  } catch (error) {
    throw error;
  }
};

export type FetchState = {
  isLoading: boolean;
  error?: Error;
};

export const useFetchFile = () => {
  const [state, setState] = useState<FetchState>({
    isLoading: false,
  });

  const saveFile = async (
    url?: string,
    name?: string,
    onComplete?: () => void,
    onError?: () => void,
  ) => {
    try {
      if (!url) {
        return;
      }

      setState({ isLoading: true });

      const blob = await downloadFile(url);
      const fileName = name || getFilenameFromUrl(url);

      blob && saveFromBlob(blob, fileName);

      setState({ isLoading: false });
      onComplete?.();
    } catch (error) {
      setState({
        isLoading: false,
        error: error as Error,
      });
      onError?.();
    }
  };

  const saveMultipleFiles = async (
    urls: string[],
    onComplete?: () => void,
    onError?: () => void,
  ) => {
    try {
      if (urls.length === 0) {
        return;
      }

      setState({ isLoading: true });

      const downloadFilesPromises = urls.map((url) => downloadFile(url));
      const results = await Promise.all(downloadFilesPromises);

      results.forEach((result, index) => {
        const fileName = getFilenameFromUrl(urls[index]);

        result && saveFromBlob(result, fileName);
      });

      setState({ isLoading: false });
      onComplete?.();
    } catch (error) {
      setState({
        isLoading: false,
        error: error as Error,
      });
      onError?.();
    }
  };

  return { state, saveFile, saveMultipleFiles };
};
