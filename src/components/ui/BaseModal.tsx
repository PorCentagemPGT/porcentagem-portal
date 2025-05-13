"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  onSave?: () => void
  showActions?: boolean
  saveLabel?: string
  isLoading?: boolean
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSave,
  showActions = true,
  saveLabel = "Salvar",
  isLoading = false,
}: BaseModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content
          className={cn(
            "fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg h-[450px]"
          )}
        >
          <Dialog.Title className="text-lg font-bold text-center mt-16">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-4">{children}</div>

          {showActions && (
            <div className="mt-6 flex justify-center space-x-2 w-full">
              <Dialog.Close asChild>
                <div className="rounded-md p-[2px] bg-gradient-to-r from-[#169DA0] to-[#2FCCAB]">
                  <Button
                    variant="secondary"
                    disabled={isLoading}
                    className="bg-white text-[#047857] border-none w-[190px] h-full px-4 py-2"
                  >
                    Cancelar
                  </Button>
                </div>
              </Dialog.Close>

              <div className="rounded-md p-[2px] bg-gradient-to-r from-[#169DA0] to-[#2FCCAB]">
                <Button onClick={onSave} disabled={isLoading} className="w-[190px]">
                  {isLoading ? "Salvando..." : saveLabel}
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
