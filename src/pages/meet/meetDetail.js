import React, { useEffect, useRef, useState } from "react";
import BaseButton from "../../shared/components/baseButton";
import { complateMeet, getMeetingById, getMeetingComments, sendComment } from "../../store/meetSlice";
import { sendPoint } from "../../store/scoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import { toast } from "react-toastify";
import moment from "moment";
import TextareaFor from "../../shared/form/textAreaFor";
import LabelFor from "../../shared/form/labelFor";
import ValidationFor from "../../shared/form/validationFor";
import { useForm } from "react-hook-form";
import { Message } from 'primereact/message';

export default function MeetDetail() {
    const dispatch = useDispatch();

    const params = useParams();

    const [value, setValue] = useState(0);
    const meet = useSelector((state) => state.meet.meet);
    const comments = useSelector((state) => state.meet.getMeetingComments);
    const commentMessage = useRef();

    const role = localStorage.getItem("userType");
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    let currentDate = new Date();
    const timeZone = 3;
    currentDate.setTime(currentDate.getTime() + timeZone * 60 * 60 * 1000);


    useEffect(() => {
        setVisible(meet.isVoted ? true : false);
    }, [JSON.stringify(meet)]);

    useEffect(() => {
        dispatch(getMeetingById(params.id));
        dispatch(getMeetingComments(params.id));
    }, []);

    const users = meet.appointment;
    const diagnosisReportTime = moment(users?.date_time).add(30, "m").toDate().toJSON();
    const doctor = users?.doctor.title + " " + users?.doctor.user.name + " " + users?.doctor.user.surname;
    const patient = users?.patient.user.name + " " + users?.patient.user.surname;

    const saveNewComment = () => {
        const newComment = {
            comment: commentMessage.current.value,
        };
        dispatch(
            sendComment({
                id: params.id,
                data: newComment,
            })
        );
    };

    const meetingNotStartError = () => {
        toast.warning("Toplantı Henüz başlamadı");
    };

    const setDiagnosisReport = (data) => {
        console.log(data);
        const newDiagnosisReport = {
            diagnosisReport: data.description,
        };
        dispatch(
            complateMeet({
                id: params.id,
                data: newDiagnosisReport,
            })
        );
    };

    const sendRating = () => {
        setVisible(true);
        const newPoint = {
            point: value,
            meetId: parseInt(params.id),
        };

        dispatch(
            sendPoint({
                id: users?.doctor.user.id,
                data: newPoint,
            })
        );
    };

    return (
        <div className="w-3/4 mx-auto mb-20 min-w-[900px]">
            <div className="container mx-auto px-4 my-10">
                <div className="items-center flex">
                    <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                        <img
                            alt="..."
                            className="max-w-full rounded-lg shadow-lg"
                            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        />
                    </div>
                    <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                            <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                                <i className="fas fa-rocket text-xl"></i>
                            </div>
                            <h3 className="text-3xl font-semibold">Unutma Sağlık Herşeyden Daha Değerli</h3>
                            <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                Toplantı Linkiniz Aşağıdadır, lütfen toplantı sonrası notlarını yazmayı ve doktoru puanlamayı unutma, geri dönüşlerin
                                bizim için önemli. İyi Görüşmeler Dileriz, Sağlıklı Günler :)
                            </p>
                            <ul className="list-none mt-6 text-left">
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i className="fas fa-fingerprint"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-600">
                                                Doktoları ve hastalar kolayca tek platformada buluşturan platform Doktora Göz At, görüşme içerisinde
                                                doktorunuza her şeyi gönül rahatlığıyla sorabilirsiniz.
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i className="fab fa-html5"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-600">
                                                Doktorun size yol gösterip fikir vereceğinden şüphe duymuyoruz, unutma bu uygulama seni rahatsızlığın
                                                konusunda aydınlatmak ve fikir vermek amacıyla tasarlandı.
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i className="far fa-paper-plane"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-600">
                                                Bizler sizlerin her ihtimâle karşı sağlığınızı güvenceye almanızı ve uzmanlarla da yüz yüze görüşerek
                                                kesin teşhis elde etmenize tavsiye ediyoruz.
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i className="far fa-paper-plane"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-600">
                                                <b>Toplantı Katılımcıları:</b> {doctor + " , " + patient}{" "}
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center mt-4">
                                        <div>
                                            {role == "PATIENT" ? (
                                                <div>
                                                    {users?.date_time > currentDate.toJSON() ? (
                                                        <Link>
                                                            <button
                                                                onClick={meetingNotStartError}
                                                                className="bg-pink-200 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full"
                                                            >
                                                                Toplantıya Katıl
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <Link to={meet.patient_meet_link}>
                                                            <button className="bg-pink-200 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
                                                                Toplantıya Katıl
                                                            </button>
                                                        </Link>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    {users?.date_time > currentDate.toJSON() ? (
                                                        <Link>
                                                            <button
                                                                onClick={meetingNotStartError}
                                                                className="bg-pink-200 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full"
                                                            >
                                                                Toplantıya Katıl
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <Link to={meet.doctor_meet_link}>
                                                            <button className="bg-pink-200 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
                                                                Toplantıya Katıl
                                                            </button>
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {diagnosisReportTime < currentDate.toJSON() ? (
                    role == "PATIENT" ? (
                        <div className="flex mb-4 px-4">
                            <span className="flex items-center">
                                <span className="text-bold">Doktorun Raporu: </span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <span className="flex ml-3 pl-3 py-2">
                                    {meet.diagnosis_report ? meet.diagnosis_report : "Doktor Henüz Rapor Eklemedi!"}
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className="flex">
                            <span className="flex ml-4 mt-4">
                                {!meet.diagnosis_report ? (
                                    <BaseButton className="w-[190px]" text={"Teşhis Raporu Oluştur"} onClick={() => setShowModal(true)} />
                                ) : (
                                    <Message severity="info" text={"Doktor Raporu: "+meet.diagnosis_report} />
                                )}
                            </span>
                        </div>
                    )
                ) : null}
                {users?.date_time < currentDate.toJSON() && role == "PATIENT" ? (
                    visible == false ? (
                        <div className="flex mb-4 px-4">
                            <span className="flex items-center">
                                <span className="text-bold">Doktoru Değerlendir</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
                                <span className="flex ml-3 pl-3 py-2">
                                    <BaseButton text={"Gönder"} onClick={sendRating} />
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className="flex mb-4 px-4">
                            <span className="flex items-center">
                                <span className="text-bold">Doktoru Değerlendirildi!</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <span className="flex mr-6 pl-3 py-2">
                                    <BaseButton text={"Yeniden Puanla"} onClick={() => setVisible(false)} />
                                </span>
                            </span>
                        </div>
                    )
                ) : null}
            </div>
            <div className="input-section w-full px-4">
                <div className="mx-auto px-4 text-gray-600">
                    <div className="mx-auto">
                        <div>
                            <textarea
                                placeholder="Mesajınız..."
                                ref={commentMessage}
                                required
                                className="w-full border-2 border-black 
                            mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            ></textarea>
                        </div>
                        <BaseButton onClick={saveNewComment} text={"Gönder"} />
                    </div>
                </div>
            </div>
            <div className="comment-section px-4">
                <section className="mt-12 text-left mx-auto">
                    <ul className="mt-12 space-y-3 px-4">
                        {comments.map((item, idx) => (
                            <li key={idx} className="p-5 bg-white border-1 border-black rounded-md shadow-sm">
                                <a href={item.href}>
                                    <div>
                                        <div className="justify-between sm:flex">
                                            <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" className="w-16 rounded-full" alt="Avatar" />
                                            <div className="flex-1 ml-3">
                                                <h3 className="text-xl font-medium">{item.user.name + " " + item.user.surname}</h3>
                                                <p className="text-gray-500 mt-2 pr-2">{item.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <div className={`${showModal ? "visible" : "hidden"}`}>
                <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" />
                <div className="fixed inset-0  z-50 overflow-hidden flex items-center justify-center sm:px-6">
                    <form className="bg-white w-[400px] rounded-lg px-10 py-5" onSubmit={handleSubmit(setDiagnosisReport)}>
                        <i className="pi pi-times cursor-pointer relative left-40" onClick={() => setShowModal(false)} />
                        <div className="text-left">
                            <fieldset className="flex flex-col">
                                <LabelFor name="description" errors={errors}>
                                    Lütfen Rapor Açıklamasını Giriniz
                                </LabelFor>
                                <TextareaFor
                                    placeholder="Örnek açıklama..."
                                    type="description"
                                    register={register("description", { required: true })}
                                    errors={errors}
                                />
                                <ValidationFor name="description" title="Rapor açıklaması alanını boş bırakmayınız." errors={errors} />
                            </fieldset>
                        </div>
                        <BaseButton className="w-full" text={"Raporu Gönder"} />
                    </form>
                </div>
            </div>
        </div>
    );
}
