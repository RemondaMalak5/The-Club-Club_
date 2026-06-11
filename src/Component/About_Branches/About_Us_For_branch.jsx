import React from "react";
import { assets } from "../../assets/assets";

const About_Us_For_branch = ({ data }) => {
  const image = [  assets.image_1,
     assets.image_2,
    assets.image_3,
    assets.image_4,]

    
  return (
    <div className="w-full flex flex-wrap  ">
      {/* Text */}
      <div className="w-full md:w-1/2">
        <h2 className="text-[44px] font-bold text-[#00786F]">عن النادي</h2>

        <p className="text-[#4A5565] font-medium text-[20px] py-3">
          {data?.ourClub?.intro}
        </p>
      </div>

      {/* Images */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-5">
       <div className="grid grid-cols-2 gap-4">
  {image.map((e, index) => (
    <div key={index}>
      <img
        src={e}
        loading="lazy"
        className="w-full h-36 object-cover rounded-xl"
        alt=""
      />
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default About_Us_For_branch;
