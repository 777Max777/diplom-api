package ru.yaal.project.hhapi;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import ru.yaal.project.hhapi.dictionary.entry.entries.area.Area;
import ru.yaal.project.hhapi.search.SearchException;
import ru.yaal.project.hhapi.search.parameter.Text;
import ru.yaal.project.hhapi.vacancy.VacanciesParser;
import ru.yaal.project.hhapi.vacancy.Vacancy;
import ru.yaal.project.hhapi.vacancy.VacancyList;
import ru.yaal.project.hhapi.vacancy.VacancyParser;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * »щем вакансии с текстом "Hello World"
 */
public class HelloWorldTest {

    @Autowired
    private VacancyParser parser;

    @Test
    public void helloWorld() throws SearchException, JSONException, IOException {
        VacancyList vacancies = HhApi.search(1999, new Text("Java программист"),  Area.AREAS.getById("1"));
        VacancyList vacanciesC = HhApi.search(1999, new Text("C# программист"), Area.AREAS.getById("1"));
        VacancyList vacanciesAndroid = HhApi.search(1999, new Text("Android разработчик"), Area.AREAS.getById("1"));

        vacancies.addAll(vacanciesC);
        vacancies.addAll(vacanciesAndroid);

        List<String> requirements = new ArrayList<>();
        System.out.println(vacancies.size());
        ObjectMapper mapper = new ObjectMapper();
        //Gson gson = new Gson();
//        try {
        File file = new File(System.getProperty("java.io.tmpdir"), "dumpForTest");
        FileWriter writer = new FileWriter(file);
        String regex = "\\+^[а-€]+";
        Pattern p = Pattern.compile(regex);
            for (Vacancy vacancy : vacancies) {
                if(!StringUtils.isEmpty(vacancy.getSnippet().getRequirement())) {
                    String row = vacancy.getSnippet().getRequirement().replace("<highlighttext>", "");
                    row = row.replace("</highlighttext>", "");
                    String[] splitiRow = row.split("\\. ");
                    requirements.addAll(Arrays.asList(splitiRow));

                    for (String req : splitiRow) {
                        String lowerReq = req.toLowerCase();
//                        Matcher m = p.matcher(lowerReq);
//                        if(m.matches()){
                            writer.append(lowerReq + "\n");
//                        }
                    }
                }

                if(!StringUtils.isEmpty(vacancy.getSnippet().getResponsibility())) {
                    String row = vacancy.getSnippet().getResponsibility().replace("<highlighttext>", "");
                    row = row.replace("</highlighttext>", "");
                    String[] splitiRow = row.split("\\. ");
                    requirements.addAll(Arrays.asList(splitiRow));

                    for (String req : splitiRow) {
                        String lowerReq = req.toLowerCase();
//                        Matcher m = p.matcher(lowerReq);
//                        if(m.matches()){
                            writer.append(lowerReq + "\n");
//                        }
                    }
                }

                /*URL hhUrl = vacancy.getUrl();
                HttpURLConnection connection = null;
                connection = (HttpURLConnection) hhUrl.openConnection();
                connection.setRequestMethod("GET");
                connection.connect();
                String content = readInputStreamToString(connection);
                connection.disconnect();
//                Vacancy vac = mapper.readValue(content, Vacancy.class);
                JSONObject jsonObject = new JSONObject(content);
                List<String> skills = new ArrayList<>();
                JSONArray keySkills = new JSONArray(jsonObject.getString("key_skills"));

                for (int i = 0; i < keySkills.length(); i++) {
                    JSONObject skill = keySkills.getJSONObject(i);
                    skills.add(skill.get("name").toString());
                    System.out.println(skill.get("name").toString());
                }*/
//                List<Base> keySkils = mapper.readValue(jsonObject.getString("key_skills"), new TypeReference<List<Base>>(){});
//                vacancy.setKeySkills(keySkils.st);
//                List<Base> keySkils = new Gson().fromJson(jsonObject.getString("key_skills"), )
            }

            writer.close();

//        } catch (IOException e) {
//            e.printStackTrace();
//        }
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
