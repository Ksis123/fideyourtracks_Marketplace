import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';
import { useNetwork } from '@hooks/web3';
import { ExclamationIcon } from '@heroicons/react/solid';

const Home: NextPage = () => {
    const { network } = useNetwork();

    return (
        <div>
            <BaseLayout>
                <div className="relative">
                    <div className="text-center">
                        <h1 className="text-5xl tracking-tight font-bold text-primary md:text-6xl lg:texr-7xl xl:text-[5rem]">Audio
                            <span className='italic text-[#c7c5c2] hover:text-[#ff983d] '> NFTs Marketplace</span>
                        </h1>
                        <p className=" max-w-2xl mx-auto text-xl text-[#ffffff57] sm:mt-4">
                            Welcome to get unlimited ownership !
                        </p>
                    </div>
                    {network.isConnectedToNetwork ?
                        <NftList /> :
                        <div className="rounded-md bg-yellow-50 p-4 mt-10">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationIcon className="h-5 w-5 text-active" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                            {network.isLoading ?
                                                "Loading..." :
                                                `Connect to ${network.targetNetwork}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </BaseLayout>
        </div>
    )
}

export default Home