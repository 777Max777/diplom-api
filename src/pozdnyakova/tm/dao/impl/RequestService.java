package pozdnyakova.tm.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pozdnyakova.tm.dao.RequestRepository;
import pozdnyakova.tm.entity.Request;

import java.util.List;

@Service
public class RequestService{

    @Autowired
    private RequestRepository requestRepository;

    public List<Request> findAll(){
        return requestRepository.findAll();
    }

    public void save(Request request){
        requestRepository.save(request);
    }
}
