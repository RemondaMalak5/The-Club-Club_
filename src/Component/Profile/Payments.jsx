import React from 'react'

const Payments = () => {
  return (
 <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">سجل المدفوعات</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500">
            <th>التاريخ</th>
            <th>الوصف</th>
            <th>المبلغ</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>2025</td>
            <td>اشتراك</td>
            <td>500 جنيه</td>
          </tr>
        </tbody>
      </table>
    </div>  )
}

export default Payments