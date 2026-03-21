// class = blueprint that defines what an Order looks like
public class Order {

    // These are the fields (data) every Order object will have
    String orderId;
    String customerName;
    String orderType;
    String orderStatus;
    String paymentStatus;

    // Constructor = sets up the object with values in one step
    // "this." means "store this value into this object's field"
    public Order(String orderId, String customerName, String orderType,
                 String orderStatus, String paymentStatus) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.orderType = orderType;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
    }
}
