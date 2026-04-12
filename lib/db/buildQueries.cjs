const fs = require('node:fs');
const path = require('node:path');

function buildQueries(dirname, ...queryNames){
    const queries = {};

    queryNames.forEach(queryName => {
        const filePath = path.join(dirname, 'queries', `${queryName}.sql`);

        if(!fs.existsSync(filePath)){
            throw new Error(`Missing SQL file: ${filePath}`);
        }
        
        queries[queryName] = fs.readFileSync(filePath, 'utf-8');
    });

    return queries;
}

module.exports = buildQueries;