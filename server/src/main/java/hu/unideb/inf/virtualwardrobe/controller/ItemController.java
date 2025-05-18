package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.ItemService;
import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping("/items")
    public ResponseEntity<?> saveItem(@Valid @RequestBody ItemDto item) {
        try {
            itemService.saveItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body("Item added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @PutMapping("/items/update")
    public ResponseEntity<?> updateItem(@Valid @RequestBody ItemDto item) {
        try {
            itemService.saveItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body("Item updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItemById(@PathVariable Long id) {
        try {
            itemService.deleteItemById(id);
            return ResponseEntity.ok("Item deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/items/image")
    public ResponseEntity<?> uploadItemImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = itemService.saveImage(file);
            return ResponseEntity.ok().body(Map.of("filename", fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("items/image/{imageName}")
    public ResponseEntity<Resource> getItemImage(@PathVariable String imageName) throws IOException {
        return ResponseEntity.ok().body(itemService.loadItemImage(imageName));
    }
}
