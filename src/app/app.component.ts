import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngAfterContentInit() {
    var matrixData={
      "Occupants":
      [0, 10,10,10,10,0,0,0,10,10,10,10,10, 10,10,10,10,0,0,0,10,10,10,10,10],
      Flooring:
      [70,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0,0,0],
      Millwork:
      [40, 0,0,0,0,0,60,0,0,0,0,0, 0,0,0,0,0,60,0,0,0,0,0],
      Ceilings:
      [60, 0,0,0,0,0,40,0,0,0,0,0,0, 0,0,0,0,0,40,0,0,0,0,0,0],
      "Wet Applied Products":
      [60, 0,0,0,0,0,40,0,0,0,0,0,0, 0,0,0,0,0,40,0,0,0,0,0,0],
      "Curtain Wall":
      [0, 0,0,0,0,0,100,0,0,0,0,0,0, 0,0,0,0,0,100,0,0,0,0,0,0],
      "Environment":
      [0, 10,10,10,10,0,10,0,10,10,10,0,10, 10,10,10,10,0,10,0,10,10,10,0,10],
      Roofing:
      [0, 0,0,0,0,0,100,0,0,0,0,0,0, 0,0,0,0,0,100,0,0,0,0,0,0],
      Insulation:
      [50, 0,0,0,0,0,50,0,0,0,0,0,0, 0,0,0,0,0,50,0,0,0,0,0,0],
      MEPFP:
      [40, 0,0,0,0,0,60,0,0,0,0,0,0, 0,0,0,0,0,60,0,0,0,0,0,0],
      Structure:
      [50, 0,0,0,0,0,50,0,0,0,0,0,0, 0,0,0,0,0,50,0,0,0,0,0,0],
      "Furniture":
      [900, 0,0,0,0,0,10,0,0,0,0,0,0, 0,0,0,0,0,10,0,0,0,0,0,0],
      "Occupants1":
      [0, 10,10,10,10,0,0,0,10,10,10,10,10, 10,10,10,10,0,0,0,10,10,10,10,10],
      Flooring2:
      [70,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0,0,0],
      Millwork3:
      [40, 0,0,0,0,0,60,0,0,0,0,0, 0,0,0,0,0,60,0,0,0,0,0],
      Ceilings4:
      [60, 0,0,0,0,0,40,0,0,0,0,0,0, 0,0,0,0,0,40,0,0,0,0,0,0],
      "Wet  5 Applied Products":
      [60, 0,0,0,0,0,40,0,0,0,0,0,0, 0,0,0,0,0,40,0,0,0,0,0,0],
      "Curtain 6  Wall":
      [0, 0,0,0,0,0,100,0,0,0,0,0,0, 0,0,0,0,0,100,0,0,0,0,0,0],
      "Environment 7":
      [0, 10,10,10,10,0,10,0,10,10,10,0,10, 10,10,10,10,0,10,0,10,10,10,0,10],
      Roofing8:
      [0, 0,0,0,0,0,100,0,0,0,0,0,0, 0,0,0,0,0,100,0,0,0,0,0,0],
      Insulation9:
      [50, 0,0,0,0,0,50,0,0,0,0,0,0, 0,0,0,0,0,50,0,0,0,0,0,0],
      MEPFP10:
      [40, 0,0,0,0,0,60,0,0,0,0,0,0, 0,0,0,0,0,60,0,0,0,0,0,0],
      Structure11:
      [50, 0,0,0,0,0,50,0,0,0,0,0,0, 0,0,0,0,0,50,0,0,0,0,0,0],
    };

    var matrix= Object.values(matrixData);
    var matrixKeys = Object.keys(matrixData);

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        outerRadius = Math.min(width, height) * 0.5 - 150,
        innerRadius = outerRadius - 30;

    var formatValue = d3.formatPrefix(",.0", 1e3);

    var chord = d3.chord()
        .padAngle(0.024)
        .sortSubgroups(d3.descending);

    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
console.log(arc)
    var ribbon = d3.ribbon()
        .radius(innerRadius);

    var color = d3.scaleOrdinal()
        .domain(d3.range(4))
        .range(["#6FCDE3",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5",
                "#E5E52B",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5",
                "#D7DAE5"
               ]);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(0)")
        .datum(chord(matrix));

    var group = g.append("g")
        .attr("class", "groups")
      .selectAll("g")
      .data(function(chords) { return chords.groups; })
      .enter().append("g")
      .attr('class', 'groups')
      .on('mouseover', fade(.1))
      .on('mouseout', fade(1));



    group.append("path")
        .style("fill", function(d) { return color(d.index); })
        .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
        .attr("d", arc);

    var groupTick = group.selectAll(".group-tick")
      .data(function(d) { return groupTicks(d, 1e3); })
      .enter().append("g")
        .attr("class", "group-tick")
        .attr("transform", function(d) {
          console.log(d);
          return "rotate(" + (d.midAngle * 180 / Math.PI - 90) +
            ") translate(" + outerRadius + ",2)";
        });

    groupTick.append("line")
        .attr("x2", 6);

    groupTick
      .filter(function(d) { return d.value % 5e3 === 0; })
      .append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) { return d.midAngle > 0 && d.midAngle < Math.PI ? "rotate(180) translate(-16)" : null; })
        .style("text-anchor", function(d) { return d.midAngle > 0 && d.midAngle < Math.PI ? "end" : null; })
        .text(function(d) {
      return matrixKeys[d.index];
    });

    g.append("g")
        .attr("class", "ribbons")
      .selectAll("path")
      .data(function(chords) { return chords; })
      .enter().append("path")
        .attr('class', 'chord')
        .attr("d", ribbon)
        .style("fill", function(d) { return color(d.target.index); })
        .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })
        ;

    // Returns an array of tick angles and values for a given group and step.
    function groupTicks(d, step) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, step).map(function(value) {
        return {
          index:d.index,
          value: value,
          angle: value * k + d.startAngle,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
          midAngle: (d.startAngle + d.endAngle) / 2
        };
      });
    }
    function fade(opacity) {
      return function(d, i) {
        svg.selectAll('path.chord')
        .filter(function(d) { return d['source'].index !== i && d['target'].index !== i; })
        .transition()
        .style('opacity', opacity);

      };
    }
  }
}
