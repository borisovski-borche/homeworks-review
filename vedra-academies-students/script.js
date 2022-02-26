//get the button from the HTML
let buttonOne = document.getElementById("addAcademy");
let buttonTwo = document.getElementById("completeSubject");
let buttonThree = document.getElementById("addSubject");

//create academy object
function Academy(name, students, subjects, start, end) {
  this.name = name;
  this.students = students || [];
  this.subjects = subjects || [];
  this.start = start;
  this.end = end;
  this.numberClasses = this.subjects.length * 10;
  this.printStudents = function printStudents() {
    //!Should just console.log() the students and not return
    this.subjects.forEach(console.log);

    return this.students.map(student => {
      return student;
    });
  };
  this.printSubjects = function printSubjects() {
    //!Should just console.log() the subjects and not return
    this.subjects.forEach(console.log(subject));

    return this.subjects.map(subject => {
      return subject;
    });
  };
}
//create subject object
function Subject(title, isElective, academy) {
  this.title = title;
  this.numberClasses = 10;
  this.isElective = isElective;
  this.academy = academy;
  this.students = [];
  this.overrideClasses = function overrideClasses(num) {
    if (num >= 3) {
      //!For assigning internal properties like this in an object/class you don't need return
      this.overrideClasses = num;

      // return (this.overrideClasses = num);
    }
  };
}

//create student object
function Student(name, lastName, age) {
  this.name = name;
  this.lastName = lastName;
  this.age = age;
  this.completedSubjects = [];
  this.academy = null;
  this.currentSubject = null;
  //when start academy is called push the student in the academy.student property
  this.startAcademy = function startAcademy(academyObj) {
    buttonOne.addEventListener("click", () => {
      //*Here i'm doing a more complex error checking to see if academy is an object and that it contains a students property.
      if (typeof academyObj === "object" && academyObj.students) {
        this.academy = academyObj;
        academyObj.students.push(this);
      } else {
        throw new Error("This is not a valid object, please read the manual");
      }
      console.log(student.academy);
      //!This only works if you have a global variable called academy , is not flexible for any number of academy objects, the line on 62 always always pushes into the academy we have as input, i know this might be a bit confusing because this is a param and not the object itself but because objects are reference types this would actually change the original object.
      // return (this.academy = input) + academy.students.push(this);
    });
  };
  //when start subject is called push the input in the current subject property, push the student into the subject.student property and when a new subject is added
  //add the previus subject to the completed subject array
  this.startSubject = function startSubject(subjectObj) {
    buttonThree.addEventListener("click", () => {
      //? IMPORTANT THE DOUBLE CONSOLE LOGS ARE BECAUSE WE ARE CREATING MULTIPLE EVENT LISTENERS (you could debug that in the future)
      if (typeof subjectObj !== "object") {
        throw new Error("This is not a valid object, please read the manual");
      }
      if (!this.academy) {
        throw new Error(
          "No academy present for Student, please read the manual"
        );
      }

      //* Using find to extract the subject that we are working with, if we find no subject then we return an error console.log()
      const subject = this.academy.subjects.find(
        obj => obj.title === subjectObj.title
      );
      if (subject) {
        //* Following if statment is used if we already have a current subject then we add it to the completed subjects array and then overwrite it with the input from the function above
        if (this.currentSubject) {
          this.completedSubjects.push(this.currentSubject);
        }
        this.currentSubject = subjectObj;
        //* To the already found subject object we add this (the current student)
        subject.students.push(this);
      } else {
        throw new Error(`Subject ${subjectObj.name} does not exist in academy`);
      }

      console.log(`==Start Log==`);
      console.log(this);
      console.log(`===========`);
      console.log(this.academy);
      console.log(`===========`);
      console.log(this.currentSubject);
      console.log(`===========`);
      console.log(this.completedSubjects);
      console.log(`===========`);
      console.log(this.currentSubject);
      console.log(`===End Log===`);
      // if (
      //   this.academy &&
      //   this.academy.subjects.some(sb => sb.title == subjectObj)
      // ) {
      //   return (this.currentSubject = subjectObj + subject.students.push(this));
      // } else {
      //   throw new Error();
      // }
    });

    // buttonTwo.addEventListener("click", () => {
    //! Using the + here is confusing to read, better to work with assignments like these using seperate lines like i did on line 61 and 62, also you don't need to return anything here as well, you are just working within the properties of the object.
    //   return (
    //     this.completedSubjects.push(this.currentSubject) +
    //     (this.currentSubject = input)
    //   );
    // });
  };
}

let academy = new Academy("someAcc", [], [], "October", "November");
academy.printStudents();
let basicJS = new Subject("Basic JS", false, academy);
let advancedJS = new Subject("Advanced JS", false, academy);
let basicCSharp = new Subject("Basic CSharp", true, academy);

console.log(academy);
academy.subjects = [basicJS, advancedJS, basicCSharp];

let student = new Student("First", "Student", 22);
console.log(student);
student.startAcademy(academy);

//? TWO CALLS CREATES TWO EVENT LISTENERS
student.startSubject(basicJS);
student.startSubject(advancedJS);

// let randomStudent = new Student("Second", "Student", 22);
// randomStudent.startAcademy(academy);

// randomStudent.startSubject("Basic JS", basicJS);
// randomStudent.startSubject("Basic CSharp", basicCSharp);
// student.startSubject("Basic CSharp", basicCSharp);
// console.log(randomStudent);
// console.log(basicJS);
// console.log(basicCSharp);
// console.log(advancedJS);
