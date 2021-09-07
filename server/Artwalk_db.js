class Db {
    /**
     * Constructors an object for accessing artwalks in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store artwalks in MongoDB
        const artwalkSchema = new mongoose.Schema({
            name: String,
            hobbies: [String] // A list of hobbies as string
        });

        // This model is used in the methods of this class to access artwalks
        this.artwalkModel = mongoose.model('artwalk', artwalkSchema);
    }

    async getArtwalks() {
        try {
            return await this.artwalkModel.find({});
        } catch (error) {
            console.error("getArtwalks:", error.message);
            return {};
        }
    }

    async getArtwalk(id) {
        try {
            return await this.artwalkModel.findById(id);
        } catch (error) {
            console.error("getArtwalk:", error.message);
            return {};
        }
    }

    async createArtwalk(newArtwalk) {
        // TODO: Error handling
        let artwalk = new this.artwalkModel(newArtwalk);
        return await artwalk.save();
    }

    async addHobby(artwalkId, hobby) {
        // TODO: Error handling
        const artwalk = await this.getArtwalk(artwalkId);
        artwalk.hobbies.push(hobby);
        return await artwalk.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of artwalks to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 15) {
        const hobbies = ['sleeping', 'purring', 'eating', 'people watching'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomName() {
            return ['ZKM-Tour', 'Landschaften', 'Impressionistische Landschaften', 'Snowball'][getRandomInt(0,3)]
        }

        function getRandomHobbies() {
            const shuffled = hobbies.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getaArtwalks()).length;
        console.log("Artwalk collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let artwalk = new this.artwalkModel({
                    name: getRandomName(),
                    hobbies: getRandomHobbies()
                });
                promises.push(artwalk.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the artwalks in the database
module.exports = mongoose => new Db(mongoose);