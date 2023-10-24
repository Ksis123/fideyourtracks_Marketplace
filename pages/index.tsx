import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';

const Home: NextPage = () => {

    return (
        <div>

            <BaseLayout>

                    <div className="relative">
                        <div className="text-center">
                            <h2 className="text-3xl tracking-tight font-extrabold text-primary sm:text-3xl">Audio Mp3NFTs</h2>
                            <p className=" max-w-2xl mx-auto text-xl text-[#ffffff57] sm:mt-4">
                                Mint a NFT to get unlimited ownership !
                            </p>
                        </div>
                        <NftList />
                    </div>
            </BaseLayout>
        </div>
    )
}

export default Home