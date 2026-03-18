import React from 'react'
import Map_component from './Map_component'
import Btn_bg from '../Shared_Component/Btn_bg'

const Branches_component = () => {
  const Branches = [
    {
      name: "فرع 6th of October",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "0123456789",
    },
      {
      name: "فرع 6th of October",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "0123456789",
    } ,
     {
      name: "فرع 6th of October",
      address: "شارع 6 أكتوبر، الجيزة",
      phone: "0123456789",
    }
  ];

  return (
    <div className='px-14  py-5'>
      <h1 className='text-[32px] font-bold text-[#11181C] pb-5 '>الفروع والخريطة</h1>
      <div className='w-full flex flex-wrap '>
        <div className='w-full md:w-1/2 p-4 border rounded-xl border-[#E5E7EB] shadow-sm'>
          <h2 className='text-[24px] font-bold text-[#11181C] pb-3 text-center'>فروعنا</h2>
          {Branches.map((e, index) => (
            <div key={index} className='border rounded-xl my-2 border-[#E5E7EB] p-4  flex justify-between'>
              <div className='flex flex-col gap-2 '>
                <h2>{e.name}</h2>
                <p className='flex gap-2'>{e.address} <span className='text-[#6B7280]'>{e.phone}</span></p>
                <div className='flex gap-3 '>
                  <Btn_bg btn={"احجز نشاط"} />
                  <button className='border border-[#00786F] rounded-xl px-5 py-2 text-[#6A7282]'>احجز خدمه </button>
                </div>
              </div>
              <div>
                <h2 className='bg-[#EFF4F2] text-[#1E2939] rounded-full px-5 py-2 font-semibold'>Open</h2>
              </div>

            </div>
          ))}
        </div>
        
        <Map_component />

      </div>
    </div>
  )
}

export default Branches_component
