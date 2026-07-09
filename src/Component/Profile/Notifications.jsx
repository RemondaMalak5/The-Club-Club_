import { Bell } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold">{t("notifications")}</h3>
        <Bell size={18} />
      </div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex justify-between items-center py-2 border-b"
        >
          <p className="text-sm">{t("new_points_added")}</p>
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
      ))}
    </div>  )
}

export default Notifications