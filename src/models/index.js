import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import { getConfig } from '../config';

const config = getConfig();
const basename = path.basename(module.filename);
const db = {};

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password);

fs
    .readdirSync(__dirname)
    .filter(file =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;