import { Link } from "react-router-dom"
import menCollectionImg from "../../assets/pexels-ahmetyuksek-35121698.jpg"
import womenCollectionImg from "../../assets/pexels-nguy-n-hoang-vi-t-68267093-8511074(1).jpg"

const GenderCollectionSection = () => {
  return (
    <>
        <section className="grid py-16 px-4 sm:px-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Women's collection */}
                <div className="relative flex-1">
                    <img src={womenCollectionImg} alt="" className="w-full h-[700px] object-cover"/>
                    <div className="absolute bottom-8 left-4 sm:left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Women's Collection</h2>
                        <Link to="/collections/all?gender=Women" className="text-gray-900 underline hover:text-[#d73b5a]">Shop Now</Link>
                    </div>
                </div>
                {/* Men's collection */}
                <div className="relative flex-1">
                    <img src={menCollectionImg} alt="" className="w-full h-[700px] object-cover"/>
                    <div className="absolute bottom-8 left-4 sm:left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Men's Collection</h2>
                        <Link to="/collections/all?gender=Men" className="text-gray-900 underline hover:text-[#d73b5a]">Shop Now</Link>
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}

export default GenderCollectionSection