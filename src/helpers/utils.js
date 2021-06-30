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

export const getPeriodicitySelectOptions = () => {
    return [
        {value: '', label: 'Selecione uma periodicidade'},
        {value: 'monthly', label: 'Mensal'},
        {value: 'quarterly', label: 'Trimestral'},
        {value: 'semiannual', label: 'Semestral'},
        {value: 'annual', label: 'Anual'},
    ];
}

export const getCategoriesSelectOptions = (categories = []) => {
    const emptyValue = [{ value: '', label: 'Selecione uma categoria' }];

    const options = categories.map(category => ({ value: category.id, label: category.name }));

    return  emptyValue.concat(options);
}

export const getExpirationDaysSelectOptions = () => {
    const emptyValue = [{ value: '', label: 'Selecione o dia de vencimento' }];

    const options = getExpirationDays().map(day => ({ value: day, label: day }));

    return emptyValue.concat(options);
}

export const getExpirationDays = () => {
    return [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28
    ];
}

export const convertCurrencyToPtBr = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export const convertBrDateToIso = (date) => {
    if (! date) {
        return date; 
    }

    return date.split('/').reverse().join('-');
}

export const convertIsoDateToBr = (date) => {
    if (! date) {
        return date;
    }

    return date.split('-').reverse().join('/');
}