const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/database.sqlite',
  logging: false
});

const SensorData = require('./backend/models/SensorData')(sequelize);
const AccidentEvent = require('./backend/models/AccidentEvent')(sequelize);

async function checkData() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const sensorCount = await SensorData.count();
    const accidentCount = await AccidentEvent.count();

    console.log(`SensorData count: ${sensorCount}`);
    console.log(`AccidentEvent count: ${accidentCount}`);

    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkData();
