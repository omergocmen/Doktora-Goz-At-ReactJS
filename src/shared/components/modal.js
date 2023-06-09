import { useForm } from "react-hook-form";
import LabelFor from "../form/labelFor";
import TextAreaFor from "../form/textAreaFor";
import ValidationFor from "../form/validationFor";
import BaseButton from "./baseButton";

export default function Modal() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const cancelAppointment = () => {
    };
    return (
        <div>
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" />
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center sm:px-6">
                <form className="bg-white w-[400px] rounded-lg p-10" onSubmit={handleSubmit(cancelAppointment)}>
                    <div className="text-left">
                        <fieldset className="flex flex-col">
                            <LabelFor name="description" errors={errors}>
                                Red açıklaması
                            </LabelFor>
                            <TextAreaFor
                                placeholder="Örnek açıklama..."
                                type="description"
                                register={register("description", { required: true })}
                                errors={errors}
                            />
                            <ValidationFor name="description" title="Red açıklaması alanını boş bırakmayınız." errors={errors} />
                        </fieldset>
                    </div>
                    <BaseButton className="w-full" text={"Reddet"} />
                </form>
            </div>
        </div>
    );
}
