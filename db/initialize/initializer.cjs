const {Client} = require('pg');
const buildQueries = require('../../lib/db/buildQueries.cjs');

const connectionString = process.argv[2];

if(!connectionString){
    console.error('connection string not provided');
    return process.exit(1);
}

const queries = buildQueries(__dirname, 'createTables');

async function main(){
    console.log('DB initialization started');
    const client = new Client({
        connectionString: connectionString,
    });
    
    await client.connect();
    for(let query of Object.values(queries)){
        await client.query(query);
    }
    await client.end();
    console.log('DB initialization complete');
}

main();