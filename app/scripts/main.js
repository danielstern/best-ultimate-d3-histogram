console.log('\'Allo \'Allo!');

var margin = {top: 100, right: 20, bottom: 30, left: 80},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json('data.json',function(e,data){
  x.domain(data.map(function(d) { return d.id; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("y", 10)
    .attr("dy", ".71em")
    .attr("x",'90px')
    .style("text-anchor", "end")
    .text("Genome #");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value");


  var color = d3.scale.category20();

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.id); })
    .attr("width", x.rangeBand())
    .attr('rx','0%')
    .attr('ry','0%')
    .attr("y", function(d) { return height; })
    .attr("height", function(d) { return 0; })
    .attr('fill',function(d,i){
      return color(i);
    })
    .transition()
    .duration(300)
    .delay(function(d,i){return i * 330})
    .attr("height", function(d) { return height - y(d.value); })
    .attr("y", function(d) { return y(d.value); })

    .transition()
    .duration(660)
    .delay(5000)
    .attr('rx','50%')
    .attr('ry','50%')
    .attr('height',50)
    .attr('width',50)

})
