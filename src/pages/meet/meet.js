import React, { useEffect } from "react";
import BaseButton from "../../shared/components/baseButton";
import { getAllMeeting, getMeetingById, getMeetingComments } from "../../store/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import moment from "moment";

export default function Meets() {
    const dispatch = useDispatch();
    const meets = useSelector((state) => state.meet.meets);

    useEffect(() => {
        dispatch(getAllMeeting());
    }, []);

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

    const nameSurnameTamplate = (option) => {
        return <>{option.appointment.doctor.user.name + " " + option.appointment.doctor.user.surname}</>;
    };
    return (
        <DataTable
            className="mt-20"
            value={meets}
            paginator
            header={header}
            rows={10}
            dataKey="id"
            tableStyle={{ margin: "auto", minWidth: "50rem" }}
        >
            <Column field="id" header="Görüşme No" sortable />
            <Column body={nameSurnameTamplate} header="Doktor" sortable />
            <Column field="state" header="Görüşme Durumu" sortable />
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
