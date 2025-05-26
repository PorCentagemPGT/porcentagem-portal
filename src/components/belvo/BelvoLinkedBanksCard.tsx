import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { BelvoService } from '@/services/belvo.service';
import { BelvoAccount } from '@/services/belvo.service';

interface BelvoLinkedBanksCardProps {
  accounts: BelvoAccount[];
  isLoading?: boolean;
  onUnlink?: () => void;
}

export function BelvoLinkedBanksCard({ accounts, isLoading, onUnlink }: BelvoLinkedBanksCardProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Bancos Vinculados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleUnlink(account.linkId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
