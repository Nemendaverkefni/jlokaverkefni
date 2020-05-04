const endpoint = 'https://gist.githubusercontent.com/anhthuvu/02012661b6fee976842f035be56a3ded/raw/5da4fb30af059d268715fbf9681901f131420328/data.json';
const events = [];
// Sækja gögn með fetch aðferð
fetch(endpoint)
    .then(
    function(response) {
        if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
                }
                response.json().then(function(data) {

	            for(let i = 0; i<data.length; i++){
		            events.push
		            ({
			            name:data[i].name,
			            date:data[i].date,
                        location:data[i].location,
			            imageSource:data[i].imageSource
		            });
	            }
                // Birting með DOM
                const section = document.querySelector('section');
                for(let i = 0; i<events.length; i++){
                    const myArticle = document.createElement('article');
                    myArticle.setAttribute("class", "a");
                    myArticle.setAttribute("id", "id"+i);
                    const myH2 = document.createElement('h2');
                    const myPara1 = document.createElement('p');
                    const myPara2 = document.createElement('p');
                    var myImage = new Image(400);
                    // Nafn
                    myH2.textContent = events[i]['name'];
                    // Íalensk dagsetning með Moment.js safni
                    myPara1.textContent = moment(events[i]['date']).format('ll');
                    // Staðsetning
                    myPara2.textContent = events[i]['location'];
                    // Mynd
                    myImage.src = events[i]['imageSource'];
                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara1);
                    myArticle.appendChild(myPara2);
                    myArticle.appendChild(myImage);
                    section.appendChild(myArticle);
		        }
                // Breyta daga í YYYY-MM-DD formi
                function timestamp(str) {
                    return new Date(str).getTime();
                } 
                function formatDate(date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;

                    return [year, month, day].join('-');
                }
                var date = new Date();
                var dateSlider = document.getElementById('range');
                function toFormat (v) {
                    return formatDate(new Date(v));
                }
                // Búa til range slider með noUiSlider safni
                noUiSlider.create(dateSlider, {
                    behaviour: 'tap',
                    connect: true,
                    tooltips: [ true, true ],
                    format: { to: toFormat, from: Number },
                    range: {
                        min: timestamp(date),
                        max: timestamp('2020-12-31')
                    },
                    step: 1 * 24 * 60 * 60 * 1000,
                    start: [timestamp(date), timestamp('2020-12-31')]
                });    
                // Range slider
                document.getElementById('filter').addEventListener('click', function () {
                    // Hide öll element
                    var divsToHide = document.getElementsByClassName("a");
                    for(var i = 0; i < divsToHide.length; i++){
                        divsToHide[i].style.display = "none";
                    }
                    // Filter og show elements
                    var dates = dateSlider.noUiSlider.get();
                    let results = events.filter(event => {
	                    return (event.date >= dates[0]) && (event.date <= dates[1]);
                    }) 
                    for(let i = 0; i<events.length; i++){
                        for(let f = 0; f<results.length; f++){
                            if (results[f] == events[i]){ 
                                divsToHide[i].style.display = "block";
						    }
                        }
                    }
                });
                // Leitarreit
                document.getElementById('search').addEventListener('click', function () {
                    // Hide öll element
                    var divsToHide = document.getElementsByClassName("a");
                    for(var i = 0; i < divsToHide.length; i++){
                        divsToHide[i].style.display = "none";
                    }
                    // Filter og show elements
                    var type = document.querySelector('.search');
                    let results = events.filter(event => {
                        const regex = new RegExp(type.value, 'gi');
	                    return event.name.match(regex) || event.location.match(regex);
                    }) 
                    for(let i = 0; i<events.length; i++){
                        for(let f = 0; f<results.length; f++){
                            if (results[f] == events[i]){ 
                                divsToHide[i].style.display = "block";
						    }
                        }
                    }
                });
                // Dagatal
                document.getElementById('date').addEventListener('click', function () {
                    // Hide öll element
                    var divsToHide = document.getElementsByClassName("a");
                    for(var i = 0; i < divsToHide.length; i++){
                        divsToHide[i].style.display = "none";
                    }
                    // Filter og show elements
                    var getDate = document.querySelector('.date').value;
                    let results = events.filter(event => {
	                    return (event.date == getDate);
                    }) 
                    for(let i = 0; i<events.length; i++){
                        for(let f = 0; f<results.length; f++){
                            if (results[f] == events[i]){ 
                                divsToHide[i].style.display = "block";
						    }
                        }
                    }
                });
            });
        }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });