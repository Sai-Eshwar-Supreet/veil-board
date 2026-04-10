const fs = require('node:fs');
const path = require('node:path');

function buildQueries(dirname, ...queryNames){
    const queries = {};

    queryNames.forEach(queryName => {
        const query = fs.readFileSync(path.join(dirname, 'queries', `${queryName}.sql`), 'utf-8');
        queries[queryName] = query;
    });

    return queries;
}

module.exports = buildQueries;