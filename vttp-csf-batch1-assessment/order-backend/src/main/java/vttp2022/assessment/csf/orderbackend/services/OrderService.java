package vttp2022.assessment.csf.orderbackend.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepository orderRepo;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {
		this.orderRepo.createOrder(order);
	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		List<OrderSummary> orderSummaries = new LinkedList<>();
		List<Order> orders = this.orderRepo.getOrdersByEmail(email);
		
		// Use priceSvc to calculate the total cost of an order
		Float totalCost = 0f;
		for (Order order : orders){
			OrderSummary os = new OrderSummary();

			// System.out.println("order size: %s".formatted(order.getSize()));
			totalCost += this.priceSvc.size(order.getSize());	
			
			// System.out.println("order sauce: %s".formatted(order.getSauce()));
			totalCost += this.priceSvc.sauce(order.getSauce());
								
			for (String topping : order.getToppings()){
				// System.out.println("order topping: %s".formatted(topping));
				totalCost += this.priceSvc.topping(topping);
			}

			// System.out.println("order isThickCrust: %s".formatted(order.isThickCrust()));

			if(Boolean.TRUE.equals(order.isThickCrust())){

				totalCost += this.priceSvc.thickCrust();
			} else{
				totalCost += this.priceSvc.thinCrust();
			}

			os.setOrderId(order.getOrderId());
			os.setName(order.getName());
			os.setEmail(order.getEmail());
			os.setAmount(totalCost);

			orderSummaries.add(os);
		}
		return orderSummaries;
	}
}
