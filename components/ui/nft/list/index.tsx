import { useListedNfts } from "@hooks/web3";
import { FunctionComponent } from "react";
import { Nft } from "../../../../types/nft";
import NftItem from "../item";


const NftList: FunctionComponent = () => {
  const { nfts } = useListedNfts();

  return (
    <div className="p-2 mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      { nfts.data?.map(nft =>
        <div key={nft.meta.track} className="rounded-[35px] drop-shadow-lg flex flex-col backdrop-blur-sm shadow-lg overflow-hidden">
          <NftItem
            item={nft}
            buyNft={nfts.buyNft}
          />
        </div>
      )}
    </div>
  )
}
export default NftList;