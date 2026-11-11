import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Myappicant } from "../../axiosConfig/APIs/Profile/MyAppicant";

const Guest_Academy_Applications = () => {
  const { t, i18n } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getApplications = async () => {
      try {
        setLoading(true);
        const response = await Myappicant({ language: i18n.language });
        const list = response?.message?.data;
        if (isMounted) {
          setApplications(Array.isArray(list) ? list : []);
        }
      } catch {
        if (isMounted) {
          setApplications([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getApplications();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

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

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-[#F8F8F8] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#172033]">
          {t("academy_applications")}
        </h2>

        <span className="rounded-full bg-[#E8F7F5] px-3 py-1 text-xs font-semibold text-[#00786F]">
          {applications.length}
        </span>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white py-8 text-center text-sm text-gray-500">
          {t("loading")}
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl bg-white py-10 text-center">
          <IoDocumentTextOutline className="mx-auto mb-3 text-5xl text-gray-300" />
          <p className="text-sm text-gray-500">
            {t("no_academy_applications")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {application.programName || "-"}
                  </h3>
                  {application.applicantName && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {application.applicantName}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    application.status
                  )}`}
                >
                  {application.statusText || application.status || "-"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t pt-3 text-xs">
                <div>
                  <p className="text-gray-400">{t("application_number")}</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {application.id || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">{t("branch_label")}</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {application.branchName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">{t("application_date")}</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {application.applicationDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">{t("academic_year")}</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {application.academicYear || "-"}
                  </p>
                </div>
              </div>

              {application.rejectionReason && (
                <div className="mt-3 rounded-xl bg-red-50 p-2.5 text-xs text-red-700">
                  <span className="font-bold">{t("rejection_reason")}: </span>
                  {application.rejectionReason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Guest_Academy_Applications;
