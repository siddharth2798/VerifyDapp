App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
   
    return await App.initWeb3();
  },


  initWeb3: async function() {
    if (window.ethereum){
    	App.web3Provider = window.ethereum;
    	try {
    		await window.ethereum.enable();
    	} catch (error) {
    	
    		console.error("User denied account access")
    		
    	}
    	}
    	else if(window.web3) {
    		App.web3Provider = window.web3.currentProvider;
    	}
    	
    	else {
    		App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
    		}
    	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },
  

  initContract: function() {
  	$.getJSON('Verify.json', function(data) {
  	
  		var VerifyArtifact = data;
  		App.contracts.Verify = TruffleContract(VerifyArtifact);
  		
  		App.contracts.Verify.setProvider(App.web3Provider);
   
    })
    
    return App.bindEvents();
  },
  
  

  bindEvents: function() {
    $(document).on("click", '.detailsSubmit', App.addDetails);
    $(document).on("click", '.retrieveDetails', App.getDetails);
    //$(document).on("click", '.getAllcases', App.getCases);
  },


  /*getCases: function(event) {
    event.preventDefault();
    
    var verifyInstance;
   App.contracts.Verify.deployed().then(function(instance) {
      	verifyInstance = instance;
      	
   return verifyInstance.getAllCases.call();
   }).then(function(result) {
    	console.log(result);
   }).catch(function(err) {
   	console.log(err.message);
   });
   },*/
   
    
    
  
  
  getDetails: function(event) {
    event.preventDefault();
    
    var caseId = document.getElementById('caseId').value;
    	console.log(caseId);
   var verifyInstance;
   App.contracts.Verify.deployed().then(function(instance) {
verifyInstance = instance; 																																																																																																																						

   return verifyInstance.getCase.call(caseId);
   }).then(function(result) {
   	console.log(result);
   	$(".checkDetails").hide();
   	$(".details").show();
   	document.getElementById('loc').innerHTML = result[1];
         	//																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																console.log(document.getElementById('loc').value);
   	document.getElementById('ipfs').innerHTML = result[2];
   	document.getElementById('caseID').innerHTML = caseId;
   	document.getElementById('allhash').innerHTML = result[3];
   	
   }).catch(function(err) {
   	console.log(err.message);
   });
   },
   

  addDetails: function(event) {
    event.preventDefault();
    $('results').hide();
    var caseId = document.getElementById('caseno').value;
    var location = document.getElementById('location').value;
    
    
    if (caseId != '' && location != '')
    {
    var verifyInstance;
    
    web3.eth.getAccounts(function(error,accounts){
    	if(error) {
    	
    		console.log(error);
    	}
    	
    	var account = accounts[0];
    
    App.contracts.Verify.deployed().then(function(instance){
    	verifyInstance = instance;
    	
    	return verifyInstance.setCase(caseId,location,hash,detailHash,{from: account});
    	}).then(function(result){
    		console.log(result);
    		document.getElementById('results').innerHTML = 'Added Successfully';
    		$('results').show();
    	}).catch(function(err){
    		console.log(err.message);
    		document.getElementById('results').innerHTML = 'Failed';
    		$('results').show();
    		});
    	});}
    	
    	else if(caseId == '' && location == '')
    	{ document.getElementById('results').innerHTML = 'Please complete both the fields';
    	  $('results').show();}
    	
    	else if(caseId == '')
    	  {document.getElementById('results').innerHTML = 'Please fill Case ID';
    	  $('results').show();}
    	  																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												
    	else if(location == '')
    	 { document.getElementById('results').innerHTML = 'Please fill location';
    	  $('results').show();}
    	 
    	
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
