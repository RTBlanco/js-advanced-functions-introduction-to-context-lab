// Your code here
function createEmployeeRecord(array){
  let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
  return obj
}

function createEmployeeRecords(array){
  return array.map(emp => createEmployeeRecord(emp));
}


function createTimeInEvent(employee, date){
  let timeIn = {
    type:"TimeIn",
    hour: parseInt(date.slice(11)),
    date: date.slice(0,10)
  }
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent(employee, date){
  let timeIn = {
    type:"TimeOut",
    hour: parseInt(date.slice(11)),
    date: date.slice(0,10)
  }
  employee.timeOutEvents.push(timeIn)
  return employee
}

function hoursWorkedOnDate(employee, date = employee.timeInEvents[0].date){
  let time = [...employee.timeOutEvents, ...employee.timeInEvents].filter((e)=> e.date === date)
  return time.reduce((a,c)=>(a.hour - c.hour) / 100)
}

function wagesEarnedOnDate(employee, date){
  return parseFloat((hoursWorkedOnDate(employee, date) * employee.payPerHour).toString())
}

function allWagesFor(employee){
  let dates = employee.timeInEvents.map(e => e.date)
  return dates.reduce((a,c) => a + wagesEarnedOnDate(employee, c), 0)
}

function findEmployeeByFirstName(array, firstName){
  return array.find((e)=> e.firstName === firstName )
}

function calculatePayroll(employees){ 
  return employees.reduce((a,c) => a + allWagesFor(c), 0)
}