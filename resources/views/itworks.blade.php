<html>
    <head>
        <title>It works!</title>
        @vite('resources/css/app.css')
    </head>
    <body>
        <h1 class="text-3xl text-amber-300">It works!</h1>
        <x-header title="about it works" subtitle="yes it is working" />
        <?php
            $students2 = array(1 => "John", 2 => "Mike", 3 => "Emma", "4" => "Sophia", "5" => "Adam");
            print_r($students2);
            echo "<hr>";




            echo '<b>sort($students2)</b> ' . sort($students2) . " ". print_r($students2) . "<br>";
            echo '<b>rsort($students2)</b> ' . rsort($students2) . " ". print_r($students2) . "<br>";
            echo '<b>asort($students2)</b> ' . asort($students2) . " ". print_r($students2) . "<br>";
            echo '<b>arsort($students2)</b> ' . arsort($students2) . " ". print_r($students2) . "<br>";
            echo '<b>ksort($students2)</b> ' . ksort($students2) . " ". print_r($students2) . "<br>";
            echo '<b>krsort($students2)</b> ' . krsort($students2) . " ". print_r($students2) . "<br>";



            function calculate_interest($loan_amount, $interest_rate = 5) {
                $interest = $loan_amount * $interest_rate / 100;
                echo "Loan amout: $loan_amount <br>";
                echo "Interest rate: $interest_rate . "%" . <br>";
                echo "Total interest: $interest <br>";
            }

            calculate_interest(1000, 10);
         ?>
    </body>
</html>