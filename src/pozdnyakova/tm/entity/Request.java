package pozdnyakova.tm.entity;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @Column
    private String name;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date create_query;

    @ManyToMany
    @JoinTable(name = "jnd_request_filter",
        joinColumns = @JoinColumn(name = "request_fk"),
        inverseJoinColumns = @JoinColumn(name = "filter_fk")
    )
    private List<Filters> filters;
}
