package pozdnyakova.tm.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pozdnyakova.tm.dao.ClassificatorRepository;

@Service
public class ClassifyService {

    @Autowired
    private ClassificatorRepository classificatorRepository;


}
