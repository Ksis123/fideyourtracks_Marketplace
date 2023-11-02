
import { FunctionComponent } from "react";
import Navbar from "../navbar";
const BaseLayout: FunctionComponent = ({ children }) => {

  return (
    <>
      <div className="drop-shadow-2xl">
        <Navbar />
      </div>
      <div className="py-16 them  min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </>
  )
}

export default BaseLayout;
