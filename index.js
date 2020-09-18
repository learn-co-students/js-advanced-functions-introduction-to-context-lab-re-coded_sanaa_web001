// Your code here

function  createEmployeeRecord (data) {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

 function  createEmployees(employeeInfo) {
    return employeeInfo.map(function (info) {
        return createEmployeeRecord(info)
    })
}

 function  createEmployeeRecords(data) {
    return data.map(function (info) {
        return createEmployeeRecord(info)
    })
}

function createTimeInEvent (employeeRecord, dateStamp)
{
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
  }



  function createTimeOutEvent (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
  }
  
  
  function hoursWorkedOnDate(employeeRecord, dateRecord) {
    let inEvent = employeeRecord.timeInEvents.find(function (e) {
        return e.date === dateRecord
    })
    let outEvent = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === dateRecord
    })
    return (outEvent.hour - inEvent.hour) / 100
}



  function wagesEarnedOnDate(employeeRecord, dateRecord) {
    let wage = hoursWorkedOnDate(employeeRecord, dateRecord) * employeeRecord.payPerHour
    return wage
  }
  
  
   function allWagesFor (employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(function (e) {
        return e.date
    })

    let allPay = datesWorked.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return allPay
}

function findEmployeeByFirstName  (employeeArray, firstName) {
    return employeeArray.find(function (employee) {
        return employee.firstName === firstName
    })
}




 function calculatePayroll (allEmployeeRecords) {
    return allEmployeeRecords.reduce(function (mem, rec) {
        return mem + allWagesFor(rec)
    }, 0)
}





