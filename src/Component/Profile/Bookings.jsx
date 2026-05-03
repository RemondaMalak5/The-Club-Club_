import React from 'react'

const Bookings = () => {
  return (
  <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">الحجوزات القادمة</h3>

      {[1, 2].map((item) => (
        <div
          key={item}
          className="flex justify-between items-center mb-3"
        >
          <div>
            <p className="font-semibold">درس سباحة</p>
            <p className="text-xs text-gray-500">
              10:00 - 11:00
            </p>
          </div>

          <button className="bg-green-500 text-white px-3 py-1 rounded">
            التفاصيل
          </button>
        </div>
      ))}
    </div>  )
}

export default Bookings