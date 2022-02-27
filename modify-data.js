// Prevent the page from reloading when pressing enter or hitting submit in the form
let form = document.querySelector('form');
form.addEventListener('submit', function (event) {
	event.preventDefault();
	event.stopPropagation();
}, false);

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAjJoBjXhukyCrTUUnHDWlXo6g5SllDGto",
	authDomain: "sissi-voyageng.firebaseapp.com",
	databaseURL: "https://sissi-voyageng-default-rtdb.firebaseio.com",
	projectId: "sissi-voyageng",
	storageBucket: "sissi-voyageng.appspot.com",
	messagingSenderId: "489914893913",
	appId: "1:489914893913:web:1fcf09322e547ed8401348"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
let citiesListRef = dbRef.child('cities');
let citiesList = [];

// Attach an asynchronous callback to read the data at our posts reference
dbRef.get('cities').then(snapshot => {
	// Save the resulting snapshot value from referencing the database's cities node into citiesList
	citiesList = snapshot.val();
	console.log(citiesList);
}).catch(errorObject => {
	console.error(errorObject);
});

// // Attach an asynchronous callback to read the data at our posts reference
// citiesListRef.on('value', (snapshot) => {
// 	// Save the resulting snapshot value from referencing the database's cities node into citiesList
// 	citiesList = snapshot.val();
// 	console.log(citiesList);
// }, (errorObject) => {
// 	console.log('The read failed: ' + errorObject.name);
// });

let addCityButton = document.querySelector("#addCityButton");
addCityButton.addEventListener("click", function(event) {
	console.log("add city");
	let cityToAdd = {};
	cityToAdd["cityName"] = document.querySelector("#cityName").value;
	cityToAdd["country"] = document.querySelector("#countryName").value;
	cityToAdd["cityImage"] = document.querySelector("#cityImage").value;
	cityToAdd["latitude"] = document.querySelector("#latitude").value;
	cityToAdd["longitude"] = document.querySelector("#longitude").value;
	cityToAdd["introduction"] = document.querySelector("#introduction").value;
	cityToAdd["buttonTextColor"] = {
		"red": document.querySelector("#redButtonTextColor").value,
		"green": document.querySelector("#greenButtonTextColor").value,
		"blue": document.querySelector("#blueButtonTextColor").value
	};
	cityToAdd["buttonBackgroundColor"] = {
		"red": document.querySelector("#redButtonBackgroundColor").value,
		"green": document.querySelector("#greenButtonBackgroundColor").value,
		"blue": document.querySelector("#blueButtonBackgroundColor").value
	};
	cityToAdd["speechRecognizerLanguage"] = document.querySelector("#speechRecognizerLanguage").value;
	cityToAdd["textToSpeechLanguage"] = document.querySelector("#textToSpeechLanguage").value;
	cityToAdd["translatorLanguage"] = document.querySelector("#translatorLanguage").value;
	cityToAdd["listOfImagesToFind"] = document.querySelector("#listOfImagesToFind").value.split(",");
	cityToAdd["listOfPronunciationGamePhrases"] = document.querySelector("#listOfPronunciationGamePhrases").value.split(",");
	cityToAdd["spaceshipGame"] = {
		"direction": document.querySelector("#direction").value,
		"alphabetList": document.querySelector("#alphabetList").value,
		"wordsToGuessList": document.querySelector("#wordsToGuessList").value
	};

	let listOfFamousPlaces = [];
	let famousPlacesDivItemsList = document.querySelectorAll(".famousPlacesItemDiv");
	famousPlacesDivItemsList.forEach(item => {
		let itemObject = {
			"name": item.querySelector(".famousPlacesName").value,
			"image": item.querySelector(".famousPlacesImage").value,
			"shortDescription": item.querySelector(".famousPlacesShortDescription").value,
			"longDescription": item.querySelector(".famousPlacesLongDescription").value
		};
		listOfFamousPlaces.push(itemObject);
	});
	cityToAdd["listOfPlaces"] = listOfFamousPlaces;

	let listOfFamousFood = [];
	let famousFoodDivItemsList = document.querySelectorAll(".famousFoodItemDiv");
	famousFoodDivItemsList.forEach(item => {
		let itemObject = {
			"name": item.querySelector(".famousFoodName").value,
			"image": item.querySelector(".famousFoodImage").value,
			"shortDescription": item.querySelector(".famousFoodShortDescription").value,
			"longDescription": item.querySelector(".famousFoodLongDescription").value
		};
		listOfFamousFood.push(itemObject);
	});
	cityToAdd["listOfFood"] = listOfFamousFood;

	let listOfCommonPhrases = [];
	let commonPhrasesDivItemsList = document.querySelectorAll(".commonPhrasesItemDiv");
	commonPhrasesDivItemsList.forEach(item => {
		let itemObject = {
			"wordToTranslate": item.querySelector(".wordToTranslate").value,
			"wordToShow": item.querySelector(".wordToShow").value,
		};
		listOfCommonPhrases.push(itemObject);
	});
	cityToAdd["listOfPhrases"] = listOfCommonPhrases;

	console.log(cityToAdd);

	// Get the current citiesList from firebase
	citiesListRef.get().then(snapshot => {
		citiesList = snapshot.val();
		// Add form data to the local version of citiesList
		citiesList.push(cityToAdd);
		// Send the new citiesList to firebase (key = cities)
		citiesListRef.set(citiesList).then(result => {
			console.log("done sending data");
			alert("This city has been updated successfully");
			location.reload();
		}).catch(error => {
		  	console.error(error);
		});
	}).catch(errorObject => {
		console.log('The read failed: ' + errorObject.name);
	});
});

let addFamousPlacesButton = document.querySelector("#addFamousPlacesButton");
addFamousPlacesButton.addEventListener("click", function(event) {
	let numberOfFamousPlaces = document.querySelector("#numberOfFamousPlaces").value;
	// Hide the number of places to add options
	let numberOfFamousPlacesDiv = document.querySelector(".numberOfFamousPlacesDiv");
	numberOfFamousPlacesDiv.classList.add("hide");
	let famousPlacesDiv = document.querySelector(".famousPlaces");
	// Generate form fields
	for (let i=1; i<=numberOfFamousPlaces; i++) {
		famousPlacesDiv.innerHTML += `<div class="famousPlacesItemDiv">
			<h3 class="h5 mt-0 mb-0 fw-normal">Famous Place #${i}</h2>
			<div class="col-12">
			    <label for="famousPlacesName${i}" class="form-label">Name</label>
			    <input type="text" class="form-control famousPlacesName" id="famousPlacesName${i}" placeholder="e.g. Shining Tower" required>
			    <div class="invalid-feedback">
			        Please enter a name for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesImage${i}" class="form-label">Image</label>
			    <input type="text" class="form-control famousPlacesImage" id="famousPlacesImage${i}" placeholder="???" required>
			    <div class="invalid-feedback">
			        Please enter an image link for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesShortDescription${i}" class="form-label">Short Description</label>
			    <textarea type="text" class="form-control famousPlacesShortDescription" id="famousPlacesShortDescription${i}" placeholder="Enter a short description for this place" required></textarea>
			    <div class="invalid-feedback">
			        Please enter a short description for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesLongDescription${i}" class="form-label">Long Description</label>
			    <textarea type="text" class="form-control famousPlacesLongDescription" id="famousPlacesLongDescription${i}" placeholder="Enter a long description for this place" required></textarea>
			    <div class="invalid-feedback">
			        Please enter a long description for this famous place.
			    </div>
			</div>
		</div>`;
	}
});

let addFamousFoodButton = document.querySelector("#addFamousFoodButton");
addFamousFoodButton.addEventListener("click", function(event) {
	let numberOfFamousFood = document.querySelector("#numberOfFamousFood").value;
	// Hide the number of Food to add options
	let numberOfFamousFoodDiv = document.querySelector(".numberOfFamousFoodDiv");
	numberOfFamousFoodDiv.classList.add("hide");
	let famousFoodDiv = document.querySelector(".famousFood");
	// Generate form fields
	for (let i=1; i<=numberOfFamousFood; i++) {
		famousFoodDiv.innerHTML += `<div class="famousFoodItemDiv">
			<h3 class="h5 mt-0 mb-0 fw-normal">Famous Foods #${i}</h2>
			<div class="col-12">
			    <label for="famousFoodName${i}" class="form-label">Name</label>
			    <input type="text" class="form-control famousFoodName" id="famousFoodName${i}" placeholder="e.g. Pizza" required>
			    <div class="invalid-feedback">
			        Please enter a name for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodImage${i}" class="form-label">Image</label>
			    <input type="text" class="form-control famousFoodImage" id="famousFoodImage${i}" placeholder="???" required>
			    <div class="invalid-feedback">
			        Please enter an image link for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodShortDescription${i}" class="form-label">Short Description</label>
			    <textarea type="text" class="form-control famousFoodShortDescription" id="famousFoodShortDescription${i}" placeholder="Enter a short description for this place" required></textarea>
			    <div class="invalid-feedback">
			        Please enter a short description for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodLongDescription${i}" class="form-label">Long Description</label>
			    <textarea type="text" class="form-control famousFoodLongDescription" id="famousFoodLongDescription${i}" placeholder="Enter a long description for this place" required></textarea>
			    <div class="invalid-feedback">
			        Please enter a long description for this famous food.
			    </div>
			</div>
		</div>`;
	}
});

let addCommonPhrasesButton = document.querySelector("#addCommonPhrasesButton");
addCommonPhrasesButton.addEventListener("click", function(event) {
	let numberOfCommonPhrases = document.querySelector("#numberOfCommonPhrases").value;
	// Hide the number of Food to add options
	let numberOfCommonPhrasesDiv = document.querySelector(".numberOfCommonPhrasesDiv");
	numberOfCommonPhrasesDiv.classList.add("hide");
	let commonPhrasesDiv = document.querySelector(".commonPhrases");
	// Generate form fields
	for (let i=1; i<=numberOfCommonPhrases; i++) {
		commonPhrasesDiv.innerHTML += `<div class="commonPhrasesItemDiv">
			<h3 class="h5 mt-0 mb-0 fw-normal">Common Phrases #${i}</h2>
			<div class="col-12">
			    <label for="wordToShow${i}" class="form-label">Words to Show (Original Language and Translated)</label>
			    <input type="text" class="form-control wordToShow" id="wordToShow${i}" placeholder="e.g. 汉字（Han zi)Chinese" required>
			    <div class="invalid-feedback">
			    	Please enter the phrase in the desired language and English, e.g. 汉字（Han zi)Chinese.
			    </div>
			</div>
			<div class="col-12">
			    <label for="wordToTranslate${i}" class="form-label">Words to Translate (Original Language Only)</label>
			    <input type="text" class="form-control wordToTranslate" id="wordToTranslate{i}" placeholder="e.g. 汉字" required>
			    <div class="invalid-feedback">
			        Please enter the phrase in the desired language only e.g. 汉字.
			    </div>
			</div>
		</div>`;
	}
});