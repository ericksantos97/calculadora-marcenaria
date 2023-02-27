import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public base!: number;
  public height!: number;
  public finalValue!: number;
  public showSpinner: boolean = false;
  public typeSelected: string;

  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.typeSelected = 'pacman';
  }

  ngOnInit() {
  }

  calculateSquareMeterPrice(form: NgForm) {
    this.spinner.show();

    this.finalValue = 0;

    const height = this.height / 100; // converter cm em metros antes, dividir por 100.
    const base = this.base / 100;
    const area = base * height; // resultado em metros quadrados
    const unitPrice = 25; // preço unitario da madeira

    this.finalValue = unitPrice * area;
    form.resetForm();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.openDialog();
      this.spinner.hide();
    }, 3000);
  }

  resetFields(form: NgForm) {
    form.resetForm();
  }

  disableButton() {
    return (!this.base || !this.height) || (Number(this.base) <= 0 || Number(this.height) <= 0);
  }

  openDialog() {
    this.dialog.open(DialogResultComponent, {
      data: {
        value: this.finalValue
      },
    });
  }

}
