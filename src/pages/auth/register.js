import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginimg from "../../assets/images/login.jpg";
import { Messages } from "../../constants/messages";
import JwtHelper from "../../helpers/jwtHelper";
import BaseButton from "../../shared/components/baseButton";
import Heading from "../../shared/components/heading";
import DropdownListFor from "../../shared/form/dropdownListFor";
import LabelFor from "../../shared/form/labelFor";
import TextboxFor from "../../shared/form/textboxFor";
import ValidationFor from "../../shared/form/validationFor";
import { registerPatient, registerDoctor } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
    const isAuthentication = new JwtHelper().verifyAccessToken();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onRegisterPatient = (data) => {
        const newPatient = {
            name: data.name,
            surname: data.surname,
            gender: data.gender.value == 1 ? "MAN" : "WOMAN",
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            weight: 76.8,
            height: 1.79,
            bloodGroup: "Brh-",
            birthDate: "1991-12-03",
            address: "Esenler Mahallesi Cumhuriyet Caddesi No: 5",
            city: "İstanbul",
            country: "Esenler",
            zipCode: "34245",
        };
        dispatch(registerPatient(newPatient));
    };
    const onRegisterDoctor = (data) => {

        const newDoctor = {
            phoneNumber: data.phoneNumber,
            title: "prof. Dr",
            education: "Hacettepe Tıp",
            description: "iyi bir doktorum",
            price: 20.1,
            birthDate: "2001-06-29",
            branch: 1,
            address: "Petrolis Mahallesi Gülistan sokak no 17",
            city: "Istanbul",
            country: "Kartal",
            zipCode: "34862",
            name: data.name,
            surname: data.surname,
            gender: data.gender.value == 1 ? "MAN" : "WOMAN",
            email: data.email,
            password: data.password,
        };
        dispatch(registerDoctor(newDoctor));
    };

    useEffect(() => {
        if (isAuthentication) {
            navigate("/home");
        }
    }, [JSON.stringify(isAuthentication)]);

    return (
        <div className="h-screen md:flex min-h-[1100px]">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr justify-around items-center hidden">
                <img width={"100%"} src={loginimg} alt="login image" />
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <TabView>
                    <TabPanel header="Hasta" leftIcon="pi pi-user mr-2">
                        <Heading text="Hasta Üyeliği" />
                        <form className="bg-white w-[300px]" onSubmit={handleSubmit(onRegisterPatient)}>
                            <h1 className="text-gray-800 font-bold text-3xl mb-5">Kaydol</h1>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="name" errors={errors}>
                                        Ad
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Adınızı girin"
                                        type="text"
                                        register={register("name", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="name" title="Ad alanını boş bırakmayınız." errors={errors} />
                                </fieldset>

                                <fieldset className="flex flex-col">
                                    <LabelFor name="surname" errors={errors}>
                                        Soyadı
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Soyadınızı girin"
                                        type="text"
                                        register={register("surname", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="surname" title="Soyadı alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
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
                                <fieldset className="flex flex-col">
                                    <LabelFor name="phoneNumber" errors={errors}>
                                        Telefon No
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Telefon numarası girin"
                                        type="text"
                                        register={register("phoneNumber", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="phoneNumber" title="Telefon numarası alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="shortName" errors={errors}>
                                        Cinsiyet
                                    </LabelFor>
                                    <DropdownListFor
                                        searchPlaceholder={"Seçiniz"}
                                        name="gender"
                                        register={register("gender")}
                                        data={[{ gender: "Kadın" }, { gender: "Erkek" }, { gender: "Belirtmek İstemiyorum" }].map((item, index) => {
                                            return {
                                                value: index,
                                                label: item.gender,
                                            };
                                        })}
                                        control={control}
                                        errors={errors}
                                    />
                                    <ValidationFor name="gender" title="Lütfen cinsiyet belirleyiniz" errors={errors} />
                                </fieldset>
                            </div>
                            <BaseButton text={"Üye Ol"} />
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">{Messages.passwordforgot}</span>
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer" onClick={() => navigate("/home/login")}>
                                Zaten üye misin?
                            </span>
                        </form>
                    </TabPanel>
                    <TabPanel header="Doktor" leftIcon="pi pi-user-plus mr-2">
                        <Heading text="Doktor Üyeliği" />
                        <h1 className="text-gray-800 font-bold text-3xl mb-5">Kaydol</h1>
                        <form className="bg-white w-[300px]" onSubmit={handleSubmit(onRegisterDoctor)}>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="name" errors={errors}>
                                        Ad
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Adınızı girin"
                                        type="text"
                                        register={register("name", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="name" title="Ad alanını boş bırakmayınız." errors={errors} />
                                </fieldset>

                                <fieldset className="flex flex-col">
                                    <LabelFor name="surname" errors={errors}>
                                        Soyadı
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Soyadınızı girin"
                                        type="text"
                                        register={register("surname", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="surname" title="Soyadı alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
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
                                <fieldset className="flex flex-col">
                                    <LabelFor name="phoneNumber" errors={errors}>
                                        Telefon No
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Telefon numarası girin"
                                        type="text"
                                        register={register("phoneNumber", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="phoneNumber" title="Telefon numarası alanını boş bırakmayınız." errors={errors} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="shortName" errors={errors}>
                                        Cinsiyet
                                    </LabelFor>
                                    <DropdownListFor
                                        searchPlaceholder={"Seçiniz"}
                                        name="gender"
                                        register={register("gender")}
                                        data={[{ gender: "Kadın" }, { gender: "Erkek" }].map((item, index) => {
                                            return {
                                                value: index,
                                                label: item.gender,
                                            };
                                        })}
                                        control={control}
                                        errors={errors}
                                    />
                                    <ValidationFor name="gender" title="Lütfen cinsiyet belirleyiniz" errors={errors} />
                                </fieldset>
                                <fieldset>
                                    <input type="checkbox" {...register("myCheckbox")} />
                                </fieldset>
                            </div>
                            <BaseButton text={"Üye Ol"} />
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">{Messages.passwordforgot}</span>
                            <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer" onClick={() => navigate("/home/login")}>
                                Zaten üye misin?
                            </span>
                        </form>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}
