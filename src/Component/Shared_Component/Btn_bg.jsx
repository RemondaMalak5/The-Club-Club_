import React from 'react'

const Btn_bg = ({btn, onClick}) => {
  return (
    <div onClick={onClick} className='bg-gradient-to-r from-[rgba(8,172,133,0.86)] to-[#00786F] rounded-xl px-7 w-fit py-3
     text-white cursor-pointer'>
        {btn}
    </div>
  )
}

export default Btn_bg