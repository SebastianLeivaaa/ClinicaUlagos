//Se almacenan los nombres de los meses
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 
'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 
'Octubre', 'Noviembre', 'Diciembre'];

//Se obtiene la fecha actual
const today = new Date();
//Se obtiene el dia de la fecha actual
const day = today.getDate();
//Almacenamos en otra variable el dia de la fecha actual 
const currentDay = today.getDate();
//Se obtiene el mes de la fecha actual
let month = today.getMonth();
//Se obtiene el anio de la fecha actual
let year = today.getFullYear();
//Almacenamos en otra variable el dia de la fecha actual
const currentMonth = month;
//Se obtiene el id del div que contiene el calendario
const divCalendar = document.getElementById('div-calendar');
//Se obtiene el id del div donde se muestre el mes y el anio 
const pMonthYear = document.getElementById('month-year');
//Obtenemos las horas disponibles de las citas medicas segun corresponda, aplicamos trim para que no hayan espacio y poder usar el formato correcto
let horas = document.getElementById('horas-disponibles').textContent.trim();
//Almacenamos las fechas disponibles en un array utilizando el split , para separar correctamente las horas, ya que se estan en ese formato ej: 2023-11-21, 2023-11-30, etc...
let hourAvailable = horas.split(',');
//Se obtiene la primera fecha disponible la mas proxima
let firstHour = hourAvailable[0];
//Eliminamos la primera fecha del array ya que la tenemos almacenada en la variable anterior
hourAvailable.shift();


//Se obtiene el mes siguiente al actual
function getNextMonth() {
    if(month !== 11){
        month++;
    }else {
        year++;
        month = 0;
    }
    calendar();
}

//Evento para cuando el usuario haga click en el boton de mes siguiente
const buttonNextMonth = document.getElementById('next-month');
buttonNextMonth.addEventListener('click', getNextMonth);

//Se obtiene el mes anterior al actual
function getPrevMonth() {
    if(month !== 0) {
        month--;
    }else{
        year--;
        month = 11;
    }
    calendar();
}

//Evento para cuando el usuario haga click en el boton de mes anterior
const buttonPrevMonth = document.getElementById('prev-month');
buttonPrevMonth.addEventListener('click', getPrevMonth);

//Funcion para determinar en que dia va empezar el mes por ejemplo lunes, martes, miercoles, etc...
function startDay() {
    const start = new Date(year, month, 1);
    return(start.getDay());
}

//Funcion para determinar si el anio es bisiesto o no
function leapYear() {
    return year % 4 === 0 ? true : false;
}

//Funcion que tiene un parametro, el cual va a ser el mes para obtener la cantidad de dias segun el mes que corresponda, verificamos todos los casos posibles
function getTotalDays(input) {
    if(input === 0 || input === 2 || input === 4 || input === 6 || input === 7 || input === 9 || input === 11) {
        return 31;
    }else if(input === 1 && leapYear()){
        return 29;
    }else if(input === 1 && !leapYear()){
        return 28;
    }else {
        return 30;
    }
}