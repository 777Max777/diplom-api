import { Component, OnInit, Input } from '@angular/core';
//import * as angular from 'angular';
import { StatisticaService } from '../services/statistica.service';
import { query } from '@angular/core/src/render3';

declare var $:any;

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  @Input() query: string;
  @Input() salaryStart: string;
  @Input() salaryUntil: string;
  @Input() limit: string;

  constructor(private statisticaService: StatisticaService){}

    select2: number;
    ngOnInit() {
      /*this.dropdownList = [
        /*{"id":1,"itemName":"India"},
        {"id":2,"itemName":"Singapore"},
        {"id":3,"itemName":"Australia"},
        {"id":4,"itemName":"Canada"},
        {"id":5,"itemName":"South Korea"},
        {"id":6,"itemName":"Germany"},
        {"id":7,"itemName":"France"},
        {"id":8,"itemName":"Russia"},
        {"id":9,"itemName":"Italy"},
        {"id":1,"itemName":"Sweden"}
      ];*/
      /*this.selectedItems = [
          {"id":10,"itemName":"Sweden"}
      ];*/
      this.dropdownSettings = {
            singleSelection: false,
            text: 'Выберите город',
            selectAllText: 'Выбрать всё',
            unSelectAllText: 'Отменить выбранное',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
            lazyLoading: true
          };
          this.sendRequest();
      }

    onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
    }
    onSelectAll(items: any){
    console.log(items);
    }
    onDeSelectAll(items: any){
    console.log(items);
    }

    getValues() {
      console.log("Items" + this.selectedItems);
      console.log("Query" + this.query);
      this.statisticaService.createRequest(this.query,
        this.salaryStart,
        this.salaryUntil,
        this.limit);
    }

    getSelectedValues(): any[] {
      return this.selectedItems;
    }

    sendRequest(){
      console.log("send Request");
      this.statisticaService.getLocations().subscribe(base =>{
        this.dropdownList = base;
      }
      );
    }
/*
    initSelect2() {
      console.log('process get locations');
      this.select2 = 56;
      angular.module('app-analitic')
      .controller('LocationController', function($scope) {
        $scope.selected = null;
        $scope.multipleSelected = [2];
        $scope.disabled = false;
        $scope.list = [{
          id: 1,
          name: 'John'
        }, {
          id: 2,
          name: 'Mary'
        }, {
          id: 3,
          name: 'Scott'
        }, {
          id: 4,
          name: 'Drew'
        }, {
          id: 5,
          name: 'Jackson'
        }]
      });
    }
*/

}
