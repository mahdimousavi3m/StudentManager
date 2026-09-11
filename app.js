let students = []; 


const addStudent = (id , name , age , major , grades) => {
    for(let i = 0 ; i < students.length; i++){
        if(id === students[i].id){
            return false; 
        }
    }

    let student = {
        id , 
        name ,
        age ,
        major , 
        grades
    }

    students.push(student) ; 

    return true ; 
}

const editStudent = (id , newName , newAge , newMajor , newGrades) => {
    for(let i = 0 ; i < students.length ; i++){
        if(id === students[i].id) {
            students[i].name = newName ; 
            students[i].age = newAge ; 
            students[i].major = newMajor ; 
            students[i].grades = newGrades ; 

            return true ; 
        }
    }

    return false ; 
}

const deleteStudent = (id) => {
    // for(let i = 0 ; i < students.length ; i++){
    //     if(id === students[i].id){
    //         students.splice(i , 1);
            
    //         return true ;
    //     }
    // }

    // return false ; 
    

    //by findIndex Method

   let result = students.findIndex((student) => {
        return student.id === id; 
    })

    if(result !== -1){
        students.splice(result , 1)

        return true; 
    }
    
    
     return false; 
    

}

const searchById = (id) => {
    // for(let i = 0 ; i < students.length ; i++){
    //     // if(id === students[i].id){
    //     //     return students[i]; 
    //     // }
        

    // }

    // return null; 

    //by find Method

   return students.find((student) => {
        return student.id === id ; 
    })
}

const searchStudentByMajor = (major) => { 
    // let result = []; 
    // for(let i = 0 ; i < students.length ; i++){
    //     if(major === students[i].major){
    //         result.push(students[i]); 
    //     }
    // }

    // return result; 


    //by filter Method

    return students.filter((student) => student.major === major)
}

const addGrade = (studentId , grade) => {
    for(let i = 0 ; i < students.length ; i++){
        if(studentId === students[i].id){
            students[i].grades.push(grade); 

            return true ; 
        }
    }

    return false;
}


const getStudentNames = () => students.map((student) => student.name)

const getStudentAges = () => students.map((student) => student.age);

const hasStudentOlderThan = (age) => students.some((student) => student.age > age);

const allStudentsAreAdults = () => students.every((student) => student.age >= age);

const getStudentsWithoutGrades = () => students.filter((student) => student.grades.length === 0);  

const hasMajor = (major) => students.some((student) => student.major === major); 

const studentHasGrade = (studentId , grade) => {

    for(let i = 0 ; i < students.length ; i++){
        if(students[i].id === studentId) {
          return ( students[i].grades.includes(grade)); 
        }
    } 

    return null ; 
}



const getStudentAverage = (studentId) => {
    let sum = 0 ;  

    for(let i = 0 ; i < students.length ; i++){

      if(studentId === students[i].id){
           
        if(students[i].grades.length === 0){
            return null; 
        }

        // for(let j = 0 ; j < students[i].grades.length ; j++){

        //         sum += students[i].grades[j]; 
            
        //     }


        // by reduce Method

        sum = students[i].grades.reduce((ac , currentValue) => {
            return ac + currentValue; 
        } , 0)

        // for get avg 
         return (sum /  students[i].grades.length );  
 
      }
    }

    return null ; 
}

const getTopStudent = () => {
   if(students.length === 0){
            return null;
        }

    let topStudent = students[0];
    let toptAvg = getStudentAverage(students[0].id); 
    let currentAvg;
    for(let i = 0 ; i < students.length ; i++){
        
       currentAvg = getStudentAverage(students[i].id);

       if (currentAvg !== null && currentAvg > toptAvg ){
          topStudent = students[i]; 
          toptAvg = currentAvg; 
       }
    }

    return topStudent ; 

}

const getStudentsSortedByAverage =  () => {
    if(students.length === 0){
        return null; 
    }

    let tempStudent = [...students]; 

    tempStudent.sort((a , b) => getStudentAverage(b.id) - getStudentAverage(a.id));
    
    return tempStudent; 
}


const  getStudentRank = (studentId) => {

  if(students.length === 0) {
    return null; 
  }

   let resultFunc = getStudentsSortedByAverage(); 
   let result = resultFunc.findIndex((student) => student.id === studentId); 
   
   if(result !== -1){
      return result + 1; 
   }

   return null ;

}


const getMajorStatistics = () => {
    let statistics = {}; 
    for(let i = 0 ; i < students.length ; i++){
        if(statistics[students[i].major] === undefined){
            statistics[students[i].major] = 1 ; 
        }
        else{
            statistics[students[i].major]++ ; 
        }
    }

    return statistics; 
}



const getMajorRank = (major) => {

     if(students.length === 0){
        return null ; 
    }

    let uniqueMajors = []; 
    let found ; 
    for(let i = 0 ; i < students.length ; i++){
        found = false ; 
        for(let j = 0 ; j < uniqueMajors.length ; j++){
            if(students[i].major === uniqueMajors[j]){
                found = true;  
            }
        }

        if(found === false ){
            uniqueMajors.push(students[i].major);
        }
        
    }

    let currentAvg; 
    let result = []; 
    for(let i = 0 ; i < uniqueMajors.length ; i++){
         currentAvg = getAverageByMajor(uniqueMajors[i]); 
         result.push({
            major : uniqueMajors[i], 
            average : currentAvg
         })
    }

    result.sort((a , b) => b.average - a.average); 

    let rankByIndex = result.findIndex((majorTarget) => majorTarget.major === major); 

    if(rankByIndex !== -1){
        return rankByIndex + 1 ; 
    }

    return null ;

}





const getOldestStudent = () => {
    if(students.length === 0){
        return null ; 
    }
    let maxAgeStudent = students[0];  
    for(let i = 0 ; i < students.length ; i++){
        if(students[i].age > maxAgeStudent.age){
            maxAgeStudent = students[i]; 
        }
    }

    return maxAgeStudent; 
}

const getStudentWithMostGrades = () => {
    if(students.length === 0){
        return null; 
    }

    let maxGradeStudent = students[0];
    
    for(let i = 0 ; i < students.length ; i++){
        if(students[i].grades.length > maxGradeStudent.grades.length){
            maxGradeStudent = students[i]; 
        }
    }

    return maxGradeStudent ; 
}


const getStudentsWithAverageAbove = (minAverage) => {
    let result = []; 
    
    for(let i = 0 ; i < students.length ; i++){

      let avgTarget = getStudentAverage(students[i].id); 

        if(avgTarget !== null && avgTarget >= minAverage){
          

            result.push(students[i]); 
        }

        }

         return result; 
}


