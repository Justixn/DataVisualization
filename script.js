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
  .attr("fill", "#E7E7E7");

//style="background-color:green"

d3.json("berlin.geojson").then(function (json) {
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#BDBDBD")
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
    .style("fill", "#BDBDBD") //  #AAB8C8
    .style("stroke", "#386DA9");

  // .on("mouseover", function () {
  //   d3.select(this).style("fill", "orange");
  //   d3.select(this).append("text");
  // })

  // .on("mouseout", function () {
  //   d3.select(this).style("fill", "#AAB8C8");
  // });
});

function reset() {
  svg.selectAll("circle").remove();
  svg.selectAll("line").remove();
}

function fromBerlin() {
  reset();
  d3.json("staedte.geojson").then(function (json) {
    svg
      .selectAll(".pin")
      .data(json.features)
      .enter()
      .append("circle", ".pin")
      .style("r", function (d) {
        return d.population / 5000;
      })
      .style("fill", "rgb(230, 136, 136)")
      .style("stroke", "darkred")
      .style("stroke-width", 1)
      .style("visibility", "visible")
      .style("opacity", 0.17)

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
      .style("fill", "darkred")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("visibility", "visible")
      .style("opacity", 0.17)

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
      .filter((ort) => ort.name == "Berlin")
      .attr("r", 5)
      .style("fill", "rgb(230, 136, 136)")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("visibility", "visible")
      .style("opacity", 1)

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
      .attr("x2", function (d) {
        return x(
          projection(berlin)[0],
          projection(d.geometry.coordinates)[0],
          projection(berlin)[1],
          projection(d.geometry.coordinates)[1],
          10
        );
      })
      .attr("y2", function (d) {
        return y(
          projection(berlin)[0],
          projection(d.geometry.coordinates)[0],
          projection(berlin)[1],
          projection(d.geometry.coordinates)[1],
          10
        );
      })
      .attr("x1", function (d) {
        return x(
          projection(d.geometry.coordinates)[0],
          projection(berlin)[0],
          projection(d.geometry.coordinates)[1],
          projection(berlin)[1],
          5
        );
      })
      .attr("y1", function (d) {
        return y(
          projection(d.geometry.coordinates)[0],
          projection(berlin)[0],
          projection(d.geometry.coordinates)[1],
          projection(berlin)[1],
          5
        );
      })
      .attr("marker-end", "url(#arrow2)")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("visibility", "visible")
      .style("opacity", 0.17);
  });
}

// Wählt Städte aus und fügt Pin an Geoposition hinzu
function toBerlin() {
  reset();
  d3.json("staedte.geojson").then(function (json) {
    svg
      .selectAll(".pin")
      .data(json.features)
      .enter()
      .append("circle", ".pin")
      .style("r", function (d) {
        return d.population / 5000;
      })
      .style("fill", "#3E709E")
      .style("stroke", "blue")
      .style("stroke-width", 1)
      .style("visibility", "visible")
      .style("opacity", 0.17)

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
      .filter((ort) => ort.name == "Berlin")
      .attr("r", 5)
      .style("fill", "black")
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("visibility", "visible")
      .style("opacity", 1)

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
      .style("opacity", 0.17)

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
      .style("opacity", 0.17);
  });
}

function y(xA, xB, yA, yB, radius) {
  if (xA == xB)
    return 0;

  d = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
  dt = d - radius;
  ratio = dt / d;

  dy = (yB - yA) * ratio;

  test = yA + dy;

  return (1 - ratio) * yA + ratio * yB;
}
function x(xA, xB, yA, yB, radius) {
  if (xA == xB)
    return 0;

  d = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
  dt = d - radius;
  ratio = dt / d;

  dx = (xB - xA) * ratio;
  test = xA + dx;

  return (1 - ratio) * xA + ratio * xB;
}

// Code für die Sichtbarkeit der Linien bei Knopfdruck
var Linie = function () {
  //commuting();
  var x = document.getElementById("LandName").value;
  dataChange();
 
  svg
    .selectAll("line")
    .style("opacity", 0.17)
    .filter((ort) => ort.name == x || x == "Alle")
    
    .style("opacity", 0.9999);
  svg
    .selectAll("circle")
    .style("opacity", 0.17)
    .filter((ort) => ort.name == x || ort.name == "Berlin" || x == "Alle")
    .style("opacity", 0.9999);

  // svg
  //   .select("circle")
  //   .style("opacity", 0.2)
  //   .filter((ort) => ort.name == "Berlin")
  //   .style("opacity", 0.9999);
};

function dataChange(){
 
  var insgesamt = 0;
  fetch("pendler.json")
    .then((res) => res.json())
    .then((data) => {
      var json1 = Object.values(data).filter((v) => v.Arbeitsort != "Berlin");
      var json = Object.values(data).filter((v) =>
        v.Arbeitsort.startsWith("Berlin")
      );
      var json2 = Object.values(data).filter((v) =>
        v.Wohnort.startsWith("Berlin")
      );
      var inBrandenburg = 0;

      for (var i = 0; i < json1.length; i++) {
        if (document.getElementById("LandName").value == json1[i].Wohnort) {
          inBrandenburg += json1[i].Insgesamt;
        }
      }

      for (var i = 0; i < json2.length; i++) {
        if (
          document.getElementById("LandName").value == json2[i].Arbeitsort &&
          toggle.checked == false
        ) {
          document.getElementById("Anzahl").innerHTML = json2[i].Insgesamt;
          document.getElementById("Anzahl1").innerHTML = json2[i].Frauen;
          document.getElementById("Anzahl2").innerHTML = json2[i].Männer;
          document.getElementById("Anzahl3").innerHTML = json2[i].AZB;
          document.getElementById("Percent1").innerHTML = Math.round(
            (json2[i].Frauen / json2[i].Insgesamt) * 100
          );
          document.getElementById("Percent2").innerHTML = Math.round(
            (json2[i].Männer / json2[i].Insgesamt) * 100
          );
          document.getElementById("Percent3").innerHTML = Math.round(
            (json2[i].AZB / json2[i].Insgesamt) * 100
          );
          document
            .getElementById("stop1")
            .setAttribute(
              "offset",
              Math.round((json2[i].Frauen / json2[i].Insgesamt) * 100)
            );
          document
            .getElementById("stop2")
            .setAttribute(
              "offset",
              Math.round((json2[i].Frauen / json2[i].Insgesamt) * 100)
            );
          document
            .getElementById("stop3")
            .setAttribute(
              "offset",
              Math.round((json2[i].Frauen / json2[i].Insgesamt) * 100)
            );
          document.getElementById("FrontColor1").innerHTML =
            Math.round(13.9) + "%";
          document.getElementById("FrontColor2").innerHTML =
            Math.round(86.1) + "%";
        }
      }

      for (var i = 0; i < json.length; i++) {
        if (
          document.getElementById("LandName").value == json[i].Wohnort &&
          toggle.checked == true
        ) {
          insgesamt = inBrandenburg + json[i].Insgesamt;
          document.getElementById("Anzahl").innerHTML = json[i].Insgesamt;
          document.getElementById("Anzahl1").innerHTML = json[i].Frauen;
          document.getElementById("Anzahl2").innerHTML = json[i].Männer;
          document.getElementById("Anzahl3").innerHTML = json[i].AZB;
          document.getElementById("Percent1").innerHTML = Math.round(
            (json[i].Frauen / json[i].Insgesamt) * 100
          );
          document.getElementById("Percent2").innerHTML = Math.round(
            (json[i].Männer / json[i].Insgesamt) * 100
          );
          document.getElementById("Percent3").innerHTML = Math.round(
            (json[i].AZB / json[i].Insgesamt) * 100
          );
          document
            .getElementById("stop1")
            .setAttribute(
              "offset",
              Math.round((json[i].Insgesamt / insgesamt) * 100) + "%"
            );
          document
            .getElementById("stop2")
            .setAttribute(
              "offset",
              Math.round((json[i].Insgesamt / insgesamt) * 100) + "%"
            );
          document
            .getElementById("stop3")
            .setAttribute(
              "offset",
              Math.round((inBrandenburg / insgesamt) * 100) + "%"
            );
          document.getElementById("FrontColor1").innerHTML =
            Math.round((json[i].Insgesamt / insgesamt) * 100) + "%";
          document.getElementById("FrontColor2").innerHTML =
            Math.round((inBrandenburg / insgesamt) * 100) + "%";
        }
      }

      if (document.getElementById("LandName").value == "Alle"){

        var alleGesamt = 0;
        var alleFrauen = 0;
        var alleMaenner = 0;
        var alleAuszubildende = 0;

        if ( toggle.checked == true) {

            for(var i = 0; i < json.length; i++)
            {
              alleGesamt+= json[i].Insgesamt;
              alleFrauen+= json[i].Frauen;
              alleMaenner+= json[i].Männer;
              alleAuszubildende+= json[i].AZB;
            }

            document.getElementById("Anzahl").innerHTML = alleGesamt;
            document.getElementById("Anzahl1").innerHTML = alleFrauen;
            document.getElementById("Anzahl2").innerHTML = alleMaenner;
            document.getElementById("Anzahl3").innerHTML = alleAuszubildende;
            document.getElementById("Percent1").innerHTML = Math.round(
              (alleFrauen / alleGesamt) * 100
            );
            document.getElementById("Percent2").innerHTML = Math.round(
              (alleMaenner / alleGesamt) * 100
            );
            document.getElementById("Percent3").innerHTML = Math.round(
              (alleAuszubildende / alleGesamt) * 100
            );
            document
              .getElementById("stop1")
              .setAttribute(
                "offset",
                Math.round((alleGesamt / insgesamt) * 100) + "%"
              );
            document
              .getElementById("stop2")
              .setAttribute(
                "offset",
                Math.round((alleGesamt / insgesamt) * 100) + "%"
              );
            document
              .getElementById("stop3")
              .setAttribute(
                "offset",
                Math.round((inBrandenburg / insgesamt) * 100) + "%"
              );
            document.getElementById("FrontColor1").innerHTML =
              Math.round((alleGesamt / insgesamt) * 100) + "%";
            document.getElementById("FrontColor2").innerHTML =
              Math.round((inBrandenburg / insgesamt) * 100) + "%";
        }

        if ( toggle.checked == false) {

          for(var i = 0; i < json2.length; i++)
          {
            alleGesamt+= json2[i].Insgesamt;
            alleFrauen+= json2[i].Frauen;
            alleMaenner+= json2[i].Männer;
            alleAuszubildende+= json2[i].AZB;
          }

          document.getElementById("Anzahl").innerHTML = Math.round(alleGesamt);
          document.getElementById("Anzahl1").innerHTML = alleFrauen;
          document.getElementById("Anzahl2").innerHTML = alleMaenner;
          document.getElementById("Anzahl3").innerHTML = alleAuszubildende;
          document.getElementById("Percent1").innerHTML = Math.round(
            (alleFrauen / alleGesamt) * 100
          );
          document.getElementById("Percent2").innerHTML = Math.round(
            (alleMaenner / alleGesamt) * 100
          );
          document.getElementById("Percent3").innerHTML = Math.round(
            (alleAuszubildende / alleGesamt) * 100
          );
          document
            .getElementById("stop1")
            .setAttribute(
              "offset",
              Math.round((alleGesamt / insgesamt) * 100) + "%"
            );
          document
            .getElementById("stop2")
            .setAttribute(
              "offset",
              Math.round((alleGesamt / insgesamt) * 100) + "%"
            );
          document
            .getElementById("stop3")
            .setAttribute(
              "offset",
              Math.round((inBrandenburg / insgesamt) * 100) + "%"
            );
          document.getElementById("FrontColor1").innerHTML =
            Math.round((alleGesamt / insgesamt) * 100) + "%";
          document.getElementById("FrontColor2").innerHTML =
            Math.round((inBrandenburg / insgesamt) * 100) + "%";
      }
      }
    });
}
// Farbänderungen
function colorchange() {
  var y = document.getElementById("LandName").value;
 
  dataChange();

  if (toggle.checked == false) {
    fromBerlin();
    document.getElementById("rectangle").style.background =
      "#AA2B2B";
    document.getElementById("rectangle1").style.background =
      "#F3E2D8";

    document.getElementById("LandName").style.background = "#F3E2D8";
    document.getElementById("LandName").style.color = "black";
    document.getElementById("stop1").style.stopColor = "#EF7E7E";
    document.getElementById("stop2").style.stopColor = "#F5A0A0";
    document.getElementById("stop3").style.stopColor = "#F5A0A0";
    document.getElementById("circle1").style.fill = "#EF7E7E";
    document.getElementById("circle2").style.fill = "#F5A0A0";

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
    toBerlin();
    document.getElementById("rectangle").style.background = "#011A31";
    document.getElementById("rectangle1").style.background = "#00060B";
    document.getElementById("LandName").style.background = "#00060B";
    document.getElementById("LandName").style.color = "white";
    document.getElementById("stop1").style.stopColor = "#00A3FF";
    document.getElementById("stop2").style.stopColor = "#5079A0";
    document.getElementById("stop3").style.stopColor = "#5079A0";
    document.getElementById("circle1").style.fill = "#00A3FF";
    document.getElementById("circle2").style.fill = "#5079A0";

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
  svg
    .selectAll("line")
    .style("opacity", 0.17)
    .filter((ort) => ort.name == y || y == "Alle")
    
    .style("opacity", 0.9999);
  svg
    .selectAll("circle")
    .style("opacity", 0.17)
    .filter((ort) => ort.name == y || ort.name == "Berlin" || y == "Alle")
    .style("opacity", 0.9999);


    document.getElementById("LandName").value = "-";



    document.getElementById("Anzahl").innerHTML = 0;
    document.getElementById("Anzahl1").innerHTML = 0;
    document.getElementById("Anzahl2").innerHTML = 0;
    document.getElementById("Anzahl3").innerHTML = 0;
    document.getElementById("Percent1").innerHTML = 0;
    document.getElementById("Percent2").innerHTML =0;
    document.getElementById("Percent3").innerHTML = 0;
    document
      .getElementById("stop1")
      .setAttribute(
        "offset",
       50 + "%"
      );
    document
      .getElementById("stop2")
      .setAttribute(
        "offset",
       50 + "%"
      );
    document
      .getElementById("stop3")
      .setAttribute(
        "offset",
        100 + "%"
      );
    document.getElementById("FrontColor1").innerHTML =
      50 + "%";
    document.getElementById("FrontColor2").innerHTML =
      50 + "%";

}
