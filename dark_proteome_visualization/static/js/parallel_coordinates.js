(function () {
    let width, height;
    let chartWidth, chartHeight;
    let margin;

    /**
     * 
     **/
    let createParallelCoordinates = function () {
        /**
         * hardcoded because i'm not sure how to loop over the array with strings and extract the corresponding
         * information from the objects
         **/

        // preprocess
        let keysToPlot = ['uncertainty', 'length'];
        let data = [];
        
        for (let i = 0; i < dark_proteomes.length; i++) {
          let tmp = [];
          for (let j=0; j<keysToPlot.length; j++) {
            // make that somehow not hardcoded
            tmp.push(dark_proteomes[i]._uncertainty);
            tmp.push(dark_proteomes[i]._length);
            tmp.push(dark_proteomes[i]._disorder);
          }
          data.push(tmp);
        }
        setSize();
        drawChart(data);
        console.log(data)
    };

    /**
     * defines sizes and margins for the svg
     */
    function setSize() {
        width = 1200;
        height = 660;

        margin = {top: 0, left: 0, bottom: 0, right: 0};


        chartWidth = width - (margin.left + margin.right);
        chartHeight = height - (margin.top + margin.bottom);

        svg.attr("width", width).attr("height", height);

        chartLayer
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate(" + [margin.left, margin.top] + ")")
    }

    /**
     * creates and populates the chart object
     */
    function drawChart(data) {
      // TODO implement
    }


    var svg = d3.select("#content")
        .append("svg");
    var chartLayer = svg.append("g")
        .classed("chartLayer", true);

    createParallelCoordinates()
}());
