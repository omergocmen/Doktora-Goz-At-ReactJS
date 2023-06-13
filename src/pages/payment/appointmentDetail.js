import React from "react";
import { useForm } from "react-hook-form";
import TextboxFor from "../../shared/form/textboxFor";
import ValidationFor from "../../shared/form/validationFor";
import LabelFor from "../../shared/form/labelFor";
import BaseButton from "../../shared/components/baseButton";
import { useDispatch, useSelector } from "react-redux";
import {changeStep} from "../../store/appointmentSlice";

export default function AppointmentDetail() {

    const activePage = useSelector(state=>state.appointment.activePage)
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onStepSubmit = () => {
        dispatch(changeStep(1))
    };
    return (
        <>
            <form className="bg-white w-3/5 mx-auto" onSubmit={handleSubmit(onStepSubmit)}>
                <h1 className="text-gray-800 font-bold text-xl my-10">Hadi Hızlıca Randevu Oluşturalım :)</h1>
                <div className="text-left">
                    <fieldset className="flex flex-col">
                        <LabelFor name="email" errors={errors}>
                           
                        </LabelFor>
                        <TextboxFor placeholder="example@example.com" type="email" register={register("email", { required: true })} errors={errors} />
                        <ValidationFor name="email" title="E-posta alanını boş bırakmayınız." errors={errors} />
                    </fieldset>
                    <fieldset className="flex flex-col">
                        <LabelFor name="password" errors={errors}>
                            Şifre
                        </LabelFor>
                        <TextboxFor placeholder="example" type="password" register={register("password", { required: true })} errors={errors} />
                        <ValidationFor name="password" title="Şifre alanını boş bırakmayınız." errors={errors} />
                    </fieldset>
                </div>
                <BaseButton className="float-right" text={"İleri"} />
            </form>
        </>
    );
}
