

angular.module("test",[])
.run(function($rootScope){
    d3.json('data.json',function(e,root){

      var width = 950,
        height = 500;


      var colorz = d3.scale.category20b();

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      color.domain(d3.keys(root[0]).filter(function(key) { return key == 'id' }));

      var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")


      var y0 = 0;
      root.forEach(function(d){
        d.y0 = y0;
        var y1 = y0 += d.value;
        d.y1 = y1;
      });

      var y = d3.scale.linear();
      //y.domain([0,10]);
      y.domain([0,root[root.length-1].y1]);
      y.range([0,width]);

      svg.selectAll('rect')
        .data(root)
        .enter().append('rect')
        .attr('x',function(d){return y(d.y0)})
        .attr('width',function(d){return y(d.y1 - d.y0)})
        .attr('height',40)
        .attr('fill',function(d,i){return colorz(i)})



      $rootScope.data = root;

      $rootScope.$apply();


    })


  })
.directive('chart',function(){
    return {
      restrict:'AE',
      scope:{
        thing:'='
      },
      controller:function($scope,$element){
        var margin = {top: 2, right: 2, bottom: 3, left: 4},
          width = 100 - margin.left - margin.right,
          height = 30 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
          .range([height, 0]);

        var colors = d3.scale.category20c();



        var svg = d3.select($element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = [];
        var i = 7;
        while (i--) {
          data.push({
            id:i,
            a:Math.random()*10,
            b:Math.random()*10,
            c:Math.random()*10,
            d:Math.random()*10,
            e:Math.random()*10
          })
        };
          x.domain(data.map(function(d) { return d.id; }));
          y.domain([0, d3.max(data, function(d) { return d.id; })]);


          svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.id); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.a); })
            .attr('fill',function(d){return colors(d.id)})
            .attr("height", function(d) { return height - y(d.a); });


        function type(d) {
          d.value = +d.value;
          return d;
        }

      }

    }
  })

