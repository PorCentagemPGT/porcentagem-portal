'use client';

import Script from 'next/script';
import { logger } from '@/lib/logger';

export function BelvoScript() {
  return (
    <Script
      src="https://cdn.belvo.io/belvo-widget-1-stable.js"
      strategy="beforeInteractive"
      onLoad={() => {
        logger.info('SDK do Belvo carregado com sucesso');
      }}
      onError={() => {
        logger.error('Erro ao carregar SDK do Belvo');
      }}
    />
  );
}
