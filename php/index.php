
<? include "_header.php" ?>

    <?
        $f_name = "Jae Yeun";
        $l_name = "Moon";
        $age = 53;
        $height = 1.52;
        $can_vote = true;
        $address = array(
            'street' => '1751 Hedington Ct.',
            'city' => 'Lawrenceville',
            'state' => 'GA',
            'zip' => '30045'
        );
        define('PI', 3.14);

    ?>




    <h1> Hello <? echo($f_name . ', ' . $l_name); ?></h1>
    Address : <? echo $address['street'] .', '. $address['city'] .' '. $address['state'] .' '. $address['zip'] ; ?><br/>

    <form action="index.php" method="post">
        <label for="num1">num1 : </label>
        <input type="text" name="num1" /><br/>
        <label for="num2">num2 : </label>
        <input type="text" name="num2" /><br/>
        <input type="submit" value="submit" name="submit"/>
        <input type="reset" value="reset" name="reset"/>
    </form>

    <?
        $NumbersPosted = $_POST['num1'] && $_POST['num2'];

        // $NumbersPosted = isset($_POST['num1']) && isset($_POST['num2']);
        // echo $NumbersPosted.'<br/>';
        // echo array_key_exists('num1', $_POST).'<br/>';
        // echo 'isset _POST[submit] : '.isset($_POST['submit'])."<br/>";
        // echo 'isset _POST[reset] : '.isset($_POST['reset'])."<br/>";


        if($NumbersPosted){
            $num1 = $_POST['num1'];
            $num2 = $_POST['num2'];

            if(is_numeric($num1) && is_numeric($num2)){
                echo "<br/><br/><hr/>";
                echo "num1 : $num1 <br/>";
                echo "num2 : $num2 <br/>";
                echo "<hr/>";
                echo "$num1 + $num2 = ".($num1 + $num2)."<br/>";
                echo "$num1 - $num2 = ".($num1 - $num2)."<br/>";
                echo "$num1 * $num2 = ".($num1 * $num2)."<br/>";
                echo "$num1 / $num2 = ".($num1 / $num2)."<br/>";
                echo "intdiv(num1,  num2) = ".intdiv($num1, $num2)."<br/>";
                echo "$num1 % $num2 = ".($num1 % $num2)."<br/>";
                echo number_format(12345.6789, 2)."<br/>";
                echo number_format(12345.6789, 3, "#", "!");
            } else {
                echo "<p style='color:#ff0000'>Invalid Input</p>";
            }

        }
    ?>






    <?php
        $servername = "localhost";
        $username = "root";
        $password = "mysql";
        $dbname = "classicmodels";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT customerNumber, customerName, phone FROM customers";
        $result = $conn->query($sql);

        echo "<br><br/><h1>Customer DB</h1><table class='table table-hover'><thead><tr class='table-primary'><th>Customer Number</th><th>Name</th><th>Phone Number</th></tr></thead>";
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                // echo "customerNumber: " . $row["customerNumber"]. " - customerName: " . $row["customerName"]. " phone: " . $row["phone"]. "<br>";
                echo "<tr><td>" . $row["customerNumber"]. "</td><td>" . $row["customerName"]. "</td><td>" . $row["phone"]. "</td></tr>";
            }
        } else {
            echo "0 results";
        }
        echo "</table>";
        $conn->close();





    ?>



<? include "_footer.php" ?>
