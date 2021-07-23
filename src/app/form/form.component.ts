import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  city = '';
  cityTime:any; cityDay:string=''; 
  cityName:string=''; countryName:string= ''; 
  temp:string=''; feelsLike:string='-';
  humidity:string='-'; wind:string='-'; 
  sunrise:string='-'; sunset:string='-';
  barometer:string='-'; 
  description:string='';
  lat:string=''; long:string='';
  constructor() { }

  checkCity(){
      if (this.city){
        
        let data = fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&appid=3265874a2c77ae4a04bb96236a642d2f').then(function(response){
          return response.json();
        });
        data.then(data=>{this.cityTime = data.timezone});
        data.then(data=>{this.cityName = data.name});
        data.then(data=>{this.temp = Math.floor(data.main.temp-273).toString()});
        data.then(data=>{this.feelsLike = Math.floor(data.main.feels_like-273).toString()});
        data.then(data=>{this.humidity = data.main.humidity});
        data.then(data=>{this.wind = data.wind.speed});
        data.then(data=>{this.barometer = data.main.pressure});
        data.then(data=>{this.description = data.weather[0].description});
        data.then(data=>{this.lat = data.coord.lat});
        data.then(data=>{this.long = data.coord.lon});
        console.log(this.long, this.lat);
        let sun = fetch('https://api.sunrise-sunset.org/json?lat='+this.lat+'&lng='+this.long).then(function(response){
          return response.json();
        });
        sun.then(sun=>{this.sunrise = sun.results.sunrise});
        sun.then(sun=>{this.sunset = sun.results.sunset});
        return true;
      }
    return false;
  }

  ngOnInit(): void {
  }

}
