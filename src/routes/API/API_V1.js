import { Router } from 'express';
import {
    Index,
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson,
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getRental
} from './controller/API_V1_CONTROLLER.js';

const API_Router = Router();

/* ---------------------------------- Index --------------------------------- */
API_Router.get('/', Index);
API_Router.post('/', Index);

/* ---------------------------------- Users --------------------------------- */
API_Router.post('/getPersons', getPersons);
API_Router.post('/getPerson', getPerson);
API_Router.post('/createPerson', createPerson);
API_Router.post('/updatePerson', updatePerson);
API_Router.post('/deletePerson', deletePerson);

/* -------------------------------- Vehicles -------------------------------- */
API_Router.post('/getVehicles', getVehicles);
API_Router.post('/getVehicle', getVehicle);
API_Router.post('/createVehicle', createVehicle);
API_Router.post('/updateVehicle', updateVehicle);
API_Router.post('/deleteVehicle', deleteVehicle);

/* --------------------------------- Rental --------------------------------- */
API_Router.post('/getRental', getRental);

export { API_Router };
