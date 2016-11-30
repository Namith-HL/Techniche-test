app.controller('indexController',function($scope,$filter,$http,$sce,$location,$window,$rootScope,$q,$timeout,$route){
    
     $scope.showBookList = false;

     $scope.addBook = function(){
    
       
        $http.post("/addBook",{name:$scope.bookname,author:$scope.bookname}).success(function(res,err){
            if(res.data=='success'){
               
                $route.reload();
            }
        });
     }

     $scope.getuserBooks = function(){
        $http.post('/getuserBooks',{id:$scope.userid}).success(function(res,err){
                if(res.data){
                    
                   $scope.userbookdetail = res.data;
                   if(res.data.length > 0)
                   $scope.showBookList = true;
                }
            })
     }

     $scope.deleteBook = function(id){

            $http.post('/deleteBook',{id:id}).success(function(res,err){
                if(res.data=='success'){
                    $route.reload();
                }
            })
     }

     $scope.returnBook = function(){
        $http.post('/updateTransct',{id:$scope.booksid}).success(function(res,err){
                if(res.data=='success'){
                    $route.reload();
                }
            })
     }

       $scope.issueBook = function(id){
            
            $http.post('/addTransct',{user:$scope.user,book:$scope.author}).success(function(res,err){
                if(res.data=='success'){
                    $route.reload();
                }
            })
     }


      $scope.showIssue = function(id){
        $scope.template= id;

     }


          
   
     var list_request           = [];
     
      var getbooks = $http.get("/getbooks",{});
      getbooks.success(function(response,error) {
        
        $scope.bookDetails = response.data;
    });
    list_request.push(getbooks);

    var getusers =  $http.get("/getusers",{});
    getusers.success(function(response,error) {
        
        
        $scope.userDetail = response.data;
    });

    list_request.push(getusers);

   
     $q.all(list_request).then(function (res) {
        
       

    });

});

     
   



  
    


   



