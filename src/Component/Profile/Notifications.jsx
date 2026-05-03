import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold">الإشعارات</h3>
        <Bell size={18} />
      </div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex justify-between items-center py-2 border-b"
        >
          <p className="text-sm">تم إضافة نقاط جديدة</p>
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
      ))}
    </div>  )
}

export default Notifications