fun main(args: Array<String>) {
    println("Hello, World!")

    val a: Int = 10000
    val d: Double = 100.00
    val f: Float = 100.00f
    val l: Long = 1000000004
    val s: Short = 10
    val b: Byte = 1

    println("Your Int Value is $a");
    println("Your Double  Value is $d");
    println("Your Float Value is $f");
    println("Your Long Value is $l");
    println("Your Short Value is $s");
    println("Your Byte Value is $b");


    val letter: Char = 'A'    // defining a variable        // Assigning a value to it
    println("$letter")


    val letter1: Boolean = true   // defining a variable         // Assinging a value to it
    println("Your character value is $letter1")

    var rawString: String  = "I am Raw String!"
    val escapedString : String  = "I am escaped String!\n"

    println("Hello!$escapedString")
    println("Hey!!$rawString")
}