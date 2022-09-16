export const replacePeriodicity = (periodicity) => {
    switch(periodicity) {
        case 'quarterly': return 'Trimestral';
        case 'semiannual': return 'Semestral';
        case 'annual': return 'Anual';
        default: return 'Mensal';
    }
}

export const replaceFinancialTransactionType = (type) => {
    switch(type) {
        case 'expense': return 'Despesa';
        case 'revenue': return 'Receita';

        default: return 'Não identificado';
    }
}

export const replaceMonths = (month) => {
    switch(month) {
        case 'january': return 'Janeiro';
        case 'february': return 'Fevereiro';
        case 'march': return 'Março';
        case 'april': return 'Abril';
        case 'may': return 'Maio';
        case 'june': return 'Junho';
        case 'july': return 'Julho';
        case 'august': return 'Agosto';
        case 'september': return 'Setembro';
        case 'october': return 'Outubro';
        case 'november': return 'Novembro';
        case 'december': return 'Dezembro';
        default: return 'Mês não identificado!';
    }
}

export const replateMonthToInitials = (month) => {
    switch(month) {
        case 'january': return 'Jan';
        case 'february': return 'Fev';
        case 'march': return 'Mar';
        case 'april': return 'Abr';
        case 'may': return 'Mai';
        case 'june': return 'Jun';
        case 'july': return 'Jul';
        case 'august': return 'Ago';
        case 'september': return 'Set';
        case 'october': return 'Out';
        case 'november': return 'Nov';
        case 'december': return 'Dez';
        default: return 'Mês não identificado!';
    }
}

export const getPeriodicitySelectOptions = () => {
    return [{ value: 'monthly', label: 'Mensal' }];

    // TODO: desativado outras formas de periodicidade além de Mensal, 
    // devido a API ainda não ter implementado a lógica em cima dessas outras periodicidades
    // return [
    //     {value: '', label: 'Selecione uma periodicidade'},
    //     {value: 'monthly', label: 'Mensal'},
    //     {value: 'quarterly', label: 'Trimestral'},
    //     {value: 'semiannual', label: 'Semestral'},
    //     {value: 'annual', label: 'Anual'},
    // ];
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

export const fetchWithAuth = (url, method = 'GET', body = null) => {
    const params = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.getItem('financial_control_access_token') || ''),
        })
    }

    return fetch(url, params);
};

export const getCurrentDateBrFormat = (customDay = null) => {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    if (!!customDay) {
        return `${customDay}/${month}/${date.getFullYear()}`;
    }

    return `${date.getDate()}/${month}/${date.getFullYear()}`;
}

export const getLastDayOfMonth = (month = null) => {
    const now = new Date();

    if (!!month) {
        return new Date(now.getFullYear(), month, 0).getDate();
    }

    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}