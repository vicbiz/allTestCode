package day1.example;

/**
 * Created by jmoon on 5/22/19.
 */
public class Employee {
    String name;
    double salary;
    double bonus;

    public void calculateTotalPay(){
        double totalPay = salary + bonus;
        System.out.println(name+"'s totalPay is $"+String.format("%,.2f" , totalPay));
    }

    public double onlySalary(){
        return salary;
    }

    public double onlyBonus(){
        return bonus;
    }
}

