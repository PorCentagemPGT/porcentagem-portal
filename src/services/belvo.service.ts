import api from '@/lib/api';
import { logger } from '@/lib/logger'; // Added logger import

export interface BelvoWidgetResponse {
  token: string;
}

export class BelvoService {
  static async getWidgetToken(): Promise<BelvoWidgetResponse> {
    logger.info('Iniciando requisição do token do widget Belvo');
    try {
      const response = await api.get<BelvoWidgetResponse>('/belvo/widget-token');
      logger.info('Token do widget Belvo obtido com sucesso', { token: response.data.token });
      return response.data;
    } catch (error) {
      logger.error('Erro ao obter token do widget Belvo', { error });
      throw error;
    }
  }

  static async linkAccount(linkId: string): Promise<void> {
    logger.info('Iniciando vinculação de conta Belvo', { linkId });
    try {
      await api.post('/belvo/link-account', { linkId });
      logger.info('Conta Belvo vinculada com sucesso', { linkId });
    } catch (error) {
      logger.error('Erro ao vincular conta Belvo', { linkId, error });
      throw error;
    }
  }
}
