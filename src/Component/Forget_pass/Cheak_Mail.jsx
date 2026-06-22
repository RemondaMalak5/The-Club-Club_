import { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import H_one_register from "../Shared_Component/H_one_register";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { forget } from "../../axiosConfig/APIs/Auth/Forget_pass/Forget";
import { useNavigate } from "react-router-dom";

const Cheak_Mail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleForget = async () => {
        setApiError("");
        setSuccessMsg("");

        if (!phone.trim()) {
            setApiError(t("phone_required"));
            return;
        }

        try {
            setLoading(true);

            const body = {
                phone: phone,
                branch: "sheraton",
                language: i18next.language,
            };

            const response = await forget(body);


            navigate("/forget-otp", {
                state: {
                    formData: {
                        phone: phone,
                    },
                },
            });
            console.log("forget response:", response);

            setSuccessMsg(
                response?.message?.message ||
                response?.message ||
                "Verification message sent successfully"
            );
        } catch (error) {
            setApiError(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Failed to send verification message"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-10 px-4">
            <div className="border p-7 w-full md:w-[70%] lg:w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl">
                <span className="bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]">
                    <TbLockPassword />
                </span>

                <H_one_register title={t("forget_password")} />

                <p className="text-[14px] text-[#6A7282] text-center">
                    {t("سيتم إرسال رسالة التحقق إلى رقم الهاتف .")}
                </p>

                <label className="font-bold text-[15px] text-[#364153] px-1 w-full block">
                    {t("phone_label")}
                </label>

                <input
                    className="border p-3 rounded-lg text-[14px] w-full"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phone_placeholder")}
                />

                {apiError && (
                    <p className="text-red-500 text-sm w-full">{apiError}</p>
                )}

                {successMsg && (
                    <p className="text-green-600 text-sm w-full">{successMsg}</p>
                )}

                <button
                    type="button"
                    onClick={handleForget}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3 disabled:opacity-60"
                >
                    {loading ? t("loading") : t("send_message_btn")}
                </button>
            </div>
        </div>
    );
};

export default Cheak_Mail;