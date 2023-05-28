import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getAllMeeting } from "../../store/meetSlice";
import { Link } from "react-router-dom";

export default function Meets() {
    const dispatch = useDispatch();
    const meets = useSelector((state) => state.meet.meets);

    useEffect(() => {
        dispatch(getAllMeeting());
    }, []);
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
