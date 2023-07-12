FROM amazoncorretto:11

COPY target/app.jar app.jar

Expose 8080

CMD ["java", "-jar", "app.jar"]

