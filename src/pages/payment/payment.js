import * as React from "react";
import { useForm } from "react-hook-form";
import { Steps } from "primereact/steps";
import { useState } from "react";
import TextboxFor from "../../shared/form/textboxFor";
import TextAreaFor from "../../shared/form/textAreaFor";
import ValidationFor from "../../shared/form/validationFor";
import LabelFor from "../../shared/form/labelFor";
import InputDatePickerFor from "../../shared/form/InputDatePickerFor";
import BaseButton from "../../shared/components/baseButton";
import DropdownListFor from "../../shared/form/dropdownListFor";
import { useEffect } from "react";
import { getDoctorAppointmentDates, createAppointment } from "../../store/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useRef } from "react";

export default function Payment() {
    const dispatch = useDispatch();
    const dates = useSelector((state) => state.appointment.doctorAppointmentDates);
    const selectInputRef = useRef();
    const [newAppointment, setNewAppointment] = useState({});

    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [activePage, setActivePage] = useState(0);
    const params = useParams();

    const stepItems = [
        {
            label: "Randevu Bilgileri",
        },
        {
            label: "Ödeme Bilgileri",
        },
    ];

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm();

    const createNewAppointment = (data) => {
        const appointment = {};
        if (typeof data.dateTime === "object") {
            appointment.dateTime = data.dateTime;
        } else {
            appointment.dateTime = {
                value: data.dateTime,
                label: moment(selectedDates[data.dateTime].dateTime).format("HH:mm"),
            };
        }
        appointment.description = data.description;
        appointment.time = data.time;
        setNewAppointment(appointment);
    };
    const onStepSubmitNext = (data) => {
        createNewAppointment(data);
        setActivePage(1);
    };

    const onStepSubmitPrev = () => {
        setValue("dateTime", newAppointment.dateTime.value);
        setActivePage(0);
    };
    const onSubmitfinish = (data) => {
        const newAppointmentData = {
            doktorId: params.id,
            note: newAppointment.description,
            dateTime: selectedDates[newAppointment.dateTime.value].dateTime,
            payment: {
                identityNumber: data.cardNumber,
                cardHolderName: data.cardHolderName,
                cardNumber: data.cardNumber,
                month: data.expiration,
                year: data.expiration,
                cvc: data.cvv,
            },
        };
  
        dispatch(createAppointment(newAppointmentData));
    };

    const changeHourList = (event) => {
        selectInputRef.current.clearValue();
        setSelectedTime(moment(event.target.value).format("DD.MM.YYYY"));
    };

    useEffect(() => {
        dispatch(getDoctorAppointmentDates(params.id));
        const filteredData = dates.filter((obj, index) => {
            const objDate = moment(obj.dateTime).format("DD.MM.YYYY");
            return objDate === selectedTime;
        });

        if (selectedTime && filteredData.length == 0) {
            toast.info(selectedTime + " Tarihindeki Randevu Saatleri Dolu");
        }
        setSelectedDates(filteredData);
    }, [JSON.stringify(selectedTime)]);

    return (
        <div
            style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                backgroundImage: `url(https://images.pexels.com/photos/4046971/pexels-photo-4046971.jpeg)`,
            }}
            className="w-3/5 mx-auto my-[100px] min-w-[700px] rounded-2xl h:[900px] lg:h-[800px] shadow-2xl p-[105px]"
        >
            <Steps activeIndex={activePage} model={stepItems} />
            {activePage == 0 ? (
                <form className="w-3/5 mx-auto" onSubmit={handleSubmit(onStepSubmitNext)}>
                    <h1 className="text-gray-800 font-bold text-lg my-10">Hadi İki Adımda Hızlıca Hızlıca Randevu Oluşturalım :)</h1>
                    <div className="text-left">
                        <fieldset className="flex flex-col">
                            <LabelFor name="time" errors={errors}>
                                Randevu Tarihi
                            </LabelFor>
                            <InputDatePickerFor
                                onChange={(data) => {
                                    changeHourList(data);
                                }}
                                control={control}
                                register={register("time")}
                                errors={errors}
                            />
                            <ValidationFor name="time" title="Lütfen tarih belirleyiniz" errors={errors} />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <LabelFor name="shortName" errors={errors}>
                                Uygun Saatler
                            </LabelFor>
                            <DropdownListFor
                                selectInputRef={selectInputRef}
                                searchPlaceholder={"Seçiniz"}
                                name="dateTime"
                                register={register("dateTime")}
                                data={selectedDates.map((item, index) => {
                                    return {
                                        value: index,
                                        label: moment.utc(item.dateTime).format("HH:mm"),
                                    };
                                })}
                                control={control}
                                errors={errors}
                            />
                            <ValidationFor name="dateTime" title="Lütfen saat aralığı belirleyiniz" errors={errors} />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <LabelFor name="description" errors={errors}>
                                Açıklama
                            </LabelFor>
                            <TextAreaFor placeholder="Açıklama..." register={register("description", { required: true })} errors={errors} />
                            <ValidationFor name="description" title="Açıklama alanını boş bırakmayınız." errors={errors} />
                        </fieldset>
                    </div>
                    <BaseButton className="float-right" text={"İleri"} />
                </form>
            ) : (
                <form className="w-3/5 mx-auto" onSubmit={handleSubmit(onSubmitfinish)}>
                    <h1 className="text-gray-800 font-bold text-lg my-10">Kart Bilgilerin Güvende, Unutma Her Koşulda Ücret İadesi Alabilirsin :)</h1>
                    <div className="text-left">
                        <div>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="cardNumber" errors={errors}>
                                        Kart Numarası
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="0000/0000/0000/0000"
                                        type="cardNumber"
                                        register={register("cardNumber", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="cardNumber" title="Kart Numarası alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                            </div>
                            <div className="flex justify-between text-left">
                                <fieldset className="w-3/5">
                                    <LabelFor name="cardHolderName" errors={errors}>
                                        Kart Üzerindeki İsim
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Örnek Kullanıcı"
                                        type="cardHolderName"
                                        register={register("cardHolderName", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="cardHolderName" title="Kart Üzerindeki İsim alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                                <fieldset className="w-1/5">
                                    <LabelFor name="cvv" errors={errors}>
                                        Cvv
                                    </LabelFor>
                                    <TextboxFor placeholder="000" type="cvv" register={register("cvv", { required: true })} errors={errors} />
                                    <ValidationFor name="cvv" title="Cvv alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                            </div>
                            <div className="flex justify-between text-left">
                                <fieldset className="w-1/5">
                                    <LabelFor name="expiration" errors={errors}>
                                        Son Kullanım
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="00/00"
                                        type="expiration"
                                        register={register("expiration", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="expiration" title="Son Kullanım Tarihi alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onStepSubmitPrev()}
                        className={`float-left block min-w-[120px] bg-[#232323] py-2 rounded-xl text-white font-semibold my-2`}
                    >
                        Geri
                    </button>
                    <BaseButton className="float-right" text={"Ödeme Yap"} />
                </form>
            )}
        </div>
    );
}
