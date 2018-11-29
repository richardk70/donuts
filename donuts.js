var donutOrder = function() {
	var donutSelected = 0, 
	batterSelected = 0,
	toppingSelected = 0,
	sprinkleSelected = 0,
	jellySelected = 0; 
	
// DOM variables (within this scope)	
const types = document.getElementById('types');
const batters = document.getElementById('batters');
const toppings = document.getElementById('toppings');
const sprinkles = document.getElementById('sprinkles');
const right = document.getElementsByClassName('right')[0];
const ill = document.getElementById('ill');
const orderBtn = document.getElementById('order-btn');

function update(){
	const fbD = document.getElementById('fb-donut');
	const fbB = document.getElementById('fb-batter');
	const fbT = document.getElementById('fb-topping');
	const fbS = document.getElementById('fb-sprinkle');
	const fbJ = document.getElementById('fb-jelly');
	const fbIll = document.getElementById('fb-ill');
	fbD.innerHTML = donutSelected;
	fbB.innerHTML = batterSelected;
	fbT.innerHTML = toppingSelected;
	fbS.innerHTML = sprinkleSelected;
	fbJ.innerHTML = jellySelected;
	fbIll.textContent = ill.innerHTML;
}

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
			"id":"b21",
			"name": "Regular",
			"url": "images/CAKE_reg.png"	
		}, {
			"id": "b22",
			"name": "Chocolate",
			"url": "images/CAKE_choc.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "" },
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
				"id": "200", 
				"name": "None",
				"url": "" 
			},{ 
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
			"id":"b21",
			"name": "Regular",
			"url": "images/RAISED_reg.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "" },
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
				"id": "200", 
				"name": "None",
				"url": "" 
			},{ 
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
			"id":"b21",
			"name": "Regular",
			"url": "images/OF_reg.png"	
		}, {
			"id": "b22",
			"name": "Chocolate",
			"url": "images/OF_choc.png"	
		}],
		"toppings":
		[{ 
			"id": "110", 
			"type": "None", 
			"url": "" },
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
			"id":"b21",
			"name": "Regular",
			"url": "images/JELLY_reg.png"	
		}],
		"toppings":
			[{ 
				"id": "110", 
				"type": "None", 
				"url": "" },
			{ 
				"id": "111", 
				"type": "Chocolate<br><span class='small'>(with custard filling)</span>",
				"url":"images/JELLY-topping_chocolate.png" 
			},
			{ 
				"id": "112", 
				"type": "Sugar",
				"url":"images/JELLY-topping_sugar.png" 
			},
			{ 
				"id": "113", 
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
	showBasePic(donutSelected, 0);
}, 100);

function activateTypes(){
	let divTypes = document.getElementById('div-types');
	divTypes.addEventListener('mouseover', () => {
		right.style.top = 20 + 'px';
	});
	divTypes.addEventListener('click', handleTypeClick);
}

function handleTypeClick(e){
	let divTypes = document.getElementById('div-types');
	divTypes.removeEventListener('click', handleTypeClick);
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
	batterSelected = 0;
	toppingSelected = 0;
	sprinkleSelected = 0;
	adjustButtons(donutSelected, 'type');
	displayBatters(donutSelected);
	showBasePic(donutSelected, batterSelected);
	setTimeout(() => {
		divTypes.addEventListener('click', handleTypeClick);
	}, 200);
	update();
}

function displayBatters(donutSelected) {
	// reset and hide all other "choice" divs
	toppingSelected = 0;
	sprinkleSelected = 0;
	hide(sprinkles);
	hide(toppings);

	// create "batter" choices below the donut type
	show(batters);
	let divBatters = document.getElementById('div-batters');
	var batterChoices = glob[donutSelected].batters;
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
			showBasePic(donutSelected, 0);
			displayToppings(donutSelected);
		}, 500);
	}
	else {
		divBatters.addEventListener('click', handleBatterClick);
	}
}

function handleBatterClick(e) {
	let divBatters = document.getElementById('div-batters');
	divBatters.removeEventListener('click', handleBatterClick);
	disableOrder();
	switch(e.target.id) {
		case 'b21': batterSelected = 0;
		break;
		case 'b22': batterSelected = 1;
		break;
	}
	toppingSelected = 0;
	sprinkleSelected = 0;
	adjustButtons(batterSelected, 'batter');
	showBasePic(donutSelected, batterSelected);
	displayToppings(donutSelected);
	setTimeout(() => {
		divBatters.addEventListener('click', handleBatterClick);
	}, 200);
	update();
}

function displayToppings(donutSelected) {
	// reset and hide other "choice" divs
	sprinkleSelected = 0;
	hide(sprinkles);
	removeAllSprinkles();
	
	// create toppings below 
	show(toppings);
	let divToppings = document.getElementById('div-toppings');
	var tops = glob[donutSelected].toppings;
	let str = "";
    for (topping of tops) {
		// add small buttons
		str += `<span class="btn topping" id="${topping.id}">${topping.type}</span>`;
	}
	divToppings.innerHTML = str;
	
	// add event listener
	divToppings.addEventListener('mouseover', () => {
		right.style.top = 200 + 'px';
	});
	divToppings.addEventListener('click', handleToppingClick);
}

function handleToppingClick(e) {
	disableOrder();
	let divToppings = document.getElementById('div-toppings');
	divToppings.removeEventListener('click', handleToppingClick); // fires only once
	removeAllSprinkles();
	toppingSelected = parseInt(e.target.id) - 110;
	sprinkleSelected = 0;
	displaySprinkles(donutSelected);
	if (donutSelected == 3) {
		if (toppingSelected == 0)
			disableOrder();
		if (toppingSelected == 1) {
			hide(sprinkles);
			allowOrder();
		}
	}
	else if (toppingSelected == 0 || toppingSelected == 5 || donutSelected == 2) {
		hide(sprinkles);
		allowOrder();
	} else {
		disableOrder();
	}
	adjustButtons(toppingSelected, 'topping');
	showBasePic(donutSelected, batterSelected);
	showToppingPic(toppingSelected); 
	setTimeout(() => {
		divToppings.addEventListener('click', handleToppingClick);
	}, 200);
	update();
}

function displaySprinkles(choice){
	show(sprinkles);
	let word = "";
	var sprinkleChoices;
	let str = "";
	if (donutSelected == 3) {
		// options for jelly donuts
		word = "Filling";
		sprinkleChoices = glob[donutSelected].filling;
		if (sprinkleChoices) {
			for (filling of sprinkleChoices) {
				str += `<span class="btn topping" id="${filling.id}">${filling.name}</span>`;
			}
		}
	} else {
		word = "Sprinkle";
		sprinkleChoices = glob[choice].sprinkles;
		if (sprinkleChoices) {
			for (sprinkle of sprinkleChoices) {
				str += `<span class="btn topping" id="${sprinkle.id}">${sprinkle.name}</span>`;
			}
		}
		
	}
	let sprinklesOrJelly = document.getElementById('sprinkles-or-jelly');
	sprinklesOrJelly.innerHTML = `4. Select Donut ${word}`;
	let divSprinkles = document.getElementById('div-sprinkles');
	divSprinkles.innerHTML = str;
	
	// add event listener
	divSprinkles.addEventListener('mouseover', () => {
		right.style.top = 230 + 'px';
	});
	divSprinkles.addEventListener('click', handleSprinkleClick);
}

function handleSprinkleClick(e) {
	let divSprinkles = document.getElementById('div-sprinkles');
	divSprinkles.removeEventListener('click', handleSprinkleClick); // disable event listener
	sprinkleSelected = e.target.id - 200;
	removeAllSprinkles();
	showSprinklePic(sprinkleSelected);
	// turn event listener back on 
	setTimeout(() => {
		divSprinkles.addEventListener('click', handleSprinkleClick);
	}, 200);
	update();
}

function allowOrder(){
	orderBtn.disabled = false;
	orderBtn.style.background = '#99c68e';
	orderBtn.addEventListener('mouseover', () => {
		orderBtn.style.color = 'white';
		orderBtn.style.backgroundColor = '#3EA055';
	});
	orderBtn.addEventListener('mouseout', () => {
		orderBtn.style.color = '#eee';
		orderBtn.style.backgroundColor = '#99c68e';
	});
	orderBtn.addEventListener('click', orderDonut);
}

function disableOrder(){
	orderBtn.disabled = true;
	orderBtn.style.backgroundColor = 'lightgrey';
	orderBtn.removeEventListener('click', orderDonut);
}

function orderDonut(){
	console.log('Donut ordered.');
}

function adjustButtons(idx, className) {
	// remove active class from all buttons
	let buttons = document.getElementsByClassName(className);
	for (button of buttons)
		button.classList.remove('active');
	// add active class to only the clicked button
	buttons[idx].classList.add('active');
}

function showBasePic(donutSelected, batterSelected){
	ill.innerHTML = "";
	var basePic = glob[donutSelected].batters[batterSelected].url;
	ill.innerHTML = `<img src="${basePic}">`;
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

function showSprinklePic(idx) {
	removeAllSprinkles();
	if (donutSelected == 3) {
		let filling = glob[3].filling[idx-101];
		var sprinkleImg = document.createElement('IMG');
		sprinkleImg.setAttribute('class', 'donut-sprinkle');
		sprinkleImg.setAttribute('id', `sprinkle-${filling.id}`);
		sprinkleImg.setAttribute('src', filling.url);
	} else {
		let sprinkle = glob[donutSelected].sprinkles[idx];
		var sprinkleImg = document.createElement('IMG');
		sprinkleImg.setAttribute('class', 'donut-sprinkle');
		sprinkleImg.setAttribute('id', `sprinkle-${sprinkle.id}`);
		sprinkleImg.setAttribute('src', sprinkle.url);
	}
	ill.appendChild(sprinkleImg);
	allowOrder();
}

function removeAllSprinkles(){
	// remove all elements with 
	removeByClass('donut-sprinkle');
	
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

function removeByClass(className) {
	let els = document.getElementsByClassName(className);
	while (els.length > 0)
		els[0].parentNode.removeChild(els[0]);
}

}();

donutOrder;
