const mongoose = require('mongoose')

var StockMaster = mongoose.model('StockMaster',
{
    name : {type:String},
    lastClose : {type:String},
    isAnalysis:{type:Boolean},
},'StockMasters')

module.exports = { StockMaster}