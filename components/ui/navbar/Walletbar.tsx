import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FunctionComponent } from "react";


type WalletbarProps = {
    isLoading: boolean;
    isInstalled: boolean;
    account: string | undefined;
    connect: () => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Walletbar: FunctionComponent<WalletbarProps> = ({
    isInstalled,
    isLoading,
    connect,
    account
}) => {

    if (isLoading) {
        return (
            <div>
                    Loading ...
            </div>
        )
    }

    if (account) {
        return (
            <Menu as="div" className="ml-5 relative">
                <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="/images/profile.png"
                            alt=""
                        />
                    </Menu.Button>
                </div>

                <Menu.Items className=" z-10 origin-top-right absolute right-0 mt-8 w-[250px] rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {() => (
                            <button
                                disabled={true}
                                className="text-[22px] disabled:text-gray-500 text-xs block px-4 pt-6 text-gray-700">
                                {`${account[0]}${account[1]}${account[2]}${account[3]}${account[4]}${account[5]}${account[6]}....${account.slice(-5)}`}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <Link href="/profile">
                                <a
                                    className={classNames(active ? 'bg-gray-100 ' : '', 'text-[20px] block pt-6 px-4 py-2 text-sm text-gray-700')}
                                >
                                    My collection
                                </a>
                            </Link>

                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        )
    }

    if (isInstalled) {
        return (
            <div>
                <button
                    onClick={() => {
                        connect()
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[#4e4b49] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Connect Wallet
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button
                    onClick={() => {
                        window.open('https://metamask.io', '_ blank');
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary hover:bg-active focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    No Wallet
                </button>
            </div>
        )
    }
}

export default Walletbar;