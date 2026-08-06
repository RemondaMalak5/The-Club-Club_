import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Myappicant } from "../../axiosConfig/APIs/Profile/MyAppicant";

const AcademyApplications = () => {
  const { t } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplications = async () => {
    try {
      setLoading(true);

      const params = {
        language: i18next.language,
      };

      const response = await Myappicant(params);

      console.log("Applications Response:", response);

      setApplications(response?.message?.data || []);
    } catch (error) {
      console.log("Applications Error:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, [i18next.language]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-100 text-yellow-700";

      case "Admitted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        جاري تحميل الطلبات...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">
        طلبات الأكاديميات
      </h2>

      {applications.length === 0 ? (
        <div className="bg-gray-50 border rounded-2xl p-8 text-center text-gray-500">
          لا توجد طلبات حتى الآن
        </div>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {application.programName}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {application.applicantName}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusStyle(
                  application.status
                )}`}
              >
                {application.statusText}
              </span>
            </div>

            <div className="border-t mt-5 pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div>
                <p className="text-xs text-gray-500">
                  رقم الطلب
                </p>

                <p className="font-semibold mt-1">
                  {application.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  الفرع
                </p>

                <p className="font-semibold mt-1">
                  {application.branchName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  السنة الأكاديمية
                </p>

                <p className="font-semibold mt-1">
                  {application.academicYear}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  تاريخ التقديم
                </p>

                <p className="font-semibold mt-1">
                  {application.applicationDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  نوع المتقدم
                </p>

                <p className="font-semibold mt-1">
                  {application.isDependant
                    ? "عضو تابع"
                    : "العضو الأساسي"}
                </p>
              </div>

              {application.rejectionReason && (
                <div>
                  <p className="text-xs text-gray-500">
                    سبب الرفض
                  </p>

                  <p className="font-semibold mt-1 text-red-600">
                    {application.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcademyApplications;