import redis.clients.jedis.Jedis;
import java.sql.*;

public class Worker {
    public static void main(String[] args) {
        try (Jedis redis = new Jedis("redis");
             Connection dbConn = DriverManager.getConnection(
                "jdbc:postgresql://db:5432/postgres", "postgres", "postgres")) {
            
            // Create votes table if not exists
            try (Statement st = dbConn.createStatement()) {
                st.execute(
                    "CREATE TABLE IF NOT EXISTS votes (id SERIAL PRIMARY KEY, vote VARCHAR(1))");
            }

            while (true) {
                String vote = redis.rpop("votes");
                if (vote != null) {
                    try (PreparedStatement pst = dbConn.prepareStatement(
                        "INSERT INTO votes (vote) VALUES (?)")) {
                        pst.setString(1, vote);
                        pst.executeUpdate();
                    }
                }
                Thread.sleep(100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}