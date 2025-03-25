package hu.unideb.inf.virtualwardrobe.service;

import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;

import java.util.List;

public interface OutfitService {
    void saveOutfit (OutfitDto outfit);
    void deleteOutfitById (Long id);
    List<OutfitDto> getAllOutfits ();
}
