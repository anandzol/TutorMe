const extractTimeSlots = (startTime, endTime) => {
    let startTimeHour = parseInt(startTime.split(':')[0]);
    let endTimeHour = parseInt(endTime.split(':')[0]);
    let timeSlotsArray = [];
    while (startTimeHour % 24 !== endTimeHour) {
        timeSlotsArray.push((startTimeHour % 24) + ':00');
        startTimeHour++;
    }
    return timeSlotsArray;
};

module.exports = {
    extractTimeSlots
};
