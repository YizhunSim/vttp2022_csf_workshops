import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  routeSub$ !: Subscription;
  email !: string ;

  orderSummaries : OrderSummary[] = []

  constructor(private activatedRoute : ActivatedRoute, private pizzaSvc: PizzaService) {
    this.routeSub$ = this.activatedRoute.params.subscribe(params => {
        this.email = params['email'];
    })
  }

  ngOnInit(): void {
    this.pizzaSvc.getOrders(this.email)
    .then(res => {
      this.orderSummaries = res
      console.info(this.orderSummaries)
    })
    .catch(err => {
      console.error(err)
    })
  }

  ngOnDestroy(): void {
      this.routeSub$.unsubscribe();
  }

}
