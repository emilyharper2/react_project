const { enableIndexedDbPersistence } = require('firebase/firestore');
const { mockFirebase } = require('firestore-jest-mock');
const {mockCollection} = require('firestore-jest-mock/mocks/firestore')

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
  database: {
    HotelStays: [
      { category: 'Hotel Stays', countryName: 'Brazil', emissions: 61.500, noOfNights: 5},
      { category: 'Hotel Stays', countryName: 'UK', emissions: 83.400, noOfNights: 6 },
    ],
    Commuting: [
        { category: 'Commuting', transportType: 'Small Car (Petrol)', distanceTravelled: 50, comEmissions: 7.473 }
    ],
    BusinessTravel: [
        { category 'Business Travel', transportType2: 'Ferry (Foot Passenger)', distanceTravelled2: 400, businessEmissions: 7.495 }
    ]
  },
});

test('mock test - Hotel Stays' () => {
    const firebase = require('firebase');
    const db = firebase.firestore();

    return db
    .collection('HotelStays')
    .get()
    .then(HotelStaysDocs => {
        expect(mockCollection).toHaveBeenCalledWith('HotelStays')
    });
});

test('mock test - Commuting' () => {
    const firebase = require('firebase');
    const db = firebase.firestore();

    return db
    .collection('Commuting')
    .get()
    .then(CommutingDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Commuting')
    });
});

test('mock test - Business Travel' () => {
    const firebase = require('firebase');
    const db = firebase.firestore();

    return db
    .collection('Business Travel')
    .get()
    .then(BusinessTravelDocs => {
        expect(mockCollection).toHaveBeenCalledWith('BusinessTravel')
    });
});