import "./styles.css";

import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

var Area= "SSS"

if(document.readyState !== "loading") {
    console.log("Document is ready!");
    initCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initCode();
    })
}





function initCode() {

const addAreaButton = document.getElementById("submit-area");

addAreaButton.addEventListener("click", function() {
    
    
    const Area = document.getElementById("submit-area").value
    
    
    console.log(area)
    
    
    
    
    
    
    
    
   
    
})
}






function JsonQuery(Area) {

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
  //console.log(data)

  const years = Object.values(data.dimension.Vuosi.category.label);
  const regions = Object.values(data.dimension.Alue.category.label);
  const population = data.value;
  
  console.log(data)
  
  
  
  

  
  

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
          hideDots: 1,
          regionFill: 0
      }

  })



}


buildChart(Area)




