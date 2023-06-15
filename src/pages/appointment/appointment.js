import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getAllAppointment, cancelAppointment, rejectAppointment, approveAppointment } from "../../store/appointmentSlice";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import LinkIcon from "../../shared/components/linkIcon";
import { Tag } from "primereact/tag";
import IconButton from "../../shared/components/iconButton";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useForm } from "react-hook-form";
import TextareaFor from "../../shared/form/textAreaFor";
import LabelFor from "../../shared/form/labelFor";
import ValidationFor from "../../shared/form/validationFor";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import BaseButton from "../../shared/components/baseButton";

export default function Appointment() {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointment.appointments);
    const [newAppointments, setNewAppointments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setselectedItem] = useState({});
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const dt = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(getAllAppointment());
        setNewAppointments(
            appointments.map((item) => {
                return {
                    ...item,
                    doctorName: item.doctor.user.name + " " + item.doctor.user.surname,
                    state: getState(item.state),
                    branchName:item.doctor.branch.name
                };
            })
        );
        initFilters();
    }, [JSON.stringify(appointments)]);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            doctorName: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            state: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            patient_note: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            branchName: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
        });
        setGlobalFilterValue("");
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters };
        _filters1["global"].value = value;
        setFilters(_filters1);
        setGlobalFilterValue(value);
    };
    const clearFilter = () => {
        initFilters();
    };

    const getState = (state) => {
        if (state == "APPROVED") {
            return "KABUL EDİLMİŞ";
        } else if (state == "CANCELLED") {
            return "İPTAL EDİLMİŞ";
        } else if (state == "REJECTED") {
            return "REDDEDİLMİŞ";
        } else if (state == "PAYMENT_REQUIRED") {
            return "ÖDEME YAPILMASI GEREKİYOR";
        } else if (state == "WAITING_FOR_APPROVAL") {
            return "KABUL BEKLİYOR";
        } else {
            return "BELİRSİZ";
        }
    };

    const stateFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => {
                    options.filterCallback(e.value, options.index);
                }}
                itemTemplate={stateItemTemplate}
                placeholder="Durum Belirt"
                className="p-column-filter"
                showClear
            />
        );
    };

    const AppointmentStatus = {
        approved: "KABUL EDİLMİŞ",
        cancalled: "İPTAL EDİLMİŞ",
        rejected: "REDDEDİLMİŞ",
        waitind: "KABUL BEKLİYOR",
        payment: "ÖDEME YAPILMASI GEREKİYOR",
    };
    const statuses = Object.values(AppointmentStatus);

    const stateItemTemplate = (option) => {
        const statusValues = getStatusValues(option);
        return <Tag value={statusValues.value} severity={statusValues.severity} />;
    };
    const statebodytemplate = (option) => {
        const statusValues = getStatusValues(option.state);
        return <Badge value={statusValues.value} severity={statusValues.severity} />;
    };

    const getStatusValues = (option) => {
        if (option === AppointmentStatus.approved) {
            return { value: "KABUL EDİLMİŞ", severity: "success" };
        } else if (option === AppointmentStatus.cancalled) {
            return { value: "İPTAL EDİLMİŞ", severity: "danger" };
        } else if (option === AppointmentStatus.rejected) {
            return { value: "REDDEDİLMİŞ", severity: "danger" };
        } else if (option === AppointmentStatus.waitind) {
            return { value: "KABUL BEKLİYOR", severity: "info" };
        } else if (option === AppointmentStatus.payment) {
            return { value: "ÖDEME YAPILMASI GEREKİYOR", severity: "warning" };
        }
    };

    const showModal = (item) => {
        if (item.state === AppointmentStatus.cancalled) {
            toast.info("Bu randevu zaten iptal edilmiş");
        } else if (item.state === AppointmentStatus.rejected) {
            toast.info("Bu randevu zaten reddedilmiş");
        } else {
            setselectedItem(item);
            setVisible(true);
        }
    };
    const ApproveAppointmentFunc=(id)=>{
        dispatch(approveAppointment(id))
    }
    const settingTemplate = (option) => {
        return (
            <>
                <IconButton className="dark self-baseline pi pi-times" onClick={() => showModal(option)} />
                {option.meet && <LinkIcon to={"/home/meetdetail/" + option.meet.id} className="dark mx-2 self-baseline pi pi-arrow-circle-right" />}
                {option.state=="KABUL BEKLİYOR" && localStorage.getItem("userType")=="Doctor" && <IconButton onClick={()=>ApproveAppointmentFunc(option.id)} className="dark mx-2 self-baseline pi pi-check" />}
            </>
        );
    };

    const cancelAppointmentFunc = () => {
        if (localStorage.getItem("userType") === "Patient") {
            dispatch(cancelAppointment(selectedItem.id));
        } else {
            dispatch(rejectAppointment(selectedItem.id));
        }
        setVisible(false);
    };

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };
    const exportColumns = [
        { title: "Id", dataKey: "id" },
        { title: "Doktor Adı", dataKey: "doctorName" },
        { title: "Şikayet Sebebi", dataKey: "patient_note" },
        { title: "Maliyet", dataKey: "date_time" },
        { title: "Durum", dataKey: "state" },
    ];
    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, newAppointments);
                doc.save("randevular.pdf");
            });
        });
    };

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(newAppointments);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "randevular");
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const header = (
        <>
            <div className="py-2">
                <h1 className="text-4xl">Randevu Geçmişi</h1>
            </div>
            <div className="flex align-items-center export-buttons mb-4">
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                <Button
                    className="mx-2"
                    type="button"
                    icon="pi pi-file-excel"
                    severity="success"
                    rounded
                    onClick={exportExcel}
                    data-pr-tooltip="XLS"
                />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <div className="flex justify-between">
                <button
                    className="text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-rose-400 dark:text-rose-400 dark:hover:text-white dark:hover:bg-rose-500 dark:focus:ring-rose-900"
                    type="button"
                    label="Clear"
                    onClick={clearFilter}
                >
                    <span className="p-button-icon p-c p-button-icon-left pi pi-filter-slash"></span>
                    <span className="mx-2">Temizle</span>
                </button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Aranacak kelime..." />
                </span>
            </div>
        </>
    );

    return (
        <>
            <DataTable
                className="mt-20"
                value={newAppointments}
                paginator
                header={header}
                rows={10}
                ref={dt}
                dataKey="id"
                selectionMode="single"
                tableStyle={{ margin: "auto", minWidth: "50rem" }}
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={[
                    "doctorName",
                    "state",
                    "patient_note",
                    "branchName"
                ]}
                emptyMessage="Arıza kaydı bulunamadı"
            >
                <Column filter field="doctorName" filterField="doctorName" header="Doktor" sortable />
                <Column filter field="branchName" filterField="branchName" header="Doktor Uzmanlık Alanı" sortable />
                <Column field="patient_note" header="Şikayet Sebebi" sortable />
                <Column field="state" filterElement={stateFilterTemplate} body={statebodytemplate} header="Durum" filter />
                <Column
                    filter
                    field="date_time"
                    header="Randevu Tarihi"
                    body={(item) => {
                        return moment(item.date_time).format("DD.MM.YYYY");
                    }}
                    sortable
                />
                <Column header="Görüşme Detayı" body={settingTemplate} exportable={false} style={{ minWidth: "12rem" }}></Column>
            </DataTable>
            <div className={`${visible ? "visible" : "hidden"}`}>
                <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" />
                <div className="fixed inset-0  z-50 overflow-hidden flex items-center justify-center sm:px-6">
                    <form className="bg-white w-[400px] rounded-lg px-10 py-5" onSubmit={handleSubmit(cancelAppointmentFunc)}>
                        <i className="pi pi-times cursor-pointer relative left-40" onClick={() => setVisible(false)} />
                        <div className="text-left">
                            <fieldset className="flex flex-col">
                                <LabelFor name="description" errors={errors}>
                                    Lütfen Red Açıklaması Giriniz
                                </LabelFor>
                                <TextareaFor
                                    placeholder="Örnek açıklama..."
                                    type="description"
                                    register={register("description", { required: true })}
                                    errors={errors}
                                />
                                <ValidationFor name="description" title="Red açıklaması alanını boş bırakmayınız." errors={errors} />
                            </fieldset>
                        </div>
                        <BaseButton className="w-full" text={"Reddet"} />
                    </form>
                </div>
            </div>
        </>
    );
}
