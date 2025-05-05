'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BanknotesIcon, BellIcon, ChartBarIcon, HomeIcon, RectangleGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { classNames } from '@/utils/styles';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const navigation = [
  { title: "Menu", name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Notificações', href: '/notification', icon: BellIcon, className: 'mb-8' },
  { title: "Ações", name: 'Minhas Categorias', href: '/categories', icon: RectangleGroupIcon },
  { name: 'Meus Bancos', href: '/banks', icon: BanknotesIcon },
  { name: 'Configurações', href: '/configurations', icon: Cog8ToothIcon },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col overflow-y-auto bg-white px-6 py-4">
                  <div className="rounded-2xl bg-gray-200 h-[calc(100vh-2rem)] p-3">
                    <div className="flex h-16 shrink-0 items-center justify-center mb-4">
                      <Image
                        src="/logo.png"
                        alt="PorCentagem"
                        width={40}
                        height={40}
                        priority
                        className="mb-2"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {item.title && (
                                  <div className="px-2 py-1 text-xs font-medium text-gray-500">
                                    {item.title}
                                  </div>
                                )}
                                <a
                                  href={item.href}
                                  className={classNames(
                                    pathname === item.href
                                      ? 'text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                    item.className || ''
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      pathname === item.href
                                        ? 'text-indigo-600'
                                        : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-6 py-4">
          <div className="rounded-2xl bg-gray-200 h-[calc(100vh-2rem)] p-3">
            <div className="flex h-16 shrink-0 items-center justify-center mb-4">
              <Image
                src="/logo.png"
                alt="PorCentagem"
                width={40}
                height={40}
                priority
                className="mb-2"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {item.title && (
                          <div className="px-2 py-1 text-xs font-medium text-black">
                            {item.title}
                          </div>
                        )}
                        <a
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? 'text-gray-500'
                              : 'text-gray-700 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            item.className || ''
                          )}
                        >
                          <item.icon
                            className={classNames(
                              pathname === item.href
                                ? 'text-gray-500'
                                : 'text-black group-hover:text-gray-500',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
