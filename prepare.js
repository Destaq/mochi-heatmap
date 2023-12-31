// We want to fetch from the Mochi API until no more data is returned.
async function fetchMochiPage(API_KEY, bookmark) {
	let url;
	if (bookmark) {
		url = `https://app.mochi.cards/api/cards?limit=100&bookmark=${bookmark}`;
	} else {
		url = `https://app.mochi.cards/api/cards?limit=100`;
	}
	const response = await fetch(url
		, {
			headers: {
				// HTTP basic auth where the username is the API_KEY and the password is empty.
				"Authorization": "Basic " + btoa(API_KEY + ":")
			}
		});
	if (!response.ok) {
		document.getElementById("loading").style.display = "none";
		alert("Error fetching data from Mochi. Please check your API key and try again.");
	} else {
		return await response.json();
	}
}

async function parseFetchedData(data, dateObj) {
	let docs = data["docs"];

	// Iterate through docs.
	for (let i = 0; i < docs.length; i++) {
		// Iterate through reviews.
		for (let j = 0; j < docs[i]["reviews"].length; j++) {
			let review = docs[i]["reviews"][j];
			let date = new Date(review["date"]["date"]);
			// Check if the date (e.g. 2023-01-01) is in the dateObj.
			// This is accurate to the day, don't make it accurate to the e.g. second.
			if (dateObj[date.toISOString().split("T")[0]]) {
				dateObj[date.toISOString().split("T")[0]] += 1;
			} else {
				dateObj[date.toISOString().split("T")[0]] = 1;
			}

			if (j === docs[i]["reviews"].length - 1) {
				// If we're on the last review, get the due date.
				let dueDate = new Date(review["due"]["date"]);
				// Again, check if the date (e.g. 2023-01-01) is in the dateObj to the day *and* if it is in the future.
				// Using negative numbers in order to color a different way.
				if (dateObj[dueDate.toISOString().split("T")[0]] &&
					new Date(dueDate.toISOString().split("T")[0]) > new Date()) {
					dateObj[dueDate.toISOString().split("T")[0]] -= 1;
				} else if (new Date(dueDate.toISOString().split("T")[0]) > new Date()) {
					dateObj[dueDate.toISOString().split("T")[0]] = -1;
				} else {
					// We need to load these over to today.
					const date = new Date();
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
					const day = String(date.getDate()).padStart(2, "0");

					const formattedToday = `${year}-${month}-${day}`;

					if (dateObj[formattedToday]) {
						dateObj[formattedToday] -= 1;
					} else {
						dateObj[formattedToday] = -1;
					}
				}
			}
		}
	}
}

async function formatDateObj(dateObj) {
	let formattedDateObj = [];
	for (let key in dateObj) {
		formattedDateObj.push({date: key, value: dateObj[key]});
	}
	return formattedDateObj;
}

async function run(API_KEY, callback) {
	let dateObj = {};
	// Tell the user we're fetching data.
	document.getElementById("loading").style.display = "block";
	let data = await fetchMochiPage(API_KEY);
	if (data === undefined) {
		return;
	}
	await parseFetchedData(data, dateObj);
	while (data["docs"].length > 0) {
		data = await fetchMochiPage(API_KEY, data["bookmark"]);
		await parseFetchedData(data, dateObj);
	}
	dateObj = await formatDateObj(dateObj);
	// Tell the user we're done fetching data.
	document.getElementById("loading").style.display = "none";
	return callback(dateObj);
}
