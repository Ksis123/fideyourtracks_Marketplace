import type { NextPage } from 'next'
import { BaseLayout } from '@ui'
import { Nft } from '@_types/nft';
import { useOwnedNfts } from '@hooks/web3';
import { useEffect, useState } from 'react';

import ReactAudioPlayer from "react-audio-player";

const tabs = [
  { name: 'Your Collection', href: '#', current: true },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const Profile: NextPage = () => {
  const { nfts } = useOwnedNfts();
  const [activeNft, setActiveNft] = useState<Nft>();
  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActiveNft(nfts.data[0]);
    }

    return () => setActiveNft(undefined)
  }, [nfts.data])

  return (
    <BaseLayout>
      <div className="h-full flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-primary">Your Auido NFTs</h1>
                </div>
                <div className="mt-3 sm:mt-2 ">
                  <div className="hidden xl:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'text-[18px] border-active text-active'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
                <section className="mt-12 pb-16" aria-labelledby="gallery-heading">
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {(nfts.data as Nft[]).map((nft) => (
                      <li
                        key={nft.tokenId}
                        onClick={() => setActiveNft(nft)}
                        className="relative">
                        <div
                          className={classNames(
                            nft.tokenId === activeNft?.tokenId
                              ? 'ring-2 ring-offset-2 ring-active'
                              : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-active',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                          )}
                        >
                          <ReactAudioPlayer
                            controlsList={"nodownload"}
                            src={nft.meta.track} controls
                            className={classNames(
                              nft.tokenId === activeNft?.tokenId ? '' : 'group-hover:opacity-75',
                              'object-cover pointer-events-none'
                            )}
                          />

                        </div>
                        <p className="mt-2 block text-sm font-medium text-secondary truncate pointer-events-none">
                          {nft.meta.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>
            <aside className="hidden w-[450px]  bg-[#c89a6d3c] p-8 rounded-[35px] border-gray-200 overflow-y-auto lg:block">
              {activeNft &&
                <div className=" space-y-6">
                  <div>
                    <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                      <ReactAudioPlayer
                        controlsList={"nodownload"}
                        src={activeNft.meta.track} controls
                        className="object-cover"
                      />

                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h2 className="mt-2 text-lg font-bold text-active">
                          <span className="sr-only">Details for </span>
                          {activeNft.meta.name}
                        </h2>
                        <p className="mt-2 text-sm font-medium text-secondary">{activeNft.meta.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      disabled={activeNft.isListed}
                      onClick={() => {
                        nfts.listNft(
                          activeNft.tokenId,
                          activeNft.price
                        )
                      }} type="button"
                      className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-active"                    >
                      {activeNft.isListed ? "Nft is listed" : "List Nft"}
                    </button>

                    <button
                      onClick={async () => {
                        const track = await fetch(activeNft.meta.track)
                        const tracBlog = await track.blob()
                        const trackURL = URL.createObjectURL(tracBlog)

                        const filename = (activeNft.meta.name) as string

                        const link = document.createElement('a')
                        link.href = trackURL
                        link.download = filename
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      type="button"
                      className="font-bold ml-5 flex-1 dowloadbutton px-1 border border-transparent rounded-md shadow-sm text-sm  text-white hover:bg-active focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-active"
                    >
                      Download
                    </button>

                  </div>
                </div>
              }
            </aside>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
export default Profile