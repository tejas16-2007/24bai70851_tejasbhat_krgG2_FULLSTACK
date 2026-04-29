class Student {

int id;
String name;
String email;
String course;

public Student(int id, String name, String email, String course){
this.id = id;
this.name = name;
this.email = email;
this.course = course;
}

public void display(){
System.out.println("ID: " + id);
System.out.println("Name: " + name);
System.out.println("Email: " + email);
System.out.println("Course: " + course);
}
}

public class Main {

public static void main(String[] args) {

Student s = new Student(
1,
"Kaif",
"kaif@gmail.com",
"CSE"
);

s.display();

}
}
