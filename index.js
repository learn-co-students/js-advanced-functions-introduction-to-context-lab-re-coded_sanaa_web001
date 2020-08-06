/* Your Code Here */
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
// "2014-02-28 1400"
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
/*
 We're giving you employee function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for employee function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date;
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }.bind(employee), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
var x=wagesEarnedOnDate(cRecord, "0044-03-15")
console.log(x);
// The payroll system
// populates a record from an Array
//   1) has a function called createEmployeeRecord
//   createEmployeeRecord
//     2) populates a firstName field from the 0th element
//     3) populates a familyName field from the 1th element
//     4) populates a title field from the 2th element
//     5) populates a payPerHour field from the 3th element
//     6) initializes a field, timeInEvents, to hold an empty Array
//     7) initializes a field, timeOutEvents, to hold an empty Array
// process an Array of Arrays into an Array of employee records
//   8) has a function called createEmployeeRecords
//   createEmployeeRecords
//     9) creates two records
//     10) correctly assigns the first names
//     11) creates more than 2 records
// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//   12) has a function called createTimeInEvent
//   createTimeInEvent
//     13) creates the correct type
//     14) extracts the correct date
//     15) extracts the correct hour
// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
//   16) has a function called createTimeOutEvent
//   createTimeOutEvent
//     17) creates the correct type
//     18) extracts the correct date
//     19) extracts the correct hour
// Given an employee record with a date-matched timeInEvent and timeOutEvent
//   20) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//   hoursWorkedOnDate
//     21) calculates that the employee worked 2 hours
// Given an employee record with a date-matched timeInEvent and timeOutEvent
//   22) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//   wagesEarnedOnDate
//     23) calculates that the employee earned 54 dollars
// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//   24) allWagesFor aggregates all the dates' wages and adds them together
//   allWagesFor
//     25) calculates that the employee earned 378 dollars
// Given an array of multiple employees
//   26) calculatePayroll aggregates all the dates' wages and adds them together
//   calculatePayroll
//     27) calculates that the employees earned 770 dollars
// runs payroll using the mock data provided by Ultron data systems
//   Dependent functions: createEmployeeRecords
//     takes CSV data, returns an array of employee records
//       28) exists
//       29) returns an Array with 2 records for Loki and Natalia
//   Dependent functions: findEmployeeByFirstName
//     30) exists
//     31) finds "Loki" 
//   Full Payroll Test
//     from several imported CSV structures
//       calculatePayroll
//         32) exists
//         33) correctly sums the payroll burden to $11,880 when passed an array of employee records

