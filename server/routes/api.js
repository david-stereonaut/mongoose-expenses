const express = require('express')
const router = express.Router()
const moment = require('moment')
// const data = require('../../expenses.json')

const mongoose = require('mongoose')
const Expense = require("../model/Expense")

mongoose.connect("mongodb://localhost/mongoose-expense")

/* addind data to db */
// data.forEach(d => {
//     let x = new Expense(d)
//     x.save()
// })

router.get('/expenses', function(req, res) {
    Expense.find({}).sort({ date: -1 }).then(function(result){
        res.send(result)
    })
})

router.post('/expense', function(req, res) {
    let newDate
    req.body.date ? newDate = moment(req.body.date).format('LLLL') : newDate = moment().format('LLLL')
    let expense = new Expense({
        name: req.body.name,
        amount: req.body.amount,
        group: req.body.group,
        date: newDate
    })
    expensePromise = expense.save()
    expensePromise.then(function(doc) {
        console.log(`You have spend ${doc.amount} money on ${doc.group}`)
        res.send(doc)
    })
})

router.put('/update', function(req, res) {
    Expense.findOneAndUpdate({ group: req.body.group1 }, { $set: { group: req.body.group2 } }, { new: true }, function(err, expense) {
        console.log(`${expense.name}'s group has been updated from ${req.body.group1} to ${expense.group}`)
        res.send(`${expense.name}'s group has been updated from ${req.body.group1} to ${expense.group}`)
    })
})

router.get('/expenses/:group/:total/:d1?/:d2?', function(req, res) {
    if (req.params.group === "all") {
        if (req.params.total === "true") {
            if (req.params.d1) {
                d1 = moment(req.params.d1).format('LLLL')
                if(req.params.d2) {
                    d2 = moment(req.params.d2).format('LLLL')
                    Expense.aggregate([
                        { $match: { date: { $gte: new Date(d1), $lte: new Date(d2)} } },
                        { $group: {
                            _id: null,
                            totalExpenses: { $sum: "$amount" }
                        }}
                    ]).exec().then(function(result){
                        res.send(result)
                    })
                } else {
                    Expense.aggregate([
                        { $match: { date: { $gte: new Date(d1)} } },
                        { $group: {
                            _id: null,
                            totalExpenses: { $sum: "$amount" }
                        }}
                    ]).then(function(result){
                        res.send(result)
                    })
                }
            } else {
                Expense.aggregate([
                    { $group: {
                        _id: null,
                        totalExpenses: { $sum: "$amount" }
                    }}
                ]).then(function(result){
                    res.send(result)
                })
            }
        } else {
            if (req.params.d1) {
                d1 = moment(req.params.d1).format('LLLL')
                if(req.params.d2) {
                    d2 = moment(req.params.d2).format('LLLL')
                    Expense.find({ date: { $gte: d1, $lte: d2} }).sort({ date: -1 }).then(function(results) {
                        res.send(results)
                    })
                } else {
                    Expense.find({ date: { $gte: d1 } }).sort({ date: -1 }).then(function(results) {
                        res.send(results)
                    })
                }
            } else {
                Expense.find({}).sort({ date: -1 }).then(function(results) {
                    res.send(results)
                })
            }
        }
    } else {
        if (req.params.total === "true") {
            if (req.params.d1) {
                d1 = moment(req.params.d1).format('LLLL')
                if(req.params.d2) {
                    d2 = moment(req.params.d2).format('LLLL')
                    Expense.aggregate([
                        { $match: { date: { $gte: new Date(d1), $lte: new Date(d2)}, group: req.params.group } },
                        { $group: {
                            _id: null,
                            totalExpenses: { $sum: "$amount" }
                        }}
                    ]).exec().then(function(result){
                        res.send(result)
                    })
                } else {
                    Expense.aggregate([
                        { $match: { group: req.params.group, date: { $gte: new Date(d1)} } },
                        { $group: {
                            _id: null,
                            totalExpenses: { $sum: "$amount" }
                        }}
                    ]).then(function(result){
                        res.send(result)
                    })
                }
            } else {
                Expense.aggregate([
                    { $match: { group: req.params.group } },
                    { $group: {
                        _id: null,
                        totalExpenses: { $sum: "$amount" }
                    }}
                ]).then(function(result){
                    res.send(result)
                })
            }
        } else {
            if (req.params.d1) {
                d1 = moment(req.params.d1).format('LLLL')
                if(req.params.d2) {
                    d2 = moment(req.params.d2).format('LLLL')
                    Expense.find({ group: req.params.group, date: { $gte: d1, $lte: d2} }).sort({ date: -1 }).then(function(results) {
                        res.send(results)
                    })
                } else {
                    Expense.find({ group: req.params.group, date: { $gte: d1 } }).sort({ date: -1 }).then(function(results) {
                        res.send(results)
                    })
                }
            } else {
                Expense.find({ group: req.params.group }).sort({ date: -1 }).then(function(results) {
                    res.send(results)
                })
            }
        }
    }
    // if (req.params.total === "true") {
    //     if (req.params.d1) {
    //         d1 = moment(req.params.d1).format('LLLL')
    //         if(req.params.d2) {
    //             d2 = moment(req.params.d2).format('LLLL')
    //             Expense.aggregate([
    //                 { $match: { date: { $gte: new Date(d1), $lt: new Date(d2)}, group: req.params.group } },
    //                 { $group: {
    //                     _id: null,
    //                     totalExpenses: { $sum: "$amount" }
    //                 }}
    //             ]).exec().then(function(result){
    //                 res.send(result)
    //             })
    //         } else {
    //             Expense.aggregate([
    //                 { $match: { group: req.params.group, date: { $gte: new Date(d1)} } },
    //                 { $group: {
    //                     _id: null,
    //                     totalExpenses: { $sum: "$amount" }
    //                 }}
    //             ]).then(function(result){
    //                 res.send(result)
    //             })
    //         }
    //     } else {
    //         Expense.aggregate([
    //             { $match: { group: req.params.group } },
    //             { $group: {
    //                 _id: null,
    //                 totalExpenses: { $sum: "$amount" }
    //             }}
    //         ]).then(function(result){
    //             res.send(result)
    //         })
    //     }
    // } else {
    //     if (req.params.d1) {
    //         d1 = moment(req.params.d1).format('LLLL')
    //         if(req.params.d2) {
    //             d2 = moment(req.params.d2).format('LLLL')
    //             Expense.find({ group: req.params.group, date: { $gte: d1, $lte: d2} }).sort({ date: -1 }).then(function(err, results) {
    //                 res.send(results)
    //             })
    //         } else {
    //             Expense.find({ group: req.params.group, date: { $gte: d1 } }).sort({ date: -1 }).then(function(err, results) {
    //                 res.send(results)
    //             })
    //         }
    //     } else {
    //         Expense.find({ group: req.params.group }).sort({ date: -1 }).then(function(err, results) {
    //             res.send(results)
    //         })
    //     }
    // }
})

module.exports = router