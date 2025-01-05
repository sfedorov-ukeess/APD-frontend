import {Component, OnInit} from '@angular/core';
import {APIService} from "../../../../services/APIservice/api.service";

@Component({
  selector: 'app-groups-main',
  templateUrl: './groups-main.component.html',
  styleUrls: ['./groups-main.component.scss']
})
export class GroupsMainComponent implements OnInit{
  protected isPanelOpened: boolean = false;
  protected search: string = "";
  protected sidebarMode: "reviewList" | "addNewGroup" = "reviewList";
  protected selectedGroup: any = {};
  protected groupList: Array<any> = [];
  protected groupListF: Array<any> = [];
  protected reviewList: Array<any> = [];
  protected reviewListF: Array<any> = [];

  constructor(
    private API: APIService
  ) {}

  ngOnInit() {
    //TODO remove mock
    const r = {
      "groups": [
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
        },
        {
          "modifiedOn": 1676897960000,
          "name": "Нове імя групи",
          "reviewCount": 1,
          "userCount": 4,
          "uuid": "1dce9579-ee8c-49ab-a6b4-8f1d1858b047",
          "owner": true,
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
        },
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
        },
      ]
    };
    this.groupListF = this.groupList = r.groups;
    return
    this.API.getGrouplist().subscribe(
      res => {
        this.groupListF = this.groupList = res.groups;
      }
    )
  }

  addNewGroup() {
    this.sidebarMode = "addNewGroup";
    this.isPanelOpened = true;
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
    const r = {
      "reviews": [
        {
          "deadline": 1675955811000,
          "experienceAreas": [
            {
              "id": 1,
              "name": "морально-психологічний стан"
            },
            {
              "id": 3,
              "name": "військове лідерство"
            },
            {
              "id": 6,
              "name": "нові зразки озброєння та військової техніки"
            }
          ],
          "groupName": "Нова Група 3",
          "groupUuid": "a4f4bfc4-67fc-4a21-b049-044f4d46c96f",
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)",
          "name": "АПД-22-березня",
          "uuid": "56d4885f-9313-4fb3-b5d4-3ae848e7858e",
          "filledCount": 0,
          "filledByMe": false,
          "userCount": 3,
          "owner": true
        },
        {
          "deadline": 1675955811000,
          "experienceAreas": [
            {
              "id": 1,
              "name": "морально-психологічний стан"
            },
            {
              "id": 3,
              "name": "військове лідерство"
            },
            {
              "id": 6,
              "name": "нові зразки озброєння та військової техніки"
            }
          ],
          "groupName": "Нова Група 4",
          "groupUuid": "a4f4bfc4-67fc-4a21-b049-044f4d46c96f",
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)",
          "name": "АПД-22-березня новий",
          "uuid": "56d4885f-9313-4fb3-b5d4-3ae848e7858e",
          "filledCount": 2,
          "filledByMe": false,
          "userCount": 3,
          "owner": true
        },
        {
          "deadline": 1675955811000,
          "experienceAreas": [
            {
              "id": 1,
              "name": "морально-психологічний стан"
            },
            {
              "id": 3,
              "name": "військове лідерство"
            },
            {
              "id": 6,
              "name": "нові зразки озброєння та військової техніки"
            }
          ],
          "groupName": "Група 55",
          "groupUuid": "a4f4bfc4-67fc-4a21-b049-044f4d46c96f",
          "issue": "Підготовка і ведення наступу ротної тактичної групи (здійснення маршу дивізіону в наступі; організація медичного забезпечення батальйону в обороні; дії про потраплянні у засідку; способи захисту озброєння від ударного БПЛА Ланцет тощо)",
          "name": "АПД-наше",
          "uuid": "56d4885f-9313-4fb3-b5d4-3ae848e7858e",
          "filledCount": 5,
          "filledByMe": false,
          "userCount": 14,
          "owner": true
        }
      ]
    };
    this.reviewList = this.reviewListF = r.reviews;
    return;
        this.API.getReviewlist(uuid).subscribe(res => {
      this.isPanelOpened = true;
      this.reviewList = this.reviewListF = res.reviews;
    });
  }

  reviewCardClick(uuid: string | null) {

  }


}
