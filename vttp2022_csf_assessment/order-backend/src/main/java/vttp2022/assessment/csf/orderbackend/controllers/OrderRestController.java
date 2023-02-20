package vttp2022.assessment.csf.orderbackend.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path = "/api")
// @CrossOrigin("*")
public class OrderRestController {
    @Autowired
    private OrderService orderService;

    @PostMapping(path = "/order")
    public ResponseEntity<String> createOrder(@RequestBody String payload) {
        /*
         * Request Body - String represented as JSOn
         * {
         * "name": "fred",
         * "email": "fred@gmail.com",
         * "pizza_size": 6,
         * "thick_crust": true,
         * "sauce": "classic",
         * "toppings": [
         * "chicken","seafood","beef"
         * ],
         * "comments": "This pizza is amazing"
         * }
         */

         /*
          * {"name":"ted",
          "email":"ted@gmail.com",
          "size":2,
          "base":"thin",
          "sauce":"signature",
          "toppings":["chicken","cheese"],
          "comments":"woww"
        }
          */
        System.out.println(">>> payload: %s".formatted(payload));

        // Convert String Json into Json
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject json = reader.readObject();

        // Convert Json into Model Object
        this.orderService.createOrder(Order.createFromJson(json));

        JsonObject resp = Json.createObjectBuilder()
                .add("Message", "Order posted succesfully!")
                .build();

        return ResponseEntity.ok(resp.toString());
    }

    @GetMapping(path = "/order/{email}/all")
    public ResponseEntity<String> getOrdersByEmail(@PathVariable String email) {
        List<OrderSummary> orders = this.orderService.getOrdersByEmail(email);

        // List<Order Summary> -> JsonArray
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        // add each OrderSummary -> JsonObject
        orders.forEach(os -> arrBuilder.add(os.toJson()));

        JsonArray resp = arrBuilder.build();

        return ResponseEntity.ok(resp.toString());

    }
}
