import {Input, Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TagService} from "../../service/tag.service";
import {notEmpty} from "../../validator/NotEmptyValidator";
import {Tag} from "../../class/tag.class";
import {UserService} from "../../service/user.service";
import {Intrsting} from "../../class/intrsting.class";
import {IntrstingService} from "../../service/intrsting.service";
import {NavController, Events} from "ionic-angular";

@Component({
  selector: 'tag-component',
  templateUrl: './tag.component.html'
})
export class TagComponent {
  @Input()
  intrsthing: Intrsting;
  intrstingId;

  addingTag = false;
  private addTagForm: FormGroup;
  private existingTags: string[] = [];

  constructor(private tagService: TagService,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private intrsthingService: IntrstingService,
              private events: Events) {
    this.addTagForm = this.formBuilder.group({
      name: new FormControl("", notEmpty)
    });
  }

  ngOnInit() {
    this.intrstingId = this.intrsthing.id;
    this.fetchTags();
  }

  addTag() {
    this.addingTag = true;
  }

  submitForm() {
    let newTag: Tag = this.addTagForm.value;
    if (newTag.name === "Get me outta here!") {
      this.unlockUser();
    } else {
      this.addTagIfNotPresent(newTag);
    }
  }

  private addTagIfNotPresent(newTag: Tag) {
    this.addingTag = false;
    if (this.tagAlreadyPresent(newTag)) {
      this.addTagForm.reset();
      this.addingTag = false;
    } else {
      this.persistNewTag(newTag);
    }
  }

  private persistNewTag(newTag: Tag) {
    newTag.intrsthingId = this.intrstingId;
    this.userService.getLoggedInUser()
      .then(username => {
        newTag.creator = username;
        this.tagService.createTag(newTag)
          .subscribe(() => {
            this.addTagForm.reset();
            this.addingTag = false;
            this.intrsthingService.updateTags(this.intrsthing, newTag.name)
              .subscribe(() => this.fetchTags());
          });
      })
  }

  private unlockUser() {
    this.userService.unlockTodoPage()
      .then(() => {
        this.events.publish('user:unlocked');
        this.navCtrl.popToRoot();
      });
  }

  private tagAlreadyPresent(newTag: Tag) {
    return this.existingTags.some(tag => tag.toLowerCase().trim() === newTag.name.toLowerCase().trim());
  }


  private fetchTags() {
    this.intrsthingService.getIntrsthing(this.intrstingId)
      .subscribe(intrsthingAsJson => {
        let intrsthing = intrsthingAsJson.json();
        if (!intrsthing.tags) {
          this.existingTags = [];
        } else {
          this.existingTags = intrsthing.tags.sort((tag1, tag2) => this.compare(tag1, tag2))
        }
      })
  }

  private compare(tag1: string, tag2: string) {
    if (tag1 < tag2) {
      return -1;
    }
    if (tag1 > tag2) {
      return 1;
    }
    return 0;
  }
}
