import { User } from 'lucide-react'
import React from 'react'

const FamilyMembers = () => {
  return (
 <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">أفراد العائلة</h3>

      {["محمد", "أحمد", "زياد"].map((name, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>{name}</span>
          </div>

          <User size={16} />
        </div>
      ))}
    </div>  )
}

export default FamilyMembers