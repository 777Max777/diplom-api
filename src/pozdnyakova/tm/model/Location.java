package pozdnyakova.tm.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Location {

    public Location(Long id, String itemName){
        this.setId(id);
        this.setItemName(itemName);
    }

    private Long id;
    private String itemName;
}
