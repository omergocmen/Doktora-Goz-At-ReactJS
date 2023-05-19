import { Rating } from "primereact/rating";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseButton from "../../shared/components/baseButton";
import { getDoctorById } from "../../store/doctorSlice";

export default function DoctorDetail() {
    const education=[
    {
        text:"Lisans",
        description: "Hacettepe Tıp Fakültesi"
    },
    {
        text:"Yüksek Lisans",
        description: "Cerrahpaşa Tıp Fakültesi"
    },
    {
        text:"Doktora",
        description: "Cerrahpaşa Tıp Fakültesi"
    }]
    const dispatch = useDispatch();
    const params = useParams();
    const doctor = useSelector(state=>state.doctor.doctor)
    useEffect(() => {
        dispatch(getDoctorById(params.id));
    }, [JSON.stringify(doctor)]);
    const saveBasketClick = () => {
    };

    return (
        <section className="text-gray-700 body-font shadow-lg mt-10 overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="justify-between text-left lg:w-4/5 mx-auto flex flex-col md:flex-row">
                    <div className="w-3/5 bg-gray-100 px-20">
                        <img
                            alt="ecommerce"
                            className="h-[300px] min-w-[100px] circle object-center rounded-full mt-12 border border-gray-200"
                            src={"https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000"}
                        />
                        <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5">
                            <h1 className="text-gray-900 text-xl title-font font-medium">Eğitim ve Kariyer</h1>
                            <div className="grid max-w-2xl mx-auto mt-3">
                                {education.map((item, index) => {
                                    return (
                                        <div key={index} className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                                            <div className="sm:mr-5">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                                                    <svg
                                                        className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                                        stroke="currentColor"
                                                        viewBox="0 0 52 52"
                                                    >
                                                        <polygon
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill="none"
                                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xl font-semibold sm:text-base">{item.text}</p>
                                                <p className="text-sm text-gray-700">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-lg title-font text-gray-500 tracking-widest">{doctor?.title?.toUpperCase()+" "+doctor.user?.name+" "+doctor.user?.surname}</h2>
                        <h1 className="text-gray-900 text-sm title-font font-medium my-4">{doctor.branch?.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <span className="text-gray-600">{doctor.point_count} Değerlendirme</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <Rating value={doctor.point} readOnly cancel={false} />
                            </span>
                        </div>
                        <p className="leading-relaxed">{doctor.description}</p>
                        <div className="grid gap-y-10">
                            <h1 className="text-gray-900 text-center text-xl title-font font-medium mt-8">Başarımlar ve Yetkinlikler</h1>
                            <div className="flex text-left">
                                <i className="pi pi-check" style={{ fontSize: "2rem" }} />
                                <p className="mx-4">
                                    Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts
                                    keytar banjo tattooed umami cardigan.
                                </p>
                            </div>
                            <div className="flex text-left">
                                <i className="pi pi-check" style={{ fontSize: "2rem" }} />
                                <p className="mx-4">
                                    Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts
                                    keytar banjo tattooed umami cardigan.
                                </p>
                            </div>
                            <div className="flex text-left">
                                <i className="pi pi-check" style={{ fontSize: "2rem" }} />
                                <p className="mx-4">
                                    Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts
                                    keytar banjo tattooed umami cardigan.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <BaseButton onClick={saveBasketClick} text={"Randevu Talebinde Bulun"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
