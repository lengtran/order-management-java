package com.oms.repository;

import com.oms.model.OrderNote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderNoteRepository extends JpaRepository<OrderNote, Long> {
    List<OrderNote> findByOrderIdOrderByCreatedAtDesc(String orderId);
}
