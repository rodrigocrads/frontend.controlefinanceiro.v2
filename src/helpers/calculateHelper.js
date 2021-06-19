export const sum = (revenuesOrExpensesList) => {
    const total = revenuesOrExpensesList
        .map(data => data.value)
        .reduce((a, b) => a + b, 0);

    return total || 0;
}