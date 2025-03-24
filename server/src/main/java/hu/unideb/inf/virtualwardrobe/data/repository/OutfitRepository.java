package hu.unideb.inf.virtualwardrobe.data.repository;

import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutfitRepository extends JpaRepository<OutfitEntity, Long> {
}
