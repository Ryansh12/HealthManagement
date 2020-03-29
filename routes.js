const routes = require( 'next-routes' )

module.exports = routes()
.add('index')
.add('App', '/App')
.add('InsuranceOwner', '/InsuranceOwner')
.add('MedicalRecordForm', '/MedicalRecordForm')
.add('OwnerHomePage','/OwnerHomePage')