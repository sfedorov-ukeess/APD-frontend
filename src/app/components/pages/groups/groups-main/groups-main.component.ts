import {Component, OnInit} from '@angular/core';
import {APIService} from "../../../../services/APIservice/api.service";
import {ParamNames} from "../../../../interfaces/interfaces";

@Component({
  selector: 'app-groups-main',
  templateUrl: './groups-main.component.html',
  styleUrls: ['./groups-main.component.scss']
})
export class GroupsMainComponent implements OnInit{
  protected isPanelOpened: boolean = false;
  protected search: string = "";
  protected sidebarMode: "reviewList" | "addNewGroup" | "addReview" = "reviewList";
  protected selectedGroup: any = {};
  protected groupList: Array<any> = [];
  protected groupListF: Array<any> = [];
  protected reviewList: Array<any> = [];
  protected reviewListF: Array<any> = [];
  protected invitedList: Array<any> = [];
  protected APDname: string = "";
  protected APDDate: any;
  protected unitCat: string = ""
  protected DivType: string = "";
  protected sitType: number = -1;
  protected sitTypes: Array<any> = [];
  protected moder: string = "";
  protected issue: string = "";


  constructor(
    private API: APIService
  ) {}

  ngOnInit() {
    //TODO remove mock
    this.API.getGrouplist().subscribe(res =>{console.log(1111,res)
      this.groupListF = this.groupList =
        res["groups"];
      this.sidebarMode = "addNewGroup";
      this.isPanelOpened = true;
      ;
    });
  }

  addNewGroup() {
    this.API.getInvitelist().subscribe(
      res => {
        this.invitedList =  res.invites;
        this.sidebarMode = "addNewGroup";
        this.isPanelOpened = true;
      });
  }

  searchGroupHandler(value: string) {
      this.search = value;
      const search = this.search.toLowerCase();
      this.groupListF = this.groupList.filter(item =>
          (item.name.toLowerCase().indexOf(search) > -1)
      );
  }

  searchReviewHandler(value: string) {
    this.search = value;
    const search = this.search.toLowerCase();
    this.reviewListF = this.reviewList.filter(item =>
        (item.name.toLowerCase().indexOf(search) > -1) ||
        (item.groupName.toLowerCase().indexOf(search) > -1)
    );
  }

  handleGroupClick(uuid: string) {
    this.sidebarMode = "reviewList";
    this.isPanelOpened = true;
    this.selectedGroup = this.groupList.find(item => item.uuid === uuid);
    this.API.getReviewlist(uuid),duvscribe(res => {console.log(2222,res)
    this.reviewList = this.reviewListF = res.reviews;
    this.isPanelOpened = true;
    return;
    });
  }

  addNewReview() {
    this.API.getSitTypes().subscribe(res => {
      this.sitTypes = res.list;
      this.sitType= this.sitTypes[0]["id"];
      this.sidebarMode = "addReview";
      this.isPanelOpened = true;
    });
  }

  reviewCardClick(uuid: string | null) {

  }

  addReviewData() {
        const mewRebiew = {
          "bunchUuid": this.selectedGroup.uuid,
          "name": this.APDname,
          "deadline": this.APDDate,
          "moderator": this.moder,
          "situationId": this.sitType,
          "unitType": "підрозділ 1",
          "userCategories": this.DivType,
          "experienceAreaIds": [1, 3, 6],
          issue: this.issue
        }
        this.API.postCreateRebiew(mewRebiew).suvscribe(res => {
        this.reviewList.push({
          {
            "deadline": this.APDDate,
            "groupName": this.selectedGroup.name,
            "groupUuid": tis.selectedGroup.uuid,
            "issue": this.issue
            "name": this.APDname",
            "uuid": this.selectedGroup.uuid,
            "filledCount": 0,
            "filledByMe": false,
            "userCount": 3,
            "owner": true
          })
        })
  }

  selectPeople() {

  }

  isValid (model: any) {
    return model? model.invalid && (model.dirty || model.touched): false;
  }

  onSubmitAddRebiew(form: any) {
    if(form.valid) {
      this.API.postCreateRebiew(
        {"bunchUuid": "dc6db24e-0db1-47b5-a69f-17b1009427d5",
          "name": "АПД-2",
          "deadline": "1675955811000",
          "moderator": "командир роти",
          "situationId": 2,
          "unitType": this.DivType,
          "userCategories": this.unitCat,
          "experienceAreaIds": [1, 3, 6],
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)"

        }
      )

    }
  }
}
