import React, { useEffect, useRef, useState } from "react";
import LinkIcon from "../../shared/components/linkIcon";
import { getAllMeeting, getMeetingById, getMeetingComments } from "../../store/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import moment from "moment";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

export default function Meets() {
    const dispatch = useDispatch();
    const meets = useSelector((state) => state.meet.meets);
    const [newMeets, setNewMeets] = useState([]);
    const dt = useRef(null);

    useEffect(() => {
        dispatch(getAllMeeting());
        setNewMeets(
            meets.map((item) => {
                return {
                    ...item,
                    doctorName: item.appointment.doctor.user.name + " " + item.appointment.doctor.user.surname,
                    state: getState(item.state),
                    date_time : moment(item.appointment.date_time).format("DD.MM.YYYY / HH:mm")
                };
            })
        );
    }, [JSON.stringify(meets)]);

    const getState = (state) => {
        if (state == "APPROVED") {
            return "KABUL EDİLMİŞ";
        } else if (state == "CANCELLED") {
            return "İPTAL EDİLMİŞ";
        } else if (state == "COMPLETED") {
            return "TAMAMLANMIŞ";
        } else {
            return "BELİRSİZ";
        }
    };

    const settingTemplate = (option) => {
        return (
            <>
                <LinkIcon to={"/home/meetdetail/" + option.id} className="dark mx-2 self-baseline pi pi-arrow-circle-right" />
            </>
        );
    };

    const MeetStatus = {
        approved: "KABUL EDİLMİŞ",
        cancalled: "İPTAL EDİLMİŞ",
        complated: "TAMAMLANMIŞ",
    };

    const [statuses] = useState(Object.values(MeetStatus));

    const stateItemTemplate = (option) => {
        const statusValues = getStatusValues(option);
        return <Tag value={statusValues.value} severity={statusValues.severity} />;
    };
    const statebodytemplate = (option) => {
        const statusValues = getStatusValues(option.state);
        return <Badge value={statusValues.value} severity={statusValues.severity} />;
    };

    const getStatusValues = (option) => {
        if (option === MeetStatus.approved) {
            return { value: "KABUL EDİLMİŞ", severity: "success" };
        } else if (option === MeetStatus.cancalled) {
            return { value: "İPTAL EDİLMİŞ", severity: "danger" };
        } else if (option === MeetStatus.complated) {
            return { value: "TAMAMLANMIŞ", severity: "info" };
        }
    };

    const stateFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                itemTemplate={stateItemTemplate}
                placeholder="Select One"
                className="p-column-filter"
                showClear
            />
        );
    };

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };
    const exportColumns = [
        { title: "Id", dataKey: "id" },
        { title: "Doktor Adı", dataKey: "doctorName" },
        { title: "Durum", dataKey: "state" },
    ];
    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, newMeets);
                doc.save("görüşmeler.pdf");
            });
        });
    };

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(newMeets);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "görüşmeler");
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
                <h1 className="text-4xl">Toplantı Geçmişi</h1>
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
        </>
    );
    return (
        <DataTable
            className="mt-20"
            value={newMeets}
            paginator
            header={header}
            ref={dt}
            rows={10}
            dataKey="id"
            tableStyle={{ margin: "auto", minWidth: "50rem" }}
        >
            <Column field="id" header="Görüşme No" sortable />
            <Column filter filterField="doctorName" field="doctorName" header="Doktor" sortable />
            <Column
                filter
                filterField="state"
                filterElement={stateFilterTemplate}
                body={statebodytemplate}
                field="state"
                header="Görüşme Durumu"
                sortable
            />
            <Column
                field="date_time"
                header="Görüşme Tarihi"
                sortable
            />
            <Column filter filterField="appointment.patient_note" field="appointment.patient_note" header="Hasta Notu" sortable />
            <Column header="Görüşme Detayı" body={settingTemplate} exportable={false} style={{ minWidth: "12rem" }}></Column>
        </DataTable>
    );
}
