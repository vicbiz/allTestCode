package com.jymoon;

import java.awt.*;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

//        Primitive Variable
        byte    v1 = 30;            // 1 byte   -128 ~ 127
        short   v2 = 12345;         // 2 byte   -32k ~ 32k
        int     v3 = 123_456_789;   // 4 byte   -2B ~ 2B
        long    v4 = 123_456_789;   // 8 byte
        float   v5 = 123456.123F;   // 4 byte
        double  v6 = 123456.123;    // 8 byte
        char    v7 = 'A';           // 2 byte
        boolean v8 = true;          // 1 byte

//        Reference Variable (Object)
        Date date = new Date();
        System.out.println(date);

//        Point Variable ... Reference Memory Address
        Point p1 = new Point(1,1);
        Point p2 = p1;
        p2.y = 2; // both p1, p2 changed
        System.out.println(p1);
        System.out.println(p2);

//        String helloText = "Hello Mr. Moon";
        String helloText = new String("Hello Mr. Moon"); // Redundant
        System.out.println(helloText);

//        Array
        int[] numbers = new int[5];
        numbers[0] = 1;
        numbers[1] = 2;
        // numbers[6] = 6; // Error
        System.out.println(Arrays.toString(numbers));

        int[] numbers1 = new int[] { 1,3,5,6,4,9 };
        System.out.println(Arrays.toString(numbers1));
        System.out.println("numbers1[1] : "+numbers1[1]);
        System.out.println("length : "+numbers1.length);

        Arrays.sort(numbers1);
        System.out.println(Arrays.toString(numbers1));

        Integer[] cubes = new Integer[] { 8, 27, 64, 125, 256 };
        Arrays.sort(cubes, Collections.reverseOrder());
        System.out.println(Arrays.toString(cubes));

        Arrays.sort(cubes);
        System.out.println(Arrays.toString(cubes));

        // Multi Dimensional Array deepToString()
        int[][] numbers2 = new int[2][3];
        numbers2[0][0] = 1;
        numbers2[1][0] = 2;
        System.out.println(Arrays.deepToString(numbers2));

        int[][] numbers3 = new int[][] { {1,2,3}, {4,5,6} };
        System.out.println(Arrays.deepToString(numbers3));

        // constant
        final float pi = 3.14F;

        // division
        double result = (double)10 / (double)3;
        System.out.println(result);

        // Implicit Casting -- Automatic conversion
        // byte -> short -> int -> long -> float -> double
        short x = 1;
        int y = x + 2;
        System.out.println(y);

        double z1 = 1.1;
        double z2 = z1 + 2; // 2 convert to double 2.0
        System.out.println(z2);

        // Explicit Casting
        double z3 = 1.1;
        int z4 = (int)z3 + 2;
        System.out.println(z4);

        String x1 = "100";
        int x2 = Integer.parseInt(x1);
        int x3 = x2 +10;
        System.out.println(x3);

        // Abstract Class... cannot use 'new'
        // NumberFormatException currency = new NumberFormat(); // Error
        NumberFormat currency = NumberFormat.getCurrencyInstance();
        String result1 = currency.format(1234567.899);
        System.out.println(result1);

        NumberFormat percent1 = NumberFormat.getPercentInstance();
        String result2 = percent1.format(0.23);
        System.out.println(result2);

        // Chain Methods
        String result3 = NumberFormat.getPercentInstance().format(0.423);
        System.out.println(result3);

        // Input
        Scanner scanner = new Scanner(System.in);
        System.out.print("Name :");
        String name = scanner.next(); // only take first word
        System.out.println("You are "+ name);

        Scanner scanner1 = new Scanner(System.in);
        System.out.print("Name :");
        String name1 = scanner1.nextLine().trim(); // take all words
        System.out.println("You are "+ name1);

        // Ex) Calculate Mortgage
        final byte MONTH_IN_YEAR = 12;
        final byte PERCENT = 100;

        Scanner scanInput = new Scanner(System.in);

        System.out.print("Principle: ");
        int principle = scanInput.nextInt();

        System.out.print("Annual Interest Rate: ");
        float annualInterest = scanInput.nextFloat();
        float monthlyInterest = annualInterest / PERCENT / MONTH_IN_YEAR;

        System.out.print("Period (Years): ");
        byte years = scanInput.nextByte();
        int numberOfPayments = years * MONTH_IN_YEAR;

        double mortgage = principle * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

        String mortgageFormatted = NumberFormat.getCurrencyInstance().format(mortgage);
        System.out.println("Mortgage: "+mortgageFormatted);

        System.out.println("\n\n\n");

        // Ternary Operator
        int income = 120_000;
        String className = income > 100_000 ? "First" : "Economy";
        System.out.println("Class for income "+income+" is "+className);

        // for each
        String[] fruits = { "Apple", "Orange", "Grape" };
        for(int i=0; i < fruits.length; i++){
            System.out.println(fruits[i]);
        }
        System.out.println("\n");
        for (String fruit : fruits){
            System.out.println(fruit);
        }

        // JAVA
        /*
        // public : Accessible anywhere in this code base
        // static : call this method directly without create of instance
        // void   : without return value
            public static void main(String[] args){
            }

            abstract
            -- not defined implementation -- need to implement extended class !!! --- half baked...


        */


    }
}
