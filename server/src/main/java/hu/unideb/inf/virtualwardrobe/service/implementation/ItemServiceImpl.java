package hu.unideb.inf.virtualwardrobe.service.implementation;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import hu.unideb.inf.virtualwardrobe.data.entity.UserEntity;
import hu.unideb.inf.virtualwardrobe.data.repository.ItemRepository;
import hu.unideb.inf.virtualwardrobe.data.repository.UserRepository;
import hu.unideb.inf.virtualwardrobe.service.ItemService;
import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private static final String IMAGE_UPLOAD_DIRECTORY = System.getProperty("user.home") + "\\AppData\\Local\\";

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void saveItem(ItemDto item) {
        ItemEntity entity = modelMapper.map(item, ItemEntity.class);
        String currentUserEmail = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();

        entity.setUser(userRepository.findByEmail(currentUserEmail));

        itemRepository.save(entity);
    }

    @Override
    public void deleteItemById(Long id) {
        Long currentUserId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        ItemEntity item = itemRepository.findById(id).orElseThrow();
        if (!itemRepository.existsById(id) || !item.getUser().getId().equals(currentUserId)) {
            throw new RuntimeException("Item does not exist with this ID or item is not owned by current user.");
        }
        itemRepository.deleteById(id);
    }

    @Override
    public List<ItemDto> getAllItems() {
        Long currentUserId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        List<ItemEntity> items = itemRepository.findAllByUserId(currentUserId);

        return items.stream()
                .map(item -> modelMapper.map(item, ItemDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public String saveImage(MultipartFile file) throws IOException {
        Path uploadDir = Paths.get(IMAGE_UPLOAD_DIRECTORY, "Virtual Wardrobe", "Uploaded Images",
                String.valueOf(((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()));
        Files.createDirectories(uploadDir);

        Path filePath = uploadDir.resolve(file.getOriginalFilename());

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return file.getOriginalFilename();
    }

    @Override
    public Resource loadItemImage(String imageName) throws IOException {
        Long currentUserId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        Path imagePath = Paths.get(IMAGE_UPLOAD_DIRECTORY, "Virtual Wardrobe", "Uploaded Images", String.valueOf(currentUserId), imageName);

        return new UrlResource(imagePath.toUri());
    }
}
