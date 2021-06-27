export default class ActivationControl {

    start_date;
    end_date;
    periodicity;
    expiration_day;

    constructor({ start_date, end_date, periodicity, expiration_day }) {
        this.start_date = start_date;
        this.end_date = end_date;
        this.periodicity = periodicity;
        this.expiration_day = expiration_day;
    }
}