<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<link rel="stylesheet" href="../global/Default.css" media="all"/>
<link rel="stylesheet" href="Styles/Alternia.css" media="all"/>
<link rel="shortcut icon" href="../global/Fav.png" />
<script src="../global/general.js"></script>
<title>The Alternian Gazetteer · A Beginner's Guide To Alternia</title>
</head>
<body>
<h1 id="Title"> A Beginner's Guide To Alternia: <br/> Gazetteer</h1>
<nav id="toc">
	Navigation
	<ul class="linkset">
		<li><a href="Galaxy.html">Supragalactic</a></li>
		<li><a href="System.html">Systemic</a></li>
		<li><a href="Planet.html">Planetary</a></li>
		<li><a href="TourN.html">The Northern Lands</a></li>
		<li><a href="TourS.html">The Southern Lands</a></li>
		<li><a href="Scratch.html">Effects of Temporal Manipulation</a></li>
	</ul>
</nav>
<nav id="gazetteerNav" class="linkset">
	The Gazetteer
	<ul>
		<li><a href="Gazetteer.php?start=A&end=H">A – H</a></li>
		<li><a href="Gazetteer.php?start=I&end=P">I – P</a></li>
		<li><a href="Gazetteer.php?start=Q&end=Z">Q – Z</a></li>
	</ul>
</nav>
<dl class="bigfatdatadump">
<?php
require_once "spyc.php";
$yml = spyc::YAMLLoad('SpecialFiles/Gazetteer.yml');

function letterChoke($in, $b, $e, $letterChokeSwitch) {
	// Matches between [letter1] and [letter2]
	$out = array();
	if (!$letterChokeSwitch) return $in;
	foreach ($in as $location) {
		if (ord(substr($location["name"], 0, 1)) < ord($b)) continue;
		else if (ord($e) < ord(substr($location["name"], 0, 1))) break;
		else $out[] = $location;
	}
	return $out;
}

function bigFilter($in) {
	if ($_REQUEST["start"] or $_REQUEST["end"]) {
		if (preg_match('/^[A-Z]$/', $_REQUEST["start"])) $beginLetter = $_REQUEST["start"];
		else $beginLetter = "A";
		if (preg_match('/^[A-Z]$/', $_REQUEST["end"])) $endLetter = $_REQUEST["end"];
		else $endLetter = "Z";
		$letterChokeSwitch = true;
	}
	$chokedLetter = letterChoke($in, $beginLetter, $endLetter, $letterChokeSwitch);
	return $chokedLetter;
}

function linkFix($stuff) {
	if ($stuff[2]) return "<a href='SingleView.php?item=" . filter_var($stuff[1], FILTER_SANITIZE_EMAIL) . "'>" . $stuff[2] . "</a>";
	else return "<a href='SingleView.php?item=" . filter_var($stuff[1], FILTER_SANITIZE_EMAIL) . "'>" . $stuff[1] . "</a>";
}

// Publish everything that matches
$lastLetter = "";
foreach(bigFilter($yml) as $location) {
	if ($lastLetter != substr($location["name"], 0, 1)) {
		$lastLetter = substr($location["name"], 0, 1);
		echo "</dl>\r\n<h1 id='ltr$lastLetter'>$lastLetter</h1>\r\n<dl class='bigfatdatadump'>";
	}
	if ($location["coordinates"]["longitude"] < 0) $longitude = -$location["coordinates"]["longitude"] . "°W";
	else $longitude = $location["coordinates"]["longitude"] . "°E";
	if ($location["coordinates"]["latitude"] < 0) $latitude = -$location["coordinates"]["latitude"] . "°S";
	else $latitude = $location["coordinates"]["latitude"] . "°N";
?>
	<dt class="<?php echo $location["biome"];?>"><?php echo $location["name"];?></dt>
	<dd>
		<p class="quickInfo">
			<span class="coordinates">Coordinates: <?php echo $longitude;?>, <?php echo $latitude;?></span>
			<?php foreach ($location["etymology"] as $etyItem) { 
				echo "<span class='etymology " . $etyItem["type"] . "'>" . $etyItem["origin"];
				if ($etyItem["type"] == "fannym" && $etyItem["linklist"]) {foreach ($etyItem["linklist"] as $source) {
					echo " <a href=$source>[→]</a>";
				}/* var_dump($etyItem["linklist"]);*/}
				echo "</span>";
			}?>
		</p>
		<?php
			$desc = $location["description"];
			if ($desc != "unnoteworthy" && $desc != "") {
				$desc = preg_replace_callback("/{{([^|}]+)}}/","linkFix",$desc);
        		$desc = preg_replace_callback("/{{([^|]+)\|([^}]+)}}/","linkFix",$desc);
        		echo "<p class='description'>$desc</p>";
        	}
		?>
	</dd>
<?php
}
?>
</dl>
<p class="note">
	Items marked with a ‡ indicate that the source is unavailable. Those interested in providing
	a source please contact me.
</p>
<footer>
	<h1>Navigation</h1>
	<nav class="linkset">
		<div id="this">
			<div id="sec"><strong>J</strong> Section</div>
			<div id="chapB">(000)</div>
			<div id="chapA">Part <strong>2</strong></div>
		</div>
		<a href="Gazetteer.html" id="prev" rel="prev">Previous</a>
		<a href="Gazetteer_search.html" id="prev" rel="prev">Next</a>
	</nav>
</footer>
</body>
</html>