import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  title = 'Employee managment';

  employeeForm: FormGroup = new FormGroup({}); 
  employeeObj: EmployeeModel = new EmployeeModel(); 
  employeeList: EmployeeModel[] = []; 
 
  constructor() {
    this.createForm(); 
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData; 
    }
  }


  reset() {
    this.employeeObj = new EmployeeModel(); 
    this.createForm();
  }

 
  createForm() { 
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId), 
      name: new FormControl(this.employeeObj.name, [Validators.required]), 
      postion: new FormControl(this.employeeObj.postion),
      department: new FormControl(this.employeeObj.department),
      performance_rating: new FormControl(this.employeeObj.performance_rating),
      
    });  
  }
  
 
  onSave() {
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) { 
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1); // Assigning a new ID
      this.employeeList.unshift(this.employeeForm.value); // Adding the new employee to the top of the list
    } else {
      this.employeeForm.controls['empId'].setValue(1); // Start with ID 1 if no data exists
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList)); // Save the updated list to localStorage
    this.reset(); 
  }

 
  onEdit(item: EmployeeModel) {
    this.employeeObj = item; 
    this.createForm();
  }

 
  onUpdate() {
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
    if (record != undefined) {
      
      record.name = this.employeeForm.controls['name'].value;
      record.postion = this.employeeForm.controls['postion'].value;
      record.department = this.employeeForm.controls['department'].value;
      record.performance_rating = this.employeeForm.controls['performance_rating'].value;

    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList)); 
    this.reset(); 
  }

  
  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this item?"); 
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId == id); 
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }

  searchEmployees(event: any) {
    let filteredEmployees: EmployeeModel[] = [];

    if (event === '') {
      this.employeeList = this.employeeList;
    } else {
      filteredEmployees = this.employeeList.filter((val) => {
        let targetKey = val.name.toLowerCase()+ '' + val.department.toLowerCase() ;
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeeList = filteredEmployees;
    }
  }
  

}
