$(document).ready(function(){
              // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
              $('.modal').modal();
              
              $('#modal1').modal({

			      complete: function() { iconChooseReset = true; } // Callback for Modal close
			    
              });
              $('#modal4').modal();
          });