package hu.unideb.inf.virtualwardrobe.service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OutfitDto {

    private Long id;

    @NotBlank(message = "Name is required.")
    private String name;

    private List<Long> items;

    private List<String> imagePaths;
}
