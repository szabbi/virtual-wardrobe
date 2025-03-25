package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.UserEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.ItemRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.OutfitRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.UserRepository;
import hu.unideb.inf.virtualwardrobe.service.OutfitService;
import hu.unideb.inf.virtualwardrobe.service.dto.OutfitDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
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
    public void save(OutfitDto dto) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(currentUserEmail);

        List<ItemEntity> itemEntityList = itemRepository.findAllById(dto.getItems());
        OutfitEntity entity = new OutfitEntity();

        if (itemEntityList.size() != dto.getItems().size()) {
            throw new RuntimeException("One or more item ID is not valid.");
        }

        itemEntityList.forEach(item -> {
            if (!item.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Item " + item.getId() + " does not belong to the current user.");

            }
        });

        entity.setName(dto.getName());
        entity.setItems(itemEntityList);
        entity.setUser(currentUser);

        outfitRepository.save(entity);
    }
}
