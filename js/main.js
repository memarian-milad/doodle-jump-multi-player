var userName = "";
var character = "";
window.addEventListener ( 'DOMContentLoaded' , () => {
	this.LoadUserInfo ();
	this.GetUserInfo ();
} );


function LoadUserInfo()
{
	if(localStorage.getItem("userName") && localStorage.getItem("userName") != null)
	{
		document.getElementById ( "name" ).value = localStorage.getItem("userName");
	}
}

function GetUserInfo ()
{
	document.querySelectorAll ( '.character-img' ).forEach ( img => {
		img.addEventListener ( 'click' , function (){
			document.querySelectorAll ( '.character-img' ).forEach ( img => {
				if ( this.getAttribute ( "data-code" ) != img.getAttribute ( "data-code" ) )
				{
					img.remove ();
				}
			} );
			document.getElementById ( "character" ).value = this.getAttribute ( "data-code" );
		} );
	} );
}
