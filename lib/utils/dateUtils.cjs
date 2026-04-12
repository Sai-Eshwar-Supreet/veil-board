const {formatDistanceToNow} = require('date-fns');


function getRelativeDate(date){
    if(!date) return null;
    return formatDistanceToNow(date, {addSuffix: true});
}

module.exports.getRelativeDate = getRelativeDate;