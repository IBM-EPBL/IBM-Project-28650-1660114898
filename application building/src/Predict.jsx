import { useState, useEffect, useRef } from "react";
import axios from "axios"


function Predict() {
  const MinTemp = useRef(null);
  const MaxTemp =  useRef(null);
  const Rainfall =  useRef(null);
  const Evaporation =useRef(null);
  const Sunshine = useRef(null);
  const WindGustSpeed = useRef(null);
  const WindSpeed9am = useRef(null);
  const WindSpeed3pm = useRef(null);
  const Humidity9am = useRef(null);
  const Humidity3pm =useRef(null);
  const Pressure9am = useRef(null);
  const Pressure3pm = useRef(null);
  const Cloud9am = useRef(null);
  const Cloud3pm =useRef(null);
  const Temp9am = useRef(null);
  const Temp3pm =useRef(null);




    const baseURL = "http://127.0.0.1:5000/predict";


    const [ct, setCT] = useState("");  
    const [s, setS] = useState(""); 
    const [rto, setrto] = useState(false); 
    const[diditrain,setWillitrain]=useState(false)
    const [MINTEMP, setMINTEMP] = useState(0.1);
    const [MAXTEMP, setMAXTEMP] = useState(15.5);
    const [RAINFALL, setRAINFALL] = useState(0);
    const [EVAPORATION, setEVAPORATION] = useState(2.8);
    const [SUNSHINE, setSUNSHINE] = useState(8.9);
    const [WINDGUSTSPEED, setWINDGUSTSPEED] = useState(35);
    const [WINDSPEED9AM, setWINDSPEED9AM] = useState(11);
    const [WINDSPEED3PM, setWINDSPEED3PM] = useState(24);
    const [HUMIDITY9AM, setHUMIDITY9AM] = useState(78);
    const [HUMIDITY3PM, setHUMIDITY3PM] = useState(37);
    const [PRESSURE9AM, setPRESSURE9AM] = useState(1022.4);
    const [PRESSURE3PM, setPRESSURE3PM] = useState(1017.4);
    const [CLOUD9AM, setCLOUD9AM] = useState(0);
    const [CLOUD3PM, setCLOUD3PM] = useState(5);
    const [TEMP9AM, setTEMP9AM] = useState(7.6);
    const [TEMP3PM, setTEMP3PM] = useState(14.5);
    const [loading, setloading] = useState(false);
    const [finalarr, setFinalarr] = useState([]);
    const [backbtn, setBackbtn] = useState(false);
    const arr=[]
    function setsomething(val){
     if(val=="true"){

      setrto(true)
     }
     else{
      setrto(false)
     }

    }
    function whitebg(){
      var inputs = document.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor="black";
        inputs[i].style.color="black";
        document.querySelectorAll('#root')[0].style.backgroundImage  = "url('https://wallpaperaccess.com/full/1167973.jpg')"; 
        document.querySelectorAll('h1')[0].style.color="black";
        document.querySelectorAll('.innerform')[0].style.borderColor = "black"; 
      }


    } 
    
    function blackbg(){
      
      var inputs = document.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
     
        inputs[i].style.borderColor="black";
        inputs[i].style.color="black";
        document.querySelectorAll('#root')[0].style.backgroundImage = "url('https://i.pinimg.com/originals/0c/3b/fe/0c3bfed41251c7fb356dfb99b7016163.gif')"; 
        document.querySelectorAll('.innerform')[0].style.borderColor = "white"; 
        document.querySelectorAll('h1')[0].style.color="white"
      }
     
     
    }
 function gobackbtn(){
  setloading(false)
  setBackbtn(true)

 }




    const Inputform = (props) => {
      function reset(){

      
        var inputs = document.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
       
          inputs[i].style.borderColor="black";
          inputs[i].style.color="black";
          document.querySelectorAll('#root')[0].style.backgroud= "black"; 
          document.querySelectorAll('.innerform')[0].style.borderColor = "white"; 
          document.querySelectorAll('h1')[0].style.color="white"
        }
        var inputs = document.querySelectorAll('select');
        for (var i = 0; i < inputs.length; i++) {
       
          inputs[i].style.borderColor="black";
          inputs[i].style.color="black";
          document.querySelectorAll('#root')[0].style.backgroud= "black"; 
          document.querySelectorAll('.innerform')[0].style.borderColor = "white"; 
          document.querySelectorAll('h1')[0].style.color="white"
        }
      }
      useEffect(() => {
        if(props.type==true && props.rain!=true){

          reset()
        }
       
      }, []);
      return (
        <div>
        <h1>WIll it Rain Tommorow?</h1>
        <form name="client-data">

        <select  onChange={e => setCT(e.target.value)}>
        <option value="">Which type of crop you will grow?</option>
  <option value="Kharif">Kharif</option>
  <option value="Vegetable Crops">Vegetable Crops</option>

</select>
<select  onChange={e => setS(e.target.value)}>
<option value="">WHen you will grow the crop?</option>
  <option value="About Harvest">About Harvest</option>
  <option value="Under Growth">Under Growth</option>

</select>
<select  onChange={e => setsomething(e.target.value)}>
<option value="">did it rain today</option>
  <option value="true">Yes</option>
  <option value="false">No</option>

</select>

      


          <input ref={MinTemp} type="text" name="MinTemp" onChange={e => setMINTEMP(e.target.value)} value={MINTEMP} placeholder="" required />
          <label for="name" >MinTemp</label>
  
  
          <input value={MAXTEMP} ref={MaxTemp}  onChange={e => setMAXTEMP(e.target.value)} type="text" name="MaxTemp" placeholder="" required />
          <label for="name" >MaxTemp</label>
  
  
          <input value={RAINFALL} ref={Rainfall} onChange={e => setRAINFALL(e.target.value)} type="text" name="Rainfall" placeholder="" required />
          <label for="Rainfall" >Rainfall</label>
  
  
          <input value={EVAPORATION} ref={Evaporation}  onChange={e => setEVAPORATION(e.target.value)} type="text" name="Evaporation" placeholder="" required />
          <label for="Evaporation" >Evaporation</label>
  
  
          <input value={SUNSHINE} ref={Sunshine} type="text"  onChange={e => setSUNSHINE(e.target.value)} name="Sunshine" placeholder="" required />
          <label for="Sunshine" >Sunshine</label>
  
          <input value={WINDGUSTSPEED} ref={WindGustSpeed} onChange={e => setWINDGUSTSPEED(e.target.value)}  type="text" name="WindGustSpeed" placeholder="" required />
          <label for="WindGustSpeed" >WindGustSpeed</label> 
  
          <input value={WINDSPEED9AM} ref={WindSpeed9am} onChange={e => setWINDSPEED9AM(e.target.value)}   type="text" name="WindSpeed9am" placeholder="" required />
          <label for="WindSpeed9am" >WindSpeed9am</label>
  
          <input value={WINDSPEED3PM} ref={WindSpeed3pm} onChange={e => setWINDSPEED3PM(e.target.value)}   type="text" name="WindSpeed3pm" placeholder="" required />
          <label for="WindSpeed3pm" >WindSpeed3pm</label>
  
          <input value={HUMIDITY9AM} ref={Humidity9am} onChange={e => setHUMIDITY9AM(e.target.value)}   type="text" name="Humidity9am" placeholder="" required />
          <label for="Humidity9am" >Humidity9am</label>
  
          <input value={HUMIDITY3PM}  ref={Humidity3pm} onChange={e => setHUMIDITY3PM(e.target.value)} type="text" name="Humidity3pm" placeholder="" required />
          <label for="Humidity3pm" >Humidity3pm</label>
  
          <input value={PRESSURE9AM} ref={Pressure9am} onChange={e => setPRESSURE9AM(e.target.value)} type="text" name="Pressure9am" placeholder="" required />
          <label for="Pressure9am" >Pressure9am</label>
  
          <input value={PRESSURE3PM} ref={Pressure3pm} onChange={e => setPRESSURE3PM(e.target.value)} type="text" name="Pressure3pm" placeholder="" required />
          <label for="Pressure3pm" >Pressure3pm</label>
  
          <input value={CLOUD9AM} ref={Cloud9am} type="text" onChange={e => setCLOUD9AM(e.target.value)} name="Cloud9am" placeholder="" required />
          <label for="Cloud9am" >Cloud9am</label>
  
          <input value={CLOUD3PM} ref={Cloud3pm} type="text" onChange={e => setCLOUD3PM(e.target.value)} name="Cloud3pm" placeholder="" required />
          <label for="Cloud3pm" >Cloud3pm</label>
  
          <input value={TEMP9AM}  ref={Temp9am} type="text" onChange={e => setTEMP9AM(e.target.value)} name="Temp9am" placeholder="" required />
          <label for="Temp9am" >Temp9am</label>
  
          <input value={TEMP3PM}  ref={Temp3pm} type="text" onChange={e => setTEMP3PM(e.target.value)} name="Temp3pm" placeholder="" required />
          <label for="Temp3pm" >Temp3pm</label>
  
          <button onClick={(e) => validate(e)} class="submit-btn" type="button">
     
            Predict
          </button>
        
  
        </form>
        </div> 
      )
    }

   
  
  
    
    const validate = (e) => {
      
        setFinalarr([])
          const data = { 
             MinTemp :MINTEMP,
             MaxTemp : MAXTEMP,
             Rainfall :  RAINFALL,
             Evaporation: EVAPORATION,
             Sunshine : SUNSHINE,
             WindGustSpeed :WINDGUSTSPEED,
             WindSpeed9am : WINDSPEED9AM,
             WindSpeed3pm : WINDSPEED3PM,
             Humidity9am : HUMIDITY9AM,
             Humidity3pm : HUMIDITY3PM,
             Pressure9am : PRESSURE9AM,
             Pressure3pm : PRESSURE3PM,
             Cloud9am : CLOUD9AM,
             Cloud3pm : CLOUD3PM,
             Temp9am : TEMP9AM,
             Temp3pm : TEMP3PM,
          };
          var rtom= false
          axios
          .post(baseURL, JSON.stringify(data))
          .then((response) => {
            console.log(response);
            
            if(parseInt(response.data)==1){
              rtom = true;
            alert("It will Rain Tommorow")
            blackbg()
            }else{
           
              whitebg()
            }
            
            
            if(rtom == true){
              setWillitrain(true)
              arr.push("It Will Rain Tommorow")
              if(ct == 'Kharif' && s == 'About Harvest'){
       
                console.log(arr)

                if(rto == true)
               {
                alert("check")
                arr.push("Since its already raining make sure you have set up a proper drainage to the crop land.")
                arr.push("As it about harvest and has been raining today, eventually the crops may get")
                arr.push("damaged. Hence, find time to pluck all the crops and store it safely in a warehouse")
 
                
             
               }
                else if(rto == false){
                  arr.push("Since its gonna rain tomorrow make sure you have set up a proper drainage to the crop land. As it about harvest, due to rain the crops may get")

                  arr.push("As it about harvest and has been raining today, eventually the crops may get")

                  arr.push("damaged. Hence, find time to pluck all the crops and store it safely in a warehouse")

                
                  
                }
              }
    
    
              if (ct == 'Vegetable Crops' && s == 'About Harvest') {
               
                if(rto){
                  arr.push("Rain is a double edged sword to vegetable crops since its already raining make sure you have set up a proper drainage to the crop land and have placed sticks at place.")
                  arr.push("As it about harvest and has been raining today,eventually the crops may get ")
                     arr.push("damaged. Hence, find time to pluck all the crops and store it safely in a warehouse")
              }
    else if(rto==false){
      arr.push("RaRain is a double edged sword to vegetable crops since its gonna rain tomorrow make sure you have set up a proper drainage to the crop land have placed sticks at place.i")
      arr.push("As it about harvest, due to rain the crops may get")


    
              }
              if (ct == 'Kharif' && s == 'Under Growth')
              {
                 
                if(rto){
                  arr.push("Rain is good for Khariff crops under growth since its already raining, make sure you have laid proper draining at place.")
                  arr.push("Although rain maybe good for the yeild but stagnant of water may lead to spoilage of crops")
              
    
               
                }
    
    
    
    
    
    
    
    
    
    
    else if(rto==false){
      arr.push("Rain is good for Khariff crops under growth, make sure you have laid proper draining at place as a precaution ")
      arr.push("as stagnant of water may lead to spoilage of crops")
    
    
    
    
    }
    
    
              }
    
    
    
            }
              if (ct == 'Vegetable Crops' && s == 'About Harvest'){
                if(rto == true){
                  arr.push("damaged. Hence, find time to pluck all the crops and store it safely in a warehouse")
           
    
                  }
                else if (rto == false){
                  arr.push("Rain is a double edged sword to vegetable crops since its gonna rain tomorrow make sure you have set up a proper drainage to the crop land have placed sticks at place.")
                  arr.push("As it about harvest, due to rain the crops may get") 
                  arr.push("damaged. Hence, find time to pluck all the crops and store it safely in a warehouse before today")

           
       
                  }
                }
              if (ct == 'Vegetable Crops' && s == 'Under Growth'){
                if(rto && true){
                  arr.push("As it about harvest, due to rain the crops may get")
                  arr.push("Rain is a double edged sword to vegetable crops since its already raining, make sure you have laid proper draining at place. ")
                  arr.push("Beware ! stagnant of water may lead to spoilage of crops")
                
             
    
                  }
                else if (rto == false){
                  arr.push("Rain is a double edged sword to vegetable crops, make sure you have laid proper draining at place as a precaution ")
                  arr.push("Beware ! stagnant of water may lead to spoilage of crops")
           
                
                }
              }
            }
            else if (rtom == false){
              setWillitrain(false)
              arr.push("Since it may not rain, do as you planned.")
        
              if(SUNSHINE > 50){
                arr.push("it may be quite sunny so make sure the soil is wet to avoid dryness of crops.")

              
              }

              
            }
          
            setFinalarr(prevState => [...prevState, ...arr]);
            setloading(true)
          });
         
  
        
              }
            
   
    return (
      <div class="main-form-holder">
        <div className='innerform'>
          {(loading==false)?<Inputform type={backbtn} rain={diditrain}/>:null}
          

       

          { 
        (loading==true)?<h1>Prediction Result</h1>:null
     
    }
    { 
        (loading==true)?finalarr.map((element, index) => {
        return (
          <ul key={index}>
            <li>{element}</li>
          </ul>
        );
      }):null
     
    }
    {
       (loading==true)?<button onClick={(e) =>  gobackbtn() } class="submit-btn" type="button">
     
       Predict Again
     </button>:null
    }
    

      </div>
      </div>
    );
  
}
  export default Predict