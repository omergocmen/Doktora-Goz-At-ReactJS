import { Rating } from "primereact/rating";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LinkButton from "../../shared/components/linkButton";
import { getDoctorById } from "../../store/doctorSlice";

export default function DoctorDetail() {
    const education = [
        {
            text: "Lisans",
            description: "Hacettepe Tıp Fakültesi",
        },
        {
            text: "Yüksek Lisans",
            description: "Cerrahpaşa Tıp Fakültesi",
        },
        {
            text: "Doktora",
            description: "Cerrahpaşa Tıp Fakültesi",
        },
    ];
    const dispatch = useDispatch();
    const params = useParams();
    const doctor = useSelector((state) => state.doctor.doctor);
    useEffect(() => {
        dispatch(getDoctorById(params.id));
    }, []);
    const saveBasketClick = () => {};

    return (
        <section className="text-gray-700 body-font shadow-lg mt-10 overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="justify-between text-left w-auto mx-auto flex flex-col md:flex-row">
                    <div className="responsive-width w-full bg-gray-100 px-20">
                        <img
                            alt="ecommerce"
                            className="h-[300px] min-w-[100px] circle object-center rounded-full mt-12 border border-gray-200"
                            src={
                                "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000"
                            }
                        />
                        <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5">
                            <h1 className="text-gray-900 text-xl title-font font-medium">Eğitim ve Kariyer</h1>
                            <div className="grid max-w-2xl mx-auto mt-3">
                                {education.map((item, index) => {
                                    return (
                                        <div key={index} className="flex flex-col mt-2 pb-6 sm:items-center w-full sm:flex-row sm:pb-0">
                                            <div className="sm:mr-5">
                                                <div className="flex items-center !bg-transparent w-12 h-12 rounded-full sm:w-24 sm:h-24">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="52"
                                                        height="52"
                                                        fill="currentColor"
                                                        className="bi bi-bank"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 
                                                        .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 
                                                        14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 
                                                        7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 
                                                        9H1.39l-.25 1h13.72l-.25-1z" />
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
                    <div className="w-4/5 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-lg title-font text-gray-500 tracking-widest">
                            {doctor?.title?.toUpperCase() + " " + doctor.user?.name + " " + doctor.user?.surname}
                        </h2>
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
                        <div className="flex mt-10">
                            <LinkButton href={"/home/payment/"+params.id} className="w-[300px] text-center" onClick={saveBasketClick} text={"Randevu Talebinde Bulun"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
