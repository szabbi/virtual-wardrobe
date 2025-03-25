package hu.unideb.inf.virtualwardrobe.service;

import hu.unideb.inf.virtualwardrobe.service.dto.ItemDto;

import java.util.List;

public interface ItemService {
    void saveItem (ItemDto item);
    void deleteItemById (Long id);
    List<ItemDto> getAllItems ();
}
