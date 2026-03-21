import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {

        // Connection details for your local MySQL database
        String url = "jdbc:mysql://localhost:3306/order_management";
        String user = "root";
        String password = "password";

        // ArrayList to hold orders pulled from the database
        ArrayList<Order> orders = new ArrayList<>();

        try {
            // Connects Java to MySQL
            Connection connection = DriverManager.getConnection(url, user, password);

            // Creates a statement to send SQL queries
            Statement statement = connection.createStatement();

            // Sends a SELECT query to get all orders
            ResultSet resultSet = statement.executeQuery("SELECT * FROM orders");

            // Loops through each row returned from the database
            while (resultSet.next()) {
                // Reads each column value from the current row
                String orderId = resultSet.getString("orderId");
                String customerName = resultSet.getString("customerName");
                String orderType = resultSet.getString("orderType");
                String orderStatus = resultSet.getString("orderStatus");
                String paymentStatus = resultSet.getString("paymentStatus");

                // Creates an Order object and adds it to the list
                orders.add(new Order(orderId, customerName, orderType, orderStatus, paymentStatus));
            }

            // Closes the connection
            connection.close();

        } catch (Exception e) {
            // Prints any connection or query errors
            System.out.println("Database error: " + e.getMessage());
        }

        // Loops through orders and runs troubleshooting logic
        for (Order currentOrder : orders) {
            System.out.println("============================");
            System.out.println("Order ID: " + currentOrder.orderId);
            System.out.println("Customer: " + currentOrder.customerName);
            System.out.println("Order Type: " + currentOrder.orderType);
            System.out.println("Order Status: " + currentOrder.orderStatus);
            System.out.println("Payment Status: " + currentOrder.paymentStatus);
            System.out.println("Troubleshooting Action:");

            if (currentOrder.orderStatus.equals("Failed")) {
                System.out.println(">>> Reprocess order");
            } else if (currentOrder.paymentStatus.equals("Declined")) {
                System.out.println(">>> Escalate to payment team");
            } else if (currentOrder.orderStatus.equals("Canceled")) {
                System.out.println(">>> Log cancellation and notify customer");
            } else {
                System.out.println(">>> No action needed");
            }
        }
    }
}
