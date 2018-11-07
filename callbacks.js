var donutOrder = function() {
var types, batters, toppings;
const ill = document.getElementById('ill');
var donutSelected = 0, 
	batterSelected = 0,
	jellySelected = 0, 
	toppingSelected = 0;
// var glob = [];
// var URL = 'http://www.richardkeightley.com/assets/donuts.json';

// writeData is the callback function
// var retrieve = () => getData(URL, writeData);

// for local development
const glob = [
	{
		"id": "0",
		"name": "Cake",
		"batters": [{
			"id":"21",
			"name": "Regular",
			"url": "images/CAKE_reg.png"	
		}, {
			"id": "22",
			"name": "Chocolate",
			"url": "images/CAKE_choc.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "images/CAKE_reg.png" },
			{ 
				"id": "111", 
				"type": "Glazed",
				"url":"images/CAKE-topping_glazed.png" 
			},
			{ 
				"id": "112", 
				"type": "Chocolate", 
				"url":"images/CAKE-topping_chocolate.png" 
			},
			{ 
				"id": "113", 
				"type": "Maple",
				"url":"images/CAKE-topping_maple.png" 
			},
			{ 
				"id": "114", 
				"type": "Sugar",
				"url":"images/CAKE-topping_sugar.png" 
			},
			{ 
				"id": "115", 
				"type": "Powdered Sugar",
				"url":"images/CAKE-topping_powdered_sugar.png" 
			}],
		"sprinkles": 
			[{ 
				"id": "201", 
				"name": "Chocolate",
				"url":"images/CAKE-topping_chocolate_sprinkles.png" 
			},
			{ 
				"id": "202", 
				"name": "Rainbow", 
				"url":"images/CAKE-topping_rainbow_sprinkles.png" 
			}]
	}, 
	{
		"id": "1",
		"name": "Raised",
		"batters": [{
			"id":"21",
			"name": "Regular",
			"url": "images/RAISED_reg.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "images/RAISED_reg.png" },
			{ 
				"id": "111", 
				"type": "Glazed",
				"url":"images/RAISED-topping_glazed.png" 
			},
			{ 
				"id": "112", 
				"type": "Chocolate", 
				"url":"images/RAISED-topping_chocolate.png" 
			},
			{ 
				"id": "113", 
				"type": "Maple",
				"url":"images/RAISED-topping_maple.png" 
			},
			{ 
				"id": "114", 
				"type": "Sugar",
				"url":"images/RAISED-topping_sugar.png" 
			},
			{ 
				"id": "115", 
				"type": "Powdered Sugar",
				"url":"images/RAISEDtopping_powdered_sugar.png" 
			}],
		"sprinkles": 
			[{ 
				"id": "201", 
				"name": "Chocolate",
				"url":"images/RAISED-topping_chocolate_sprinkles.png" 
			},
			{ 
				"id": "202", 
				"name": "Rainbow", 
				"url":"images/RAISED-topping_rainbow_sprinkles.png" 
			}]
	}, 
	{
		"id": "2",
		"name": "Old Fashioned",
		"batters": [{
			"id":"21",
			"name": "Regular",
			"url": "images/OF_reg.png"	
		}, {
			"id": "22",
			"name": "Chocolate",
			"url": "images/OF_choc.png"	
		}],
		"toppings":
		[{ 
			"id": "110", 
			"type": "None", 
			"url": "images/OF-reg.png" },
		{ 
			"id": "111", 
			"type": "Glazed",
			"url":"images/OF-topping_glazed.png" 
		},
		{ 
			"id": "112", 
			"type": "Chocolate", 
			"url":"images/OF-topping_chocolate.png" 
		},
		{ 
			"id": "113", 
			"type": "Maple",
			"url":"images/OF-topping_maple.png" 
		},
		{ 
			"id": "114", 
			"type": "Sugar",
			"url":"images/OF-topping_sugar.png" 
		}]
	}, 
	{
		"id": "3",
		"name": "Jelly-filled",
		"batters": [{
			"id":"21",
			"name": "Regular",
			"url": "images/JELLY_reg.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "images/JELLY-reg.png" },
			{ 
				"id": "112", 
				"type": "Chocolate",
				"url":"images/JELLY-topping_chocolate.png" 
			},
			{ 
				"id": "114", 
				"type": "Sugar",
				"url":"images/JELLY-topping_sugar.png" 
			},
			{ 
				"id": "115", 
				"type": "Powdered Sugar",
				"url":"images/JELLY-topping_powdered_sugar.png" 
			}],
		"filling": 
			[{ 
				"id": "301", 
				"type": "raspberry",
				"url": "images/JELLY-red.png"
			},
			{ 
				"id": "302", 
				"type": "lemon",
				"url": "images/JELLY-lemon.png"
			},
			{ 
				"id": "303", 
				"type": "cream",
				"url": "images/JELLY-cream.png"
			}]
	}];

// to access file from remote server
function getData(URL, callback){
    // build the request
    var request = new Request(URL,
        { method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          headers: new Headers({
              'Content-Type': 'text/plain'
          }),
          cache: 'default' 
    });

    // fetch with promise
    fetch(request).then( function(response) {
        if (response.ok) {
            // convert to JSON
            return response.json();
        }
    }).then ( function(data){
        glob = data;
        writeData(data);
    }).catch(function(err){
        console.log('Network request failed.');
    });
}

// retrieve the data (for remote server only)
// retrieve();

writeData(glob);

// display the types of donuts
// button for each type of donut
function writeData(glob){
	// create the donut type section
	var donutDiv = document.createElement('DIV');
	donutDiv.setAttribute('id', 'types');

	// create the donut type buttons
    for (donut of glob){
		var donutTypeBtn = document.createElement('DIV');
		donutTypeBtn.setAttribute('id', `${donut.id}`);
		donutTypeBtn.setAttribute('class', 'btn');
		let textNode = document.createTextNode(donut.name);
		donutTypeBtn.appendChild(textNode);
		donutDiv.appendChild(donutTypeBtn);
	}
	document.getElementById('choices').appendChild(donutDiv);
	types = document.getElementById('types');
	types.addEventListener('click', (e) => {
		console.log(e.target.id);
		var choice = parseInt(e.target.id);
		donutSelected = e.target.id;
		displayBatters(choice);
		// displaySprinkles(choice);
		showTypePic(choice);
		// if (choice==3)
		// 	displayJelly();
	});
}

function displayBatters(choice) {
	// remove all previous batter, topping, and sprinkles choices
	removeElById('batters');
	removeElById('toppings');
	removeElById('sprinkles');

	// create batter section
	var batterDiv = document.createElement('DIV');
	batterDiv.setAttribute('id', 'batters');
	// create "batter" choices below the donut type
	let str = '<br>Batter Flavor<br>';
	document.getElementById('choices').appendChild(batterDiv);
	var batterChoices = glob[choice].batters;
	for (batter of batterChoices) {
		str += `<span class="btn batter" id="batter-${batter.name}">${batter.name}</span>`;
	}
	batterDiv.innerHTML = str;

	// add event listener
	batters = document.getElementById('batters');
	batters.addEventListener('click', (e) => {
		console.log(e.target.id);
		showTypePic(choice, e.target.id);
		displayToppings(choice);
	});
}

function displayToppings(choice) {
	// remove all previous choices except batter
	removeElById('toppings');
	removeElById('sprinkles');
	
	// create topping section
	var toppingDiv = document.createElement('DIV');
	toppingDiv.setAttribute('id', 'toppings');
	let str = '<br>Available Toppings<br>';
	document.getElementById('choices').appendChild(toppingDiv);
	// show available toppings
    var tops = glob[choice].toppings;
    for (topping of tops) {
		// add small buttons
		str += `<SPAN class="btn topping" id=${topping.id}">${topping.type}</SPAN>`;
	}
	toppingDiv.innerHTML = str;
	
	// add event listener
	toppings = document.getElementById('toppings');
	toppings.addEventListener('click', (e) => {
		switch(e.target.id) {
			case '110': toppingSelected = 0;
			break;
			case '111': toppingSelected = 1;
			break;
			case '112': toppingSelected = 2;
			break;
			case '113': toppingSelected = 3;
			break;
			case '114': toppingSelected = 4;
			break;
			case '115': toppingSelected = 5;
			break;
		}
		displaySprinkles(choice);
		adjustToppingButtons(toppingSelected);
		showToppingPic(toppingSelected); 
	});
}

function displaySprinkles(choice){
	// remove all previous topping choices
	removeElById('sprinkles');

	var sprinklesDiv = document.createElement('DIV');
	sprinklesDiv.setAttribute('id', 'sprinkles');
	let str = '<br>Sprinkles<br>';
	document.getElementById('choices').appendChild(sprinklesDiv);
	var sprinkleChoices = glob[choice].sprinkles;
	if (sprinkleChoices) {
		for (sprinkle of sprinkleChoices) {
			str += `<span class="btn topping" id="${sprinkle.id}">${sprinkle.name}</span>`;
		}
	}
	sprinklesDiv.innerHTML = str;

	// add event listener
	sprinkles = document.getElementById('sprinkles');
	sprinkles.addEventListener('click', (e) => {
		console.log(e.target.id);
	});
}

function displayJelly(){
	var jellies = document.createElement('DIV');
	var str = '<br>Filling<br>';
	toppings.appendChild(jellies);
	var jellyChoices = glob[3].filling;

	for (jelly of jellyChoices) {
		str+= `<span class="btn topping" id="${jelly.id}">${jelly.type}</span>`;
	}
	jellies.innerHTML = str;
}

function showTypePic(choice, id){
	var idx = 0;
	if (id == 'batter-Chocolate')
		idx = 1;
	var basePic = glob[choice].batters[idx].url;
	ill.innerHTML = `<img src="${basePic}">`;
}

function adjustToppingButtons(idx) {
	// remove active class from all buttons
	let toppings = document.getElementsByClassName('topping');
	for (topping of toppings)
		topping.classList.remove('topping-active');
	// add active class to only the clicked button
	toppings[idx].classList.add('topping-active');
}

function showToppingPic(idx) {
		removeAllToppings();
		let topping = glob[donutSelected].toppings[idx];
		console.log(topping);
		var toppingImg = document.createElement('IMG');
		toppingImg.setAttribute('class', `donut-topping` );
		toppingImg.setAttribute('id', `topping-${topping.id}` );
		toppingImg.setAttribute('src', topping.url );
		ill.appendChild(toppingImg);
}

function removeAllToppings(){
	var delGlazed = document.getElementById('topping-110');
	if (delGlazed)
		delGlazed.parentNode.removeChild(delGlazed);
	var delChoc = document.getElementById('topping-111');
	if (delChoc)
		delChoc.parentNode.removeChild(delChoc);
	var delMaple = document.getElementById('topping-112');
	if (delMaple)
		delMaple.parentNode.removeChild(delMaple);
	var delSugar = document.getElementById('topping-113');
	if (delSugar)
		delSugar.parentNode.removeChild(delSugar);
	var delPowdered = document.getElementById('topping-114');
	if (delPowdered)
		delPowdered.parentNode.removeChild(delPowdered);
	var delChocSprinkles = document.getElementById('topping-115');
	if (delChocSprinkles)
		delChocSprinkles.parentNode.removeChild(delChocSprinkles);
}

// utility functions
function removeElsByClass(className) {
	var els = document.getElementsByClassName(className);

	while (els[0]) {
		els[0].parentNode.removeChild(els[0]);
	}
}

function removeElById(id){
	var el = document.getElementById(id);
	if (el)
		el.parentNode.removeChild(el);
}

}();

donutOrder;
