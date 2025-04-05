package hu.unideb.inf.virtualwardrobe.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.unideb.inf.virtualwardrobe.data.entity.itemEnums.Season;
import hu.unideb.inf.virtualwardrobe.data.entity.itemEnums.Sizing;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemDto {

    private Long id;

    @NotBlank
    private String imageFile;

    @Size(max = 50, message = "The item name cannot be longer than 50 characters")
    private String name;

    @NotNull(message = "Sizing is required.")
    private Sizing size;

    @NotBlank(message = "Type is required.")
    private String type;

    @NotBlank(message = "Color is required.")
    private String color;

    @Nullable
    private String material;

    @Nullable
    private String pattern;

    @Nullable
    private String brand;

    @Nullable
    private String fit;

    @NotNull(message = "Season is required.")
    private Season season;

    @Nullable
    private String occasion;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent
    @Nullable
    private LocalDate purchaseDate;

    @Nullable
    private BigDecimal purchasePrice;
}
