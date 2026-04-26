import React from 'react'
import Title_1 from '../Shared_Component/Title_1'
import { assets } from '../../assets/assets'

const About_us_goals = () => {
    const goals=[
        {goal :"بناء مجتمع رياضي واجتماعي إيجابي يخدم المجتمع المصري."},
    {goal:"تقديم أنشطة ومرافق رياضية واجتماعية عالية الجودة."},
        {goal:"تقديم أنشطة ومرافق رياضية واجتماعية عالية الجودة."},
    {goal:"تقديم أنشطة ومرافق رياضية واجتماعية عالية الجودة."},

    ]
  return (
    <div className='bg-[#E9F0F0] px-10 py-5'>
        <div className='w-full flex flex-wrap '>
          <div className='xl:w-2/3 w-full'> 
                  <Title_1  title={"اهدفنا"}/>
          {goals.map((e,index)=>(
 <div key={index} className='flex flex-col'>
                <p>{e.goal}</p>
            </div>
          ) )}
         
          </div>
          <div className='xl:w-1/3 w-full '>
          <div className="relative w-[180px] h-[230px] ">
                      <div className=" absolute top-0 right-4 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                      
                        <div className="absolute inset-0 bg-[#277C79]"></div>
                      </div>
          
                      <div className="absolute top-10 right-24 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                        <img
                          src={assets.goals}
                          alt="football"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
          </div>
        </div>

    </div>
  )
}

export default About_us_goals