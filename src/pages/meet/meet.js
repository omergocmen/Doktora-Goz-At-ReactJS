import React, { useEffect } from 'react'
import BaseButton from '../../shared/components/baseButton';
import {getAllMeeting, getMeetingById} from "../../store/meetSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

export default function Meet() {

    const dispatch = useDispatch();

    const params = useParams();

    const meet = useSelector((state) => state.meet.meet);
    const meets = useSelector((state) => state.meet.meets);

    useEffect(() => {
        // dispatch(getAllMeeting());
        dispatch(getMeetingById(params.id));
    }, []);
     const users = meet.appointment;
     const doctor = users?.doctor.title + " " +  users?.doctor.user.name + " " + users?.doctor.user.surname;
    const patient = users?.patient.user.name + " " + users?.patient.user.surname;
    console.log(meets);
    const jobs = [
        {
            title: "UI – Front End Dev",
            desc: "Currently, ManTech is seeking a motivated, career and customer-oriented Software Developer to join our team in Fort Meade, MD.",
            date: "May 17, 2022",
            salary: "98,000 USD",
            type: "Full-time",
            location: "Columbia, MD",
            href: "javascript:void(0)"
        },
        {
            title: "Back End Developer",
            desc: " Help us solve problems and develop great user interface tools for our developers.",
            date: "Nov 11, 2022",
            salary: "$105,000 USD",
            type: "Part-time",
            location: "Remote",
            href: "javascript:void(0)"
        },
        {
            title: "Full-Stack Developer",
            desc: "This position is 100% remote, working as part of a small, multi-functional team. You must be confident at working alone.",
            date: "Jan 2, 2022",
            salary: "163,273 USD",
            type: "Full-time",
            location: "Remote",
            href: "javascript:void(0)"
        },
    ]
    return (
      <div className='w-3/4 mx-auto'>
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
                Toplantı Linkiniz Aşağıdadır, lütfen toplantı sonrası notlarını yazmayı ve doktoru puanlamayı unutma, geri dönüşlerin bizim için önemli.
                İyi Görüşmeler Dileriz, Sağlıklı Günler :)
              </p>
              <ul className="list-none mt-6">
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                        <i className="fas fa-fingerprint"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-600">Doktoları ve hastalar kolayca tek platformada buluşturan platform Doktora Göz At, görüşme içerisinde doktorunuza her şeyi gönül rahatlığıyla sorabilirsiniz.</h4>
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
                        <h4 className="text-gray-600"> Doktorun size yol gösterip fikir vereceğinden şüphe duymuyoruz, unutma bu uygulama seni rahatsızlığın konusunda aydınlatmak ve fikir vermek amacıyla tasarlandı.</h4>
                        <h4 className="text-gray-600"> Toplantı Katılımcıları : </h4>
                        <h4 className="text-gray-600"> {doctor}   </h4>
                        <h4 className="text-gray-600"> {patient}  </h4>

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
                      <h4 className="text-gray-600">Bizler sizlerin her ihtimâle karşı sağlığınızı güvenceye almanızı ve uzmanlarla da yüz yüze görüşerek kesin teşhis elde etmenize tavsiye ediyoruz.</h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='input-section w-full'>
            <div className="mx-auto px-4 text-gray-600">
                <div className="mt-12 mx-auto">
                        <div>
                            <textarea placeholder='Mesajınız...' required className="w-full border-2 border-black 
                            mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                        </div>
                    <BaseButton text={"Gönder"}/>
                </div>
            </div>
      </div>
      <div className='comment-section'>
      <section className="mt-12 text-left mx-auto">
            <ul className="mt-12 space-y-3 px-4">
                {
                    jobs.map((item, idx) => (
                        <li key={idx} className="p-5 bg-white border-1 border-black rounded-md shadow-sm">
                            <a href={item.href}>
                                <div>
                                    <div className="justify-between sm:flex">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 mt-2 pr-2">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </section>
      </div>
      </div>
    );
}
