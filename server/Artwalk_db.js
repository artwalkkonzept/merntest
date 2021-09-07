class Db {
    /**
     * Constructors an object for accessing artwalks in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store artwalks in MongoDB
        const artwalkSchema = new mongoose.Schema({
            name: String,
            bilds: [String] // A list of bilds as string
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

    async addBild(artwalkId, bild) {
        // TODO: Error handling
        const artwalk = await this.getArtwalk(artwalkId);
        artwalk.bilds.push(bild);
        return await artwalk.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of artwalks to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 4) {
        const bilds = ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4','Bild 5', 'Bild 6', 'Bild 7', 'Bild 8', 'Bild 9', 'Bild 10'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (4) + min);
        }

        function getRandomName() {
            return ['ZKM-Tour', 'Landschaften', 'Imprissionistische Landschaften', 'Tour'][getRandomInt(0,3)]
        }

        function getRandomBilds() {
            const shuffled = bilds.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getArtwalks()).length;
        console.log("Artwalk collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let artwalk = new this.artwalkModel({
                    name: getRandomName(),
                    bilds: getRandomBilds()
                });
                promises.push(artwalk.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the artwalks in the database
module.exports = mongoose => new Db(mongoose);