import React, { useEffect, useState } from "react";
import BaseButton from "../../shared/components/baseButton";
import { getAllMeeting, getMeetingById, getMeetingComments } from "../../store/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import moment from "moment";
import { Badge } from "primereact/badge";
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';


export default function Meets() {
    const dispatch = useDispatch();
    const meets = useSelector((state) => state.meet.meets);
    const [newMeets, setNewMeets] = useState([]);
    
    useEffect(() => {
        dispatch(getAllMeeting());
        setNewMeets(
            meets.map((item) => {
                return {
                    ...item,
                    doctorName: item.appointment.doctor.user.name + " " + item.appointment.doctor.user.surname,
                };
            })
        );
    }, [JSON.stringify(meets)]);

    const jobs = [
        {
            title: "UI – Front End Dev",
            desc: "Currently, ManTech is seeking a motivated, career and customer-oriented Software Developer to join our team in Fort Meade, MD.",
            date: "May 17, 2022",
            salary: "98,000 USD",
            type: "Full-time",
            location: "Columbia, MD",
            href: "javascript:void(0)",
        },
        {
            title: "Back End Developer",
            desc: " Help us solve problems and develop great user interface tools for our developers.",
            date: "Nov 11, 2022",
            salary: "$105,000 USD",
            type: "Part-time",
            location: "Remote",
            href: "javascript:void(0)",
        },
        {
            title: "Full-Stack Developer",
            desc: "This position is 100% remote, working as part of a small, multi-functional team. You must be confident at working alone.",
            date: "Jan 2, 2022",
            salary: "163,273 USD",
            type: "Full-time",
            location: "Remote",
            href: "javascript:void(0)",
        },
    ];

    const header = (
        <div className="py-2">
            <h1 className="text-4xl">Toplantı Geçmişi</h1>
        </div>
    );
    const settingTemplate = (option) => {
        return (
            <>
                <Link to={"/home/meetdetail/" + option.id}>
                    <i className="pi pi-arrow-circle-right text-xl text-blue-700" />
                </Link>
            </>
        );
    };

    const MeetStatus={
        approved:"APPROVED",
        cancalled:"CANCELLED",
        rejected:"REJECTED",
        waitind:"WAITING_FOR_APPROVAL",
        payment:"PAYMENT_REQUIRED",
    }


    const [statuses] = useState(['KABUL EDİLMİŞ', 'İPTAL EDİLMİŞ', 'REDDEDİLMİŞ', 'KABUL BEKLİYOR', 'ÖDEME YAPILMASI GEREKİYOR']);

    const getSeverity = (option) => {
        if (option?.state === MeetStatus.approved) {
            return "success"
        } else if (option?.state === MeetStatus.cancalled) {
            return "warning"
        } else if (option?.state === MeetStatus.rejected) {
            return "danger"
        } else if (option?.state === MeetStatus.waitind) {
            return "info"
        } else if (option?.state === MeetStatus.payment) {
            return null
        }
    };

    const stateItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
    const stateBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const stateFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={stateItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };



    return (
        <DataTable
            className="mt-20"
            value={newMeets}
            paginator
            header={header}
            rows={10}
            dataKey="id"
            tableStyle={{ margin: "auto", minWidth: "50rem" }}
        >
            <Column field="id" header="Görüşme No" sortable />
            <Column filter filterField="doctorName" field="doctorName" header="Doktor" sortable />
            <Column filter filterField="state" filterElement={stateFilterTemplate} body={stateBodyTemplate} field="state" header="Görüşme Durumu" sortable />
            <Column
                field="appointment.date_time"
                header="Randevu Tarihi"
                body={(item) => {
                    return moment(item.createdDate).format("DD.MM.YYYY");
                }}
                sortable
            />
            <Column header="Görüşme Detayı" body={settingTemplate} exportable={false} style={{ minWidth: "12rem" }}></Column>
        </DataTable>
    );
}
