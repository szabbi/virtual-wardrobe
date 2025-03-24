package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.ItemService;
import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping("/new")
    public ResponseEntity<?> addNewItem(@Valid @RequestBody ItemDto dto) {
        try {
            itemService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Item added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
