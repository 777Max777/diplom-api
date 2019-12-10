package pozdnyakova.tm.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Request {

    /*public Request(String queryNmae, List<Location> locations, Integer limit){
        this.queryNmae = queryNmae;
        this.locations = locations;
        this.limit = limit;
    }*/

    public Request(String queryNmae, Integer limit){
        this.queryNmae = queryNmae;
        this.limit = limit;
    }

    private String queryNmae;

    //private List<Location> locations;
    private Integer limit;
}
