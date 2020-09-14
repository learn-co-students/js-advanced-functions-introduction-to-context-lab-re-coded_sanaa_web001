// Your code here
function createEmployeeRecord(elements) {
    return {
        firstName: elements[0],
        familyName: elements[1],
        title: elements[2],
        payPerHour: elements[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(function (record) {
        return createEmployeeRecord(record);
    });
}

function createTimeInEvent(employee,dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

function createTimeOutEvent(employee,dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

function hoursWorkedOnDate(employee,dateMatched) {
    let inEvent = employee.timeInEvents.find(function (e) {
        return e.date === dateMatched;
    });
    let outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === dateMatched;
    });
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee,matchedDate) {
    let wageOnDate = hoursWorkedOnDate(employee, matchedDate) * employee.payPerHour;
    return parseFloat(wageOnDate.toString());
}

function calculatePayroll(employeesRecords) {
    return employeesRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec);
    }, 0);
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(function(record){
        return record.firstName === firstNameString;
});
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date;
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }.bind(employee), 0)  there? We'll discuss soon!

    return payable;
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
var x=wagesEarnedOnDate(cRecord, "0044-03-15")
console.log(x);