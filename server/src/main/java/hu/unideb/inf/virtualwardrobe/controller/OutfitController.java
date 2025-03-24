package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.OutfitService;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/outfit")
public class OutfitController {

    @Autowired
    OutfitService outfitService;

    @PostMapping("/new")
    public ResponseEntity<?> addNewOutfit(@Valid @RequestBody OutfitDto dto) {
        outfitService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Outfit saved.");
    }
}
