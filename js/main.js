var userName = "";
var character = "";
window.addEventListener ( 'DOMContentLoaded' , () => {
	this.GetUserInfo ();
} );


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
