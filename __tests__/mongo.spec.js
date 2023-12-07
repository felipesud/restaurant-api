const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { restart } = require('nodemon');
dotenv.config();

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('restaurants');
  });
  afterAll(async () => {
    await connection.close();
  });

  it(
    'should insert a new restaurant into the restaurants collection',
    async () => {
      const restaurants = db.collection('restaurants');

      const mockRestaurant = {
        id: 'some-user-id',
        restaurantName: 'Symphony Restaurant',
        streetAddress: '4400 Sharon Rd',
        city: 'Charlotte',
        state: 'North Carolina',
        country: 'United States',
        zipCode: '28211',
        phoneNumber: '111-222-3348',
        email: 'symphonyrestaurant@gmail.com',
      };

      await restaurants.insertOne(mockRestaurant);

      const insertedRestaurants = await restaurants.findOne({
        id: 'some-user-id',
      });

      expect(insertedRestaurants).toEqual(mockRestaurant);
    },

    it('should delete a restaurant from the restaurants collection', async () => {
      const restaurants = db.collection('restaurants');
      await restaurants.deleteMany({ id: 'some-user-id' });
      const deletedRestaurant = await restaurants.findOne({
        id: 'some-user-id',
      });
      expect(deletedRestaurant).toEqual(null);
    })
  );
});
