package pozdnyakova.tm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import pozdnyakova.tm.dao.impl.RequestService;
import pozdnyakova.tm.entity.Request;
import java.text.SimpleDateFormat;

import java.util.Date;

@SpringBootApplication
//@EnableAutoConfiguration
public class SpringBootPostgreeApplication {

    @Autowired
    private RequestService requestService;

    public static void main(String[] args) {
        SpringApplication.run(SpringBootPostgreeApplication.class, args);
    }
/*
    @EventListener(ApplicationReadyEvent.class)
    private void testJpaMethods(){
        Request request = new Request();
        request.setName("Java Программист");
        request.setCreate_query(new Date());
        requestService.save(request);

        requestService.findAll().forEach(r -> {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(df.format(r.getCreate_query()));
        });
    }*/
}
