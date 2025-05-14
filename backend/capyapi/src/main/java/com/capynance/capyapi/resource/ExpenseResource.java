package com.capynance.capyapi.resource;

import com.capynance.capyapi.domain.Expense;
import com.capynance.capyapi.repo.ExpenseRepo;
import com.capynance.capyapi.service.ExpenseService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.capynance.capyapi.constant.Constant.ICON_DIR;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseResource {
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        return ResponseEntity.created(URI.create("/expenses/userID")).body(expenseService.createExpense(expense));
    }

    @GetMapping
    public ResponseEntity<Page<Expense>> getExpenses(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(expenseService.getAllExpenses(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(expenseService.getExpense(id));
    }

    @DeleteMapping
    public void deleteEntity(@RequestBody Expense expense) {
        expenseService.deleteExpense(expense);
    }

// TODO: For future implementations

//    @PutMapping("/photo")
//    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file")MultipartFile file) {
//        return ResponseEntity.ok().body(expenseService.uploadPhoto(id, file));
//    }


//    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
//    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
//        return Files.readAllBytes(Paths.get(ICON_DIR + filename));
//    }

}
