var donutOrder = function() {
	var donutSelected = 0, 
	batterSelected = 0,
	jellySelected = 0, 
	toppingSelected = 0;
	
// global variables (within this scope)	
const types = document.getElementById('types');
const batters = document.getElementById('batters');
const toppings = document.getElementById('toppings');
const sprinkles = document.getElementById('sprinkles');
const right = document.getElementsByClassName('right')[0];
const ill = document.getElementById('ill');
const orderBtn = document.getElementById('order-btn');
let noneClicked = 0;

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
				"url":"images/RAISED-topping_powdered_sugar.png" 
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
			"url": "images/OF_reg.png" },
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
				"url": "images/JELLY_reg.png" },
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
				"name": "raspberry",
				"url": "images/JELLY-red.png"
			},
			{ 
				"id": "302", 
				"name": "lemon",
				"url": "images/JELLY-lemon.png"
			},
			{ 
				"id": "303", 
				"name": "cream",
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

// utility functions
function show(className){
	className.classList.add('on-screen');
}

function hide(className){
	className.classList.remove('on-screen');
}

// slidein
setTimeout(() => {
	show(types);
	activateTypes();
	showTypePic(donutSelected);
}, 100);

function activateTypes(){
	const divTypes = document.getElementById('div-types');
	divTypes.addEventListener('mouseover', () => {
		right.style.top = 20 + 'px';
	});
	divTypes.addEventListener('click', (e) => {
		disableOrder();
		switch (e.target.id) {
			case 'type-cake': donutSelected = 0;
			break;
			case 'type-raised': donutSelected = 1;
			break;
			case 'type-OF': donutSelected = 2;
			break;
			case 'type-jelly': donutSelected = 3;
			break;
		}
		console.log('donutSelected: ' + donutSelected);
		adjustButtons(donutSelected, 'type');
		displayBatters(donutSelected);
		showTypePic(donutSelected);
	});
}

function displayBatters(choice) {
	// hide all other "choice" divs
	hide(sprinkles);
	hide(toppings);

	// create "batter" choices below the donut type
	show(batters);
	let divBatters = document.getElementById('div-batters');
	var batterChoices = glob[choice].batters;
	var str = "";
	for (batter of batterChoices) {
		str += `<span class="btn batter" id="${batter.id}">${batter.name}</span>`;
	}
	divBatters.innerHTML = str;

	// add event listener
	divBatters.addEventListener('mouseover', () => {
		right.style.top = 110 + 'px';

	});
	let batterCount = document.getElementsByClassName('batter').length;
	if (batterCount < 2) {
		setTimeout(() => {
			showTypePic(donutSelected);
			displayToppings(choice);
		}, 500);
	}
	else {
		divBatters.addEventListener('click', (e) => {
			disableOrder();
			console.log('batterSelected: ' + e.target.id);
			switch(e.target.id) {
				case '21': batterSelected = 0;
				break;
				case '22': batterSelected = 1;
				break;
			}
			adjustButtons(batterSelected, 'batter');
			showTypePic(donutSelected, e.target.id);
			displayToppings(choice);
		});
	}
}

function displayToppings(choice) {
	// hide other "choice" divs
	hide(sprinkles);
	removeAllSprinkles();
	
	// create toppings below 
	show(toppings);
	let divToppings = document.getElementById('div-toppings');
	var tops = glob[choice].toppings;
	let str = "";
    for (topping of tops) {
		// add small buttons
		str += `<span class="btn topping" id="${topping.id}">${topping.type}</span>`;
	}
	divToppings.innerHTML = str;
	
	// add event listener
	divToppings.addEventListener('mouseover', () => {
		right.style.top = 220 + 'px';
	});
	divToppings.addEventListener('click', (e) => {
		removeAllSprinkles();
		toppingSelected = parseInt(e.target.id) - 110;
		console.log('toppingSelected: ' + toppingSelected);
		displaySprinkles(choice);
		if (toppingSelected == 0 || toppingSelected == 5 || donutSelected == 2) {
			hide(sprinkles);
			noneClicked = 1;
			allowOrder();
			adjustButtons(toppingSelected, 'topping');
			showToppingPic(toppingSelected); 
		} else {
			disableOrder();
			adjustButtons(toppingSelected, 'topping');
			showToppingPic(toppingSelected); 
		}
	});
}

function allowOrder(){
	orderBtn.addEventListener('click', orderDonut);
}

function disableOrder(){
	orderBtn.removeEventListener('click', orderDonut);
}

function orderDonut(){
	console.log('Donut ordered.');
}

function displaySprinkles(choice){
	show(sprinkles);
	var variable = "";
	var sprinkleChoices;
	let str = "";
	if (donutSelected == 3) {
		// show options for jelly donuts
		variable = "Filling";
		sprinkleChoices = glob[donutSelected].jellies;
		if (sprinkleChoices) {
			for (sprinkle of sprinkleChoices) {
				str += `<span class="btn topping" id="${sprinkle.id}">${sprinkle.name}</span>`;
			}
		}
	} else {
		variable = "Sprinkle";
		sprinkleChoices = glob[choice].sprinkles;
		if (sprinkleChoices) {
			for (sprinkle of sprinkleChoices) {
				str += `<span class="btn topping" id="${sprinkle.id}">${sprinkle.name}</span>`;
			}
		}
		
	}
	let sprinklesOrJelly = document.getElementById('sprinkles-or-jelly');
	sprinklesOrJelly.innerHTML = `4. Select Donut ${variable}`;
	var divSprinkles = document.getElementById('div-sprinkles');
	divSprinkles.innerHTML = str;

	// add event listener
	divSprinkles.addEventListener('click', (e) => {
		showSprinklePic(e.target.id - 201);
	});
}

function displayJelly(){
	var jellies = document.createElement('DIV');
	var str = '<br>Filling<br>';
	toppings.appendChild(jellies);
	var jellyChoices = glob[3].filling;

	for (jelly of jellyChoices) {
		str+= `<div class="btn topping" id="${jelly.id}">${jelly.type}</div>`;
	}
	jellies.innerHTML = str;
}

function showTypePic(donutSelected, id){
	var idx = 0;
	if (id == '22')
		idx = 1;
	var basePic = glob[donutSelected].batters[idx].url;
	ill.innerHTML = `<img src="${basePic}">`;
}

function adjustButtons(idx, className) {
	// remove active class from all buttons
	let buttons = document.getElementsByClassName(className);
	for (button of buttons)
		button.classList.remove('active');
	// add active class to only the clicked button
	buttons[idx].classList.add('active');
}

function showToppingPic(idx) {
		removeAllToppings();
		let topping = glob[donutSelected].toppings[idx];
		var toppingImg = document.createElement('IMG');
		toppingImg.setAttribute('class', `donut-topping` );
		toppingImg.setAttribute('id', `topping-${topping.id}` );
		toppingImg.setAttribute('src', topping.url );
		ill.appendChild(toppingImg);
}

function showSprinklePic(id) {
	removeAllSprinkles();
	let sprinkle = glob[donutSelected].sprinkles[id];
	var sprinkleImg = document.createElement('IMG');
	sprinkleImg.setAttribute('class', 'donut-topping');
	sprinkleImg.setAttribute('id', `sprinkle-${sprinkle.id}`);
	sprinkleImg.setAttribute('src', sprinkle.url);
	ill.appendChild(sprinkleImg);
	allowOrder();
}

function removeAllSprinkles(){
	var delChocSprinkles = document.getElementById('sprinkle-201');
	if (delChocSprinkles)
		delChocSprinkles.parentNode.removeChild(delChocSprinkles);
	var delRainbowSprinkles = document.getElementById('sprinkle-202');
	if (delRainbowSprinkles)
		delRainbowSprinkles.parentNode.removeChild(delRainbowSprinkles);
}

function removeAllToppings(){
	var delGlazed = document.getElementById('topping-111');
	if (delGlazed)
		delGlazed.parentNode.removeChild(delGlazed);
	var delChoc = document.getElementById('topping-112');
	if (delChoc)
		delChoc.parentNode.removeChild(delChoc);
	var delMaple = document.getElementById('topping-113');
	if (delMaple)
		delMaple.parentNode.removeChild(delMaple);
	var delSugar = document.getElementById('topping-114');
	if (delSugar)
		delSugar.parentNode.removeChild(delSugar);
	var delPowdered = document.getElementById('topping-115');
	if (delPowdered)
		delPowdered.parentNode.removeChild(delPowdered);
}
}();

donutOrder;
