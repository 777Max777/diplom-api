import { Request } from '../models/Request';
import { Component, OnInit, Input } from '@angular/core';
import { StatisticaService } from '../services/statistica.service';
import { Skills } from '../models/Skills';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    dataRow: string[][];
    skills: Skills[];

    @Input() query: string;


    constructor(private statisticaService: StatisticaService){ }

    ngOnInit() {
      this.skills = []; //this.req = [];

      this.tableData2 = ({
        headerRow: [],
        dataRows: []
      });

      this.tableData1 = ({
        headerRow: [],
        dataRows: []
      });

      this.tableData2.headerRow = [ 'Имя', 'Количество обработанных заявок'];

      this.statisticaService.getRequests().subscribe(requests => {
        this.dataRow = new Array(Object.values(requests).length);
        let i = 0;
        for(let j = 0; j < requests.length; j++) {
            this.dataRow[i] = new Array();
            this.dataRow[i][0] = requests[j]['queryNmae'];
            this.dataRow[i][1] = requests[j]['limit'].toString();
            i++;
      }
        this.tableData2.dataRows = this.dataRow;

      });
      /*this.statisticaService.getSkillsByText().subscribe(skill => {
        this.skills = skill;
        this.dataRow = new Array(Object.values(skill).length);
        let i = 0;
        for(var key in skill){
          this.dataRow[i] = new Array();
          this.dataRow[i][0] = key;
          this.dataRow[i][1] = skill[key].toString();
          i++;
        }

        this.tableData2 = {
          headerRow: [ 'Требование', 'Количество'],
          dataRows: this.dataRow
          /*[
              ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
              ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
              ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
              ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
              ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
              ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
          ]
        };
      });*/


        /*this.tableData1 = {
            headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
            dataRows: [
                ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
            ]
        };*/
    }

    updateRequirements(index: number) {
      this.tableData1.headerRow = [ 'Требование', 'Количество'];
      this.query = this.tableData2.dataRows[index][0];
      this.statisticaService.getSkillsByText(index + 1).subscribe(skill => {
        this.skills = skill;
        this.dataRow = new Array(Object.values(skill).length);
        let i = 0;
        for(var key in skill){
          this.dataRow[i] = new Array();
          this.dataRow[i][0] = key;
          this.dataRow[i][1] = skill[key].toString();
          i++;
        }
        this.tableData1.dataRows = this.dataRow;

        /*this.tableData2 = {
          headerRow: [ 'Требование', 'Количество'],
          dataRows: this.dataRow
        };*/
      });
    }

}
