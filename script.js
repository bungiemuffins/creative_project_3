let app = new Vue ({
    el: '#app',
    data: {
        loading: false,
        currentCharacter: {
            image: '',
        },
        charSearch: '',
        homeWorld: '',

    },
    created() {
        this.charAPI();
    },
    methods: {
        async charAPI() {
            try {
                this.loading = true;
                var rand = Math.floor((Math.random() * 87) + 1);
                var search = '';
                if(this.charSearch === '') {
                    search = rand;
                }
                else {
                    search = '?=' + this.charSearch;
                }
                const response = await axios.get('https://swapi.co/api/people/' + search + '/');
                console.log('json :', response);
                if(search === rand) {
                    this.currentCharacter = response.data;
                }
                else{
                    this.currentCharacter = response.data.results[0];
                }
                console.log(this.currentCharacter);
                //var tempName = this.currentCharacter.name;
                //tempName = tempName.replace(' ', '%20');
                //image = this.getImage(tempName);
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }

        },

        
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

                