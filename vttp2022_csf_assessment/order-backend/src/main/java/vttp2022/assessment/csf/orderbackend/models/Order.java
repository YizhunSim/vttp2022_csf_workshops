package vttp2022.assessment.csf.orderbackend.models;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

// IMPORTANT: You can add to this class, but you cannot delete its original content

public class Order {

	private Integer orderId;
	private String name;
	private String email;
	private Integer size;
	private String sauce;
	private Boolean thickCrust;
	private List<String> toppings = new LinkedList<>();
	private String comments;

	public void setOrderId(Integer orderId) { this.orderId = orderId; }
	public Integer getOrderId() { return this.orderId; }

	public void setName(String name) { this.name = name; }
	public String getName() { return this.name; }

	public void setEmail(String email) { this.email = email; }
	public String getEmail() { return this.email; }

	public void setSize(Integer size) { this.size = size; }
	public Integer getSize() { return this.size; }

	public void setSauce(String sauce) { this.sauce = sauce; }
	public String getSauce() { return this.sauce; }

	public void setThickCrust(Boolean thickCrust) { this.thickCrust = thickCrust; }
	public Boolean isThickCrust() { return this.thickCrust; }

	public void setToppings(List<String> toppings) { this.toppings = toppings; }
	public List<String> getToppings() { return this.toppings; }
	public void addTopping(String topping) { this.toppings.add(topping); }

	public void setComments(String comments) { this.comments = comments; }
	public String getComments() { return this.comments; }

	public static Order createFromJson(JsonObject json){
		// JsonObject from Orders page -> Order
		Order order = new Order();
		order.setName(json.getString("name"));
		order.setEmail(json.getString("email"));
		order.setSize(json.getInt("size"));
		order.setThickCrust(json.getBoolean("thick_crust"));
		order.setSauce(json.getString("sauce"));

		json.getJsonArray("toppings").forEach(t -> order.addTopping(t.toString()));

		order.setComments(json.getString("comments"));

		return order;
	}

	public static Order createFromSqlRowSet(SqlRowSet rs){
		Order order = new Order();
		order.setOrderId(rs.getInt("order_id"));
		order.setName(rs.getString("name"));
		order.setEmail(rs.getString("email"));
		order.setSize(rs.getInt("pizza_size"));
		order.setThickCrust(rs.getBoolean("thick_crust"));
		order.setSauce((rs.getString("sauce")));
		
		String toppingValues = rs.getString("toppings");
		if (toppingValues != null){
			// Split String into String []
			String[] toppings = toppingValues.split(",");
			for(String topping : toppings){
				// System.out.println("topping: %s".formatted(topping));
				// System.out.println("topping after substring: %s".formatted(topping.substring(1, topping.length()-1)));
				order.addTopping(topping.substring(1, topping.length()-1));
			}
		}

		order.setComments(rs.getString("comments"));
		return order;
	} 

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", name=" + name + ", email=" + email + ", size=" + size + ", sauce="
				+ sauce + ", thickCrust=" + thickCrust + ", toppings=" + toppings + ", comments=" + comments + "]";
	}

	
}
