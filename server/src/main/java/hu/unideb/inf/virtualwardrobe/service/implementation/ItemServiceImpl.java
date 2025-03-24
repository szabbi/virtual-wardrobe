package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.ItemRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.UserRepository;
import hu.unideb.inf.virtualwardrobe.service.ItemService;
import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void save(ItemDto item) {
        ItemEntity entity = modelMapper.map(item, ItemEntity.class);
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        entity.setUser(userRepository.findByEmail(currentUserEmail));

        itemRepository.save(entity);
    }
}
