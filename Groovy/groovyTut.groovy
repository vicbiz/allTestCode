class GroovyTut {
    static void sum(int a, int b){
		int c = a + b;
		println(a+" + "+b+" = "+c);
    }


	static void main(String[] args){
		println("Hello");

        String test = "is Awesome !"
        println("---------------------------------")
        println("Jae Moon "+test+ " yeah!")
        println("---------------------------------")


        def range = 5..10;
        println(range);
        println("get2 "+range.get(2));
        println("[2] "+range[2]);

        for(int i = 0;i<5;i++) {
            println(i);
        }

        println("---------------------------------")

        int[] array = [0,1,2,3];
		println("size : "+array.size())
        for(int i in array) {
            println(i);
        }


        println("***********")
        for(int i=2; i<10; i++){
			for(int j=1; j<10; j++){
				println(i+" * "+j+" = "+(i*j));
			}
	       println("***********")
        }

        println("---------------------------------")
        println("max Integer :"+Integer.MAX_VALUE)
        println("min Integer :"+Integer.MIN_VALUE)
        println("max Float :"+Float.MAX_VALUE)
        println("min Float :"+Float.MIN_VALUE)
        println("max Double :"+Double.MAX_VALUE)
        println("min Double :"+Double.MIN_VALUE)

        println("---------------------------------")

        sum(4,5);

        println("---------------------------------")

        List<String> list = new ArrayList<String>();
        list.add("a");
        list.add("b");
        list.add("c");
        list.add("d");
        for(String item : list){
			println(item)
        }
        list.eachWithIndex{ it, i ->
			println(i+" : "+it);
        }
        println("---------------------------------")

        def printC = {
	
        }

        new File('./','Example.txt').withWriter('utf-8') { writer -> 
            writer.writeLine 'Hello World' 
            writer.writeLine 'Writing to Files' 
            writer.writeLine 'If you want to write to files, you need to use the writer class to output text to a file. The following example shows how this can be done.' 
            writer.writeLine 'If you open the file Example.txt, you will see the words “Hello World” printed to the file.' 
        }  

        println("---------------------------------")
        new File("./Example.txt").eachLine {  
            line -> println "line : $line"; 
        } 
	}
}