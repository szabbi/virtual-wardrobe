package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.ItemRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.OutfitRepository;
import hu.unideb.inf.virtualwardrobe.service.OutfitService;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OutfitServiceImpl implements OutfitService {

    @Autowired
    OutfitRepository outfitRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public void save(OutfitDto dto) {
        OutfitEntity entity = new OutfitEntity();
        entity.setName(dto.getName());

        List<ItemEntity> itemEntityList = dto.getItems().stream()
                .map(itemId -> itemRepository.findById(itemId)
                        .orElseThrow(() -> new RuntimeException("Item ID not valid.")))
                .toList();

        entity.setItems(itemEntityList);

        outfitRepository.save(entity);
    }
}
