import React from "react";
import Barış from "../../assets/images/Barış.jpg";
import Berkay from "../../assets/images/Berkay.jpg";
import Fatih from "../../assets/images/Fatih.png";
import Yiğit from "../../assets/images/Yiğit.jpg";
import Ömer from "../../assets/images/Ömer.jpg";
import Header from "../../partials/header";

export default function AboutUs() {
  return (
    <>
      <main>
        <Header/>
        <section className="relative py-20">
          <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20" style={{ height: "80px" }}>
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
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
                  <h3 className="text-3xl font-semibold">Doktora Göz At takımı olarak</h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Hastaları ve doktorları bir araya getirerek sağlık hizmetlerini kolaylaştırmak hedefimizdir.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">Kullanıcılar için dikkatlice tasarlanmış elementler</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">Göz yormayan sayfalar</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">Akıcı ve dinemik geçişler</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex  justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Uygulamanın Geliştiricileri</h2>
              </div>
            </div>
            <div className="flex ">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img alt="..." src={Berkay} className="shadow-lg rounded-full max-w-full mx-auto" style={{ maxWidth: "120px" }} />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Berkay Babataş</h5>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img alt="..." src={Ömer} className="shadow-lg rounded-full max-w-full mx-auto" style={{ maxWidth: "120px" }} />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ömer Göçmen</h5>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img alt="..." src={Fatih} className="shadow-lg rounded-full max-w-full mx-auto" style={{ maxWidth: "120px" }} />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Fatih Tufan</h5>
                    
                    
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img alt="..." src={Yiğit} className="shadow-lg rounded-full max-w-full mx-auto" style={{ maxWidth: "120px" }} />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Yiğit Yılmaz</h5>
                    
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img alt="..." src={Barış} className="shadow-lg rounded-full max-w-full mx-auto" style={{ maxWidth: "120px" }} />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Hüseyin Barış Yaşık</h5>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
