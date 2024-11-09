export class EmployeeModel {
    empId: number;
    name: string;
    postion: string;
    department: string;
    performance_rating: number;
    
    
    
    constructor () {
      this.empId = 1;
      this.name = '';
      this.postion = '';
      this.department = '';
      this.performance_rating = 1;
      
      }
  }