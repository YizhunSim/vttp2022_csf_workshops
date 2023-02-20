// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Order, OrderSummary } from "./models";

@Injectable()
export class PizzaService {

  LOCAL_ENDPOINT : string = "http://localhost:8080"
  ENDPOINT : string = 'https://disagreeable-silk-production.up.railway.app'

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order : Order) {
    const payload = {
      name: order.name,
      email: order.email,
      size: order.size,
      thick_crust: order.base == 'thick' ? true : false,
      sauce: order.sauce,
      toppings: order.toppings,
      comments: order.comments
    }
    console.info('CreateOrder: ', payload)
    return lastValueFrom(
    this.http.post(`/api/order`
    ,payload))
  }



  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email : string) : Promise<OrderSummary[]> {
    return lastValueFrom(
      this.http.get<OrderSummary[]>(`/api/order/${email}/all`)
    )
  }

}
