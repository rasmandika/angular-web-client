import { Component, OnInit } from '@angular/core';
import { AppService } from '../_service/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  form: FormGroup;
  hideAlert: boolean = true;
  hidePulsa: boolean = true;
  harga: string = null;
  operator: string = null;
  number: number = null;

  errorMsg: string = 'Something wrong with server. please try again later';
  alertType: string = 'danger';

  operators: any[] = ['IM3', 'TELKOMSEL', 'THREE'];
  vouchers: any[] = [
    {pulsa: 'IM3-10', harga: '10000'},
    {pulsa: 'IM3-25', harga: '25000'},
    {pulsa: 'IM3-50', harga: '50000'},
  ];

  constructor(
    private _service: AppService,
    private _router: Router
  ) { }

  ngOnInit() {
    const userid = localStorage.getItem('userid');
    if (userid == null) {
      this._router.navigate(['/login']);
    }
  }

  getOperators() {
    this._service.operator().subscribe((res: any) => this.operators = res.operator.nama);
  }

  getVoucher(operator) {
    this._service.voucher(operator).subscribe((res: any) => this.vouchers = res.voucher);
  }

  fillUpNumber(value) {
    this.number = value;
    this.hideAlert = true;
  }

  selectOperator(value) {
    this.getVoucher(value);
    this.operator = value;
    this.hidePulsa = false;
    this.hideAlert = true;
  }

  selectVoucher(value) {
    this.hideAlert = true;
    this.vouchers.forEach(element => {
      if (element.pulsa == value) {
        this.harga = element.harga;
      }
    });
  }

  saveTransaction() {
    const data = {
      userid: localStorage.getItem('userid'),
      harga: this.harga
    }

    if (this.number == null || this.harga == null) {
      this.errorMsg = 'please fill up all form field';
      this.hideAlert = false;
      return;
    }

    this.errorMsg = 'Something wrong with server. please try again later';
    this._service.transaction(data).subscribe((res: any) => {
      if (res.status === '1') {
        this.errorMsg = res.msg;
        this.alertType = 'success';
      } else {
        if (typeof res.msg !== 'undefined') {
          this.errorMsg = res.msg;
        }
      }
      this.hideAlert = false;
    }, err => {
      if (typeof err.msg !== 'undefined') {
        this.errorMsg = err.msg;
      }
      this.hideAlert = false;
    });
  }

}
