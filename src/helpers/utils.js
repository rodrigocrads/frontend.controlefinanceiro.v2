export const replacePeriodicity = (periodicity) => {
    switch(periodicity) {
        case 'quarterly':
            return 'Trimestral';
        case 'semiannual':
            return 'Semestral';
        case 'annual':
            return 'Anual';
        default:
            return 'Mensal';
    }
}

export const getExpirationDays = () => {
    return [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28
    ];
}

export const formatCurrencyValueToBR = (value) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}


export const convertBrDateToIso = (date) => {
    if (date === '') return date;

    return date.replaceAll("/", '-').split('-').reverse().join('-');
}