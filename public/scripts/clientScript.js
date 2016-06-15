var deletedEmployee = [];


$( document ).ready( function() {
    $( '#submit-button' ).on( 'click', postData );
    getData();
    $( '#outputDiv' ).on( 'click','.deactivateMe', postUpdate );
    $( '#outputDiv' ).on( 'click','.deleteMe', deleteUser );


});

 // function deactivatePerson(){
 function deleteUser(){
   var deleteID = $( this ).data( 'id' );
   var delRecord = {
     "id": deleteID
   };
    deletedEmployee.push();
   $.ajax({
       type: 'POST',
       url: '/postDelete',
       data: delRecord
   });
   getData();
   }





  function postUpdate() {
      var deactivateID = $( this ).data( 'id' );
      var newUpdate = {
        "id": deactivateID
      };
      $.ajax({
          type: 'POST',
          url: '/postUpdate',
          data: newUpdate
      });
      getData();
    
  }


//
//   console.log( 'id of record to deactivate: ' + deactivateID );                 }// end function

function getData() {
    $.ajax({
        type: 'GET',
        url: '/records',
        success: function( data ) {
        showPeople( data );
        }
    });
}

function postData() {
    var newRecord = {
      "username": $( '#usernameIn' ).val(),
      "active": true
    };
    $.ajax({
        type: 'POST',
        url: '/newRecord',
        data: newRecord
    });
    // show the info already on the database
    getData();
}

function showPeople( peeps ){
  console.log( "in showPeople: ", peeps );
  // empty output div and input field
  $( '#usernameIn' ).val( "" );
  $( '#outputDiv' ).empty();
  // append each row to output div
  for( var i=0; i<peeps.length; i++ ){
      $( '#outputDiv' ).append( '<p><b>User: ' + peeps[ i ].username + '</b></p>' );
      $( '#outputDiv' ).append( '<p>Active: ' + peeps[ i ].active + ", created: " + peeps[ i ].created + '</p>' );
      $( '#outputDiv' ).append( '<button class="deactivateMe" data-id="' + peeps[ i ].id + '">Change Active Status</button>' );
      $( '#outputDiv' ).append( '<button class="deleteMe" data-id="' + peeps[ i ].id + '">Delete</button>' );
  }
}
