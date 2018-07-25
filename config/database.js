module.exports = function(){
  switch(process.env.NODE_ENV){
    case 'local':
      return{
        'url': 'mongodb://localhost:27017/MyMusic',
         options : {
           useMongoClient: true
         }
      }
    case 'dev':
      return {
        url: process.env.DATABASE_URL,
        options: {
          poolSize: 5,
          useNewUrlParser: true,
          user: process.env.USER,
          pass: process.env.PASS,
          promiseLibrary: global.Promise
        }
      }
  }
}
