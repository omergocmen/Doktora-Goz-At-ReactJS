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
import { useDispatch, useSelector } from "react-redux";
import { getAllBranch } from "../../store/branchSlice";
import TextareaFor from "../../shared/form/textAreaFor";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const branch = useSelector((state) => state.branch.branch);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {
        register: registerAttribute,
        handleSubmit: handleSubmitAttribute,
        control: controlAttribute,
        formState: { errors: errorsAttribute },
    } = useForm();

    const onRegisterPatient = (data) => {
        console.log(data);
        if (!data.myCheckbox) {
            toast.info("Lütfen sözleşmeyi okuyunuz ve kabul ediniz.");
            return;
        }
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
        console.log(data);
        if (!data.myCheckbox) {
            toast.info("Lütfen sözleşmeyi okuyunuz ve kabul ediniz.");
            return;
        }
        const newDoctor = {
            phoneNumber: data.phoneNumber,
            title: "prof. Dr",
            education: "Hacettepe Tıp Fakültesi",
            price: 200.1,
            birthDate: "2001-06-29",
            address: "Petrolis Mahallesi Gülistan sokak no 17",
            city: "Istanbul",
            country: "Kartal",
            zipCode: "34862",
            branch: data.branch.value,
            description: data.description,
            name: data.name,
            surname: data.surname,
            gender: data.gender.value == 1 ? "MAN" : "WOMAN",
            email: data.email,
            password: data.password,
        };
        dispatch(registerDoctor(newDoctor));
    };

    useEffect(() => {
        dispatch(getAllBranch());
    }, []);

    return (
        <div className="h-screen md:flex min-h-[1150px]">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr justify-around items-center hidden">
                <img width={"100%"} src={loginimg} alt="login image" />
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <TabView>
                    <TabPanel header="Hasta" leftIcon="pi pi-user mr-2">
                        <Heading text="Hasta Üyeliği" />
                        <form className="bg-white w-[300px] mb-60" onSubmit={handleSubmitAttribute(onRegisterPatient)}>
                            <div className="text-left">
                                <fieldset className="flex flex-col">
                                    <LabelFor name="name" errors={errorsAttribute}>
                                        Ad
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Adınızı girin"
                                        type="text"
                                        register={registerAttribute("name", { required: true })}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="name" title="Ad alanını boş bırakmayınız." errors={errorsAttribute} />
                                </fieldset>

                                <fieldset className="flex flex-col">
                                    <LabelFor name="surname" errors={errorsAttribute}>
                                        Soyadı
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Soyadınızı girin"
                                        type="text"
                                        register={registerAttribute("surname", { required: true })}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="surname" title="Soyadı alanını boş bırakmayınız." errors={errorsAttribute} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="email" errors={errorsAttribute}>
                                        E-Posta
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example@example.com"
                                        type="email"
                                        register={registerAttribute("email", { required: true })}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="email" title={Messages.emptyemailerror} errors={errorsAttribute} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="password" errors={errorsAttribute}>
                                        Şifre
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="example"
                                        type="password"
                                        register={registerAttribute("password", { required: true })}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="password" title={Messages.emptypassworderror} errors={errorsAttribute} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="phoneNumber" errors={errorsAttribute}>
                                        Telefon No
                                    </LabelFor>
                                    <TextboxFor
                                        placeholder="Telefon numarası girin"
                                        type="text"
                                        register={registerAttribute("phoneNumber", { required: true })}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="phoneNumber" title="Telefon numarası alanını boş bırakmayınız." errors={errorsAttribute} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="shortName" errors={errorsAttribute}>
                                        Cinsiyet
                                    </LabelFor>
                                    <DropdownListFor
                                        searchPlaceholder={"Seçiniz"}
                                        name="gender"
                                        register={registerAttribute("gender")}
                                        data={[{ gender: "Kadın" }, { gender: "Erkek" }].map((item, index) => {
                                            return {
                                                value: index,
                                                label: item.gender,
                                            };
                                        })}
                                        control={controlAttribute}
                                        errors={errorsAttribute}
                                    />
                                    <ValidationFor name="gender" title="Lütfen cinsiyet belirleyiniz" errors={errorsAttribute} />
                                </fieldset>
                                <fieldset>
                                    <input type="checkbox" {...registerAttribute("myCheckbox")} />
                                    <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">
                                        <a href={"/policy"} target="_blank">
                                            <u>Kullanıcı Kaydolurken Hizmet Politikasını Kabul Etmiş Sayılır.</u>
                                        </a>
                                    </span>
                                    <br />
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
                                <fieldset className="flex flex-col">
                                    <LabelFor name="branch" errors={errors}>
                                        Branş
                                    </LabelFor>
                                    <DropdownListFor
                                        searchPlaceholder={"Seçiniz"}
                                        name="branch"
                                        register={register("branch")}
                                        data={branch.map((item, index) => {
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            };
                                        })}
                                        control={control}
                                        errors={errors}
                                    />
                                    <ValidationFor name="branch" title="Lütfen branşınızı belirleyiniz" errors={errors} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <LabelFor name="description" errors={errors}>
                                        Açıklama
                                    </LabelFor>
                                    <TextareaFor
                                        placeholder="Örnek açıklama..."
                                        type="description"
                                        register={register("description", { required: true })}
                                        errors={errors}
                                    />
                                    <ValidationFor name="description" title={"Açıklama boş geçilemez"} errors={errors} />
                                </fieldset>
                                <fieldset>
                                    <input type="checkbox" {...register("myCheckbox")} />
                                    <span className="text-sm ml-2  hover:text-blue-500 cursor-pointer">
                                        <a href={"/policy"} target="_blank">
                                            <u>Kullanıcı Kaydolurken Hizmet Politikasını Kabul Etmiş Sayılır.</u>
                                        </a>{" "}
                                    </span>
                                    <br />
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
