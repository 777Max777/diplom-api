package pozdnyakova.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pozdnyakova.tm.entity.Classificator;

import java.math.BigInteger;

public interface ClassificatorRepository extends JpaRepository<Classificator,BigInteger> {
}
