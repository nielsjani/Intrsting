import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IntrstingService} from "../../app/service/intrsting.service";
import {IntrstingDetailPage} from "../intrsting-detail/intrsting-detail";
import {notEmpty} from "../../app/validator/NotEmptyValidator";
import {requiredIf} from "../../app/validator/RequiredIfValidator";

@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html'
})
export class AddNewPage {
  private addnewForm;
  nameField: FormControl;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private intrstingService: IntrstingService) {
    this.nameField = new FormControl('', notEmpty);
    this.addnewForm = this.formBuilder.group({
      type: new FormControl("BOOK"),
      name: this.nameField,
      url: new FormControl("", notEmpty),
      description: new FormControl(""),
      author: new FormControl("")
    },{validator: requiredIf(this.isTypeBookAndAuthorFilledIn, 'author')});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewPage');
  }

  submitForm() {
    this.intrstingService.addIntrsthing(this.addnewForm.value)
      .subscribe(res => this.navCtrl.push(IntrstingDetailPage, res.json().name));
  }

  private isTypeBookAndAuthorFilledIn(group: FormGroup){
      return group.controls['type'].value === 'BOOK' && notEmpty(group.controls['author']) !== null;
  }
}
