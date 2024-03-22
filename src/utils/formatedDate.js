const daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export function formatDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const formattedDate = `${daysWeek[new Date(year, month - 1, day).getDay()]} ${day.toString().padStart(2, '0')} de ${months[month - 1]} de ${year}`;
    return formattedDate;
}