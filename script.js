let app = new Vue ({
    el: '#app',
    data: {
        loading: false,
        currentCharacter: {
            image: '',
        },
        charSearch: '',
        homeWorld: '',
        currentMovie: [],
        currentHomeworld: {},
        currentSpecies: {},
    },
    created() {
        this.charAPI();
    },
    methods: {
        async charAPI() {
            try {
                this.loading = true;
                var rand = Math.floor((Math.random() * 87) + 1);
                const response = await axios.get('https://swapi.co/api/people/' + rand + '/');
                console.log('json :', response);
                this.currentCharacter = response.data;
                this.homeworldReq(this.currentCharacter.homeworld);
                this.speciesReq(this.currentCharacter.species[0]);
                this.movieReq();
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },

        async searchChar() {
            try {
                this.loading = true;
                const response = await axios.get('https://swapi.co/api/people/?search=' + this.charSearch);
                console.log('response :', response);
                this.currentCharacter = response.data.results[0];
                this.homeworldReq(this.currentCharacter.homeworld);
                this.speciesReq(this.currentCharacter.species[0]);
                this.movieReq();
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },

        async movieReq() {
            try {
                this.loading = true;
                this.currentMovie = [];
                for(var i = 0; i < this.currentCharacter.films.length; i++) {
                    const response = await axios.get(this.currentCharacter.films[i]);
                    this.currentMovie.push({
                        name: response.data.title,
                        opening_crawl: response.data.opening_crawl,
                    });
                }
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },

        async homeworldReq(homeworld) {
            try {
                this.loading = true;
                const response = await axios.get(homeworld);
                console.log('json :', response);
                this.currentHomeworld = response.data;
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },

        async speciesReq(species) {
            try {
                this.loading = true;
                const response = await axios.get(species);
                console.log('json :', response);
                this.currentSpecies = response.data;
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        }

        
    },
})
       






/*
async getImage(tempName) {
                    try {
                        const response = await axios.get('https://private-anon-4a5877d44e-starhub.apiary-proxy.com/api/characters/?' + tempName + '=');
                        console.log("json :", response);
                        return true;
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                */

                