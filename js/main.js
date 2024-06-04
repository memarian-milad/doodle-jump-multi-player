var userName = "";
var character = "";
window.addEventListener ( 'DOMContentLoaded' , () => {
	const canvas = document.getElementById ( 'gameCanvas' );
	this.LoadUserInfo ();
	this.GetUserInfo ();
	document.getElementById ( "submit-button" ).addEventListener ( 'click' , function (){
		theme ( canvas );
		const obstacle = new Obstacle ( canvas );
	} );
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

function theme ( canvas )
{
	const backgroundCode = Math.floor ( Math.random () * (5 - 1) + 1 );
	document.documentElement.style.setProperty ( '--background' , `url(../img/background/background-${backgroundCode}.jpg)` );
}