import { useState } from "react";
import { getCurrentMonth } from "../utils/getMonth.util";

const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
];

const SelectFilter = ({ handleChange }) => {
    const [month, setMonth] = useState(getCurrentMonth());

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        handleChange(e.target.value);
    }

    return (
        <select className="border p-2" value={month} onChange={handleMonthChange}>
            {months.map(m => (
                <option key={m.value} value={m.value}>
                    {m.label}
                </option>
            ))}
        </select>
    )
}

export default SelectFilter;