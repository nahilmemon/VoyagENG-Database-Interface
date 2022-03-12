// Prevent the page from reloading when pressing enter or hitting submit in the form
	let form = document.querySelector("#add-new-city-form");
	form.addEventListener('submit', function (event) {
		event.preventDefault();
		event.stopPropagation();
	}, false);
	let form2 = document.querySelector("#edit-city-form");
	form2.addEventListener('submit', function (event) {
		event.preventDefault();
		event.stopPropagation();
	}, false);

// ======= Setup and Initialize Firebase ======= //
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

// ======= Selecting Options ======= //
	let chooseOptionsSection = document.querySelector("#choose-options-section");
	// Add New City Option
	let addNewCityOptionButton = document.querySelector(".add-new-city-option-button");
	let addNewCitySection = document.querySelector("#add-new-city-section");
	addNewCityOptionButton.addEventListener("click", function(event) {
		console.log("showing add new city section");
		chooseOptionsSection.classList.add("hide");
		addNewCitySection.classList.remove("hide");
	});
	// Edit City Option
	let editCityOptionButton = document.querySelector(".edit-city-option-button");
	let editCitySection = document.querySelector("#edit-city-section");
	let listOfCitiesToEditContainer = document.querySelector("#list-of-cities-to-edit");
	editCityOptionButton.addEventListener("click", function(event) {
		console.log("showing edit city section");
		chooseOptionsSection.classList.add("hide");
		editCitySection.classList.remove("hide");

		// Get the list of cities from the database
		dbRef.get('cities').then(snapshot => {
			// Save the resulting snapshot value from referencing the database's cities node into citiesListObject
			citiesListObject = snapshot.val();
			citiesListObject = citiesListObject.cities;
			console.log("Current list of cities available in database:");
			console.log(JSON.parse(JSON.stringify(citiesListObject)));

			// Create the list of cities as radio options
			Object.keys(citiesListObject).forEach(function(cityIndex) {
				city = citiesListObject[cityIndex];
				let cityNameWithoutSpaces = city.cityName;
				cityNameWithoutSpaces = cityNameWithoutSpaces.replaceAll(' ','-');;
				listOfCitiesToEditContainer.innerHTML += `<div class="form-check">
					<input class="form-check-input" type="radio" name="list-of-cities-to-delete-options" id="${cityNameWithoutSpaces}" value="${cityIndex}">
					<label class="form-check-label" for="${cityNameWithoutSpaces}">
						${city.cityName}
					</label>
				</div>`
			});
		}).catch(errorObject => {
			console.error(errorObject);
		});		
	});
	// Delete City Option
	let deleteCityOptionButton = document.querySelector(".delete-city-option-button");
	let deleteCitySection = document.querySelector("#delete-city-section");
	let listOfCitiesToDeleteContainer = document.querySelector("#list-of-cities-to-delete");
	deleteCityOptionButton.addEventListener("click", function(event) {
		console.log("showing delete city section");
		chooseOptionsSection.classList.add("hide");
		deleteCitySection.classList.remove("hide");

		// Get the list of cities from the database
		dbRef.get('cities').then(snapshot => {
			// Save the resulting snapshot value from referencing the database's cities node into citiesListObject
			citiesListObject = snapshot.val();
			citiesListObject = citiesListObject.cities;
			console.log("Current list of cities available in database:");
			console.log(JSON.parse(JSON.stringify(citiesListObject)));

			// Create the list of cities as radio options
			Object.keys(citiesListObject).forEach(function(cityIndex) {
				city = citiesListObject[cityIndex];
				let cityNameWithoutSpaces = city.cityName;
				cityNameWithoutSpaces = cityNameWithoutSpaces.replaceAll(' ','-');;
				listOfCitiesToDeleteContainer.innerHTML += `<div class="form-check">
					<input class="form-check-input" type="radio" name="list-of-cities-to-delete-options" id="${cityNameWithoutSpaces}" value="${cityIndex}">
					<label class="form-check-label" for="${cityNameWithoutSpaces}">
						${city.cityName}
					</label>
				</div>`
			});
		}).catch(errorObject => {
			console.error(errorObject);
		});
	});

// ======= Adding a New City ======= //
	// Generate missing form content based on how many inputs the user wants
	// Add famous places inputs
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

	// Add famous foods inputs
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

	// Add common phrases inputs
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

	// Collect information from the add city form and send it to the database
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

// ======= Deleting a City ======= //
	let deleteCityButton = document.querySelector(".delete-city-button");
	deleteCityButton.addEventListener("click", function(event) {
		console.log(listOfCitiesToDeleteContainer.querySelector("input:checked").value);
		let selectedCityToDeleteIndex = listOfCitiesToDeleteContainer.querySelector("input:checked").value;

		dbRef.get('cities').then(snapshot => {
			// Save the resulting snapshot value from referencing the database's cities node into citiesListObject
			citiesListObject = snapshot.val();
			citiesListObject = citiesListObject.cities;
			console.log("commence deleting selected city");
			console.log("current citiesListObject");
			console.log(JSON.parse(JSON.stringify(citiesListObject)));

			// Delete the selected city locally from citiesListObject
			console.log("deleting following city index: ");
			console.log(citiesListObject[selectedCityToDeleteIndex]);
			delete citiesListObject[selectedCityToDeleteIndex];
			console.log("This is what citiesListObject looks like after deleting the selected city");
			console.log(JSON.parse(JSON.stringify(citiesListObject)));

			// Update the index of each city so that there are no gaps in counting
			let newCityIndex = 0;
			let newCitiesListObject = {};
			console.log("Each city in final list:");
			Object.keys(citiesListObject).forEach(function(oldCityIndex) {
				if (citiesListObject[oldCityIndex] != null) {
					newCitiesListObject[newCityIndex] = citiesListObject[oldCityIndex];
					newCityIndex += 1;
				} else {
					console.log("skipping null city");
				}
			});
			console.log("Final citiesListObject with updated indices: ");
			console.log(JSON.parse(JSON.stringify(newCitiesListObject)));

			// Send the updated list of cities in citiesListObject back to firebase (key = cities)
			// (to make sure each city object is numbered correctly)
			citiesListRef.set(newCitiesListObject).then(result => {
				console.log("Finished sending data after deleting selected city");
				alert("This city has been deleted successfully");
				location.reload();
			}).catch(error => {
			  	console.error(error);
			});
		}).catch(errorObject => {
			console.error(errorObject);
		});	
	});

// ======= Editing a City ======= //
let chooseCityToEditButton = document.querySelector(".choose-city-to-edit-button");
let selectedCityToEditIndex = null;
let selectedCityToEditInfo = null;
chooseCityToEditButton.addEventListener("click", function(event) {
	// Determine which city was selected
	selectedCityToEditIndex = listOfCitiesToEditContainer.querySelector("input:checked").value;
	selectedCityToEditInfo = citiesListObject[selectedCityToEditIndex];
	console.log("Info for selected city to edit:");
	console.log(listOfCitiesToEditContainer.querySelector("input:checked").value);
	console.log(JSON.parse(JSON.stringify(selectedCityToEditInfo)));

	// Hide the list of cities to select and show the edit city form
	let editCityFormContainer = document.querySelector(".edit-city-form");
	editCityFormContainer.classList.remove("hide");
	let chooseCityToEditSection = document.querySelector(".choose-city-to-edit");
	chooseCityToEditSection.classList.add("hide");

	// Fill in the edit city form with info from the database about the selected city
	console.log("Commence populating edit city form:");
	document.querySelector("#cityName2").value = selectedCityToEditInfo["cityName"];
	document.querySelector("#countryName2").value = selectedCityToEditInfo["country"];
	document.querySelector("#cityImage2").value = selectedCityToEditInfo["cityImage"];
	document.querySelector("#latitude2").value = selectedCityToEditInfo["latitude"];
	document.querySelector("#longitude2").value = selectedCityToEditInfo["longitude"];
	document.querySelector("#introduction2").value = selectedCityToEditInfo["introduction"];

	document.querySelector("#redButtonTextColor2").value = selectedCityToEditInfo["buttonTextColor"]["red"];
	document.querySelector("#greenButtonTextColor2").value = selectedCityToEditInfo["buttonTextColor"]["green"];
	document.querySelector("#blueButtonTextColor2").value = selectedCityToEditInfo["buttonTextColor"]["blue"];
	document.querySelector("#redButtonBackgroundColor2").value = selectedCityToEditInfo["buttonBackgroundColor"]["red"];
	document.querySelector("#greenButtonBackgroundColor2").value = selectedCityToEditInfo["buttonBackgroundColor"]["green"];
	document.querySelector("#blueButtonBackgroundColor2").value = selectedCityToEditInfo["buttonBackgroundColor"]["blue"];

	document.querySelector("#speechRecognizerLanguage2").value = selectedCityToEditInfo["speechRecognizerLanguage"];
	document.querySelector("#textToSpeechLanguage2").value = selectedCityToEditInfo["textToSpeechLanguage"];
	document.querySelector("#translatorLanguage2").value = selectedCityToEditInfo["translatorLanguage"];

	document.querySelector("#listOfImagesToFind2").value = selectedCityToEditInfo["listOfImagesToFind"];
	
	document.querySelector("#listOfPronunciationGamePhrases2").value = selectedCityToEditInfo["listOfPronunciationGamePhrases"];
	
	document.querySelector("#direction2").value = selectedCityToEditInfo["spaceshipGame"]["direction"];
	document.querySelector("#alphabetList2").value = selectedCityToEditInfo["spaceshipGame"]["alphabetList"];
	document.querySelector("#wordsToGuessList2").value = selectedCityToEditInfo["spaceshipGame"]["wordsToGuessList"];

	// Generate the correct number of form inputs for the following sections:
	// Famous Places
	let numberOfFamousPlaces = selectedCityToEditInfo["listOfPlaces"].length;
	let famousPlacesDiv = document.querySelector(".famousPlaces2");
	for (let i=1; i<=numberOfFamousPlaces; i++) {
		let currentPlace = selectedCityToEditInfo["listOfPlaces"][i-1];
		famousPlacesDiv.innerHTML += `<div class="famousPlacesItemDiv2">
			<h3 class="h5 mt-0 mb-0 fw-normal">Famous Place #${i}</h2>
			<div class="col-12">
			    <label for="famousPlacesName${i}" class="form-label">Name</label>
			    <input type="text" class="form-control famousPlacesName2" id="famousPlacesName${i}" placeholder="e.g. Shining Tower" value="${currentPlace["name"]}" required>
			    <div class="invalid-feedback">
			        Please enter a name for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesImage${i}" class="form-label">Image</label>
			    <input type="text" class="form-control famousPlacesImage2" id="famousPlacesImage${i}" placeholder="???" value="${currentPlace["image"]}" required>
			    <div class="invalid-feedback">
			        Please enter an image link for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesShortDescription${i}" class="form-label">Short Description</label>
			    <textarea type="text" class="form-control famousPlacesShortDescription2" id="famousPlacesShortDescription${i}" placeholder="Enter a short description for this place" required>${currentPlace["shortDescription"]}</textarea>
			    <div class="invalid-feedback">
			        Please enter a short description for this famous place.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousPlacesLongDescription${i}" class="form-label">Long Description</label>
			    <textarea type="text" class="form-control famousPlacesLongDescription2" id="famousPlacesLongDescription${i}" placeholder="Enter a long description for this place" required>${currentPlace["longDescription"]}</textarea>
			    <div class="invalid-feedback">
			        Please enter a long description for this famous place.
			    </div>
			</div>
		</div>`;
	}

	// Famous Food
	let numberOfFamousFood = selectedCityToEditInfo["listOfFood"].length;
	let famousFoodDiv = document.querySelector(".famousFood2");
	for (let i=1; i<=numberOfFamousFood; i++) {
		let currentFood = selectedCityToEditInfo["listOfFood"][i-1];
		famousFoodDiv.innerHTML += `<div class="famousFoodItemDiv2">
			<h3 class="h5 mt-0 mb-0 fw-normal">Famous Foods #${i}</h2>
			<div class="col-12">
			    <label for="famousFoodName${i}" class="form-label">Name</label>
			    <input type="text" class="form-control famousFoodName2" id="famousFoodName${i}" placeholder="e.g. Pizza" value="${currentFood["name"]}" required>
			    <div class="invalid-feedback">
			        Please enter a name for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodImage${i}" class="form-label">Image</label>
			    <input type="text" class="form-control famousFoodImage2" id="famousFoodImage${i}" placeholder="???" value="${currentFood["image"]}" required>
			    <div class="invalid-feedback">
			        Please enter an image link for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodShortDescription${i}" class="form-label">Short Description</label>
			    <textarea type="text" class="form-control famousFoodShortDescription2" id="famousFoodShortDescription${i}" placeholder="Enter a short description for this place" required>${currentFood["shortDescription"]}</textarea>
			    <div class="invalid-feedback">
			        Please enter a short description for this famous food.
			    </div>
			</div>
			<div class="col-12">
			    <label for="famousFoodLongDescription${i}" class="form-label">Long Description</label>
			    <textarea type="text" class="form-control famousFoodLongDescription2" id="famousFoodLongDescription${i}" placeholder="Enter a long description for this place" required>${currentFood["longDescription"]}</textarea>
			    <div class="invalid-feedback">
			        Please enter a long description for this famous food.
			    </div>
			</div>
		</div>`;
	}

	// CommonPhrases
	let numberOfCommonPhrases = selectedCityToEditInfo["listOfPhrases"].length;
	let commonPhrasesDiv = document.querySelector(".commonPhrases2");
	for (let i=1; i<=numberOfCommonPhrases; i++) {
		let currentPhrase = selectedCityToEditInfo["listOfPhrases"][i-1];
		commonPhrasesDiv.innerHTML += `<div class="commonPhrasesItemDiv2">
			<h3 class="h5 mt-0 mb-0 fw-normal">Common Phrases #${i}</h2>
			<div class="col-12">
			    <label for="wordToShow${i}" class="form-label">Words to Show (Original Language and Translated)</label>
			    <input type="text" class="form-control wordToShow2" id="wordToShow${i}" placeholder="e.g. 汉字（Han zi)Chinese" value="${currentPhrase["wordToShow"]}" required>
			    <div class="invalid-feedback">
			    	Please enter the phrase in the desired language and English, e.g. 汉字（Han zi)Chinese.
			    </div>
			</div>
			<div class="col-12">
			    <label for="wordToTranslate${i}" class="form-label">Words to Translate (Original Language Only)</label>
			    <input type="text" class="form-control wordToTranslate2" id="wordToTranslate{i}" placeholder="e.g. 汉字" value="${currentPhrase["wordToTranslate"]}" required>
			    <div class="invalid-feedback">
			        Please enter the phrase in the desired language only e.g. 汉字.
			    </div>
			</div>
		</div>`;
	}
});

let editSelectedButton = document.querySelector("#edit-selected-city-button");
editSelectedButton.addEventListener("click", function(event) {
	console.log("Commence replacing selected city info with new edited info:");

	citiesListObject[selectedCityToEditIndex]["cityName"] = document.querySelector("#cityName2").value;
	citiesListObject[selectedCityToEditIndex]["country"] = document.querySelector("#countryName2").value;
	citiesListObject[selectedCityToEditIndex]["cityImage"] = document.querySelector("#cityImage2").value;
	citiesListObject[selectedCityToEditIndex]["latitude"] = document.querySelector("#latitude2").value;
	citiesListObject[selectedCityToEditIndex]["longitude"] = document.querySelector("#longitude2").value;
	citiesListObject[selectedCityToEditIndex]["introduction"] = document.querySelector("#introduction2").value;
	
	citiesListObject[selectedCityToEditIndex]["buttonTextColor"] = {
		"red": document.querySelector("#redButtonTextColor2").value,
		"green": document.querySelector("#greenButtonTextColor2").value,
		"blue": document.querySelector("#blueButtonTextColor2").value
	};
	citiesListObject[selectedCityToEditIndex]["buttonBackgroundColor"] = {
		"red": document.querySelector("#redButtonBackgroundColor2").value,
		"green": document.querySelector("#greenButtonBackgroundColor2").value,
		"blue": document.querySelector("#blueButtonBackgroundColor2").value
	};
	
	citiesListObject[selectedCityToEditIndex]["speechRecognizerLanguage"] = document.querySelector("#speechRecognizerLanguage2").value;
	citiesListObject[selectedCityToEditIndex]["textToSpeechLanguage"] = document.querySelector("#textToSpeechLanguage2").value;
	citiesListObject[selectedCityToEditIndex]["translatorLanguage"] = document.querySelector("#translatorLanguage2").value;
	
	citiesListObject[selectedCityToEditIndex]["listOfImagesToFind"] = document.querySelector("#listOfImagesToFind2").value.split(",");
	
	citiesListObject[selectedCityToEditIndex]["listOfPronunciationGamePhrases"] = document.querySelector("#listOfPronunciationGamePhrases2").value.split(",");
	
	citiesListObject[selectedCityToEditIndex]["spaceshipGame"] = {
		"direction": document.querySelector("#direction2").value,
		"alphabetList": document.querySelector("#alphabetList2").value,
		"wordsToGuessList": document.querySelector("#wordsToGuessList2").value
	};

	let listOfFamousPlaces = [];
	let famousPlacesDivItemsList = document.querySelectorAll(".famousPlacesItemDiv2");
	famousPlacesDivItemsList.forEach(item => {
		let itemObject = {
			"name": item.querySelector(".famousPlacesName2").value,
			"image": item.querySelector(".famousPlacesImage2").value,
			"shortDescription": item.querySelector(".famousPlacesShortDescription2").value,
			"longDescription": item.querySelector(".famousPlacesLongDescription2").value
		};
		listOfFamousPlaces.push(itemObject);
	});
	citiesListObject[selectedCityToEditIndex]["listOfPlaces"] = listOfFamousPlaces;

	let listOfFamousFood = [];
	let famousFoodDivItemsList = document.querySelectorAll(".famousFoodItemDiv2");
	famousFoodDivItemsList.forEach(item => {
		let itemObject = {
			"name": item.querySelector(".famousFoodName2").value,
			"image": item.querySelector(".famousFoodImage2").value,
			"shortDescription": item.querySelector(".famousFoodShortDescription2").value,
			"longDescription": item.querySelector(".famousFoodLongDescription2").value
		};
		listOfFamousFood.push(itemObject);
	});
	citiesListObject[selectedCityToEditIndex]["listOfFood"] = listOfFamousFood;

	let listOfCommonPhrases = [];
	let commonPhrasesDivItemsList = document.querySelectorAll(".commonPhrasesItemDiv2");
	commonPhrasesDivItemsList.forEach(item => {
		let itemObject = {
			"wordToTranslate": item.querySelector(".wordToTranslate2").value,
			"wordToShow": item.querySelector(".wordToShow2").value,
		};
		listOfCommonPhrases.push(itemObject);
	});
	citiesListObject[selectedCityToEditIndex]["listOfPhrases"] = listOfCommonPhrases;

	console.log("Final version of all the cities after editing selected city");
	console.log(JSON.parse(JSON.stringify(citiesListObject)));

	// Send the new citiesList to firebase (key = cities)
	citiesListRef.set(citiesListObject).then(result => {
		console.log("Done sending edited city data");
		alert("This city has been updated successfully");
		location.reload();
	}).catch(error => {
	  	console.error(error);
	});
});
