FROM maven:3.8.4-openjdk-17-slim AS builder

WORKDIR /app
COPY pom.xml .
COPY Worker.java .
RUN mvn compile assembly:single

FROM openjdk:17-slim
COPY --from=builder /app/target/worker-jar-with-dependencies.jar /worker.jar
CMD ["java", "-jar", "/worker.jar"]