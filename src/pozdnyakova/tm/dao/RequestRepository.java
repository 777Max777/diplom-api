package pozdnyakova.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pozdnyakova.tm.entity.Request;

import java.math.BigInteger;

public interface RequestRepository extends JpaRepository<Request, BigInteger> {
}
