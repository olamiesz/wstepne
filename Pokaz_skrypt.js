/*
Autor:domb (pseudonim).
*/
var pokaz_numer_id_div = 0;
function pokaz_slajdow(){
	this.IE = false;
	this.agent = navigator.userAgent.toLowerCase();
	this.liczba = this.agent.indexOf('msie');
	this.wynik = this.agent.charAt(this.liczba + 5);
	this.wynik = parseFloat(this.wynik);
	if ((!isNaN(this.wynik)) && this.wynik < 9){
		this.IE = true
	}
	else{
		this.IE = false
	}
	this.ilosc_klatek_sek = 25;
	this.czas_przejscia = 1000;
	this.zdjecie = 0;
	this.czas_wyswietl = 4000;
	this.tablica_obrazow = [];
	this.zmienObr = function(){
		var zdjecie_var = this.zmien();
		for(var limit = 0; limit < this.tablica_obrazow.length; limit++){
			if(this.tablica_obrazow[this.zdjecie].complete) break;
			this.zdjecie=(this.zdjecie+1) % this.tablica_obrazow.length;
		}
		document.getElementById(zdjecie_var).src = this.tablica_obrazow[this.zdjecie].src; //zmiana obrazu okreœlonego przez funkcjê
		this.zdjecie=(this.zdjecie+1) % this.tablica_obrazow.length;
	}
	this.zmien = function (){
		this.nieb = document.getElementById('div_nieb_'+this.id_obiekt);
		this.czerw = document.getElementById('div_czerw_'+this.id_obiekt);
		if (this.czerw.style.zIndex == '2'){
			this.nieb.style.visibility = 'visible';
			this.licznik = 1; //zerowanie licznika przezroczystoœci
			this.przezr(); //funkcja przezroczystosci 
			return 'img_zd1_'+this.id_obiekt; 
		}
		else {
			this.czerw.style.visibility = 'visible';
			this.licznik2 = 1; //zerowanie licznika przezroczystoœci
			this.przezr1(); //funkcja przezroczystosci
			return 'img_zd2_'+this.id_obiekt;
		}
	}
	this.przezr = function(){
		if (this.IE) this.czerw.style.filter = 'Alpha(Opacity=' + (1.0 - (this.licznik/this.ilosc_powtorzen)) * 100 + ')'; //okreœlenie przezroczystoœci dla IE
		else this.czerw.style.opacity = 1.0 - (this.licznik/this.ilosc_powtorzen); //okreœlenie przezroczystoœci
		
		var _this = this;
		if (this.licznik < this.ilosc_powtorzen){
			setTimeout(function(){_this.przezr();},this.czas_klatki/* */);
		}
		else{
			if (this.IE) this.czerw.style.filter = 'Alpha(Opacity=100)';
			else this.czerw.style.opacity = 1.0;
			
			this.nieb.style.zIndex = '2';
			this.czerw.style.zIndex = '1';
			this.czerw.style.visibility = 'hidden';
		}
		this.licznik++; //zwiêkszenie licznika przezroczystoœci
	}
	this.przezr1 = function(){
		if (this.IE) this.nieb.style.filter = 'Alpha(Opacity=' + (1.0 - (this.licznik2/this.ilosc_powtorzen)) * 100 + ')'; //okreœlenie przezroczystoœci dla IE
		else this.nieb.style.opacity = 1.0 - (this.licznik2/this.ilosc_powtorzen); //okreœlenie przezroczystoœci		var _this = this;
		var _this = this;
		if (this.licznik2 < this.ilosc_powtorzen){
			setTimeout(function(){_this.przezr1();},this.czas_klatki/* */);
		}
		else{
			if (this.IE) this.nieb.style.filter = 'Alpha(Opacity=100)';
			else this.nieb.style.opacity = 1.0;
			this.nieb.style.zIndex = '1';
			this.czerw.style.zIndex = '2';
			this.nieb.style.visibility = 'hidden';
		}
		this.licznik2++; //zwiêkszenie licznika przezroczystoœci
	}
	this.mypokaz = function(){
		var _this = this;
		this.zmienObr();
		setTimeout(function(){_this.mypokaz();},this.czas_wyswietl);
	}
	this.pokaz=function(iddiv){
		
		this.mydiv=document.getElementById(iddiv);
		//alert(mydiv.style.width);
		this.id_obiekt=pokaz_numer_id_div;
		pokaz_numer_id_div++;
		var str;
		str =  '<div style="position:relative;width:100%;height:100%;" id="div_glowny_pokazu'+this.id_obiekt+'">'
		str += 	'<div style="width:100%;height:100%;position:absolute;left:0px;top:0px;" id="div_nieb_'+this.id_obiekt+'">';
		str += 	'<img src="" style="max-width:'+this.mydiv.style.width+'; max-height:'+this.mydiv.style.height+';" id="img_zd1_'+this.id_obiekt+'">';
		str += 	'</div>';
		str += 	'<div style="width:100%;height:100%;position:absolute;left:0px;top:0px;" id="div_czerw_'+this.id_obiekt+'">';
		str += 	'<img src="" style="max-width:'+this.mydiv.style.width+'; max-height:'+this.mydiv.style.height+';" id="img_zd2_'+this.id_obiekt+'">';
		str += 	'</div>';
		str += '</div>';
		this.mydiv.innerHTML = str;
		this.mypokaz();
	}
	this.dodaj_obraz = function(obraz){
		var obraz_var = new Image();
		obraz_var.src = obraz;
		this.tablica_obrazow.push(obraz_var);
	}
	this.czasy_przejsc = function(przejscie,czas){
		typeof przejscie != undefined ? przejscie : 1000;
		typeof czas != undefined ? czas : 25;
		this.czas_klatki = 1000 / czas;
		this.ilosc_powtorzen = przejscie / this.czas_klatki;
	}
}
