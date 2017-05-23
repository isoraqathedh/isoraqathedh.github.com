var alterniaClimateChart = {
	"data": {
		"temperature": [
			[-30, -20, "#8888FF"], // super cold
			[-20, -10, "#AAAAFF"], // very cold
			[-10,   0, "#CCCCFF"], // cold
			[  0,  10, "#EEEEFF"], // cool
			[ 10,  18, "#FFFFEE"], // mild
			[ 18,  27, "#FFCCAA"], // warm
			[ 27,  35, "#FFAA88"], // hot
			[ 35,  43, "#FF8866"], // very hot
			[ 43, 999, "#FF6666"]  // super hot
		],
		"rainfall": [
			[   0,  25, "#FFFFFF"], // very dry
			[  25,  50, "#DDDDFF"], // dry
			[  50, 100, "#BBBBFF"], // semi-dry
			[ 100, 150, "#9999FF"], // average
			[ 150, 200, "#7777FF"], // semi-wet
			[ 200, 250, "#5555FF"], // wet
			[ 250, 999, "#3333FF"]  // very wet
		],
		"rainyDays": [
			[  0,  3, "#FFFFFF"], // very dry
			[  3,  7, "#DDDDFF"], // dry
			[  7, 13, "#BBBBFF"], // semi-dry
			[ 13, 20, "#9999FF"], // average
			[ 20, 30, "#7777FF"], // semi-wet
			[ 30, 50, "#5555FF"], // wet
			[ 50, 86, "#3333FF"]  // very wet
		]
	}
}
