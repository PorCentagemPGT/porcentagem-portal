import api from '@/lib/api';
import { logger } from '@/lib/logger'; // Added logger import

export interface BelvoWidgetResponse {
  token: string;
}

export interface BelvoLinkAccountData {
  linkId: string;
  institutionName: string;
  userId: string;
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

  static async linkAccount(data: BelvoLinkAccountData): Promise<void> {
    const { linkId, institutionName, userId } = data;
    logger.info('Iniciando vinculação de conta Belvo', { linkId, institutionName, userId });
    try {
      await api.post('/belvo/link-account', data);
      logger.info('Conta Belvo vinculada com sucesso', { linkId, institutionName });
    } catch (error) {
      logger.error('Erro ao vincular conta Belvo', { linkId, institutionName, error });
      throw error;
    }
  }
}
