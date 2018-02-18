var dateFormat = require("dateformat");

dateFormat.i18n = {
    ...dateFormat.i18n,
    monthNames: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
}

export const formatDate = date => (
    dateFormat(date, "dd mmmm yyyy hh:MM TT.")
)