/* eslint-disable @next/next/no-img-element */

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAccount, useNetwork } from '@hooks/web3';
import ActiveLink from '../link';
import Walletbar from './Walletbar';

const navigation = [
    { name: 'Marketplace', href: '/', current: true },
    { name: 'Upload', href: '/nft/create', current: false }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const { account } = useAccount();
    const { network } = useNetwork();

    return (
        <Disclosure as="nav" className="bg-[#1b1919f3] drop-shadow-2xl">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-20 ">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#5b392af3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="pl-[12rem]flex-shrink-0 flex items-center font-bold">
                                    <img
                                        className="hidden lg:block h-10 w-auto"
                                        src="/images/logofyt2.png"
                                        alt="Workflow"
                                    />
                                    <h1 className='text-3xl ml-7 font-bold drop-shadow-lg'>
                                        <b className='text-primary hover:text-[#ff983d]'> Fide</b><b className='text-[#f4efeb]'> yourtracks</b>
                                    </h1>
                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:block sm:ml-10 pr-[1rem]">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <ActiveLink
                                                key={item.name}
                                                href={item.href}
                                                activeClass="bg-[#3b2e26] text-primary hover:bg-primary hover:text-secondary"
                                            >
                                                <a
                                                    className={classNames(
                                                        item.current ? ' text-[#ff6d38]' : 'text-gray-300  hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            </ActiveLink>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-gray-300 self-center mr-2 ">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-secondary text-primary">
                                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                            <circle cx={4} cy={4} r={3} />
                                        </svg>
                                        {network.isLoading ?
                                            "Loading..." :
                                            account.isInstalled ?
                                                network.data :
                                                "Install Web3 Wallet"
                                        }
                                    </span>
                                </div>
                                <Walletbar
                                    isInstalled={account.isInstalled}
                                    isLoading={account.isLoading}
                                    connect={account.connect}
                                    account={account.data}
                                />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-active text-white' : 'text-gray-300 hover:bg-active hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}