const dns = require('dns');
const { MongoClient } = require('mongodb');

// Node was using DNS 127.0.0.1 (VPN/antivirus/local proxy), which refuses
// MongoDB Atlas SRV lookups (querySrv ECONNREFUSED). Use public DNS instead.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const url =
  'mongodb+srv://shaikhfarhan549_db_user:@namastenode.zqgcfdm.mongodb.net/';

const client = new MongoClient(url);
const dbName = 'HelloWorld';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Users');
 

  const date ={
    firstName: 'deema',
    lastName: 'hare',
    email: 'deema@example.com',
    city:'Pune',
  };

    // const deleteResult = await collection.deleteOne({ firstName: 'Seema' });
    // console.log('Deleted documents =>', deleteResult);

    //const insertResult = await collection.insertOne(date);
    //console.log('Inserted documents =>', insertResult);

    //   const updateResult = await collection.updateOne(
    //     { firstName: 'Seema' },
    //     { $set: { phoneNumber: '7798286678' } }
    //   );
    //   console.log('Updated documents =>', updateResult);


  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
   return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
