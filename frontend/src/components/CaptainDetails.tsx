import { MdOutlineSpeed } from "react-icons/md"
import { RiBookletLine } from "react-icons/ri"


const CaptainDetails = () => {
  return (
    <>
    <div className="flex items-center flex-col  gap-2">
    <MdOutlineSpeed className="text-3xl"/>
    <h2>10.2</h2>
    <p>Hours Online</p>
    </div>
    <div className="flex items-center flex-col  gap-2">
    <MdOutlineSpeed className="text-3xl "/>
    <h2>10.2</h2>
    <p>Hours Online</p>
    </div>
    <div className="flex items-center flex-col  gap-2">
    <RiBookletLine  className="text-3xl "/>
    <h2>10.2</h2>
    <p>Hours Online</p>
    </div>
    </>
  )
}

export default CaptainDetails