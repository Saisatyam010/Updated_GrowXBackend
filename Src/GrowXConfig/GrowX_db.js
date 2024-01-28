const mongoose = require('mongoose');

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://growxad01:Qurilogrow@atlascluster.hvvurni.mongodb.net/GrowXAdDatabase?retryWrites=true&w=majority', {
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  