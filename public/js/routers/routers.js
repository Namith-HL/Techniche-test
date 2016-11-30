app.config(['$routeProvider','$locationProvider', 
	function($routeProvider,$locationProvider) {
	    $routeProvider.
	    when('/', {
	        templateUrl: '../../templates/landing.html',
	        controller: 'indexController',
          title: 'Home'
	    }).
	    when('/changepassword/:id', {
        templateUrl: '../../templates/landing.html',
        controller: 'indexController',
        title: 'Home'
    	}).
      when('/officespace/', {
          templateUrl: '../../templates/buypage.html',
          controller: 'indexController',
          title: 'OfficeSpace'
      }).
      when('/businessspace/', {
          templateUrl: '../../templates/business.html',
          controller: 'indexController',
          title: 'BusinessSpace'
      }).
      when('/retailspace/', {
          templateUrl: '../../templates/retail.html',
          controller: 'indexController',
          title: 'RetailSpace'
      }).
		otherwise({
			//redirectTo: '/AddNewOrder'
		});

		//$locationProvider.html5Mode(true);
	
		
	}]);


/*app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
       .state('home',{
      url: '/',
      views: {
        'header': {
          templateUrl: '../../templates/header.html'          
        },
        'container@': {
          templateUrl: '../../templates/landing.html',
          controller: 'indexController'
        },
        'footer': {
          templateUrl: '../../templates/footer.html'          
        }
      }
    })
    
});*/