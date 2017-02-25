import {Input, Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TagService} from "../../service/tag.service";
import {notEmpty} from "../../validator/NotEmptyValidator";
import {Tag} from "../../class/tag.class";
import {UserService} from "../../service/user.service";
import {Intrsting} from "../../class/intrsting.class";
import {IntrstingService} from "../../service/intrsting.service";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'tagsearch-component',
  templateUrl: './tagsearch.component.html'
})
export class TagSearchComponent {
  private filteredTags: Tag[] = [];
  private allTags: Tag[] = [];

  constructor(public viewCtrl: ViewController, private tagService: TagService) {

  }

  ngOnInit() {
    this.tagService.getAllTags()
      .subscribe(tags => this.allTags = tags);
  }

  getTags(event) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.filteredTags =  this.allTags.filter(tag => tag.name.toLowerCase().indexOf(val) !== -1);
    } else {
      this.filteredTags = [];
    }
  }

  selectTag(filteredTag: Tag) {
    this.viewCtrl.dismiss(filteredTag);
  }

  back(){
    this.viewCtrl.dismiss();
  }
}
