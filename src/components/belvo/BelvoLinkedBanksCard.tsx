import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Building2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BelvoService } from '@/services/belvo.service';
import { BelvoAccount } from '@/services/belvo.service';
import { BelvoAccountsModal } from './BelvoAccountsModal';

interface BelvoLinkedBanksCardProps {
  accounts: BelvoAccount[];
  isLoading?: boolean;
  onUnlink?: () => void;
  userId: string;
}

export function BelvoLinkedBanksCard({ accounts, isLoading, onUnlink, userId }: BelvoLinkedBanksCardProps) {
  const { toast } = useToast();
  const [updatingAccounts, setUpdatingAccounts] = useState<{[key: string]: boolean}>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BelvoAccount | null>(null);

  async function handleUnlink(linkId: string) {
    try {
      await BelvoService.unlinkBank(linkId);
      onUnlink?.();
    } catch (error) {
      console.error('Erro ao remover link:', error);
    }
  }
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando bancos...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhum banco vinculado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você ainda não possui bancos vinculados através do Belvo.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
      <CardHeader>
        <CardTitle>Bancos Vinculados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 flex-wrap">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-medium">{account.institutionName}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedAccount(account);
                    setIsModalOpen(true);
                  }}
                >
                  <Building2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    setUpdatingAccounts(prev => ({ ...prev, [account.linkId]: true }));
                    try {
                      await BelvoService.syncBankAccounts(account.linkId, userId);
                      toast({
                        title: 'Contas atualizadas',
                        description: 'As contas bancárias foram atualizadas com sucesso.',
                      });
                      onUnlink?.(); // Recarregar a lista de contas
                    } catch (error) {
                      console.error('Erro ao atualizar contas:', error);
                      toast({
                        title: 'Erro ao atualizar contas',
                        description: 'Ocorreu um erro ao atualizar as contas bancárias.',
                        variant: 'destructive',
                      });
                    } finally {
                      setUpdatingAccounts(prev => ({ ...prev, [account.linkId]: false }));
                    }
                  }}
                  disabled={updatingAccounts[account.linkId]}
                >
                  <RefreshCw className={`h-4 w-4 ${updatingAccounts[account.linkId] ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleUnlink(account.linkId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

      <BelvoAccountsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
      />
    </>
  );
}
