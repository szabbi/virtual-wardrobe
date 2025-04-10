package hu.unideb.inf.virtualwardrobe.service.dto;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OutfitDto {

    private Long id;

    @NotBlank(message = "Name is required.")
    private String name;

    private List<Long> items;

    private List<String> imagePaths;
}
