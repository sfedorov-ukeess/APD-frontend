import {Component, OnInit} from '@angular/core';
import {APIService} from "../../../services/APIservice/api.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit{
  protected isPanelOpened: boolean = false;
  protected phase: "person" | "add" = "person";
  protected invitedPeople: Array<any> = [];
  protected people: Array<any> = [];
  protected invitedPeopleF: Array<any> = [];
  protected peopleF: Array<any> = [];
  protected search: string = "";
  protected person: any = {};
  protected myGroupsForPerson: Array<any> = [];
  protected commonGroupsForPerson: Array<any> = [];
  protected invitePhone: string = "";
  protected inviteName: string = "";
  protected selectedGroups: any = {};

  constructor(
    private API: APIService
  ) {
  }
  searchHandler(value: string) {
    this.search = value;
    const search = this.search.toLowerCase();
    this.peopleF = this.people.filter(item =>
      (item.name.toLowerCase().indexOf(search) > -1) ||
      (item.surname.toLowerCase().indexOf(search) > -1) ||
      (item.phone.indexOf(search) > -1)
    );
    this.invitedPeopleF = this.invitedPeople.filter(item =>
      item.name.toLowerCase().indexOf(search) > -1 ||
      (item.phone.indexOf(search) > -1)
    );
  }
  ngOnInit() {
    this.API.getUserList().subscribe(res => {
      /// TODO remove mock
      const r = {
        "invitedPeople": [
        {
          "phone": "012345678",
          "name": "Андрій"
        },
          {
            "phone": "012345679",
            "name": "Віктор"
          },
          {
            "phone": "012345679",
            "name": "Віктор"
          },
          {
            "phone": "012345679",
            "name": "Віктор"
          },
          {
            "phone": "012345679",
            "name": "Віктор"
          }
      ],
        "people": [
        {
          "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5",
          "phone": "000000002",
          "name": "Петро",
          "surname": "Мельник",
          "groupCounter": "1"
        },
          {
            "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5",
            "phone": "000000002",
            "name": "Петро",
            "surname": "Мельник",
            "groupCounter": "1"
          },
          {
            "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5",
            "phone": "000000002",
            "name": "Петро",
            "surname": "Мельник",
            "groupCounter": "1"
          },
          {
            "uuid": "03a32ab0-0d96-4fd2-8cab-64247bb228f5",
            "phone": "000000002",
            "name": "Петро",
            "surname": "Мельник",
            "groupCounter": "1"
          }]
      };
      this.invitedPeopleF = this.invitedPeople = r.invitedPeople;
      this.peopleF = this.people = r.people;
    })
  }
  clickPeople(uuid: string) {
    this.person = this.peopleF.find(item => item.uuid === uuid);
    this.phase = "person";
    this.isPanelOpened = true;
    this.getGroupList(uuid);
  }

  getGroupList(uuid: string) {
    if (!this.myGroupsForPerson.length) {
      this.API.getGrouplist(uuid).subscribe(
        res => {
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
          this.myGroupsForPerson = r.groups.filter(item => item.owner);
          this.commonGroupsForPerson = r.groups.filter(item => !item.owner);

        }
      )
    }
  }

  isChecked(uuid: string): string {
    return Object.keys(this.selectedGroups).indexOf(uuid) > -1 ? "card-checkbox checked" : "card-checkbox";
  }

  toggleSelectedItem(uuid: string) {
    const selected = Object.assign({}, this.selectedGroups);
    if (selected[uuid]) {
      delete selected[uuid];
    } else {
      selected[uuid] = true;
    }
    this.selectedGroups = selected;
  }

  addNew() {
    this.phase = "add";
    this.isPanelOpened = true;
    if (this.people.length) {
      this.getGroupList(this.people[0].uuid);
    }
  }

  removePerson() {
    this.API.removePerson(this.person.uuid).subscribe(res => {
      this.isPanelOpened = false;
      let index: number = this.people.findIndex(item => item.uuid === this.person.uuid);
      this.people = this.people.slice(0, index).concat(this.people.slice(index + 1));
      this.peopleF = this.peopleF.slice(0, index).concat(this.peopleF.slice(index + 1));
    });
  }

  invitePerson() {
    const user = {
      name: this.inviteName,
      phone: this.invitePhone
    };
    this.API.invitePerson(user, Object.keys(this.selectedGroups)).subscribe(res => {
      this.isPanelOpened = false;
      this.inviteName = this.invitePhone = "";
      this.selectedGroups = {};
    });
  }
}
