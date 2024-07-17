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

                    {network.isConnectedToNetwork ?
                        <NftList /> :
                        <div className="rounded-md bg-yellow-50 p-4 mt-10 ">
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