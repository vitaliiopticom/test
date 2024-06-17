import { useState } from 'react';

import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { writeTextToClipboard } from '@/utils/clipboard';

type CopiedValue = string | null;

export const useCopyToClipboard = () => {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy = async (text: string) => {
    const copyToClipboardSuccess = await writeTextToClipboard(text);

    if (!copyToClipboardSuccess) {
      setCopiedText(null);

      return;
    }

    setCopiedText(text);
    toast.info<string>(t('common.copiedLink'));
  };

  return { copiedText, copy };
};
