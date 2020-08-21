// Your code here
function createEmployeeRecord(array){

  return {
    firstName:array[0],
    familyName:array[1],
    title:array[2],
    payPerHour:array[3],
    timeInEvents:[],
    timeOutEvents:[]
  }

}//
function createEmployeeRecords(array){
  return array.map(createEmployeeRecord);
}//

let createTimeInEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}
let createTimeOutEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}

function hoursWorkedOnDate(obj, timeStamp){
    let timeIn = obj.timeInEvents.find(x => x.date === timeStamp)
    let timeOut = obj.timeOutEvents.find(x => x.date === timeStamp)
    let result = (timeOut.hour - timeIn.hour) / 100
    return result
}

function wagesEarnedOnDate(employee,timestamp){
  let hoursWorked =hoursWorkedOnDate(employee,timestamp);
  let wage =hoursWorked * employee.payPerHour;
  return wage;

}//
function wagesEarnedOnDate(obj, timeStamp){
    return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour
}

function allWagesFor(employee){
  let dates=employee.timeInEvents.map(e =>{return e.date});
  let allWages =dates.reduce((total ,date) => total +wagesEarnedOnDate(employee ,date),0)
  return allWages;
}//

function findEmployeeByFirstName(employees ,firstName){
return  employees.find(emp =>{return emp.firstName=== firstName})
}//

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
