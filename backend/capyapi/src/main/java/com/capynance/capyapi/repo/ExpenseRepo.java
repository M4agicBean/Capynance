package com.capynance.capyapi.repo;

import com.capynance.capyapi.domain.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.cdi.JpaRepositoryExtension;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, String> {
    Optional<Expense> findById(String id);
    Optional<Expense> findByName(String name);
    Optional<Expense> findByDate(LocalDate date);
}
