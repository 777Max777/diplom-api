package pozdnyakova.tm.controllers;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import pozdnyakova.tm.model.Location;
import pozdnyakova.tm.model.Request;
import ru.yaal.project.hhapi.HhApi;
import ru.yaal.project.hhapi.dictionary.Constants;
import ru.yaal.project.hhapi.dictionary.IDictionary;
import ru.yaal.project.hhapi.dictionary.entry.entries.area.Area;
import ru.yaal.project.hhapi.search.SearchException;
import ru.yaal.project.hhapi.search.parameter.Text;
import ru.yaal.project.hhapi.vacancy.Salary;
import ru.yaal.project.hhapi.vacancy.Vacancy;
import ru.yaal.project.hhapi.vacancy.VacancyList;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistica")
public class StatisticController {

    private Map<Integer,Map<String, Long>> statistic = new LinkedHashMap<>();
    private Map<Integer, Request> requests = new LinkedHashMap<>();

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/locations")
    public List<Location> getLocations(){
//        Map<Long, String> locations = new HashMap<>();
        List<Location> locations;
        /*for (Area area : Area.AREAS.toList()) {
//            locations.put(Long.valueOf(area.getId()), area.getName());
            Location loc = new Location(Long.valueOf(area.getId()), area.getName());
            locations.add(loc);
        }*/
        locations = Area.AREAS.toList()
                .stream()
                .map(area -> getOnlyAreas(area.getAreas().toList(), new ArrayList<>()))
                .flatMap(areas -> areas.stream())
                .map(area -> new Location(Long.valueOf(area.getId()), area.getName()))
                .collect(Collectors.toList());
        return locations;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/skills")
    public Map<String, Long> getSkills(@RequestParam(value = "rownum") Integer row) {
        return statistic.get(row);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/request")
    @ResponseBody
    public Collection<Request> getRequsts(){
        return requests.values();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/request")
    public void createRequeast(@RequestParam(value="text", required=false, defaultValue="Java Программист") String query,
                                          @RequestParam(value="limit", required=false) Integer limit,
                                          @RequestParam(value="salaryStart", required=false) Integer salaryStart,
                                          @RequestParam(value="salaryUntil", required=false) Integer salaryUntil) throws SearchException {
        if(limit == null) limit = 1999;
        VacancyList vacancies = HhApi.search(limit, new Text(query, Constants.VacancySearchFields.VACANCY_NAME),
                ((salaryUntil != null && salaryStart != null) ? new Salary(salaryStart, salaryUntil, Constants.Currency.RUR) : Constants.OnlyWithSalary.OFF));
        List<String> skills = new ArrayList<>();

            for (Vacancy vacancy : vacancies) {
                URL hhUrl = vacancy.getUrl();
                String content = null;
                try {
                    HttpURLConnection connection = null;
                    connection = (HttpURLConnection) hhUrl.openConnection();
                    connection.setRequestMethod("GET");
                    connection.connect();
                    content = readInputStreamToString(connection);
                    connection.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                if(content == null) continue;

                JSONObject jsonObject = new JSONObject(content);
//                if(StringUtils.isEmpty(jsonObject.get("key_skills"))) continue;

                JSONArray keySkills = new JSONArray(jsonObject.get("key_skills").toString());

                for (int i = 0; i < keySkills.length(); i++) {
                    JSONObject skill = keySkills.getJSONObject(i);
                    skills.add(skill.get("name").toString());
                }

            }

        if(CollectionUtils.isEmpty(skills)){
            return;
        }

        Map<String, Long> collections = skills.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        List<Map.Entry<String, Long>> list = new ArrayList<>(collections.entrySet());
        list.sort(Map.Entry.comparingByValue());

        Map<String, Long> sorted = new LinkedHashMap<>();
        for (int i = list.size()-1; i >= 0; i--) {
            sorted.put(list.get(i).getKey(), list.get(i).getValue());
        }

        Request request = new Request(query, limit);


        List<Map.Entry<Integer,Map<String, Long>>> entryList = new ArrayList<Map.Entry<Integer, Map<String, Long>>>(statistic.entrySet());
        if(CollectionUtils.isEmpty(entryList)){
            Map<String, Long> map = sorted;
            statistic.put(1, sorted);
            requests.put(1, request);
        }
        else {
            Map.Entry<Integer,Map<String, Long>> lastEntry = entryList.get(entryList.size()-1);
            statistic.put(lastEntry.getKey() + 1, sorted);
            requests.put(lastEntry.getKey() + 1, request);
        }
        //return sorted;
    }

    private List<Area> getOnlyAreas(List<Area> areas, List<Area> forReturn){
        for(Area area: areas){
            if(CollectionUtils.isNotEmpty(area.getAreas().toList())){
                getOnlyAreas(area.getAreas().toList(), forReturn);
                forReturn.add(area);
            }
            else{
                forReturn.add(area);
            }
        }
        return forReturn;
    }

    private String readInputStreamToString(HttpURLConnection conn)
            throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                conn.getInputStream(), "UTF-8"));
        StringBuilder builder = new StringBuilder();
        while (true) {
            String line = reader.readLine();
            if (line != null) {
                builder.append(line);
            } else {
                break;
            }
        }
        return builder.toString();
    }
}
