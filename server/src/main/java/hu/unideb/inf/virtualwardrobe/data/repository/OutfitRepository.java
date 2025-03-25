package hu.unideb.inf.virtualwardrobe.data.repository;

import hu.unideb.inf.virtualwardrobe.data.entity.OutfitEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutfitRepository extends JpaRepository<OutfitEntity, Long> {
    @EntityGraph(attributePaths = {"items"})
    List<OutfitEntity> findAllByUserId(Long id);
}
