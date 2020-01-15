import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService, UserModel } from '../_service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hideAlert: boolean = true;
  errorMsg: string = 'Something wrong with server. please try again later';

  constructor(
    private _fb: FormBuilder,
    private _service: AppService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    const userid = localStorage.getItem('userid');
    if (userid != null) {
      this._router.navigate(['/transaction']);
    }
  }

  createForm() {
    this.form = this._fb.group({
      username: '',
      password: ''
    });
  }

  login() {
    const controls = this.form.controls;
    const _model = new UserModel();
    _model.username = controls['username'].value;
    _model.password = controls['password'].value;

    this._service.login(_model).subscribe((res: any) => {
      if (res.status === '1') {
        localStorage.setItem('userid', res.userid);
        this._router.navigate(['/transaction']);
      } else {
        if (typeof res.msg !== 'undefined') {
          this.errorMsg = res.msg;
        }
        this.hideAlert = false;
      }
    }, err => {
      if (typeof err.msg !== 'undefined') {
        this.errorMsg = err.msg;
      }
      this.hideAlert = false;
    });
  }

  focusFunction() {
    this.hideAlert = true;
  }

}
