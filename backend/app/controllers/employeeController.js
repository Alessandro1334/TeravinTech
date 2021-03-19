const { Employee } = require('../models')
const { Op } = require('sequelize')
const { check, validationResult } = require('express-validator');

module.exports = {
    /*
        Get all data
    */
    getAll: async (req, res) => {
        try {
            const sorting = { asc: "ASC", desc: "DESC" }
            let conditions = { order: [["updatedAt", "DESC"]] }
            let { search, limit, sort, page = 1 } = req.query
            if (search) {
                conditions.where = { nama: { [Op.substring]: search } }
            }
            if (sort) {
                const sortingFields = [
                    "name",
                    "email",
                    "mobile",
                    "birthdate",
                    "address",
                    "createdAt",
                    "updatedAt",
                ]
                let [field, order] = sort.toLowerCase().split("-");
                const column = sortingFields.find((col) =>
                    field.includes(col.toLocaleLowerCase())
                );
                if (!column)
                    return res.status(400).send({
                        message: `Can't sort Employees by '${field}'`,
                    });
                if (!(order in sorting))
                    return res.status(405).send({
                        message: "Sorting method must be: ASC or DESC!",
                    });
                conditions.order = [[column, sorting[order]]];
            }

            if (limit) {
                limit = Number.parseInt(limit < 1 ? 1 : limit);
                page = Number.parseInt(page < 1 ? 1 : page);
                if (Number.isNaN(limit) || Number.isNaN(page))
                    res.status(400).send({
                        message: "Request query (limit or page) must be a number!",
                    });
                conditions.limit = limit;
                conditions.offset = (page - 1) * limit;
            }

            let result = await Employee.findAndCountAll({
                ...conditions
            });

            result = {
                totalRows: result.count,
                totalPage: Math.ceil(result.count / (limit || result.count)),
                rows: result.rows,
            };

            res.status(200).send({
                message: result.rows.length
                    ? "Berhasil mendapatkan data Employee!"
                    : "Data Employee tidak ada!",
                data: result,
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 'Internal Server Error' })
        }
    },

    /*
       Create data
   */
    create: async (req, res) => {
        await check('name')
            .notEmpty().withMessage('Name is required!')
            .isLength({ max: 50 }).withMessage('Max character is must be 50!')
            .run(req);

        await check('email')
            .notEmpty().withMessage('Email is required!')
            .isEmail().withMessage('Invalid email address!')
            .custom(value => {
                return Employee.findAll({ where: { email: value } }).then(Employee => {
                    if (Employee.length) {
                        return Promise.reject('E-mail already in use');
                    }
                });

            })
            .run(req);

        await check('mobile')
            .notEmpty().withMessage('Mobile is required!')
            .isNumeric().withMessage('Mobile only numberic!')
            .isLength({ min: 10 }).withMessage('Min character is must be 10!')
            .run(req);

        await check('birthdate')
            .notEmpty().withMessage('Birthdate is required!')
            .run(req);

        await check('address')
            .notEmpty().withMessage('Address is required!')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        try {
            let { name, email, mobile, birthdate, address } = req.body

            let id = birthdate.substr(2, 2) + birthdate.substr(5, 2);
            const idEmployee = await Employee.findOne({
                where: {
                    id: { [Op.substring]: id },
                },
                order: [["id", "DESC"]]
            });

            if (idEmployee) {
                id = parseInt(idEmployee.dataValues.id) + 1
            } else {
                id = parseInt(id + '0001')
            }

            const data = { id, name, email, mobile, birthdate, address }

            const result = await Employee.create(data)
            res.status(201).send({
                message: `Data Employee ${result.name} berhasil ditambahkan`,
                data: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: 'Internal Server Error',
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await Employee.findByPk(id)
            res.status(200).send({
                message: result ? `Data detail employee ${result.name}` : `Employee id: ${id} tidak ditemukan`,
                data: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 'Internal Server Error' })
        }
    },
    update: async (req, res) => {
        await check('name')
            .notEmpty().withMessage('Name is required!')
            .isLength({ max: 50 }).withMessage('Max character is must be 50!')
            .run(req);

        await check('email')
            .notEmpty().withMessage('Email is required!')
            .isEmail().withMessage('Invalid email address!')
            .run(req);

        await check('mobile')
            .notEmpty().withMessage('Mobile is required!')
            .isNumeric().withMessage('Mobile only numberic!')
            .isLength({ min: 10 }).withMessage('Min character is must be 10!')
            .run(req);

        await check('birthdate')
            .notEmpty().withMessage('Birthdate is required!')
            .run(req);

        await check('address')
            .notEmpty().withMessage('Address is required!')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        try {
            const { id } = req.params
            let { name, email, mobile, birthdate, address } = req.body

            const checkData = await Employee.findByPk(id)
            if (!checkData) {
                return res.status(400).send({
                    message: `Employee id: ${id} tidak ditemukan`
                })
            }

            const data = { id, name, email, mobile, birthdate, address }

            await Employee.update(data, { where: { id: id } })
            res.status(201).send({
                message: `Data Employee ${data.name} berhasil diubah`,
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: 'Internal Server Error',
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const employee = await Employee.findOne({
                where: {
                    id: { [Op.eq]: id }
                },
            })
            if (!employee) {
                return res.status(404).send({
                    message: `Employee id: ${id} tidak ditemukan`,
                });
            }
            await employee.destroy()
            res.status(200).send({
                message: `Data employee ${employee.name} berhasil dihapus`,
                data: employee
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 'Internal Server Error' })
        }
    }

}