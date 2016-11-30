


var path=require('path');
module.exports.getConfig = function(){ 
	/*Common configurations*/
	switch(process.env.NODE_ENV){
		case 'local_machine': /* Local Machine */
					return {
				/*All Route protected*/
				"all_route_protected":false,
				"all_route_username":'admin',
				"all_route_password":'Fortune14256!',
				
				/*MongoDB Credentials*/
				"mongoDB_path":"mongodb://localhost/commercio_new",
				/*Server Running port*/
				"port":3000,
				/* Contact Us form */
				

			};
		
	}
}
