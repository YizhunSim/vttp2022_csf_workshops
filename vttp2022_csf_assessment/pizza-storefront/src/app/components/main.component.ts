import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  form !: FormGroup;

  constructor(private fb: FormBuilder, private pizzaService : PizzaService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  createForm() : FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<boolean>(false, [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.fb.array([],[Validators.required]),
      comments: this.fb.control('', )
    })
  }

   onCheckboxChange(e: { target: { checked: any; value: any; }; }) {
    const toppings: FormArray = this.form.get('toppings') as FormArray;

    if (e.target.checked) {
      toppings.push(new FormControl(e.target.value));
    } else {
       const index = toppings.controls.findIndex(x => x.value === e.target.value);
       toppings.removeAt(index);
    }

  }

  submitForm(){
    const order = this.form.value as Order
    console.log(`submitForm`, order)
    this.pizzaService.createOrder(order)
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.error(err)
    })

    this.router.navigate(['orders', this.form.get('email')?.value])
  }

  getOrders(){
    this.router.navigate(['orders', this.form.get('email')?.value])
  }

}
