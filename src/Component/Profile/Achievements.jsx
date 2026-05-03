import React from 'react'

const Achievements = () => {
  return (
 <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">الإنجازات</h3>

      <div className="flex justify-between text-center">
        <div>
          <p className="text-green-600 font-bold">18</p>
          <p className="text-xs">عدد الزيارات</p>
        </div>
        <div>
          <p className="text-green-600 font-bold">42</p>
          <p className="text-xs">عدد الأنشطة</p>
        </div>
        <div>
          <p className="text-green-600 font-bold">4.5</p>
          <p className="text-xs">متوسط التقييم</p>
        </div>
      </div>
    </div>  )
}

export default Achievements