package com.jmoon;

import com.jmoon.model.Product;

public class Main {

    public static void main(String[] args) {
	// write your code here ... sout -> System.out.println();


        printMessage("Hello World");


//        Product product = new Product("key board");
        Product product = new Product("Key Board");

        System.out.println(product.getName());
    }

    private static void printMessage(String message) {
        System.out.println(message);
        System.out.println(message);
    }
}
