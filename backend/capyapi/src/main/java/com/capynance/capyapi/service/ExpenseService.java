package com.capynance.capyapi.service;

import com.capynance.capyapi.domain.Expense;
import com.capynance.capyapi.repo.ExpenseRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.capynance.capyapi.constant.Constant.ICON_DIR;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepo expenseRepo;

    public Page<Expense> getAllExpenses(int page, int size){
        return expenseRepo.findAll(PageRequest.of(page, size, Sort.by("date")));
    }

    public Expense getExpense(String id){
        return expenseRepo.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public Expense createExpense(Expense expense){
        return expenseRepo.save(expense);
    }

    public void deleteExpense(Expense expense){
        expenseRepo.deleteById(expense.getId());
    }

//TODO Icons Upload

//    public String uploadIcon(String id, MultipartFile file){
//        log.info("Saving icon for expense ID: {}" id);
//        Expense expense = getExpense(id);
//        String iconUrl = iconFunc.apply(id, file);
//        expense.setIconUrl(iconUrl);
//        return iconUrl;
//    }
//
//    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
//            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");
//
//    private final BiFunction<String, MultipartFile, String> iconFunc = (id, icon) -> {
//        String filename = id + fileExtension.apply(icon.getOriginalFilename());
//        try {
//            Path fileStorageLocation = Paths.get(ICON_DIR).toAbsolutePath().normalize();
//            if(!Files.exists(fileStorageLocation)){ Files.createDirectories(fileStorageLocation); }
//            Files.copy(icon.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
//            return ServletUriComponentsBuilder
//                    .fromCurrentContextPath()
//                    .path("/expenses/icon" + filename).toUriString();
//        }catch (Exception exception){
//            throw new RuntimeException("Unable to save icon");
//        }
//    };
}
