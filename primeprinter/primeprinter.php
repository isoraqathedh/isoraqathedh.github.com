<!DOCTYPE html>
<html>
<head>
<title>Loops</title>
<link rel="stylesheet" href="../global/Default.css"/>
<script src="../global/general.js"></script>
</head>
<body>
<h1 id="Title">Loops exercise</h1>
<p>
<?php
    $sta = $_REQUEST['sta'];
    $lim = $_REQUEST['lim'];
    function primeTester($num) {
        if ($num == 2 || $num == 3) return true;
        else if ($num == 1) return false; 
        else {
            for ($i = 2; $i < floor(sqrt($num)) + 1; $i++) {
                //echo "<p>$num % $i = " . $num % $i . "</p>";
                if(($num % $i) == 0) return false;
            }
            return true;
        }
    }
    if ($sta >= $lim || !(is_numeric($sta) && $sta == floor($sta) && is_numeric($lim) && $lim == floor($lim))) {
        echo "You put in an illegal number! ";
        echo "<a href=\"index.php\">Return</a>";
    }
    else {
        for ($i = $sta; $i < $lim; $i++) {
            if(primeTester($i)) echo "$i ";
        }
    }
?>
</p>
</body>
</html>