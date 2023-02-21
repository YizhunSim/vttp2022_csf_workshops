package vttp2022.assessment.csf.orderbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;

import static vttp2022.assessment.csf.orderbackend.repositories.Queries.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createOrder(Order order) {
        String toppings = order.getToppings()
                .stream()
                .map(t -> t.toString())
                .collect(Collectors.joining(","));

        boolean isSuccess = this.jdbcTemplate.update(SQL_INSERT_INTO_ORDERS,
                order.getName(),
                order.getEmail(),
                order.getSize(),
                order.isThickCrust(),
                order.getSauce(),
                toppings,
                order.getComments()) > 0;

        if (isSuccess) {
            System.out.println("Successfully Inserted into orders");
        } else {
            System.out.println("Failed to insert into orders");
        }
    }

    public List<Order> getOrdersByEmail(String email) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_ORDERS_BY_EMAIL, email);

        final List<Order> orders = new LinkedList<>();

        // Attempt to move the cursor to the next row
        while (rs.next())
            // We have a record
            orders.add(Order.createFromSqlRowSet(rs));

        return orders;
    }
}
