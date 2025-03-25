package hu.unideb.inf.virtualwardrobe.service;

import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    void saveItem (ItemDto item);
    void deleteItemById (Long id);
    List<ItemDto> getAllItems ();
    String saveImage(MultipartFile file) throws IOException;
}
