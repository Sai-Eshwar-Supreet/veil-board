const {formatDistanceToNow} = require('date-fns');


function getRelativeDate(date){
    return formatDistanceToNow(date, {addSuffix: true});
}

module.exports.getRelativeDate = getRelativeDate;