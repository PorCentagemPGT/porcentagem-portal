'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BelvoService } from '@/services/belvo.service';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import { Loader2 } from 'lucide-react';
import { AuthService } from '@/services/auth.service';

import type { BelvoError, BelvoEvent } from '@/types/belvo';

interface BelvoConnectButtonProps {
  onSuccess?: () => void;
}

export function BelvoConnectButton({ onSuccess }: BelvoConnectButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadBelvoScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.belvoSDK) {
        return resolve();
      }
  
      const script = document.createElement('script');
      script.src = 'https://cdn.belvo.io/belvo-widget-1-stable.js';
      script.async = true;
      script.onload = () => {
        logger.info('SDK do Belvo carregado com sucesso');
        resolve();
      };
      script.onerror = () => {
        logger.error('Erro ao carregar SDK do Belvo');
        reject(new Error('Erro ao carregar SDK do Belvo'));
      };
  
      document.body.appendChild(script);
    });
  };


  const handleConnect = useCallback(async () => {
    logger.info('Iniciando processo de conexão com Belvo');
    try {
      setIsLoading(true);
      const { token } = await BelvoService.getWidgetToken();
      logger.info('Token obtido, inicializando widget Belvo');
      logger.info('Verificando disponibilidade de window.belvoSDK', { sdk: window.belvoSDK });

      logger.info('Carregando script Belvo...');
      await loadBelvoScript();
      logger.info('Script Belvo carregado, verificando belvoSDK...');

      logger.info('Verificando disponibilidade de window.belvoSDK', { sdk: window.belvoSDK });

      if (typeof window === 'undefined' || !window.belvoSDK?.createWidget) {
        logger.error('belvoSDK.createWidget não disponível após carregamento');
        throw new Error('belvoSDK ainda não disponível após carregamento');
      }
      

      logger.info('window.belvoSDK:', { belvoSDK: window.belvoSDK });

      const belvoWidget = window.belvoSDK.createWidget(token, {
        callback: async (link: string | { id: string }, institution: string | { name: string }) => {
          const linkId = typeof link === 'string' ? link : link?.id;
          const institutionName = typeof institution === 'string' ? institution : institution?.name ?? 'Instituição desconhecida';

          logger.info('Conta conectada com sucesso', { linkId: linkId, institutionName: institutionName });
          
          if (!AuthService.isAuthenticated()) {
            throw new Error('Usuário não autenticado');
          }

          const user = AuthService.getUser();
          if (!user) {
            throw new Error('Dados do usuário não encontrados');
          }

          await BelvoService.linkAccount({
            linkId,
            institutionName,
            userId: user.id
          });
          
          logger.info('Conta vinculada com sucesso', { linkId: linkId, institutionName: institutionName });
          toast({
            title: 'Conta conectada com sucesso!',
            description: `Sua conta do ${institutionName} foi conectada.`,
          });

          onSuccess?.();
        },
        onError: (error: Error) => {
          logger.error('Erro no widget do Belvo', { error });
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro ao abrir o widget do Belvo.',
            variant: 'destructive',
          });
        },
        onExit: () => {
          toast({
            title: 'Conexão cancelada',
            description: 'Você cancelou a conexão bancária.',
          });
        },
        onEvent: (event: BelvoEvent) => {
          const { eventName, request_id, meta_data } = event;
          logger.info('Evento do widget Belvo', {
            eventName,
            request_id,
            meta_data,
          });

          if (eventName === 'ERROR') {
            logger.error('Erro no widget Belvo', {
              error_code: meta_data.error_code,
              error_message: meta_data.error_message,
            });
          }
        },
        locale: 'pt',
        institution_types: ['retail'],
      });
      belvoWidget.build();
      
    } catch (error) {
      const belvoError = error as BelvoError;
      logger.error('Erro ao conectar com Belvo', { error: belvoError });
    
      toast({
        title: 'Erro',
        description: belvoError.message || 'Não foi possível iniciar o processo de conexão.',
        variant: 'destructive',
      });
    }
    finally {
      setIsLoading(false);
    }
  }, [onSuccess, toast]);

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className="w-full"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Conectando...
        </>
      ) : (
        'Conectar Conta Bancária'
      )}
    </Button>
  );
}
