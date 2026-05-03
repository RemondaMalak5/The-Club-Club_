import React from 'react'

const QuickActions = () => {
  return (
 <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">إجراءات سريعة</h3>

      {["حجز نشاط", "تجديد العضوية", "تواصل معنا"].map((item, i) => (
        <button
          key={i}
          className="w-full border rounded-lg py-2 mb-2 hover:bg-gray-50"
        >
          {item}
        </button>
      ))}
    </div>  )
}

export default QuickActions