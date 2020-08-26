// Your code here

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfRecords) {
  let newArray = [];

  arrayOfRecords.forEach((record) =>
    newArray.push(createEmployeeRecord(record))
  );

  return newArray;
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hours] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hours, 10),
    date,
  });
  return employee;
}

// * **Argument(s)**
//   * An employee record `Object`
//   * A date stamp (`"YYYY-MM-DD HHMM"`)
// * **Returns**
//   * The employee record
// * **Behavior**
//   * Add an `Object` with keys to the `timeOutEvents` `Array` on the record
//     `Object`:
//     * `type`: Set to `"TimeOut"`
//     * `hour`: Derived from the argument
//     * `date`: Derived from the argument

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

// * **Argument(s)**
// * An employee record `Object`
// * A date of the form `"YYYY-MM-DD"`
// * **Returns**
// * Hours worked, an `Integer`
// * **Behavior**
// * Given a date, find the number of hours elapsed between that date's
// timeInEvent and timeOutEvent

function hoursWorkedOnDate(employee, dateOfDiff) {
  let inEvent = employee.timeInEvents.find((e) => e.date === dateOfDiff);
  let outEvent = employee.timeOutEvents.find((e) => e.date === dateOfDiff);

  // let hourseWorked = employee.timeOutEvents.hour - employee.timeInEvents.hour;

  return (outEvent.hour - inEvent.hour) / 100;
}

// test
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
// let test = hoursWorkedOnDate(cRecord, "0044-03-15");
// console.log(test);

// * **Argument(s)**
//   * An employee record `Object`
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Pay owed
// * **Behavior**
//   * Using `hoursWorkedOnDate`, multiply the hours by the record's
//     payRate to determine amount owed. Amount should be returned as a number.

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

// test

// * **Argument(s)**
//   * An employee record `Object`
// * **Returns**
//   * Pay owed for all dates
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number. **HINT**: You will need to find the available dates somehow...

function allWagesFor(employee) {
  let availableDates = employee.timeInEvents.map((e) => e.date);
  let pay = availableDates.reduce(
    (acc, date) => acc + wagesEarnedOnDate(employee, date),
    0
  );
  return pay;
}

// ### `calculatePayroll`

// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed to all employees for all dates, as a number
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number.

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce((acc, record) => acc + allWagesFor(record), 0);
}

// ### `findEmployeeByFirstName`

// * **Argument(s)**
//   * `srcArray`: Array of employee records
//   * `firstName`: String representing a first name held in an employee record
// * **Returns**
//   * Matching record or `undefined`
// * **Behavior**
//   * Test the `firstName` field for a match with the `firstName` argument

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((e) => e.firstName === firstName);
}
