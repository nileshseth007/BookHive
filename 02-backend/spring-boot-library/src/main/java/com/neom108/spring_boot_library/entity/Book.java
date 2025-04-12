package com.neom108.spring_boot_library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
//@Table(name = "book") //not necessary since table name is same as class name in lower case
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String description;

    private int copies;

    // spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    // this statement in application.properties will ensure JPA converts camel case to underscore format directly
    @Column(name = "copies_available")
    private int copiesAvailable;

    private String category;

    private String img;

//    public Book() {
//    }
//
//    public Book(Long id, String title, String author, String description, int copies, int copiesAvailable, String category, String img) {
//        this.id = id;
//        this.title = title;
//        this.author = author;
//        this.description = description;
//        this.copies = copies;
//        this.copiesAvailable = copiesAvailable;
//        this.category = category;
//        this.img = img;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getAuthor() {
//        return author;
//    }
//
//    public void setAuthor(String author) {
//        this.author = author;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public int getCopies() {
//        return copies;
//    }
//
//    public void setCopies(int copies) {
//        this.copies = copies;
//    }
//
//    public int getCopiesAvailable() {
//        return copiesAvailable;
//    }
//
//    public void setCopiesAvailable(int copiesAvailable) {
//        this.copiesAvailable = copiesAvailable;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//
//    public String getImg() {
//        return img;
//    }
//
//    public void setImg(String img) {
//        this.img = img;
//    }
//
//    @Override
//    public String toString() {
//        return "Book{" +
//                "id=" + id +
//                ", title='" + title + '\'' +
//                ", author='" + author + '\'' +
//                ", description='" + description + '\'' +
//                ", copies=" + copies +
//                ", copiesAvailable=" + copiesAvailable +
//                ", category='" + category + '\'' +
//                ", img='" + img + '\'' +
//                '}';
//    }
}
