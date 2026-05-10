import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers$!: Observable<Customer[]>;
  searchFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
    this.customers$ = this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure to delete this customer?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: () => {
        this.handleSearchCustomers();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // Bouton Accounts — navigue vers les comptes du client
  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/" + c.id);
  }
}
