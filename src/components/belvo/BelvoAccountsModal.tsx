import { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BelvoAccount, BelvoService, BankAccountResponseDto } from "@/services/belvo.service";

interface BelvoAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account?: BelvoAccount | null;
}

export function BelvoAccountsModal({ isOpen, onClose, account }: BelvoAccountsModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponseDto[]>([]);
  const [accountStates, setAccountStates] = useState<Record<string, boolean>>({});
  const [initialStates, setInitialStates] = useState<Record<string, boolean>>({});

  const loadBankAccounts = useCallback(async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      const accounts = await BelvoService.listBankAccountsByLinkId(account.linkId);
      setBankAccounts(accounts);
      
      // Inicializar estados
      const states = accounts.reduce((acc, account) => ({
        ...acc,
        [account.id]: account.status === 'enabled'
      }), {});
      setAccountStates(states);
      setInitialStates(states);
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
      toast({
        title: 'Erro ao carregar contas',
        description: 'Ocorreu um erro ao carregar as contas bancárias.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [account, toast]);

  useEffect(() => {
    if (isOpen && account) {
      loadBankAccounts();
    }
  }, [isOpen, account, loadBankAccounts]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contas Bancárias Vinculadas</DialogTitle>
        </DialogHeader>
        {account && (
          <div className="space-y-6 pr-2">
            <div>
              <h3 className="font-medium mb-2">Instituição</h3>
              <p className="text-sm text-muted-foreground">{account.institutionName}</p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Contas Vinculadas</h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : bankAccounts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma conta encontrada</p>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {bankAccounts.map((bankAccount) => (
                    <div key={bankAccount.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium text-lg">{bankAccount.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{bankAccount.type}</Badge>
                          <Badge variant="secondary">{bankAccount.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">****{bankAccount.number.slice(-4)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Switch
                          checked={accountStates[bankAccount.id]}
                          onCheckedChange={(checked) => {
                            setAccountStates(prev => ({
                              ...prev,
                              [bankAccount.id]: checked
                            }));
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button 
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    // Filtrar apenas as contas que foram alteradas
                    const changedAccounts = Object.entries(accountStates)
                      .filter(([id, state]) => state !== initialStates[id])
                      .map(([id, state]) => ({
                        id,
                        status: state ? 'enabled' as const : 'disabled' as const,
                      }));

                    await BelvoService.updateBankAccounts(changedAccounts);
                    
                    toast({
                      title: 'Contas atualizadas',
                      description: 'As contas foram atualizadas com sucesso.',
                    });
                    
                    // Atualizar estado inicial após sucesso
                    setInitialStates(accountStates);
                  } catch (error) {
                    console.error('Erro ao atualizar contas:', error);
                    toast({
                      title: 'Erro ao atualizar contas',
                      description: 'Ocorreu um erro ao atualizar as contas bancárias.',
                      variant: 'destructive',
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={Object.entries(accountStates).every(
                  ([id, state]) => state === initialStates[id]
                ) || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar alterações'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
