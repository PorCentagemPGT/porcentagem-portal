import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BelvoAccount } from '@/services/belvo.service';

interface BelvoLinkedBanksCardProps {
  accounts: BelvoAccount[];
  isLoading?: boolean;
}

export function BelvoLinkedBanksCard({ accounts, isLoading }: BelvoLinkedBanksCardProps) {
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
        <div className="grid gap-4">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
