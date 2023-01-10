//Daniel Hoff

//Width and height
var w = 1280;
var h = 700;

//Define map projection
var projection = d3
  .geoAlbers()
  .center([12, 53])
  .rotate(90)
  .parallels([49, 53])
  .translate([235, 275])
  .scale(13000);

//Koordinaten für Endpunkt der Linien
var berlin = [13.394992707079126, 52.509120008023274];

//Define path generator
var path = d3.geoPath().projection(projection);

//Create SVG element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "lightgrey");

//style="background-color:green"

d3.json("berlin.geojson").then(function (json) {
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#AAB8C8")
    .style("stroke", "white")
    .style("stroke-width", 7);
});

//Load in GeoJSON data
d3.json("landkreise.geojson").then(function (json) {
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#AAB8C8")
    .style("stroke", "#386DA9")

    .on("mouseover", function () {
      d3.select(this).style("fill", "orange");
      d3.select(this).append("text");
    })

    .on("mouseout", function () {
      d3.select(this).style("fill", "#AAB8C8");
    });
});

// var svg = d3.select("#arc").append("svg").attr("width", 1000).attr("height", 400)
// svg
// .append("path")
// .attr("transform", "translate(400,200)")
// .attr("d", d3.arc()
//   .innerRadius( 100 )
//   .outerRadius( 150 )
//   .startAngle( 3.14 )     // It's in radian, so Pi = 3.14 = bottom.
//   .endAngle( 6.28 )       // 2*Pi = 6.28 = top
//   )
// .attr('stroke', 'black')
// .attr('fill', '#69b3a2');

// Wählt Städte aus und fügt Pin an Geoposition hinzu
var radius = 0;
d3.json("staedte.geojson").then(function (json) {
  svg
    .selectAll(".pin")
    .data(json.features)
    .enter()
    .append("circle", ".pin")
    .style("r", function (d) {
      return d.population/5000}
      )
    .style("fill", "lightblue")
    .style("stroke", "blue")
    .style("stroke-width", 1)
    .style("visibility", "visible")
    .style("opacity", 0.2)

    .attr("transform", function (d) {
      return (
        "translate(" +
        projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) +
        ")"
      );
    });

  svg
    .selectAll(".pin")
    .data(json.features)
    .enter()
    .append("circle", ".pin")
    .attr("r", 5)
    .style("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("visibility", "visible")
    .style("opacity", 0.2)

    .attr("transform", function (d) {
      return (
        "translate(" +
        projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) +
        ")"
      );
    });

  //Fügt eine Linie an jedem Pin an. Ziel Koordinate ist Berlin
  svg
    .selectAll("line")
    .data(json.features)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return x(
        projection(berlin)[0],
        projection(d.geometry.coordinates)[0],
        projection(berlin)[1],
        projection(d.geometry.coordinates)[1],
        5
      );
    })
    .attr("y1", function (d) {
      return y(
        projection(berlin)[0],
        projection(d.geometry.coordinates)[0],
        projection(berlin)[1],
        projection(d.geometry.coordinates)[1],
        5
      );
    })
    .attr("x2", function (d) {
      return x(
        projection(d.geometry.coordinates)[0],
        projection(berlin)[0],
        projection(d.geometry.coordinates)[1],
        projection(berlin)[1],
        10
      );
    })
    .attr("y2", function (d) {
      return y(
        projection(d.geometry.coordinates)[0],
        projection(berlin)[0],
        projection(d.geometry.coordinates)[1],
        projection(berlin)[1],
        10
      );
    })
    .attr("marker-end", "url(#arrow)")
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("visibility", "visible")
    .style("opacity", 0.2);
});

function y(xA, xB, yA, yB, radius) {
  d = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
  dt = d - radius;
  ratio = dt / d;

  dy = (yB - yA) * ratio;

  test = yA + dy;

  return (1 - ratio) * yA + ratio * yB;
}
function x(xA, xB, yA, yB, radius) {
  d = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
  dt = d - radius;
  ratio = dt / d;

  dx = (xB - xA) * ratio;
  test = xA + dx;

  return (1 - ratio) * xA + ratio * xB;
}

// Code für die Sichtbarkeit der Linien bei Knopfdruck
var Linie = function () {
  var x = document.getElementById("LandName").value;
  svg
    .selectAll("line")
    .style("opacity", 0.2)
    .filter((ort) => ort.name == x)
    .style("opacity", 0.9999);
  svg
    .selectAll("circle")
    .style("opacity", 0.2)
    .filter((ort) => ort.name == x)
    .style("opacity", 0.9999);
};

// Farbänderungen
function colorchange() {
  if (toggle.checked == false) {
    document.getElementById("rectangle").style.background =
      "rgb(230, 136, 136)";
    document.getElementById("rectangle1").style.background =
      "rgb(243, 218, 218)";

    document.getElementById("LandName").style.background = "rgb(243,218,218)";
    document.getElementById("LandName").style.color = "black";
    document.getElementById("stop1").style.stopColor = "rgb(250, 136, 136)";
    document.getElementById("stop2").style.stopColor = "rgb(243, 120, 120)";
    document.getElementById("stop3").style.stopColor = "rgb(243, 120, 120)";
    document.getElementById("circle1").style.fill = "rgb(250, 136, 136)";
    document.getElementById("circle2").style.fill = "rgb(243, 120, 120)";

    var frontColor = document.getElementsByClassName("FrontColor");

    var myText = document.getElementsByClassName("Text");
    var myFront = document.getElementsByClassName("Front");

    for (var counter = 0; counter < frontColor.length; counter++) {
      frontColor[counter].style.fill = "black";
    }

    for (var counter = 0; counter < myText.length; counter++) {
      myText[counter].style.color = "black";
    }

    for (var counter = 0; counter < myFront.length; counter++) {
      myFront[counter].style.color = "black";
    }
  }
  if (toggle.checked == true) {
    document.getElementById("rectangle").style.background = "#011A31";
    document.getElementById("rectangle1").style.background = "#00060B";
    document.getElementById("LandName").style.background = "#00060B";
    document.getElementById("LandName").style.color = "white";
    document.getElementById("stop1").style.stopColor = "rgb(120,120,255)";
    document.getElementById("stop2").style.stopColor = "rgb(50,50,255)";
    document.getElementById("stop3").style.stopColor = "rgb(50,50,255)";
    document.getElementById("circle1").style.fill = "rgb(120, 120, 255)";
    document.getElementById("circle2").style.fill = "rgb(50,50,255)";

    var myText = document.getElementsByClassName("Text");
    var frontColor = document.getElementsByClassName("FrontColor");
    var myFront = document.getElementsByClassName("Front");
    for (var counter = 0; counter < myText.length; counter++) {
      myText[counter].style.color = "white";
    }
    for (var counter = 0; counter < frontColor.length; counter++) {
      frontColor[counter].style.fill = "white";
    }
    var myFront = document.getElementsByClassName("Front");
    for (var counter = 0; counter < myFront.length; counter++) {
      myFront[counter].style.color = "white";
    }
  }
}

function commuting() {}

fetch("pendler.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    let placeholder = document.querySelector("#data-output");
    let out = "";

    function percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    }

    var nachBerlin = products.filter(
      (stadt) =>
        stadt.Arbeitsort == "Berlin, Stadt" &&
        (stadt.Wohnort == "Brandenburg an der Havel, St." ||
          stadt.Wohnort == "Cottbus, Stadt" ||
          stadt.Wohnort == "Potsdam, Stadt")
    );

    nachBerlin = nachBerlin.sort(function (a, b) {
      return (
        percentage(b.Frauen, b.Insgesamt) - percentage(a.Frauen, a.Insgesamt)
      );
    });

    var vonBerlin = products.filter(
      (stadt) =>
        stadt.Wohnort == "Berlin, Stadt" &&
        (stadt.Arbeitsort == "Brandenburg an der Havel, St." ||
          stadt.Arbeitsort == "Cottbus, Stadt" ||
          stadt.Arbeitsort == "Potsdam, Stadt")
    );
    for (let product of nachBerlin) {
      out += `
            <tr>
               <td>${product.Wohnort}</td>
               <td>${product.Nummer}</td>
               <td>${product.Arbeitsort}</td>
               <td>${product.Insgesamt}</td>
               <td>${product.Männer}</td>
               <td>${product.Frauen}</td>
               <td>${product.Deutsche}</td>
               <td>${product.Ausländer_Sonst}</td>
               <td>${product.AZB}</td>
            </tr>`;
    }

    for (let product of vonBerlin) {
      out += `
            <tr>
               <td>${product.Wohnort}</td>
               <td>${product.Nummer}</td>
               <td>${product.Arbeitsort}</td>
               <td>${product.Insgesamt}</td>
               <td>${product.Männer}</td>
               <td>${product.Frauen}</td>
               <td>${product.Deutsche}</td>
               <td>${product.Ausländer_Sonst}</td>
               <td>${product.AZB}</td>
            </tr>`;
    }

    placeholder.innerHTML = out;
  });
