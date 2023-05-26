module.exports = {
    getDateRange: (start, end) => {
        const dateArr = []
        for (
            let date = new Date(start);
            date <= new Date(end);
            date.setDate(date.getDate() + 1)
        ) {
            dateArr.push(new Date(date).toISOString().split('T')[0])
        }
        return dateArr;
    }
}