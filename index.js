// Your code here
function createEmployeeRecord(srArr){

    let empInfo={
        firstName: srArr[0],
        familyName: srArr[1],
        title: srArr[2],
        payPerHour: srArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empInfo;
 }

function createEmployeeRecords(srArr){
     let recor = srArr.map(e=>createEmployeeRecord(e))
 return recor;
 }
 
 function createTimeInEvent(empinfo,time){
     let myTime= time.split(' ');
     let timeIn ={
         type: "TimeIn",
         hour: parseInt(myTime[1]),
         date: myTime[0]
     }
      let myObj= Object.assign({}, empinfo);
      myObj.timeInEvents.push(timeIn);
      return myObj;
 }
 
 function createTimeOutEvent(empinfo,time){
    let myTime2= time.split(' ');
    let timeOut ={
        type: "TimeOut",
        hour: parseInt(myTime2[1]),
        date: myTime2[0]
    }
     let myObj2= Object.assign({}, empinfo);
     myObj2.timeOutEvents.push(timeOut);
     return myObj2;
 }
 
 function hoursWorkedOnDate(empinfo, date){
    let startDate = empinfo.timeInEvents.find(e=>e.date === date);
    let endDate = empinfo.timeOutEvents.find(e=>e.date === date);
    let startHour= startDate.hour;
    let endHour= endDate.hour;
    let workHours=  (endHour-startHour)/100;
    return workHours;
 }

 function wagesEarnedOnDate(empinfo, date){
     let workHours= hoursWorkedOnDate(empinfo, date);
     let hourPayment = empinfo.payPerHour;
     let payRate = workHours * hourPayment;
     return payRate;
 }

 function allWagesFor(empinfo){
     let avDate=[];
    for(let i = 0; i < empinfo.timeInEvents.length; i++){
       avDate.push(wagesEarnedOnDate(empinfo, empinfo.timeInEvents[i].date))
    }
    let fullPayment = avDate.reduce(function (e, storage) {
        return e + storage}, 0);
    return fullPayment;
 }

 function calculatePayroll(recArr){
     let allPayment=0;
     for (let i=0; i<recArr.length; i++){
         allPayment= allPayment+allWagesFor(recArr[i])
     }
     return allPayment;
 }

 function findEmployeeByFirstName(recArr,firstName){
     let record= recArr.find(e=> e.firstName===firstName)
     return record;
 }