
import { FunctionComponent } from "react";
import Navbar from "../navbar";
const BaseLayout: FunctionComponent = ({ children }) => {

  return (
    <>
      <div className="drop-shadow-2xl">
        <Navbar />
      </div>
      <div className="text-center them py-8">
        <h1 className="text-5xl tracking-tight font-bold text-primary md:text-6xl lg:texr-7xl xl:text-[5rem]">Audio
          <span className='italic text-[#c7c5c2] duration-500 hover:text-[#ff983d] '> NFTs Marketplace</span>
        </h1>
        <p className=" max-w-2xl mx-auto text-xl text-[#ffffff57] sm:mt-4">
          Welcome to get unlimited ownership !
        </p>
      </div>
      <div className="them  min-h-screen ">
        <div className="max-w-7xl mx-auto  p-3">
          {children}
        </div>
      </div>
    </>
  )
}

export default BaseLayout;
