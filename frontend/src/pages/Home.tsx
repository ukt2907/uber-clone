import { Link } from "react-router-dom"
import Button from "../components/Button"

const Home = () => {
  return (
    <div className="h-screen font-[gilroy] w-full flex flex-col justify-between bg-cover bg-[url(https://images.pexels.com/photos/2422270/pexels-photo-2422270.jpeg?auto=compress&cs=tinysrgb&w=600)]">
        <h1 className="text-2xl ">Tuk Tuk</h1>
        <div className="bg-neutral-100 flex flex-col p-4 items-start">
            <h1 className="text-4xl font-bold tracking-tight ">Get Started with uber</h1>
            <Link
             className="w-full"
             to="/login"
             >
              <Button name="Continue"/>  
             </Link>
        </div>
    </div>
  )
}

export default Home