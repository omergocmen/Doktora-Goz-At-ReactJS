import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getAllAppointment } from "../../store/appointmentSlice";

export default function Appointment() {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointment.appointments);
    useEffect(() => {
        dispatch(getAllAppointment());
    }, []);

    const header = (
        <div className="py-2">
            <h1 className="text-4xl">Randevu Geçmişi</h1>
        </div>
    );

    const nameSurnameTamplate = (option) => {
        console.log(option);
        return <>{option.doctor.user.name + " " + option.doctor.user.surname}</>;
    };

    return (
        <DataTable
            className="mt-20"
            value={appointments}
            paginator
            header={header}
            rows={10}
            dataKey="id"
            tableStyle={{ margin: "auto", minWidth: "50rem" }}
        >
            <Column filter body={nameSurnameTamplate} field={`"doctor.user.name+" "+doctor.user.surname`} header="Doktor" sortable />
            <Column field="doctor.branch.name" header="Doktor Uzmanlık Alanı" sortable />
            <Column field="patient_note" header="Şikayet Sebebi" sortable />
            <Column field="state" header="Randevu Durumu" sortable />
            <Column
                filter
                field="date_time"
                header="Oluşturulma Tarihi"
                body={(item) => {
                    return moment(item.createdDate).format("DD.MM.YYYY");
                }}
                sortable
            />
        </DataTable>
    );
}
