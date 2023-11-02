import { FunctionComponent } from "react";
import { NftMeta, Nft } from "../../../../types/nft";
import ReactAudioPlayer from "react-audio-player";

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}

function shortifyAddress(account: string) {
  return `${account[0]}${account[1]}${account[2]}${account[3]}${account[4]}${account[5]}${account[6]}....${account.slice(-5)}`
}

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
  return (
    <>
      <div className="flex-1 bg-[#efece91c] p-5 flex flex-col justify-between">
        <div className="p-2 items-center" >
          <ReactAudioPlayer
            controlsList={"nodownload"}
            src={item.meta.track} controls
            className="drop-shadow-2xl"
            
          />
        </div>
        <div className="flex-1">
          <div className="block mt-5">
            <p className="text-[24px] font-bold text-[#ffffff]">{item.meta.name}</p>
            <p className="mt-3 mb-3 font-[10px] text-[16px] text-[#dcd4cf]">{item.meta.description}</p>
          </div>
        </div>
        <div className="block ">
          <p className="text-[20px] text-[#ffffff] ">Original</p>
          <p className="text-[22px] text-[#bdb3b3] ">by {shortifyAddress(item.creator)}</p>
        </div>
        <div className="overflow-hidden mt-2">
          <dl className="-mx-4 -mt-4 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <div className="order-2 text-lm font-medium text-[#b7b1b1]">Price</div>
              <dd className="order-1 text-[22px] font-extrabold ">
                <div className="flex justify-center items-center text-[#ffffff]">
                  {item.price}
                  <img className="h-10 drop-shadow-2xl " src="/images/small-eth.webp" alt="ether icon" />
                  <h6 className="text-[#bbbac6] drop-shadow-2xl">ETH</h6>
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
            className="font-bold button disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent  rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  )
}
export default NftItem;