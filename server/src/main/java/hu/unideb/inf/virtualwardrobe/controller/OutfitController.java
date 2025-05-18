package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.OutfitService;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OutfitController {

    @Autowired
    OutfitService outfitService;

    @PostMapping("/outfits")
    public ResponseEntity<?> saveOutfit(@Valid @RequestBody OutfitDto outfit) {
        outfitService.saveOutfit(outfit);
        return ResponseEntity.status(HttpStatus.CREATED).body("Outfit saved.");
    }

    @GetMapping("/outfits")
    public ResponseEntity<List<OutfitDto>> getAllOutfits() {
        return ResponseEntity.ok(outfitService.getAllOutfits());
    }

    @PutMapping("/outfits/update")
    public ResponseEntity<?> updateOutfit(@Valid @RequestBody OutfitDto outfit) {
        outfitService.saveOutfit(outfit);
        return ResponseEntity.status(HttpStatus.CREATED).body("Outfit saved.");
    }

    @DeleteMapping("/outfits/{id}")
    public ResponseEntity<?> deleteOutfitById(@PathVariable Long id) {
        try {
            outfitService.deleteOutfitById(id);
            return ResponseEntity.ok("Item deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
