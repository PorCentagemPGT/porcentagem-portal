import api from '@/lib/api';
import { logger } from '@/lib/logger';

export interface BelvoWidgetResponse {
  token: string;
}

export interface BelvoLinkAccountData {
  linkId: string;
  institutionName: string;
  userId: string;
}

export interface BankAccountResponseDto {
  id: string;
  userId: string;
  linkId: string;
  bankAccountId: string;
  category: string;
  type: string;
  number: string;
  name: string;
  balance: {
    current: number;
    available: number;
  };
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BelvoAccount {
  id: string;
  institutionName: string;
  category: string;
  type: string;
  number: string;
  balance: {
    current: number;
    available: number;
  };
  currency: string;
  createdAt: string;
  collectedAt: string;
  linkId: string;
}

export class BelvoService {
  static async listBankAccountsByLinkId(
    linkId: string
  ): Promise<BankAccountResponseDto[]> {
    try {
      const response = await api.get<BankAccountResponseDto[]>(
        `/belvo/accounts/bank/linkId/${linkId}`
      );
      logger.info('Contas do link listadas com sucesso', { linkId });
      return response.data;
    } catch (error) {
      logger.error('Erro ao listar contas do link', { error, linkId });
      throw error;
    }
  }

  static async updateBankAccounts(
    accounts: { id: string; status: 'enabled' | 'disabled' }[]
  ): Promise<BankAccountResponseDto[]> {
    try {
      const response = await api.patch<{ data: BankAccountResponseDto[] }>(
        '/belvo/accounts/batch',
        { accounts }
      );
      logger.info('Contas bancárias atualizadas com sucesso', {
        count: accounts.length,
      });
      return response.data.data;
    } catch (error) {
      logger.error('Erro ao atualizar contas bancárias', {
        error,
        count: accounts.length,
      });
      throw error;
    }
  }

  static async syncBankAccounts(
    linkId: string,
    userId: string
  ): Promise<void> {
    try {
      await api.get(`/belvo/links/${linkId}/users/${userId}/account-types`);
      logger.info('Contas bancárias sincronizadas com sucesso', {
        linkId,
        userId,
      });
    } catch (error) {
      logger.error('Erro ao sincronizar contas bancárias', {
        error,
        linkId,
        userId,
      });
      throw error;
    }
  }

  static async getWidgetToken(): Promise<BelvoWidgetResponse> {
    logger.info('Iniciando requisição do token do widget Belvo');
    try {
      const response = await api.get<BelvoWidgetResponse>(
        '/belvo/widget-token'
      );
      logger.info('Token do widget Belvo obtido com sucesso', {
        token: response.data.token,
      });
      return response.data;
    } catch (error) {
      logger.error('Erro ao obter token do widget Belvo', { error });
      throw error;
    }
  }

  static async linkAccount(data: BelvoLinkAccountData): Promise<void> {
    const { linkId, institutionName, userId } = data;
    logger.info('Iniciando vinculação de conta Belvo', {
      linkId,
      institutionName,
      userId,
    });
    try {
      await api.post('/belvo/accounts/link', data);
      logger.info('Conta Belvo vinculada com sucesso', {
        linkId,
        institutionName,
      });
    } catch (error) {
      logger.error('Erro ao vincular conta Belvo', {
        linkId,
        institutionName,
        error,
      });
      throw error;
    }
  }

  static async listUserAccounts(
    userId: string
  ): Promise<{ data: BelvoAccount[] }> {
    logger.info('Iniciando listagem de contas do usuário', { userId });
    try {
      const response = await api.get<{ data: BelvoAccount[] }>(
        `/belvo/accounts/link/${userId}`
      );
      logger.info('Contas do usuário listadas com sucesso', { userId });
      return response.data;
    } catch (error) {
      logger.error('Erro ao listar contas do usuário', { userId, error });
      throw error;
    }
  }

  static async listBelvoAccounts(
    linkId: string
  ): Promise<{ data: BelvoAccount[] }> {
    logger.info('Iniciando listagem de contas Belvo', { linkId });
    try {
      const response = await api.get<{ data: BelvoAccount[] }>(
        `/belvo/accounts/belvo/${linkId}`
      );
      logger.info('Contas Belvo listadas com sucesso', { linkId });
      return response.data;
    } catch (error) {
      logger.error('Erro ao listar contas Belvo', { linkId, error });
      throw error;
    }
  }

  static async unlinkBank(linkId: string): Promise<void> {
    logger.info('Iniciando remoção do link do banco', { linkId });
    try {
      await api.delete(`/belvo/link/${linkId}`);
      logger.info('Link do banco removido com sucesso', { linkId });
    } catch (error) {
      logger.error('Erro ao remover link do banco', { linkId, error });
      throw error;
    }
  }
}
