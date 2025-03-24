package hu.unideb.inf.virtualwardrobe.data.entity;

import hu.unideb.inf.virtualwardrobe.data.entity.itemEnums.Season;
import hu.unideb.inf.virtualwardrobe.data.entity.itemEnums.Sizing;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "item")
public class ItemEntity {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_file", nullable = false)
    private String imageFile;

    @Column(name = "name")
    private String name;

    @Column(name = "size", nullable = false)
    @Enumerated(EnumType.STRING)
    private Sizing size;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "material")
    private String material;

    @Column(name = "pattern")
    private String pattern;

    @Column(name = "brand")
    private String brand;

    @Column(name = "fit")
    private String fit;

    @Column(name = "season", nullable = false)
    @Enumerated(EnumType.STRING)
    private Season season;

    @Column(name = "occasion")
    private String occasion;

    @Column(name = "purchaseDate")
    private LocalDate purchaseDate;

    @Column(name = "purchasePrice")
    private BigDecimal purchasePrice;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    public ItemEntity(String imageFile, String name, Sizing size, String type, String color, String material, String pattern, String brand, String fit, Season season, String occasion, LocalDate purchaseDate, BigDecimal purchasePrice) {
        this.imageFile = imageFile;
        this.name = name;
        this.size = size;
        this.type = type;
        this.color = color;
        this.material = material;
        this.pattern = pattern;
        this.brand = brand;
        this.fit = fit;
        this.season = season;
        this.occasion = occasion;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
    }
}
