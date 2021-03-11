const { User } = require('../models')
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
            let { search, sort } = req.query
            if (search) {
                conditions.where = { nama: { [Op.substring]: search } }
            }
            if (sort) {
                const sortingFields = [
                    "nama",
                    "email",
                    "alamat",
                    "createdAt",
                    "updatedAt",
                ]
                let [field, order] = sort.toLowerCase().split("-");
                const column = sortingFields.find((col) =>
                    field.includes(col.toLocaleLowerCase())
                );
                if (!column)
                    return res.status(400).send({
                        message: `Can't sort users by '${field}'`,
                    });
                if (!(order in sorting))
                    return res.status(405).send({
                        message: "Sorting method must be: ASC or DESC!",
                    });
                conditions.order = [[column, sorting[order]]];
            }

            let result = await User.findAndCountAll({
                ...conditions
            });

            res.status(200).send({
                message: result.rows.length
                    ? "Berhasil mendapatkan data user!"
                    : "Data user tidak ada!",
                data: result.rows,
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
        await check('nama')
            .notEmpty().withMessage('Nama is required!')
            .isLength({ max: 50 }).withMessage('Max character is must be 50!')
            .run(req);

        await check('no_hp')
            .notEmpty().withMessage('No hp is required!')
            .isNumeric().withMessage('No hp only numberic!')
            .isLength({ min: 10 }).withMessage('Min character is must be 10!')
            .run(req);

        await check('email')
            .notEmpty().withMessage('Email is required!')
            .isEmail().withMessage('Invalid email address!')
            .custom(value => {
                return User.findAll({ where: { email: value } }).then(user => {
                    if (user.length) {
                        return Promise.reject('E-mail already in use');
                    }
                });

            })
            .run(req);

        await check('alamat')
            .notEmpty().withMessage('Alamat is required!')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        try {
            const {
                nama, no_hp, email, alamat
            } = req.body

            const data = { nama, no_hp, email, alamat }

            const result = await User.create(data)
            res.status(201).send({
                message: `Data user ${result.nama} berhasil ditambahkan`,
                data: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: 'Internal Server Error',
            })
        }
    },

}