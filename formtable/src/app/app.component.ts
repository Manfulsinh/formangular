import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Employee {
  No: number;
  Name: string;
  Weight: number;
  RollNo: number;
  Details: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'formtable';
  displayedColumns: string[] = ['No', 'Name', 'Weight', 'RollNo', 'Details'];
  dataSource = new MatTableDataSource<Employee>();
  employees: Employee[] = []; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      this.employees = JSON.parse(savedEmployees);
    }

    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: "30%" });

    dialogRef.afterClosed().subscribe((newEmployee: Employee) => {
      if (newEmployee) {
          this.employees.push(newEmployee);
          this.dataSource.data = [...this.employees];
          this.saveToLocalStorage();
      }
    });
  }

  editProduct(row: Employee) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    });

    dialogRef.afterClosed().subscribe((updatedEmployee: Employee) => {
      if(updatedEmployee) {
          const index = this.employees.findIndex((emp: Employee) => emp.No === updatedEmployee.No);
          if (index !== -1) {
              this.employees[index] = updatedEmployee;
              this.dataSource.data = [...this.employees];
              this.saveToLocalStorage();
          }
      }
    });
  }

  deleteProduct(row: Employee) {
    const index = this.employees.findIndex((emp: Employee) => emp.No === row.No);
    if (index !== -1) {
        this.employees.splice(index, 1);
        this.dataSource.data = [...this.employees];
        this.saveToLocalStorage();
    }
  }

  // The added method to save data to local storage
  saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }
}
