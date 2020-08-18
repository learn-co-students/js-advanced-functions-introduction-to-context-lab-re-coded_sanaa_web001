// Your code here
// Your code here
function createEmployeeRecord(info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(
        function(object) {
            return createEmployeeRecord(object);
        }
    );
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(' ')[0];
    let hour = dateStamp.split(' ')[1];

    employeeRecord['timeInEvents'].push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
console.log(updatedBpRecord);


function createTimeOutEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(' ')[0];
    let hour = dateStamp.split(' ')[1];

    employeeRecord['timeOutEvents'].push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord
}



function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let dateIn = employeeRecord.timeInEvents.find(e => e.date === dateStamp);
    let dateOut = employeeRecord.timeOutEvents.find(e => e.date === dateStamp);
    // console.log(dateOut);
    // console.log(dateIn);
    return (dateOut['hour'] - dateIn.hour) / 100;
}





function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp);
}

function allWagesFor(employeeRecord) {
    return employeeRecord['timeInEvents'].reduce(
        function(sum, item) {
            return sum + wagesEarnedOnDate(employeeRecord, item.date);
        }, 0
    );
}

// let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);

// let updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");

// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")

// console.log(allWagesFor(cRecord));

// let hoursWorked = hoursWorkedOnDate(cRecord, '0044-03-15');
// console.log(wagesEarnedOnDate(cRecord, '0044-03-15'));

function findEmployeeByFirstName(records, firstName) {
    return records.find(
        function(record) {
            return record['firstName'] === firstName;
        }
    );
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
]
let emps = createEmployeeRecords(src)
let loki = findEmployeeByFirstName(emps, "Loki")

console.log(loki);



function calculatePayroll(records) {
    return records.reduce(
        function(sum, record) {
            return sum + allWagesFor(record);
        }, 0
    );
}
