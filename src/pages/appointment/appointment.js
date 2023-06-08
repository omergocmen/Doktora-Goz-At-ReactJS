import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getAllAppointment } from "../../store/appointmentSlice";
import { Badge } from "primereact/badge";
import { Dropdown } from 'primereact/dropdown';


export default function Appointment() {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointment.appointments);
    const [newAppointments, setNewAppointments] = useState([]);

    useEffect(() => {
        dispatch(getAllAppointment());
        setNewAppointments(
            appointments.map((item) => {
                return {
                    ...item,
                    doctorName: item.doctor.user.name + " " + item.doctor.user.surname,
                };
            })
        );
    }, [JSON.stringify(appointments)]);

    const header = (
        <div className="py-2">
            <h1 className="text-4xl">Randevu Geçmişi</h1>
        </div>
    );


    const statuses = [
        "KABUL EDİLMİŞ",
        "İPTAL EDİLMİŞ",
        "REDDEDİLMİŞ",
        "KABUL BEKLİYOR",
        "ÖDEME YAPILMASI GEREKİYOR"
      ];

    const statusFilterTemplate = (options) => {
        return (
          <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e) => {
              options.filterCallback(e.value, options.index);
            }}
            itemTemplate={statusItemTemplate}
            placeholder="Durum Belirt"
            className="p-column-filter"
            showClear
          />
        );
      };

      const statusBodyTemplate = (rowData) => {
        return statusItemTemplate(rowData.state);
      };

    const AppointmentStatus = {
        approved: "APPROVED",
        cancalled: "CANCELLED",
        rejected: "REJECTED",
        waitind: "WAITING_FOR_APPROVAL",
        payment: "PAYMENT_REQUIRED",
    };

    const statusItemTemplate = (option) => {
        if (option === AppointmentStatus.approved) {
            return <Badge value="KABUL EDİLMİŞ" severity="success"></Badge>;
        } else if (option === AppointmentStatus.cancalled) {
            return <Badge value="İPTAL EDİLMİŞ" severity="danger"></Badge>;
        } else if (option === AppointmentStatus.rejected) {
            return <Badge value="REDDEDİLMİŞ" severity="danger"></Badge>;
        } else if (option === AppointmentStatus.waitind) {
            return <Badge value="KABUL BEKLİYOR" severity="info"></Badge>;
        } else if (option === AppointmentStatus.payment) {
            return <Badge value="ÖDEME YAPILMASI GEREKİYOR" severity="warning"></Badge>;
        }
    };

    return (
        <DataTable
            className="mt-20"
            value={newAppointments}
            paginator
            header={header}
            rows={10}
            dataKey="id"
            tableStyle={{ margin: "auto", minWidth: "50rem" }}
        >
            <Column filter field="doctorName" filterField="doctorName" header="Doktor" sortable />
            <Column filter field="doctor.branch.name" filterField="doctor.branch.name" header="Doktor Uzmanlık Alanı" sortable />
            <Column field="patient_note" header="Şikayet Sebebi" sortable />
            <Column field="state" filterElement={statusFilterTemplate} body={statusBodyTemplate} header="Durum" filter />
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
