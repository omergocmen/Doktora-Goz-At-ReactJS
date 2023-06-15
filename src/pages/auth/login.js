import { Button } from 'primereact/button';
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginimg from "../../assets/images/login.jpg";
import { InfoMessage } from '../../constants/infoMessage';
import { Messages } from "../../constants/messages";
import JwtHelper from "../../helpers/jwtHelper";
import BaseButton from "../../shared/components/baseButton";
import Heading from "../../shared/components/heading";
import LabelFor from "../../shared/form/labelFor";
import TextboxFor from "../../shared/form/textboxFor";
import ValidationFor from "../../shared/form/validationFor";
import { login } from "../../store/authSlice";

export default function Login() {
    const isAuthentication = new JwtHelper().verifyAccessToken();

    const navigate = useNavigate();

    const tooltipOptions = {
        position: 'bottom'
        };
        

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmitPatient = (data) => {
        login(data)
            .then((response) => {
                toast.success(Messages.userloginsuccess);
                localStorage.setItem("userType",response.data.data.userType)
                localStorage.setItem("userToken", response.data.data.token);
                navigate("/home");
            })
            .catch((err) => {
                toast.error(Messages.userloginfail);
                console.log(err);
            });
    };
    const onSubmitDoctor = (data) => {
      login(data)
          .then((response) => {
              toast.success(Messages.userloginsuccess);
              localStorage.setItem("userType",response.data.data.userType)
              localStorage.setItem("userToken", response.data.data.token);
              navigate("/home");
          })
          .catch((err) => {
              toast.error(Messages.userloginfail);
              console.log(err);
          });
  };


    useEffect(() => {
        if (isAuthentication) {
            navigate("/home");
        }
    }, [JSON.stringify(isAuthentication)]);

    return (
        <div className="h-screen w-full md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr justify-around items-center hidden">
                <img width={"100%"} src={loginimg} alt="login image" />
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <TabView>
                    <TabPanel header="Hasta" leftIcon="pi pi-user mr-2">
                        <Heading text="Hasta Giriş" />
                        {/* <h1 className="text-gray-800 font-bold text-3xl mb-5">Hasta Giriş</h1> */}
                        <form className="bg-white w-[300px]" onSubmit={handleSubmit(onSubmitPatient)}>
                            <p className="text-sm font-normal text-gray-600 mb-7">Giriş Yap ve Hemen Destek Almaya Başla</p>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="email" errors={errors}>
                                        E-Posta
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example@example.com"
                                        type="email"
                                        register={register("email", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="email" title={Messages.emptyemailerror} errors={errors} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="password" errors={errors}>
                                        Şifre
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example"
                                        type="password"
                                        register={register("password", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="password" title={Messages.emptypassworderror} errors={errors} />
                                </fieldset>
                            </div>
                            <BaseButton text={"Giriş Yap"} />
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">{Messages.passwordforgot}</span>
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer" onClick={() => navigate("/home/register") }>Kayıt ol</span>
                            <div>
                            <Button
                            icon="pi pi-info-circle"
                            tooltip={InfoMessage.logininfo}
                            tooltipOptions={tooltipOptions}
                            className='button-tooltip'
                            /></div>
                        </form>
                    </TabPanel>
                    <TabPanel header="Doktor" leftIcon="pi pi-user-plus mr-2">
                        <Heading text="Doktor Giriş" />
                        <form className="bg-white w-[300px]" onSubmit={handleSubmit(onSubmitDoctor)}>
                            <p className="text-sm font-normal text-gray-600 mb-7">Giriş Yap ve Hemen Destek Almaya Başla</p>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="email" errors={errors}>
                                        E-Posta
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example@example.com"
                                        type="email"
                                        register={register("email", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="email" title={Messages.emptyemailerror} errors={errors} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="password" errors={errors}>
                                        Şifre
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example"
                                        type="password"
                                        register={register("password", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="password" title={Messages.emptypassworderror} errors={errors} />
                                </fieldset>
                            </div>
                            <BaseButton text={"Giriş Yap"} />
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">{Messages.passwordforgot}</span>
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer" onClick={() => navigate("/home/register") }>Kayıt ol</span>
                            <div>
                            <Button
                            icon="pi pi-info-circle"
                            tooltip={InfoMessage.logininfo}
                            tooltipOptions={tooltipOptions}
                            className='button-tooltip'
                            /></div>
                        </form>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}
