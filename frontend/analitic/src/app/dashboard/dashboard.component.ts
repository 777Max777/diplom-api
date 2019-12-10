import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { StatisticaService } from '../services/statistica.service';
import { Skills } from './../models/Skills';

declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  labels: string[];
  series: number[];
  skillArray: Skills[];
  constructor(private statisticaService: StatisticaService) {}

    ngOnInit(){
        /*var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        };

        var optionsSales = {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales: any[] = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        new Chartist.Line('#chartActivity', data, options, responsiveOptions);
*/
        /*var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
*/
        this.statisticaService.getSkillsByText(this.statisticaService.index)
          .subscribe(skills => {
            this.skillArray = [];
            this.labels = [];
            this.series = [];
            let i = 0;

            for(var key in skills) {
              let skill: Skills;
              skill = new Skills(key, skills[key].toString());
              this.skillArray[i] = skill;
              i++;
            }

            this.labels[0] = this.skillArray[1].name;
            this.labels[1] = this.skillArray[2].name;
            this.labels[2] = this.skillArray[3].name;
            this.labels[3] = this.skillArray[4].name;
            this.labels[4] = this.skillArray[5].name;

            this.series[0] = this.skillArray[1].value;
            this.series[1] = this.skillArray[2].value;
            this.series[2] = this.skillArray[3].value;
            this.series[3] = this.skillArray[4].value;
            this.series[4] = this.skillArray[5].value;

            new Chartist.Pie('#chartPreferences', {
              labels: this.labels,
              series: this.series
            });

          });
        /*new Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%', '7%'],
          series: [5, 10, 32, 50]
        });*/
    }
}
