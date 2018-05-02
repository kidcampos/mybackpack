'use strict';
var groupKeyGlobal = 0;

//Time Setting
var timeEnabled = false;
var timeEnabledOL = false;
var imageSetMorning = false;
var imageSetNight = false;

//Misc
var istrue = false;
var delay = 1000;
var delayTimeout = 10000;
var timer;
var mapCheck = false;
var addItemCheckVar = true;
var iconChooseReset = true;
var itemBack = 0;
var checkSwitch = false;

var itemLengthData = 0;

//Back Values
var checkPage = "";
var actBackIndex = 0;
var catBackIndex = 0;

//Notification
var id = 1, dialog;

var callback = function () {
    cordova.plugins.notification.local.getIds(function (ids) {
        showToast('IDs: ' + ids.join(' ,'));
    });
};

var showToast = function (text) {
    setTimeout(function () {
        if (device.platform != 'windows') {
            window.plugins.toast.showShortBottom(text);
        } else {
            showDialog(text);
        }
    }, 100);
};

var showDialog = function (text) {
    if (dialog) {
        dialog.content = text;
        return;
    }

    dialog = new Windows.UI.Popups.MessageDialog(text);

    dialog.showAsync().done(function () {
        dialog = null;
    });
};



//Login Check
var countLog=0;

//Check Connection
var checkCon = true;

class App{
	constructor(){
		let request = indexedDB.open('mybackpackDB', 1);
		let db = "";
		request.onsuccess = function(e){
			db = e.target.result;	
		}

		request.onerror = function(e){
			console.log('Error!');
		}
		request.onupgradeneeded = function(e){
			db = e.target.result;
			console.log("Yes");
			if(!db.objectStoreNames.contains('userOwnerInfo')){
				let objectStore = db.createObjectStore('userOwnerInfo', {keyPath: "id", autoIncrement:true});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("userOwnerInfo");

				let info = {
					"loginsetup":true,
					"fname":"",
					"lname":"",
					"user":"",
					"pass":"",
					"userid":""
				}
				let requestAdd = store.add(info);

				requestAdd.onsuccess = function(e){

				}


				requestAdd.onerror = function(e){

				}
			}
			if(!db.objectStoreNames.contains('activityData')){
				let objectStore = db.createObjectStore('activityData', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('name', 'name', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("activityData");
			}
			if(!db.objectStoreNames.contains('categoryData')){
				let objectStore = db.createObjectStore('categoryData', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('catname', 'catname', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("categoryData");
			}
			if(!db.objectStoreNames.contains('itemData')){
				let objectStore = db.createObjectStore('itemData', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('itemname', 'itemname', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("itemData");
			}
			if(!db.objectStoreNames.contains('activityDispData')){
				let objectStore = db.createObjectStore('activityDispData', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('actname', 'actname', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("activityDispData");

				let activityDataDisplay =
					{
						actname:"",
						category:[]
					}

				
				let requestAdd = store.add(activityDataDisplay);
			}
			if(!db.objectStoreNames.contains('activityItin')){
				let objectStore = db.createObjectStore('activityItin', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('name', 'name', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("activityItin");
			}
			if(!db.objectStoreNames.contains('planItin')){
				let objectStore = db.createObjectStore('planItin', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('name', 'name', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("planItin");
			}
			if(!db.objectStoreNames.contains('planDispData')){
				let objectStore = db.createObjectStore('planDispData', {keyPath: "id", autoIncrement:true});
				objectStore.createIndex('name', 'name', {unique:false});
				let transaction = event.target.transaction;
				let store = transaction.objectStore("planDispData");

				let planDataDisplay = 
					{
						"name":"",
						"desc":"",
						"startdate":"",
						"enddate":"",  
						"plan":[]
					}

				
				let requestAdd = store.add(planDataDisplay);
			}
		}
		
		//Checklist
			this.activity=[
			];
			this.activitytempgeneral=[
					{
						"name":"School",
						"category":[
								{
									"catname":"Writing Materials",
									"catitems":[
										{
											"itemname":"Pencil pouch",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/pencil_pouch.jpg"
										},
										{
											"itemname":"Ballpen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pen.jpg"
										},
										{
											"itemname":"Pencil",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pencil.jpg"
										},
										{
											"itemname":"Highlighter",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/highlighter.jpg"
										},
										{
											"itemname":"Permanent marker",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/marker.jpg"
										},
										{
											"itemname":"Eraser",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/eraser.jpg"
										},
										{
											"itemname":"Graph paper",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/graph_paper.jpg"
										},
										{
											"itemname":"Index card",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/index_car.jpg"
										}	
									]
								},
								{
									"catname":"Misc",
									"catitems":[
										{
											"itemname":"Binder",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/binder.jpg"
										},
										{
											"itemname":"Folder",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/.jpg"
										},
										{
											"itemname":"White-out",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/folder.jpg"
										},
										{
											"itemname":"Ruler",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/ruler.jpg"
										},
										{
											"itemname":"Protractor",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/protractor.jpg"
										},
										{
											"itemname":"Scissors",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/scissors.jpg"
										},
										{
											"itemname":"Calculator",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/calc.jpg"
										},
										{
											"itemname":"Lunchbox",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lunch.jpg"
										},
										{
											"itemname":"Tape",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/tape.jpg"
										},
										{
											"itemname":"Laptop",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/laptop.jpg"
										},
										{
											"itemname":"Bond paper",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bondpaper.jpg"
										},
										{
											"itemname":"Paper",
											"quantity":"1",
											"remarks":"Intermediate paper.",
											"photo":"images/items/general/paper.jpg"
										},
										{
											"itemname":"Books",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/book.jpg"
										}
									]
								}
							 ]
					},
					{
						"name":"Party",
						"category":[
								{
									"catname":"Misc",
									"catitems":[
										{
											"itemname":"Balloons",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/balloons.jpg"
										},
										{
											"itemname":"Candles",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/candles.jpg"
										},
										{
											"itemname":"Decorations",
											"quantity":"1",
											"remarks":"",
											"photo":""
										},
										{
											"itemname":"Paper towels",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/papertowels.jpg"
										},
										{
											"itemname":"Plates",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/plates.jpg"
										},
										{
											"itemname":"Glasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/glasses.jpg"
										},
										{
											"itemname":"Silverware",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/silverware.jpg"
										},
										{
											"itemname":"Wine and bottle opener",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bottle_opener.jpg"
										},
										{
											"itemname":"Dishwashing soap",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/dishwashing_soap.jpg"
										},
										{
											"itemname":"Garbage bags",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/trash_bag.jpg"
										}	
									]
								},
								{
									"catname":"Foods",
									"catitems":[
										{
											"itemname":"Cake",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/cake.jpg"
										},
										{
											"itemname":"Chips",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/chips.jpg"
										},
										{
											"itemname":"Spaghetti",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/spaghetti.jpg"
										},
										{
											"itemname":"Roasted pork",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/roastpork.jpg"
										},
										{
											"itemname":"Roasted chicken",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/roastchicken.jpg"
										},
										{
											"itemname":"Fried chicken",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/friedchicken.jpg"
										},
										{
											"itemname":"Hotdogs",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/hotdogs.jpg"
										}
									]
								},
								{
									"catname":"Drinks",
									"catitems":[
										{
											"itemname":"Soda",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/soda.jpg"
										},
										{
											"itemname":"Beer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/beer.jpg"
										},
										{
											"itemname":"Wine",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/wine.jpg"
										}
									]
								}
							 ]
					},
					{
						"name":"Gym",
						"category":[
								{
									"catname":"Clothes",
									"catitems":[
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"Or lycra pants",
											"photo":"images/items/outdoor/climbingshorts.jpg"
										},
										{
											"itemname":"T-Shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/shirt_male.jpg"
										},
										{
											"itemname":"Socks",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/socks.jpg"
										},
										{
											"itemname":"Sports bra",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/sports_bra.jpg"
										},
										{
											"itemname":"Sneakers",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/sneakers.jpg"
										}
									]
								},
								{
									"catname":"Gear",
									"catitems":[
										{
											"itemname":"Swim cap",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/swimcap.jpg"
										},
										{
											"itemname":"Goggles",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/goggles.jpg"
										},
										{
											"itemname":"Bathing suit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bathingsuit.jpg"
										},
										{
											"itemname":"Weight-lifting gloves",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/weightliftinggloves.jpg"
										},
										{
											"itemname":"Yoga mat",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/yogamat.jpg"
										}
									]
								},
								{
									"catname":"Misc",
									"catitems":[
										{
											"itemname":"Blister pads",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/blisterpads.jpg"
										},
										{
											"itemname":"Bandages",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bandages.jpg"
										},
										{
											"itemname":"Razor",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/razor.jpg"
										},
										{
											"itemname":"Pain reliever",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Water bottle",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/water_bottle.jpg"
										},
										{
											"itemname":"MP3 player",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/mp3player.jpg"
										},
										{
											"itemname":"Flip-flops",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/flipflops.jpg"
										},
										{
											"itemname":"Compact microfiber towel",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/microfibretowel.jpg"
										},
										{
											"itemname":"Plastic bag",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/plastic_bag.jpg"
										}
									]
								}
							 ]
					},
					{
						"name":"Travel",
						"category":[
								{
									"catname":"Luggage",
									"catitems":[
										{
											"itemname":"Rolling luggage",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/rolling_luggage.jpg"
										},
										{
											"itemname":"4-Wheels luggage",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/4-wheels.jpg"
										},
										{
											"itemname":"Duffel bag",
											"quantity":"1",
											"remarks":"",
											"photo":"duffelbag"
										},
										{
											"itemname":"Wheeled backpack",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/wheeledbackpack.jpg"
										},
										{
											"itemname":"Travel backpack",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/backpacktravel_man.jpg"
										},
										{
											"itemname":"Carry-on",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/carry-onbackpack.jpg"
										}
									]
								},
								{
									"catname":"Basics",
									"catitems":[
										{
											"itemname":"Long-sleeved shirts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/longsleeve_shirt-men.jpg"
										},
										{
											"itemname":"Sweaters",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sweater_men.jpg"
										},
										{
											"itemname":"T-Shirts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/wicking_shirt.jpg"
										},
										{
											"itemname":"Pants",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdry_pants.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdry_shorts.jpg"
										},
										{
											"itemname":"Belt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/belt.jpg"
										},
										{
											"itemname":"Socks",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/socks.jpg"
										},
										{
											"itemname":"Shoes",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/sneakers.jpg"
										},
										{
											"itemname":"Pajamas",
											"quantity":"1",
											"remarks":"Or any sleepwear.",
											"photo":"images/items/general/pajamas.jpg"
										},
										{
											"itemname":"Underwear",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/underwears_men.jpg"
										},
										{
											"itemname":"Sunglasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunglasses.jpg"
										},
										{
											"itemname":"Dresses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/dress.jpg"
										},
										{
											"itemname":"Jewelry",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/jewelry.jpg"
										},
										{
											"itemname":"Hat",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hat.jpg"
										},
										{
											"itemname":"Scarf",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/scarf.jpg"
										},
										{
											"itemname":"Bandana",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bandana.jpg"
										},
										{
											"itemname":"Swimsuit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/bathingsuit.jpg"
										},
										{
											"itemname":"Cell phone",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/smartphone.jpg"
										},
										{
											"itemname":"Charger",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/charger_phone.jpg"
										},
										{
											"itemname":"Travel pillow",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/travel_pillow.jpg"
										},
										{
											"itemname":"Eye mask",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/eyemask.jpg"
										},
										{
											"itemname":"Ear plugs",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/earplug.jpg"
										},
										{
											"itemname":"Electric converters",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/electric_conv.jpg"
										}
									]
								},
								{
									"catname":"Toiletry",
									"catitems":[
										{
											"itemname":"Toothbrush",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/Toothbrush.jpg"
										},
										{
											"itemname":"Toothpaste",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/toothpaste.jpg"
										},
										{
											"itemname":"Floss",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/floss.jpg"
										},
										{
											"itemname":"Mouthwash",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/mouthwash.jpg"
										},
										{
											"itemname":"Hair brush or comb",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/comb.jpg"
										},
										{
											"itemname":"Deodorant",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/deodorant.jpg"
										},
										{
											"itemname":"Shampoo and conditioner",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/shampoo.jpg"
										},
										{
											"itemname":"Sunscreen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunscreen.jpg"
										},
										{
											"itemname":"Face wash",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/facialwash.jpg"
										},
										{
											"itemname":"Lip balm",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lip_balm.jpg"
										},
										{
											"itemname":"Lotion",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/lotion.jpg"
										},
										{
											"itemname":"Glasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/eyeglass.jpg"
										},
										{
											"itemname":"Cologne/Perfume",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/perfume.jpg"
										},
										{
											"itemname":"Mirror",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/mirror.jpg"
										},
										{
											"itemname":"Scissors",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/scissors.jpg"
										},
										{
											"itemname":"Nail clippers",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/nail_clipper.jpg"
										}
									]
								},
								{
									"catname":"Travel health",
									"catitems":[
										{
											"itemname":"First-aid Kit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/first_aid_kit.jpg"
										},
										{
											"itemname":"Pain and fever relievers",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Thermometer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/thermometer.jpg"
										},
										{
											"itemname":"Cold medicines",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Diarrhea/laxative medicines",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Allergy medicines",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Multivitamins",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Sunburn relief",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/sunburn_relief.jpg"
										},
										{
											"itemname":"Insect repellent",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/insect_repellent.jpg"
										},
										{
											"itemname":"Motion sickness pills",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Altitude sickness pills",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										},
										{
											"itemname":"Eyedrops",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/eyedrop.jpg"
										},
										{
											"itemname":"Hand sanitizer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hand_sanitizer.jpg"
										},
										{
											"itemname":"Wet wipes",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/wetwipes.jpg"
										},
										{
											"itemname":"Alcohol",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/alcohol.jpg"
										},
										{
											"itemname":"Sleeping medicines",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/meds.jpg"
										}
									]
								},
								{
									"catname":"Technology",
									"catitems":[
										{
											"itemname":"Mobile device",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/smartphone.jpg"
										},
										{
											"itemname":"Phone charger",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/charger_phone.jpg"
										},
										{
											"itemname":"Laptop",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/laptop.jpg"
										},
										{
											"itemname":"iPad",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/ipad.jpg"
										},
										{
											"itemname":"E-Reader",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/.jpg"
										},
										{
											"itemname":"Earphones",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/earphones.jpg"
										},
										{
											"itemname":"Camera",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/camera.jpg"
										},
										{
											"itemname":"Memory card",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/memorycards.jpg"
										}
									]
								},
								{
									"catname":"Travel comfort",
									"catitems":[
										{
											"itemname":"Blanket",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/travel_blanket.jpg"
										},
										{
											"itemname":"Eye mask",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/eyemask.jpg"
										},
										{
											"itemname":"Travel pillow",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/travel_pillow.jpg"
										},
										{
											"itemname":"Travel journal",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/journal.jpg"
										},
										{
											"itemname":"Pen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pen.jpg"
										},
										{
											"itemname":"Books",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/book.jpg"
										},
										{
											"itemname":"Magazines",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/.jpg"
										},
										{
											"itemname":"Travel games",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/.jpg"
										},
										{
											"itemname":"Chapstick and lotion",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/lotion.jpg"
										},
										{
											"itemname":"Water bottle",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/water_bottle.jpg"
										},
										{
											"itemname":"Guide books",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/guidebook.jpg"
										},
										{
											"itemname":"Travel guides",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/guidebook.jpg"
										},
										{
											"itemname":"Maps",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/map.jpg"
										},
										{
											"itemname":"Language guides",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/general/guidebook.jpg"
										}
									]
								}
							 ]
					}
			];
			this.activitytempoutdoor=[
					{
						"name":"Caving",
						"category":[
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Flashlights",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/flashlight.jpg"
										},
										{
											"itemname":"Caving helmet",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/caving_helmet-no-light.jpg"
										},
										{
											"itemname":"Electric headlamp",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/headlamp.jpg"
										},
										{
											"itemname":"Backpack",
											"quantity":"1",
											"remarks":"A pair of rubber shoes.",
											"photo":"images/items/outdoor/backpacktravel_man.jpg"
										}
									]
								},
								{
									"catname":"Clothing",
									"catitems":[
										{
											"itemname":"Long underwear",
											"quantity":"2",
											"remarks":"Preferably polypropylene or something else that isn&apos;t cotton.",
											"photo":"images/items/outdoor/long_underwear.jpg"
										},
										{
											"itemname":"Shirt",
											"quantity":"2",
											"remarks":"Preferably wool or synthetic.",
											"photo":"images/items/outdoor/shirt_male.jpg"
										},
										{
											"itemname":"Socks",
											"quantity":"2",
											"remarks":"A pair of polypropylene or other synthetic fiber and a pair of wool.",
											"photo":"images/items/outdoor/socks.jpg"
										},
										{
											"itemname":"Caving shoes",
											"quantity":"1",
											"remarks":"A pair of caving shoes, preferably old hiking boots and without hooks for the laces.",
											"photo":"images/items/outdoor/shoes_outdoor.jpg"
										},
										{
											"itemname":"Gloves",
											"quantity":"2",
											"remarks":"Optional. Can get in the way but can keep your hands warm and cut-free.",
											"photo":"images/items/outdoor/gloves2.jpg"
										},
										{
											"itemname":"Sweater",
											"quantity":"1",
											"remarks":"Preferably wool or synthetic.",
											"photo":"images/items/outdoor/sweater.jpg"
										},
										{
											"itemname":"Pants",
											"quantity":"1",
											"remarks":"Preferably wool or synthetic.",
											"photo":"images/items/outdoor/caving_pants.jpg"
										}
									]
								},
								{
									"catname":"Supplies",
									"catitems":[
										{
											"itemname":"Towel",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/towel.jpg"
										},
										{
											"itemname":"Pocket knife",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pocket_knife.jpg"
										},
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"1 litre of water.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Trash bag",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/trash_bag.jpg"
										},
										{
											"itemname":"Batteries",
											"quantity":"6",
											"remarks":"For your main light and your backup lights",
											"photo":"images/items/outdoor/batteries_C.jpg"
										}
									]
								}


							 ]
					},
					{
						"name":"Kayaking",
						"category":[
								{
									"catname":"Gears",
									"catitems":[
										{
											"itemname":"Kayak",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/kayak.jpg"
										},
										{
											"itemname":"Paddles",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/paddle.jpg"
										},
										{
											"itemname":"Bilge pump",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/bilge_pump.jpg"
										},
										{
											"itemname":"Dry bag",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/dry_bag.jpg"
										},
										{
											"itemname":"Signaling whistle",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/signalling_whistle.jpg"
										},
										{
											"itemname":"Headlamp",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/headlamp.jpg"
										},
										{
											"itemname":"Batteries",
											"quantity":"4",
											"remarks":"For the headlamp.",
											"photo":"images/items/outdoor/batteries_AAA.jpg"
										},
										{
											"itemname":"Spray skirt",
											"quantity":"1",
											"remarks":"A pair of rubber shoes.",
											"photo":"images/items/outdoor/spray_skirt.jpg"
										},
										{
											"itemname":"Watch",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/watch.jpg"
										},
										{
											"itemname":"GPS",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/gps.jpg"
										},
										{
											"itemname":"Compass",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/compass.jpg"
										},
										{
											"itemname":"Emergency flares",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/outdoor/emergency_flares.jpg"
										}
									]
								},
								{
									"catname":"Clothing",
									"catitems":[
										{
											"itemname":"Swimwear",
											"quantity":"1",
											"remarks":"Or shorts or convertible pants.",
											"photo":"images/items/outdoor/rashguard.jpg"
										},
										{
											"itemname":"Rashguard",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/rashguard2.jpg"
										},
										{
											"itemname":"Hat",
											"quantity":"1",
											"remarks":"Sun-shielding hat.",
											"photo":"images/items/outdoor/hat.jpg"
										},
										{
											"itemname":"Footwear",
											"quantity":"1",
											"remarks":"Neoprene footwear",
											"photo":"images/items/outdoor/neoprene_footwear.jpg"
										},
										{
											"itemname":"Cap retainer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/cap_retainer.jpg"
										},
										{
											"itemname":"Long underwear",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/long_underwear.jpg"
										},
										{
											"itemname":"Pants",
											"quantity":"1",
											"remarks":"Preferably wool or synthetic.",
											"photo":"images/items/outdoor/synthetic_pants.jpg"
										}
									]
								},
								{
									"catname":"Personal Items",
									"catitems":[
										{
											"itemname":"Sunglasses",
											"quantity":"1",
											"remarks":"With glasses retainer.",
											"photo":"images/items/outdoor/sunglasses.jpg"
										},
										{
											"itemname":"Sunscreen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunscreen.jpg"
										},
										{
											"itemname":"Lip balm",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lip_balm.jpg"
										},
										{
											"itemname":"Insect repellant",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/insect_repellent.jpg"
										},
										{
											"itemname":"First-aid kit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/first_aid_kit.jpg"
										},
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Tent",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/tent.jpg"
										},
										{
											"itemname":"Bilge pump",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/bilge_pump.jpg"
										}
									]
								}


							 ]
					},
					{
						"name":"Climbing",
						"category":[
								{
									"catname":"Climbing Gear Basics",
									"catitems":[
										{
											"itemname":"Rope",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/rope.jpg"
										},
										{
											"itemname":"Belay",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/belay.jpg"
										},
										{
											"itemname":"Locking carabiners",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/locking_carabiner.jpg"
										},
										{
											"itemname":"Nonlocking carabiners",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/nonlocking_carabiner.jpg"
										},
										{
											"itemname":"Sewn runners",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sewn_runner.jpg"
										},
										{
											"itemname":"Quickdraws",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdraw.jpg"
										},
										{
											"itemname":"Chalk and chalk bag",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/chalk_and_chalkbag.jpg"
										},
										{
											"itemname":"Guidebook",
											"quantity":"1",
											"remarks":"Route description",
											"photo":"images/items/outdoor/guidebook.jpg"
										},
										{
											"itemname":"Rope bag",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/ropebag.jpg"
										},
										{
											"itemname":"Daypack",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/daypack.jpg"
										},
										{
											"itemname":"Helmet",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/helmet.jpg"
										}
									]
								},
								{
									"catname":"Clothing",
									"catitems":[
										{
											"itemname":"Wicking T-shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/wicking_tshirt.jpg"
										},
										{
											"itemname":"Rock shoes",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/rockshoes.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbingshorts.jpg"
										},
										{
											"itemname":"Pants",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbingpants.jpg"
										},
										{
											"itemname":"Tights",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbingtights.jpg"
										},
										{
											"itemname":"Vest",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbingvest.jpg"
										},
										{
											"itemname":"Jacket",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbingjacket.jpg"
										},
										{
											"itemname":"Hat",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/cap.jpg"
										},
										{
											"itemname":"Gloves",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/climbinggloves.jpg"
										},
										{
											"itemname":"Rainwear",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/rainwear.jpg"
										}
									]
								},
								{
									"catname":"Personal Items",
									"catitems":[
										{
											"itemname":"Sunglasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunglasses.jpg"
										},
										{
											"itemname":"Sunscreen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunscreen.jpg"
										},
										{
											"itemname":"Lip balm",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lip_balm.jpg"
										},
										{
											"itemname":"Insect repellant",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/insect_repellent.jpg"
										},
										{
											"itemname":"First-aid kit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/first_aid_kit.jpg"
										},
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Tent",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/tent.jpg"
										},
										{
											"itemname":"Lunch",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lunch.jpg"
										},
										{
											"itemname":"Camera",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/camera.jpg"
										},
										{
											"itemname":"Hand sanitizer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hand_sanitizer.jpg"
										},
										{
											"itemname":"Binoculars",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/binoculars.jpg"
										},
										{
											"itemname":"Bilge pump",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/bilge_pump.jpg"
										},
										{
											"itemname":"Notepad",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/notepad.jpg"
										},
										{
											"itemname":"Pen/Pencil",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pencil.jpg"
										}
									]
								}	
							]
					},
					{
						"name":"Backpacking",
						"category":[
								{
									"catname":"Navigation",
									"catitems":[
										{
											"itemname":"Map",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/map.jpg"
										},
										{
											"itemname":"Compass",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/compass.jpg"
										},
										{
											"itemname":"GPS",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/gps.jpg"
										},
										{
											"itemname":"Altimeter",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/altimeter.jpg"
										}
									]
								},
								{
									"catname":"Sun Protection",
									"catitems":[
										{
											"itemname":"Sunscreen",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunscreen.jpg"
										},
										{
											"itemname":"Lip balm",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lip_balm.jpg"
										},
										{
											"itemname":"Sunglasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunglasses.jpg"
										}
									]
								},
								{
									"catname":"Insulation",
									"catitems":[
										{
											"itemname":"Jacket",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/jacket.jpg"
										},
										{
											"itemname":"Vest",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/vest.jpg"
										},
										{
											"itemname":"Quick-drying Pants",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdry_pants.jpg"
										},
										{
											"itemname":"Quick-drying shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdry_shorts.jpg"
										},
										{
											"itemname":"Gloves",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/gloves.jpg"
										},
										{
											"itemname":"Long-sleeve shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/longsleeve_shirt-men.jpg"
										},
										{
											"itemname":"Bandana",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/bandana.jpg"
										},
										{
											"itemname":"Wicking Shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/wicking_shirt.jpg"
										},
										{
											"itemname":"Wicking underwear",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/wicking_underwear.jpg"
										},
										{
											"itemname":"Hat",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hat.jpg"
										},
										{
											"itemname":"Wicking long-sleeve T-shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/wicking_longsleeve.jpg"
										},
										{
											"itemname":"Socks",
											"quantity":"1",
											"remarks":"Synthetic or wool. Plus spares.",
											"photo":"images/items/outdoor/socks.jpg"
										},
										{
											"itemname":"Sandals",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sandals.jpg"
										},
										{
											"itemname":"Hiking shoes",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hiking_shoes.jpg"
										}
									]
								},
								{
									"catname":"Personal Items",
									"catitems":[
										{
											"itemname":"Camera",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/camera.jpg"
										},
										{
											"itemname":"Extra memory cards",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/memorycards.jpg"
										},
										{
											"itemname":"Binoculars",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/binoculars.jpg"
										},
										{
											"itemname":"Permits",
											"quantity":"1",
											"remarks":"",
											"photo":""
										},
										{
											"itemname":"Guidebook",
											"quantity":"1",
											"remarks":"Route description.",
											"photo":"images/items/outdoor/guidebook.jpg"
										},
										{
											"itemname":"Field guides",
											"quantity":"2",
											"remarks":"Star identifier.",
											"photo":"images/items/outdoor/fieldguide.jpg"
										},
										{
											"itemname":"Credit card",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/credit_card.jpg"
										},
										{
											"itemname":"Earplugs",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/earplug.jpg"
										},
										{
											"itemname":"Sunglasses",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sunglasses.jpg"
										},
										{
											"itemname":"Toilet paper",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/toiletppaper.jpg"
										},
										{
											"itemname":"Sanitation towel",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/sanitarytowel.jpg"
										},
										{
											"itemname":"Hand sanitizer",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/hand_sanitizer.jpg"
										},
										{
											"itemname":"Insect repellent",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/insect_repellent.jpg"
										},
										{
											"itemname":"Biodegradable soap",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/biodegradablesoap.jpg"
										},
										{
											"itemname":"Quick-dry towel",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/quickdry_towel.jpg"
										},
										{
											"itemname":"Cell phone",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/cellphone.jpg"
										},
										{
											"itemname":"2-way radios",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/2-wayradios.jpg"
										},
										{
											"itemname":"Personal locator beacon",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/personallocatorbeacon.jpg"
										},
										{
											"itemname":"First-Aid Kit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/first_aid_kit.jpg"
										}
									]
								},
								{
									"catname":"Illumination",
									"catitems":[
										{
											"itemname":"Headlamp",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/headlamp.jpg"
										},
										{
											"itemname":"Flashlight",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/flashlight.jpg"
										},
										{
											"itemname":"Extra batteries",
											"quantity":"4",
											"remarks":"",
											"photo":"images/items/outdoor/batteries_C.jpg"
										}
									]
								},
								{
									"catname":"Fire",
									"catitems":[
										{
											"itemname":"Matches",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/matches.jpg"
										},
										{
											"itemname":"Lighter",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/lighter.jpg"
										},
										{
											"itemname":"Waterproof container",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/waterproof_cont.jpg"
										},
										{
											"itemname":"Fire starter",
											"quantity":"4",
											"remarks":"For emergency survival fire",
											"photo":"images/items/outdoor/fire_starter.jpg"
										}
									]
								},
								{
									"catname":"Repair Kit and Tools",
									"catitems":[
										{
											"itemname":"Pocket knife",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/pocket_knife.jpg"
										},
										{
											"itemname":"Repair kit",
											"quantity":"1",
											"remarks":"For stove, mattress, and etc.",
											"photo":"images/items/outdoor/repair_kit.jpg"
										},
										{
											"itemname":"Duct tape",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/outdoor/duct_tape.jpg"
										}
									]
								},
								{
									"catname":"Nutrition",
									"catitems":[
										{
											"itemname":"Supply of food",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/foodsupply.jpg"
										}
									]
								},
								{
									"catname":"Hydration",
									"catitems":[
										{
											"itemname":"Water bottles",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/outdoor/water_bottle.jpg"
										},
										{
											"itemname":"Water filter",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/water_filter3.jpg"
										}
									]
								},
								{
									"catname":"Emegency Shelter",
									"catitems":[
										{
											"itemname":"Tent",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/tent.jpg"
										},
										{
											"itemname":"Bivy",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/bivy.jpg"
										},
										{
											"itemname":"Reflective blanket",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/outdoor/reflective_blanket.jpg"
										}
									]
								}
						]		
					}

			];
			this.activitytempsports=[
					{
						"name":"Badminton",
						"category":[
								{
									"catname":"Snacks",
									"catitems":[
										{
											"itemname":"Bottled Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Sports Drink",
											"quantity":"1",
											"remarks":"Gatorade.",
											"photo":"images/items/sports/sports_drink.jpg"
										},
										{
											"itemname":"Biscuits",
											"quantity":"3",
											"remarks":"3 Skyflakes.",
											"photo":"images/items/sports/crackers.jpg"
										}
									]
								},
								{
									"catname":"Apparel",
									"catitems":[
										{
											"itemname":"Shirt",
											"quantity":"2",
											"remarks":"Additional for extra.",
											"photo":"images/items/sports/shirt.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"2",
											"remarks":"Additional for extra.",
											"photo":"images/items/sports/short.jpg"
										},
										{
											"itemname":"Rubber shoes",
											"quantity":"1",
											"remarks":"A pair of rubber shoes.",
											"photo":"images/items/sports/shoes_rubber.jpg"
										}
									]
								},
								{
									"catname":"Accessories",
									"catitems":[
										{
											"itemname":"Wristband",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/sports/wristband.jpg"
										},
										{
											"itemname":"Cap",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/cap.jpg"
										},
										{
											"itemname":"Towel",
											"quantity":"1",
											"remarks":"Face towel.",
											"photo":"images/items/sports/towel.jpg"
										}
									]
								},
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Shuttlecock",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/sports/shuttlecock.jpg"
										},
										{
											"itemname":"Badminton Racquet",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/badminton_racket.jpg"
										}
									]
								}


							 ]
					},
					{
						"name":"Baseball",
						"category":[
								{
									"catname":"Food",
									"catitems":[
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Chocolate bar",
											"quantity":"3",
											"remarks":"1 kit-kat and 2 goya bars.",
											"photo":"images/items/sports/chocolatebars.jpg"
										},
									]
								},
								{
									"catname":"Apparel",
									"catitems":[
										{
											"itemname":"Shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/shirt_baseball.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/short.jpg"
										},
										{
											"itemname":"Baseball shoes",
											"quantity":"1",
											"remarks":"A pair of baseball shoes.",
											"photo":"images/items/sports/shoes_cleats.jpg"
										},
										{
											"itemname":"Baseball Cap",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/cap.jpg"
										}
									]
								},
								{
									"catname":"Miscellaneous",
									"catitems":[
										{
											"itemname":"Sharpie",
											"quantity":"1",
											"remarks":"A marker.",
											"photo":"images/items/sports/marker.jpg"
										},
										{
											"itemname":"Camera",
											"quantity":"1",
											"remarks":"For taking photos.",
											"photo":"images/items/sports/camera.jpg"
										},
										{
											"itemname":"First Aid Kit",
											"quantity":"1",
											"remarks":"Bandages, cottons, and alcohol",
											"photo":"images/items/sports/first_aid.jpg"
										},
										{
											"itemname":"Bug spray",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/bugspray.jpg"
										}
									]
								},
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Baseball",
											"quantity":"1",
											"remarks":"A marker.",
											"photo":"images/items/sports/baseball.jpg"
										},
										{
											"itemname":"Baseball Bat",
											"quantity":"1",
											"remarks":"For taking photos.",
											"photo":"images/items/sports/baseball_bat.jpg"
										}
									]
								}

							 ]
					},
					{
						"name":"Basketball",
						"category":[
								{
									"catname":"Food",
									"catitems":[
										{
											"itemname":"Bottled Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Biscuits",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/sports/crackers.jpg"
										},
										{
											"itemname":"Chocolate Bar",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/chocolatebars.jpg"
										},
										{
											"itemname":"Fruits",
											"quantity":"1",
											"remarks":"Apple",
											"photo":"images/items/sports/fruits_sandwich.jpg"
										},
										{
											"itemname":"Sports Drink",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/sports_drink.jpg"
										},
									]
								},
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Practice Basketball",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/basketball.jpg"
										},
										{
											"itemname":"Ball Pump and Needle",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/ballpump_needle.jpg"
										}
									]
								},
								{
									"catname":"Apparel",
									"catitems":[
										{
											"itemname":"Practice Basketball Shoes",
											"quantity":"1",
											"remarks":"A pair of shoes.",
											"photo":"images/items/sports/shoes_rubber.jpg"
										},
										{
											"itemname":"Game-day Basketball Shoes",
											"quantity":"1",
											"remarks":"A pair of shoes.",
											"photo":"images/items/sports/shoes_rubber.jpg"
										},
										{
											"itemname":"Basketball Socks",
											"quantity":"1",
											"remarks":"A pair of socks.",
											"photo":"images/items/sports/socks_b.jpg"
										},
										{
											"itemname":"Basketball Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/short.jpg"
										},
										{
											"itemname":"T-Shirt and Jersey",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/jersey_basketball.jpg"
										},
										{
											"itemname":"Compression Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/compression_shorts_men.jpg"
										},
										{
											"itemname":"Warmup Suit",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/warmup_suit.jpg"
										},
										{
											"itemname":"Sports Bra",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/sports_bra.jpg"
										}
									]
								},
								{
									"catname":"Accessories",
									"catitems":[
										{
											"itemname":"Wristband",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/wristband.jpg"
										},
										{
											"itemname":"Knee Pads",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/kneepads.jpg"
										},
										{
											"itemname":"Leg Sleeve",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/legsleeves.jpg"
										},
										{
											"itemname":"Shooter Sleeve",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/shooter_sleeve.jpg"
										}
									]
								},

							 ]
					},
					{
						"name":"Soccer",
						"category":[
								{
									"catname":"Snacks",
									"catitems":[
										{
											"itemname":"Bottled Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Biscuits",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/sports/crackers.jpg"
										},
										{
											"itemname":"Sports Drink",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/sports_drink.jpg"
										},
										{
											"itemname":"Sandwich",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/sports/fruits_sandwich.jpg"
										}
									]
								},
								{
									"catname":"Apparel",
									"catitems":[
										{
											"itemname":"Jersey",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/shirt_soccer.jpg"
										},
										{
											"itemname":"Cleats",
											"quantity":"1",
											"remarks":"A pair of cleats.",
											"photo":"images/items/sports/shoes_cleats.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/short.jpg"
										},
										{
											"itemname":"Socks",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/sports/socks.jpg"
										}
									]
								},
								{
									"catname":"Accessories",
									"catitems":[
										{
											"itemname":"Shin Guards",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/sports/shin_guards.jpg"
										},
										{
											"itemname":"Lace Guards",
											"quantity":"2",
											"remarks":"",
											"photo":"images/items/sports/laceguards.jpg"
										},
										{
											"itemname":"Head Band",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/headband.jpg"
										},
										{
											"itemname":"Towel",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/towel.jpg"
										}
									]
								}

							 ]
					},
					{
						"name":"Table Tennis",
						"category":[
								{
									"catname":"Food",
									"catitems":[
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Chocolate bar",
											"quantity":"3",
											"remarks":"1 kit-kat and 2 goya bars.",
											"photo":"images/items/sports/chocolatebars.jpg"
										},
									]
								},
								{
									"catname":"Gears",
									"catitems":[
										{
											"itemname":"Ping Pong Balls",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/pingpong_balls.jpg"
										},
										{
											"itemname":"Ping Pong Racquet",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/pingpong_racket.jpg"
										},
										{
											"itemname":"Shirt",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/shirt.jpg"
										}
									]
								}

							 ]
					},
					{
						"name":"Tennis",
						"category":[
								{
									"catname":"Food",
									"catitems":[
										{
											"itemname":"Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Biscuits",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/sports/crackers.jpg"
										},
									]
								},
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Tennis Ball",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/tennis_ball.jpg"
										},
										{
											"itemname":"Tennis Racquet",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/tennis_racket.jpg"
										}
									]
								}

							 ]
					},
					{
						"name":"Volleyball",
						"category":[
								{
									"catname":"Food",
									"catitems":[
										{
											"itemname":"Bottled Water",
											"quantity":"1",
											"remarks":"Nature Spring.",
											"photo":"images/items/sports/water.jpg"
										},
										{
											"itemname":"Biscuits",
											"quantity":"3",
											"remarks":"",
											"photo":"images/items/sports/crackers.jpg"
										},
										{
											"itemname":"Fruits",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/fruits_sandwich.jpg"
										},
										{
											"itemname":"Sports Drink",
											"quantity":"1",
											"remarks":"Gatorade",
											"photo":"images/items/sports/sports_drink.jpg"
										}
									]
								},
								{
									"catname":"Apparel",
									"catitems":[
										{
											"itemname":"Shoes",
											"quantity":"1",
											"remarks":"A pair of shoes.",
											"photo":"images/items/sports/shoes_rubber.jpg"
										},
										{
											"itemname":"Shirts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/shirt.jpg"
										},
										{
											"itemname":"Shorts",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/short.jpg"
										},
										{
											"itemname":"Jersey",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/jersey_volleyball.jpg"
										}
									]
								},
								{
									"catname":"Accessories",
									"catitems":[
										{
											"itemname":"Spandex",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/compression_shorts_men.jpg"
										},
										{
											"itemname":"Ankle Braces",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/ankle_braces.jpg"
										},
										{
											"itemname":"Hair Tie",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/hair_tie.jpg"
										}
									]
								},
								{
									"catname":"Equipment",
									"catitems":[
										{
											"itemname":"Volleyball",
											"quantity":"1",
											"remarks":"",
											"photo":"images/items/sports/Volleyball.jpg"
										},
									]
								}
						]
					}
			];
			this.activityview=[];
			this.activitytempdummy = [];
			this.dummyTable=[
				{
					"name":""
				}
			];
			this.dummyItemPhoto=[
				{
					"name":"",
					"quantity":"",
					"remarks":"",
					"photo":"images/items/def.jpg"		
				}
			]
			this.photoicons=[
				{
					"name":"Ankle Braces",
					"photo":"images/items/sports/ankle_braces.jpg",
					"type":"sports"
				},
				{
					"name":"Badminton Racquet",
					"photo":"images/items/sports/badminton_racket.jpg",
					"type":"sports"
				},
				{
					"name":"Ball Pump and Needle",
					"photo":"images/items/sports/ballpump_needle.jpg",
					"type":"sports"
				},
				{
					"name":"Baseball",
					"photo":"images/items/sports/baseball.jpg",
					"type":"sports"
				},
				{
					"name":"Baseball Bat",
					"photo":"images/items/sports/baseball_bat.jpg",
					"type":"sports"
				},
				{
					"name":"Basketball",
					"photo":"images/items/sports/basketball.jpg",
					"type":"sports"
				},
				{
					"name":"Bugspray",
					"photo":"images/items/sports/bugspray.jpg",
					"type":"sports"
				},
				{
					"name":"Camera",
					"photo":"images/items/sports/camera.jpg",
					"type":"sports"
				},
				{
					"name":"Cap",
					"photo":"images/items/sports/cap.jpg",
					"type":"sports"
				},
				{
					"name":"Chocolate Bars",
					"photo":"images/items/sports/chocolatebars.jpg",
					"type":"sports"
				},
				{
					"name":"Compression Shorts (Men)",
					"photo":"images/items/sports/compression_shorts_men.jpg",
					"type":"sports"
				},
				{
					"name":"Compression Shorts A (Women)",
					"photo":"images/items/sports/compression_shorts_women.jpg",
					"type":"sports"
				},
				{
					"name":"Compression Shorts B (Women)",
					"photo":"images/items/sports/compression_shorts_women_2.jpg",
					"type":"sports"
				},
				{
					"name":"Crackers",
					"photo":"images/items/sports/crackers.jpg",
					"type":"sports"
				},
				{
					"name":"Face Towel",
					"photo":"images/items/sports/face_towel.jpg",
					"type":"sports"
				},
				{
					"name":"First Aid Kit",
					"photo":"images/items/sports/first_aid.jpg",
					"type":"sports"
				},
				{
					"name":"Lunchbox",
					"photo":"images/items/sports/fruits_sandwich.jpg",
					"type":"sports"
				},
				{
					"name":"Hair Tie",
					"photo":"images/items/sports/hair_tie.jpg",
					"type":"sports"
				},
				{
					"name":"Headband",
					"photo":"images/items/sports/headband.jpg",
					"type":"sports"
				},
				{
					"name":"Jersey (Basketball)",
					"photo":"images/items/sports/jersey_basketball.jpg",
					"type":"sports"
				},
				{
					"name":"Jersey (Volleyball)",
					"photo":"images/items/sports/jersey_volleyball.jpg",
					"type":"sports"
				},
				{
					"name":"Knee Pads",
					"photo":"images/items/sports/kneepads.jpg",
					"type":"sports"
				},
				{
					"name":"Lace Guards",
					"photo":"images/items/sports/laceguards.jpg",
					"type":"sports"
				},
				{
					"name":"Leg Sleeves",
					"photo":"images/items/sports/legsleeves.jpg",
					"type":"sports"
				},
				{
					"name":"Marker",
					"photo":"images/items/sports/marker.jpg",
					"type":"sports"
				},
				{
					"name":"Table Tennis Balls",
					"photo":"images/items/sports/pingpong_balls.jpg",
					"type":"sports"
				},
				{
					"name":"Table Tennis Racquet",
					"photo":"images/items/sports/pingpong_racket.jpg",
					"type":"sports"
				},
				{
					"name":"Shin Guads",
					"photo":"images/items/sports/shin_guards.jpg",
					"type":"sports"
				},
				{
					"name":"Shirt",
					"photo":"images/items/sports/shirt.jpg",
					"type":"sports"
				},
				{
					"name":"Shirt (Baseball)",
					"photo":"images/items/sports/shirt_baseball.jpg",
					"type":"sports"
				},
				{
					"name":"Shirt (Soccer)",
					"photo":"images/items/sports/shirt_soccer.jpg",
					"type":"sports"
				},
				{
					"name":"Shoes",
					"photo":"images/items/sports/shoes.jpg",
					"type":"sports"
				},
				{
					"name":"Shoes (Cleats)",
					"photo":"images/items/sports/shoes_cleats.jpg",
					"type":"sports"
				},
				{
					"name":"Rubber Shoes",
					"photo":"images/items/sports/shoes_rubber.jpg",
					"type":"sports"
				},
				{
					"name":"Shorts",
					"photo":"images/items/sports/short.jpg",
					"type":"sports"
				},
				{
					"name":"Shuttlecock",
					"photo":"images/items/sports/shuttlecock.jpg",
					"type":"sports"
				},
				{
					"name":"Socks A",
					"photo":"images/items/sports/socks.jpg",
					"type":"sports"
				},
				{
					"name":"Socks B",
					"photo":"images/items/sports/socks_b.jpg",
					"type":"sports"
				},
				{
					"name":"Sports Bra",
					"photo":"images/items/sports/sports_bra.jpg",
					"type":"sports"
				},
				{
					"name":"Sports Drink",
					"photo":"images/items/sports/sports_drink.jpg",
					"type":"sports"
				},
				{
					"name":"Visor Cap",
					"photo":"images/items/sports/sun_cap.jpg",
					"type":"sports"
				},
				{
					"name":"Tennis Ball",
					"photo":"images/items/sports/tennis_ball.jpg",
					"type":"sports"
				},
				{
					"name":"Tennis Racquet",
					"photo":"images/items/sports/tennis_racket.jpg",
					"type":"sports"
				},
				{
					"name":"Towel",
					"photo":"images/items/sports/towel.jpg",
					"type":"sports"
				},
				{
					"name":"Volleyball",
					"photo":"images/items/sports/Volleyball.jpg",
					"type":"sports"
				},
				{
					"name":"Warm-up Suit",
					"photo":"images/items/sports/warmup_suit.jpg",
					"type":"sports"
				},
				{
					"name":"Water",
					"photo":"images/items/sports/water.jpg",
					"type":"sports"
				},
				{
					"name":"Wristband",
					"photo":"images/items/sports/wristband.jpg",
					"type":"sports"
				},

				//Outdoor
				{
					"name":"2-Way Radios",
					"photo":"images/items/outdoor/2-wayradios.jpg",
					"type":"outdoor"
				},
				{
					"name":"Altimeter",
					"photo":"images/items/outdoor/altimeter.jpg",
					"type":"outdoor"
				},
				{
					"name":"Backpack",
					"photo":"images/items/outdoor/backpack1.jpg",
					"type":"outdoor"
				},
				{
					"name":"Backpack B",
					"photo":"images/items/outdoor/backpacktravel_man.jpg",
					"type":"outdoor"
				},
				{
					"name":"Backpack C",
					"photo":"images/items/outdoor/backpacktravel_woman.jpg",
					"type":"outdoor"
				},
				{
					"name":"Bandana",
					"photo":"images/items/outdoor/bandana.jpg",
					"type":"outdoor"
				},
				{
					"name":"Batteries AA",
					"photo":"images/items/outdoor/batteries_AA.jpg",
					"type":"outdoor"
				},
				{
					"name":"Batteries AAA",
					"photo":"images/items/outdoor/batteries_AAA.jpg",
					"type":"outdoor"
				},
				{
					"name":"Batteries C",
					"photo":"images/items/outdoor/batteries_C.jpg",
					"type":"outdoor"
				},
				{
					"name":"Belay",
					"photo":"images/items/outdoor/belay.jpg",
					"type":"outdoor"
				},
				{
					"name":"Bilge Pump",
					"photo":"images/items/outdoor/bilge_pump.jpg",
					"type":"outdoor"
				},
				{
					"name":"Binoculars",
					"photo":"images/items/outdoor/binoculars.jpg",
					"type":"outdoor"
				},
				{
					"name":"Soap",
					"photo":"images/items/outdoor/biodegradablesoap.jpg",
					"type":"outdoor"
				},
				{
					"name":"Bivy",
					"photo":"images/items/outdoor/bivy.jpg",
					"type":"outdoor"
				},
				{
					"name":"Cap",
					"photo":"images/items/outdoor/cap.jpg",
					"type":"outdoor"
				},
				{
					"name":"Cap Retainer",
					"photo":"images/items/outdoor/cap_retainer.jpg",
					"type":"outdoor"
				},
				{
					"name":"Helmet",
					"photo":"images/items/outdoor/caving_helmet-no-light.jpg",
					"type":"outdoor"
				},
				{
					"name":"Helmet B",
					"photo":"images/items/outdoor/caving_helmet-w-light.jpg",
					"type":"outdoor"
				},
				{
					"name":"Pants",
					"photo":"images/items/outdoor/synthetic_pants.jpg",
					"type":"outdoor"
				},
				{
					"name":"Pants B",
					"photo":"images/items/outdoor/quickdry_pants.jpg",
					"type":"outdoor"
				},
				{
					"name":"Pants C",
					"photo":"images/items/outdoor/caving_pants.jpg",
					"type":"outdoor"
				},
				{
					"name":"Caving Socks",
					"photo":"images/items/outdoor/caving_socks.jpg",
					"type":"outdoor"
				},
				{
					"name":"Caving Socks B",
					"photo":"images/items/outdoor/caving_socks2.jpg",
					"type":"outdoor"
				},
				{
					"name":"Cellphone",
					"photo":"images/items/outdoor/cellphone.jpg",
					"type":"outdoor"
				},
				{
					"name":"Chalkbag",
					"photo":"images/items/outdoor/chalk_and_chalkbag.jpg",
					"type":"outdoor"
				},
				{
					"name":"Jacket",
					"photo":"images/items/outdoor/jacket.jpg",
					"type":"outdoor"
				},
				{
					"name":"Climbing Jacket",
					"photo":"images/items/outdoor/climbingjacket.jpg",
					"type":"outdoor"
				},
				{
					"name":"Pants C",
					"photo":"images/items/outdoor/caving_pants.jpg",
					"type":"outdoor"
				},
				{
					"name":"Caving Socks",
					"photo":"images/items/outdoor/caving_socks.jpg",
					"type":"outdoor"
				},
				{
					"name":"Caving Socks B",
					"photo":"images/items/outdoor/caving_socks2.jpg",
					"type":"outdoor"
				},
				{
					"name":"Cellphone",
					"photo":"images/items/outdoor/cellphone.jpg",
					"type":"outdoor"
				},
				{
					"name":"Chalkbag",
					"photo":"images/items/outdoor/chalk_and_chalkbag.jpg",
					"type":"outdoor"
				}
			];

		//Checklist Online
			this.group = [
				/*{
					"admin":[
						{
							"fname":"Kent",
							"lname":"Campos",
							"user":"a",
							"pass":"a"
						}
					],
					"category":[
						{
							"catname":"Food",
							"catitems":[
								{
									"itemname":"Bat",
									"quantity":"1",
									"remarks":"",
									"photo":"images/items/def.jpg",
									"mark":true
								}
							]
						}
					], 
					"code":"",
					"desc":"",
					"id":"123",
					"name":"Sad",
					"users":[]


				}*/
			];
			this.notif = [
			];
			this.userOwner = [];

		//Itinerary
			this.itineraryview=[];
			this.itinerary=[
				/*{
					"name":"Plan 1",
					"desc":"Strolling",
					"startdate":"",
					"enddate":"",
					"dest":"",
					"setChecklistSwitch":true,
					"checklist":"",
					"notify":true,
					"timenotify":""
					
				},
				{
					"name":"Plan 2",
					"desc":"Strolling",
					"startdate":"",
					"enddate":"",
					"dest":"",
					"setChecklistSwitch":true,
					"checklist":"",
					"notify":true,
					"timenotify":""
					
				}*/
			];
			this.planview=[];
	}

//Login Page

	login_setup(){
		let request = indexedDB.open('mybackpackDB', 1);
		let db = "";
		
		request.onsuccess = function(e){
			db = e.target.result;

			let objectStore = db.transaction(['userOwnerInfo'], "readonly").objectStore('userOwnerInfo');
			let requestGet = objectStore.get(1);
			requestGet.onsuccess = function(e){
				let data = event.target.result;
				console.log(data.userid);
				if(data.loginsetup==false){
					component.homePage();
					//component.getItineraryDataStart();
					
					component.pushUserOwnerLoggedIn(data.userid, data.user, data.fname, data.lname, data.pass, false);
					
					if(data.user!="Guest"){
						component.settings_options(data.user, data.fname, data.lname, "");

						
						//component.getChecklistData();
						component.getActivityDataRead();
					}
					else{
						component.settings_options_guest(data.user, data.fname, data.lname, "");
						component.getActivityDataRead();
					}
						
				}
				else{
					component.loginPage();
				}
			}
		}
		

		request.onerror = function(e){

			console.log('Error!');
		}	
	}

	logout_user(logBool){
		let request = indexedDB.open('mybackpackDB', 1);
		let db = "";
		checkCon=true;
		request.onsuccess = function(e){
			db = e.target.result;
			let objectStore = db.transaction(['userOwnerInfo'], "readwrite").objectStore('userOwnerInfo');
			let requestUpdate = objectStore.get(1);
			requestUpdate.onsuccess = function(e){
				let data = event.target.result;

				data.loginsetup = logBool;
				data.userid = "";
				data.user = "";
				data.fname = "";
				data.lname = "";
				data.pass = "";

				let updateData = objectStore.put(data);
					updateData.onsuccess = function(e){
						
						component.loginPage();
						console.log("Logged out!");
					}
					updateData.onerror = function(e){
						component.homePage();
						console.log("Unable to log out!");
					}
			}
			requestUpdate.onerror = function(e){
				console.log("Unable to acquire data!")
			}
		}
	}

	loggedin_setup(id, user, fname, lname, pass, logBool){
		let request = indexedDB.open('mybackpackDB', 1);
		let db = "";
		request.onsuccess = function(e){
			db = e.target.result;

			let objectStore = db.transaction(['userOwnerInfo'], "readwrite").objectStore('userOwnerInfo');
			let requestUpdate = objectStore.get(1);
			requestUpdate.onsuccess = function(e){
				let data = event.target.result;

				data.loginsetup = logBool;
				data.userid = id;
				data.user = user;
				data.fname = fname;
				data.lname = lname;
				data.pass = pass;
				if(user != 'Guest')
					component.settings_options(user, fname, lname, "");
				else
					component.settings_options_guest(user, fname, lname, "");
				let updateData = objectStore.put(data);
					updateData.onsuccess = function(e){
						component.homePage();
						console.log("Logged in!");
					}
					updateData.onerror = function(e){
						component.homePage();
						console.log("Unable to log in!");
					}
			}
			requestUpdate.onerror = function(e){
				console.log("Unable to acquire data!")
			}
		}
	}

	login_user(){

		let login_user = document.getElementById('login_user').value;
		let login_pass = document.getElementById('login_pass').value;
		let checkIf = true;
		var connectedRef = firebase.database().ref(".info/connected");
			connectedRef.on("value", function(snap) {
				console.log(snap.val());
				  if (snap.val() === true) {
				  	clearTimeout(timer);
				   	let userBase = firebase.database().ref('user').once('value', 
				      (userId)=>{
				      	let x = 1;
				        userId.forEach(function(snapshot) {

				        	if(login_user == snapshot.val().user && login_pass == snapshot.val().pass){
				        		//component.homePage();
				        		component.pushUserOwner(snapshot.val().id, login_user, snapshot.val().fname, snapshot.val().lname, snapshot.val().pass)
				        		if(checkIf == true){
									
									checkIf = false;
				        		}
				        		
				        		console.log("Logged in");
				        		if(countLog == 0){
				        			Materialize.toast('Successfully logged in', 1500);
				        			$('.toastLoginConnect').fadeOut();
				        			component.getChecklistDataOnce();
				        			$('#menubuttonsOnline').hide();
									$('#menubuttons').show();
				        			//component.getActivityData();
				        			countLog++;
				        		}
				        	}
				        	else if(login_user == snapshot.val().user && login_pass != snapshot.val().pass){
				        		Materialize.toast('Incorrect password', 1500);
				        		countLog = 0;
				        	}
				        	else{
				        		
				        		if(x==userId.numChildren()){
				        			Materialize.toast('Incorrect user name and password', 1500);
				        			countLog = 0;
				        		}
				        		x++;

				        	}
				        }); 
				      
				       
		  			});
					return true;
				  }else{
				  	
				  	Materialize.toast('Please wait for a moment', 10000, 'toastLoginConnect');
				  	timer = setTimeout(function(){ 
				  			if(timer){
				  				$('.toastLoginConnect').fadeOut();
				  				Materialize.toast('Please connect to the internet', 4000);
				  			}
				  				
				  		},delayTimeout);
				  	//
				  }
			});
	}

	login_guest(){
		component.pushUserOwner(0, "Guest", "", "", "");
		$('#menubuttonsOnline').hide();
		$('#menubuttons').show();
	}
	pushUserOwner(id, user, fname, lname, pass){
		this.userOwner.push({"id":id,"fname":fname, "lname":lname, "user":user, "pass":pass});
		component.loggedin_setup(id, user, fname, lname, pass, false);
	}

	pushUserOwnerLoggedIn(id, user, fname, lname, pass){
		this.userOwner.push({"id":id,"fname":fname, "lname":lname, "user":user, "pass":pass});
	}

	signup_userinput(){
		let signup = document.getElementById('modal1');
		let html = `
			<div class="container" style="padding-top:40px">
                <form class="row">
                  <div class="center">
                    <div class="input-field col s12" style="width:100%">
                    
                      <input id="sign_fname" type="text" class="validate">
                      <label for="sign_fname">First Name</label>
                    </div>
                    <div class="input-field col s12" style="width:100%">
                    
                      <input id="sign_lname" type="text" class="validate">
                      <label for="sign_lname">Last Name</label>
                    </div>
                    <div class="input-field col s12" style="width:100%">
                    
                      <input id="sign_user" type="text" class="validate">
                      <label for="sign_user">User Name</label>
                    </div>
                    <div class="input-field col s12" style="width:100%">
                      <input id="sign_password" type="password" class="validate">
                      <label for="sign_password">Password</label>
                    </div>
                  </div>
                </form>
                <div class="center" style="position:relative;top:-15px">
                     <button href="#!" class="waves-effect waves-light btn modal-close" onclick='component.signup_user()'>Sign Up</button>
                     
                      
                </div>
            </div>
		`;
		signup.innerHTML = html;
	}

	signup_user(){
		let sign_fname = document.getElementById('sign_fname').value;
		let sign_lname = document.getElementById('sign_lname').value;
		let sign_user = document.getElementById('sign_user').value;
		let sign_password = document.getElementById('sign_password').value;

		let userid = firebase.database().ref().child('user').push().key; 
	    let data = {
	    	id: userid,
	    	fname: sign_fname,
	    	lname: sign_lname,
	    	user: sign_user,
	    	pass: sign_password,
	    	group: ""

	    }
	    let updates = {};
	    updates['/user/'+userid] = data;
	    firebase.database().ref().update(updates);
		Materialize.toast('Successfully signed up', 4000);

	}

//Checklist Offline
	//Sorting Array
		arraySort(){
			//let sortJsonArray = require('sort-json-array');
			this.activity.sort(component.predicateBy("name"));
			/*for(let x=0;x<this.activity.length;x++){	
			}*/
			for(let x=0;x<this.activity.length;x++){
				this.activity[x].category.sort(component.predicateBy("catname"));
				for(let y=0;y<this.activity[x].category.length;y++){
					this.activity[x].category[y].catitems.sort(component.predicateBy("itemname"));
				}
			}
			//console.log(this.activity);
		}
		arrayTempSort(){
			//let sortJsonArray = require('sort-json-array');
			this.activitytempsports.sort(component.predicateBy("name"));
			/*for(let x=0;x<this.activity.length;x++){	
			}*/
			for(let x=0;x<this.activitytempsports.length;x++){
				this.activitytempsports[x].category.sort(component.predicateBy("catname"));
				for(let y=0;y<this.activitytempsports[x].category.length;y++){
					this.activitytempsports[x].category[y].catitems.sort(component.predicateBy("itemname"));
				}
			}
			this.activitytempoutdoor.sort(component.predicateBy("name"));
			for(let x=0;x<this.activitytempoutdoor.length;x++){
				this.activitytempoutdoor[x].category.sort(component.predicateBy("catname"));
				for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
					this.activitytempoutdoor[x].category[y].catitems.sort(component.predicateBy("itemname"));
				}
			}
			//console.log(this.activity);
		}

		photoiconsSort(){
			this.photoicons.sort(component.predicateBy("name"));
		}

		arraySortItinerary(){
			this.itinerary.sort(component.predicateBy("name"));
		}
		predicateBy(prop){
		   return function(a,b){
		      if( a[prop] > b[prop]){
		          return 1;
		      }else if( a[prop] < b[prop] ){
		          return -1;
		      }
		      return 0;
			}
		}
	//End of Sorting Array

	//Search
		searchActivity(){
		    let txtSearchActivity = document.getElementById("txtSearchActivity");
		    let list = document.getElementById("activityList");
		  	let count = 0;
		    let html = ``;
		    for(let i=0;i<this.activity.length;i++){
		      if(this.activity[i].name.toLowerCase().includes(txtSearchActivity.value)||
		      	this.activity[i].name.toUpperCase().includes(txtSearchActivity.value)||
		      	this.activity[i].name.includes(txtSearchActivity.value)){
		      		count++;
			        html += `

		        		<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.categoryPage(${i})'>
								${this.activity[i].name}
								<a href="#bottommodal" onclick='component.editoptionBottomModalActSearch(${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								<div id="actdivide" class="divider col s12"></div>
							</a>

						</li>
					
						
						<br>`;
		      }
		    }
		    if(count == 0){
		    	 html += `<li class="row center" style="position:relative; top:40px;">
									No activity found
							</li>`;
		    }
		    list.innerHTML = html;
		}

	 	searchActivityEdit(key){
		    let txtSearchActivity = document.getElementById("txtSearchActivity");
		    let searchbarAct = document.getElementById("searchbarAct");
			let searchBar =`
			<div class="row center">
				<input oninput="component.searchActivity()" id="txtSearchActivity" type="text" placeholder="Search" onclick="component.readActivity()" />
			</div>`;
			searchbarAct.innerHTML = searchBar;
			let activityList = document.getElementById("activityListContainer");
		    let html = `<ul id="activityList" class="row">`;
		    for(let i=0;i<this.activity.length;i++){
		      if(this.activity[i].name.toLowerCase().includes(txtSearchActivity.value)||
		      	this.activity[i].name.toUpperCase().includes(txtSearchActivity.value)||
		      	this.activity[i].name.includes(txtSearchActivity.value)){
				if(this.activity[key].name==this.activity[i].name){
					html +=`
						
						<div id="activityListNameInput">
							<li><input id="updateActivity" value="${this.activity[i].name}" type="text" placeholder="Name of the Activity" />
							</li>
						</div>
						<div id="done" class="col s12 center done"><a class="center waves-effect waves-light btn" style="bottom:0" id="createAddbutton" onclick='component.updateActivity(${i})'>Done</a></div>
			
					`;
				}
				else{
					html +=`
					<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.categoryPage(${i})'>
							${this.activity[i].name}
							<a href="#bottommodal" id="optionbuttonAct" onclick='component.editoptionBottomModalAct(${i})' class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							</a>
						</li>
					
					<div id="actdivide" class="divider col s12"></div>
					<br>
					`;
				}

		      }
		 	}
		 	html += `</ul>
			<br><br>
			<br><br>
			<div class="fixed-action-btn horizontal click-to-toggle">
				<a class="btn-floating btn-large" id="createAddbutton" onclick="component.readActivity()">
					<i class="fa fa-check"></i>
				</a>
			</div>`;
		   	activityList.innerHTML = html;
		}

		editoptionBottomModalActSearch(key){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = ``;

			if(this.activityview[0].name==""){
				html = `<div id="modalOption">
							  <a href="#!" onclick='component.getAllData(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Set activity</a>
						      <a href="#!" onclick='component.searchActivityEdit(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename activity</a>
						      <a href="#!" onclick='component.deleteActivity(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete activity</a>
						    </div>
					`;
			}
			else{
				html =`
					<div id="modalOption">
					  <a href="#!" onclick='component.actConfirmationSet(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Set activity</a>
				      <a href="#!" onclick='component.searchActivityEdit(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename activity</a>
				      <a href="#!" onclick='component.deleteActivity(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete activity</a>
				    </div>`;
			}
				option.innerHTML = html;
		}

		searchCategory(key){
			console.log(this.activity[key].category);
		    let txtSearchCategory = document.getElementById("txtSearchCategory");
		    let list = document.getElementById("categoryList");
		    let html = ``;
		    let count = 0;
		    for(let i=0;i<this.activity[key].category.length;i++){
		      if(this.activity[key].category[i].catname.toLowerCase().includes(txtSearchCategory.value)||
		      	this.activity[key].category[i].catname.toUpperCase().includes(txtSearchCategory.value)||
		      	this.activity[key].category[i].catname.includes(txtSearchCategory.value)){ 
		      		count++;
			        html += `
			        		<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.itemPage(${key},${i})'>
								${this.activity[key].category[i].catname}
								<a href="#bottommodal" onclick='component.editoptionBottomModalCatSearch(${key}, ${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								<div id="actdivide" class="divider col s12"></div>
							</a>

						</li>
					
						
						<br>`;


		      }
		    }
		    if(count == 0){
		    	 html += `<li class="row center" style="position:relative; top:40px;">
									No category found
							</li>`;
		    }
		    list.innerHTML = html;
		}

		searchCategoryEdit(key, key2){
			let txtSearchCategory = document.getElementById("txtSearchCategory");
			let searchbarCat = document.getElementById("searchbarCat");

			let searchBar =`
			<div class="row center">
				<input oninput="component.searchCategory(${key})" id="txtSearchCategory" type="text" placeholder="Search" onclick="component.readCategory(${key})"/>
			</div>`;
			searchbarCat.innerHTML = searchBar;
			let categoryList = document.getElementById("categoryListContainer");
			let html = `<ul id="categoryList" class="row">`;
			for(let i=0;i<this.activity[key].category.length;i++){
				if(this.activity[key].category[i].catname.toLowerCase().includes(txtSearchCategory.value)||
		      	this.activity[key].category[i].catname.toUpperCase().includes(txtSearchCategory.value)||
		      	this.activity[key].category[i].catname.includes(txtSearchCategory.value)){
					if(this.activity[key].category[key2].catname==this.activity[key].category[i].catname){
						html +=`
							<div id="categoryListNameInput">
								<li><input id="updateCategory" value="${this.activity[key].category[i].catname}" type="text" placeholder="Name of the Category" />
								</li>
							</div>
							<div id="done" class="col s12 center done"><a class="center waves-effect waves-light btn" style="bottom:0" id="createAddbutton" onclick='component.updateCategory(${key}, ${i})'>Done</a></div>
						`;
					}
					else{
						html +=`
							<li>
								<a href="#!" id="categoryListNames" class="col s6" onclick='component.itemPage()'>
								${this.activity[key].category[i].catname}
								<a href="#bottommodal" onclick='component.editoptionBottomModalCatSearch(${key}, ${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								</a>
							</li>
						
						<div id="actdivide" class="divider col s12"></div>
						<br>
						`;
					}
				}
			}
			html += `</ul>
			<br><br>
			<div class="fixed-action-btn horizontal click-to-toggle">
				<a class="btn-floating btn-large red" onclick='component.readCategory(${key})'>
					<i class="fa fa-check"></i>
				</a>
			</div>
							`;
			categoryList.innerHTML = html;
		}

		editoptionBottomModalCatSearch(key, key2){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
				      <a href="#!" onclick='component.searchCategoryEdit(${key},${key2})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename category</a>
				      <a href="#!" onclick='component.deleteCategory(${key}, ${key2})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete category</a>
				    </div>
				`;
			
			option.innerHTML = html;
		}

		searchItem(key, key2, key3){
		    let txtSearchCategory = document.getElementById("txtSearchItem");
		    let list = document.getElementById("itemList");
		    let html = ``;
		    let count = 0;
		    console.log(this.activity);
		    for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
		      if(this.activity[key].category[key2].catitems[i].itemname.toLowerCase().includes(txtSearchItem.value)||
		      	this.activity[key].category[key2].catitems[i].itemname.toUpperCase().includes(txtSearchItem.value)||
		      	this.activity[key].category[key2].catitems[i].itemname.includes(txtSearchItem.value)){ 
		      		count++;
			        html += `
			        		<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.readItemDetails(${key}, ${key2},${i})'>
								${this.activity[key].category[key2].catitems[i].itemname}
								<a href="#bottommodal" onclick='component.editoptionBottomModalItemSearch(${key},${key2},${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								<div id="actdivide" class="divider col s12"></div>
							</a>

						</li>
					
						
						<br>`;


		      }
		    }
		    if(count == 0){
		    	 html += `<li class="row center" style="position:relative; top:40px;">
									No item found
							</li>`;
		    }
		    list.innerHTML = html;
		}
		
		editoptionBottomModalItemSearch(key, key2, key3){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
				      <a href="#modal1" onclick='component.editItemInput(${key}, ${key2}, ${key3})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">Edit item</a>
				      <a href="#!" onclick='component.deleteItem(${key}, ${key2}, ${key3})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete item</a>
				    </div>
					`;
			
				option.innerHTML = html;
		}

		searchIcon(){
			let txtSearchIcon = document.getElementById("txtSearchIcon");
		    let list = document.getElementById("iconList");
		  	let count = 0;
		    let html = ``;
		    for(let i=0;i<this.photoicons.length;i++){
		      if(this.photoicons[i].name.toLowerCase().includes(txtSearchIcon.value)||
		      	this.photoicons[i].name.toUpperCase().includes(txtSearchIcon.value)||
		      	this.photoicons[i].name.includes(txtSearchIcon.value)){
		      		count++;
			        html += `<a href="#!" id="iconLink" onclick='component.selectedIcon(\""+"${this.photoicons[i].name}"+"\")'>
							<img id='${"picIcon"+i}' class="z-depth-3" src="${this.photoicons[i].photo}" alt="${this.photoicons[i].name}" style="height:80px;width:80px">
							<p id="iconName">${this.photoicons[i].name}</p>
						</a>`;

		      }
		    }
		    if(count == 0){
		    	 html += `<li class="row center" style="position:relative; top:40px; list-style:none">
									No icons found
							</li>`;
		    }
		    list.innerHTML = html;
		}
	//End of Search

	//Display Activity
		getActivityDispData(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			
			request.onsuccess = function(e){
				component.hidepreloaderChecklistPage();
				db = e.target.result;

				let transaction = db.transaction(['activityDispData'], "readonly");
				let store = transaction.objectStore('activityDispData');
				let index = store.index('actname');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.actname, "category":cursor.value.category, "id":cursor.value.id});
						cursor.continue();
					}
					else{
						component.activityDispPush(dummyAct);
					}
					

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}

		activityDispPush(actval){
				this.activityview = actval;
				console.log(this.activityview);
				component.displayActivity();
				$('.collapsible').collapsible({
				  accordion : true
				});
			
			
		}
		displayActivity(){
			let viewAct = document.getElementById("displayact");
			let headAct = document.getElementById("displayhead");
			let html = ``;
			let html2 = ``;
			let count = 0;
			if (this.activityview[0].name == ''){
				html = ``;
				html2 = `<div id="noAct" class="container row center">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span><br>
					<div id="noActButton" onclick="component.activityPage()" class="waves-light waves-effect btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Manage Checklists
					</div>
				</div>
				`;
			}
			else{
				html = `
				<div id="headBackground">
					<h5>${this.activityview[0].name}</h5>
				</div>`;
				let today = new Date();
			    let h = today.getHours();
			    console.log(h + " <<<<<");
			    if(h > 5  && h < 18){
		    		$(function () {$("#headBackground").css("background-image", "url('images/itinerary/morning.gif')");});
		    		$(function () {$("#headBackground").css("background-position", "50% 30%");});
		    		$(function () {$("#headBackground h5").css("color", "#000");});	
		    		$(function () {$("#headBackground").css("text-shadow", "2px 2px #fff");});	
			    }
			    else{
		    		$(function () {$("#headBackground").css("background-image", "url('images/itinerary/night.gif')");});
		    		$(function () {$("#headBackground").css("background-position", "50% 25%");});
		    		$(function () {$("#headBackground h5").css("color", "#fff");});	
		    		$(function () {$("#headBackground").css("text-shadow", "2px 2px #0e1625");});	
			    }
				html2 = `
				<div class="container" id="displaycontainer">			
					<ul id="activityDispList" data-collapsible="accordion" class="row collapsible">`;
					
				for(let i=0;i<this.activityview[0].category.length;i++){
					let countCheckMark = 0;
					for(let n=0;n<this.activityview[0].category[i].catitems.length;n++){
						if(this.activityview[0].category[i].catitems[n].mark == true){
							countCheckMark++;
						}
						if(n == this.activityview[0].category[i].catitems.length-1){
							if(countCheckMark == this.activityview[0].category[i].catitems.length){
								$(function () {$("#areChecked"+i).css("display", "block");});
							
								console.log("COMPLETE");
							}
						}
					}
					html2 += `
					<li >
						<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionActView(${i})' ontouchend="component.catRevert()" style="color:#fff;background-color:#0f1219; border:none"><span class="truncate">${this.activityview[0].category[i].catname}</span><span id='${"areChecked"+i}' class="badge checkCat"><i class="fa fa-check" style="color:#66BB6A;" aria-hidden="true"></i></span>
						</div>
						<div id="dividerColHead" class="divider"></div>
						<div class="collapsible-bodyOff">
							<ul>
						`;
						for(let x=0; x<this.activityview[0].category[i].catitems.length; x++){
							let idName = "test";
							let checkItemBox = "";
							if(this.activityview[0].category[i].catitems[x].mark == true){
								checkItemBox = "checked";
							}
							html2 += `
								
									<li class="waves-effect parent-flex" style="padding-top:12px">
										<span class="badge" style="float:left;margin-left:20px">
											<input type="checkbox" style="z-index: 999" id="${idName+count}" ${checkItemBox} onclick="component.displayCatCheck(${this.activityview[0].category[i].catitems[x].mark},${i},${x})"  value="3"/><label for="${idName+count}"></label>
										</span>
										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayItemDetails(${i},${x})">
											<span>${this.activityview[0].category[i].catitems[x].itemname}</span>
										</a>
										
										<span id="quantityBadge" class="badge short-and-fixed">${this.activityview[0].category[i].catitems[x].quantity}</span> 
									
									</li>
									<div id="dividerCol" class="divider"></div>

								
							`;
							count++;

						}
					html2 +=`
							</ul>
						</div>
					</li>
					`;
				}
				html2 += `
					</ul>
					</div>
							`;
			}
			headAct.innerHTML = html;
			viewAct.innerHTML = html2;
		}

		displayCatCheck(checkBool, key, key2){
			let count = 0;
			let check = 0;

			let keyId = this.activityview[0].id;
			let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['activityDispData'], "readwrite");
					let store = transaction.objectStore('activityDispData');
					let requestKey = store.get(keyId);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						if(checkBool == false){
							data.category[key].catitems[key2].mark = true;
						}
						else{
							data.category[key].catitems[key2].mark = false;
						}
						

						let requestUpdate = store.put(data);
				
						requestUpdate.onsuccess = function(e){

							component.getActivityDispData();
							console.log("Checklist is updated.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in renaming activity.");
						}
					}
					requestKey.onerror = function(e){
						console.log("Error in updating data.");
					}
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
		}

		longPressOptionActView(key){
			istrue = true;
			timer = setTimeout(function(){ component.actTriggerView(timer,istrue, key);},delay);
		}

		actTriggerView(time, check, key){
			if(time)
		      clearTimeout(timer);
		      
		      if(check)
		      {
		         component.optionSideModalActView(key);
		      }
		}

		optionSideModalActView(key){
			let option = document.getElementById("modal3");
			$('#modal3').modal('open');
			let html = `
						<div class="row" style="margin-bottom:0px">
							<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckView(${key}, ${1})'><h5 style="color:#000000">Check all items in this category</h5></a><br>
							<div class="divider"></div>
							<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckView(${key}, ${0})'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>

						</div>
				`;
				option.innerHTML = html;		
		}

		optionResultCheckView(Id, choice){
			if(choice == 1){
				let countActCheck = 0;
				let idName = "test";
				let count = 0;

				for(let i=0;i<this.activityview[0].category.length;i++){
					if(Id==i)
						break;
					for(let k=0;k<this.activityview[0].category[i].catitems.length;k++){
						count++;
					}
				}
				for(let x=0;x<this.activityview[0].category[Id].catitems.length;x++){
						let keyId = this.activityview[0].id;
						let request = indexedDB.open('mybackpackDB', 1);
							let db = "";
							request.onsuccess = function(e){
								db = e.target.result;

								let transaction = db.transaction(['activityDispData'], "readwrite");
								let store = transaction.objectStore('activityDispData');
								let requestKey = store.get(keyId);
								
							
								requestKey.onsuccess = function(e){
									let data = requestKey.result;
									data.category[Id].catitems[x].mark = true;
	
									let requestUpdate = store.put(data);
							
									requestUpdate.onsuccess = function(e){

										component.getActivityDispData();
										console.log("Checklist is updated.");
									}
									requestUpdate.onerror = function(e){
										console.log("Error in renaming activity.");
									}
								}
								requestKey.onerror = function(e){
									console.log("Error in updating data.");
								}
							}
							

							request.onerror = function(e){

								console.log('Error!');
							}
				}
				
			}
			else if(choice == 0){
				let countActCheck = 0;
				let idName = "test";
				let count = 0;

				for(let i=0;i<this.activityview[0].category.length;i++){
					if(Id==i)
						break;
					for(let k=0;k<this.activityview[0].category[i].catitems.length;k++){
						count++;
					}
				}
				for(let x=0;x<this.activityview[0].category[Id].catitems.length;x++){
					let keyId = this.activityview[0].id;
						let request = indexedDB.open('mybackpackDB', 1);
							let db = "";
							request.onsuccess = function(e){
								db = e.target.result;

								let transaction = db.transaction(['activityDispData'], "readwrite");
								let store = transaction.objectStore('activityDispData');
								let requestKey = store.get(keyId);
								
							
								requestKey.onsuccess = function(e){
									let data = requestKey.result;
									data.category[Id].catitems[x].mark = false;
	
									let requestUpdate = store.put(data);
							
									requestUpdate.onsuccess = function(e){

										component.getActivityDispData();
										console.log("Checklist is updated.");
									}
									requestUpdate.onerror = function(e){
										console.log("Error in renaming activity.");
									}
								}
								requestKey.onerror = function(e){
									console.log("Error in updating data.");
								}
							}
							

							request.onerror = function(e){

								console.log('Error!');
							}
				}
			}
		}

		displayItemDetails(key, key2){
			
			let itemDetails = document.getElementById("modal1");
			let html = `<div class="modal-content row" id="itemdetails">
					<center><img style="height: 200px; width:200px;" class="responsive-img center" src="${this.activityview[0].category[key].catitems[key2].photo}">
					<h4>${this.activityview[0].category[key].catitems[key2].itemname}</h4>
					</center>
					<p><b>Quantity:</b> <span style="float:right">${this.activityview[0].category[key].catitems[key2].quantity}</span></p>
					<div class="divider"></div>
					<p><b>Note:</b> <span style="float:right">${this.activityview[0].category[key].catitems[key2].remarks}</span></p>
					<div class="divider"></div>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Close</a>
				</div>
				`;
				itemDetails.innerHTML = html;
		}

		optionBottomModal(){	
			let option = document.getElementById("bottommodal");
			let act = this.activityview;
			let html = ``;
			if(act[0].name==""){
				html = `<div id="modalOption">
					      <a href="#!" onclick='component.activityPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to activity page</a>
					      <a href="#!" onclick='component.removeActivity()'id="viewActbutton" class="modal-action modal-close waves-effect waves btn disabled">Remove set activity</a>
					    </div>
				`;
			}
			else{
				html = `<div id="modalOption">
					      <a href="#!" onclick='component.activityPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to activity page</a>
					      <a href="#modal2" onclick='component.actConfirmation()' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves btn">Remove set activity</a>
					    </div>
				`;
			}
			
				option.innerHTML = html;
		}

		getAllData(key){

			let actArr = this.activity[key];
			let actId = this.activity[key].id;
			let catArr = [];
			let itemArr = [];
			if(this.activityview[0].name != ""){
				component.removeActivity();
			}
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['categoryData'], "readonly");
				let store = transaction.objectStore('categoryData');
				let index = store.index('catname');
				
				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						if(actId == cursor.value.actid){
							catArr.push({"catname":cursor.value.catname, "catitems":cursor.value.catitems, "actid":cursor.value.actid, "id":cursor.value.id});
							
						}
						cursor.continue();
					}
					else{
						let transaction2 = db.transaction(['itemData'], "readonly");
						let store2 = transaction2.objectStore('itemData');
						let index2 = store2.index('itemname');
						for(let x = 0; x < catArr.length; x++){
							index2.openCursor().onsuccess = function (e){
								let cursor2 = event.target.result;
								
								let catActId = catArr[x].actid;
								let catId = catArr[x].id;
								if(cursor2){
									
									if((catActId == cursor2.value.actid) && (catId == cursor2.value.catid)){

										catArr[x].catitems.push({"itemname":cursor2.value.itemname, "quantity":cursor2.value.quantity, "photo":cursor2.value.photo, "remarks":cursor2.value.remarks, "id":cursor2.value.id, "actid":cursor2.value.actid, "catid":cursor2.value.catid, "mark":false});
									}
									cursor2.continue();
								}
								else{
									if(x == catArr.length-1){
										actArr.category = catArr;
										component.setActivity(actArr);
									}
								}
							}
						}
					}
				}
			}
		}

		setActivity(actArr){
	

			let valName = actArr.name;
			let valCat = actArr.category;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['activityDispData'], "readwrite");
					let store = transaction.objectStore('activityDispData');
					let requestKey = store.get(1);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						
						data.actname = valName;
						data.category = valCat;
						console.log(data.actname);
						let requestUpdate = store.put(data);

						requestUpdate.onsuccess = function(e){
							Materialize.toast('Activity set', 1500);
							component.getActivityDispData();
							console.log("Activity is set.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in renaming activity.");
						}
					}
					requestKey.onerror = function(e){
						console.log("Error in updating data.");
					}
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
		}

		actViewPush(key, catname, catitems, id, actid){
			//this.activityview[0].category.push([{"catname":cursor.value.catname, "catitems":cursor.value.catitems, "id":cursor.value.id, "actid":cursor.value.actid}])
			console.log(catname + " " + catitems + " " + id + " " + actid);
		}

		removeActivity(){
			// Materialize.toast('Set activity removed', 4000);
			// this.displayActivity();
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityDispData'], "readwrite");
				let store = transaction.objectStore('activityDispData');

				let requestKey = store.get(1);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						
						data.actname = "";
						data.category = [];
						let requestUpdate = store.put(data);

						requestUpdate.onsuccess = function(e){
							Materialize.toast('Set activity is removed', 1500);
							component.getActivityDispData();
							console.log("Set activity is removed.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in renaming activity.");
						}
					}
			}
		}
	//End of Display Activity

	//Templates Page
		actTempPage(key, key2, menuKey){
			let id = document.getElementById("actCattemp");
			//1 = Activity, 2 = Category, 3 = Item
			let	html = `
						<a href="#" onclick="component.tempGeneralActivity(${key}, ${key2}, ${menuKey})">
							<div id="tempGeneral" class="row center">
								<div>
									<span>
										<h3 class="container row center">General</h3>
									</span>
								</div>
							</div>
						</a>
						<a href="#" onclick='component.tempOutdoorActivity(${key}, ${key2}, ${menuKey})'>
							<div id="tempOutdoor" class="row center">
								<div>
									<span>
										<h3 class="container row center">Outdoor</h3>
									</span>
								</div>
							</div>
						</a>
						<a href="#" onclick='component.tempSportsActivity(${key}, ${key2}, ${menuKey})'>
							<div id="tempSports" class="row center">
								<div>
									<span>
										<h3 class="container row center">Sports</h3>
									</span>
								</div>
							</div>
						</a>
				`;
			
					id.innerHTML = html;
		}
	//End of Templates Page

	//Templates General
		//Activity General
			readGeneralTemp(){
				//console.log(this.activitytemp);
				let activityList = document.getElementById("acttempgenerallist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				// let displayHead = document.getElementById("displayheadTempSports");
				// let html2 =`
				// <h5>Sports</h5>`;
				// displayHead.innerHTML = html2;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityGeneralDispList" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempgeneral.length;i++){
					let idName = "listGeneral";
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionGeneralAct(${count}, \""+"${this.activitytempgeneral[i].name}"+"\")' ontouchend="component.catRevert()" id="actGeneralHeader" >
								${this.activitytempgeneral[i].name}
								<span style="margin-top:5px; float:right">
									<input type="radio" name="group1" class="with-gap" href="#!" onclick='component.activityClickHandlerGeneral(${count}, \""+"${this.activitytempgeneral[i].name}"+"\")' id="${idName+count}"  value="${this.activitytempgeneral[i].name}"/>
									<label for="${idName+count}"></label>
								</span>		
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					count++;
					for(let x=0;x<this.activitytempgeneral[i].category.length;x++){
						let idName2 = "catGeneral";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionGeneralCat(${count}, ${count2}, \""+"${this.activitytempgeneral[i].category[x].catname}"+"\")' ontouchend="component.catRevert()"  style="color:#000; display:block; margin-left:8px" >

													${this.activitytempgeneral[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.catClickHandlerGeneral(${count2},${count3},${i},${x})' value="${this.activitytempgeneral[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemGeneralList">
						`;
						for(let y=0;y<this.activitytempgeneral[i].category[x].catitems.length;y++){
								let idName3 = "itemGeneral";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #000;
												padding-left:0px;
												padding-right: 0px;
												margin-left: 20x;
												width: 88%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempSportsItemDetails(${i},${x},${y})" >
										${this.activitytempgeneral[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick="component.itemClickHandlerGeneral(${count2})" value="${this.activitytempgeneral[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonGeneral" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick="component.addActivityGeneral()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				let isChecked = 0
				for(let x=0;x<this.activitytempgeneral;x++){
					if(document.getElementById("listGeneral"+x).checked == true){
						isChecked++;
					}
				}
				
					
				
				activityList.innerHTML = html;
			}

			displayTempGeneralItemDetails(key, key2, key3){
				
				let itemDetails = document.getElementById("modal1");
				let photoSrc = this.activitytempgeneral[key].category[key2].catitems[key3].photo;
				if(photoSrc == "")
					photoSrc = "images/items/def.jpg";
				let html = `<div class="modal-content row" id="itemdetails">
						<center><img style="height: 150px; width:150px;" class="responsive-img center" src="${photoSrc}">
						<h4>${this.activitytempgeneral[key].category[key2].catitems[key3].itemname}</h4>
						</center>
						<p><b>Quantity:</b> <span style="float:right">${this.activitytempgeneral[key].category[key2].catitems[key3].quantity}</span></p>
						<div class="divider"></div>
						<p><b>Note:</b> <span style="float:right">${this.activitytempgeneral[key].category[key2].catitems[key3].remarks}</span></p>
						<div class="divider"></div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Close</a>
					</div>
					`;
					itemDetails.innerHTML = html;
			}

			addActivityGeneral(){
				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				for(let i=0;i<this.activitytempgeneral.length;i++){
					if(document.getElementById("listGeneral"+i).checked == true){
						//Activity
							let add = document.getElementById("listGeneral"+i);
							let val = add.value;
							dummyval = val;
							let check = 0;
							for(let x=0;x<this.activity.length;x++){
								let copy = 0;
								
								if(val == this.activity[x].name){
									check++;
								}
								if(this.activity[x].name == val+" copy"){
									check++;
								}
								for(let y=2; y<this.activity.length;y++){
									if(this.activity[x].name == val+" copy "+y){
										check++;
									}
								}
							}
							if(check == 1){
								dummyval = val+" copy"; 
							}
							else if(check > 1){
								dummyval = val+" copy "+check;
							}
							
							let act = {
							"name":dummyval,
							"category":[]
							};
						this.activitytempdummy.push(act);
						//End of Activity
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempgeneral.length;m++){
								for(let n=0;n<this.activitytempgeneral[m].category.length;n++){
									if(document.getElementById("catGeneral"+count).checked == true){
										let addCat = document.getElementById("catGeneral"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										
										for(let x=0;x<this.activity.length;x++){
											if(dummyval == this.activity[x].name){
												for(let k=0;k<this.activity[x].category.length;k++){
													let copy = 0;
													
													if(valCat == this.activity[x].category[k].catname){
														checkCat++;
													}
													if(this.activity[x].category[k].catname == valCat+" copy"){
														checkCat++;
													}
													for(let y=2; y<this.activity[x].category.length;y++){
														if(this.activity[x].category[k].catname == valCat+" copy "+y){
															checkCat++;
														}
													}
												}
											}
										}
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[this.activitytempdummy.length-1].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempgeneral[m].category[n].catitems.length;t++){
											if(document.getElementById("itemGeneral"+itemCount).checked == true){
												let addItemGeneral = document.getElementById("itemGeneral"+itemCount);
												let valItem = addItemGeneral.value;
												dummyvalItem = valItem;
												checkItem = 0;

												for(let x=0;x<this.activity.length;x++){
													if(dummyval == this.activity[x].name){
														for(let k=0;k<this.activity[x].category.length;k++){
															if(dummyvalCat == this.activity[x].category[k].catname){
																for(let l=0; l<this.activity[x].category[k].catitems.length;l++){
																	if(valItem == this.activity[x].category[k].catitems[l].itemname){
																		checkItem++;
																	}
																	if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy"){
																		checkItem++;
																	}
																	for(let y=2; y<this.activity[x].category[k].catitems.length;y++){
																		if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy "+y){
																			checkItem++;
																		}
																	}
																}
															}	
														}
													}
												}
												if(checkCat == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkCat > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}
												let item = {"itemname":dummyvalItem,"quantity":this.activitytempgeneral[m].category[n].catitems[t].quantity,"remarks":this.activitytempgeneral[m].category[n].catitems[t].remarks,"photo":this.activitytempgeneral[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[this.activitytempdummy.length-1].category[this.activitytempdummy[this.activitytempdummy.length-1].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				}
				Materialize.toast('Activity added', 2500);
				component.addActivityDatabase(this.activitytempdummy);
			}

			activityClickHandlerGeneral(){
				let isChecked = 0
				let html =``;
				for(let x=0;x<this.activitytempgeneral.length;x++){
					if(document.getElementById("listGeneral"+x).checked == true){
						isChecked++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick="component.addActivityGeneral()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonGeneral").innerHTML = html;
			}

			catClickHandlerGeneral(cat, item, key, key2){
				let count=item;
				if(document.getElementById("catGeneral"+cat).checked==false){
						for(let y=0; y<this.activitytempgeneral[key].category[key2].catitems.length;y++){
							document.getElementById("itemGeneral"+count).checked = false;
							count++;
						}
				}
			}

			itemClickHandlerGeneral(count){
				document.getElementById("catGeneral"+count).checked = true;
			}

			longPressOptionGeneralAct(sportsActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerGeneral(timer,istrue, sportsActId, name);},delay);
			}

			actTriggerGeneral(time, check, generalActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalGeneralTempAct(generalActId, name);
			      }
			}

			optionSideModalGeneralTempAct(generalActId, name){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
		
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckGeneral(\""+"${name}"+"\", ${generalActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckGeneral(\""+""+"\",${generalActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckGeneral(\""+""+"\",${generalActId}, \""+"None"+"\")'><h5 style="color:#000000;">Select activity only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			longPressOptionGeneralCat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){component.catTriggerGeneral(timer,istrue, count, count2, name);},delay);
			}

			catTriggerGeneral(time, check, count, count2, name){
		      if(time)
		      	clearTimeout(timer);
		      
		      if(check)
		      {

		          component.optionSideModalGeneralTempCat(count, count2, name);
		      }
			}

			optionSideModalGeneralTempCat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral(\""+"${name}"+"\", ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catGeneral"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckGeneral(name, Id, choice){
				let idName = "listGeneral";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					//document.getElementById(idName+Id).checked = true;
					let countActCheck = 0;
					let idName2 = "catGeneral";
					let idName3 = "itemGeneral";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							count++;
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
						}
					}
					for(let x=0;x<this.activitytempgeneral.length;x++){
						if(document.getElementById("listGeneral"+x).checked == true){
							isChecked++;
							break;
						}
					}
				}
				else if(choice =="Uncheck"){
					//document.getElementById(idName+Id).checked = false;
					let countActCheck = 0;
					let idName2 = "catGeneral";
					let idName3 = "itemGeneral";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							count++;
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
						}
					}
					
					
					for(let x=0;x<this.activitytempgeneral.length;x++){
						if(document.getElementById("listGeneral"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
				else{
					for(let x=0;x<this.activitytempgeneral.length;x++){
						document.getElementById(idName+x).checked = false;
					}
					document.getElementById(idName+Id).checked = true;
					isChecked++;
				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addActivityGeneral()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addActivityGeneral()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonGeneral").innerHTML = html;
			}

			optionResultCheckItemGeneral(name, Id, Id2, choice){
				let idName = "listGeneral";
				let idName2 = "catGeneral";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemGeneral";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempgeneral[z].category.length;x++){
							for(let k=0; k<this.activitytempgeneral[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
							count++;
							}
						count2++;
							
						}
						
								
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemGeneral";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					for(let x=0;x<this.activitytempgeneral.length;x++){
						if(document.getElementById("listGeneral"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
			}

		//End of Activity General

		//Category General
			readGeneralTempCat(nameId){
				let activityList = document.getElementById("cattempgenerallist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityGeneralDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempgeneral.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionGeneralAct_Cat(${count}, ${nameId})' ontouchend="component.catRevert()" id="actGeneralHeaderCat">
								${this.activitytempgeneral[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					count++;
					for(let x=0;x<this.activitytempgeneral[i].category.length;x++){
						let idName2 = "catGeneral_Cat";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionGeneralCat_Cat(${count}, ${count2}, \""+"${nameId}"+"\")' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempgeneral[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.categoryClickHandlerGeneral(\""+"${nameId}"+"\",${count2},${count3},${i},${x})' value="${this.activitytempgeneral[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemGeneralList">
						`;
						for(let y=0;y<this.activitytempgeneral[i].category[x].catitems.length;y++){
								let idName3 = "itemGeneral_Cat";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempGeneralItemDetails(${i},${x},${y})" >
										${this.activitytempgeneral[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerGeneral_Cat(${count2},\""+"${nameId}"+"\")' value="${this.activitytempgeneral[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonGeneralCat" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick='component.addCategoryGeneral(\""+"${nameId}"+"\")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			addCategoryGeneral(nameId){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = nameId;
				this.activitytempdummy.push({"name":this.activity[nameId].name, "category":[]});
				for(let i=0;i<this.activitytempgeneral.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempgeneral.length;m++){
								for(let n=0;n<this.activitytempgeneral[m].category.length;n++){
									if(document.getElementById("catGeneral_Cat"+count).checked == true){
										let addCat = document.getElementById("catGeneral_Cat"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										

				
										for(let k=0;k<this.activity[activityCount].category.length;k++){
											let copy = 0;
											
											if(valCat == this.activity[activityCount].category[k].catname){
												checkCat++;
											}
											if(this.activity[activityCount].category[k].catname == valCat+" copy"){
												checkCat++;
											}
											for(let y=2; y<this.activity[activityCount].category.length;y++){
												if(this.activity[activityCount].category[k].catname == valCat+" copy "+y){
													checkCat++;
												}
											}
										}
										
										
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[0].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempgeneral[m].category[n].catitems.length;t++){
											if(document.getElementById("itemGeneral_Cat"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemGeneral_Cat"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

												for(let k=0;k<this.activity[activityCount].category.length;k++){
													if(dummyvalCat == this.activity[activityCount].category[k].catname){
														for(let l=0; l<this.activity[activityCount].category[k].catitems.length;l++){
															if(valItem == this.activity[activityCount].category[k].catitems[l].itemname){
																checkItem++;
															}
															if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy"){
																checkItem++;
															}
															for(let y=2; y<this.activity[activityCount].category[k].catitems.length;y++){
																if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy "+y){
																	checkItem++;
																}
															}
														}
													}	
												}
										
												if(checkItem == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkItem > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}

												let item;
												if(this.activitytempgeneral[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempgeneral[m].category[n].catitems[t].quantity,"remarks":this.activitytempgeneral[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempgeneral[m].category[n].catitems[t].quantity,"remarks":this.activitytempgeneral[m].category[n].catitems[t].remarks,"photo":this.activitytempgeneral[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[this.activitytempdummy[0].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Category added', 2500);
				component.categoryPage(nameId);
				component.addCategoryDatabase(nameId, this.activitytempdummy);
			}

			categoryClickHandlerGeneral(name, cat, item, key, key2){
				let isChecked = 0;
				let countCheck = 0;
				let count=item;
				if(document.getElementById("catGeneral_Cat"+cat).checked==false){
						for(let y=0; y<this.activitytempgeneral[key].category[key2].catitems.length;y++){
							document.getElementById("itemGeneral_Cat"+count).checked = false;
							count++;
						}
				}
				let html =``;
				for(let x=0;x<this.activitytempgeneral.length;x++){
					for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
						if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategoryGeneral(${name})'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryGeneral()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonGeneralCat").innerHTML = html;
			}

			longPressOptionGeneralAct_Cat(outdoorActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerGeneral_Cat(timer,istrue, outdoorActId, name);},delay);
			}

			actTriggerGeneral_Cat(time, check, outdoorActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalGeneralTempAct_Cat(outdoorActId, name);
			      }
			}

			optionSideModalGeneralTempAct_Cat(outdoorActId, name){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckGeneral_Cat(${name}, ${outdoorActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckGeneral_Cat(\""+""+"\",${outdoorActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								

							</div>
					`;
					option.innerHTML = html;		
			}

			longPressOptionGeneralCat_Cat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerGeneral_Cat(timer,istrue, count, count2, name);},delay);
			}

			catTriggerGeneral_Cat(time, check, count, count2, name){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalGeneralTempCat_Cat(count, count2, name);
			      }
			}

			optionSideModalGeneralTempCat_Cat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<!--
							<div class="row center">
								<h5 class="col s12 m12" style="font-weight:bold;font-size:12pt; padding-left:0">Check all items in this category?</h5>
							</div>-->
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral_Cat(\""+"${name}"+"\", ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral_Cat(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catGeneral_Cat"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckGeneral_Cat(name, Id, choice){
				//let idName = "actOut";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){

					let countActCheck = 0;
					let idName2 = "catGeneral_Cat";
					let idName3 = "itemGeneral_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
							count++;
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
		
					let countActCheck = 0;
					let idName2 = "catGeneral_Cat";
					let idName3 = "itemGeneral_Cat";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
							count++;
						}
					}
					
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}

				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategoryGeneral(${name})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonGeneralCat").innerHTML = html;
			}

			optionResultCheckItemGeneral_Cat(name, Id, Id2, choice){
				//let idName = "actOut";
				console.log(Id);
				let idName2 = "catGeneral_Cat";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemGeneral_Cat";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<Id;z++){
						for(let x=0;x<this.activitytempgeneral[z].category.length;x++){
							for(let k=0; k<this.activitytempgeneral[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
									
								}

							count++;
							}
						count2++;
							
						}
						
								
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
								isChecked++;

								break;
							}
							countCheck++;
						}
						
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemGeneral_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
								isChecked++;

								break;
							}
							countCheck++;
						}
						
					}

				}

				if(isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="component.addCategoryGeneral()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategoryGeneral(\""+"${name}"+"\")'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonGeneralCat").innerHTML = html;
			}

			itemClickHandlerGeneral_Cat(count, name){
				document.getElementById("catGeneral_Cat"+count).checked = true;
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempgeneral.length;x++){
					for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
						if(document.getElementById("catGeneral_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategoryGeneral(\""+"${name}"+"")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryGeneral()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonGeneralCat").innerHTML = html;
			}

		//End of Category General

		//Item General
			readGeneralTempItem(key, key2){
				let activityList = document.getElementById("itemtempgenerallist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityGeneralDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempgeneral.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" id="actOutdoorHeaderCat" >
								${this.activitytempgeneral[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					
					for(let x=0;x<this.activitytempgeneral[i].category.length;x++){
						let idName2 = "catGeneral_Item";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionGeneralCat_Item(${count}, ${count2}, ${key}, ${key2})' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempgeneral[i].category[x].catname} 
													

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemGeneralList">
						`;
						for(let y=0;y<this.activitytempgeneral[i].category[x].catitems.length;y++){
								let idName3 = "itemGeneral_Item";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempGeneralItemDetails(${i},${x},${y})" >
										${this.activitytempgeneral[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerGeneral_Item(${count2},${key}, ${key2})' value="${this.activitytempgeneral[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					count++;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonGeneralItem" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			longPressOptionGeneralCat_Item(count, count2, key, key2){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerGeneral_Item(timer,istrue, count, count2, key, key2);},delay);
			}

			catTriggerGeneral_Item(time, check, count, count2, key, key2){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalGeneralTempCat_Item(count, count2, key, key2);
			      }
			}

			optionSideModalGeneralTempCat_Item(count, count2, key, key2){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral_Item(${key}, ${key2}, ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemGeneral_Item(\""+""+"\", \""+""+"\", ${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckItemGeneral_Item(key, key2, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catGeneral_Item";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					//document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemGeneral_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempgeneral[z].category.length;x++){
							for(let k=0; k<this.activitytempgeneral[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
								count++;
							}
							count2++;
							
						}		
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							for(let p=0;p<this.activitytempgeneral[x].category[y].catitems.length;p++){
								if(document.getElementById("itemGeneral_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
							
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
					//document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemGeneral_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempgeneral[z].category.length;i++){
							for(let x=0;x<this.activitytempgeneral[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempgeneral.length;x++){
						for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
							for(let p=0;p<this.activitytempgeneral[x].category[y].catitems.length;p++){
								if(document.getElementById("itemGeneral_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
						}
						
					}
					
					
					
				}

				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addItemGeneral(${key}, ${key2})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonGeneralItem").innerHTML = html;
			}

			itemClickHandlerGeneral_Item(count, key, key2){
				
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempgeneral.length;x++){
					for(let y=0;y<this.activitytempgeneral[x].category.length;y++){
						for(let z=0;z<this.activitytempgeneral[x].category[y].catitems.length;z++){
							if(document.getElementById("itemGeneral_Item"+countCheck).checked == true){
								isChecked++;
							}
							countCheck++;
						}
						
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addItemGeneral(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addItemSports(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonGeneralItem").innerHTML = html;
			}

			addItemGeneral(key, key2){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = key;
				let categoryCount = key2;
				this.activitytempdummy.push({"name":this.activity[key].name, "category":[{"catname":this.activity[key].category[key2].catname, "catitems":[]}]});
				for(let i=0;i<this.activitytempgeneral.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempgeneral.length;m++){
								for(let n=0;n<this.activitytempgeneral[m].category.length;n++){
									let checkItem = 0;
									for(let t=0; t<this.activitytempgeneral[m].category[n].catitems.length;t++){
											if(document.getElementById("itemGeneral_Item"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemGeneral_Item"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

											
												let item;
												if(this.activitytempgeneral[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempgeneral[m].category[n].catitems[t].quantity,"remarks":this.activitytempgeneral[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempgeneral[m].category[n].catitems[t].quantity,"remarks":this.activitytempgeneral[m].category[n].catitems[t].remarks,"photo":this.activitytempgeneral[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[0].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Item added', 2500);
				console.log(this.activitytempdummy);
				component.addItemDatabase(key, key2, this.activitytempdummy);
			}

		//End of Item General
	//End of Templates General

	//Templates Outdoor
		//Activity Outdoor
			readOutdoorTemp(){
				let activityList = document.getElementById("acttempoutdoorlist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				// let displayHead = document.getElementById("displayheadTempOutdoor");
				// let html2 =`
				// <h5>Outdoor</h5>`;
				// displayHead.innerHTML = html2;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityOutdoorDispList" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempoutdoor.length;i++){
					let idName = "actOut";
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionOutdoorAct(${count}, \""+"${this.activitytempoutdoor[i].name}"+"\")' ontouchend="component.catRevert()" id="actOutdoorHeader" >
								${this.activitytempoutdoor[i].name}
								<span style="margin-top:5px; float:right">
									<input type="radio" name="group1" class="with-gap" href="#!" onclick='component.activityClickHandlerOutdoor(${count}, \""+"${this.activitytempoutdoor[i].name}"+"\")' id="${idName+count}"  value="${this.activitytempoutdoor[i].name}"/>
									<label for="${idName+count}"></label>
								</span>		
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					
					for(let x=0;x<this.activitytempoutdoor[i].category.length;x++){
						let idName2 = "catOutdoor";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionOutdoorCat(${count}, ${count2}, \""+"${this.activitytempoutdoor[i].category[x].catname}"+"\")' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempoutdoor[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.catClickHandlerOutdoor(${count2},${count3},${i},${x})' value="${this.activitytempoutdoor[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemOutdoorList">
						`;
						for(let y=0;y<this.activitytempoutdoor[i].category[x].catitems.length;y++){
								let idName3 = "itemOutdoor";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e54c25;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempOutdoorItemDetails(${i},${x},${y})" >
										${this.activitytempoutdoor[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick="component.itemClickHandlerOutdoor(${count2})" value="${this.activitytempoutdoor[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					count++;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonOutdoor" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick="component.addActivityOutdoor()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}
			displayTempOutdoorItemDetails(key, key2, key3){
				
				let itemDetails = document.getElementById("modal1");
				let photoSrc = this.activitytempoutdoor[key].category[key2].catitems[key3].photo;
				if(photoSrc == "")
					photoSrc = "images/items/def.jpg";
				let html = `<div class="modal-content row" id="itemdetails">
						<center><img style="height: 150px; width:150px;" class="responsive-img center" src="${photoSrc}">
						<h4>${this.activitytempoutdoor[key].category[key2].catitems[key3].itemname}</h4>
						</center>
						<p><b>Quantity:</b> <span style="float:right">${this.activitytempoutdoor[key].category[key2].catitems[key3].quantity}</span></p>
						<div class="divider"></div>
						<p><b>Note:</b> <span style="float:right">${this.activitytempoutdoor[key].category[key2].catitems[key3].remarks}</span></p>
						<div class="divider"></div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Close</a>
					</div>
					`;
					itemDetails.innerHTML = html;
			}

			addActivityOutdoor(){
				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				for(let i=0;i<this.activitytempoutdoor.length;i++){
					if(document.getElementById("actOut"+i).checked == true){
						//Activity
							let add = document.getElementById("actOut"+i);
							let val = add.value;
							dummyval = val;
							let check = 0;
							for(let x=0;x<this.activity.length;x++){
								let copy = 0;
								
								if(val == this.activity[x].name){
									check++;
								}
								if(this.activity[x].name == val+" copy"){
									check++;
								}
								for(let y=2; y<this.activity.length;y++){
									if(this.activity[x].name == val+" copy "+y){
										check++;
									}
								}
							}
							if(check == 1){
								dummyval = val+" copy"; 
							}
							else if(check > 1){
								dummyval = val+" copy "+check;
							}
							
							let act = {
							"name":dummyval,
							"category":[]
							};
						this.activitytempdummy.push(act);
						//End of Activity
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempoutdoor.length;m++){
								for(let n=0;n<this.activitytempoutdoor[m].category.length;n++){
									if(document.getElementById("catOutdoor"+count).checked == true){
										let addCat = document.getElementById("catOutdoor"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										
										for(let x=0;x<this.activity.length;x++){
											if(dummyval == this.activity[x].name){
												for(let k=0;k<this.activity[x].category.length;k++){
													let copy = 0;
													
													if(valCat == this.activity[x].category[k].catname){
														checkCat++;
													}
													if(this.activity[x].category[k].catname == valCat+" copy"){
														checkCat++;
													}
													for(let y=2; y<this.activity[x].category.length;y++){
														if(this.activity[x].category[k].catname == valCat+" copy "+y){
															checkCat++;
														}
													}
												}
											}
										}
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[this.activitytempdummy.length-1].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempoutdoor[m].category[n].catitems.length;t++){
											if(document.getElementById("itemOutdoor"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemOutdoor"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

												for(let x=0;x<this.activity.length;x++){
													if(dummyval == this.activity[x].name){
														for(let k=0;k<this.activity[x].category.length;k++){
															if(dummyvalCat == this.activity[x].category[k].catname){
																for(let l=0; l<this.activity[x].category[k].catitems.length;l++){
																	if(valItem == this.activity[x].category[k].catitems[l].itemname){
																		checkItem++;
																	}
																	if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy"){
																		checkItem++;
																	}
																	for(let y=2; y<this.activity[x].category[k].catitems.length;y++){
																		if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy "+y){
																			checkItem++;
																		}
																	}
																}
															}	
														}
													}
												}
												console.log(checkItem + "< checkItem");
												if(checkItem == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkItem > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}
												else{
													dummyvalItem = valItem;
												}

												let item;
												if(this.activitytempoutdoor[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":this.activitytempoutdoor[m].category[n].catitems[t].photo};

												this.activitytempdummy[this.activitytempdummy.length-1].category[this.activitytempdummy[this.activitytempdummy.length-1].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
							}
						//End of Category
						break;
					}

				}
				console.log(this.activitytempdummy);
				Materialize.toast('Activity added', 2500);
				component.addActivityDatabase(this.activitytempdummy);
				//component.activityPage();
			}

			addActivityDatabase(actArr){
				console.log(actArr[0].name);
				
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				request.onsuccess = function(e){
					db = e.target.result;

					//Activity

					let transaction = db.transaction(['activityData'], "readwrite");
					let store = transaction.objectStore('activityData');
					
					let activity = {
						name:actArr[0].name,
						category: []
					}
					
					let addRequest = store.add(activity);
					addRequest.onsuccess = function(e){
						component.getActivityDataTemp(actArr);
						component.activityPage();
						
					}
					addRequest.onerror = function(e){
						console.log("Error in storing data.");
					}

					
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			}

			getActivityDataTemp(actArr){
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				let dummyAct = [];
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['activityData'], "readonly");
					let store = transaction.objectStore('activityData');
					let index = store.index('name');

					index.openCursor().onsuccess = function (e){
						let cursor = event.target.result;
						
						if(cursor){
							dummyAct.push({"name":cursor.value.name, "category":cursor.value.category, "id":cursor.value.id});
							cursor.continue();
						}
						else{
							component.activityPushTemp(dummyAct, actArr);
							
							
						}
						

						
					}
					
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			}

			activityPushTemp(actval, actArr){
				
				this.activity = actval;
				let indexKey = 0;
				for(let x = 0; x<this.activity.length;x++){
					if(this.activity[x].name==actArr[0].name){
						indexKey = x;
						break;
					}
				}
				//Category

				if(actArr[0].category!=""){
					let request = indexedDB.open('mybackpackDB', 1);
					let db = "";
					let dummyCheck = "";
					actArr[0].category.sort(component.predicateBy("catname"));
					request.onsuccess = function(e){
						db = e.target.result;
						let transactionCat = db.transaction(['categoryData'], "readwrite");
						let storeCat = transactionCat.objectStore('categoryData');
						for(let i=0; i<actArr[0].category.length;i++){
							if(dummyCheck != actArr[0].category[i].catname){

								let category = {
									actid: actval[indexKey].id,
									catname:actArr[0].category[i].catname,
									catitems: []
								}
								
								let addCatRequest = storeCat.add(category);
								dummyCheck = actArr[0].category[i].catname;

								addCatRequest.onsuccess = function(e){
									if(i == actArr[0].category.length-1){
										component.getCategoryDataTemp(indexKey, actArr);
									}
								}
								addCatRequest.onerror = function(e){
									console.log("Error in storing data.");
								}
							}
							else{
								if(i == actArr[0].category.length-1){
									component.getCategoryDataTemp(indexKey, actArr);
								}
							}
						}
					}
					

					request.onerror = function(e){

						console.log('Error!');
					}
					component.readActivity();
				}
				else{
					this.activitytempdummy = [];
					component.readActivity();
				}	
			}

			getCategoryDataTemp(key, actArr){
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				let dummyCat = [];
				let actId = this.activity[key].id;
				console.log(this.activity);
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['categoryData'], "readonly");
					let store = transaction.objectStore('categoryData');
					let index = store.index('catname');

					index.openCursor().onsuccess = function (e){
						let cursor = event.target.result;
						
						if(cursor){
							if(cursor.value.actid == actId){
								dummyCat.push({"catname":cursor.value.catname, "catitems":cursor.value.catitems, "id":cursor.value.id, "actid":cursor.value.actid});
							}
							cursor.continue();
						}
						else{
							component.catPushTemp(key, dummyCat, actArr);
						}		
					}
					
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			}

			catPushTemp(key, catval, actArr){
				this.activity[key].category = catval;
				let actId = this.activity[key].id;
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				let indexKey = 0;
				catval.sort(component.predicateBy("catname"));
				request.onsuccess = function(e){
					for(let z = 0; z < actArr[0].category.length;z++){
						
						if(actArr[0].category[z].catitems!=""){
							for(let x=0;x<catval.length;x++){

								if(actArr[0].category[z].catname == catval[x].catname){
									let items = {};
									db = e.target.result;
									let transaction = db.transaction(['itemData'], "readwrite");
									let store = transaction.objectStore('itemData');
									for(let i=0; i<actArr[0].category[z].catitems.length;i++){
										items = {
											actid: actId,
											catid: catval[x].id,
											itemname:actArr[0].category[z].catitems[i].itemname,
											quantity:actArr[0].category[z].catitems[i].quantity,
											photo:actArr[0].category[z].catitems[i].photo,
											remarks:actArr[0].category[z].catitems[i].remarks
										}
										let addCatRequest = store.add(items);
										addCatRequest.onsuccess = function(e){
											component.clearTempActivity();
											console.log("Please");
										}
										addCatRequest.onerror = function(e){
											console.log("Error in storing data.");
										}
									}
								}	
							}
											
								
						}
						else{
							if(z == actArr[0].category.length-1){
								this.activitytempdummy = [];
								component.readActivity();
							}
						}
					}
				}
				request.onerror = function(e){

					console.log('Error!');
				}
			}

			clearTempActivity(){
				this.activitytempdummy = [];
			}

			activityClickHandlerOutdoor(){
				let isChecked = 0
				let html =``;
				for(let x=0;x<this.activitytempoutdoor.length;x++){
					if(document.getElementById("actOut"+x).checked == true){
						isChecked++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick="component.addActivityOutdoor()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonOutdoor").innerHTML = html;
			}

			catClickHandlerOutdoor(cat, item, key, key2){
				let count=item;
				if(document.getElementById("catOutdoor"+cat).checked==false){
						for(let y=0; y<this.activitytempoutdoor[key].category[key2].catitems.length;y++){
							document.getElementById("itemOutdoor"+count).checked = false;
							count++;
						}
				}
			}

			itemClickHandlerOutdoor(count){
				document.getElementById("catOutdoor"+count).checked = true;
			}

			longPressOptionOutdoorAct(outdoorActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerOutdoor(timer,istrue, outdoorActId, name);},delay);
			}

			actTriggerOutdoor(time, check, outdoorActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalOutdoorTempAct(outdoorActId, name);
			      }
			}

			optionSideModalOutdoorTempAct(outdoorActId, name){
				//console.log("ACTIVITY LONG PRESSED");
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<!--
							<div class="row center">
								<h5 class="col s12 m12" style="font-weight:bold;font-size:12pt; padding-left:0">Check all items in this activity?</h5>
							</div>-->
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckOutdoor(\""+"${name}"+"\", ${outdoorActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckOutdoor(\""+""+"\",${outdoorActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckOutdoor(\""+""+"\",${outdoorActId}, \""+"None"+"\")'><h5 style="color:#000000;">Select activity only</h5></a>

							</div>
					`;
					option.innerHTML = html;	
			}

			longPressOptionOutdoorCat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerOutdoor(timer,istrue, count, count2, name);},delay);
			}

			catTriggerOutdoor(time, check, count, count2, name){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalOutdoorTempCat(count, count2, name);
			      }
			}

			optionSideModalOutdoorTempCat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<!--
							<div class="row center">
								<h5 class="col s12 m12" style="font-weight:bold;font-size:12pt; padding-left:0">Check all items in this category?</h5>
							</div>-->
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor(\""+"${name}"+"\", ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catOutdoor"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckOutdoor(name, Id, choice){
				let idName = "actOut";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){

					let countActCheck = 0;
					let idName2 = "catOutdoor";
					let idName3 = "itemOutdoor";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							count++;
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
						}
					}
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						if(document.getElementById("actOut"+x).checked == true){
							isChecked++;
							break;
						}
					}
				}
				else if(choice =="Uncheck"){
		
					let countActCheck = 0;
					let idName2 = "catOutdoor";
					let idName3 = "itemOutdoor";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							count++;
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
						}
					}
					
					
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						if(document.getElementById("actOut"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
				else{
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						document.getElementById(idName+x).checked = false;
					}
					document.getElementById(idName+Id).checked = true;
					isChecked++;
				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addActivityOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addActivityOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonOutdoor").innerHTML = html;
			}

			optionResultCheckItemOutdoor(name, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catOutdoor";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemOutdoor";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempoutdoor[z].category.length;x++){
							for(let k=0; k<this.activitytempoutdoor[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
							count++;
							}
						count2++;
							
						}
						
								
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemOutdoor";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						if(document.getElementById("actOut"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
			}
		//End of Activity Outdoor

		//Category Outdoor
			readOutdoorTempCat(nameId){
				let activityList = document.getElementById("cattempoutdoorlist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityOutdoorDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempoutdoor.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionOutdoorAct_Cat(${count}, ${nameId})' ontouchend="component.catRevert()" id="actOutdoorHeaderCat" >
								${this.activitytempoutdoor[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					
					for(let x=0;x<this.activitytempoutdoor[i].category.length;x++){
						let idName2 = "catOutdoor_Cat";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionOutdoorCat_Cat(${count}, ${count2}, ${nameId})' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempoutdoor[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.categoryClickHandlerOutdoor(${nameId},${count2},${count3},${i},${x})' value="${this.activitytempoutdoor[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemOutdoorList">
						`;
						for(let y=0;y<this.activitytempoutdoor[i].category[x].catitems.length;y++){
								let idName3 = "itemOutdoor_Cat";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempOutdoorItemDetails(${i},${x},${y})" >
										${this.activitytempoutdoor[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerOutdoor_Cat(${count2},${nameId})' value="${this.activitytempoutdoor[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					count++;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonOutdoorCat" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick='component.addCategoryOutdoor(${nameId})'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			addCategoryOutdoor(nameId){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = nameId;
				this.activitytempdummy.push({"name":this.activity[nameId].name, "category":[]});
				for(let i=0;i<this.activitytempoutdoor.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempoutdoor.length;m++){
								for(let n=0;n<this.activitytempoutdoor[m].category.length;n++){
									if(document.getElementById("catOutdoor_Cat"+count).checked == true){
										let addCat = document.getElementById("catOutdoor_Cat"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										

				
										for(let k=0;k<this.activity[activityCount].category.length;k++){
											let copy = 0;
											
											if(valCat == this.activity[activityCount].category[k].catname){
												checkCat++;
											}
											if(this.activity[activityCount].category[k].catname == valCat+" copy"){
												checkCat++;
											}
											for(let y=2; y<this.activity[activityCount].category.length;y++){
												if(this.activity[activityCount].category[k].catname == valCat+" copy "+y){
													checkCat++;
												}
											}
										}
										
										
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[0].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempoutdoor[m].category[n].catitems.length;t++){
											if(document.getElementById("itemOutdoor_Cat"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemOutdoor_Cat"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

											
												for(let k=0;k<this.activity[activityCount].category.length;k++){
													if(dummyvalCat == this.activity[activityCount].category[k].catname){
														for(let l=0; l<this.activity[activityCount].category[k].catitems.length;l++){
															if(valItem == this.activity[activityCount].category[k].catitems[l].itemname){
																checkItem++;
															}
															if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy"){
																checkItem++;
															}
															for(let y=2; y<this.activity[activityCount].category[k].catitems.length;y++){
																if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy "+y){
																	checkItem++;
																}
															}
														}
													}	
												}
											
												if(checkItem == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkItem > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}
											
												let item;
												if(this.activitytempoutdoor[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":this.activitytempoutdoor[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[this.activitytempdummy[0].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Category added', 2500);
				console.log(this.activitytempdummy);
				component.addCategoryDatabase(nameId, this.activitytempdummy);
			}

			addCategoryDatabase(key, actArr){
				console.log(actArr[0].category);
				let actId = this.activity[key].id;
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				let dummyCheck = "";
				actArr[0].category.sort(component.predicateBy("catname"));
				request.onsuccess = function(e){
					db = e.target.result;

					//Activity

					let transaction = db.transaction(['categoryData'], "readwrite");
					let store = transaction.objectStore('categoryData');
					for(let i=0; i<actArr[0].category.length;i++){
						if(dummyCheck != actArr[0].category[i].catname){
							let category = {
								actid: actId,
								catname:actArr[0].category[i].catname,
								catitems: []
							}
							
							let addCatRequest = store.add(category);
							dummyCheck = actArr[0].category[i].catname;
							addCatRequest.onsuccess = function(e){
								if(i == actArr[0].category.length-1){
									
									component.getCategoryDataTemp(key, actArr);
									component.categoryPage(key);
									component.clearTempActivity();
								}
							}
							addCatRequest.onerror = function(e){
								console.log("Error in storing data.");
							}
						}
						else{
							if(i == actArr[0].category.length-1){		
									component.getCategoryDataTemp(key, actArr);
									component.categoryPage(key);
									component.clearTempActivity();
							}
						}
						
					}


					
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			}

			categoryClickHandlerOutdoor(name, cat, item, key, key2){
				let isChecked = 0;
				let countCheck = 0;
				let count=item;
				if(document.getElementById("catOutdoor_Cat"+cat).checked==false){
						for(let y=0; y<this.activitytempoutdoor[key].category[key2].catitems.length;y++){
							document.getElementById("itemOutdoor_Cat"+count).checked = false;
							count++;
						}
				}
				let html =``;
				for(let x=0;x<this.activitytempoutdoor.length;x++){
					for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
						if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategoryOutdoor(\""+"${name}"+"")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryOutdoor()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonOutdoorCat").innerHTML = html;
			}

			longPressOptionOutdoorAct_Cat(outdoorActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerOutdoor_Cat(timer,istrue, outdoorActId, name);},delay);
			}

			actTriggerOutdoor_Cat(time, check, outdoorActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalOutdoorTempAct_Cat(outdoorActId, name);
			      }
			}

			optionSideModalOutdoorTempAct_Cat(outdoorActId, name){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckOutdoor_Cat(${name}, ${outdoorActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckOutdoor_Cat(\""+""+"\",${outdoorActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								

							</div>
					`;
					option.innerHTML = html;				
			}

			longPressOptionOutdoorCat_Cat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerOutdoor_Cat(timer,istrue, count, count2, name);},delay);
			}

			catTriggerOutdoor_Cat(time, check, count, count2, name){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalOutdoorTempCat_Cat(count, count2, name);
			      }
			}

			optionSideModalOutdoorTempCat_Cat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor_Cat(${name}, ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor_Cat(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catOutdoor_Cat"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckOutdoor_Cat(name, Id, choice){
				let idName = "actOut";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){

					let countActCheck = 0;
					let idName2 = "catOutdoor_Cat";
					let idName3 = "itemOutdoor_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							count++;
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
		
					let countActCheck = 0;
					let idName2 = "catOutdoor_Cat";
					let idName3 = "itemOutdoor_Cat";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							count++;
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
						}
					}
					
					let countCheck = 0;
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}

				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategoryOutdoor(${name})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonOutdoorCat").innerHTML = html;
			}

			optionResultCheckItemOutdoor_Cat(name, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catOutdoor_Cat";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemOutdoor_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempoutdoor[z].category.length;x++){
							for(let k=0; k<this.activitytempoutdoor[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
							count++;
							}
						count2++;
							
						}		
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemOutdoor_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							if(document.getElementById("catOutdoor_Cat"+x).checked == true){
								isChecked++;
								break;
							}
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}
				}

				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="component.addCategoryOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategoryOutdoor(${name})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonOutdoorCat").innerHTML = html;
			}

			itemClickHandlerOutdoor_Cat(count, name){
				document.getElementById("catOutdoor_Cat"+count).checked = true;
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempoutdoor.length;x++){
					for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
						if(document.getElementById("catOutdoor_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategoryOutdoor(\""+"${name}"+"")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryOutdoor()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonOutdoorCat").innerHTML = html;
			}
		//End of Category Outdoor

		//Item Outdoor
			readOutdoorTempItem(key, key2){
				let activityList = document.getElementById("itemtempoutdoorlist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityOutdoorDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempoutdoor.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" id="actOutdoorHeaderCat" >
								${this.activitytempoutdoor[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					
					for(let x=0;x<this.activitytempoutdoor[i].category.length;x++){
						let idName2 = "catOutdoor_Item";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionOutdoorCat_Item(${count}, ${count2}, ${key}, ${key2})' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempoutdoor[i].category[x].catname} 
													

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemOutdoorList">
						`;
						for(let y=0;y<this.activitytempoutdoor[i].category[x].catitems.length;y++){
								let idName3 = "itemOutdoor_Item";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempOutdoorItemDetails(${i},${x},${y})" >
										${this.activitytempoutdoor[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerOutdoor_Item(${count2},${key}, ${key2})' value="${this.activitytempoutdoor[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					count++;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonOutdoorItem" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick='component.addCategoryOutdoor(${key}, ${key2})'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			itemClickHandlerOutdoor_Item(count, key, key2){
				
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempoutdoor.length;x++){
					for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
						for(let z=0;z<this.activitytempoutdoor[x].category[y].catitems.length;z++){
							if(document.getElementById("itemOutdoor_Item"+countCheck).checked == true){
								isChecked++;
							}
							countCheck++;
						}
						
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addItemOutdoor(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addItemOutdoor(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonOutdoorItem").innerHTML = html;
			}

			addItemOutdoor(key, key2){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = key;
				let categoryCount = key2;
				this.activitytempdummy.push({"name":this.activity[key].name, "category":[{"catname":this.activity[key].category[key2].catname, "catitems":[]}]});
				for(let i=0;i<this.activitytempoutdoor.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempoutdoor.length;m++){
								for(let n=0;n<this.activitytempoutdoor[m].category.length;n++){
									let checkItem = 0;
									for(let t=0; t<this.activitytempoutdoor[m].category[n].catitems.length;t++){
											if(document.getElementById("itemOutdoor_Item"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemOutdoor_Item"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

											
												let item;
												if(this.activitytempoutdoor[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempoutdoor[m].category[n].catitems[t].quantity,"remarks":this.activitytempoutdoor[m].category[n].catitems[t].remarks,"photo":this.activitytempoutdoor[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[0].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Item added', 2500);
				console.log(this.activitytempdummy);
				component.addItemDatabase(key, key2, this.activitytempdummy);
			}

			addItemDatabase(key, key2, actArr){
				let actId = this.activity[key].id;
				let catId = this.activity[key].category[key2].id;
				let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				actArr[0].category[0].catitems.sort(component.predicateBy("itemname"));
				request.onsuccess = function(e){
					db = e.target.result;

		
					let transaction = db.transaction(['itemData'], "readwrite");
					let store = transaction.objectStore('itemData');
					for(let i=0; i<actArr[0].category[0].catitems.length;i++){
						let items = {
							actid: actId,
							catid: catId,
							itemname:actArr[0].category[0].catitems[i].itemname,
							quantity:actArr[0].category[0].catitems[i].quantity,
							photo:actArr[0].category[0].catitems[i].photo,
							remarks:actArr[0].category[0].catitems[i].remarks
						}
						let addCatRequest = store.add(items);
						addCatRequest.onsuccess = function(e){
							component.itemPage(key, key2);
							component.clearTempActivity();
							console.log("Please");
						}
						addCatRequest.onerror = function(e){
							console.log("Error in storing data.");
						}
					}


					
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			}

			longPressOptionOutdoorCat_Item(count, count2, key, key2){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerOutdoor_Item(timer,istrue, count, count2, key, key2);},delay);
			}

			catTriggerOutdoor_Item(time, check, count, count2, key, key2){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalOutdoorTempCat_Item(count, count2, key, key2);
			      }
			}

			optionSideModalOutdoorTempCat_Item(count, count2, key, key2){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor_Item(${key}, ${key2}, ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemOutdoor_Item(\""+""+"\", \""+""+"\", ${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckItemOutdoor_Item(key, key2, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catOutdoor_Item";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					//document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemOutdoor_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempoutdoor[z].category.length;x++){
							for(let k=0; k<this.activitytempoutdoor[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
								count++;
							}
							count2++;
							
						}		
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempoutdoor.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							for(let p=0;p<this.activitytempoutdoor[x].category[y].catitems.length;p++){
								if(document.getElementById("itemOutdoor_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
							
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
					//document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemOutdoor_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempoutdoor[z].category.length;i++){
							for(let x=0;x<this.activitytempoutdoor[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempoutdoor[x].category.length;y++){
							for(let p=0;p<this.activitytempoutdoor[x].category[y].catitems.length;p++){
								if(document.getElementById("itemOutdoor_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
						}
						
					}
					
					
					
				}

				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addItemOutdoor(${key}, ${key2})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonOutdoorItem").innerHTML = html;
			}
		//End of Item Outdoor
	//End of Templates Outdoor

	//Templates Sports
		//Activity Sports
			readSportsTemp(){
				//console.log(this.activitytemp);
				let activityList = document.getElementById("acttempsportslist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activitySportsDispList" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempsports.length;i++){
					let idName = "list";
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionSportAct(${count}, \""+"${this.activitytempsports[i].name}"+"\")' ontouchend="component.catRevert()" id="actSportsHeader" >
								${this.activitytempsports[i].name}
								<span style="margin-top:5px; float:right">
									<input type="radio" name="group1" class="with-gap" href="#!" onclick='component.activityClickHandler(${count}, \""+"${this.activitytempsports[i].name}"+"\")' id="${idName+count}"  value="${this.activitytempsports[i].name}"/>
									<label for="${idName+count}"></label>
								</span>		
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					count++;
					for(let x=0;x<this.activitytempsports[i].category.length;x++){
						let idName2 = "catSport";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionSportCat(${count}, ${count2}, \""+"${this.activitytempsports[i].category[x].catname}"+"\")' ontouchend="component.catRevert()"  style="color:#000; display:block; margin-left:8px" >

													${this.activitytempsports[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.catClickHandlerSports(${count2},${count3},${i},${x})' value="${this.activitytempsports[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemSportList">
						`;
						for(let y=0;y<this.activitytempsports[i].category[x].catitems.length;y++){
								let idName3 = "itemSport";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #000;
												padding-left:0px;
												padding-right: 0px;
												margin-left: 20x;
												width: 88%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempSportsItemDetails(${i},${x},${y})" >
										${this.activitytempsports[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick="component.itemClickHandler(${count2})" value="${this.activitytempsports[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonSports" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick="component.addActivitySports()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				let isChecked = 0
				for(let x=0;x<this.activitytempsports;x++){
					if(document.getElementById("list"+x).checked == true){
						isChecked++;
					}
				}
				
					
				
				activityList.innerHTML = html;
			}

			displayTempSportsItemDetails(key, key2, key3){
				
				let itemDetails = document.getElementById("modal1");
				let photoSrc = this.activitytempsports[key].category[key2].catitems[key3].photo;
				if(photoSrc == "")
					photoSrc = "images/items/def.jpg";
				let html = `<div class="modal-content row" id="itemdetails">
						<center><img style="height: 150px; width:150px;" class="responsive-img center" src="${photoSrc}">
						<h4>${this.activitytempsports[key].category[key2].catitems[key3].itemname}</h4>
						</center>
						<p><b>Quantity:</b> <span style="float:right">${this.activitytempsports[key].category[key2].catitems[key3].quantity}</span></p>
						<div class="divider"></div>
						<p><b>Note:</b> <span style="float:right">${this.activitytempsports[key].category[key2].catitems[key3].remarks}</span></p>
						<div class="divider"></div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Close</a>
					</div>
					`;
					itemDetails.innerHTML = html;
			}

			addActivitySports(){
				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				for(let i=0;i<this.activitytempsports.length;i++){
					if(document.getElementById("list"+i).checked == true){
						//Activity
							let add = document.getElementById("list"+i);
							let val = add.value;
							dummyval = val;
							let check = 0;
							for(let x=0;x<this.activity.length;x++){
								let copy = 0;
								
								if(val == this.activity[x].name){
									check++;
								}
								if(this.activity[x].name == val+" copy"){
									check++;
								}
								for(let y=2; y<this.activity.length;y++){
									if(this.activity[x].name == val+" copy "+y){
										check++;
									}
								}
							}
							if(check == 1){
								dummyval = val+" copy"; 
							}
							else if(check > 1){
								dummyval = val+" copy "+check;
							}
							
							let act = {
							"name":dummyval,
							"category":[]
							};
						this.activitytempdummy.push(act);
						//End of Activity
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempsports.length;m++){
								for(let n=0;n<this.activitytempsports[m].category.length;n++){
									if(document.getElementById("catSport"+count).checked == true){
										let addCat = document.getElementById("catSport"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										
										for(let x=0;x<this.activity.length;x++){
											if(dummyval == this.activity[x].name){
												for(let k=0;k<this.activity[x].category.length;k++){
													let copy = 0;
													
													if(valCat == this.activity[x].category[k].catname){
														checkCat++;
													}
													if(this.activity[x].category[k].catname == valCat+" copy"){
														checkCat++;
													}
													for(let y=2; y<this.activity[x].category.length;y++){
														if(this.activity[x].category[k].catname == valCat+" copy "+y){
															checkCat++;
														}
													}
												}
											}
										}
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[this.activitytempdummy.length-1].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempsports[m].category[n].catitems.length;t++){
											if(document.getElementById("itemSport"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemSport"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

												for(let x=0;x<this.activity.length;x++){
													if(dummyval == this.activity[x].name){
														for(let k=0;k<this.activity[x].category.length;k++){
															if(dummyvalCat == this.activity[x].category[k].catname){
																for(let l=0; l<this.activity[x].category[k].catitems.length;l++){
																	if(valItem == this.activity[x].category[k].catitems[l].itemname){
																		checkItem++;
																	}
																	if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy"){
																		checkItem++;
																	}
																	for(let y=2; y<this.activity[x].category[k].catitems.length;y++){
																		if(this.activity[x].category[k].catitems[l].itemname == valItem+" copy "+y){
																			checkItem++;
																		}
																	}
																}
															}	
														}
													}
												}
												if(checkCat == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkCat > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}
												let item = {"itemname":dummyvalItem,"quantity":this.activitytempsports[m].category[n].catitems[t].quantity,"remarks":this.activitytempsports[m].category[n].catitems[t].remarks,"photo":this.activitytempsports[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[this.activitytempdummy.length-1].category[this.activitytempdummy[this.activitytempdummy.length-1].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				}
				Materialize.toast('Activity added', 2500);
				component.addActivityDatabase(this.activitytempdummy);
			}

			activityClickHandler(){
				let isChecked = 0
				let html =``;
				for(let x=0;x<this.activitytempsports.length;x++){
					if(document.getElementById("list"+x).checked == true){
						isChecked++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick="component.addActivitySports()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonSports").innerHTML = html;
			}

			catClickHandlerSports(cat, item, key, key2){
				let count=item;
				if(document.getElementById("catSport"+cat).checked==false){
						for(let y=0; y<this.activitytempsports[key].category[key2].catitems.length;y++){
							document.getElementById("itemSport"+count).checked = false;
							count++;
						}
				}
			}

			itemClickHandler(count){
				document.getElementById("catSport"+count).checked = true;
			}

			longPressOptionSportAct(sportsActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTrigger(timer,istrue, sportsActId, name);},delay);
			}

			actTrigger(time, check, sportsActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalSportTempAct(sportsActId, name);
			      }
			}

			optionSideModalSportTempAct(sportsActId, name){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
		
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckSport(\""+"${name}"+"\", ${sportsActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckSport(\""+""+"\",${sportsActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckSport(\""+""+"\",${sportsActId}, \""+"None"+"\")'><h5 style="color:#000000;">Select activity only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			longPressOptionSportCat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){ component.catTrigger(timer,istrue, count, count2, name);},delay);
			}

			catTrigger(time, check, count, count2, name){
		      if(time)
		      clearTimeout(timer);
		      
		      if(check)
		      {
		          component.optionSideModalSportTempCat(count, count2, name);
		      }
			}

			catRevert(){
				clearTimeout(timer);
				istrue =false;
			}

			optionSideModalSportTempCat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSport(\""+"${name}"+"\", ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSport(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catSport"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckSport(name, Id, choice){
				let idName = "list";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					//document.getElementById(idName+Id).checked = true;
					let countActCheck = 0;
					let idName2 = "catSport";
					let idName3 = "itemSport";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							count++;
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
						}
					}
					for(let x=0;x<this.activitytempsports.length;x++){
						if(document.getElementById("list"+x).checked == true){
							isChecked++;
							break;
						}
					}
				}
				else if(choice =="Uncheck"){
					//document.getElementById(idName+Id).checked = false;
					let countActCheck = 0;
					let idName2 = "catSport";
					let idName3 = "itemSport";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							count++;
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
						}
					}
					
					
					for(let x=0;x<this.activitytempsports.length;x++){
						if(document.getElementById("list"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
				else{
					for(let x=0;x<this.activitytempsports.length;x++){
						document.getElementById(idName+x).checked = false;
					}
					document.getElementById(idName+Id).checked = true;
					isChecked++;
				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addActivitySports()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addActivitySports()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonSports").innerHTML = html;
			}

			optionResultCheckItemSport(name, Id, Id2, choice){
				let idName = "list";
				let idName2 = "catSport";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemSport";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempsports[z].category.length;x++){
							for(let k=0; k<this.activitytempsports[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
							count++;
							}
						count2++;
							
						}
						
								
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemSport";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					for(let x=0;x<this.activitytempsports.length;x++){
						if(document.getElementById("list"+x).checked == true){
							isChecked++;
							break;
						}
					}

				}
			}
		//End of Activity Sports

		//Category Sports
			readSportsTempCat(nameId){
				let activityList = document.getElementById("cattempsportslist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activitySportsDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempsports.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionSportsAct_Cat(${count}, ${nameId})' ontouchend="component.catRevert()" id="actSportsHeaderCat">
								${this.activitytempsports[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					count++;
					for(let x=0;x<this.activitytempsports[i].category.length;x++){
						let idName2 = "catSports_Cat";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionSportsCat_Cat(${count}, ${count2}, \""+"${nameId}"+"\")' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempsports[i].category[x].catname} 
													<span class="badge" style="margin-top:5px;">
														<input type="checkbox" id="${idName2+count2}" onclick='component.categoryClickHandlerSports(\""+"${nameId}"+"\",${count2},${count3},${i},${x})' value="${this.activitytempsports[i].category[x].catname}"/>
														<label for="${idName2+count2}"></label>
													</span> 

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemSportsList">
						`;
						for(let y=0;y<this.activitytempsports[i].category[x].catitems.length;y++){
								let idName3 = "itemSports_Cat";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempSportsItemDetails(${i},${x},${y})" >
										${this.activitytempsports[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerSports_Cat(${count2},\""+"${nameId}"+"\")' value="${this.activitytempsports[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonSportsCat" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick='component.addCategorySports(\""+"${nameId}"+"\")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			addCategorySports(nameId){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = nameId;
				this.activitytempdummy.push({"name":this.activity[nameId].name, "category":[]});
				for(let i=0;i<this.activitytempsports.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempsports.length;m++){
								for(let n=0;n<this.activitytempsports[m].category.length;n++){
									if(document.getElementById("catSports_Cat"+count).checked == true){
										let addCat = document.getElementById("catSports_Cat"+count);
										let valCat = addCat.value;
										dummyvalCat = valCat;
										checkCat = 0;
										

				
										for(let k=0;k<this.activity[activityCount].category.length;k++){
											let copy = 0;
											
											if(valCat == this.activity[activityCount].category[k].catname){
												checkCat++;
											}
											if(this.activity[activityCount].category[k].catname == valCat+" copy"){
												checkCat++;
											}
											for(let y=2; y<this.activity[activityCount].category.length;y++){
												if(this.activity[activityCount].category[k].catname == valCat+" copy "+y){
													checkCat++;
												}
											}
										}
										
										
										
										if(checkCat == 1){
											dummyvalCat = valCat+" copy";
										}
										else if(checkCat > 1){
											dummyvalCat = valCat+" copy "+checkCat;
										}
										let cat = {"catname":dummyvalCat,"catitems":[]};
										
										this.activitytempdummy[0].category.push(cat);
										
										
									}
									let checkItem = 0;
									for(let t=0; t<this.activitytempsports[m].category[n].catitems.length;t++){
											if(document.getElementById("itemSports_Cat"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemSports_Cat"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

												for(let k=0;k<this.activity[activityCount].category.length;k++){
													if(dummyvalCat == this.activity[activityCount].category[k].catname){
														for(let l=0; l<this.activity[activityCount].category[k].catitems.length;l++){
															if(valItem == this.activity[activityCount].category[k].catitems[l].itemname){
																checkItem++;
															}
															if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy"){
																checkItem++;
															}
															for(let y=2; y<this.activity[activityCount].category[k].catitems.length;y++){
																if(this.activity[activityCount].category[k].catitems[l].itemname == valItem+" copy "+y){
																	checkItem++;
																}
															}
														}
													}	
												}
										
												if(checkItem == 1){
													dummyvalItem = valItem+" copy";
												}
												else if(checkItem > 1){
													dummyvalItem = valItem+" copy "+checkItem;
												}

												let item;
												if(this.activitytempsports[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempsports[m].category[n].catitems[t].quantity,"remarks":this.activitytempsports[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempsports[m].category[n].catitems[t].quantity,"remarks":this.activitytempsports[m].category[n].catitems[t].remarks,"photo":this.activitytempsports[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[this.activitytempdummy[0].category.length-1].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Category added', 2500);
				component.categoryPage(nameId);
				component.addCategoryDatabase(nameId, this.activitytempdummy);
			}

			categoryClickHandlerSports(name, cat, item, key, key2){
				let isChecked = 0;
				let countCheck = 0;
				let count=item;
				if(document.getElementById("catSports_Cat"+cat).checked==false){
						for(let y=0; y<this.activitytempsports[key].category[key2].catitems.length;y++){
							document.getElementById("itemSports_Cat"+count).checked = false;
							count++;
						}
				}
				let html =``;
				for(let x=0;x<this.activitytempsports.length;x++){
					for(let y=0;y<this.activitytempsports[x].category.length;y++){
						if(document.getElementById("catSports_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategorySports(${name})'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategorySports()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonSportsCat").innerHTML = html;
			}

			longPressOptionSportsAct_Cat(outdoorActId, name){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerSports_Cat(timer,istrue, outdoorActId, name);},delay);
			}

			actTriggerSports_Cat(time, check, outdoorActId, name){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalSportsTempAct_Cat(outdoorActId, name);
			      }
			}

			optionSideModalSportsTempAct_Cat(outdoorActId, name){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckSports_Cat(${name}, ${outdoorActId}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this activity</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckSports_Cat(\""+""+"\",${outdoorActId}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this activity</h5></a>
								

							</div>
					`;
					option.innerHTML = html;
				
			}

			longPressOptionSportsCat_Cat(count, count2, name){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerSports(timer,istrue, count, count2, name);},delay);
			}

			catTriggerSports(time, check, count, count2, name){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalSportsTempCat_Cat(count, count2, name);
			      }
			}

			optionSideModalSportsTempCat_Cat(count, count2, name){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<!--
							<div class="row center">
								<h5 class="col s12 m12" style="font-weight:bold;font-size:12pt; padding-left:0">Check all items in this category?</h5>
							</div>-->
							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSports_Cat(\""+"${name}"+"\", ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSports_Cat(\""+""+"\",${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='document.getElementById("catSports_Cat"+${count2}).checked = true'><h5 style="color:#000000;">Select category only</h5></a>

							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckSports_Cat(name, Id, choice){
				let idName = "actOut";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){

					let countActCheck = 0;
					let idName2 = "catSports_Cat";
					let idName3 = "itemSports_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = true;
							}
							
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = true
								}
								count2++;
							}
							count++;
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							if(document.getElementById("catSports_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
		
					let countActCheck = 0;
					let idName2 = "catSports_Cat";
					let idName3 = "itemSports_Cat";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<=Id;z++){
						
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							if(z == Id){
								document.getElementById(idName2+count).checked = false;
							}
							
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(z == Id){
									document.getElementById(idName3+count2).checked = false;
								}
								count2++;
							}
							count++;
						}
					}
					
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							if(document.getElementById("catSports_Cat"+countCheck).checked == true){
								isChecked++;
								break;
							}
							countCheck++;
						}
						
					}

				}
				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategorySports(${name})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonSportsCat").innerHTML = html;
			}

			optionResultCheckItemSports_Cat(name, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catSports_Cat";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemSports_Cat";
					let count = 0;
					let count2 = 0;
					
					for(let z=0; z<Id;z++){
						for(let x=0;x<this.activitytempsports[z].category.length;x++){
							for(let k=0; k<this.activitytempsports[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
									
								}

							count++;
							}
						count2++;
							
						}
						
								
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							if(document.getElementById("catSports_Cat"+countCheck).checked == true){
								isChecked++;

								break;
							}
							countCheck++;
						}
						
					}
				}
				else if(choice =="Uncheck"){
					document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemSports_Cat";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					
					
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							if(document.getElementById("catSports_Cat"+countCheck).checked == true){
								isChecked++;

								break;
							}
							countCheck++;
						}
						
					}

				}

				if(isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled" onclick="component.addCategorySports()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addCategorySports(\""+"${name}"+"\")'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonSportsCat").innerHTML = html;
			}

			itemClickHandlerSports_Cat(count, name){
				document.getElementById("catSports_Cat"+count).checked = true;
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempsports.length;x++){
					for(let y=0;y<this.activitytempsports[x].category.length;y++){
						if(document.getElementById("catSports_Cat"+countCheck).checked == true){
							isChecked++;
						}
						countCheck++;
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick='component.addCategorySports(\""+"${name}"+"")'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategorySports()">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonSportsCat").innerHTML = html;
			}
		//End of Category Sports

		//Item Sports
			readSportsTempItem(key, key2){
				let activityList = document.getElementById("itemtempsportslist");
				let count = 0;
				let count2 = 0;
				let count3 = 0;
				let html = `<ul id="activityTempList" style="color:#000000" class="row center">`;
				html +=`
				<div class="container">
					<ul class="collapsible popout" id="activityOutdoorDispListCat" style="color:#000000" data-collapsible="accordion">
				`;
				for(let i=0;i<this.activitytempsports.length;i++){
					html += `	
						<li>
							<div class="collapsible-header waves-effect" id="actOutdoorHeaderCat" >
								${this.activitytempsports[i].name}	
							</div>
							<div id="collapsiblebody" class="collapsible-body">
								<div class="row">
									<div class="col s12 m12">
										<ul class="collapsible" data-collapsible="accordion">
					`;
					
					for(let x=0;x<this.activitytempsports[i].category.length;x++){
						let idName2 = "catSports_Item";
						html += `
											<li>
												<div class="collapsible-header waves-effect" ontouchstart='component.longPressOptionSportsCat_Item(${count}, ${count2}, ${key}, ${key2})' ontouchend="component.catRevert()"  style="color:#000000; display:block; margin-left:8px" >

													${this.activitytempsports[i].category[x].catname} 
													

												</div>
												<div class="collapsible-body" id="collapsibleItem" style="box-shadow: none">
													<ul id="itemOutdoorList">
						`;
						for(let y=0;y<this.activitytempsports[i].category[x].catitems.length;y++){
								let idName3 = "itemSports_Item";
								html += `
									
										<li class="waves-effect parent-flex" 
										style=" padding-bottom: 7px;
												padding-top: 7px;
												border-bottom: 1px solid #e57373;
												padding-left:0px;
												padding-right: 7px;
												margin-left:41px;
												width: 80%;">

										<a href="#modal1" class="modal-trigger long-and-truncated" onclick="component.displayTempSportsItemDetails(${i},${x},${y})" >
										${this.activitytempsports[i].category[x].catitems[y].itemname} </a>
											<span class="badge short-and-fixed" style="margin-top:5px">
												<input type="checkbox" id="${idName3+count3}" onclick='component.itemClickHandlerSports_Item(${count2},${key}, ${key2})' value="${this.activitytempsports[i].category[x].catitems[y].itemname}"/>
												<label for="${idName3+count3}"></label>
											</span> 
										</li>
									

								`;
								count3++;
						}		
						html +=`
													</ul>
												</div>
											</li>
					`;
					count2++;
					}

					html +=`
										</ul>
									</div>
								</div>
							</div>
						</li>
					`;
					count++;
				}
				html += `
						
					</ul>
				</div>
				</ul>
				`;
				html +=`

							<br><br>
							<div id="addButtonSportsItem" class="fixed-action-btn horizontal click-to-toggle">
								<a href="#" class="waves-effect waves-light btn-floating btn-large red disabled tempButton" onclick='component.addCategoryOutdoor(${key}, ${key2})'>
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
							</div>
						`;
				
				
					
				
				activityList.innerHTML = html;
			}

			longPressOptionSportsCat_Item(count, count2, key, key2){
				istrue = true;
				timer = setTimeout(function(){ component.catTriggerSports_Item(timer,istrue, count, count2, key, key2);},delay);
			}

			catTriggerSports_Item(time, check, count, count2, key, key2){
			      if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			          component.optionSideModalSportsTempCat_Item(count, count2, key, key2);
			      }
			}

			optionSideModalSportsTempCat_Item(count, count2, key, key2){

			  	let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `

							<div class="row" style="margin-bottom:0px">
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSports_Item(${key}, ${key2}, ${count}, ${count2}, \""+"Check"+"\")'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckItemSports_Item(\""+""+"\", \""+""+"\", ${count}, ${count2}, \""+"Uncheck"+"\")'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
							</div>
					`;
					option.innerHTML = html;
			}

			optionResultCheckItemSports_Item(key, key2, Id, Id2, choice){
				let idName = "actOut";
				let idName2 = "catSports_Item";
				let isChecked = 0;
				let html = ``;
				if(choice =="Check"){
					//document.getElementById(idName2+Id2).checked = true;
					let countActCheck = 0;
					let idName3 = "itemSports_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let x=0;x<this.activitytempsports[z].category.length;x++){
							for(let k=0; k<this.activitytempsports[z].category[x].catitems.length;k++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = true;
								}
								count++;
							}
							count2++;
							
						}		
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							for(let p=0;p<this.activitytempsports[x].category[y].catitems.length;p++){
								if(document.getElementById("itemSports_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
							
						}
						
					}
					
				}
				else if(choice =="Uncheck"){
					//document.getElementById(idName2+Id2).checked = false;
					let countActCheck = 0;
					let idName3 = "itemSports_Item";
					let count = 0;
					let count2 = 0;
					for(let z=0; z<=Id;z++){
						for(let i=0; i<this.activitytempsports[z].category.length;i++){
							for(let x=0;x<this.activitytempsports[z].category[i].catitems.length;x++){
								if(count2 == Id2){
									document.getElementById(idName3+count).checked = false;
								}
								count++;
							}
							count2++;
						}
					}
					let countCheck = 0;
					for(let x=0;x<this.activitytempsports.length;x++){
						for(let y=0;y<this.activitytempsports[x].category.length;y++){
							for(let p=0;p<this.activitytempsports[x].category[y].catitems.length;p++){
								if(document.getElementById("itemSports_Item"+countCheck).checked == true){
									isChecked++;
									break;
								}
								countCheck++;
							}
						}
						
					}
					
					
					
				}

				if (isChecked == 0){
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addCategoryOutdoor()">
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				else{
							html +=`
							<a href="#" class="waves-effect waves-light btn-floating btn-large" id="createAddbutton" onclick='component.addItemSports(${key}, ${key2})'>
										<i class="fa fa-paper-plane" aria-hidden="true"></i>
							</a>`;
				}
				document.getElementById("addButtonSportsItem").innerHTML = html;
			}

			itemClickHandlerSports_Item(count, key, key2){
				
				let isChecked = 0;
				let countCheck = 0;
				let html =``;
				for(let x=0;x<this.activitytempsports.length;x++){
					for(let y=0;y<this.activitytempsports[x].category.length;y++){
						for(let z=0;z<this.activitytempsports[x].category[y].catitems.length;z++){
							if(document.getElementById("itemSports_Item"+countCheck).checked == true){
								isChecked++;
							}
							countCheck++;
						}
						
					}
				}
				if(isChecked > 0){
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large tempButton" id="createAddbutton" onclick="component.addItemSports(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				else{
					html +=`
								<a href="#" class="waves-effect waves-light btn-floating btn-large disabled tempButton" onclick="component.addItemSports(${key}, ${key2})">
									<i class="fa fa-paper-plane" aria-hidden="true"></i>
								</a>
						`;
				}
				document.getElementById("addButtonSportsItem").innerHTML = html;
			}

			addItemSports(key, key2){

				let dummyval = "";
				let dummyvalCat = "";
				let dummyvalItem = "";
				let count = 0;
				let activityCount = key;
				let categoryCount = key2;
				this.activitytempdummy.push({"name":this.activity[key].name, "category":[{"catname":this.activity[key].category[key2].catname, "catitems":[]}]});
				for(let i=0;i<this.activitytempsports.length;i++){
						let checkCat = 0;
						let itemCount = 0;
						//Category
							for(let m=0;m<this.activitytempsports.length;m++){
								for(let n=0;n<this.activitytempsports[m].category.length;n++){
									let checkItem = 0;
									for(let t=0; t<this.activitytempsports[m].category[n].catitems.length;t++){
											if(document.getElementById("itemSports_Item"+itemCount).checked == true){
												let addItemSport = document.getElementById("itemSports_Item"+itemCount);
												let valItem = addItemSport.value;
												dummyvalItem = valItem;
												checkItem = 0;

											
												let item;
												if(this.activitytempsports[m].category[n].catitems[t].photo == "")
													item = {"itemname":dummyvalItem,"quantity":this.activitytempsports[m].category[n].catitems[t].quantity,"remarks":this.activitytempsports[m].category[n].catitems[t].remarks,"photo":"images/items/def.jpg"};
												else
													item = {"itemname":dummyvalItem,"quantity":this.activitytempsports[m].category[n].catitems[t].quantity,"remarks":this.activitytempsports[m].category[n].catitems[t].remarks,"photo":this.activitytempsports[m].category[n].catitems[t].photo};
												//console.log(dummyvalItem);
												this.activitytempdummy[0].category[0].catitems.push(item);
											}
											itemCount++;
										}
									count++;
								}
								//console.log(dummyvalCat);
							}
						//End of Category
						break;
					}

				
				Materialize.toast('Item added', 2500);
				console.log(this.activitytempdummy);
				component.addItemDatabase(key, key2, this.activitytempdummy);
			}

		//End of Item Sports
	//End of Templates Sports

	//Activity
		getActivityDataRead(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityData'], "readonly");
				let store = transaction.objectStore('activityData');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name, "category":cursor.value.category, "id":cursor.value.id});
						cursor.continue();
					}
					component.activityPushRead(dummyAct);
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}

		activityPushRead(actval){
			
			this.activity = actval;	
		}

		getActivityData(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityData'], "readonly");
				let store = transaction.objectStore('activityData');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name, "category":cursor.value.category, "id":cursor.value.id});
						cursor.continue();
					}
					else{
						component.activityPush(dummyAct);
					}
					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}

		activityPush(actval){
			
			this.activity = actval;
			console.log(this.activity);
			component.readActivity();			
		}

		readActivity(){
			
			let activityList = document.getElementById("activityListContainer");
			let searchbarAct = document.getElementById("searchbarAct");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px;">
				<input oninput="setTimeout(function(){
						component.searchActivity();
				},500);" id="txtSearchActivity" type="text" placeholder="Search" />
			</div>`;
			searchbarAct.innerHTML = searchBar;
			let html = `<ul id="activityList" class="row">`;

			

			for(let i=0;i<this.activity.length;i++){
			
				html += `
					<li>
						<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.categoryPage(${i})'>
							${this.activity[i].name}
							<a href="#bottommodal" onclick='component.editoptionBottomModalAct(${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							<div id="actdivide" class="divider col s12"></div>
						</a>
					</li>

				<br>
				`;
			}
			html += `</ul>`;
			if(this.activity == ""){
				html += `
				<div id="noAct" class="container row center" style="top:0">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.optionSideModalAct()">
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html += `
				
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.optionSideModalAct()">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}
			activityList.innerHTML = html;		
		}

		optionBottomModalAct(){
			let option = document.getElementById("bottommodal");
			let html = ``;
			if(this.activityview[0].name==""){
				html = `<div id="modalOption">
						      <a href="#!" onclick='component.homePage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">View set activity</a>
						      <a href="#!" onclick='component.actConfirmation()'id="viewActbutton" class="modal-action modal-close waves-effect waves btn disabled">Remove set activity</a>
						    </div>
					`;
			}
			else{
				html = `<div id="modalOption">
						      <a href="#!" onclick='component.homePage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">View set activity</a>
						      <a href="#modal2" onclick='component.actConfirmation()' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves btn">Remove set activity</a>
						    </div>
					`;
					
			}
			option.innerHTML = html;
		}

		actConfirmation(){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">An activity has been set. Are you sure to remove the set activity?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.removeActivity()"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		optionSideModalAct(){
			let option = document.getElementById("modal2");
			let html = `<div>
							<a href="#!" class="waves-effect" style="width:100%" onclick="component.addActivityInput()"><h5 style="color:#000000">Create new activity</h5></a><br>
							<div class="divider"></div>
							<a href="#!" class="waves-effect" style="width:100%" onclick='component.activityTempPage(${0}, ${0}, ${1})'><h5 style="color:#000000">Add from templates</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}
		
		addActivityInput(){

			let activityList = document.getElementById("activityListContainer");
			
			let html = `<ul id="activityList" class="row">`;
			if(this.activity.length > 0){
				for(let i=0;i<this.activity.length-1;i++){
					html += `
						<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.categoryPage(${i})'>
								${this.activity[i].name}
								<a href="#bottommodal" onclick='component.editoptionBottomModalAct(${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								<div id="actdivide" class="divider col s12"></div>
							</a>
						</li>
					
					
					
					`;
				}
			
				html += `
				
					<li>
						<a href="#!" id="activityListNames" class="col s6">
							${this.activity[this.activity.length-1].name}
							<a href="#bottommodal" onclick='component.editoptionBottomModalAct(${this.activity.length-1})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							<div id="actdivide" style="margin-bottom:10px" class="divider col s12"></div>
						</a>
					</li>
				
				
				<br>
				`;
			}
			html += `
						<div id="activityListNameInput"><li><input id="addActivityName" type="text" placeholder="Name of the Activity" /></li></div>
						<div id="done" class="col s12 center done"><a class="center waves-effect waves-light btn" style="bottom:0" id="createAddbutton" onclick="component.addActivity()">Done</a></div>
						</ul>
						<br><br>
						<div class="fixed-action-btn horizontal click-to-toggle">
							<a class="btn-floating btn-large" id="createAddbutton" onclick="component.readActivity()">
										<i class="fa fa-check"></i>
							</a>
						</div>`;
						
			activityList.innerHTML = html;
		}

		addActivity(){
			let add = document.getElementById("addActivityName");
			let val = add.value;
			//let act = {"name":val,"category":[]};
			if(val!=""){
				
				let check = 0;
				for(let i=0;i<this.activity.length;i++){
					
					if(val==this.activity[i].name){
						check++;
					}
				}

				if(check==0){
					//this.activity.push(act);
					 	let request = indexedDB.open('mybackpackDB', 1);
						let db = "";
						request.onsuccess = function(e){
							db = e.target.result;

							let transaction = db.transaction(['activityData'], "readwrite");
							let store = transaction.objectStore('activityData');
							
							let activity = {
								name:val,
								category: []
							}
							
							let addRequest = store.add(activity);
							addRequest.onsuccess = function(e){
								component.getActivityData();
								console.log("Yehey");
							}
							addRequest.onerror = function(e){
								console.log("Error in storing data.");
							}
						}
						

						request.onerror = function(e){

							console.log('Error!');
						}	
				}
				else if(check<0){
					this.readActivity();
				}
				else{
					Materialize.toast('This activity already exists', 4000);
				
				}  
			}
			else{
				this.readActivity();
			}
		}

		editoptionBottomModalAct(key){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = ``;
			
			if(this.activityview[0].name==""){
				html = `<div id="modalOption">
						  <a href="#!" onclick='component.getAllData(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Set activity</a>
					      <a href="#!" onclick='component.editActivityInput(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename activity</a>
					      <a href="#!" onclick='component.deleteActivity(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete activity</a>
					    </div>
				`;
			}
			else{
				html = `<div id="modalOption">
						  <a href="#modal2" onclick='component.actConfirmationSet(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">Set activity</a>
					      <a href="#!" onclick='component.editActivityInput(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename activity</a>
					      <a href="#!" onclick='component.deleteActivity(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete activity</a>
					    </div>
				`;
			}
			
				option.innerHTML = html;
		}

		actConfirmationSet(key){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">Another activity has been set. Are you sure to replace the set activity?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick='component.getAllData(${key})'><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		editActivityInput(key){
			let activityList = document.getElementById("activityListContainer");
			let searchbarAct = document.getElementById("searchbarAct");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px;">
				<input oninput="component.searchActivity()" id="txtSearchActivity" type="text" placeholder="Search" onclick="component.readActivity()"/>
			</div>`;
			searchbarAct.innerHTML = searchBar;
			let html = `<ul id="activityList" class="row">`;
			for(let i=0;i<this.activity.length;i++){
				if(this.activity[key].name==this.activity[i].name){
					html +=`


						<div id="activityListNameInput">
							<li><input id="updateActivity" value="${this.activity[i].name}" type="text" placeholder="Name of the Activity" />
							</li>
						</div>
						<div id="done" class="col s12 center done"><a class="center waves-effect waves-light btn" style="bottom:0" id="createAddbutton" onclick='component.updateActivity(${i})'>Done</a></div>
			
					`;
				}
				else{
					html +=`


					<li>
							<a href="#!" id="activityListNames" class="waves-effect col s6" onclick='component.categoryPage(${i})'>
							${this.activity[i].name}
							<a href="#bottommodal" id="optionbuttonAct" onclick='component.editoptionBottomModalAct(${i})' class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							</a>
						</li>
					
					<div id="actdivide" class="divider col s12"></div>
					<br>
					`;
				}
			}
			html += `</ul>
			<br><br>
			<div class="fixed-action-btn horizontal click-to-toggle">
				<a class="btn-floating btn-large" id="createAddbutton" onclick="component.readActivity()">
					<i class="fa fa-check"></i>
				</a>
			</div>
							`;
			activityList.innerHTML = html;
		}

		updateActivity(key){
			let updateActivityInput = document.getElementById("updateActivity");
			let val = updateActivityInput.value;
			let check=0;
			if(val!=""){
				
				for(let i=0;i<this.activity.length;i++){
					
					if(val==this.activity[i].name){
						check=1;
						break;
					}
				}
				if(check==0){

			  		let keyId = this.activity[key].id;
			  		console.log(keyId);
					let request = indexedDB.open('mybackpackDB', 1);
						let db = "";
						request.onsuccess = function(e){
							db = e.target.result;

							let transaction = db.transaction(['activityData'], "readwrite");
							let store = transaction.objectStore('activityData');
							let requestKey = store.get(keyId);
							
						
							requestKey.onsuccess = function(e){
								console.log("Hey");
								let data = requestKey.result;
								console.log(data.name);
								data.name = val;

								let requestUpdate = store.put(data);

								requestUpdate.onsuccess = function(e){
									component.getActivityData();
									console.log("Activity is renamed.");
								}
								requestUpdate.onerror = function(e){
									console.log("Error in renaming activity.");
								}
							}
							requestKey.onerror = function(e){
								console.log("Error in updating data.");
							}
						}
						

						request.onerror = function(e){

							console.log('Error!');
						}
				}
				else{
					Materialize.toast('This activity already exists', 4000);
			
				}  
			}
			else{
				this.readActivity();
			}
		}

		deleteActivity(key){ 
			let keyId = this.activity[key].id;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityData'], "readwrite");
				let store = transaction.objectStore('activityData');

				let deleteRequest = store.delete(keyId);
				deleteRequest.onsuccess = function(e){
					component.getActivityData();
					console.log("Success in activity deletion.");
				}
				deleteRequest.onerror = function(e){
					console.log("Error in deleting data.");
				}
			}
			// let snapId = this.userOwner[0].id;
			// firebase.database().ref().child('/user/'+this.userOwner[0].id+'/activity/'+this.activity[key].actid).remove();	
		}

	//End of Activity

	//Category
		getCategoryData(key){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyCat = [];
			let actId = this.activity[key].id;
			console.log(this.activity);
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['categoryData'], "readonly");
				let store = transaction.objectStore('categoryData');
				let index = store.index('catname');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						if(cursor.value.actid == actId){
							dummyCat.push({"catname":cursor.value.catname, "catitems":cursor.value.catitems, "id":cursor.value.id, "actid":cursor.value.actid});
						}
						cursor.continue();
					}
					else{
						component.catPush(key, dummyCat);
					}
					
					
					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}

		catPush(key, catval){
				this.activity[key].category = catval;
				console.log(this.activity);
				//let keyId = this.activity[key].id;
				component.readCategory(key);			
		}

		readCategory(key){
			let check = 0;

			let searchbarCat = document.getElementById("searchbarCat");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px">
				<input oninput="setTimeout(function(){
						component.searchCategory(${key})
				},500);" id="txtSearchCategory" type="text" placeholder="Search" />
			</div>`;
			searchbarCat.innerHTML = searchBar;
			let categoryList = document.getElementById("categoryListContainer");
			let catMap = document.getElementById("catmap");
			let map = `${this.activity[key].name} <span style="margin-left:5px;">&gt;</span>`;
			let catHead = document.getElementById("cathead");
			let heading = `<h5>${this.activity[key].name}</h5>`;
			let html = `<ul id="categoryList" class="row">`;
			for(let i=0;i<this.activity[key].category.length;i++){
				html += `
				<li>
					<a href="#!" id="categoryListNames" class="waves-effect col s6" onclick='component.itemPage(${key}, ${i})'>
						${this.activity[key].category[i].catname}
						<a href="#bottommodal" onclick='component.editoptionBottomModalCat(${key},${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
						<div id="actdivide" class="divider col s12"></div>
					</a>
				</li>

				
				`;
			}
			html += `</ul>`;
			if(this.activity[key].category==""){
				html += `
				<div id="noAct" class="container row center" style="top:0px">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.optionSideModalCat(${key})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html += `
				
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.optionSideModalCat(${key})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
				


			}
			catHead.innerHTML = heading;
			catMap.innerHTML = map;
			categoryList.innerHTML = html;			
		}

		optionSideModalCat(key){
			let option = document.getElementById("modal2");
			let html = `<div>
							<a href="#!" class="waves-effect" style="width:100%" onclick='component.addCategoryInput(${key})'><h5 style="color:#000000">Create new category</h5></a><br>
							<a href="#!" class="waves-effect" style="width:100%" onclick='component.activityTempPage(${key}, ${0}, ${2})'><h5 style="color:#000000">Add from templates</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		editoptionBottomModalCat(key, key2){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
					      <a href="#!" onclick='component.editCategoryInput(${key},${key2})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Rename category</a>
					      <a href="#!" onclick='component.deleteCategory(${key},${key2})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete category</a>
					    </div>
				`;
				option.innerHTML = html;
		}
		
		addCategoryInput(key){
			let categoryList = document.getElementById("categoryListContainer");
			let searchbarCat = document.getElementById("searchbarCat");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px;">
				<input oninput="component.searchCategory(${key})" id="txtSearchCategory" type="text" placeholder="Search" />
			</div>`;
			searchbarCat.innerHTML = searchBar;
			let html = `<ul id="categoryList" class="row">`;
			if(this.activity[key].category.length > 0){
				for(let i=0;i<this.activity[key].category.length-1;i++){
					html += `
						<li>
							<a href="#!" id="categoryListNames" class="waves-effect col s6">
								${this.activity[key].category[i].catname}
								<a href="#bottommodal" id="optionbuttonAct" onclick='component.editoptionBottomModalCat(${key},${i})' class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
								<div id="actdivide" class="divider col s12"></div>
							</a>
						</li>
					
				
					`;
				}
			
				html += `
				
					<li>
						<a href="#!" id="categoryListNames" class="col s6">
							${this.activity[key].category[this.activity[key].category.length-1].catname}
							<a href="#bottommodal" id="optionbuttonAct" onclick='component.editoptionBottomModalCat(${key},${this.activity[key].category.length-1})' class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							<div id="actdivide" style="margin-bottom:10px" class="divider col s12"></div>
						</a>
					</li>
				
				
			
				`;
			}
			html += `
						<div id="categoryListNameInput"><li><input id="addCategoryName" type="text" placeholder="Name of the Category" /></li></div>
						<div id="done" class="col s12 center" style="position:relative;top:-35px" ><a class="center waves-effect waves-light btn" id="createAddbutton" style="bottom:0px" onclick='component.addCategory(${key})'>Done</a></div>
						</ul>
						<br><br>
						<div class="fixed-action-btn horizontal click-to-toggle">
							<a class="btn-floating btn-large" id="createAddbutton" onclick='component.readCategory(${key})'>
										<i class="fa fa-check"></i>
							</a>
						</div>`;
						
			categoryList.innerHTML = html;
		}

		addCategory(key){
			let add = document.getElementById("addCategoryName");
			let val = add.value;
			let act = {"catname":val,"catitems":[]};
			let check = 0;
			if(val!=""){
			
				for(let i=0;i<this.activity[key].category.length;i++){
					
					if(val==this.activity[key].category[i].catname){
						check++;
					}
				}
				
				if(check==0){
					let actid = this.activity[key].id;
					let request = indexedDB.open('mybackpackDB', 1);
							let db = "";
							request.onsuccess = function(e){
								db = e.target.result;

								let transaction = db.transaction(['categoryData'], "readwrite");
								let store = transaction.objectStore('categoryData');
								
								let category = {
									actid: actid,
									catname:val,
									catitems: []
								}
								
								let addRequest = store.add(category);
								addRequest.onsuccess = function(e){
									component.getCategoryData(key);
									console.log("Yehey");
								}
								addRequest.onerror = function(e){
									console.log("Error in storing data.");
								}
							}
							

							request.onerror = function(e){

								console.log('Error!');
							}
				}
				else if(check<0){
					this.readCategory(key);
				}
				else{
					Materialize.toast('This category already exists', 4000);
				}  
			}
			else{
				this.readCategory(key);
			}
		}

		editCategoryInput(key, key2){
			
			let categoryList = document.getElementById("categoryListContainer");
			let searchbarAct = document.getElementById("searchbarAct");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px;">
				<input oninput="component.searchCategory(${key})" id="txtSearchCategory" type="text" placeholder="Search" onclick="component.readCategory(${key})"/>
			</div>`;
			searchbarAct.innerHTML = searchBar;
			let html = `<ul id="categoryList" class="row">`;
			for(let i=0;i<this.activity[key].category.length;i++){
				if(this.activity[key].category[key2].catname==this.activity[key].category[i].catname){
					html +=`
						<div id="categoryListNameInput">
							<li>
								<input value="${this.activity[key].category[i].catname}" id="updateCategory" type="text" placeholder="Name of the category" />
							</li>
						</div>
						<div id="done" class="col s12 center done"><a class="center waves-effect waves-light btn" style="bottom:0" id="createAddbutton" onclick='component.updateCategory(${key}, ${key2})'>Done</a></div>
					`;
				}
				else{
					html +=`
						<li>
							<a href="#!" id="categoryListNames" class="col s6" onclick='component.itemPage(${key},${i})'>
							${this.activity[key].category[i].catname}
							<a href="#bottommodal" onclick='component.editoptionBottomModalCat(${key}, ${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							</a>
						</li>
					
					<div id="actdivide" class="divider col s12"></div>
					<br>
					`;
				}
			}
			html += `</ul>
			<br><br>
			<div class="fixed-action-btn horizontal click-to-toggle">
				<a class="btn-floating btn-large" id="createAddbutton" onclick='component.readCategory(${key})'>
					<i class="fa fa-check"></i>
				</a>
			</div>
							`;
			categoryList.innerHTML = html;
		}
		
		updateCategory(key, key2){
			
			let updateCategoryInput = document.getElementById("updateCategory");
			let val = updateCategoryInput.value;
			let check=0;
			let index = 0;
			if(val!=""){
				for(let i=0;i<this.activity[key].category.length;i++){
					if(val==this.activity[key].category[i].catname){
						check=1;
						break;
					}
				}
				if(check==0){
					let keyId = this.activity[key].category[key2].id;
					let request = indexedDB.open('mybackpackDB', 1);
						let db = "";
						request.onsuccess = function(e){
							db = e.target.result;

							let transaction = db.transaction(['categoryData'], "readwrite");
							let store = transaction.objectStore('categoryData');
							let requestKey = store.get(keyId);
							
						
							requestKey.onsuccess = function(e){
								let data = requestKey.result;
								data.catname = val;

								let requestUpdate = store.put(data);

								requestUpdate.onsuccess = function(e){
									component.getCategoryData(key);
									console.log("Category is renamed.");
								}
								requestUpdate.onerror = function(e){
									console.log("Error in renaming activity.");
								}
							}
							requestKey.onerror = function(e){
								console.log("Error in updating data.");
							}
						}
						

						request.onerror = function(e){

							console.log('Error!');
						}
	
					// let act = {"catname":val, "catitems":this.activity[key].category[check].catitems}
					// this.activity[key].category[key2] = act;
					// this.readCategory(key);
				}
				else if(check==-1){
					this.readCategory(key);
				}
				else{
					Materialize.toast('This category already exists', 4000);
				}  
			}
		}

		deleteCategory(key, key2){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let keyId = this.activity[key].category[key2].id;
			
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['categoryData'], "readwrite");
				let store = transaction.objectStore('categoryData');
				
				let deleteRequest = store.delete(keyId);
				deleteRequest.onsuccess = function(e){
					component.getCategoryData(key);
					console.log("Success in category deletion.");
				}
				deleteRequest.onerror = function(e){
					console.log("Error in deleting data.");
				}
			}
		}

	//End of Category
		
	//Items
		getItemData(key, key2){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyItem = [];
			let actId = this.activity[key].id;
			let catId = this.activity[key].category[key2].id;
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['itemData'], "readonly");
				let store = transaction.objectStore('itemData');
				let index = store.index('itemname');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						if(cursor.value.actid == actId && cursor.value.catid == catId){
							dummyItem.push({"itemname":cursor.value.itemname, "quantity":cursor.value.quantity, "photo":cursor.value.photo, "remarks":cursor.value.remarks, "id":cursor.value.id, "actid":cursor.value.actid, "catid":cursor.value.catid});
							
						}
						cursor.continue();
					}
					else{
						component.itemDataPush(key, key2, dummyItem);
					}
					

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}

		itemDataPush(key, key2, itemval){
				//let act = this.activity;
				this.activity[key].category[key2].catitems = itemval;
				console.log(this.activity);
				console.log(itemval);
				component.readItem(key, key2);
				// let keyId = this.activity[key].category[key2].id;
				// let request = indexedDB.open('mybackpackDB', 1);
				// 	let db = "";
				// 	request.onsuccess = function(e){
				// 		db = e.target.result;

				// 		let transaction = db.transaction(['categoryData'], "readwrite");
				// 		let store = transaction.objectStore('categoryData');
					
						
				// 		let requestKey = store.get(keyId);
				// 		requestKey.onsuccess = function(e){
				// 			let data = requestKey.result;
				// 			console.log(keyId);
				// 			data.catitems = itemval;

				// 			let requestUpdate = store.put(data);

				// 			requestUpdate.onsuccess = function(e){
				// 				component.readItem(key, key2);
				// 				component.getCategoryDataRefresh(key);
				// 				console.log("Item is pushed.");
				// 				console.log(act);
				// 			}
				// 			requestUpdate.onerror = function(e){
				// 				console.log("Error in renaming activity.");
				// 			}
				// 		}
				// 	}
					

				// 	request.onerror = function(e){

				// 		console.log('Error!');
				// 	}
		}

		readItem(key, key2){
			
			let check = 0;

			
			let searchbarItem = document.getElementById("searchbarItem");
			let searchBar =`
			<div class="row center" style="position:relative;top:20px">
				<input oninput="component.searchItem(${key}, ${key2})" id="txtSearchItem" type="text" placeholder="Search" />
			</div>`;
			searchbarItem.innerHTML = searchBar;
			let itemList = document.getElementById("itemListContainer");
			let itemMap = document.getElementById("itemmap");
			let map = `${this.activity[key].name} <span style="margin-left:5px;">&gt;</span> ${this.activity[key].category[key2].catname} <span style="margin-left:5px;">&gt;</span>`;
			let itemHead = document.getElementById("itemhead");
			let heading = `<h5>${this.activity[key].category[key2].catname}</h5>`;
			let html = `<ul id="itemList" class="row">`;
			for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
				html += `
				<li>
					<a class="waves-effect col s6 modal-trigger" href="#modal1" id="itemListNames" onclick='component.readItemDetails(${key},${key2}, ${i})'>
						${this.activity[key].category[key2].catitems[i].itemname}
						<a href="#bottommodal" onclick='component.editoptionBottomModalItem(${key}, ${key2}, ${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
						<div id="actdivide" class="divider col s12"></div>
					</a>
				</li>

				
	
				`;
			}
			html += `</ul>`;
			if(this.activity[key].category[key2].catitems==""){
				html += `

				<div id="noAct" class="container row center" style="top:0px">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.optionSideModalItem(${key}, ${key2})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html +=`

				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.optionSideModalItem(${key},${key2})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}

			let menubarItem = document.getElementById("menubarItem");
			let html2 = `
				<div>
                    <a href="#" id="backbutton" onclick="component.categoryPage(${key})"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
                    <h5 class="headText row center">Items</h5>
                    <a href="#bottommodal" onclick="component.optionBottomModalAct()" id="optionbutton" class="modal-trigger"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                </div>
			`;


			itemMap.innerHTML = map;
			itemHead.innerHTML = heading
			itemList.innerHTML = html;
			menubarItem.innerHTML = html2;
		}

		optionSideModalItem(key, key2){
			let option = document.getElementById("modal2");
			let html = `<div>
							<a href="#modal1" class="waves-effect modal-trigger" style="width:100%" onclick='component.addItemInput(${key},${key2})'><h5 style="color:#000000">Create new item</h5></a><br>
							<a href="#!" class="waves-effect" style="width:100%" onclick='component.activityTempPage(${key}, ${key2}, ${3})'><h5 style="color:#000000">Add from templates</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		editoptionBottomModalItem(key, key2, key3){
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
					      <a href="#modal1" onclick='component.editItemInput(${key}, ${key2}, ${key3})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">Edit item</a>
					      <a href="#!" onclick='component.deleteItem(${key}, ${key2}, ${key3})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete item</a>
					    </div>
				`;
				option.innerHTML = html;
		}

		addItemInput(key, key2){
			if(addItemCheckVar){
				this.dummyItemPhoto[0] = {"name":"","quantity":"","remarks":"","photo":"images/items/def.jpg"};
				addItemCheckVar = false;
			} 
			let itemDetailsList = document.getElementById("modal1");
			let check = 0;


			let html = `<div class="modal-content" id="itemdetails">
			<center><img style="height: 200px; width:200px;" class="responsive-img center" src="${this.dummyItemPhoto[0].photo}"></center>
					<center><a class="waves-effect waves-light btn modal-trigger" href="#modal4" id="createAddbutton" style="bottom:0px;" onclick='component.iconSelect(${key},${key2})' >Select photo</a></center>
					<h4><input id="addDesc" type="text" placeholder="Name of the Item" oninput="component.itemInputHandler()" value="${this.dummyItemPhoto[0].name}" /></h4>
					<p>Quantity: <input id="addQuantity" type="text" onkeypress="return component.isNumberKey(event)" oninput="component.itemInputHandler()" placeholder="Quantity of the Item" value="${this.dummyItemPhoto[0].quantity}" /></p>
					<p>Note: <input id="addNote" type="text" placeholder="Add a Note" oninput="component.itemInputHandler()" value="${this.dummyItemPhoto[0].remarks}" /></p>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.addItem(${key},${key2})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick='component.itemMenuCancel(${key}, ${key2})'>Cancel</a>
				</div>`;
			itemDetailsList.innerHTML = html;
		}

		itemMenuCancel(key, key2){
			addItemCheckVar = true;
			component.readItem(key, key2);
		}

		itemInputHandler(){
			let itemName = document.getElementById("addDesc");
			let itemQuantity = document.getElementById("addQuantity");
			let itemNote = document.getElementById("addNote");
			this.dummyItemPhoto[0] = {"name":itemName.value, "quantity":itemQuantity.value, "remarks":itemNote.value, "photo":this.dummyItemPhoto[0].photo};
		}

		itemInputHandlerEdit(key,key2, key3){
			let itemName = document.getElementById("updateDesc");
			let itemQuantity = document.getElementById("updateQuantity");
			let itemNote = document.getElementById("updateNote");
			this.dummyItemPhoto[0] = {"name":itemName.value, "quantity":itemQuantity.value, "remarks":itemNote.value, "photo":this.dummyItemPhoto[0].photo};
			component.iconSelect_Edit(key,key2,key3);
		}

		addItem(key, key2){
			let addDesc = document.getElementById("addDesc");
			let addQuantity = document.getElementById("addQuantity");
			let addNote = document.getElementById("addNote");
			let valname = addDesc.value;
			let valQuan = addQuantity.value;
			let valNote = addNote.value;
			//let act = {"itemname":valname,"quantity":valQuan,"remarks":valNote,"photo":this.dummyItemPhoto[0].photo};
			let valPhoto = this.dummyItemPhoto[0].photo;
			let check = 0;
			if(valname!=""){
			
				for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
					
					if(valname==this.activity[key].category[key2].catitems[i].itemname){
						check++;
					}
				}

				if(check==0){
					let actid = this.activity[key].id;
					let catid = this.activity[key].category[key2].id;
					let request = indexedDB.open('mybackpackDB', 1);
							let db = "";
							request.onsuccess = function(e){
								db = e.target.result;

								let transaction = db.transaction(['itemData'], "readwrite");
								let store = transaction.objectStore('itemData');
								
								let item = {
									actid: actid,
									catid: catid,
									itemname: valname,
									quantity: valQuan,
									photo: valPhoto,
									remarks: valNote
								}
								
								let addRequest = store.add(item);
								addRequest.onsuccess = function(e){
									component.getItemData(key, key2);
									console.log("Yehey");
								}
								addRequest.onerror = function(e){
									console.log("Error in storing data.");
								}
							}
							

							request.onerror = function(e){

								console.log('Error!');
							}
					//this.activity[key].category[key2].catitems.push(act);
					$('#modal1').modal('close');
					//this.readItem(key, key2);
				}
				else if(check<0){
					$('#modal1').modal('close');
					this.readItem(key, key2);
				}
				else{
					Materialize.toast('This item already exists', 4000);
				}
			}
			else{
				this.readItem(key, key2)
			}
			this.dummyItemPhoto[0] = {"name":"","quantity":"","remarks":"","photo":"images/items/def.jpg"};  
			addItemCheckVar = true;
		}

		editItemInput(key, key2, key3){
			
			let varInput = "";
			let itemList = document.getElementById("modal1");
			let html = `<div class="modal-content" id="itemdetails">`;
			for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
				if(this.activity[key].category[key2].catitems[key3].itemname==this.activity[key].category[key2].catitems[i].itemname){
					if(iconChooseReset){
					 	this.dummyItemPhoto[0].photo = this.activity[key].category[key2].catitems[key3].photo;
					 	iconChooseReset = false;
					}
					
				html += `
						<center><img style="height: 200px; width:200px;" id="iconPhoto" class="responsive-img center" src="${this.dummyItemPhoto[0].photo}"></center>
						<center><a class="waves-effect waves-light btn modal-trigger" style="bottom:0px;" href="#modal4" id="createAddbutton" onclick='component.itemInputHandlerEdit(${key},${key2}, ${key3})'>Select photo</a></center>
						<h4><input id="updateDesc" value="${this.activity[key].category[key2].catitems[key3].itemname}" oninput="component.itemInputHandlerEdit()" type="text" placeholder="Name of the Item" /></h4>
						<p>Quantity: <input id="updateQuantity" onkeypress="return component.isNumberKey(event)" onkeypress="return component.isNumberKey(event)" oninput="component.itemInputHandlerEdit()" value="${this.activity[key].category[key2].catitems[key3].quantity}" type="text" placeholder="Quantity of the Item" /></p>
						<p>Note: <input id="updateNote" oninput="component.itemInputHandlerEdit()" value="${this.activity[key].category[key2].catitems[key3].remarks}" type="text" placeholder="Add a Note" /></p>
				
					`;
					
				}
			}

			html += `
			</div>
			<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.updateItem(${key},${key2}, ${key3})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick='component.itemMenuCancel(\""+"${this.activity[key].category[key2].catname}"+"\",${key})'>Cancel</a>
				</div>`;
			itemList.innerHTML = html; 
		}

		updateItem(key, key2, key3){
			
			let updateDesc = document.getElementById("updateDesc");
			let updateQuantity = document.getElementById("updateQuantity");
			let updateNote = document.getElementById("updateNote");
			let valname = updateDesc.value;
			let valQuan = updateQuantity.value;
			let valNote = updateNote.value;
			let valPhoto = this.dummyItemPhoto[0].photo;

			let dummykey;
			let check=0;
			
			if(valname!=""){

					
				for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){		
					if(valname==this.activity[key].category[key2].catitems[i].itemname){

						check = 1;
						if(key3 == i){
							check = 0;
						}
						break;
					}
				}
				if(check==0){
					let keyId = this.activity[key].category[key2].catitems[key3].id;
					let request = indexedDB.open('mybackpackDB', 1);
						let db = "";
						request.onsuccess = function(e){
							db = e.target.result;

							let transaction = db.transaction(['itemData'], "readwrite");
							let store = transaction.objectStore('itemData');
							let requestKey = store.get(keyId);
							
						
							requestKey.onsuccess = function(e){
								let data = requestKey.result;
								data.itemname = valname;
								data.quantity = valQuan;
								data.photo = valPhoto;
								data.remarks = valNote;
								
								dummykey = data.id;
								let requestUpdate = store.put(data);

								requestUpdate.onsuccess = function(e){
									component.getItemData(key, key2, key3);
									component.readItemDetailsEdited(key, key2, dummykey, valname, valQuan, valPhoto, valNote);
									console.log("Item is renamed.");
								}
								requestUpdate.onerror = function(e){
									console.log("Error in renaming activity.");
								}
							}
							requestKey.onerror = function(e){
								console.log("Error in updating data.");
							}
						}
						

						request.onerror = function(e){

							console.log('Error!');
						}
					
				}
				else if(check==-1){
					 component.readItemDetails(key, key2, key3);
					 //$('#modal1').modal('close');
				}
				else{
					Materialize.toast('This item already exists', 4000);
				}  
			}
			else{
				component.readItemDetails(key, key2, key3);
			}
		}

		deleteItemSelect(name, key, key2){
			let itemList = document.getElementById("itemListContainer");
			let html = `<ul>`;
			for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
				html += `
				<li>${this.activity[key].category[i].catitems[i].itemname}</li><a class='waves-effect waves-light btn red' onclick='component.deleteItem(\""+"${this.activity[key].category[key2].catitems[i].itemname}"+"\",${key},${key2})'>X</a>
				`;
			}
			html += `</ul>
			<br><br>
							<a href="#modal1" class="modal-trigger" onclick='component.addItemInput(\""+"${name}"+"\",${key},${key2})'>Add</a><br>
							<a href="#!" onclick='component.editItemSelect(\""+"${name}"+"\",${key},${key2})'>Edit</a><br>
							<a href="#!" onclick='component.readItem(\""+"${name}"+"\",${key})'>Cancel</a>`;
			itemList.innerHTML = html;
		}

		deleteItem(key, key2, key3){ 

			let keyId = this.activity[key].category[key2].catitems[key3].id;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['itemData'], "readwrite");
				let store = transaction.objectStore('itemData');

				let deleteRequest = store.delete(keyId);
				deleteRequest.onsuccess = function(e){
					component.getItemData(key, key2);
					console.log("Success in category deletion.");
				}
				deleteRequest.onerror = function(e){
					console.log("Error in deleting data.");
				}
			}

			$('#modal1').modal('close');
		}

	//End of Items
		
	//Item Details
		readItemDetails(key, key2, key3){
			
			console.log(this.activity[key].category[key2].catitems);
			let itemDetails = document.getElementById("modal1");
			let html = `<div class="modal-content row" id="itemdetails">
					<center><img style="height: 150px; width:150px;" class="responsive-img center" src="${this.activity[key].category[key2].catitems[key3].photo}">
					<h4>${this.activity[key].category[key2].catitems[key3].itemname}</h4>
					</center>
					<p><b>Quantity:</b> <span style="float:right">${this.activity[key].category[key2].catitems[key3].quantity}</span></p>
					<div class="divider"></div>
					<p><b>Note:</b> <span style="float:right">${this.activity[key].category[key2].catitems[key3].remarks}</span></p>
					<div class="divider"></div>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.editItemInput(${key},${key2}, ${key3})'>Edit</a>
					<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.deleteItem(${key},${key2}, ${key3})'>Delete</a>
				</div>
				`;
				itemDetails.innerHTML = html;
		}

		readItemDetailsEdited(key, key2, id, name, quan, photo, note){
			let itemDetails = document.getElementById("modal1");
			let html = `<div class="modal-content row" id="itemdetails">
					<center><img style="height: 200px; width:200px;" class="responsive-img center" src="${photo}">
					<h4>${name}</h4>
					</center>
					<p><b>Quantity:</b> <span style="float:right">${quan}</span></p>
					<div class="divider"></div>
					<p><b>Note:</b> <span style="float:right">${note}</span></p>
					<div class="divider"></div>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.editItemInputEdited(${key},${key2}, ${id})'>Edit</a>
					<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.deleteItemEdited(${key},${key2}, ${id})'>Delete</a>
				</div>
				`;
				itemDetails.innerHTML = html;
		}

		editItemInputEdited(key, key2, id){
			let key3;
			for(let x=0; x<this.activity[key].category[key2].catitems.length;x++){
				if(this.activity[key].category[key2].catitems[x].id == id){
					key3 = x;
					break;
				}
			}
			console.log(this.activity[key].category[key2].catitems);
			component.editItemInput(key, key2, key3);
		}

		deleteItemEdited(key, key2, id){
			let key3;
			for(let x=0; x<this.activity[key].category[key2].catitems.length;x++){
				if(this.activity[key].category[key2].catitems[x].id == id){
					key3 = x;
					break;
				}
			}
			console.log(this.activity[key].category[key2].catitems);
			component.deleteItem(key, key2, key3);
		}

		iconSelect(key, key2){
			let icons = document.getElementById("modal4");
			//console.log(name);
			let html = `
			
				<div class="modal-content row center" style="padding-left:0px;padding-right:0px;margin-left:0px">
					<div id="searchBarIcon" class="row center" style="height:85px; margin-left:0px;margin-right:0px">
						<div class="container row center">
							<input oninput="component.searchIcon()" id="txtSearchIcon" type="text" placeholder="Search" />
						</div>
					</div>
					<div id="iconList">
				`;
				for(let x=0;x<this.photoicons.length;x++){
					html += `
						<a href="#!" id="iconLink" onclick='component.selectedIcon(\""+"${this.photoicons[x].name}"+"\")'>
							<img class="z-depth-3" id='${"picIcon"+x}' src="${this.photoicons[x].photo}" alt="${this.photoicons[x].name}" style="height:80px;width:80px">
							<p id="iconName">${this.photoicons[x].name}</p>
						</a>
						
					`;
				}
				html +=`
					</div>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close" onclick='component.selectIcon(${key},${key2})'>Select</a>
					<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Cancel</a>
				</div>
				`;
				icons.innerHTML = html;
		}

		selectedIcon(name){
			for(let x=0;x<this.photoicons.length;x++){
				for(let i=0;i<this.photoicons.length;i++){
					if(this.dummyTable[0].name == this.photoicons[i].name){
						
						$("#picIcon"+i).css("animation-name", "iconDeselect");
						$("#picIcon"+i).css("animation-duration", "0.5s");
						$("#picIcon"+i).css("animation-fill-mode", "both");
						
						this.dummyTable[0].name = {"name":""};
						break;
					}
				}
				if(name == this.photoicons[x].name){

					$("#picIcon"+x).css("animation-name", "iconSelect");
					$("#picIcon"+x).css("animation-duration", "0.5s");
					$("#picIcon"+x).css("animation-fill-mode", "both");

					this.dummyTable[0] = {"name":name};
					
					break;
				}
			}
		}

		selectIcon(key, key2){
			let icon = this.dummyTable[0].name;
			this.dummyTable[0].name = "";
			for(let i=0;i<this.photoicons.length;i++){
				if(icon == this.photoicons[i].name){
					this.dummyItemPhoto[0].photo = this.photoicons[i].photo;
					component.addItemInput(key,key2);
					break;
				}
			}
		}

		iconSelect_Edit(key, key2, key3){
			let icons = document.getElementById("modal4");

			let html = `
			
				<div class="modal-content row center" style="padding-left:0px;padding-right:0px;margin-left:0px">
					<div id="searchBarIcon" class="row center" style="height:85px; margin-left:0px;margin-right:0px">
						<div class="container row center">
							<input oninput="component.searchIcon()" id="txtSearchIcon" type="text" placeholder="Search" />
						</div>
					</div>
					<div id="iconList">
				`;
				for(let x=0;x<this.photoicons.length;x++){
					html += `
						<a href="#!" id="iconLink" onclick='component.selectedIcon_Edit(\""+"${this.photoicons[x].name}"+"\")'>
							<img class="z-depth-3" id='${"picIcon_Edit"+x}' src="${this.photoicons[x].photo}" alt="${this.photoicons[x].name}" style="height:80px;width:80px">
							<p id="iconName">${this.photoicons[x].name}</p>
						</a>
						
					`;
				}
				html +=`
					</div>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close" onclick='component.selectIcon_Edit(${key},${key2}, ${key3})'>Select</a>
					<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Cancel</a>
				</div>
				`;
				icons.innerHTML = html;
		}

		selectedIcon_Edit(nameId){
			for(let x=0;x<this.photoicons.length;x++){
				for(let i=0;i<this.photoicons.length;i++){
					if(this.dummyTable[0].name == this.photoicons[i].name){
						
						$("#picIcon_Edit"+i).css("animation-name", "iconDeselect");
						$("#picIcon_Edit"+i).css("animation-duration", "0.5s");
						$("#picIcon_Edit"+i).css("animation-fill-mode", "both");
						
						this.dummyTable[0].name = {"name":""};
						break;
					}
				}
				if(nameId == this.photoicons[x].name){

					$("#picIcon_Edit"+x).css("animation-name", "iconSelect");
					$("#picIcon_Edit"+x).css("animation-duration", "0.5s");
					$("#picIcon_Edit"+x).css("animation-fill-mode", "both");

					this.dummyTable[0] = {"name":nameId};
					
					break;
				}
			}
		}

		selectIcon_Edit(key, key2, key3){
			let icon = this.dummyTable[0].name;
			console.log(icon);
			this.dummyTable[0].name = "";
			for(let i=0;i<this.photoicons.length;i++){
				if(icon == this.photoicons[i].name){
					this.dummyItemPhoto[0].photo = this.photoicons[i].photo;
					component.editItemInput(key,key2, key3);
					break;
				}
			}
		}

		isNumberKey(evt){
	         var charCode = (evt.which) ? evt.which : event.keyCode
	         if (charCode > 31 && (charCode < 48 || charCode > 57))
	            return false;

	         return true;
	    }

	//End of Item Details

//Checklist Online
	//Checklist Page
		checklistOption(){
			let id = document.getElementById("displaycontOnline");
			let	html = `
						<a href="#" onclick='component.groupPage()'>
							<div id="onlineCheck" class="row center">
								<div>
									<span>
										<h3 class="container row center">Collaboration</h3>
									</span>
								</div>
							</div>
						</a>
						<a href="#" onclick='component.homePage()'>
							<div id="personalCheck" class="row center">
								<div>
									<span>
										<h3 class="container row center">Personal</h3>
									</span>
								</div>
							</div>
						</a>
				`;
			
			id.innerHTML = html;			
		}

		optionBottomModalOL(){	
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
					      <a href="#!" onclick='component.homePage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to personal checklist</a>
					    </div>
				`;	
				option.innerHTML = html;
		}

		readMyGroup(){

			let groupList = document.getElementById("groupListContainer");
			let html = `<ul id="groupList" class="row">`;

			for(let i=0;i<this.group.length;i++){
			
				html += `
					<li>
						<a href="#!" id="groupListNames" class="waves-effect col s6" onclick='component.activityPageOL(${i})'>
							${this.group[i].name}
							<a href="#bottommodal" onclick='component.editoptionBottomModalGroup(${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							<div id="actdivide" class="divider col s12"></div>
						</a>
					</li>

				<br>
				`;
			}
			html += `</ul>`;
			if(this.group == ""){
				html += `
	
				<div id="noAct" class="container row center" style="top:0">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.optionSideModalGroup()">
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html += `
				
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal2" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.optionSideModalGroup()">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}
			groupList.innerHTML = html;		
		}

		optionSideModalGroup(){
			let option = document.getElementById("modal2");
			let html = `<div>
							<a href="#modal1" class="waves-effect modal-trigger" style="width:100%" onclick="component.addGroupInput()"><h5 style="color:#000000">Create a group</h5></a><br>
							<div class="divider"></div>
							<a href="#modal1" class="waves-effect modal-trigger" style="width:100%" onclick='component.joinGroupInput()'><h5 style="color:#000000">Join a group</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		viewGroupDetails(key){
			
			let groupList = document.getElementById("modal1");
			let check = 0;

			
			let html = `<div class="modal-content row" id="groupdetails">
			<form class="row">
					<div class="col s12">
						<label class="active" for="groupId">Group ID</label><br>
						${this.group[key].id}<br>
					</div>
					<div class="divider col s12"></div>
					  <div class="col s12">
						<label class="active" for="groupName">Name</label><br>
						${this.group[key].name}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupDesc">Description</label><br>
						${this.group[key].desc}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupCode">Passcode</label><br>
						${this.group[key].code}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupDate">Due Date</label><br>
						${this.group[key].date}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupTime">Due Time</label><br>
						${this.group[key].time}<br>
					</div>
					
			</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#modal1" class="waves-effect waves-green btn-flat modal-trigger" onclick='component.editGroupInput(${key})'>Edit</a>
					<a href="#modal2" class="waves-effect waves-green btn-flat modal-close modal-trigger" onclick='component.deleteGroupConfirmation(${key})'>Delete</a>
				</div>`;
			groupList.innerHTML = html;
		}

		viewGroupDetailsMember(key){
			
			let groupList = document.getElementById("modal1");
			let check = 0;

			
			let html = `<div class="modal-content row" id="groupdetails">
			<form class="row">
					<div class="col s12">
						<label class="active" for="groupId">Group ID</label><br>
						${this.group[key].id}<br>
					</div>
					<div class="divider col s12"></div>
					  <div class="col s12">
						<label class="active" for="groupName">Name</label><br>
						${this.group[key].name}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupDesc">Description</label><br>
						${this.group[key].desc}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupDate">Due Date</label><br>
						${this.group[key].date}<br>
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label class="active" for="groupTime">Due Time</label><br>
						${this.group[key].time}<br>
					</div>
					
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick=''>Cancel</a>
					
				</div>`;
			groupList.innerHTML = html;
		}

		joinGroupInput(){
			
			let groupList = document.getElementById("modal1");
			let check = 0;

			
			let html = `<div class="modal-content" id="groupdetails">
			<form class="row">
					<div class="input-field col s12">
						<input id="joingroupId"  type="text"  class="validate"  >
						<label for="joingroupId">Group ID</label>
					</div>
					<div class="input-field col s12">
						<input id="joingroupCode"  type="text"  class="validate" >
						<label for="joingroupCode">Passcode</label>
					</div>
					
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.joinGroup()'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			groupList.innerHTML = html;
		}

		joinGroup(){
			let gid = document.getElementById("joingroupId");
			let gcode = document.getElementById("joingroupCode");
			let valid = gid.value;
			let valcode = gcode.value;
			//let groupData = {"id":valid,"name":valname,"desc":valdesc, "code":valcode, "admin":this.userOwner, "users":[], "category":[]};
			if(valid!=""){
				let groupBased = firebase.database().ref('/group/').once('value', 
			      (userSnapId)=>{

			        userSnapId.forEach(function(snapshot) {
			        	if(valid == snapshot.val().id && valcode == snapshot.val().code){
			        		component.checkGroup(snapshot.key, valid);
			        		
			        	}
			        }); 
			        
			        
			       
	  			});
	  			
			}
		}

		checkGroup(key, valid){
			let userOwnerData = this.userOwner[0];
			let groupdummy = this.group;
			let check = 0;
			for(let i = 0; i < groupdummy.length; i++){
    			if(valid == groupdummy[i].id){
    				Materialize.toast('You already joined this group', 4000);
    				check++;
    				break;
    			}
    		}
    		if(check == 0){

				let data = {
					id: userOwnerData.id,
					fname: userOwnerData.fname,
					lname: userOwnerData.lname,
					user: userOwnerData.user
				}
				let updates = {};
				updates['/group/'+key+'/users/'+userOwnerData.id] = data;
				firebase.database().ref().update(updates);

				Materialize.toast('You have successfully joined a group', 4000);
			
        			
    		}
		}

		addGroupInput(){
			let groupList = document.getElementById("modal1");
			let check = 0;

			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Damn', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});
			let today = new Date();
			let h = today.getHours();
			let m = today.getMinutes();
			
			let mon = today.getMonth();
			mon = component.checkMonthFull(mon);
			let day = today.getDate();
			let year = today.getFullYear();
			let dateVal = day+" "+mon+", "+year;
			m = component.checkTimeZero(m);
			let ampm = component.checkAMPM(h);
			h = component.checkTimeHour(h);
			h = component.checkTimeZero(h);
			let timeVal = h+":"+m+ampm;
		
			let html = `<div class="modal-content" id="groupdetails">
			<form class="row">
					<div class="input-field col s12">
						<input id="groupId"  type="text"  class="validate"  >
						<label for="groupId">Group ID</label>
					</div>
					  <div class="input-field col s12">
						<input id="groupName"  type="text"  class="validate"  >
						<label for="groupName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="groupDesc"  type="text"  class="validate" >
						<label for="groupDesc">Description</label>
					</div>
					<div class="input-field col s12">
						<input id="groupCode"  type="text"  class="validate" >
						<label for="groupCode">Passcode</label>
					</div>
					<div class="input-field col s12">
						<input id="groupDate" class="datepicker" value="${dateVal}">
						<label for="groupDate" class="active">Due Date</label>
					</div>
					<div class="input-field col s12">
						<input id="groupTime"  class="timepicker" value="${timeVal}">
						<label for="groupTime" class="active">Due Time</label>
					</div>
					
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.addGroup()'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			groupList.innerHTML = html;
		}

		checkMonthFull(value){

			if(value==0){
				return "January";
			}
			else if(value==1){
				return "February";
			}
			else if(value==2){
				return "March";
			}
			else if(value==3){
				return "April";
			}
			else if(value==4){
				return "May";
			}
			else if(value==5){
				return "June";
			}
			else if(value==6){
				return "July";
			}
			else if(value==7){
				return "August";
			}
			else if(value==8){
				return "September";
			}
			else if(value==9){
				return "October";
			}
			else if(value==10){
				return "November";
			}
			else if(value==11){
				return "December";
			}
		}

		editGroupInput(key){
			
			let groupList = document.getElementById("modal1");
			let check = 0;

			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Damn', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});
	
			
			let html = `<div class="modal-content" id="groupdetails">
			<form class="row">
					  <div class="input-field col s12">
						<input id="updategroupName" value='${this.group[key].name}'  type="text"  class="validate"  >
						<label class="active" for="updategroupName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="updategroupDesc" value='${this.group[key].desc}'  type="text"  class="validate" >
						<label class="active" for="updategroupDesc">Description</label>
					</div>
					<div class="input-field col s12">
						<input id="updategroupCode" value='${this.group[key].code}'  type="text"  class="validate" >
						<label class="active" for="updategroupCode">Passcode</label>
					</div>
					<div class="input-field col s12">
						<input id="updategroupDate" class="datepicker" value="${this.group[key].date}">
						<label for="updategroupDate" class="active">Due Date</label>
					</div>
					<div class="input-field col s12">
						<input id="updategroupTime"  class="timepicker" value="${this.group[key].time}">
						<label for="updategroupTime" class="active">Due Time</label>
					</div>
					
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.updateGroup(${key})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			groupList.innerHTML = html;
		}

		editGroupInputMember(key){
			
			let groupList = document.getElementById("modal1");
			let check = 0;

			
			let html = `<div class="modal-content" id="groupdetails">
			<form class="row">
					  <div class="input-field col s12">
						<input id="updategroupName" value='${this.group[key].name}'  type="text"  class="validate"  >
						<label class="active" for="updategroupName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="updategroupDesc" value='${this.group[key].desc}'  type="text"  class="validate" >
						<label class="active" for="updategroupDesc">Description</label>
					</div>
					
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.updateGroupMember(${key})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			groupList.innerHTML = html;
		}

		editoptionBottomModalGroup(key){
			let option = document.getElementById("bottommodal");
			let html = ``;
			if(this.userOwner[0].user == this.group[key].admin.user){
				html = `<div id="modalOption">
						  <a href="#modal1" onclick='component.viewGroupDetails(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">View group details</a>
					      <a href="#modal1" onclick='component.editGroupInput(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">Edit group</a>
					      <a href="#modal2" onclick='component.deleteGroupConfirmation(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves modal-trigger">Delete group</a>
					    </div>
				`;
			}
			else{
				html = `<div id="modalOption">
						  <a href="#modal1" onclick='component.viewGroupDetailsMember(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">View group details</a>
					      <a href="#modal1" onclick='component.editGroupInputMember(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">Edit group</a>
					      <a href="#modal2" onclick='component.leaveGroupConfirmation(${key}, \""+"${this.userOwner[0].id}"+"\")'id="viewActbutton" class="modal-action modal-close waves-effect waves modal-trigger">Leave group</a>
					    </div>
				`;
			}
				option.innerHTML = html;
		}

		addGroup(){
			let gid = document.getElementById("groupId");
			let gname = document.getElementById("groupName");
			let gdesc = document.getElementById("groupDesc");
			let gcode = document.getElementById("groupCode");
			let gdate = document.getElementById("groupDate");
			let gtime = document.getElementById("groupTime");
			let valid = gid.value;
			let valname = gname.value;
			let valdesc = gdesc.value;
			let valcode = gcode.value;
			let valdate = gdate.value;
			let valtime = gtime.value;
			let check = 0;
			let groupBase = firebase.database().ref('/group/').on('value', 
		      (userSnapId)=>{
		        userSnapId.forEach(function(snapshot) {
		        	if(valid == "" || valname == ""){
		        		check--
		        	}
		        	else if(valid == snapshot.val().id){
		        		check++
		        	}
		        }); 
  			});
			
			if(check==0){
				//this.group.push(groupData);

					let snapId;
					let userOwnerId = this.userOwner[0].id;
					
					let groupid = firebase.database().ref().child('/group/').push().key; 
					console.log(groupid + " <<<<<<<<")
				    let data = {
				    	admin: this.userOwner[0],
				    	users: "",
				    	keyId : groupid,
				    	id: valid,
				    	name: valname,
				    	code: valcode,
				    	desc: valdesc,
				    	date: valdate,
				    	time: valtime,
				    	category: ""

				    }
				    let updates = {};
				    updates['/group/'+groupid] = data;
				    firebase.database().ref().update(updates);
					Materialize.toast('Group is added', 4000);

				this.readMyGroup();
			}
			else if(check<0){
				this.readMyGroup();
			}
			else{
				Materialize.toast('This group already exists', 4000);
			}  
		}

		updateGroup(key){
			let gname = document.getElementById("updategroupName");
			let gdesc = document.getElementById("updategroupDesc");
			let gcode = document.getElementById("updategroupCode");
			let gdate = document.getElementById("updategroupDate");
			let gtime = document.getElementById("updategroupTime");
			let valname = gname.value;
			let valdesc = gdesc.value;
			let valcode = gcode.value;
			let valdate = gdate.value;
			let valtime = gtime.value;

			let check = 0;

			let groupBase = firebase.database().ref('/group/').on('value', 
		      (userSnapId)=>{
		        userSnapId.forEach(function(snapshot) {
		        	if(valname == ""){
		        		check--
		        	}
		        }); 
  			});

			// for(let i=0;i<=this.group.length;i++){
			// 	if(valid=="" || valname == ""){
			// 		check--;
			// 	}
			// 	else if(this.group.length > 1){
			// 		if(valid==this.group[i].id){
			// 			check++;
						
			// 		}
			// 	}
			// }

			if(check==0){
				// this.group[key].id= valid;
				// this.group[key].name= valname;
				let nameupdates = {};
				let descupdates = {};
				let codeupdates = {};
				let dateupdates = {};
				let timeupdates = {};


			    nameupdates['/group/'+this.group[key].keyId+'/name/'] = valname;
			    descupdates['/group/'+this.group[key].keyId+'/desc/'] = valdesc;
			    codeupdates['/group/'+this.group[key].keyId+'/code/'] = valcode;
			    dateupdates['/group/'+this.group[key].keyId+'/date/'] = valdate;
			    timeupdates['/group/'+this.group[key].keyId+'/time/'] = valtime;
			    firebase.database().ref().update(nameupdates);
			    firebase.database().ref().update(descupdates);
			    firebase.database().ref().update(codeupdates);
			    firebase.database().ref().update(dateupdates);
			    firebase.database().ref().update(timeupdates);
				Materialize.toast('Group is edited', 4000);
					
				this.readMyGroup();
			}
			else if(check<0){
				this.readMyGroup();
			}
			else{
				Materialize.toast('This group already exists', 4000);
			}  
		}

		updateGroupMember(key){
			let gname = document.getElementById("updategroupName");
			let gdesc = document.getElementById("updategroupDesc");
			let valname = gname.value;
			let valdesc = gdesc.value;
			let check = 0;

			let groupBase = firebase.database().ref('/group/').on('value', 
		      (userSnapId)=>{
		        userSnapId.forEach(function(snapshot) {
		        	if(valname == ""){
		        		check--
		        	}
		        }); 
  			});

			if(check==0){

				let nameupdates = {};
				let descupdates = {};

			    nameupdates['/group/'+this.group[key].keyId+'/name/'] = valname;
			    descupdates['/group/'+this.group[key].keyId+'/desc/'] = valdesc;
			    firebase.database().ref().update(nameupdates);
			    firebase.database().ref().update(descupdates);
				Materialize.toast('Group is edited', 4000);
					
				this.readMyGroup();
			}
			else if(check<0){
				this.readMyGroup();
			}
			else{
				Materialize.toast('This group already exists', 4000);
			}  
		}

		deleteGroup(key){ 
			firebase.database().ref().child('/group/'+this.group[key].keyId).remove();
			console.log("Deleted");
			this.readMyGroup();
			component.groupPage();
		}

		deleteGroupConfirmation(key){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">Are you sure you want to delete this group?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.deleteGroup(${key})"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		leaveGroupConfirmation(key){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">Are you sure you want to leave this group?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.deleteMember(${key}, \""+"${this.userOwner[0].id}"+"\")"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		getChecklistData(){
			console.log(this.userOwner[0]);
			let groupdummy = [];
			let groupdummy2 = [];
			let adminCheck = [];
			let userCheck = [];
			let userId;
			let userOwnerUserId = this.userOwner[0].user;
			let groupBase = firebase.database().ref('/group/').on('value', 
		      (userSnapId)=>{
		      	this.group = [];
		        userSnapId.forEach(function(snapshot) {
		        	adminCheck = snapshot.val().admin;
		        	if(userOwnerUserId == adminCheck.user){
		        		if(snapshot.val().category == ""){
		        			groupdummy.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":[], "keyId":snapshot.val().keyId, "date":snapshot.val().date, "time":snapshot.val().time});
		        		
		        		}
			        	else{
			        		groupdummy.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":snapshot.val().category, "keyId":snapshot.val().keyId, "date":snapshot.val().date, "time":snapshot.val().time});
			        	}
			        	component.groupPush(groupdummy);
			        	groupdummy = [];
		        	}
		        	else{
			        	let groupChildBase = firebase.database().ref('group/'+snapshot.key+'/users/').on('value',
			        		(userSnapChildId)=>{
			        		userSnapChildId.forEach(function(snapshotChild){
			        			
			        			if(userOwnerUserId == snapshotChild.val().user){
			        				console.log("User Success");
					        		if(snapshot.val().category == ""){
					        			
					        			groupdummy2.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":[],"keyId":snapshot.val().keyId, "date":snapshot.val().date, "time":snapshot.val().time});
					        		
					        		}
						        	else{
						        		
						        		groupdummy2.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":snapshot.val().category, "keyId":snapshot.val().keyId, "date":snapshot.val().date, "time":snapshot.val().time});
						        	}
						        	component.groupPush2(groupdummy2);
						        	 groupdummy2 = [];
					        	}
			        		});

			        		component.readMyGroup();
	
			        	});
					}
		      

		        	
		          
		        }); 
		        
		       
  			});
		}

		getChecklistDataOnce(){
			console.log(this.userOwner[0]);
			let groupdummy = [];
			let groupdummy2 = [];
			let adminCheck = [];
			let userCheck = [];
			let userId;
			let userOwnerUserId = this.userOwner[0].user;
			let groupBase = firebase.database().ref('/group/').once('value', 
		      (userSnapId)=>{
		      	this.group = [];
		        userSnapId.forEach(function(snapshot) {
		        	adminCheck = snapshot.val().admin;
		        	if(userOwnerUserId == adminCheck.user){
		        		if(snapshot.val().category == ""){
		        			groupdummy.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":[], "keyId":snapshot.val().keyId});
		        		
		        		}
			        	else{
			        		groupdummy.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":snapshot.val().category, "keyId":snapshot.val().keyId});
			        	}
			        	component.groupPush(groupdummy);
			        	groupdummy = [];
		        	}
		        	else{
			        	let groupChildBase = firebase.database().ref('group/'+snapshot.key+'/users/').on('value',
			        		(userSnapChildId)=>{
			        		userSnapChildId.forEach(function(snapshotChild){
			        			
			        			if(userOwnerUserId == snapshotChild.val().user){
			        				console.log("User Success");
					        		if(snapshot.val().category == ""){
					        			
					        			groupdummy2.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":[],"keyId":snapshot.val().keyId});
					        		
					        		}
						        	else{
						        		
						        		groupdummy2.push({"name":snapshot.val().name,"code":snapshot.val().code,"desc":snapshot.val().desc,"id":snapshot.val().id, "users":snapshot.val().users, "admin":snapshot.val().admin,"category":snapshot.val().category, "keyId":snapshot.val().keyId});
						        	}
						        	component.groupPush2(groupdummy2);
						        	 groupdummy2 = [];
					        	}
			        		});

			        		component.readMyGroup();
			        		// for(let z=0;z<this.group.length;z++){
			        		// 	for(let z)
			        		// }
			        		// component.read
			        		
			        	});
					}
		      

		        	
		          
		        }); 
		        
		       
  			});
		}

		groupPush(groupval){
			
			this.group.push(groupval[0]);
			for(let x=0;x<this.group.length;x++){
				component.readMembers(x);
			}
			component.readMyGroup();
		}

		groupPush2(groupval){
			this.group.push(groupval[0]);
			for(let x=0;x<this.group.length;x++){
				component.readMembers(x);
			}
			component.readMyGroup();
		}

		categoryPush(key, catArr){

			this.group[key].category = catArr;
			console.log(this.group);
		}

		itemPush(key, key2, itemArr){
			this.group[key].category[key2].catitems = itemArr;
		}

		readCategoryData(key){
			let catdummy = [];
			let itemdummy = [];
			let countCheckBase = 0;
			let groupdummy = this.group;
			let catBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/category/').on('value', 
			      (catSnapId)=>{
			     	
			     	countCheckBase = 0;
			      	catdummy = [];
			        catSnapId.forEach(function(snapshot) {
			        	if(snapshot.val().catitems == ""){
			        		catdummy.push({"catid":snapshot.val().catid,"catname":snapshot.val().catname,"catitems":[], "assigned":snapshot.val().assigned});
			        		
			        	}
			        	else{
			        		catdummy.push({"catid":snapshot.val().catid,"catname":snapshot.val().catname,"catitems":snapshot.val().catitems, "assigned":snapshot.val().assigned});
			        		itemdummy = [];
			        		let catChildBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/category/'+snapshot.val().catid+'/catitems/').once('value', 
						      (catChildSnapId)=>{
						      	catChildSnapId.forEach(function(snapshotChild){
						      		itemdummy.push({"itemname":snapshotChild.val().itemname, "itemid":snapshotChild.val().itemid, "quantity":snapshotChild.val().quantity, "photo":snapshotChild.val().photo, "remarks":snapshotChild.val().remarks,"mark":snapshotChild.val().mark});
						      		
						      		
						      	});
						      		
						      });
			        		
			        		
			        	}
			        	component.categoryPush(key, catdummy);
			        	component.itemPush(key, countCheckBase, itemdummy);
			        	
			        	itemdummy = [];
						countCheckBase++;
			        	
			        	
			        }); 
			console.log("Refresh Activity");
			component.readActivityOL(key);
			$('.collapsible').collapsible({
					  accordion : true
					});
	  		});
		}

		sortUsersAssigned(key){
			if(this.group[key].category != ""){
				this.group[key].category.sort(component.predicateBy("assigned"));	
			}
		}


		readActivityOL(key){
			component.sortUsersAssigned(key);
			groupKeyGlobal = key;
			component.startTimeOL();
			let viewAct = document.getElementById("actcontOL");
			let menuBar = document.getElementById("menubarOL");
			let html = `
						<div>
                            <a href="#" id="backbutton" onclick="component.groupPage()"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
                            <h5 id="menuName" class="headText row center">${this.group[key].name}</h5>
                           
                            <a href="#bottommodal" onclick="component.optionBottomModalActOL(${key})" id="optionbutton" class="modal-trigger"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                        </div>

			`;
			let html2 = ``;
			let count = 0;

			let usersAssigned="";
			let assignedUsersArr = [];
			for(let x=0;x<this.group[key].category.length;x++){
				let checkCount = 1;
				for(let y=0; y<this.group[key].category[x].catitems.length; y++){
					if(this.group[key].category[x].catitems[y].mark == true){					
						component.displayCheckCat(key, x, checkCount);
						checkCount++;	
					}
				}
				if(usersAssigned == ""){
					usersAssigned = this.group[key].category[x].assigned;
					assignedUsersArr.push(usersAssigned);
				}
				else if(usersAssigned != this.group[key].category[x].assigned){
					usersAssigned = this.group[key].category[x].assigned;
					assignedUsersArr.push(usersAssigned);
				}
			}

			if (this.group[key].category == ""){
				html2 = `<div id="noAct" class="container row center">
					<img src="images/home/backpack_logo.png"><br>
					<span>Empty</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#addInput" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.addCategoryInputOL(${key})">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}
			else{

				html2 = `
				<div class="container" id="displaycontainerOL">			
					<ul id="activityDispListOL" data-collapsible="expandable" class="row">`;

			
				
				for(let z=0;z<assignedUsersArr.length;z++){
					let totalItems = 0;
					let checkMark = 0;
				
					for(let y=0;y<this.group[key].category.length;y++){
						if(this.group[key].category[y].assigned == assignedUsersArr[z]){
							totalItems = totalItems + this.group[key].category[y].catitems.length;
							for(let b=0;b<this.group[key].category[y].catitems.length;b++){
								if(this.group[key].category[y].catitems[b].mark == true)
									checkMark++;
							}
							
						}
					}
					html2 += `
						<span style="position:relative;color:#fff;font-size:10pt;float:left;margin-top:5px">${checkMark}/${totalItems}</span>
						<span style="position:relative;color:#fff;font-size:10pt;float:right;margin-top:5px">${assignedUsersArr[z]}</span><br>
						<div class="divider col s12"></div><br>
					`;
					for(let i=0;i<this.group[key].category.length;i++){
						if(this.group[key].category[i].assigned == assignedUsersArr[z]){
							let isDisabled = "";
							if(this.group[key].category[i].assigned != this.userOwner[0].user){
								isDisabled = "disabled";
								console.log(this.group[key].category[i].assigned + " "+this.userOwner[0].user);
							}
							let catCheckMark = 0;
							for(let b=0;b<this.group[key].category[i].catitems.length;b++){
								if(this.group[key].category[i].catitems[b].mark == true)
									catCheckMark++;
							}
							html2 += `
							<li ontouchstart='component.longPressOptionActViewOL(${key}, ${i})' ontouchend="component.catRevert()">
								<div class="collapsible-header waves-effect" style="color:#fff;background-color:#0f1219; border:none">
									${this.group[key].category[i].catname}<span style="position:absolute; z-index:3; right:35px;" class="badge">
										${catCheckMark}/${this.group[key].category[i].catitems.length}
									</span>
									<span id='${"areCheckedOL"+i}' class="badge checkCat">
										<i class="fa fa-check" style="color:#66BB6A;" aria-hidden="true"></i>
									</span>
									`;

									if(this.userOwner[0].user == this.group[key].admin.user){
										html2 += `
											<a href="#modal3" onclick='component.optionSideModalActViewOL(${key}, ${i})' id="optionbuttonActOL" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
										`;
									}
									else if(this.userOwner[0].user == this.group[key].category[i].assigned){
										html2 += `
											<a href="#modal3" onclick='component.optionSideModalActViewOL2(${key}, ${i})' id="optionbuttonActOL" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
										`;
									}

							html2 += `
									
								</div>
								<div id="dividerColHead" class="divider"></div>
								<div class="collapsible-bodyOL">
									<ul>
								`;

								for(let x=0; x<this.group[key].category[i].catitems.length; x++){
									let idName = "itemOL";
									let checkItem = "";
									let idCat = this.group[key].category[i].catid;
									let idItem = this.group[key].category[i].catitems[x].itemid;
									if(this.group[key].category[i].catitems[x].mark == true){
										checkItem = "checked";
									}
									
									html2 += `
										
											<li class="waves-effect" style="padding-top:12px"><a href="#modal1" class="modal-trigger" onclick='component.readItemDetailsOL(${key}, ${i}, ${x})'>${this.group[key].category[i].catitems[x].itemname}</a> <span class="badge" style="float:left;margin-left:20px">
											<input type="checkbox" style="z-index: 999" id="${idName+count}" ${isDisabled} onclick='component.displayCatCheckOL(${this.group[key].category[i].catitems[x].mark},${key},\""+"${idCat}"+"\",\""+"${idItem}"+"\")' ${checkItem}  value="3"/>
											<label for="${idName+count}"></label></span><span id="quantityBadge" class="badge">${this.group[key].category[i].catitems[x].quantity}</span> 
											
											</li>
											<div id="dividerCol" class="divider"></div>
			
									`;
									count++;

								}
							html2 +=`
									</ul>
								</div>
							</li>
							<br>
							`;
						}
					}

				}
				
				html2 += `
					</ul>
					</div>
					<div class="fixed-action-btn horizontal click-to-toggle">`;

					if(this.userOwner[0].user == this.group[key].admin.user){
						html2 +=`
								<a href="#addInput" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.addCategoryInputOL(${key})">
									<i class="fa fa-plus"></i>
								</a>
								</div>`;
					}
					else{
						html2 += `
								<a href="#addInput" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.addCategoryInputOLAssigned(${key})">
									<i class="fa fa-plus"></i>
								</a>
								</div>
						
							`;
					}
				
			}
			menuBar.innerHTML = html;
			viewAct.innerHTML = html2;
		}

		startTimeOL(){
			let today = new Date();
		    //today.setHours(today.getHours() + 1);
		    let h = today.getHours();
		    let m = today.getMinutes();


		    let d = today.getDate();
		    let month = today.getMonth();

		    month = component.checkMonthOL(month);
		    let year = today.getFullYear();
		    m = component.checkTimeZero(m);
			let ampm = component.checkAMPM(h);
			h = component.checkTimeHour(h);
			h = component.checkTimeZero(h);

			let timeVal = h+":"+m+" "+ampm;
			let dateVal = d+" "+month+", "+year;
			//console.log(timeVal);
			let group = component.setVarGroup();
			if(group[groupKeyGlobal].date == dateVal){
				timeVal = h+":"+m+" "+ampm;
				let timeres = group[groupKeyGlobal].time.split(':');
				let hourGroup = timeres[0];
				hourGroup = component.timeParse(hourGroup);
				h = component.timeParse(h);
				console.log(h + " "+ hourGroup);
				if(h-1 == hourGroup){
					$('#dueHour').show();
					$(function () {$("#notifbutton").css("color", "#e64a19");});
					component.notifBar(groupKeyGlobal);
				}
				else{
					$('#dueHour').hide();
				}
			}
			else{
				$('#dueHour').hide();
			}
			if(timeEnabledOL == false){
				timeEnabledOL = true;
				setInterval(function(){ 

					let today = new Date();
				    //today.setHours(today.getHours() + 1);
				    let h = today.getHours();
				    let m = today.getMinutes();


				    let d = today.getDate();
				    let month = today.getMonth();

				    month = component.checkMonthOL(month);
				    let year = today.getFullYear();
				    m = component.checkTimeZero(m);
					let ampm = component.checkAMPM(h);
					h = component.checkTimeHour(h);
					h = component.checkTimeZero(h);

					let timeVal = h+":"+m+" "+ampm;
					let dateVal = d+" "+month+", "+year;
					//console.log(timeVal);
					let group = component.setVarGroup();
					if(group[groupKeyGlobal].date == dateVal){
						timeVal = h+":"+m+" "+ampm;
						let timeres = group[groupKeyGlobal].time.split(':');
						let hourGroup = timeres[0];
						hourGroup = component.timeParse(hourGroup);
						h = component.timeParse(h);
						console.log(h + " "+ hourGroup);
						if(h-1 == hourGroup){
							component.notifBar(groupKeyGlobal);
							$('#dueHour').show();
							$(function () {$("#notifbutton").css("color", "#e64a19");});
							
						}
						else{
							$('#dueHour').hide();
						}
					}
					else{
						$('#dueHour').hide();
					}
				    
			    }, 2000);

			}
		   //setInterval(function(){ console.log("Time");}, 1000);
		}

		setVarGroup(){
			return this.group;
		}

		checkMonthOL(value){

			if(value==0){
				return "January";
			}
			else if(value==1){
				return "February";
			}
			else if(value==2){
				return "March";
			}
			else if(value==3){
				return "April";
			}
			else if(value==4){
				return "May";
			}
			else if(value==5){
				return "June";
			}
			else if(value==6){
				return "July";
			}
			else if(value==7){
				return "August";
			}
			else if(value==8){
				return "September";
			}
			else if(value==9){
				return "October";
			}
			else if(value==10){
				return "November";
			}
			else if(value==11){
				return "December";
			}
		}

		notifBar(key){
			let groupId = this.group[key].id;
			console.log(this.group);
			let notifBox = document.getElementById("notifbar");
			let dueHour = document.getElementById("dueHour");
			let groupBase = firebase.database().ref('/group/'+groupId+'/notif/').once('value', 
		      (snapshot)=>{

		      })
			
			let totalItems = 0;
			  	let totalItemsChecked = 0;
			 // let data = {
		  //   	catid: catid,
		  //   	catname: val,
		  //   	catitems: "",
		  //   	assigned: user
		  //   }
		  //   let updates = {};
		  //   updates['/group/'+groupdummy[key].keyId+'/category/'+catid] = data;
		  //   firebase.database().ref().update(updates);

			  	setTimeout(function (){
			  	let group = component.setVarGroup();
			  	console.log(group[key]);
			  	console.log(group[key].category);
			  	for(let x = 0; x<group[key].category.length;x++){
			  			console.log(group[key].category.length);
			  		totalItems = group[key].category[x].catitems.length + totalItems;
			  		for(let y = 0; y<group[key].category[x].catitems.length; y++){
			  			if(group[key].category[x].catitems[y].mark == true)
			  				totalItemsChecked++;
			  		}

			  	}
			  	console.log(totalItemsChecked);
			  	
			  	let html = `
				    <a href="#!" class="collection-item"><span class="badge">Due 1 hour</span>${totalItemsChecked}/${totalItems} items completed.</a>
				   <!--<div class="collection">
				    <a href="#!" class="collection-item"><span class="badge">4/23/2018</span>Notification 1</a>
				    <a href="#!" class="collection-item"><span class="badge">4/22/2018</span>Notification 2</a>
				    <a href="#!" class="collection-item">Notification 3</a>
				    <a href="#!" class="collection-item"><span class="badge">4/20/2018</span>Notification 4</a>
				  </div>-->
				 `;
				dueHour.innerHTML = html;

		  	}, 500);
			
			            
			
		}
		notifBarClick(key){
			$(function () {$("#notifbutton").css("color", "#fff");});
			let notifBox = document.getElementById("notifbar");
			let html = `
				  <div id="dueHour" class="collection">
				 
				  </div>`;
			notifBox.innerHTML = html;
			component.notifBar(key);
			
		  	
			
			            
			
		}

		notifAdd(key, cond){
			let groupdummy = this.group;
			let catid = firebase.database().ref().child('/group/'+groupdummy[key].keyId+'/notif/').push().key; 
						
		    let data = {}
		    if (cond == 1){

		    }
		    data = {
		    	id: catid,
		    	user: [],
		    	desc: "",
		    	time: "",
		    	date: ""
		    }
		    let updates = {};
		    updates['/group/'+groupdummy[key].keyId+'/category/'+catid] = data;
		    firebase.database().ref().update(updates);

		}

		checkChecklistNotif(key){

		}

		optionBottomModalActOL(key){	
			let option = document.getElementById("bottommodal");
			let html = ``;
			if(this.userOwner[0].user == this.group[key].admin.user){
				html = ` <div id="modalOption">
							<a href="#modal1" onclick='component.viewGroupDetails(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">View group details</a>
					      <a href="#!" onclick='component.memberPageOL(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to member page</a>
					    </div>
				`;
			}
			else{
				html = ` <div id="modalOption">
							<a href="#modal1" onclick='component.viewGroupDetailsMember(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">View group details</a>
					      <a href="#!" onclick='component.memberPageOL(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to member page</a>
					    </div>
				`;
			}
				option.innerHTML = html;
		}

		displayCatCheckOL(checkBool, groupkey, key, itemkey){
			let count = 1;
			let check = 0;
			let markupdates = {};
			if(checkBool == true){
				 markupdates['/group/'+this.group[groupkey].keyId+'/category/'+key+'/catitems/'+itemkey+'/mark/'] = false;
			}
			else{
				markupdates['/group/'+this.group[groupkey].keyId+'/category/'+key+'/catitems/'+itemkey+'/mark/'] = true;
				 
			}
			firebase.database().ref().update(markupdates);
			component.readCategoryData(groupkey);
		}

		displayCheckCat(groupkey, key, count){
			
			if(count==this.group[groupkey].category[key].catitems.length){
				//$('#areCheckedOL'+key).show();
				$(function () {$("#areCheckedOL"+key).css("display", "block");});
			}
			else{
				//$('#areCheckedOL'+key).hide();
				$(function () {$("#areCheckedOL"+key).css("display", "none");});
			}
		}

		//Category

			
			addCategoryInputOL(key){
				
				let groupList = document.getElementById("addInput");
				let check = 0;

				
				let html = `<div class="modal-content" id="groupdetails">
					<form class="row">
						<h5>Category</h5>
						<div class="input-field col s12">
							<input id="catname"  type="text"  class="validate"  >
							<label for="catname">Name</label>
						</div>
						<div class="col s12">
							<label for="assign">Assign</label>
							<div id="assignUser" class="switch">
							    <label>
							      Off
							      <input id="assignCheck" type="checkbox" onclick="component.setAssignShowMenu()">
							      <span class="lever"></span>
							      On
							    </label>
							</div>

						</div>
						<div class="input-field col s12" id="assignInput">
					    	<input id="assignUserInput" type="text">
					    	<label for="assignUserInput">User ID</label>
					    
						</div>
					</form>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.checkAssignUser(${key})'>Done</a>
						<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
					</div>`;
				groupList.innerHTML = html;

			}
			addCategoryInputOLAssigned(key){
				
				let groupList = document.getElementById("addInput");
				let check = 0;

				
				let html = `<div class="modal-content" id="groupdetails">
					<form class="row">
						<h5>Category</h5>
						<div class="input-field col s12">
							<input id="catname"  type="text"  class="validate"  >
							<label for="catname">Name</label>
						</div>
						
					</form>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.addCategoryOLAssigned(${key})'>Done</a>
						<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
					</div>`;
				groupList.innerHTML = html;

			}

			setAssignShowMenu(){
				let box = document.getElementById("assignCheck");
				if(box.checked == true){
					$('#assignInput').show();
				}
				else{
					$('#assignInput').hide();
				}
			}

			renameCategoryInputOL(key, key2){
				
				let groupList = document.getElementById("addInput");
				let check = 0;

				
				let html = `<div class="modal-content" id="groupdetails">
					<form class="row">
						<div class="input-field col s12">
							<input id="updatecatname" value='${this.group[key].category[key2].catname}' type="text"  class="validate"  >
							<label class="active" for="updatecatname">Name</label>
						</div>
					</form>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.renameCategoryOL(${key},${key2})'>Done</a>
						<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
					</div>`;
				groupList.innerHTML = html;

			}

			checkAssignUser(key){
				let user = document.getElementById("assignUserInput").value;
				let exist = false;
				if(user != ""){
					let groupdummy = this.group;
					let catBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/users/').once('value', 
				      (catSnapId)=>{
				     	catSnapId.forEach(function(snapshot) {
				     		if(snapshot.val().user == user){
				     			component.addCategoryOL(key);
				     			exist = true;
				     			$('#addInput').modal('close');
				     		}
				     	})
			  		});
			  		if(exist == false){
			  			Materialize.toast('User not found', 1500);
			  		}
				}
				else{
					component.addCategoryOL(key);
					$('#addInput').modal('close');
				}
				

			}

			addCategoryOL(key){
				let add = document.getElementById("catname");
				let val = add.value;
				let user = document.getElementById("assignUserInput").value;
				if(user == "")
					user = this.userOwner[0].user;
				//let act = {"catname":val,"catitems":[]};
				let groupdummy = this.group;
				let check = 0;
				if(val != ""){
			        	
					let groupBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/category/').once('value', 
				      (catSnap)=>{
				        catSnap.forEach(function(snapshot) {
				        	
				        	if(val == snapshot.val().keyId){
				        		check++;
				        	}
				        }); 
				        if(check==0){

						let catid = firebase.database().ref().child('/group/'+groupdummy[key].keyId+'/category/').push().key; 
						
					    let data = {
					    	catid: catid,
					    	catname: val,
					    	catitems: "",
					    	assigned: user
					    }
					    let updates = {};
					    updates['/group/'+groupdummy[key].keyId+'/category/'+catid] = data;
					    firebase.database().ref().update(updates);
						Materialize.toast('Category is created', 4000);
						
						component.readCategoryData(key);
						$('.collapsible').collapsible({
						  accordion : true
						});
					}
					else if(check<0){
						component.readActivityOL(key);
					}
					else{
						Materialize.toast('This category already exists', 4000);
					} 
		  			});

					
					
				}
				else{
					component.readActivityOL(key);
				} 
			}
			addCategoryOLAssigned(key){
				let add = document.getElementById("catname");
				let val = add.value;
				let user = this.userOwner[0].user;
				//let act = {"catname":val,"catitems":[]};
				let groupdummy = this.group;
				let check = 0;
				if(val != ""){
			        	
					let groupBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/category/').once('value', 
				      (catSnap)=>{
				        catSnap.forEach(function(snapshot) {
				        	
				        	if(val == snapshot.val().keyId){
				        		check++;
				        	}
				        }); 
				        if(check==0){

						let catid = firebase.database().ref().child('/group/'+groupdummy[key].keyId+'/category/').push().key; 
						
					    let data = {
					    	catid: catid,
					    	catname: val,
					    	catitems: "",
					    	assigned: user
					    }
					    let updates = {};
					    updates['/group/'+groupdummy[key].keyId+'/category/'+catid] = data;
					    firebase.database().ref().update(updates);
						Materialize.toast('Category is created', 4000);
						
						component.readCategoryData(key);
						$('.collapsible').collapsible({
						  accordion : true
						});
					}
					else if(check<0){
						component.readActivityOL(key);
					}
					else{
						Materialize.toast('This category already exists', 4000);
					} 
		  			});

					
					
				}
				else{
					component.readActivityOL(key);
				} 
			}
			renameCategoryOL(key, key2){
				let add = document.getElementById("updatecatname");
				let val = add.value;
				let check = 0;
				if(val == ""){
			    	check--
			    }
				
				if(check==0){
					// this.group[key].category[key2].catname=val;
					let nameupdates = {};
			

				    nameupdates['/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catname/'] = val;
				    firebase.database().ref().update(nameupdates);
					Materialize.toast('Category is renamed', 4000);
					component.readCategoryData(key);
					$('.collapsible').collapsible({
					  accordion : true
					});
				}
				else if(check<0){
					component.readActivityOL(key);
				}
				else{
					Materialize.toast('This category already exists', 4000);
				}  
			}

			longPressOptionActViewOL(key, key2){
				istrue = true;
				timer = setTimeout(function(){ component.actTriggerViewOL(timer,istrue, key, key2);},delay);
			}
			actTriggerViewOL(time, check, key, key2){
				if(time)
			      clearTimeout(timer);
			      
			      if(check)
			      {
			         component.optionSideModalActViewOL(key, key2);
			      }
			}
			optionSideModalActViewOL(key, key2){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<div class="row" style="margin-bottom:0px">
								<!--<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckViewOL(${key}, ${key2}, ${1})'><h5 style="color:#000000">Check all items in this category</h5></a><br>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.optionResultCheckViewOL(${key}, ${key2}, ${0})'><h5 style="color:#000000;">Uncheck all items in this category</h5></a>
								<div class="divider"></div>-->
								<a href="#addInput" class="modal-trigger waves-effect" style="width:100%;" onclick='component.renameCategoryInputOL(${key}, ${key2})'><h5 style="color:#000000;">Rename this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.deleteCategoryOL(${key}, ${key2})'><h5 style="color:#000000;">Delete this category</h5></a>
								<div class="divider"></div>
								<a href="#modal1" class="waves-effect modal-trigger" style="width:100%;" onclick='component.addItemInputOL(${key}, ${key2})'><h5 style="color:#000000;">Add item in this category</h5></a>


							</div>
					`;
					option.innerHTML = html;
				
			}
			optionSideModalActViewOL2(key, key2){
				let option = document.getElementById("modal3");
				$('#modal3').modal('open');
				let html = `
							<div class="row" style="margin-bottom:0px">
								
								<a href="#addInput" class="modal-trigger waves-effect" style="width:100%;" onclick='component.renameCategoryInputOL(${key}, ${key2})'><h5 style="color:#000000;">Rename this category</h5></a>
								<div class="divider"></div>
								<a href="#!" class="waves-effect" style="width:100%;" onclick='component.deleteCategoryOL(${key}, ${key2})'><h5 style="color:#000000;">Delete this category</h5></a>
								<div class="divider"></div>
								<a href="#modal1" class="waves-effect modal-trigger" style="width:100%;" onclick='component.addItemInputOL(${key}, ${key2})'><h5 style="color:#000000;">Add item in this category</h5></a>


							</div>
					`;
					option.innerHTML = html;
				
			}
			optionResultCheckViewOL(Id, Id2, choice){
				if(choice == 1){
					let countActCheck = 0;
					let idName = "itemOL";
					let count = 0;

					for(let i=0;i<this.group[Id].category.length;i++){
						if(Id==i)
							break;
						for(let k=0;k<this.group[Id].category[i].catitems.length;k++){
							count++;

						}
					}
					for(let x=0;x<this.group[Id].category[Id2].catitems.length;x++){
							document.getElementById(idName+count).checked = true;
							this.group[Id].category[Id2].catitems[x].mark = true;
							console.log(this.group[Id].category[Id2].catitems[x].mark);
							count++;
					}
					
					$('#areCheckedOL'+Id).show();
				}
				else if(choice == 0){
					let countActCheck = 0;
					let idName = "itemOL";
					let count = 0;

					for(let i=0;i<this.group[Id].category.length;i++){
						if(Id==i)
							break;
						for(let k=0;k<this.group[Id].category[i].catitems.length;k++){
							count++;
						}
					}
					for(let x=0;x<this.group[Id].category[Id2].catitems.length;x++){
							document.getElementById(idName+count).checked = false;
							this.group[Id].category[Id2].catitems[x].mark = false;
							console.log(this.group[Id].category[Id2].catitems[x].mark);
							count++;
					}
					$('#areCheckedOL'+Id).hide();
				}

			}

			deleteCategoryOL(key, key2){ 
				let groupLength = this.group[key].category.length-1;
				console.log(groupLength);
				firebase.database().ref().child('/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid).remove();
				
				if(groupLength == 0){
					let catUpdate = {};
				    catUpdate['/group/'+this.group[key].keyId+'/category/'] = "";
				    firebase.database().ref().update(catUpdate);
				}
				component.readCategoryData(key);
				$('.collapsible').collapsible({
					  accordion : true
				});
			}

		//Items
			addItemInputOL(key, key2){
				if(addItemCheckVar){
					this.dummyItemPhoto[0] = {"name":"","quantity":"","remarks":"","photo":"images/items/def.jpg"};
					addItemCheckVar = false;
				} 
				let itemDetailsList = document.getElementById("modal1");
				
				let html = `<div class="modal-content" id="itemdetails">
				<center><img style="height: 200px; width:200px;" class="responsive-img center" src="${this.dummyItemPhoto[0].photo}"></center>
						<center><a class="waves-effect waves-light btn modal-trigger" href="#modal4" id="createAddbutton" style="bottom:0px;" onclick='component.iconSelectOL(${key},${key2})' >Select photo</a></center>
						<h4><input id="addDescOL" type="text" placeholder="Name of the Item" oninput="component.itemInputHandlerOL()" value="${this.dummyItemPhoto[0].name}" /></h4>
						<p>Quantity: <input id="addQuantityOL" type="text" onkeypress="return component.isNumberKey(event)" oninput="component.itemInputHandlerOL()" placeholder="Quantity of the Item" value="${this.dummyItemPhoto[0].quantity}" /></p>
						<p>Note: <input id="addNoteOL" type="text" placeholder="Add a Note" oninput="component.itemInputHandlerOL()" value="${this.dummyItemPhoto[0].remarks}" /></p>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.addItemOL(${key},${key2})'>Done</a>
						<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick='component.itemMenuCancelOL(${key})'>Cancel</a>
					</div>`;
				itemDetailsList.innerHTML = html;
			}
			itemMenuCancelOL(key){
				addItemCheckVar = true;
				component.readActivityOL(key);
				$('.collapsible').collapsible({
					  accordion : true
				});
			}
			itemInputHandlerOL(){
				let itemName = document.getElementById("addDescOL");
				let itemQuantity = document.getElementById("addQuantityOL");
				let itemNote = document.getElementById("addNoteOL");
				this.dummyItemPhoto[0] = {"name":itemName.value, "quantity":itemQuantity.value, "remarks":itemNote.value, "photo":this.dummyItemPhoto[0].photo};
			}
			itemInputHandlerEditOL(key,key2,key3){
				let itemName = document.getElementById("updateDescOL");
				let itemQuantity = document.getElementById("updateQuantityOL");
				let itemNote = document.getElementById("updateNoteOL");
				this.dummyItemPhoto[0] = {"name":itemName.value, "quantity":itemQuantity.value, "remarks":itemNote.value, "photo":this.dummyItemPhoto[0].photo};
				component.iconSelect_EditOL(key,key2,key3);
			}
			addItemOL(key, key2){
				let addDesc = document.getElementById("addDescOL");
				let addQuantity = document.getElementById("addQuantityOL");
				let addNote = document.getElementById("addNoteOL");
				let valname = addDesc.value;
				let valQuan = addQuantity.value;
				let valNote = addNote.value;
				//console.log(document.getElementById("photoUpload").value);
				//let act = {"itemname":valname,"quantity":valQuan,"remarks":valNote,"photo":this.dummyItemPhoto[0].photo,"mark":false};

				let groupdummy = this.group;
				let check = 0;
				console.log(groupdummy[key].keyId);
				let groupBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/category/'+groupdummy[key].category[key2].catid).on('value', 
			      (catSnap)=>{
			        catSnap.forEach(function(snapshot) {
			        	if(valname == ""){
			        		check--;
			        	}
			        	else if(valname == snapshot.val().keyId){
			        		check++;
			        	}
			        }); 
	  			});

				// for(let i=0;i<this.group[key].category[key2].catitems.length;i++){
				// 	if(val==""){
				// 		check--;
				// 	}
				// 	else if(valname==this.group[key].category[key2].catitems[i].itemname){
				// 		check++;
				// 	}
				// }

				if(check==0){
					let itemid = firebase.database().ref().child('/group/'+groupdummy[key].keyId+'/category/').push().key; 
					
				    let data = {
				    	itemid: itemid,
				    	itemname: valname,
				    	quantity: valQuan,
				    	remarks: valNote,
				    	photo: this.dummyItemPhoto[0].photo,
				    	mark: false 
				    }
				    let updates = {};
				    updates['/group/'+groupdummy[key].keyId+'/category/'+groupdummy[key].category[key2].catid+'/catitems/'+itemid] = data;
				    firebase.database().ref().update(updates);
					Materialize.toast('Item is created', 4000);

					$('#modal1').modal('close');

					component.readCategoryData(key);
					$('.collapsible').collapsible({
					  accordion : true
					});

				}
				else if(check<0){
					$('#modal1').modal('close');
					this.readCategoryData(key);
				}
				else{
					Materialize.toast('This item already exists', 4000);
				}
				this.dummyItemPhoto[0] = {"name":"","quantity":"","remarks":"","photo":"images/items/def.jpg"};  
				addItemCheckVar = true;
			}
			editItemInputOL(key, key2, key3){
				
				
				let varInput = "";
				let itemList = document.getElementById("modal1");
				let html = `<div class="modal-content" id="itemdetails">`;
				for(let i=0;i<this.group[key].category[key2].catitems.length;i++){
					if(this.group[key].category[key2].catitems[key3].itemname==this.group[key].category[key2].catitems[i].itemname){
						if(iconChooseReset){
						 	this.dummyItemPhoto[0].photo = this.group[key].category[key2].catitems[key3].photo;
						 	iconChooseReset = false;
						}
						
					html += `
							<center><img style="height: 200px; width:200px;" id="iconPhoto" class="responsive-img center" src="${this.dummyItemPhoto[0].photo}"></center>
							<center><a class="waves-effect waves-light btn modal-trigger" style="bottom:0px;" href="#modal4" id="createAddbutton" onclick='component.itemInputHandlerEditOL(${key},${key2},${key3})'>Select photo</a></center>
							<h4><input id="updateDescOL" value="${this.group[key].category[key2].catitems[key3].itemname}" oninput="component.itemInputHandlerEditOL()" type="text" placeholder="Name of the Item" /></h4>
							<p>Quantity: <input id="updateQuantityOL" onkeypress="return component.isNumberKey(event)" onkeypress="return component.isNumberKey(event)" oninput="component.itemInputHandlerEditOL()" value="${this.group[key].category[key2].catitems[key3].quantity}" type="text" placeholder="Quantity of the Item" /></p>
							<p>Note: <input id="updateNoteOL" oninput="component.itemInputHandlerEditOL()" value="${this.group[key].category[key2].catitems[key3].remarks}" type="text" placeholder="Add a Note" /></p>
					
						`;
						
					}
				}

				html += `
				</div>
				<div class="modal-footer" id="modalFooter">
						<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.updateItemOL(${key},${key2},${key3})'>Done</a>
						<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick='component.itemMenuCancelOL(${key})'>Cancel</a>
					</div>`;
				itemList.innerHTML = html; 
			}

			updateItemOL(key, key2, key3){
				
				let updateDesc = document.getElementById("updateDescOL");
				let updateQuantity = document.getElementById("updateQuantityOL");
				let updateNote = document.getElementById("updateNoteOL");
				let valname = updateDesc.value;
				let valQuan = updateQuantity.value;
				let valNote = updateNote.value;
				let check=0;
				let itemIndex = 0;
				
					for(let i=0;i<this.group[key].category[key2].catitems.length;i++){
						if(valname==this.group[key].category[key2].catitems[i].itemname){
							itemIndex=i;
							break;
						}
					}
				for(let i=0;i<this.group[key].category[key2].catitems.length;i++){
					if(valname==""){
						check=-1;
						break;
					}
					else if(valname==this.group[key].category[key2].catitems[itemIndex].itemname){

						break;
					}
					else if(valname==this.group[key].category[key2].catitems[i].itemname){
						check=1;
						break;
					}
				}
				if(check==0){
					let index = 0;
					
					let nameupdates = {};
					let quanupdates = {};
					let photoupdates = {};
					let noteupdates = {};
			

				    nameupdates['/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catitems/'+this.group[key].category[key2].catitems[key3].itemid+'/itemname/'] = valname;
				    quanupdates['/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catitems/'+this.group[key].category[key2].catitems[key3].itemid+'/quantity/'] = valQuan;
				    photoupdates['/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catitems/'+this.group[key].category[key2].catitems[key3].itemid+'/photo/'] = this.dummyItemPhoto[0].photo;
				    noteupdates['/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catitems/'+this.group[key].category[key2].catitems[key3].itemid+'/remarks/'] = valNote;
				    firebase.database().ref().update(nameupdates);
				    firebase.database().ref().update(quanupdates);
				    firebase.database().ref().update(photoupdates);
				    firebase.database().ref().update(noteupdates);
					Materialize.toast('Item is edited', 4000);
					component.readCategoryData(key);

					
					this.readItemDetailsOL(key, key2, key3);
					$('.collapsible').collapsible({
					  accordion : true
					});
				}
				else if(check==-1){
					 $('#modal1').modal('close');
				}
				else{
					Materialize.toast('This item already exists', 4000);
				}  
			}

			deleteItemSelectOL(name, key, key2){
				let itemList = document.getElementById("itemListContainer");
				let html = `<ul>`;
				for(let i=0;i<this.activity[key].category[key2].catitems.length;i++){
					html += `
					<li>${this.activity[key].category[i].catitems[i].itemname}</li><a class='waves-effect waves-light btn red' onclick='component.deleteItem(\""+"${this.activity[key].category[key2].catitems[i].itemname}"+"\",${key},${key2})'>X</a>
					`;
				}
				html += `</ul>
				<br><br>
								<a href="#modal1" class="modal-trigger" onclick='component.addItemInput(\""+"${name}"+"\",${key},${key2})'>Add</a><br>
								<a href="#!" onclick='component.editItemSelect(\""+"${name}"+"\",${key},${key2})'>Edit</a><br>
								<a href="#!" onclick='component.readItem(\""+"${name}"+"\",${key})'>Cancel</a>`;
				itemList.innerHTML = html;
			}

			deleteItemOL(key, key2, key3){ 
				firebase.database().ref().child('/group/'+this.group[key].keyId+'/category/'+this.group[key].category[key2].catid+'/catitems/'+this.group[key].category[key2].catitems[key3].itemid).remove();
				console.log("Deleted");
				$('#modal1').modal('close');
				component.readCategoryData(key);
				$('.collapsible').collapsible({
					  accordion : true
					});
			}
			readItemDetailsOL(key, key2, key3){
				//console.log(this.activity[key].category[key2].catitems[check].photo);
				let itemDetails = document.getElementById("modal1");
				let html = `<div class="modal-content row" id="itemdetails">
						<center><img style="height: 200px; width:200px;" class="responsive-img center" src="${this.group[key].category[key2].catitems[key3].photo}">
						<h4>${this.group[key].category[key2].catitems[key3].itemname}</h4>
						</center>
						<p><b>Quantity:</b> <span style="float:right">${this.group[key].category[key2].catitems[key3].quantity}</span></p>
						<div class="divider"></div>
						<p><b>Note:</b> <span style="float:right">${this.group[key].category[key2].catitems[key3].remarks}</span></p>
						<div class="divider"></div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#modal1" class="modal-action waves-effect modal-trigger waves-green btn-flat" onclick='component.editItemInputOL(${key},${key2},${key3})'>Edit</a>
						<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.deleteItemOL(${key},${key2},${key3})'>Delete</a>
					</div>
					`;
					itemDetails.innerHTML = html;
			}

			iconSelectOL(key, key2){
				let icons = document.getElementById("modal4");
				//console.log(name);
				let html = `
				
					<div class="modal-content row center" style="padding-left:0px;padding-right:0px;margin-left:0px">
						<div id="searchBarIcon" class="row center" style="height:85px; margin-left:0px;margin-right:0px">
							<div class="container row center">
								<input oninput="component.searchIcon()" id="txtSearchIcon" type="text" placeholder="Search" />
							</div>
						</div>
						<div id="iconList">
					`;
					for(let x=0;x<this.photoicons.length;x++){
						html += `
							<a href="#!" id="iconLink" onclick='component.selectedIconOL(\""+"${this.photoicons[x].name}"+"\")'>
								<img class="z-depth-3" id='${"picIcon"+x}' src="${this.photoicons[x].photo}" alt="${this.photoicons[x].name}" style="height:80px;width:80px">
								<p id="iconName">${this.photoicons[x].name}</p>
							</a>
							
						`;
					}
					html +=`
						</div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close" onclick='component.selectIconOL(${key},${key2})'>Select</a>
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Cancel</a>
					</div>
					`;
					icons.innerHTML = html;
			}
			selectedIconOL(name){
				for(let x=0;x<this.photoicons.length;x++){
					for(let i=0;i<this.photoicons.length;i++){
						if(this.dummyTable[0].name == this.photoicons[i].name){
							
							$("#picIcon"+i).css("animation-name", "iconDeselect");
							$("#picIcon"+i).css("animation-duration", "0.5s");
							$("#picIcon"+i).css("animation-fill-mode", "both");
							
							this.dummyTable[0].name = {"name":""};
							break;
						}
					}
					if(name == this.photoicons[x].name){

						$("#picIcon"+x).css("animation-name", "iconSelect");
						$("#picIcon"+x).css("animation-duration", "0.5s");
						$("#picIcon"+x).css("animation-fill-mode", "both");

						this.dummyTable[0] = {"name":name};
						
						break;
					}
				}
			}

			selectIconOL(key, key2){
				let icon = this.dummyTable[0].name;
				this.dummyTable[0].name = "";
				for(let i=0;i<this.photoicons.length;i++){
					if(icon == this.photoicons[i].name){
						this.dummyItemPhoto[0].photo = this.photoicons[i].photo;
						component.addItemInputOL(key,key2);
						break;
					}
				}


			}

			iconSelect_EditOL(key, key2, key3){
				let icons = document.getElementById("modal4");

				let html = `
				
					<div class="modal-content row center" style="padding-left:0px;padding-right:0px;margin-left:0px">
						<div id="searchBarIcon" class="row center" style="height:85px; margin-left:0px;margin-right:0px">
							<div class="container row center">
								<input oninput="component.searchIcon()" id="txtSearchIcon" type="text" placeholder="Search" />
							</div>
						</div>
						<div id="iconList">
					`;
					for(let x=0;x<this.photoicons.length;x++){
						html += `
							<a href="#!" id="iconLink" onclick='component.selectedIcon_Edit(\""+"${this.photoicons[x].name}"+"\")'>
								<img class="z-depth-3" id='${"picIcon_Edit"+x}' src="${this.photoicons[x].photo}" alt="${this.photoicons[x].name}" style="height:80px;width:80px">
								<p id="iconName">${this.photoicons[x].name}</p>
							</a>
							
						`;
					}
					html +=`
						</div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close" onclick='component.selectIcon_EditOL(${key},${key2},${key3})'>Select</a>
						<a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Cancel</a>
					</div>
					`;
					icons.innerHTML = html;
			}
			selectedIcon_EditOL(nameId){
				for(let x=0;x<this.photoicons.length;x++){
					for(let i=0;i<this.photoicons.length;i++){
						if(this.dummyTable[0].name == this.photoicons[i].name){
							
							$("#picIcon_Edit"+i).css("animation-name", "iconDeselect");
							$("#picIcon_Edit"+i).css("animation-duration", "0.5s");
							$("#picIcon_Edit"+i).css("animation-fill-mode", "both");
							
							this.dummyTable[0].name = {"name":""};
							break;
						}
					}
					if(nameId == this.photoicons[x].name){

						$("#picIcon_Edit"+x).css("animation-name", "iconSelect");
						$("#picIcon_Edit"+x).css("animation-duration", "0.5s");
						$("#picIcon_Edit"+x).css("animation-fill-mode", "both");

						this.dummyTable[0] = {"name":nameId};
						
						break;
					}
				}
			}

			selectIcon_EditOL(key, key2, key3){
				let icon = this.dummyTable[0].name;
				this.dummyTable[0].name = "";
				for(let i=0;i<this.photoicons.length;i++){
					if(icon == this.photoicons[i].name){
						this.dummyItemPhoto[0].photo = this.photoicons[i].photo;
						component.editItemInputOL(key,key2, key3);
						break;
					}
				}


			}


		
		readMembers(key){
			let groupVar = this.group[key].users;
			let thisUserOwner = this.userOwner;
			let thisGroup = this.group;
			let memberList = document.getElementById("memberListContainer");
			let memberMenuBar = document.getElementById("menubarMemberOL");
			let html = `
				 <div>
                    <a href="#" id="backbutton" onclick="component.activityPageOL(${key})"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
                    <h5 class="headText row center">Members</h5>
                    <a href="#bottommodal" onclick="component.optionBottomModalAct()" id="optionbutton" class="modal-trigger"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                </div>
			`;



			let html2 = `<ul id="memberList" class="row">

					<span style="position:relative;color:#fff;font-size:10pt;float:right;margin-top:5px">Admin</span><br>
					<div class="divider col s12"></div>
					<li>
						<a href="#!" id="memberListNames" class="waves-effect col s6" onclick=''>
							${this.group[key].admin.user}
						</a>
						<div id="actdivide" class="divider col s12"></div>
					</li>

					<br>
					<span style="position:relative;color:#fff;font-size:10pt;float:right;margin-top:5px">Members</span><br>
					<div class="divider col s12"></div>

			`;
		
			
		        	let groupChildBase = firebase.database().ref().child('group/'+this.group[key].keyId+'/users/').on('value',
		        		(userSnapChildId)=>{
		        		userSnapChildId.forEach(function(snapshotChild){
		        			if(thisUserOwner[0].user == thisGroup[key].admin.user){
			        			html2 += `
									<li>
										<a href="#!" id="memberListNames" class="waves-effect col s6" onclick=''>
											${snapshotChild.val().user}
											<a href="#bottommodal" onclick='component.editoptionBottomModalMember(${key}, \""+"${snapshotChild.val().id}"+"\")' id="optionbuttonAct" class="modal-trigger modal-action"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
											<div id="actdivide" class="divider col s12"></div>
										</a>
									</li>

								<br>
								`;
		        			}
		        			else{
		        				html2 += `
									<li>
										<a href="#!" id="memberListNames" class="waves-effect col s6" onclick=''>
											${snapshotChild.val().user}
											
										</a>
										<div id="actdivide" class="divider col s12"></div>
									</li>

								<br>
								`;
		        			}
		        		});
		       
		        	});
		          


				
			
			html2 += `</ul>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#addInput" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick="component.addMemberInput(${key})">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			memberMenuBar.innerHTML = html;
			memberList.innerHTML = html2;	
		}

		addMemberInput(key){
			let userList = document.getElementById("addInput");
			let check = 0;

			
			let html = `<div class="modal-content" id="groupdetails">
				<form class="row">
					<div class="input-field col s12">
						<input id="username"  type="text"  class="validate"  >
						<label for="username">Name</label>
					</div>
				</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat modal-close" onclick='component.addMember(${key})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			userList.innerHTML = html;
		}
		addMember(key){
			let add = document.getElementById("username");
			let val = add.value;
			let check = 0;
			let userIdKey;
			let data = {};
			let groupdummy = this.group;
			if(val == ""){
				this.readMembers(key);
			}
			else if(val != this.group[key].admin.user){
				console.log("Success YES");
				

				let userBase = firebase.database().ref('/user/').once('value', 
			      (userSnapId)=>{
			      	//console.log(userSnapId.numChildren());
			      	let count = 1;
			        userSnapId.forEach(function(snapshot) {

			        	if(val == snapshot.val().user){
			        	console.log(val + "   " + snapshot.val().user)
			        		
			        		let userGroupBase = firebase.database().ref('/group/'+groupdummy[key].keyId+'/users/').once('value', 
			      				(userGroupSnapId)=>{
			      					userGroupSnapId.forEach(function(childSnapshot){
			      						if(childSnapshot.val().user == val){
			      							console.log("THIIIS " + childSnapshot.val().user + "  " + val);
			      							check = 1;
			      						}
			      					});
			      				});

			        		userIdKey = snapshot.val().id
			        		data = {
			        			id: snapshot.val().id,
			        			user: snapshot.val().user,
			        			fname: snapshot.val().fname,
			        			lname: snapshot.val().lname

			        		}
			        	}
			        	else{
			        		if(count == userSnapId.numChildren()){
			        			check = -1;
			        		}
			        		console.log("What?");
			        		count++
			        	}
			        }); 
					console.log(check);
					if(check==0){
						
						let snapId;
						let userOwnerId = this.userOwner[0].id;
						
						//let groupid = firebase.database().ref().child('/user/').push().key; 
				
					  
					    let updates = {};
					    updates['/group/'+this.group[key].keyId+'/users/'+userIdKey] = data;
					    firebase.database().ref().update(updates);
					    console.log(data);
						Materialize.toast('Member is added', 4000);


						// this.group[key].users.push(member);
						// console.log(member.user);
					 // 	if(this.group[key].users[0].user==""){
						// 	component.deleteMember(key, 0);
						// 	Materialize.toast('User not found', 4000);
						// }
						
						this.readMembers(key);
				
					}
					else if(check>0){
						Materialize.toast('This user is already exist', 4000);
						this.readMembers(key);
						

					}
					else{
						
						Materialize.toast('User not found', 4000);
					}  
					
	  			});
				
				
			}
			else{
				console.log("NOOOOOOOO");
				this.readMembers(key);
			}
			
		}
		deleteMember(key, id){ 
			console.log(this.userOwner[0].id);
			if(this.userOwner[0].id == id){
				component.groupPage();
				firebase.database().ref().child('/group/'+this.group[key].keyId+'/users/'+id).remove();
				console.log("That");
			}
			else{
				firebase.database().ref().child('/group/'+this.group[key].keyId+'/users/'+id).remove();
				this.readMembers(key);
				console.log("This");
			}
			
			console.log("Deleted");

		}

		removeMemberConfirmation(key, id){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">Are you sure you want to remove this member?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.deleteMember(${key}, \""+"${id}"+"\")"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}

		editoptionBottomModalMember(key, id){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
						  <a href="#modal2" onclick='component.removeMemberConfirmation(${key}, \""+"${id}"+"\")' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">Remove member</a>
					    </div>
				`;			
			
				option.innerHTML = html;
		}


//Itinerary
	//Home
		startTime(){
			if(timeEnabled == false){
				timeEnabled = true;
				setInterval(function(){ 
					let today = new Date();
				    let h = today.getHours();
				    let m = today.getMinutes();

				    if(h > 5 && h < 18){
			    		$(function () {$("#planHeadBackground").css("background-image", "url('images/itinerary/morning.gif')");});
			    		$(function () {$("#planHeadBackground").css("background-position", "50% 30%");});
			    		$(function () {$(".planHeadText").css("color", "#000");});
			    		$(function () {$("#planHeadDivider").css("border", "1px dashed #000");});
			    		$(function () {$("#planHeadBackground").css("text-shadow", "2px 2px #fff");});	
			    		
				    
				    	
				    }
				    else{
			    		$(function () {$("#planHeadBackground").css("background-image", "url('images/itinerary/night.gif')");});
			    		$(function () {$("#planHeadBackground").css("background-position", "50% 25%");});
			    		$(function () {$(".planHeadText").css("color", "#fff");});
			    		$(function () {$("#planHeadDivider").css("border", "1px dashed #fff");});
			    		$(function () {$("#planHeadBackground").css("text-shadow", "2px 2px #0e1625");});	
			    		
				    	
				    }
				    let day = today.getDay();
				    day = component.checkDay(day);

				    let d = today.getDate();
				    let month = today.getMonth();

				    month = component.checkMonth(month);
				    let year = today.getFullYear();
				    m = component.checkTimeZero(m);
					let ampm = component.checkAMPM(h);
					h = component.checkTimeHour(h);
					h = component.checkTimeZero(h);

					let timeVal = day+", "+h+":"+m+" "+ampm+"<br><span style='font-size:15pt;'>"+month+" "+d+", "+year  +"</span>";
				    document.getElementById("displayheadplantext").innerHTML = timeVal;
			    }, 250);

			}
		   //setInterval(function(){ console.log("Time");}, 1000);
		}

		checkDay(value){
			if(value == 0)
				return "Sun";
			else if(value == 1)
				return "Mon";
			else if(value == 2)
				return "Tue";
			else if(value == 3)
				return "Wed";
			else if(value == 4)
				return "Thu";
			else if(value == 5)
				return "Fri";
			else
				return "Sat";
		}

		checkMonth(value){

			if(value==0){
				return "Jan";
			}
			else if(value==1){
				return "Feb";
			}
			else if(value==2){
				return "Mar";
			}
			else if(value==3){
				return "Apr";
			}
			else if(value==4){
				return "May";
			}
			else if(value==5){
				return "Jun";
			}
			else if(value==6){
				return "Jul";
			}
			else if(value==7){
				return "Aug";
			}
			else if(value==8){
				return "Sep";
			}
			else if(value==9){
				return "Oct";
			}
			else if(value==10){
				return "Nov";
			}
			else if(value==11){
				return "Dec";
			}
		}

		

		displaytitlehead(){
				//console.log(this.planview[0].name);
				if(this.planview[0] != ''){
						let titlehead = document.getElementById("planHeadName");
						titlehead.innerHTML = this.planview[0].name;
						//console.log(this.planview[0].name);

				}
		}

		readTravelDetailsDisplay(){
			let check = "";
			let check2 = "";
			
			
			//console.log(this.activity[key].category[key2].catitems[check].photo);
			let travelDetails = document.getElementById("modal1");
			let html = `<div class="modal-content row" id="traveldetails">


					<div class="col s12">
						<label for="travelName">Name</label><br>
						${this.planview[0].name}<br>
						
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelDesc">Description</label><br>
						${this.planview[0].desc}<br>	
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelStartDate">Start Date</label><br>
						${this.planview[0].startdate}<br>
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelEndDate">End Date</label><br>
						${this.planview[0].enddate}
					</div>


					<div class="divider col s12"></div>

	
				</div>
				
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>
				`;
				travelDetails.innerHTML = html;
		}

		sortDateItineraryPlanView(){
			for(let i = 0; i<this.planview[0].plan.length;i++){
				this.planview[0].plan[i].date = component.breakStr(this.planview[0].plan[i].date);
				this.planview[0].plan[i].date = this.planview[0].plan[i].date + " " + this.planview[0].plan[i].time
			}
			if(this.planview[0].plan != ""){
				this.planview[0].plan.sort(component.predicateBy("date"));
				for(let i = 0; i < this.planview[0].plan.length;i++){
					this.planview[0].plan[i].date = component.dateFormDDMMYY(this.planview[0].plan[i].date);
				}
			}
			let x;
		}

		displayPlanList(){

			let viewPlan = document.getElementById("displayplan");
			let headPlan = document.getElementById("displayheadplan");
			let html = ``;
			let html2 = ``;
			let count = 0;
			let sortdatearr = [];
			if (this.planview[0].name == ''){
				html = `<div id="planHeadBackground">
					<div id="headBackCont">
						<h5 class="planHeadText" id="displayheadplantext" onload='${component.startTime()}'></h5>
						
					</div>
				</div>`;


				html2 = `<div id="noActPlan" class="container row center">
					<img src="images/itinerary/clock_logo.png"><br>
					<span>No Plans</span><br>
					<div id="noActButton" onclick="component.travelPage()" class="waves-light waves-effect btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Manage Travels
					</div>
				</div>`;
			}
			else{
				if(this.planview[0].plan!=""){
					component.sortDateItineraryPlanView();
					html = `<div id="planHeadBackground" class="container">
						<div id="headBackCont" class="row">
							<h5 id="displayheadplantext" style="margin-bottom:20px" class="planHeadText" onload='${component.startTime()}'></h5>
							<div class="container center" id="planHeadDivider" style="width: 100px; "></div>
							<h5 id="planHeadName" style="color:#fff" class="planHeadText">${this.planview[0].name}</h5>`;

							if(this.planview[0].enddate != ""){
								html+=`
									<h6 class="planHeadText" style="color:#fff">(${this.planview[0].startdate} - ${this.planview[0].enddate})</h6>`;
							}
							else{
								html +=`
								<h6 class="planHeadText" style="color:#fff">(${this.planview[0].startdate})</h6>`;
							}
					html+= `
						</div>
					</div>`;

					html2 = `
					<div class="container" id="displaycontainer">			
						<ul id="planList" style="top:0px" class="row">`;
						let con = true;
						let x = 0;
						if(this.planview[0].plan.length!=0){
							while(con){
								sortdatearr[x]=this.planview[0].plan[0].date;
								for(let i=1;i<this.planview[0].plan.length;){
									
									if(sortdatearr[x]==this.planview[0].plan[i].date){
										i++;
										continue
										
									}
									else if(sortdatearr[x]!=this.planview[0].date){
										x++;
										sortdatearr[x]=this.planview[0].plan[i].date;
									}
								}
								
								
								con = false;
							}
						}
						for(let x=0;x<sortdatearr.length;x++){
							html2 += `
								<span style="position:relative;color:#fff;font-size:10pt;float:right;margin-top:5px">${sortdatearr[x]}</span><br>
								<div class="divider col s12"></div><br>
							`;
							for(let i=0;i<this.planview[0].plan.length;i++){
								if(sortdatearr[x] == this.planview[0].plan[i].date){
									let checkPlanBool = "";
									if(this.planview[0].plan[i].isChecked == true){
										checkPlanBool = "checked";
									}

									html2 += `<li>
											<a  id="travelNames" class="waves-effect col s6">
												<span class="badge" id="checkbuttonPlan"><input type="checkbox" style="z-index: 999" id="checkPlan${count}" ${checkPlanBool} onclick='component.itineraryPageChecklist(${this.planview[0].plan[i].isChecked},${i})' value="3"/><label for="checkPlan${count}"></label></span>
												<span style="float:right;position:relative;margin-right:25px"><span style="font-size:12pt" href="#modal1" class="modal-trigger" onclick='component.readPlanViewDetails(${i})'>${this.planview[0].plan[i].name}</span><br>
												</span>
												<span style="float:left;font-size:12pt" href="#modal1" class="modal-trigger" onclick='component.readPlanViewDetails(${i})'>${this.planview[0].plan[i].time}</span>
												
											</a>
											<div id="traveldivide" style="margin-bottom:5px; top:0" class="divider col s12"></div>
										</li>`;
									count++;
								}
							}
						}
					
					html2 += `
						</ul>
						</div>
								`;
				}
				else{
					html = `<div id="planHeadBackground" class="container">
						<div id="headBackCont" class="row">
							<h5 id="displayheadplantext" style="margin-bottom:20px" class="planHeadText" onload='${component.startTime()}'></h5>
							<div class="container center" id="planHeadDivider" style="width: 100px; "></div>
							<h5 id="planHeadName" style="color:#fff" class="planHeadText">${this.planview[0].name}</h5>`;

							if(this.planview[0].enddate != ""){
								html+=`
									<h6 class="planHeadText" style="color:#fff">(${this.planview[0].startdate} - ${this.planview[0].enddate})</h6>`;
							}
							else{
								html +=`
								<h6 class="planHeadText" style="color:#fff">(${this.planview[0].startdate})</h6>`;
							}
					html+= `
						</div>
					</div>`;
					html2 = `<div id="noActPlan" class="container row center">
					<img src="images/itinerary/clock_logo.png"><br>
					<span>No Plans</span><br>
					<div id="noActButton" onclick="component.travelPage()" class="waves-light waves-effect btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Manage Travels
					</div>
					</div>`;
				}
				
			}
			headPlan.innerHTML = html;
			viewPlan.innerHTML = html2;

		}
		notifyPlanTime(){


			for(let x=0;x<this.planview[0].plan.length;x++){
				let timeres = this.planview[0].plan[x].time.split(':');
				let hour = timeres[0];
				let minAMPM = timeres[1].split("");
				let min = minAMPM[0]+minAMPM[1];
				let ampm = minAMPM[2]+minAMPM[3];
				hour = component.timeParse(hour);
				min = component.timeParse(min);
				hour = component.checkTimeFormat(hour, ampm);

				let dateres = this.planview[0].plan[x].date.split(" ");
				let day = component.timeParse(dateres[0]);
				let month = component.monthFormInt(dateres[1]);
				let year = component.timeParse(dateres[2]);
				
				let name = this.planview[0].name;
				let planname = this.planview[0].plan[x].name;

				cordova.plugins.notification.local.schedule({
					id: x,
				    title: planname,
				    text: name,
				    trigger: { at: new Date(year, month, day, hour, min) }
				});
			}
		}

		timeParse(value){
			let timeForm = parseInt(value);
			return timeForm;
		}

		monthFormInt(value){
			value = value.replace(',',"");

			if(value=="January"){
				return 0;
			}
			else if(value=="February"){
				return 1;
			}
			else if(value=="March"){
				return 2;
			}
			else if(value=="April"){
				return 3;
			}
			else if(value=="May"){
				return 4;
			}
			else if(value=="June"){
				return 5;
			}
			else if(value=="July"){
				return 6;
			}
			else if(value=="August"){
				return 7;
			}
			else if(value=="September"){
				return 8;
			}
			else if(value=="October"){
				return 9;
			}
			else if(value=="November"){
				return 10;
			}
			else if(value=="December"){
				return 11;
			}
		}

		checkTimeFormat(hour, ampm){
			if(ampm=="AM"){
				if(hour == 12){
					return 0;
				}
				else{
					return hour;
				}
			}
			else{
				if(hour==12){	
					return hour;
				}
				else{
					let hourForm = hour+12;
					return hourForm;
				}
			}
		}

		readPlanViewDetails(key){
			
			let itemDetailsList = document.getElementById("modal1");
			let check = "";
			let valueCheck = false

			
			let html = `<div class="modal-content row" id="plandetails">
				  	<div class="col s12">
				  		<label class="active" for="planName">Name</label><br>
						${this.planview[0].plan[key].name}<br>
						
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label class="active" for="planDesc">Description</label><br>
						${this.planview[0].plan[key].desc}<br>
						
					</div>
					<div class="divider col s12"></div>
					
					<div class="col s12">
						<label for="planDate" class="active">Date</label><br>
						${this.planview[0].plan[key].date}<br>
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label class="active" for="planTime">Set Time</label><br>
						${this.planview[0].plan[key].time}<br>
					</div>  
					<div class="divider col s12"></div>

					<!--<div class="col s12">
						<label for="planSwitchNotify">Notify</label>
						<div id="planSwitchNotify" class="switch">
						    <label>
						      Off
						      <input id="planNotify" onclick='component.toNotifyPlan(${this.planview[0].plan[key].notify}, ${key})' type="checkbox" ${check} >
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div> -->
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Back</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}

		// toNotifyPlan(checkBool, key){
		// 	let keyId = this.planview[0].id;
		// 	let planId = this.planview[0].plan[key].id;
		// 	let arrLength = this.planview[0].plan.length;
		// 	let request = indexedDB.open('mybackpackDB', 1);
		// 		let db = "";
		// 		request.onsuccess = function(e){
		// 			db = e.target.result;

		// 			let transaction = db.transaction(['planDispData'], "readwrite");
		// 			let store = transaction.objectStore('planDispData');
		// 			let requestKey = store.get(keyId);
					
				
		// 			requestKey.onsuccess = function(e){
		// 				let data = requestKey.result;
		// 				for(let i=0; i<arrLength;i++){
		// 					if(data.plan[i].id == planId){
		// 						if(checkBool == false){
		// 							data.plan[i].notify = true;
		// 						}
		// 						else{
		// 						data.plan[i].notify = false;
		// 						}
		// 					}
		// 				}
		// 				let requestUpdate = store.put(data);
				
		// 				requestUpdate.onsuccess = function(e){

		// 					component.getPlanDispData();
		// 					console.log("Plan is updated.");
		// 				}
		// 				requestUpdate.onerror = function(e){
		// 					console.log("Error in renaming activity.");
		// 				}
		// 			}
		// 			requestKey.onerror = function(e){
		// 				console.log("Error in updating data.");
		// 			}
		// 		}
				

		// 		request.onerror = function(e){

		// 			console.log('Error!');
		// 		}
		// }
		getAllDataItinerary(key){
			let itinArr = this.itinerary[key];
			let itinId = this.itinerary[key].id;
			let planArr = [];
			if(this.planview[0].name != ""){
				component.removeTravel();
			}
			//console.log(this.itinerary[key].checklist);
			//console.log(this.activity[0].id);
			if(this.itinerary[key].setChecklistSwitch == true){
				component.getActivityData();
				for(let z=0;z<this.activity.length;z++){
					if(this.itinerary[key].checklist == this.activity[z].id){
						component.getAllData(z);
					}
				}
			}
			
			
			//if(this.activity[])
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planItin'], "readonly");
				let store = transaction.objectStore('planItin');
				let index = store.index('name');
				
				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						if(cursor.value.itinId == itinId){
							planArr.push({"name":cursor.value.name,"desc":cursor.value.desc,"date":cursor.value.date,"time":cursor.value.time, "isChecked":false, "id":cursor.value.id, "itinId":cursor.value.itinId});
						}
						cursor.continue();
					}
					else{
						itinArr.plan = planArr;
						console.log(itinArr);
						component.setTravel(itinArr);
					}
				}
			}
		}

		setTravel(itinArr){
	

			let valName = itinArr.name;
			let valDesc = itinArr.desc;
			let valStartDate = itinArr.startdate;
			let valEndDate = itinArr.enddate;
			let valPlan = itinArr.plan;

			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['planDispData'], "readwrite");
					let store = transaction.objectStore('planDispData');
					let requestKey = store.get(1);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						data.name = valName;
						data.desc = valDesc;
						data.startdate = valStartDate;
						data.enddate = valEndDate;
						data.plan = valPlan;

						let requestUpdate = store.put(data);

						requestUpdate.onsuccess = function(e){
							Materialize.toast('Travel set', 1500);
							component.getPlanDispDataSet();

							console.log("Travel is set.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in setting travel.");
						}
					}
					requestKey.onerror = function(e){
						console.log("Error in updating data.");
					}
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}
			
			
		}

		itineraryPageChecklist(checkBool, key){
			let count = 0;
			let check = 0;
			console.log(this.planview[0].plan[key].name);
			//console.log(checkBool);
			let keyId = this.planview[0].id;
			let planId = this.planview[0].plan[key].id;
			let arrLength = this.planview[0].plan.length;
			let request = indexedDB.open('mybackpackDB', 1);
				let db = "";
				request.onsuccess = function(e){
					db = e.target.result;

					let transaction = db.transaction(['planDispData'], "readwrite");
					let store = transaction.objectStore('planDispData');
					let requestKey = store.get(keyId);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						//console.log(data.plan[key].id + " " + planId);
						console.log(data.plan[key].name);
						for(let i=0; i<arrLength;i++){
							if(data.plan[i].id == planId){
								if(checkBool == false){
									data.plan[i].isChecked = true;
								}
								else{
								data.plan[i].isChecked = false;
								}
							//console.log("Correct");
							}
						}
						
						
						

						let requestUpdate = store.put(data);
				
						requestUpdate.onsuccess = function(e){

							component.getPlanDispData();
							console.log("Plan is updated.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in renaming activity.");
						}
					}
					requestKey.onerror = function(e){
						console.log("Error in updating data.");
					}
				}
				

				request.onerror = function(e){

					console.log('Error!');
				}

			// this.planview[0].plan[key].isChecked = document.getElementById("checkPlan"+count).checked;
			// console.log(this.planview[0].plan[key].isChecked);
		}
		removeTravel(){
			
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planDispData'], "readwrite");
				let store = transaction.objectStore('planDispData');

				let requestKey = store.get(1);
					
				
					requestKey.onsuccess = function(e){
						let data = requestKey.result;
						
						data.name = "";
						data.desc ="";
						data.enddate = "";
						data.startdate = "";
						data.plan = [];
						let requestUpdate = store.put(data);

						requestUpdate.onsuccess = function(e){
							Materialize.toast('Set travel is removed', 1500);
							component.getPlanDispData();
							console.log("Set travel is removed.");
						}
						requestUpdate.onerror = function(e){
							console.log("Error in renaming travel.");
						}
					}
			}
			for(let x=0;x<this.planview[0].plan.length;x++){
				cordova.plugins.notification.local.cancel(x, callback);
			}
		}
	//Itinerary

		getItineraryData(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityItin'], "readonly");
				let store = transaction.objectStore('activityItin');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name,"desc":cursor.value.desc,"startdate":cursor.value.startdate,"enddate":cursor.value.enddate, "setChecklistSwitch":cursor.value.setChecklistSwitch,"checklist":cursor.value.checklist,"timenotify":cursor.value.timenotify, "plan":[], "id":cursor.value.id});
						cursor.continue();
					}
					component.itineraryPush(dummyAct);

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}
		itineraryPush(itval){
			
			this.itinerary = itval;
			console.log(this.itinerary);
			component.readTravelList();

			
		}
		readTravelList(){
			component.arraySortItinerary();
			let travelList = document.getElementById("travelcontchild");
			//setInterval(function(){ console.log("A Kiss every 5 seconds"); }, 1000);
			let html = `<ul id="planList" class="row">`;
			for(let i=0;i<this.itinerary.length;i++){
				html += `
					<li>
						<a href="#" id="travelNames" class="waves-effect col s6" onclick='component.planPage(${i})'>
							<span style="font-size:12pt">${this.itinerary[i].name}</span><br>
							${this.itinerary[i].startdate} - ${this.itinerary[i].enddate}

							<a href="#bottommodal" onclick='component.editTravelButtonPop(${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
							<div id="traveldivide" class="divider col s12"></div>
						</a>
					</li>

				<br>
				`;
			}
			html += `</ul>`;
			if(this.itinerary == ""){
				html += `

				<div id="noAct" class="container row center" style="top:0">
					<img src="images/itinerary/clock_logo.png"><br>
					<span>No Travels</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal1" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.addTravelInput()'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html += `
				
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal1" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.addTravelInput()'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}
			travelList.innerHTML = html;	
		}
		readTravelDetails(key){
			let check = "";
			let check2 = "";
			if(this.itinerary[key].setChecklistSwitch == true){
				check="checked";
				$(function () {$("#travelChecklistDrop").css("display", "block");});
			}
			else{
				check=""
				$(function () {$("#travelChecklistDrop").css("display", "none");});
			}
			
			//console.log(this.activity[key].category[key2].catitems[check].photo);
			let travelDetails = document.getElementById("modal1");
			let html = `<div class="modal-content row" id="traveldetails">


					<div class="col s12">
						<label for="travelName">Name</label><br>
						${this.itinerary[key].name}<br>
						
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelDesc">Description</label><br>
						${this.itinerary[key].desc}<br>	
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelStartDate">Start Date</label><br>
						${this.itinerary[key].startdate}<br>
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label for="travelEndDate">End Date</label><br>
						${this.itinerary[key].enddate}
					</div>
					<div class="divider col s12"></div>
					<div class="col s12">
						<label for="setChecklist">Automatically Set Checklist</label>
						<div id="travelCheck" class="switch">
						    <label>
						      Off
						      <input id="checkChecklistMenu" disabled type="checkbox" ${check} onclick="component.setChecklistShowMenu()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div>
					<div id="travelChecklistDrop" class="col s12">
						<label for="travelChecklistDrop">Checklist</label><br>
						${this.itinerary[key].checklist}
					</div>

					<div class="divider col s12"></div>

					<!--<div class="col s12">
						<label for="travelAlarm">Automatically Set Travel</label>
						<div id="travelAlarm" class="switch">
						    <label>
						      Off
						      <input id="checkTimeMenu" disabled  ${check2} type="checkbox" onclick="component.setTravelSwitch()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div>
					<div id="travelAlarmTime" class="col s12">
						<label for="travelAlarmTime">Time</label><br>
						${this.itinerary[key].timenotify}
					</div>
					<div class="divider col s12"></div>-->
				</div>
				
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="modal-action waves-effect waves-green btn-flat" onclick='component.editTravelInput(${key})'>Edit</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick='component.deleteTravel(${key})'>Delete</a>
				</div>
				`;
				travelDetails.innerHTML = html;
		}

		editTravelButtonPop(key){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = ``;
			
			if(this.planview[0].name==""){
				html = `<div id="modalOption">
						  <a href="#!" onclick='component.getAllDataItinerary(${key})' id="viewActbutton" class="modal-action modal-close waves-effect waves">Set travel</a>
					      <a href="#modal1" onclick='component.readTravelDetails(${key})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">View details</a>
					      <a href="#modal1" onclick='component.editTravelInput(${key})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">Edit travel</a>
					      <a href="#!" onclick='component.deleteTravel(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete travel</a>
					    </div>
				`;
			}
			else{
				html = `<div id="modalOption">
						  <a href="#modal2" onclick='component.travelConfirmationSet(${key})' id="viewActbutton" class="modal-action modal-trigger modal-close waves-effect waves">Set travel</a>
					      <a href="#modal1" onclick='component.readTravelDetails(${key})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">View details</a>
					      <a href="#modal1" onclick='component.editTravelInput(${key})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">Edit travel</a>
					      <a href="#!" onclick='component.deleteTravel(${key})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete travel</a>
					    </div>
				`;
			}
			
				option.innerHTML = html;
		}
		travelConfirmationSet(key){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">Another travel has been set. Are you sure to replace the set travel?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.getAllDataItinerary(${key})"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}
		travelConfirmation(key){
			let option = document.getElementById("modal2");
			let html = `
						<div style="overflow:none" class="row center">
						<h6 id="confirmHead" class="container">A travel has been set. Are you sure to remove the set travel?</h6>
							<a href="#!" id="confirmModal" class="waves-effect btn" style="width:100%" onclick="component.removeTravel()"><h5 style="color:#000000">Yes</h5></a><br>
							<a href="#!" id="confirmModal" class="waves-effect modal-close btn" style="width:100%"><h5 style="color:#000000">No</h5></a>
						</div>
				`;
				option.innerHTML = html;
		}
		optionItineraryHomeMenu(){	
			let option = document.getElementById("bottommodal");
			let act = this.planview[0].name;
			let html = ``;
			if(act==""){
				html = `<div id="modalOption">
					      <a href="#!" onclick='component.travelPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to travel page</a>
					      <a href="#!" onclick='component.removeTravel()'id="viewActbutton" class="modal-action modal-close waves-effect waves btn disabled">Remove set travel</a>
					    </div>
				`;
			}
			else{
				html = `<div id="modalOption">
						  <a href="#modal1" onclick='component.readTravelDetailsDisplay()' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves btn">View details</a>
					      <a href="#!" onclick='component.travelPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Go to travel page</a>
					      <a href="#modal2" onclick='component.travelConfirmation()' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves btn">Remove set travel</a>
					    </div>
				`;
			}
			
				option.innerHTML = html;
		}
		optionItineraryMenu(){
			console.log("it");
			let option = document.getElementById("bottommodal");
			let html = ``;
			if(this.planview[0].name==""){
				html = `<div id="modalOption">
						      <a href="#!" onclick='component.itineraryPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">View set travel</a>
						      <a href="#!" onclick='component.actConfirmation()'id="viewActbutton" class="modal-action modal-close waves-effect waves btn disabled">Remove set travel</a>
						    </div>
					`;
			}
			else{
				html = `<div id="modalOption">
						      <a href="#!" onclick='component.itineraryPage()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">View set travel</a>
						      <a href="#modal2" onclick='component.actConfirmation()' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves btn">Remove set travel</a>
						    </div>
					`;
					
			}
			option.innerHTML = html;
		}
		addTravelInput(){
			
			let itemDetailsList = document.getElementById("modal1");
			let check = 0;

			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Clear', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});
			$(function () {$(".picker__clear").css("display", "block");});
			let html = `<div class="modal-content" id="traveldetails">
			<form class="row">
					<div class="input-field col s12">
						<input id="travelName"  type="text"  class="validate"  >
						<label for="travelName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="travelDesc"  type="text"  class="validate" >
						<label for="travelDesc">Description</label>
					</div>
					<div class="input-field col s12"><label for="travelStartDate">Start Date</label>
					<input id="travelStartDate" type="text" class="datepicker"></div>
					<div class="input-field col s12"><label for="travelEndDate">End Date</label>
					<input id="travelEndDate" type="text" class="datepicker"></div>
					<div class="col s12">
						<label for="setChecklist">Automatically Set Checklist</label>
						<div id="travelChecklist" class="switch">
						    <label>
						      Off
						      <input id="checkChecklistMenu" type="checkbox" onclick="component.setChecklistShowMenu()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div>
					<div class="input-field col s12" id="checklistDrop">
					    <select id="checklistDropDown">
					      <option value="" disabled selected>Choose a checklist</option>`;

					      for(let x=0;x<this.activity.length;x++){
					      	html += `<option value='${this.activity[x].id}'>${this.activity[x].name}</option>`;
					      }

				html += `
					    </select>
					    
					</div>
					<!--<div class="col s12">
						<label for="travelAlarmNotify">Automatically Set Travel</label>
						<div id="travelAlarmNotify" class="switch">
						    <label>
						      Off
						      <input id="checkTimeMenu" type="checkbox" onclick="component.setTravelSwitch()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div> 
					<div id="setTravelAlarm" class="input-field col s12"><label for="travelAlarm">Set Time</label>
					<input id="travelAlarm" type="text" class="timepicker"></div>  -->
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.addTravel()'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}
		setChecklistShowMenu(){
			let box = document.getElementById("checkChecklistMenu");
			if(box.checked == true){
				$('#checklistDrop').show();
			}
			else{
				$('#checklistDrop').hide();
			}
		}
		setTravelSwitch(){
			let time = document.getElementById("checkTimeMenu");
			if(time.checked == true){
				$('#setTravelAlarm').show();
			}
			else{
				$('#setTravelAlarm').hide();
			}
		}
		editTravelInput(key){
			let itemDetailsList = document.getElementById("modal1");
			let check = "";
			let check2 = "";
			if(this.itinerary[key].setChecklistSwitch == true){
				check="checked";
				$(function () {$('#checklistDrop').show();});
			}
			
			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Clear', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});
			

			$(function () {$(".picker_clear").css("display", "block");});
			let html = `<div class="modal-content" id="traveldetails">
			<form class="row">
					  <div class="input-field col s12">
						<input id="travelName"  type="text" value="${this.itinerary[key].name}" class="validate"  >
						<label class="active" for="travelName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="travelDesc"  type="text" value="${this.itinerary[key].desc}" class="validate" >
						<label class="active" for="travelDesc">Description</label>
					</div>
					<div class="input-field col s12"><label class="active" for="travelStartDate">Start Date</label>
					<input id="travelStartDate" type="text" value="${this.itinerary[key].startdate}" class="datepicker"></div>
					<div class="input-field col s12"><label class="active" for="travelEndDate">End Date</label>
					<input id="travelEndDate" type="text" value="${this.itinerary[key].enddate}" class="datepicker"></div>
					<div class="col s12">
						<label for="setChecklist">Automatically Set Checklist</label>
						<div id="travelChecklist" class="switch">
						    <label>
						      Off
						      <input id="checkChecklistMenu" type="checkbox" ${check} onclick="component.setChecklistShowMenu()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div>
					<div class="input-field col s12" id="checklistDrop">
					    <select id="checklistDropDown">
					      <option value="" disabled selected>Choose a checklist</option>`;

					      for(let x=0;x<this.activity.length;x++){
					      	if(this.activity[x].name==this.itinerary[key].checklist){
					      		html += `<option selected value='${this.activity[x].name}'>${this.activity[x].name}</option>`;
					      	}
					      	else{
					      		html += `<option value='${this.activity[x].name}'>${this.activity[x].name}</option>`;
					      	}
					      	
					      }

				html += `
					    </select>
					    
					</div>
					<!--<div class="col s12">
						<label for="travelAlarmNotify">Automatically Set Travel</label>
						<div id="travelAlarmNotify" class="switch">
						    <label>
						      Off
						      <input id="checkTimeMenu" type="checkbox" ${check2} onclick="component.setTravelSwitch()">
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div> 
					<div id="setTravelAlarm" class="input-field col s12"><label for="travelAlarm" class="active">Set Time</label>
					<input id="travelAlarm" type="text" value="${this.itinerary[key].timenotify}" class="timepicker"></div>  -->
					</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.editTravel(${key})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}
		addTravel(){
			let travelName = document.getElementById("travelName");
			let travelDesc = document.getElementById("travelDesc");
			let travelStartDate = document.getElementById("travelStartDate");
			let travelEndDate = document.getElementById("travelEndDate");
			let checklistDropDown = document.getElementById("checklistDropDown").value;
			//let travelAlarm = document.getElementById("travelAlarm").value;
			let checkChecklistMenu = document.getElementById("checkChecklistMenu").checked;
			//let checkTimeMenu = document.getElementById("checkTimeMenu");
			if(checkChecklistMenu == false){
				checklistDropDown = "";
			}
			else{
				if(checklistDropDown == ""){
					checkChecklistMenu = false;
					console.log("Empty checklist");
				}
					
			}
			// if(checkTimeMenu.checked == false){
			// 	travelAlarm = "";
			// }
			if(travelName.value!=""){
				//let travel = {"name":travelName.value,"desc":travelDesc.value,"startdate":travelStartDate.value,"enddate":travelEndDate.value, "setChecklistSwitch":checkChecklistMenu.checked,"checklist":checklistDropDown,"notify":checkTimeMenu.checked,"timenotify":travelAlarm, "plan":[]};
				let check = 0;


				for(let i=0;i<this.itinerary.length;i++){
					if(travelName.value==this.itinerary[i].name){
						check=1;
					}

					
				}
				if(travelStartDate.value==""){
						check = 2;
					}

				if(check == 2){
					Materialize.toast('Please fill the starting date.', 4000);
				}
				else if(check==0){
					
					
					let request = indexedDB.open('mybackpackDB', 1);
						let db = "";
						request.onsuccess = function(e){
							db = e.target.result;

							let transaction = db.transaction(['activityItin'], "readwrite");
							let store = transaction.objectStore('activityItin');
							
							let itinerary = {
								name: travelName.value,
								desc: travelDesc.value,
								startdate: travelStartDate.value,
								enddate: travelEndDate.value,
								setChecklistSwitch: checkChecklistMenu,
								checklist: checklistDropDown,
								timenotify: "",
								plan: []

							}
							
							let addRequest = store.add(itinerary);
							addRequest.onsuccess = function(e){
								component.getItineraryData();
							}
							addRequest.onerror = function(e){
								console.log("Error in storing data.");
							}
						}
						

						request.onerror = function(e){

							console.log('Error!');
						}
					$('#modal1').modal('close');
					this.readTravelList();
					//this.timeSetTravel();
				}
				else if(check<0){
					$('#modal1').modal('close');
					this.readTravelList();
				}
				else{
					Materialize.toast('This travel already exists', 4000);
				} 
			}
			else{
				this.readTravelList();
			}
		}
		getItineraryDataRefresh(){
			let itinerary = this.itinerary;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			console.log(this.itinerary);
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityItin'], "readonly");
				let store = transaction.objectStore('activityItin');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name,"desc":cursor.value.desc,"startdate":cursor.value.startdate,"enddate":cursor.value.enddate, "setChecklistSwitch":cursor.value.setChecklistSwitch,"checklist":cursor.value.checklist, "timenotify":cursor.value.timenotify, "plan":[], "id":cursor.value.id});
						cursor.continue();
					}
					else{
						//component.itineraryPushRefreshSet(dummyAct);
					}				
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}
		itineraryPushRefreshSet(itval){
			
			this.itinerary = itval;
		}

		editTravel(key){
			let travelName = document.getElementById("travelName");
			let travelDesc = document.getElementById("travelDesc");
			let travelStartDate = document.getElementById("travelStartDate");
			let travelEndDate = document.getElementById("travelEndDate");
			let checklistDropDown = document.getElementById("checklistDropDown").value;
			//let travelAlarm = document.getElementById("travelAlarm").value;
			let checkChecklistMenu = document.getElementById("checkChecklistMenu");
			//let checkTimeMenu = document.getElementById("checkTimeMenu");
			if(checkChecklistMenu.checked == false){
				checklistDropDown = "";
			}
			// if(checkTimeMenu.checked == false){
			// 	travelAlarm = "";
			// }
			

	
			//let travel = {"name":travelName.value,"desc":travelDesc.value,"startdate":travelStartDate.value,"enddate":travelEndDate.value,"setChecklistSwitch":checkChecklistMenu.checked,"checklist":checklistDropDown,"notify":checkTimeMenu.checked,"timenotify":travelAlarm, "plan":""};
			

			
			if(travelName.value!=""){

				let check = 0;

				for(let i=0;i<this.itinerary.length;i++){
					if(travelName.value==this.itinerary[key].name){
						break;
					}
					else if(travelName.value==this.itinerary[i].name){
						check++;
					}
				}

				if(check==0){

					let keyId = this.itinerary[key].id;
				  		console.log(keyId);
						let request = indexedDB.open('mybackpackDB', 1);
							let db = "";
							request.onsuccess = function(e){
								db = e.target.result;

								let transaction = db.transaction(['activityItin'], "readwrite");
								let store = transaction.objectStore('activityItin');
								let requestKey = store.get(keyId);
								
							
								requestKey.onsuccess = function(e){
									let data = requestKey.result;

									data.name = travelName.value;
									data.desc = travelDesc.value;
									data.startdate = travelStartDate.value;
									data.enddate = travelEndDate.value;
									data.setChecklistSwitch = checkChecklistMenu.checked;
									data.checklist = checklistDropDown;
									//data.notify = checkTimeMenu.checked;
									//data.timenotify = travelAlarm;

									let requestUpdate = store.put(data);

									requestUpdate.onsuccess = function(e){
										component.getItineraryData();
										$('#modal1').modal('close');
										console.log("Itinerary is renamed.");
									}
									requestUpdate.onerror = function(e){
										console.log("Error in renaming itinerary.");
									}
								}
								requestKey.onerror = function(e){
									console.log("Error in updating data.");
								}
							}
							

							request.onerror = function(e){

								console.log('Error!');
							}

	
				}
				else if(check<0){
					$('#modal1').modal('close');
					this.readTravelList(key);
				}
				else{
					Materialize.toast('This travel already exists', 4000);
				} 
			}
			else{
				component.readTravelList;
			}
		}
		deleteTravel(key){ 

			let keyId = this.itinerary[key].id;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['activityItin'], "readwrite");
				let store = transaction.objectStore('activityItin');

				let deleteRequest = store.delete(keyId);
				deleteRequest.onsuccess = function(e){
					component.getItineraryData();
					console.log("Success in itinerary deletion.");
				}
				deleteRequest.onerror = function(e){
					console.log("Error in deleting data.");
				}
			}


		}
		breakStr(value){
			
			let res = value.split(" ");
			let year = res[2];
			let mon = component.monthForm(res[1]);
			let day = component.dayForm(res[0]);
			let dateForm = year+" "+mon+ " " + day;
			return dateForm;

		}
		dayForm(value){
			let num = parseInt(value);
			if(num<10){
				return "0"+num.toString();
			}
			else{
				return value;
			}
		}
		monthForm(value){
			value = value.replace(',',"");

			if(value=="January"){
				return "01";
			}
			else if(value=="February"){
				return "02";
			}
			else if(value=="March"){
				return "03";
			}
			else if(value=="April"){
				return "04";
			}
			else if(value=="May"){
				return "05";
			}
			else if(value=="June"){
				return "06";
			}
			else if(value=="July"){
				return "07";
			}
			else if(value=="August"){
				return "08";
			}
			else if(value=="September"){
				return "09";
			}
			else if(value=="October"){
				return "10";
			}
			else if(value=="November"){
				return "11";
			}
			else if(value=="December"){
				return "12";
			}
		}
		monthFormWord(value){

			if(value=="01"){
				return "January";
			}
			else if(value=="02"){
				return "February";
			}
			else if(value=="03"){
				return "March";
			}
			else if(value=="04"){
				return "April";
			}
			else if(value=="05"){
				return "May";
			}
			else if(value=="06"){
				return "June";
			}
			else if(value=="07"){
				return "July";
			}
			else if(value=="08"){
				return "August";
			}
			else if(value=="09"){
				return "September";
			}
			else if(value=="10"){
				return "October";
			}
			else if(value=="11"){
				return "November";
			}
			else if(value=="12"){
				return "December";
			}
		}
		dayFormNoZero(value){
			let num = parseInt(value);
			if(num<10){
				return num;
			}
			else{
				return value;
			}
		}
		dateFormDDMMYY(value){
			let res = value.split(" ");
			let year = res[0];
			let mon = component.monthFormWord(res[1]);
			let day = component.dayFormNoZero(res[2]);
			let dateForm = day + " " + mon +", "+year;
			return dateForm;

		}
		sortDateItinerary(key){
			for(let i = 0; i<this.itinerary[key].plan.length;i++){
				this.itinerary[key].plan[i].date = component.breakStr(this.itinerary[key].plan[i].date);
				this.itinerary[key].plan[i].date = this.itinerary[key].plan[i].date + " " + this.itinerary[key].plan[i].time
			}
			if(this.itinerary[key].plan != ""){
				this.itinerary[key].plan.sort(component.predicateBy("date"));
				for(let i = 0; i < this.itinerary[key].plan.length;i++){
					this.itinerary[key].plan[i].date = component.dateFormDDMMYY(this.itinerary[key].plan[i].date);
				}
			}
			let x;
			for(let i = 0; i < this.itinerary[key].plan.length;i++){

			}
		}

	//Plan
		getPlanDispData(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planDispData'], "readonly");
				let store = transaction.objectStore('planDispData');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name, "desc":cursor.value.desc, "startdate":cursor.value.startdate, "enddate":cursor.value.enddate, "plan":cursor.value.plan, "id":cursor.value.id});
						cursor.continue();
					}
					else{
						component.planDispPush(dummyAct);
					}
					

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}
		planDispPush(planval){
			this.planview = planval;
			console.log(this.planview);
			component.displayPlanList();

			
			
		}
		getPlanDispDataSet(){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planDispData'], "readonly");
				let store = transaction.objectStore('planDispData');
				let index = store.index('name');

				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						dummyAct.push({"name":cursor.value.name, "desc":cursor.value.desc, "startdate":cursor.value.startdate, "enddate":cursor.value.enddate, "plan":cursor.value.plan, "id":cursor.value.id});
						cursor.continue();
					}
					else{
						component.planDispPushSet(dummyAct);
					}
					

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}
		planDispPushSet(planval){
			this.planview = planval;
			console.log(this.planview);
			component.displayPlanList();
			component.notifyPlanTime();

			
			
		}
		getPlanData(key){
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			let dummyAct = [];
			let itinId = this.itinerary[key].id;
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planItin'], "readonly");
				let store = transaction.objectStore('planItin');
				let index = store.index('name');
				
				index.openCursor().onsuccess = function (e){
					let cursor = event.target.result;
					
					if(cursor){
						if(cursor.value.itinId == itinId){
							dummyAct.push({"name":cursor.value.name,"desc":cursor.value.desc,"date":cursor.value.date,"time":cursor.value.time,"isChecked":false, "id":cursor.value.id, "itinId":cursor.value.itinId});
						}
						cursor.continue();
					}
					component.planPush(key,dummyAct);

					
				}
				
			}
			

			request.onerror = function(e){

				console.log('Error!');
			}
		}
		planPush(key, planval){
			
			this.itinerary[key].plan = planval;
			component.readPlanList(key);
			
		}
		readPlanList(key){
			component.arraySortItinerary();
			let travelList = document.getElementById("plancontchild");
			//setInterval(function(){ console.log("A Kiss every 5 seconds"); }, 1000);
			let html = `<ul id="planList" class="row">`;
			let sortdatearr = [];

			component.sortDateItinerary(key);
			let con = true;
			let x = 0;
			if(this.itinerary[key].plan.length!=0){
				while(con){
					sortdatearr[x]=this.itinerary[key].plan[0].date;
					for(let i=1;i<this.itinerary[key].plan.length;){
						
						if(sortdatearr[x]==this.itinerary[key].plan[i].date){
							i++;
							continue
							
						}
						else if(sortdatearr[x]!=this.itinerary[key].date){
							x++;
							sortdatearr[x]=this.itinerary[key].plan[i].date;
						}
					}
					
					
					con = false;
				}
			}
			for(let x=0;x<sortdatearr.length;x++){
				html += `
					<span style="position:relative;color:#fff;font-size:10pt;float:right;margin-top:5px">${sortdatearr[x]}</span><br>
					<div class="divider col s12"></div>
				`;
				console.log(sortdatearr[x]+" "+x)
				for(let i=0;i<this.itinerary[key].plan.length;i++){
					if(sortdatearr[x] == this.itinerary[key].plan[i].date){
						html += `<li>
								<a href="#modal1" id="travelNames" class="waves-effect col s6 modal-trigger" onclick='component.readPlanDetails(${key},${i})'>
									<span style="float:right;position:relative;margin-right:40px"><span style="font-size:12pt">${this.itinerary[key].plan[i].name}</span><br>
									</span>
									<span style="float:left;font-size:12pt">${this.itinerary[key].plan[i].time}</span>
									<a href="#bottommodal" onclick='component.editPlanButtonPop(${key}, ${i})' id="optionbuttonAct" class="modal-trigger"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
									<div id="traveldivide" style="margin-bottom:5px" class="divider col s12"></div>
								</a>
							</li>`;
					}
				}
			}

			html += `</ul>`;
			if(this.itinerary[key].plan == ""){
				html += `

				<div id="noAct" class="container row center" style="top:0">
					<img src="images/itinerary/clock_logo.png"><br>
					<span>No Plans</span>
				</div>
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal1" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.addPlanInput(${key})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
			`;
			}
			else{
				html += `
				
				<br><br>
				<div class="fixed-action-btn horizontal click-to-toggle">
					<a href="#modal1" class="waves-effect waves-light btn-floating btn-large modal-trigger" id="createAddbutton" onclick='component.addPlanInput(${key})'>
						<i class="fa fa-plus"></i>
					</a>
				</div>
				`;
			}
			travelList.innerHTML = html;	
		}
		addPlanInput(key){
			
			let itemDetailsList = document.getElementById("modal1");
			let check = 0;

			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Damn', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});
			let today = new Date();
			let h = today.getHours();
			let m = today.getMinutes();
			
			m = component.checkTimeZero(m);
			let ampm = component.checkAMPM(h);
			h = component.checkTimeHour(h);
			h = component.checkTimeZero(h);
			let timeVal = h+":"+m+ampm;
			let html = `<div class="modal-content" id="traveldetails">
				<form class="row">
				  	<div class="input-field col s12">
						<input id="planName"  type="text"  class="validate"  >
						<label for="planName">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="planDesc"  type="text"  class="validate" >
						<label for="planDesc">Description</label>
					</div>
					<div class="input-field col s12"><label for="planDate" class="active">Date</label>
					<input id="planDate" type="text" class="datepicker" value='${this.itinerary[key].startdate}'></div>
					<div id="setPlanAlarm" class="input-field col s12"><label class="active" for="planTime">Set Time</label>
					<input id="planTime" type="text" value='${timeVal}' class="timepicker"></div>  
					
				</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.addPlan(${key})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}
		checkTimeHour(x){
			if(x > 12){
				x = x - 12;
				return x;
			}
			else if(x <= 12){
				if(x==0){
					return 12;
				}
				else{
					return x;
				}
			}
		}
		checkTimeZero(x){
			if (x < 10) {x = "0" + x};
    		return x;
		}

		checkAMPM(x){
			if(x<12){
				x = "AM";
				return x;
			}
			else{
				x = "PM"
				return x;
			}
		}
		addPlan(key){
			let planName = document.getElementById("planName");
			let planDesc = document.getElementById("planDesc");
			let planDate = document.getElementById("planDate");
			let planTime = document.getElementById("planTime");

	
			//let plan = {"name":planName.value,"desc":planDesc.value,"date":planDate.value,"time":planTime.value,"notify":planNotify.checked,"isChecked":false};
			let check = 0;

			if(planName.value!=""){
		
			

				if(check==0){
					let keyId = this.itinerary[key].id;
					let request = indexedDB.open('mybackpackDB', 1);
					let db = "";
					request.onsuccess = function(e){
						db = e.target.result;

						let transaction = db.transaction(['planItin'], "readwrite");
						let store = transaction.objectStore('planItin');
					
						let plan = {
							itinId:keyId,
							name:planName.value,
							desc:planDesc.value,
							date:planDate.value,
							time:planTime.value,
							isChecked:false

						}
						
						let addRequest = store.add(plan);
						addRequest.onsuccess = function(e){
							component.getPlanData(key);
						}
						addRequest.onerror = function(e){
							console.log("Error in storing data.");
						}
					}
					

					request.onerror = function(e){

						console.log('Error!');
					}


					//this.itinerary[key].plan.push(plan);
					$('#modal1').modal('close');
					// if(this.itinerary[key].plan[0].name==""){
					// 	component.deletePlan(this.itinerary[key].plan[0].name);
					// }

					//this.readPlanList(key);
				}
				else if(check<0){
					$('#modal1').modal('close');
					this.readPlanList(key);
				}
			}
			else{
				this.readPlanList(key);
			}
		}
		editPlanButtonPop(key, key2){
			//console.log(name);
			let option = document.getElementById("bottommodal");
			let html = `<div id="modalOption">
					      <a href="#modal1" onclick='component.editPlanInput(${key},${key2})' id="viewActbutton" class="modal-action modal-close modal-trigger waves-effect waves">Edit plan</a>
					      <a href="#!" onclick='component.deletePlan(${key},${key2})'id="viewActbutton" class="modal-action modal-close waves-effect waves">Delete plan</a>
					    </div>
				`;
			
			
				option.innerHTML = html;
		}
		readPlanDetails(key, key2){
			
			let itemDetailsList = document.getElementById("modal1");
			let check = "";
			let valueCheck = false
			
			
			let html = `<div class="modal-content row" id="plandetails">
				  	<div class="col s12">
				  		<label class="active" for="planName">Name</label><br>
						${this.itinerary[key].plan[key2].name}<br>
						
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label class="active" for="planDesc">Description</label><br>
						${this.itinerary[key].plan[key2].desc}<br>
						
					</div>
					<div class="divider col s12"></div>
					
					<div class="col s12">
						<label for="planDate" class="active">Date</label><br>
						${this.itinerary[key].plan[key2].date}<br>
					</div>
					<div class="divider col s12"></div>

					<div class="col s12">
						<label class="active" for="planTime">Set Time</label><br>
						${this.itinerary[key].plan[key2].time}<br>
					</div>  
					<div class="divider col s12"></div>

					<!--<div class="col s12">
						<label for="planSwitchNotify">Notify</label>
						<div id="planSwitchNotify" class="switch">
						    <label>
						      Off
						      <input id="planNotify" type="checkbox" ${check} onclick='component.editPlanNotify(${key},${key2})'>
						      <span class="lever"></span>
						      On
						    </label>
						</div>

					</div> -->
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#!" class="waves-effect waves-green btn-flat" onclick='component.editPlanInput(${key},${key2})'>Edit</a>
					<a href="#!" class="waves-effect modal-close waves-green btn-flat" onclick='component.deletePlan(${key},${key2})'>Delete</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Back</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}
		
		editPlanInput(key, key2){
			
			let itemDetailsList = document.getElementById("modal1");
			let check = "";
			

			$(function () {
			  $('select').material_select();
			  $('.datepicker').pickadate({
	            selectMonths: true, // Creates a dropdown to control month
	            selectYears: 15, // Creates a dropdown of 15 years to control year,
	            today: 'Today',
	            clear: 'Clear',
	            close: 'Ok',
	            closeOnSelect: false // Close upon selecting a date,
	          });
			  $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Damn', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			  });
			});

			let html = `<div class="modal-content" id="traveldetails">
				<form class="row">
				  	<div class="input-field col s12">
						<input id="planName"  type="text"  value='${this.itinerary[key].plan[key2].name}' class="validate"  >
						<label for="planName" class="active">Name</label>
					</div>
					<div class="input-field col s12">
						<input id="planDesc"  type="text" value='${this.itinerary[key].plan[key2].desc}'  class="validate" >
						<label for="planDesc" class="active">Description</label>
					</div>
					<div class="input-field col s12"><label for="planDate" class="active">Date</label>
					<input id="planDate" type="text" class="datepicker" value='${this.itinerary[key].plan[key2].date}'></div>
					<div id="setPlanAlarm" class="input-field col s12"><label class="active" for="planTime">Set Time</label>
					<input id="planTime" type="text" value='${this.itinerary[key].plan[key2].time}' class="timepicker"></div>  
					 
				</form>
				</div>
				<div class="modal-footer" id="modalFooter">
					<a href="#modal1" class="waves-effect waves-green btn-flat modal-trigger" onclick='component.editPlan(${key},${key2})'>Done</a>
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
				</div>`;
			itemDetailsList.innerHTML = html;

		}
		editPlan(key,key2){
			let planName = document.getElementById("planName");
			let planDesc = document.getElementById("planDesc");
			let planDate = document.getElementById("planDate");
			let planTime = document.getElementById("planTime");
			let planNotify = document.getElementById("planNotify");

	
			let plan = {"name":planName.value,"desc":planDesc.value,"date":planDate.value,"time":planTime.value,"isChecked":false};
			let check = 0;

			for(let i=0;i<this.itinerary[key].plan.length;i++){
				if(planName.value==""){
					check--;
				}
			}

			if(check==0){
				let keyId = this.itinerary[key].plan[key2].id;
		  		console.log(keyId);
				let request = indexedDB.open('mybackpackDB', 1);
					let db = "";
					request.onsuccess = function(e){
						db = e.target.result;

						let transaction = db.transaction(['planItin'], "readwrite");
						let store = transaction.objectStore('planItin');
						let requestKey = store.get(keyId);
						
					
						requestKey.onsuccess = function(e){
							let data = requestKey.result;

							data.name = planName.value;
							data.desc = planDesc.value;
							data.date = planDate.value;
							data.time = planTime.value;
		

							let requestUpdate = store.put(data);

							requestUpdate.onsuccess = function(e){
								component.getPlanData(key);
								setTimeout(function(){ component.readPlanDetails(key, key2);},500);
								console.log("Itinerary is renamed.");
							}
							requestUpdate.onerror = function(e){
								console.log("Error in renaming itinerary.");
							}
						}
						requestKey.onerror = function(e){
							console.log("Error in updating data.");
						}
					}
					

					request.onerror = function(e){

						console.log('Error!');
					}
				//this.itinerary[key].plan[key2]=plan;
				//$('#modal1').modal('close');

				//
			}
			else if(check<0){
				//$('#modal1').modal('close');
				this.readPlanDetails(key, key2);
			}
		}
		deletePlan(key, key2){ 

			let keyId = this.itinerary[key].plan[key2].id;
			let request = indexedDB.open('mybackpackDB', 1);
			let db = "";
			request.onsuccess = function(e){
				db = e.target.result;

				let transaction = db.transaction(['planItin'], "readwrite");
				let store = transaction.objectStore('planItin');

				let deleteRequest = store.delete(keyId);
				deleteRequest.onsuccess = function(e){
					component.getPlanData(key);
					console.log("Success in plan deletion.");
				}
				deleteRequest.onerror = function(e){
					console.log("Error in deleting data.");
				}
			}
		}
	
//Settings	
	settings_options(username, fname, lname, check){
		console.log("USER LOG");
		let user = document.getElementById("displayheadsettings");
		let options = document.getElementById('displaycontsettings');
		let html = `
			<div id="headBackgroundSettings">
				<div class="col s12 row center" style="position:relative;top:70px">
					<i class="fa fa-user-o" aria-hidden="true" style="font-size:45pt"></i><br>
					<span style="font-size: 15pt">${fname} ${lname}<br></span>
					<span style="font-style:italic; font-weight:normal">${username}<span>
					
				</div>
			
			</div>
		`;
		let html2 = `
		<div class="divider"></div>
			<div class="col s12">
				<label for="setOnlineFeature">Enable online features</label>
				<div id="setOnlineFeature" class="switch">
				    <label>
				      Off
				      <input id="setOnline" type="checkbox" onclick='component.transitionOnline()' ${check} >
				      <span class="lever"></span>
				      On
				    </label>
				</div>

			</div> 
			
			<div class="col s12 row center" style="position:relative; top:30px">
				<button class="waves-effect waves-light btn" onclick="component.logout_user(${true})" style="background-color: #e64a19">Log out</button>

			</div> 
			<!--<button onclick="component.mapTest()" class="waves-effect waves-light btn">CLICK ME</button>-->
			
		`;
		user.innerHTML = html;
		options.innerHTML = html2;
	}

	settings_options_guest(username, fname, lname, check){
		console.log("Guest");

		let user = document.getElementById("displayheadsettings");
		let options = document.getElementById('displaycontsettings');
		let html = `
			<div id="headBackgroundSettings">
				<div class="col s12 row center" style="position:relative;top:70px">
					<i class="fa fa-user-o" aria-hidden="true" style="font-size:45pt"></i><br>
					<span style="font-size: 15pt">Guest<br></span>
					<span style="font-style:italic; font-weight:normal">${username}<span>
					
				</div>
			
			</div>
		`;
		let html2 = `
		<div class="divider"></div>
			<div class="col s12">
				<label for="setOnlineFeature">Enable online features</label>
				<div id="setOnlineFeature" class="switch">
				    <label>
				      Off
				      <input id="setOnline" type="checkbox" disabled onclick='component.transitionOnline()' ${check} >
				      <span class="lever"></span>
				      On
				    </label>
				</div>

			</div> 
			
			<div class="col s12 row center" style="position:relative; top:30px">
				<button class="waves-effect waves-light btn" onclick="component.logout_user(${true})" style="background-color: #e64a19">Log out</button>

			</div> 
	
		`;
		user.innerHTML = html;
		options.innerHTML = html2;
	}

	transitionOnline(){
		
		if(checkCon == true){
			
			
				var connectedRef = firebase.database().ref(".info/connected");
				connectedRef.on("value", function(snap) {
					  if (snap.val() === true) {
					   	Materialize.toast('Connected', 1500);
					   	$('.toastConnect').fadeOut()
					   	clearTimeout(timer);
					   	component.getChecklistData();
					  }else{
					  	Materialize.toast('Connecting online...', 10000, 'toastConnect');
					  	timer = setTimeout(function(){ 
					  			if(timer)
					  				Materialize.toast('Please connect to the internet', 1500);
					  		},delayTimeout);

					  }
				});
			
			checkCon = false;
		}
		else if(checkCon == false){
			checkCon = true;
		}
		let setOnlineCheck = document.getElementById("setOnline").checked;
		if(setOnlineCheck == true){
			$('#menubuttonsOnline').show();
			$('#menubuttons').hide();

		}
		else{
			$('#menubuttonsOnline').hide();
			$('#menubuttons').show();

		}
	}
}

class Component extends App{
	constructor(){
		super();
	}
	mapPage(){
		let map = `

			<div id="mappage">
				<div id="menubarMap" style="position:absolute">	
					<div>
						
						<h5 class="headText row center">Map</h5>
						<a href="#bottommodalmap" onclick="component.optionMap_a()" id="optionbutton" class="modal-trigger"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
					</div>
				</div>
				<a href="#bottommodalmap" onclick="component.optionMap_b()" id="optionbuttonmap" class="waves-effect modal-trigger z-depth-1"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
				<a id="optionRefresh" onclick="" class="waves-effect z-depth-1"><i class="fa fa-refresh" aria-hidden="true"></i></a>
				<div id="map_canvas">
				</div>
				<!--<button id="button">Yo</button>-->
			</div>

			
				`;
				document.getElementById('map').innerHTML = map;
	}

	loginPage(){
		$('#loginpage').show();
		$('#backpack').hide();
		$('#menubuttons').hide();
		$('#menubuttonsOnline').hide();
		$('#settings').hide();

		this.userOwner= [];
		this.group = [];
	}

	preloaderChecklistPage(){
		$('#loadingChecklist').show();
	}
	hidepreloaderChecklistPage(){
		$('#loadingChecklist').hide();
	}

	homePage(){
		$('#grouppageOL').hide();
		$('#activitypageOL').hide();
		$('#memberpageOL').hide();
		$('#homepageOnline').hide();
		$('#settings').hide();
		$('#loginpage').hide();
		$('#menubuttons').show();
		$('#backpack').show();
		$('#map').hide();
		$('#planpage').hide();
		$('#homepage').show();
		$('#travelpage').hide();
		$('#activitypage').hide();
		$('#activitytemppage').hide();
		$('#categorypage').hide();
		$('#itempage').hide();
		$('#loadcontainer').hide();
		$('#activitytemppageGeneral').hide();
		$('#activitytemppageOutdoor').hide();
		$('#activitytemppageSports').hide();
		$('#mappage').hide();
		$('.collapsible').collapsible({
			  accordion : true
			});
		$('#itinerarypage').hide();

	    component.getActivityDispData();
	}

	//Checklist	
		tempSportsActivity(key, key2, menuKey){
			$('#homepage').hide();
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#loadcontainer').hide();
			$('#activitytemppageOutdoor').hide();
			$('#activitytemppageSports').show();
			$('#activitytemppageGeneral').hide();
			$('#mappage').hide();

			if(menuKey == 1){
				$('#acttempsportslist').show();
				$('#cattempsportslist').hide();
				$('#itemtempsportslist').hide();
				component.readSportsTemp();
			}
			else if(menuKey == 2){
				$('#acttempsportslist').hide();
				$('#cattempsportslist').show();
				$('#itemtempsportslist').hide();
				component.readSportsTempCat(key);
			}
			else{
				$('#acttempsportslist').hide();
				$('#cattempsportslist').hide();
				$('#itemtempsportslist').show();
				component.readSportsTempItem(key, key2);
			}
			$('.collapsible').collapsible({
			  accordion : true
			});
		}

		tempOutdoorActivity(key, key2, menuKey){
			$('#homepage').hide();
			
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#loadcontainer').hide();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').show();
			$('#activitytemppageGeneral').hide();
			$('#mappage').hide();

			if(menuKey == 1){
				$('#acttempoutdoorlist').show();
				$('#cattempoutdoorlist').hide();
				$('#itemtempoutdoorlist').hide();
				component.readOutdoorTemp();
			}
			else if(menuKey == 2){
				$('#acttempoutdoorlist').hide();
				$('#cattempoutdoorlist').show();
				$('#itemtempoutdoorlist').hide();
				component.readOutdoorTempCat(key);
			}
			else{
				$('#acttempoutdoorlist').hide();
				$('#cattempoutdoorlist').hide();
				$('#itemtempoutdoorlist').show();
				component.readOutdoorTempItem(key, key2);
			}

			$('.collapsible').collapsible({
			  accordion : true
			});
		}

		tempGeneralActivity(key, key2, menuKey){
			$('#homepage').hide();
			
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#loadcontainer').hide();
			$('#activitytemppageGeneral').show();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').hide();
			$('#mappage').hide();

			if(menuKey == 1){
				$('#acttempgenerallist').show();
				$('#cattempgenerallist').hide();
				$('#itemtempgenerallist').hide();
				component.readGeneralTemp();
			}
			else if(menuKey == 2){
				$('#acttempgenerallist').hide();
				$('#cattempgenerallist').show();
				$('#itemtempgenerallist').hide();
				component.readGeneralTempCat(key);
			}
			else{
				$('#acttempgenerallist').hide();
				$('#cattempgenerallist').hide();
				$('#itemtempgenerallist').show();
				component.readGeneralTempItem(key, key2);
			}

			$('.collapsible').collapsible({
			  accordion : true
			});
		}

		activityPage(){
			$('#homepage').hide();
			
			$('#activitypage').show();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').hide();
			$('#mappage').hide();
			checkPage = "act";
			component.getActivityData();
		}

		activityTempPage(key, key2, menuKey){
			$('#homepage').hide();
			
			$('#activitypage').hide();
			$('#activitytemppage').show();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').hide();
			$('#mappage').hide();

			//component.readSportsTemp();
			//component.readOutdoorTemp();
			component.actTempPage(key, key2, menuKey);
		}

		categoryPage(key){
			$('#homepage').hide();
			
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').show();
			$('#itempage').hide();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').hide();
			$('#mappage').hide();
			checkPage = "cat";
			actBackIndex = key;
			component.getCategoryData(key);
		}

		itemPage(key, key2){
			$('#homepage').hide();
			
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').show();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageSports').hide();
			$('#activitytemppageOutdoor').hide();
			$('#mappage').hide();
			checkPage = "item";
			actBackIndex = key;
			catBackIndex = key2;
			component.getItemData(key, key2);
		}
	
	//Checklist Online
		homePageOnline(){
			$('#memberpageOL').hide();
			$('#activitypageOL').hide()
			$('#displayOLcheck').hide()
			$('#grouppageOL').hide();
			$('#homepageOnline').show();
			$('#settings').hide();
			$('#loginpage').hide();
			$('#backpack').show();
			$('#map').hide();
			$('#homepage').hide();
			$('#travelpage').hide();
			$('#planpage').hide();
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#loadcontainer').hide();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageOutdoor').hide();
			$('#activitytemppageSports').hide();
			$('#mappage').hide();
			$('.collapsible').collapsible({
				  accordion : true
				});
			$('#itinerarypage').hide();
			component.checklistOption();
		}
	
		groupPage(){
			$('#homepageOnline').hide();
			$('#activitypageOL').hide();
			$('#memberpageOL').hide();
			$('#grouppageOL').show();
			$('#settings').hide();
			$('#map').hide();
			$('#menubarOL').hide();
			component.readMyGroup();
		}

		activityPageOL(key){
			$('#activitypageOL').show();
			$('#grouppageOL').hide();
			$('#memberpageOL').hide();
			component.readCategoryData(key);
			$('.collapsible').collapsible({
				  accordion : true
			});
			$('#menubarOL').show();
		}

		memberPageOL(key){
			$('#activitypageOL').hide();
			$('#displayOLcheck').hide();
			$('#homepageOnline').hide();
			$('#memberpageOL').show();
			$('#grouppageOL').hide();
			$('#settings').hide();
			$('#map').hide();
			
			component.readMembers(key);
		}

	//Itinerary
		itineraryPage(){
			$('#grouppageOL').hide();
			$('#activitypageOL').hide();
			$('#memberpageOL').hide();
			$('#homepageOnline').hide();
			$('#backpack').show();
			$('#settings').hide();
			$('#itinerarypage').show();
			$('#homepage').hide();
			$('#map').hide();
			$('#activitypage').hide();
			$('#activitytemppage').hide();
			$('#categorypage').hide();
			$('#itempage').hide();
			$('#loadcontainer').hide();
			$('#activitytemppageGeneral').hide();
			$('#activitytemppageOutdoor').hide();
			$('#activitytemppageSports').hide();
			$('#mappage').hide();
			$('#travelpage').hide();
			$('#planpage').hide();
			//component.getItineraryData();
			component.getPlanDispData();
		}

		travelPage(){
			$('#itinerarypage').hide();
			$('#travelpage').show();
			$('#planpage').hide();
			component.getItineraryData();
		}

		planPage(key){
			$('#itinerarypage').hide();
			$('#travelpage').hide();
			$('#planpage').show();
			component.getPlanData(key);
		}

	//Map
		map(){
			$('#backpack').hide();
			$('#map').show();
			$('#mappage').show();
			$('#settings').hide();
			
			component.mapPage();
			component.mapReadyOpened();
			// if(mapCheck == false){
			// 	component.mapReady();
			// 	mapCheck = true;
			// }
			// else{
			// 	component.mapReadyOpened();
			// }	
		}
		
		// mapReady(){
		// 		var map;
				
		// 		document.addEventListener("deviceready", function() {
		// 		  var div = document.getElementById("map_canvas");
 				  
		// 		  // Initialize the map view
		// 		  map = plugin.google.maps.Map.getMap(div);

		// 		  // Wait until the map is ready status.
		// 		  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
		// 		}, false);


		// 		function onMapReady() {
					
		// 			 var button = document.getElementById("optionRefresh");
 	    // 			 button.addEventListener("click", onButtonClick);
 					
				  
		// 			navigator.geolocation.getCurrentPosition(onSuccess, onError);

		// 				function onSuccess(position) {
		// 					var lat = position.coords.latitude;
		// 					var lang = position.coords.longitude;
		// 					console.log(lat);
		// 					setTimeout(function(){
		// 						map.animateCamera({
		// 						    target: {lat: lat, lng: lang},
		// 						    zoom: 10,
		// 						    bearing: 140,
		// 						    duration: 5000
		// 						  }, function() {

		// 						    // Add a maker
		// 						map.addMarker({
		// 						      position: {lat: lat, lng: lang},
		// 						      title: "You are here!",
		// 						      snippet: "Latitude: "+lat+", Longitude: "+lang,
		// 						      animation: plugin.google.maps.Animation.BOUNCE
		// 						    }, function(marker) {
		// 								$("#optionRefresh").click(function(){
		// 					                marker.remove();
		// 					            });
		// 						      // Show the info window
		// 						      marker.showInfoWindow();
		// 						      /*
		// 						      // Catch the click event
		// 						      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

		// 						        // To do something...
		// 						        alert("Hello world!");

		// 						      });*/
		// 						    });
		// 						  });
		// 					},2000);
					        
		// 			    };
		// 			    function onError(error) {
		// 			    	Materialize.toast('Failed in geolocation', 2000);
		// 			        alert('code: '    + error.code    + '\n' +
		// 			              'message: ' + error.message + '\n');
		// 			    }
					  
		// 		}
		// 		function onButtonClick() {

		// 			navigator.geolocation.getCurrentPosition(successYes, errorNo);
		// 			function successYes(position) {
		// 				var lat = position.coords.latitude;
		// 				var lang = position.coords.longitude;

		// 				map.animateCamera({
		// 				    target: {lat: lat, lng: lang},
		// 				    zoom: 17,
		// 				    tilt: 60,
		// 				    bearing: 140,
		// 				    duration: 5000
		// 				  }, function() {

		// 				    // Add a maker
		// 				map.addMarker({
		// 				      position: {lat: lat, lng: lang},
		// 				      title: "You are here!",
		// 				      snippet: "Latitude: "+lat+", Longitude: "+lang,
		// 				      animation: plugin.google.maps.Animation.BOUNCE
		// 				    }, function(marker) {
		// 				    	$("#optionRefresh").click(function(){
		// 			                marker.remove();
		// 			            });
		// 				      // Show the info window
		// 				      marker.showInfoWindow();
		// 				      /*
		// 				      // Catch the click event
		// 				      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

		// 				        // To do something...
		// 				        alert("Hello world!");

		// 				      });*/
		// 				    });
		// 				  });
						  
				        
		// 		    };
		// 		    function errorNo(error) {
		// 		    	Materialize.toast('Failed in geolocation', 2000);
		// 		        alert('code: '    + error.code    + '\n' +
		// 		              'message: ' + error.message + '\n');
		// 		    }
		// 		}
		// }

		mapReadyOpened(){
			var map;	
			document.addEventListener("deviceready", function() {
				var div = document.getElementById("map_canvas");
				navigator.geolocation.getCurrentPosition(successYes, errorNo);
				function successYes(position) {
					var lat = position.coords.latitude;
					var lang = position.coords.longitude;
					var options = {
						  camera: {
						    target: {lat: lat, lng: lang},
						    zoom: 17,
						    tilt: 60
						  }
						};
					  // Initialize the map view
					map = plugin.google.maps.Map.getMap(div, options);
					map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

					function onMapReady(){
						var button = document.getElementById("optionRefresh");
 					 	button.addEventListener("click", onButtonClick);
						map.addMarker({
						      position: {lat: lat, lng: lang},
						      title: "You are here!",
						      snippet: "Latitude: "+lat+", Longitude: "+lang,
						      animation: plugin.google.maps.Animation.BOUNCE
						    }, function(marker) {
						    	$("#optionRefresh").click(function(){
					                marker.remove();
					            });
						      // Show the info window
						      marker.showInfoWindow();
						    });
					}
					function onButtonClick() {

						navigator.geolocation.getCurrentPosition(onSuccess, onError);
						function onSuccess(position) {
							var latClick = position.coords.latitude;
							var lngClick = position.coords.longitude;

							map.animateCamera({
							    target: {lat: latClick, lng: lngClick},
							    zoom: 17,
							    tilt: 60,
							    bearing: 140,
							    duration: 5000
							  }, function() {

							    // Add a maker
							map.addMarker({
							      position: {lat: latClick, lng: lngClick},
							      title: "You are here!",
							      snippet: "Latitude: "+latClick+", Longitude: "+lngClick,
							      animation: plugin.google.maps.Animation.BOUNCE
							    }, function(marker) {
							    	$("#optionRefresh").click(function(){
						                marker.remove();
						            });
							      // Show the info window
							      marker.showInfoWindow();
							      /*
							      // Catch the click event
							      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

							        // To do something...
							        alert("Hello world!");

							      });*/
							    });
							  });
							  
					        
					    };
					    function onError(error) {
					    	Materialize.toast('Failed in geolocation', 2000);
					        alert('code: '    + error.code    + '\n' +
					              'message: ' + error.message + '\n');
					    }
					}

				}
				function errorNo(error){
					Materialize.toast('Failed in geolocation', 2000);
				        alert('code: '    + error.code    + '\n' +
				              'message: ' + error.message + '\n');
				}

			  
				  
			}, false);
		}

		optionMap_a(){
			let option = document.getElementById("bottommodalmap");
			let html = `<div id="modalOption">
						      <a href="#!" onclick='component.hideMenu()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Hide menu bar</a>
						    </div>
			`;
			
			option.innerHTML = html;
		}

		hideMenu(){
			$('#menubarMap').hide();
			$('#menubuttons').hide();
			$('#optionbuttonmap').show();
			$('#optionRefresh').show();
		}

		optionMap_b(){
			let option = document.getElementById("bottommodalmap");
			let html = `<div id="modalOption">
						      <a href="#!" onclick='component.showMenu()' id="viewActbutton" class="modal-action modal-close waves-effect waves btn">Show menu bar</a>
						    </div>
			`;
			
			option.innerHTML = html;
		}

		showMenu(){
			$('#menubarMap').show();
			$('#menubuttons').show();
			$('#optionbuttonmap').hide();
			$('#optionRefresh').hide();
		}

	//Settings
		settings(){
			$('#homepageOnline').hide();
			$('#backpack').hide();
			$('#map').hide();
			$('#settings').show();
			$('#settingspage').show();
			console.log(this.userOwner);
		}

	//BackButton
		backTemp(){
			let val;
			if(checkPage == "act"){
				val=component.activityPage();
				return val;
			}
			else if(checkPage == "cat"){
				val=component.categoryPage(actBackIndex);
				return val;
			}
			else{
				val=component.itemPage(actBackIndex, catBackIndex);
				return val;
			}
		}

}	

let component = new Component();
// component.arraySort();

// 
// component.readSportsTemp();

$(document).ready(function() {
	//component.mapPage();
	component.photoiconsSort();
	component.arrayTempSort();
    component.login_setup();
    
});
