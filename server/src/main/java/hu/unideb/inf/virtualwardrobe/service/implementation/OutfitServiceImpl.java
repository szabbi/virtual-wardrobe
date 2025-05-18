package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.UserEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.ItemRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.OutfitRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.UserRepository;
import hu.unideb.inf.virtualwardrobe.service.OutfitService;
import hu.unideb.inf.virtualwardrobe.service.UserService;
import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @Autowired
    UserRepository userRepository;

    @Override
    public void saveOutfit(OutfitDto dto) {
        UserEntity currentUser = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        List<ItemEntity> itemEntityList = itemRepository.findAllById(dto.getItems());
        OutfitEntity entity;

        if (itemEntityList.size() != dto.getItems().size()) {
            throw new RuntimeException("One or more item ID is not valid.");
        }

        itemEntityList.forEach(item -> {
            if (!item.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Item " + item.getId() +
                        " does not belong to the current user.");

            }
        });

        if (dto.getId() != null) {
            entity = outfitRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Outfit not found with ID: " + dto.getId()));

            if (!entity.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("You do not have permission to edit this outfit.");
            }
        } else {
            entity = new OutfitEntity();
            entity.setUser(currentUser);
        }

        entity.setName(dto.getName());
        entity.setItems(itemEntityList);
        entity.setUser(currentUser);

        outfitRepository.save(entity);
    }

    @Override
    public void deleteOutfitById(Long id) {
        Long currentUserId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        OutfitEntity item = outfitRepository.findById(id).orElseThrow();
        if (!outfitRepository.existsById(id) || !item.getUser().getId().equals(currentUserId)) {
            throw new RuntimeException("Outfit does not exist with this ID or item is not owned by current user.");
        }
        outfitRepository.deleteById(id);
    }

    @Override
    public List<OutfitDto> getAllOutfits() {
        Long currentUserId = ((UserEntity) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal()).getId();

        List<OutfitEntity> outfits = outfitRepository.findAllByUserId(currentUserId);

        return outfits.stream().map(outfit -> {
            List<ItemEntity> items = outfit.getItems();

            return new OutfitDto(
                    outfit.getId(),
                    outfit.getName(),
                    items.stream().map(ItemEntity::getId).toList(),
                    items.stream().map(ItemEntity::getImageFile).toList()
            );
        }).toList();
    }
}
