import { FunctionComponent } from "react";
import { NftMeta, Nft } from "../../../../types/nft";
import ReactAudioPlayer from "react-audio-player";

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}

function shortifyAddress(address: string) {
  return `${address}`
}

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
  return (
    <>
      <div className="flex-1 bg-[#efece91c] p-5 flex flex-col justify-between">
        <div className="p-2 items-center">
          <ReactAudioPlayer
            src={item.meta.track} controls
            className="drop-shadow-2xl"
          />
        </div>
        <div className="block mt-2">
          <p className="text-sm font-medium text-[#ffffff] ">Owner</p>
          <p className="text-sm font-medium text-[#bdb3b3] ">by {shortifyAddress(item.creator)}</p>
        </div>
        <div className="flex-1">

          <div className="block mt-2">
            <p className="text-xl font-semibold text-[#ffffff]">{item.meta.name}</p>
            <p className="mt-3 mb-3 text-base text-[#dcd4cf]">{item.meta.description}</p>
          </div>
        </div>
        <div className="overflow-hidden mb-4">
          <dl className="-mx-4 -mt-4 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <div className="order-2 text-lm font-medium text-[#b7b1b1]">Price</div>
              <dd className="order-1 text-xl font-extrabold text-active">
                <div className="flex justify-center items-center">
                  {item.price}
                  <img className="h-6 drop-shadow-2xl" src="/images/small-eth.webp" alt="ether icon" />
                </div>
              </dd>

            </div>

          </dl>
        </div>
        <div className="text-right">
          <button
            onClick={() => {
              buyNft(item.tokenId, item.price);
            }}
            type="button"
            className=" button disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Buy
          </button>
        </div>
      </div>
    </>
  )
}
export default NftItem;