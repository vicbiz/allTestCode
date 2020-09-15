package day1.example;

/**
 * Created by jmoon on 5/22/19.
 */
public class MyFirstClass {
    public static void main(String[] args){

        for(int i = 2; i < 10; i++){
            for(int j = 1; j < 10; j++){
                System.out.println(i+" X "+j+" = "+i*j);
            }
            System.out.println();
        }

        int[] a = {10,20,30,40,50};
        int sum = 0;
        for(int i=0; i<a.length; i++){
            sum += a[i];
        }
        System.out.println("Sum : "+sum);


        sum = 0;
        int idx = 0;
        do{
            sum += a[idx];
            idx ++;
        } while (idx < a.length);
        System.out.println("Sum : "+sum);


        sum = 0;
        for(int num : a){
            sum += num;
        }
        System.out.println("Sum : "+sum);

        System.out.println();
        // ******************************

        String age = "37";
        String salary = "78950.52";

        int ageNum = Integer.parseInt(age);
        Double salaryNum = Double.parseDouble(salary);
        Double sumAgeSal = ageNum + salaryNum;
        System.out.println(sumAgeSal);

        System.out.println();
        // ******************************


        Employee alex = new Employee();
        Employee linda = new Employee();

        alex.name = "Alex Mocker";
        alex.salary = 12345.10;
        alex.bonus  = 111.30;
        System.out.println(alex.name+"'s Salary is $" + String.format("%,.2f" , alex.onlySalary()));
        System.out.println(alex.name+"'s Bonus is $" + String.format("%,.2f" , alex.onlyBonus()));
        alex.calculateTotalPay();
        System.out.println();

        linda.name = "Linda Heard";
        linda.salary = 222.22;
        linda.bonus  = 33.33;
        System.out.println(linda.name+"'s Salary is $" + String.format("%,.2f" , linda.onlySalary()));
        System.out.println(linda.name+"'s Bonus is $" + String.format("%,.2f" , linda.onlyBonus()));
        linda.calculateTotalPay();
        System.out.println();




    }
}
