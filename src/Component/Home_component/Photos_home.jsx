import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/assets";

const Photos_home = () => {

 const cards = [
    {
      title: "هاي الجري",
      img: assets.image_1,
    },
    {
      title: "هاي اليوجا",
      img: assets.image_2 ,
    },
    {
      title: "رفع كرات",
      img: assets.image_3,
    },
    {
      title: "كرة القدم",
      img: assets.image_4,
    },
  ];

  // const [current, setCurrent] = useState(0);

  // const nextSlide = () => {
  //   setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  // };

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // };

  return (
    <div className=" px-14 py-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[36px] font-bold ">صور  <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">     وفيديو
 </span></h2>

        <button className="border border-teal-600 text-teal-600 px-4 py-1 rounded-full text-[18px]">
          عرض المزيد
        </button>

      </div>

      {/* slider */}
     <div className="border shadow-md p-5">
        <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[420px]">

        {/* الفيديو الكبير */}
        <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative">
         <video
  autoPlay
  muted
  loop
  className="w-full h-full object-cover"
  poster={assets.fallbackImage} // صورة تظهر لو الفيديو مش موجود
>
  <source src={assets.v} type="video/mp4" />
</video>

          <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
            فيديو يوتيوب
          </span>
        </div>

        {/* الكروت الصغيرة */}
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
            />

            <span className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
              {card.title}
            </span>
          </div>
        ))}
      </div>
    </div>

     </div>
    </div>

  );
};

export default Photos_home;