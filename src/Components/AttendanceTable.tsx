import { useState, useEffect } from "react";
import SelectFilter from "./SelectFilter";
import axios from "axios";
import { getCurrentMonth } from "../utils/getMonth.util";

const fetchDataByMonth  = async (month) => {
    const response =  await axios.get(`https://upbeat-dusty-apology.glitch.me/api/v1/attendance?month=${month}`)
    return response.data
};

const AttendanceTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(getCurrentMonth());
    const [nameFilter, setNameFilter] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchDataByMonth(month).then((response: any) => {
            setNameFilter('')
            setData(response);
            setLoading(false);
        });
    }, [month]);

    const calculateAttendancePercentage = (attendance: any) => {
        const totalDays = Object.keys(attendance).length;
        const attendedDays = Object.values(attendance).filter((day: any) => day.status).length;
        return (attendedDays / totalDays) * 100;
    };

    const handleMonthChange = (e) => setMonth(e);
    const handleNameFilterChange = (e) => setNameFilter(e.target.value);

    const filteredData = data.filter(student => 
        student.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 table-container overflow-x-scroll">
            <h1 className="text-2xl font-bold mb-4">Control de Asistencia</h1>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="border p-2"
                    onChange={handleNameFilterChange}
                    value={nameFilter}
                />
                <SelectFilter handleChange={handleMonthChange}/>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 p-2">Jugador</th>
                                {
                                    data.length > 0 && Object.keys(data[0].attendance).map((date, index) => (
                                            <th key={index} className="border border-gray-200 p-2">{`${date} \n ${data[0]?.attendance[date]?.type || "-"}`}</th>
                                        ))
                                }
                            <th className="border border-gray-200 p-2">% de asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length > 0 ?
                                filteredData.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-200 p-2">{student.name}</td>
                                        {Object.keys(student.attendance).map((date, index) => (
                                            <td key={index} className="border border-gray-200 p-2 text-center">
                                                {student.attendance[date].status ? '✔️' : '❌'}
                                            </td>
                                        ))}
                                        <td className="border border-gray-200 p-2 text-center">
                                        {calculateAttendancePercentage(student.attendance).toFixed(2)}%
                                        </td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td colSpan={2} className="text-center p-2">No hay datos, CRACK!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AttendanceTable;
