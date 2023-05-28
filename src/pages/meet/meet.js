import React, { useEffect, useState } from "react";
import BaseButton from "../../shared/components/baseButton";
import { getAllMeeting, getMeetingById, getMeetingComments } from "../../store/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import moment from "moment";
import { Badge } from "primereact/badge";

export default function Meets() {
    const dispatch = useDispatch();
    const meets = useSelector((state) => state.meet.meets);
    const [newMeets, setNewMeets] = useState([]);
    console.log(meets);

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
    const statebodytemplate = (option) => {
        if (option.state === "APPROVED") {
            return <Badge value="KABUL EDİLMİŞ" severity="success"></Badge>;
        } else if (option.state === "CANCELLED") {
            return <Badge value="İPTAL EDİLMİŞ" severity="danger"></Badge>;
        } else if (option.state === "REJECTED") {
            return <Badge value="REDDEDİLMİŞ" severity="danger"></Badge>;
        } else if (option.state === "WAITING_FOR_APPROVAL") {
            return <Badge value="KABUL BEKLİYOR" severity="info"></Badge>;
        } else if (option.state === "PAYMENT_REQUIRED") {
            return <Badge value="ÖDEME YAPILMASI GEREKİYOR" severity="warning"></Badge>;
        }
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
            <Column filter filterField="state" body={statebodytemplate} field="state" header="Görüşme Durumu" sortable />
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
