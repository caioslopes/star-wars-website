/* Where content will be load */
var contentPage = document.getElementById("content-page");

var project = {

    getPages: function(param){
        fetch(`./pages/${param}.html`)
        .then(function (response) {
          return response.text();
        })
        .then(function (responseTEXT) {
            contentPage.innerHTML = responseTEXT;
        });
    },

    getMetaTag: function(){
        return document.querySelector('meta[name="page"]').getAttribute("content");
    },

    setMetaTag: function(param){
        var metaPage = document.querySelector('meta[name="page"]');
        metaPage.setAttribute("content", param);
    },

    home: function(){
        project.getPages("home");
        project.setMetaTag("home");
        project.controlClass();
    },

    controlClass: function(){
        if(project.getMetaTag() != "home"){
            document.body.classList.remove("introduction");
        }
    },

    generateStars: function(){
        const stars = 400;

        for(let i = 0; i < stars; i++){
            let star = document.createElement("div");
            star.className = 'stars';
            var xy = randomPosition();
            star.style.top = xy[0] + "px";
            star.style.left = xy[1] + "px";
            document.body.append(star);
        }

        function randomPosition(){
            var y = window.innerWidth;
            var x = window.innerHeight;
            var randomY = Math.floor(Math.random() * y);
            var randomX = Math.floor(Math.random() * x);
            return [randomX, randomY];
        }
    },

    stopAnimation: function(){
        document.addEventListener("keydown", ()=>{
            document.querySelector("#animation").style.display = 'none';
            document.querySelector("#content-page .start").classList.add("on-screen");
        })
    },

    startOption: function(){
        setTimeout(() => {
            var start = document.querySelector("#content-page .start");
            start.classList.add("on-screen");
        }, 58 * 1000);
    },

    sobre: function(){
        project.getPages("sobre");
        project.setMetaTag("sobre");
        project.controlClass();
    },

    personagens: function(){
        project.getPages("personagens");
        project.setMetaTag("personagens");
        project.controlClass();
    },

    veiculos: function(){
        project.getPages("veiculos");
        project.setMetaTag("veiculos");
        project.controlClass();
    },

    planetas: function(){
        project.getPages("planetas");
        project.setMetaTag("planetas");
        project.controlClass();

        setTimeout(() => {
            var planet = document.querySelectorAll(".planet");
            const append_info = document.getElementById("append_info");
            const template_info = document.getElementById("template_info");
            const loading = document.querySelector(".loading");
            
            for(let i = 0; i < planet.length; i++){
                planet[i].addEventListener("mouseenter", ()=>{

                    loading.classList.add("on-screen");

                    fetch(`https://swapi.dev/api/planets/${i+1}/`)
                    .then(function (response) {
                    return response.json();
                    })
                    .then(function (reponseJSON) {
                        const div = template_info.content.cloneNode(true);
                        div.getElementById("prev_name").innerHTML = "Name: " + reponseJSON.name;
                        div.getElementById("prev_orbital").innerHTML = "Orbital_period: " + reponseJSON.orbital_period;
                        div.getElementById("prev_population").innerHTML = "Population: " + reponseJSON.population;
                        append_info.append(div);
                        loading.classList.remove("on-screen");
                    });

                    planet[i].addEventListener("mouseleave", ()=>{
                        append_info.innerHTML = '';
                        loading.classList.remove("on-screen");
                    })
                })
            }
        }, 100);
    },

    viagem: function () {

        var allStars = document.querySelectorAll(".stars");

        /* allStars.forEach(element => {
            setInterval(() => {
                element.style.left = "0";
            }, 5000);
        }); */

        project.planetas();
    }

}

project.home();
project.controlClass();
project.generateStars();
project.stopAnimation();
project.startOption();
