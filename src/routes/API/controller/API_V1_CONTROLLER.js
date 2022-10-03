

import { pool } from '../../../database.js';
import { v4 } from 'uuid'

/* ---------------------------------- Index --------------------------------- */
const Index = (req, res)=>{
    res.json({
        message:'Welcome to API for Vehicle_app'
    });
}

/* ---------------------------------- User ---------------------------------- */
const getPersons = async (req, res)=>{
    try {

        const [result] = await pool.query('SELECT * FROM user ORDER BY names ASC');
        res.json({
            status:1,
            message:"SUCCESS",
            data:result
        });

    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const getPerson = async(req, res)=>{
    try {

        const [result] = await pool.query(`SELECT * FROM user WHERE dni = ${req.body.dni}`);
        res.json({
            status:1,
            message:"SUCCESS",
            data:result
        });

    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const createPerson = async (req, res)=>{
    try {

        await pool.query(
            `INSERT INTO user VALUES ('${req.body.dni}', '${req.body.names}', '${req.body.lastNames}', '${req.body.birthday}', '${req.body.worker}', ${req.body.married}, ${req.body.income}
            )`
        );

        res.json({
            status:1,
            message: "USER SAVED"
        });

    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const updatePerson = async (req, res)=>{
    try {

        const [result] = await pool.query(
            `UPDATE user SET ? WHERE dni = ?`,
            [
                {
                    dni:req.body.dni,
                    names:req.body.names,
                    last_names:req.body.lastNames,
                    birthday:req.body.birthday,
                    worker:req.body.worker,
                    married:req.body.married,
                    income:req.body.income
                },
                req.body.dni
            ]
        );
        res.json({
            status: result.changedRows === 0 ? 1 : 0,
            message:result.info
        });


    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

    //!Eliminar datos de otras tablas
const deletePerson = async (req, res)=>{
    const [result] = await pool.query(`DELETE FROM user WHERE dni = ${req.body.dni}`);
    res.json({
        status: result === 0 ? 0 : 1,
        message:`Affected Rows: ${result.affectedRows}`
    });
}


/* --------------------------------- Vehicle -------------------------------- */
const getVehicles = async(req, res)=>{
    try {
        const [result] = await pool.query('SELECT * FROM vehicle ORDER BY status ASC');
        // res.status(200).json(result);
        res.status(200).json({
            status:1,
            message:"SUCCESS",
            data:result
        });
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const getVehicle = async(req, res)=>{
    try {

        const [result] = await pool.query(`SELECT * FROM vehicle WHERE idVehicle = '${req.body.idVehicle}'`);
        res.status(200).json({
            status:1,
            message:"SUCCESS",
            data:result
        });

    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const createVehicle = async (req, res)=>{
    try {

        console.log(req.body)
        await pool.query(
            `INSERT INTO vehicle VALUES ('${req.body.idVehicle}', '${req.body.brand}', '${req.body.model}', ${req.body.doors}, '${req.body.type}', '${req.body.status}')`
        );

        await pool.query(
            `INSERT INTO register VALUES('${v4()}', '${req.body.idVehicle}', CURRENT_TIMESTAMP, Null)`
        )

        res.status(200).json({
            status:1,
            message: "VEHICLE SAVED"
        });

    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

const updateVehicle = async (req, res)=>{
    try {
        const [result] = await pool.query(
            `UPDATE vehicle SET ? WHERE idVehicle = ?`,
            [
                req.body.data, req.body.id
            ]
        );

        await pool.query(
            `UPDATE register SET end_date = CURRENT_TIMESTAMP WHERE Vehicle_vin = '${req.body.data.idVehicle}' AND end_date IS Null`
        );

        await pool.query(
            `INSERT INTO register VALUES('${v4()}', '${req.body.data.idVehicle}', CURRENT_TIMESTAMP, ${null})`
        )

        console.log(result)
        res.json({
            status: result.changedRows === 0 ? 1 : 0,
            message:result.info
        });


    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

    //!Eliminar datos de otras tablas
const deleteVehicle = async (req, res)=>{
    await pool.query(`DELETE FROM register WHERE Vehicle_vin = '${req.body.idVehicle}'`);
    const [result] = await pool.query(`DELETE FROM vehicle WHERE idVehicle = '${req.body.idVehicle}'`);
    res.json({
        status: result === 0 ? 0 : 1,
        message:`Affected Rows: ${result.affectedRows}`
    });
}

/* --------------------------------- Rental --------------------------------- */

const getRental = async (req, res)=>{
    try {
        const [result] = await pool.query(`SELECT * FROM register WHERE Vehicle_vin = '${req.body.idVehicle}' ORDER BY end_date ASC`);
        res.status(200).json({
            status:1,
            message:"SUCCESS",
            data:result
        });
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({status:-1, message:error.message});
    }
}

/* --------------------------------- Exports -------------------------------- */
export {
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
};

// try {

// } catch (error) {
//     console.log(error);
//     console.error(error.message);
//     res.status(500).json({status:-1, message:error.message});
// }