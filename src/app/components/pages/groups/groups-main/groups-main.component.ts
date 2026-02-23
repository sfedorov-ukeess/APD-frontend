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
  protected participants: Array<any> = [];
  protected selectedParticipants: Record<string, boolean> = {};
  protected APDname: string = "";
  protected APDDate: Date = new Date();
  protected unitCat: string = ""
  protected DivType: string = "";
  protected sitType: number = -1;
  protected sitTypesList: Array<any> = [];
  protected moder: string = "";
  protected issue: string = "";
  protected experienceAreaId: number = 0;
  protected experienceAreaIds: any=[];
  protected newGroupNameModel: string = "";
  protected validationMsg :string = "";

  constructor(
    private API: APIService
  ) {}

  ngOnInit() {
    //TODO remove mock
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
      //this.isPanelOpened = true;

    });
  }

  addNewGroup() {
    this.API.getUserList().subscribe(
      res => {
        this.participants=res.people;
        this.sidebarMode = "addNewGroup";
        this.isPanelOpened = true;
      });
  }

  postNewGroup() {
    this.isValid(null);
    if (!this.validationMsg.trim()) {
       const selecteduuid = Object.keys(this.selectedParticipants);
      const users = [];
      for (const item in selecteduuid) {
        const user = this.participants.find(participant => participant.uuid === selecteduuid[item])
        users.push({
          name: user.name,
          phone: user.phone
        })
      }
      this.API.createNewGroup({name: this.newGroupNameModel, users}).subscribe(()=>{
        this.addNewGroup();
      })
    }
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
    this.API.getReviewlist(uuid).subscribe(res => {      this.reviewList = this.reviewListF = res.reviews;
      this.API.getAreaList().subscribe(res)
      this.isPanelOpened = true;

    return;
    });
  }

  addNewReview() {
    this.API.getSitTypes().subscribe(res => {
      this.sitTypesList = res.list;
      this.sitType= this.sitTypesList[0]["id"];
      this.sidebarMode = "addReview";
      this.isPanelOpened = true;
      this.API.getAreaList().subscribe(res =>{
        this.experienceAreaIds = res;
      })
    });
  }

  reviewCardClick(uuid: string | null) {

  }

  addReviewData() {
       const newReview= {
      "bunchUuid":this.selectedGroup.uuid,
      "deadline": (new Date(this.APDDate)).getTime(),
      "groupName": this.selectedGroup.name,
      "groupUuid": this.selectedGroup.uuid,
      "issue": this.issue,
      "name": this.APDname,
      "uuid": this.selectedGroup.uuid,
      "filledCount": 0,
      "filledByMe": false,
      "userCount": 3,
      "owner": true,
      "unitType": this.DivType,
      "sitType": this.sitType,
      "experienceAreaIds": this.experienceAreaIds  };console.log(newReview);
        this.API.postCreateReview(newReview).subscribe(res => {
        this.reviewList.push(
          {...newReview
          });
        })
  }

  selectPeople(uuid: string) {
   this. selectedParticipants[uuid as string] = (!this. selectedParticipants[uuid as string]) || false;
   this.isValid(null);
  }

  isValid (model: any) {
    if (model) {
      return model ? model.invalid && (model.dirty || model.touched) : false;
    }
    if(!this.newGroupNameModel|| this.newGroupNameModel.trim()===""){
      this.validationMsg = "Заповніть ім'я групи"
    } else {
      if (Object.keys(this.selectedParticipants).length === 0) {
        this.validationMsg = "Оберіть хоча б одного учасника"
      } else{
        this.validationMsg = "";
      }
    }
  }

  onSubmitAddReview(form: any) {
    if(form?.valid) {
      this.API.postCreateReview(
        {"bunchUuid": "dc6db24e-0db1-47b5-a69f-17b1009427d5",
          "name": "АПД-2",
          "deadline": "1675955811000",
          "moderator": "командир роти",
          "situationId": 2,
          "unitType": this?.DivType,
          "userCategories": this?.unitCat,
          "experienceAreaIds": [1, 3, 6],
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)"

        }
      );
    }
  }
}
