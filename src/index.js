import "./styles.css";

import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";



if(document.readyState !== "loading") {
    console.log("Document is ready!");
    initCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initCode();
    })
}




const getAreaNames= async (Alue) => {
    
    
    
    
    Alue= Alue.toUpperCase()
    
    
    
    
    
    
    
   
    
    const url= "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    
    
    
    const Fetched= await fetch(url)
    
   
    
    const Area= await Fetched.json()
    
    
    
    var cities= Area.variables[1].valueTexts
    
    var cityCodes= Area.variables[1].values
    
    
    
    for (let i= 0; i< cities.length; i++) {
        
        
        
        cities[i]= cities[i].toUpperCase()
        
    }
        
        
   
    
    
    
    
    if (cities.indexOf(Alue)) {
        
        
        
        
        
        var index= cities.indexOf(Alue)
        
        
        
    }
    
    else {
        
        return null
    }
    
    
    
    var Code= cityCodes[index]
    
    
    
    return Code
    
    
    
}



const launchChart= async () => {
    
    
    
    const Area = document.getElementById("input-area").value
    
    var Code= getAreaNames(Area)
    
    
     
Code= await getAreaNames(Area)
        
        
    
    
   
    
    

    
    document.getElementById("legend").innerHTML= Area
    
    
    
    buildChart(Code)
    
    
    
    return Code
    
      
    
}




function initCode() {
    
buildChart("SSS")
   

const addAreaButton = document.getElementById("submit-data");

const Area = document.getElementById("input-area").value





addAreaButton.addEventListener("click", function() {
    
  launchChart()  
    
})

}



const JsonQuery= async (Area) => {
    
     

const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                  Area,
                  
                  
                  
                 
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}



return jsonQuery


}









const getData = async (Area) => {
    
  const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"

  const res = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(await JsonQuery(Area))
  })
  if(!res.ok) {
      return;
  }
  
  
  
  
  
  
  const data = await res.json()

  return data
}



const buildChart = async (Area) => {
    
  const data = await getData(Area)
  
  if (data== null) {
      
      document.getElementById("legend").innerHTML= "No info about this municipality!"
      
  }
  
  const years = Object.values(data.dimension.Vuosi.category.label);
  const regions = Object.values(data.dimension.Alue.category.label);
  const population = data.value;
  
  
  for (let i= 0; i< years.length; i++) {
      
      years[i]= parseInt(years[i])
      
      
  }
  
  
      

  
  

  regions.forEach((region, index) => {
    
      let valuesList = []
      for(let i = 0; i < years.length; i++) {
          valuesList.push(population[i])
      }
      regions[index] = {
          name: region,
          values: valuesList
      }
  })

  

  const chartData = {
      labels: years,
      datasets: regions,
  }


  const chart = new Chart("#chart", {
      title: "Finnish population growth",
      data: chartData,
      type: "line",
      height: 450,
      colors: ['#eb5146'],
      /*barOptions: {
          stacked: 1
      },*/
      lineOptions: {
          hideDots: 0,
          regionFill: 0
          
      }

  })



}














