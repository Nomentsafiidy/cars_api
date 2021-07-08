const functions = require('./../function');
const daoCar = require('./../dao/car');
const daoComment = require('./../dao/comment');

module.exports = class CarService {
    /**
     * getCars
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    getCars = async (auth = false) => {
        const connection = functions.getConnection();
        const response = { success: false, cars: [] };
        const cars = await daoCar.selectCar(connection, ' 1 ');
        if (cars) {
            if (auth) {
                let carsTmp = [];
                for (let i = 0; i < cars.length; i++) {
                    const car = cars[i];
                    const comments = await daoComment.selectComment(connection, `car_id = ${car.id}`);
                    if (comments) {
                        car.comments = comments;
                    }
                    carsTmp.push(car);
                }
                response.cars = carsTmp;
            } else {
                response.cars = cars;
            }
        }
        return response;
    };

    /**
     * addUser
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    addCar = async (car) => {
        const connection = functions.getConnection();
        const response = { success: false };
        if (car.name && car.user_id && car.registration) {
            const [success, error, res] = await daoCar.insertCar(connection, car);
            if (res && res.affectedRows === 1 && res.insertId) {
                response.success = true;
            }
        } else {
            throw new Error('Invalide params');
        }
        return response;
    };

    /**
     * addUser
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    addComment = async (comment) => {
        const connection = functions.getConnection();
        const response = { success: false };
        if (comment.user_id && comment.car_id && comment.content) {
            const [success, error, res] = await daoComment.insertComment(connection, comment);
            if (res && res.affectedRows === 1 && res.insertId) {
                response.success = true;
            }
        } else {
            throw new Error('Invalide params');
        }
        return response;
    };
};
