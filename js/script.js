class WeatherWidget{
    constructor(){
        this.createInputCity();
        this.addEventListener();
    }

    addEventListener(){
        let input = document.querySelector('#weather__input')
        if(!input)  return

        input.addEventListener('keyup',(event)=>{
            if(event.code.includes('Enter')){
                this.getData(event.target.value) 
            } 
            this.cityName = event.target.value
            
            this.setStorage()
        })
        
    }

    createInputCity(){
        let div = document.createElement('div'),
            inputHtml = `<input type="text" id="weather__input">`

        div.classList.add('weather__widget')
        div.innerHTML=inputHtml

        this.container = document.querySelector('.container')
        this.container.appendChild(div)
    }
    
    getData = async function (cityName) {
        let url = `http://api.weatherapi.com/v1/current.json?key=27134c4d1c7d4800818192329210901&q=${cityName}&lang=ru`
        let response = await fetch(url)
        let data = await response.json()
        
        this.show(data)
    }

    show(data){

        let widget = document.querySelector('.widget');

        if(!widget){
            widget = document.createElement('div')
            widget.classList.add('widget')
        }
        
       

        let widgetHTML = ` <div class="img">
                                <img src="https:${data.current.condition.icon}">
                                <p>${data.current.condition.text}</p>
                            </div>
                            <div class="data">
                                <p class="data__temp"><strong>${data.current.temp_c}</strong> &degC</p>
                                <p class="data__wind">Скорость ветра ${+(data.current.wind_kph*0.3).toFixed(1)} м/с</p>
                                <p class="data__humidity">Влажность ${data.current.humidity}%</p>
                                <p class="data__city">${data.location.name}</p>
                            </div>`

        console.log(data)

        widget.innerHTML = widgetHTML
        this.container.appendChild(widget)

        let weatherInput = document.querySelector('#weather__input');
        weatherInput.value = "";           
    }

    
    setStorage(){
        localStorage.setItem('cityName', JSON.stringify(this.cityName));
    }

    getStorage(){
        let localData = localStorage.getItem('cityName');
        console.log(localData) 

        if (localData.length > 0) this.cityName = JSON.parse(localData)
        console.log(this.cityName) 
        this.getData(this.cityName)   
    }
}

window.addEventListener('load',()=>{
    let widget = new WeatherWidget()
    
})