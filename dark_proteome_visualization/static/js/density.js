//console.log(dark_proteomes);
//console.log(dark_proteins);

function createDensityPlot(x, y){

  var margin = {top: 70, right: 70, bottom: 170, left: 70};
  var svgHeight = 600;
  var svgWidth = 600;
  var myChartWidth = svgWidth - margin.left - margin.right;
  var myChartHeight = svgHeight - margin.top - margin.bottom;
  var dot_radius = 1;
  var returnDictionary = []

  var groups = NaN;
  var myPanel = NaN;



  // truncate dataset
  dark_proteins.length = 50000

  var new_proteins = []
  for (i = 0; i < dark_proteins.length; i++){
    if ((Number(dark_proteins[i][y]) != 1) && (Number(dark_proteins[i][x]) != 0))
    new_proteins.push(dark_proteins[i])
  }

  console.log(new_proteins)

  dark_proteins = new_proteins;


// Darkness
  function makeYScale(){
    return  d3.scaleLinear()
      .domain([-0.2, 1.2]) // hard coded information about the darkness data
      .range([myChartHeight, 0]);
};


// Membrane
  function makeXScale(){
    return d3.scaleLinear()
      .domain([-20, 120]) // also hard coded...
      .range([0, myChartWidth]);
    };


  //Scales
  var xScale = makeXScale();
  var yScale = makeYScale();

  //Axis
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Pan and zoom

  var myZoom = d3.zoom()
    .scaleExtent([.5, 10])
    //.extent([[0, 0], [myChartWidth, myChartHeight]])
    .on("zoom", zoomFunc);


  // create panel
  function buildMyPanel(xScale, yScale){
  var svg = d3.select('#content').append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

  var panel = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  panelY = panel.append("g")
            .attr("class", "axis")
            .call(yAxis);

  panelX = panel.append("g")
            .attr("transform", "translate(0," + myChartHeight + ")")
            .attr("class", "axis")
            .call(xAxis);

  panel.append("text")
      .attr("class", "axis-label")
      .attr("transform","translate(" + (myChartWidth/2) + " ," + (myChartHeight+(margin.top/2)) + ")")
      .text(x);

  panel.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left/2))
        .attr("x",0 - (myChartHeight / 2))
        .text(y);

  return panel
  }


   function zoomFunc(){
     // new scales
     var new_xScale = d3.event.transform.rescaleX(xScale);
     var new_yScale = d3.event.transform.rescaleY(yScale);
     // update axes
     panelX.call(xAxis.scale(new_xScale));
     panelY.call(yAxis.scale(new_yScale));
     /*
     myPanel.selectAll("circle")
      .attr('cx', function(d) {return new_xScale(Number(d[x]))})
      .attr('cy', function(d) {return new_yScale(Number(d[y]))});
      */
      innerSVG.attr(
      "transform",
      d3.event.transform
    );

   }

  contours = d3.contourDensity()
    .x(function(d){return xScale(Number(d[x]))})
    .y(function(d){return yScale(Number(d[y]))})
    .size([myChartWidth, myChartHeight])
    //.thresholds(d3.range(2, 21).map(p => Math.pow(2, p)))
    .bandwidth(20)
  (dark_proteins)

  console.log(contours);







  //returnDictionary["init"] = function () {
    var myPanel = buildMyPanel(xScale, yScale);

    var innerSVG = myPanel.append("g");
    innerSVG.append("g")
      .selectAll("circle")
      .data(dark_proteins)
      .enter()
      .append("circle")
        .attr("cx",function(d){return xScale(Number(d[x]))})
        .attr("cy",function(d){return yScale(Number(d[y]))})
        .attr("r", dot_radius)
        .attr("fill", 'blue')
        .attr("fill-opacity","0.2")
        .call(myZoom);


    innerSVG.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(contours)
      .enter().append("path")
        .attr("d", d3.geoPath());


/*
    groups = panel.selectAll(".groups")
      .data(dark_proteins)
      .enter()
      .append("g")
      .attr("class", "gbar");

    groups.append("circle")
       .attr("cx",function(d){return xScale(Number(d[x]))})
       .attr("cy",function(d){return yScale(Number(d[y]))})
       .attr("r", dot_radius)
       .attr("fill", 'black')
       .attr("fill-opacity","1");

    groups.append()
    };
    console.log("asdf")

*/
  //}
    //return returnDictionary

};

  window.onload = function() {
    myPlot = createDensityPlot(my_x, "_darkness");
    //myPlot.init();
  };
