package hu.unideb.inf.virtualwardrobe.data.repository;

import hu.unideb.inf.virtualwardrobe.data.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
}
