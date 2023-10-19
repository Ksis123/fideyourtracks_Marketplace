import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';

const Home: NextPage = () => {

    return (
        <div>

            <BaseLayout>

                <div className="relative bg-gray-50 pt-10 pb-10 px-4 sm:px-6 lg:pt-5 lg:pb-28 lg:px-5">
                    <div className="absolute inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3" />
                    </div>
                    <div className="relative">
                        <div className="text-center">
                            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-3xl">Audio Mp3NFTs</h2>
                            <p className=" max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                                Mint a NFT to get unlimited ownership !
                            </p>
                        </div>
                        <NftList />
                    </div>
                </div>
            </BaseLayout>
        </div>
    )
}

export default Home