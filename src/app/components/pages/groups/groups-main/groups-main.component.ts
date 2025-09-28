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
  protected sidebarMode: "reviewList" | "addNewGroup" | "addReview" | "addNewGroupUders" = "reviewList";
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
  protected sitTypesList: Array<any> = [];
  protected usersList = [];
  protected moder: string = "";
  protected issue: string = "";
  protected experienceAreaId: number = 0;
  protected experienceAreaIds: any=[];
  protected newGroupName: string = ""


  constructor(
    protected API: APIService
  ) {}

  ngOnInit() {
    //TODO remove mock
    this.getGroupList();
  }

  getGroupList() {
    this.API.getGrouplist().subscribe(res =>{
      this.groupListF = this.groupList = {
        "groups":[
          {
            "modifiedOn": 1676897960000,
            "name": "Нове імя групи",
            "reviewCount": 1,
            "userCount": 4,
            "uuid": "1dce9579-ee8c-49ab-a6b4-8f1d1858b047",
            "owner": false,
            "invitedPeople": [
              {
                "phone": "012345678",
                "name": "Андрій"
              },
              {
                "phone": "012345679",
                "name": "Віктор"
              }
            ],
            "people": [
              {
                "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5"
              }]
          }]}["groups"];
      this.sidebarMode = "addNewGroup";
      this.isPanelOpened = true;

    });
  }
  addNewGroup() {
    this.sidebarMode = "addNewGroup";
    this.isPanelOpened = true;

  }

  onAddUsers(form:any) {

    }
  }

  onSubmitAddGroupUsers(form:any) {
  if(form.valid) {
    // @ts-ignore
    this.API.getUserList().subscribe(list =>{
      // @ts-ignore
      this.invitedList = [
        {
          "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5",
          "phone": "000000000",
          "name": "Петро",
          "surname": "Мельник",
          "groupCount": "1"
        },
        {
          "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f6",
          "phone": "000000001",
          "name": "Петро",
          "surname": "Мельник1",
          "groupCount": "1"
        }
        ,{
          "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f7",
          "phone": "000000002",
          "name": "Петро",
          "surname": "Мельник2",
          "groupCount": "1"
        }
      ];
      this.sidebarMode = "addNewGroupUders";
    });console.log(this.invitedList);
  }
  onSubmitAddGroup(form:any){
    if(form.valid){
      // @ts-ignore
      this.API.postCreaateNewGroup(this.newGroupName).subscribe((res: any) => {
        const newGroup = {
          "modifiedOn": new Date(),
          "reviewCount": 0,
          "userCount": 0,
          "uuid": res.uuid,
          "owner": true,
          "invitedPeople": [],
          "people": []
        }
        // @ts-ignore
        this.groupList.push(newGroup);
        // @ts-ignore
        this.groupListF.push(newGroup);
      });
    }
  }

  searchGroupHandler(value: string) {
      // @ts-ignore
    this.search = value;
      const search = this.search.toLowerCase();
      // @ts-ignore
    this.groupListF = this.groupList.filter(item =>
          (item.name.toLowerCase().indexOf(search) > -1)
      );
  }

  searchReviewHandler(value: string) {
    // @ts-ignore
    this.search = value;
    const search = this.search.toLowerCase();
    // @ts-ignore
    this.reviewListF = this.reviewList.filter(item =>
        (item.name.toLowerCase().indexOf(search) > -1) ||
        (item.groupName.toLowerCase().indexOf(search) > -1)
    );
  }

  handleGroupClick(uuid: string) {
    // @ts-ignore
    this.sidebarMode = "reviewList";
    // @ts-ignore
    this.isPanelOpened = true;
    // @ts-ignore
    this.selectedGroup = this.groupList.find(item => item.uuid === uuid);
    // @ts-ignore
    this.API.getReviewlist(uuid).subscribe(res => {
      // @ts-ignore
      this.reviewList = this.reviewListF = res.reviews;
      // @ts-ignore
      this.API.getAreaList().subscribe(res)
      // @ts-ignore
      this.isPanelOpened = true;

    return;
    });
  }

  addNewReview() {
    // @ts-ignore
    this.API.getSitTypes().subscribe(res => {
      // @ts-ignore
      this.sitTypesList = res.list;
      // @ts-ignore
      this.sitType= this.sitTypesList[0]["id"];
      // @ts-ignore
      this.sidebarMode = "addReview";
      // @ts-ignore
      this.isPanelOpened = true;
      // @ts-ignore
      this.API.getAreaList().subscribe(res =>{
        // @ts-ignore
        this.experienceAreaIds = res;
      })
    });
  }

  reviewCardClick(uuid: string | null) {

  }

  addReviewData() {
    // @ts-ignore

    const newRebiew= {
      "deadline": this.APDDate,
      "groupName": this.selectedGroup.name,
      "groupUuid": this.selectedGroup.uuid,
      "issue": this.issue,
      "name": this.APDname,
      "uuid": this.selectedGroup.uuid,
      "filledCount": 0,
      "filledByMe": false,
      "userCount": 3,
      "owner": true,
      "sitType": this.sitType,
      "experienceAreaIds": this.experienceAreaIds
  }
        this.API.postCreateRebiew(newRebiew).subscribe(res => {
        this.reviewList.push(
          {...newRebiew
          });
        })
  }

  selectPeople() {

  }

  isValid (model: any) {
    return model? model.invalid && (model.dirty || model.touched): false;
  }

  onSubmitAddReview(form: any = {}) {
    return;
    /*if(form?.valid) {
      // @ts-ignore
      this.API.postCreateReview(
        {"bunchUuid": "dc6db24e-0db1-47b5-a69f-17b1009427d5",
          "name": "АПД-2",
          "deadline": "1675955811000",
          "moderator": "командир роти",
          "situationId": 2,
          "unitType": (this as any).DivType,
          "userCategories": (this as any).unitCat,
          "experienceAreaIds": [1, 3, 6],
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)"
        }
      );
    }*/
  };
}
